import { Link, useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  employeePersonalDetails,
  department,
  designation,
  mentor,
} from '../../../../types/types';
import { genders, maritalStatus } from '../../../../constants/Static';
import {
  fetchDepartments,
  fetchMentors,
  fetchDesignaitons,
} from '../../../../constants/Static';
import { regAadharNumber, regName, regPan } from '../../../../constants/regex';
import { useState, useEffect } from 'react';
import { ZodType, z } from 'zod';
import { ToastrService } from '../../../../services/Toastr';
import { GET_EMPLOYEE_BY_ID, GET_PERSONAL_DETAILS } from '../../../../services/graphql/employeeQueries';
import { useQuery, useMutation, ApolloError } from '@apollo/client';
import { useAppSelector, useAppDispatch } from '../../../../../src/store/hooks';
import { PersonalDetailsInput } from 'apps/myspace/src/types/graphql';
import { ADD_EMPLOYEE_PERSONAL_DETAILS, UPDATE_EMPLOYEE_PERSONAL_DETAILS } from '../../../../services/graphql/employeeMutations';

/* eslint-disable-next-line */
export interface EmployeePersonalDetailsProps { }

const validationSchema: ZodType<employeePersonalDetails | unknown> = z.object({
  firstName: z
    .string()
    .nonempty('Enter First Name')
    .refine((val) => regName.test(val), {
      message: 'Enter Valid First Name',
    }),
  middleName: z.string(),
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  lastName: z
    .string()
    .nonempty('Enter Last Name')
    .refine((val) => regName.test(val), {
      message: 'Enter Valid Last Name',
    }),
  dateOfBirth: z.date().refine((value) => value !== null, {
    message: 'Invalid Date',
    path: ['dateOfBirth'],
  }),
  gender: z.string().nonempty('Gender is required'),
  maritalStatus: z.string().nonempty('Select Marital status'),
  pan: z
    .string()
    .nonempty('Pan number is required')
    .refine((val) => regPan.test(val), {
      message: 'Enter Valid Pan Number ',
    }),
  aadhar: z
    .string()
    .nonempty('Aadhar is required')
    .refine((val) => regAadharNumber.test(val), {
      message: 'Enter Valid Aadhar Number',
    }),
  nationality: z.string().min(1, { message: 'choose natioality' }),
  fatherName: z
    .string()
    .nonempty('Father Name is required')
    .refine((val) => regName.test(val), {
      message: 'Enter valid Aadhar Number',
    }),
  spouseName: z.string().nullable(),
  nomineeName: z.string().nullable(),
  nomineeRelation: z.string().nullable(),
});

