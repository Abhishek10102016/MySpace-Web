import { ZodType, z } from 'zod';
import { useEffect, useState } from 'react';
import { GET_BANK_DETAILS } from '../../../../services/graphql/employeeQueries';
import { UPDATE_EMPLOYEE_BANK_DETAILS } from '../../../../services/graphql/employeeMutations';
import { useQuery, useMutation } from '@apollo/client';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastrService } from '../../../../services/Toastr';
import { employeeBankDetails } from '../../../../types/types';
import { BankDeatilsModelInput } from '../../../../../src/types/graphql';
/* eslint-disable-next-line */
export interface EmployeeBankDetailsProps { }

const validationSchema: ZodType<employeeBankDetails | unknown> = z.object({
  bankDetails: z
    .array(
      z.object({
        bankDeatilsId: z.optional(z.number()),
        employeeId: z.optional(z.number()).nullable(),
        accountNumber: z.string().min(1), // Assuming at least one character is required
        ifscCode: z.string().nullable(),
        branch: z.string().nullable(),
        name: z.optional(z.string()).nullable(),
        isCompanyProvided: z.boolean().nullable(),
      })
    )
    .min(1, { message: 'Please add bank Account' }),
});

export function EmployeeBankDetails(props: any) {
  const { setShowPersonalDetails, setShowBankDetails, setShowEmployment, employeeId, otherEmployeeId } = props;
  const [bankDetails, setBankDetails] = useState<any>() // 
  console.log(employeeId, "employee id in bankdetails")
  const { data, error } = useQuery(GET_BANK_DETAILS, {
    variables: {
      employeeId: Number(employeeId),
    },
    fetchPolicy: 'no-cache',
  });

  // Mutation for employee personal details update
  const [updateBankDetails] = useMutation(UPDATE_EMPLOYEE_BANK_DETAILS, {
    refetchQueries: [GET_BANK_DETAILS],
  });

  // useEffect(() => {
  //   console.log(data, "Bank detais");
  //   setBankDetails(data?.bankDetails.result)
  //   //  reset(bankDetails);
  // }, [data]);
  useEffect(() => {
    if (data && data?.bankDetails && data?.bankDetails.result) {
      // Map the relevant part of data to match the employeeBankDetails structure
      const mappedData: any = {
        bankDetails: data.bankDetails.result,
      };
      reset(mappedData);
    } else {
      reset({ bankDetails: [{}] }); // Prefill an empty bank details entry
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<employeeBankDetails>({
    //defaultValues: { bankDetails: bankDetails || [] },
    resolver: zodResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'bankDetails',
    control,
  });

  const onSubmit: SubmitHandler<employeeBankDetails> = async (reqObj) => {
    console.log("Inside onsubmit", reqObj)
    const employeeBankDetails: employeeBankDetails = {
      bankDetails: reqObj?.bankDetails
    };
    console.log(employeeBankDetails.bankDetails)
    employeeBankDetails.bankDetails &&
      employeeBankDetails.bankDetails.map((item) => (item.employeeId = employeeId));
    console.log(employeeBankDetails);

    await updateBankDetails({
      variables: {
        bankDetails: employeeBankDetails.bankDetails as BankDeatilsModelInput[],
      },
    })
      .then((res) => {
        console.log(res);
        ToastrService.success('Bank Details updated successfully');
        setShowEmployment(true)
        setShowBankDetails(false)
      })
      .catch((err) => {
        console.log(err);
        ToastrService.error('Failed to update bank details');
        console.log(employeeBankDetails.bankDetails)
      });
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row" style={{ maxWidth: '1150px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" col-12">
                <div className="border-bottom rounded border-300 mb-4">
                  <div className="p-4 bg-white border rounded mb-6 box-shadow">
                    <h4 className="mb-2">Bank Details</h4>
                    <div className="row">
                      <div className="row">
                        <div className="col-12">
                          {errors.bankDetails && (
                            <p className="error-text">
                              {errors.bankDetails?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {fields && fields.map((field: any, index: any) => {
                        return (
                          <div className="row" key={field.id}>
                            {/* bank details here  */}
                            <div className='d-flex justify-content-between mb-2'>
                              <div>Bank Account {index + 1}</div>
                              <button
                                className="text-danger btn btn-outline-danger"
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                Remove
                              </button>
                            </div>

                            <div className="col-12 col-sm-6">
                              <div className="form-icon-container mb-3">
                                <div>

                                  <label
                                    className="text-700 form-icon-label"
                                    htmlFor="accountNumber"
                                  >
                                    Account Number
                                  </label>
                                  <input
                                    className={
                                      errors.bankDetails?.[index]
                                        ?.accountNumber
                                        ? 'form-control error'
                                        : 'form-control'
                                    }
                                    type="text"
                                    id="accountNumber"
                                    placeholder="Account Number"
                                    {...register(`bankDetails.${index}.accountNumber`)}
                                    autoComplete="off"
                                  />
                                  {errors.bankDetails && (
                                    <p className="error-text">
                                      {
                                        errors.bankDetails?.[index]
                                          ?.accountNumber?.message
                                      }
                                    </p>
                                  )}
                                </div>
                                <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6">
                              <div className="form-icon-container mb-3">
                                <div>
                                  <label
                                    className="text-700 form-icon-label"
                                    htmlFor="isfcCode"
                                  >
                                    ISFC Code
                                  </label>
                                  <input
                                    className={
                                      errors.bankDetails?.[index]
                                        ?.ifscCode
                                        ? 'form-control error'
                                        : 'form-control'
                                    }
                                    type="text"
                                    id="isfcCode"
                                    placeholder="ISFC Code"
                                    {...register(
                                      `bankDetails.${index}.ifscCode`
                                    )}
                                    autoComplete="off"
                                  />
                                  {errors.bankDetails && (
                                    <p className="error-text">
                                      {
                                        errors.bankDetails?.[index]
                                          ?.ifscCode?.message
                                      }
                                    </p>
                                  )}
                                </div>

                                <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6">
                              <div className="form-icon-container mb-3">
                                <div>
                                  <label
                                    className="text-700 form-icon-label"
                                    htmlFor="branch"
                                  >
                                    Branch
                                  </label>
                                  <input
                                    className={
                                      errors.bankDetails?.[index]?.branch
                                        ? 'form-control error'
                                        : 'form-control'
                                    }
                                    type="text"
                                    id="branch"
                                    placeholder="Branch"
                                    {...register(
                                      `bankDetails.${index}.branch`
                                    )}
                                    autoComplete="off"
                                  />
                                  {errors.bankDetails && (
                                    <p className="error-text">
                                      {
                                        errors.bankDetails?.[index]
                                          ?.branch?.message
                                      }
                                    </p>
                                  )}
                                </div>

                                <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6">
                              <div className="form-icon-container mb-3">
                                <div>
                                  <label
                                    className="text-700 form-icon-label"
                                    htmlFor="name"
                                  >
                                    Name
                                  </label>
                                  <input
                                    className={
                                      errors.bankDetails?.[index]?.name
                                        ? 'form-control error'
                                        : 'form-control'
                                    }
                                    type="text"
                                    id="name"
                                    placeholder="Name"
                                    {...register(
                                      `bankDetails.${index}.name`
                                    )}
                                    autoComplete="off"
                                  />



                                  {errors.bankDetails && (
                                    <p className="error-text">
                                      {
                                        errors.bankDetails?.[index]?.name
                                          ?.message
                                      }
                                    </p>
                                  )}
                                </div>

                                <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                              </div>
                            </div>

                            {/* bank details end;  */}
                          </div>
                        );
                      })}
                      <div className="col-12">
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => {
                            append({
                              accountNumber: '',
                              ifscCode: '',
                              branch: '',
                              name: '',
                              bankDeatilsId: 0,
                              isCompanyProvided: true,
                              employeeId: employeeId
                            });
                          }}
                        >
                          Add Bank Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mylink">
                <div >
                  {/* <Link
                    to={'/employee/personaldetails'}
                  // disabled={empData?.isProfileCompleted ? false : true}
                  // onClick={() => navigate('/employee/personaldetails')}
                  >
                    <div className="mylink">
                      {' '}
                      <span className="material-symbols-outlined">
                        arrow_back
                      </span>
                      <span>Personal Details</span>
                    </div>
                  </Link> */}
                  <button className="mylink" onClick={() => {
                    setShowPersonalDetails(true);
                    setShowBankDetails(false);
                    setShowEmployment(false);
                  }}>
                    <span className="material-symbols-outlined">
                      arrow_back
                    </span>
                    <span>Personal Details</span>
                  </button>
                </div>

                <div>
                  <div>
                    <button
                      className="btn btn-secondary me-2 btn-sm"
                      type="reset"
                    >
                      Cancel Changes
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      type="submit"
                    >
                      Save Information
                    </button>
                  </div>
                </div>

                <div >
                  {/* <Link
                    to={'/employee/employmentdetails'}
                  >
                    <div className="mylink">
                      {' '}
                      <span>Employment details</span>
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </div>
                  </Link> */}
                  <button className="mylink" onClick={() => {
                    setShowPersonalDetails(false);
                    setShowBankDetails(false);
                    setShowEmployment(true);
                  }}>
                    <span>Employment</span>
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default EmployeeBankDetails;