export function EmployeePersonalDetails(props: any) {
  const id = useAppSelector((state) => {
    return state.user.userId;
  });
  const userData = useAppSelector(state => state.user.userDetails);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [detailsFor, setDetailsFor] = useState<string>("Personal");
  const { setShowPersonalDetails, setShowBankDetails, setEmployeeId, otherEmployeeId } = props;

  console.log(otherEmployeeId, "employeeId")
  let employeeData = null;
  let data: any = null;

  // const [empData, setEmpData] = useState<employee>();
  const [departments, setDepartments] = useState<department[]>([]);
  const [designations, setDesignations] = useState<designation[]>([]);
  const [mentors, setMentors] = useState<mentor[]>([]);

  if (otherEmployeeId === undefined || otherEmployeeId === 0) {
    employeeData = useQuery(GET_PERSONAL_DETAILS, {
      fetchPolicy: 'no-cache',
    });
    data = employeeData.data?.personalDetails.result;
    console.log(employeeData, "personal data");
  }
  else {
    employeeData = useQuery(GET_EMPLOYEE_BY_ID, {
      variables: {
        empId: Number(otherEmployeeId),
      },
      fetchPolicy: 'no-cache',
    });
    data = employeeData.data?.employeeById.result;
    console.log(employeeData, "employeeData by Id")
    //setDetailsFor("Others");
  }

  // Mutation for employee personal details update
  const [addEmployeePersonalDetails] = useMutation(ADD_EMPLOYEE_PERSONAL_DETAILS)
  const [updateEmployeePersonalDetails] = useMutation(UPDATE_EMPLOYEE_PERSONAL_DETAILS)

  useEffect(() => {
    fetchDepartments(setDepartments);
    fetchMentors(setMentors);
    fetchDesignaitons(setDesignations);
  }, []);

  useEffect(() => {
    reset(preLoadedValues);
    setEmployeeId(preLoadedValues?.employeeId)
  }, [departments, mentors, designations, data]);

  // const preLoadedValues =
  //   data?.personalDetails.result && JSON.parse(JSON.stringify(data.personalDetails.result));

  const preLoadedValues = data && JSON.parse(JSON.stringify(data));

  if (preLoadedValues?.dateOfBirth) {
    setEmployeeId(preLoadedValues.employeeId) // yaha set ho rhi  hai date of birth if date of birth is not present than id is not getting set
    preLoadedValues.dateOfBirth = preLoadedValues.dateOfBirth
      .toString()
      .split('T')[0];
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<employeePersonalDetails>({
    resolver: zodResolver(validationSchema),
    // defaultValues: preLoadedValues && preLoadedValues,
  });

  const onSubmit: SubmitHandler<employeePersonalDetails> = async (reqObj) => {
    console.log(preLoadedValues.employeeId, "employee Id sending to the form")
    const employeePersonalDetails: employeePersonalDetails = {
      employeeId: Number(preLoadedValues.employeeId),
      firstName: reqObj?.firstName,
      middleName: reqObj?.middleName,
      lastName: reqObj?.lastName,
      dateOfBirth: reqObj.dateOfBirth,
      gender: reqObj?.gender,
      maritalStatus: reqObj?.maritalStatus,
      pan: reqObj?.pan,
      aadhar: reqObj?.aadhar,
      nationality: reqObj.nationality,
      fatherName: reqObj?.fatherName,
      spouseName: reqObj?.spouseName,
      nomineeName: reqObj?.nomineeName,
      nomineeRelation: reqObj?.nomineeRelation,
    };
    if (otherEmployeeId === undefined || otherEmployeeId === 0) {
      await addEmployeePersonalDetails({
        variables: {
          request: employeePersonalDetails as PersonalDetailsInput
        }
      }).then((res) => {
        console.log(res)
        ToastrService.success("User details updated successfully")
        setShowBankDetails(true)
        setShowPersonalDetails(false)
      }).catch((err) => {
        console.log(err);
        ToastrService.error("failed to update user details")
      })
    }
    else {
      await updateEmployeePersonalDetails({
        variables: {
          request: employeePersonalDetails as PersonalDetailsInput
        }
      }).then((res) => {
        console.log(res)
        ToastrService.success("Employee Deatails updated successfully")
        setShowBankDetails(true)
        setShowPersonalDetails(false)
      }).catch((err) => {
        console.log(err);
        ToastrService.error("failed to update user details")
      })
    }
  };
  return (
    <>
      {/* insert employee details component here start from card */}
      <div className="card">
        <div className="card-body">
          <div className="row">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" col-12">
                <div className="border-bottom rounded border-300 mb-4">
                  <div className="p-4 bg-white border rounded mb-6 box-shadow">
                    <h4 className="mb-2">Personal Details</h4>
                    <div className="row g-3">
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="firstName"
                            >
                              First Name
                            </label>
                            <input
                              className={
                                errors.firstName
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              placeholder="First Name"
                              type="text"
                              id="firstName"
                              {...register('firstName')}
                              autoComplete="off"
                            />

                            {errors.firstName && (
                              <p className="error-text">
                                {errors.firstName?.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="middleName"
                            >
                              Middle Name
                            </label>
                            <input
                              className={
                                errors.middleName
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="text"
                              placeholder="Middle Name"
                              id="middleName"
                              {...register('middleName')}
                              autoComplete="off"
                            />

                            {errors.middleName && (
                              <p className="error-text">
                                {errors.middleName?.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div >
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="lastName"
                            >
                              Last Name
                            </label>
                            <input
                              className={
                                errors.lastName
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="text"
                              id="lastName"
                              placeholder="Last Name"
                              {...register('lastName')}
                              autoComplete="off"
                            />

                            {errors.lastName && (
                              <p className="error-text">
                                {errors.lastName?.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="dateOfBirth"
                            >
                              Date Of Birth
                            </label>
                            <input
                              className={
                                errors.dateOfBirth
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="date"
                              id="dateOfBirth"
                              placeholder="Date of birth"
                              {...register('dateOfBirth', {
                                valueAsDate: true,
                              })}
                              autoComplete="off"
                            />

                            {errors.dateOfBirth && (
                              <p className="error-text">
                                {errors.dateOfBirth?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="gender"
                            >
                              Gender
                            </label>
                            <select
                              className={
                                errors.gender
                                  ? 'form-select error'
                                  : 'form-select'
                              }
                              id="gender"
                              {...register('gender')}
                              autoComplete="off"
                            >
                              <option value="" defaultValue="">
                                Select Your Gender
                              </option>
                              {genders &&
                                genders.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>

                            {errors.gender && (
                              <p className="error-text">
                                {errors.gender?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="maritalStatus"
                            >
                              Marital Status
                            </label>
                            <select
                              className={
                                errors.maritalStatus
                                  ? 'form-select error'
                                  : 'form-select'
                              }
                              id="maritalStatus"
                              {...register('maritalStatus')}
                            >
                              <option value="" defaultValue="">
                                Select Your Marital Status
                              </option>
                              {maritalStatus &&
                                maritalStatus.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                            {errors.maritalStatus && (
                              <p className="error-text">
                                {errors.maritalStatus?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="fatherName"
                            >
                              Father Name
                            </label>
                            <input
                              className={
                                errors.fatherName
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="text"
                              id="fatherName"
                              placeholder="Father Name"
                              {...register('fatherName')}
                              autoComplete="off"
                            />

                            {errors.fatherName && (
                              <p className="error-text">
                                {errors.fatherName?.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="spouseName"
                            >
                              Spouse Name
                            </label>
                            <input
                              className={
                                errors.spouseName
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="text"
                              id="spouseName"
                              placeholder="Spouse Name"
                              {...register('spouseName')}
                              autoComplete="off"
                            />

                            {errors.spouseName && (
                              <p className="error-text">
                                {errors.spouseName?.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>

                            <label
                              className="text-700 form-icon-label"
                              htmlFor="nomineeName"
                            >
                              Nominee Name
                            </label>
                            <input
                              className={
                                errors.nomineeName
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="text"
                              id="nomineeName"
                              placeholder="Nominee Name"
                              {...register('nomineeName')}
                              autoComplete="off"
                            />
                            {errors.nomineeName && (
                              <p className="error-text">
                                {errors.nomineeName?.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>

                            <label
                              className="text-700 form-icon-label"
                              htmlFor="nomineeRelation"
                            >
                              Nominee Relation
                            </label>
                            <input
                              className={
                                errors.nomineeRelation
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="text"
                              id="nomineeRelation"
                              placeholder="Nominee Relation"
                              {...register('nomineeRelation')}
                              autoComplete="off"
                            />
                            {errors.nomineeRelation && (
                              <p className="error-text">
                                {errors.nomineeRelation?.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              className={
                                errors.email
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="email"
                              id="email"
                              placeholder="Email"
                              {...register('email')}
                              autoComplete="off"
                            />
                            {errors.email && (
                              <p className="error-text">
                                {errors.email?.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="nationality"
                            >
                              Nationality
                            </label>
                            <select
                              className={
                                errors.nationality
                                  ? 'form-select error'
                                  : 'form-select'
                              }
                              id="nationality"
                              {...register('nationality')}
                              autoComplete="off"
                            >
                              {/* replace with constant */}
                              <option value="">
                                Select Your Nationality
                              </option>
                              <option value="Indian">Indian</option>
                              <option value="American">American</option>
                            </select>
                            {errors.nationality && (
                              <p className="error-text">
                                {errors.nationality?.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="pan"
                            >
                              Pan
                            </label>
                            <input
                              className={
                                errors.pan
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="text"
                              id="pan"
                              placeholder="Enter Pan Details"
                              {...register('pan')}
                              autoComplete="off"
                            />
                            {errors.pan && (
                              <p className="error-text">
                                {errors.pan?.message}
                              </p>
                            )}
                          </div>

                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="aadhar"
                            >
                              Aadhar
                            </label>
                            <input
                              className={
                                errors.aadhar
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="text"
                              id="aadhar"
                              placeholder="Aadhar"
                              {...register('aadhar')}
                              autoComplete="off"
                            />



                            {errors.aadhar && (
                              <p className="error-text">
                                {errors.aadhar?.message}
                              </p>
                            )}
                          </div>

                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mylink">
                <div>
                  <div>
                    <button
                      className="btn btn-secondary btn-sm me-2"
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
                <div>
                  {/* <Link
                    to={'/employee/bankdetails'}
                  >
                    <div className="mylink">
                      <span>Bank details</span>
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </div>
                  </Link> */}
                  <button className="mylink" onClick={() => {
                    setShowPersonalDetails(false);
                    setShowBankDetails(true);
                  }}>
                    <span>Bank details</span>
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
    // </div>
    //  </div>
    //   </div>
    //  </div> 
  );
}

export default EmployeePersonalDetails;
