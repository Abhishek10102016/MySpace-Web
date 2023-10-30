import { ZodType, z } from 'zod';
import { useState, useEffect } from 'react';
import { EMPLOYEMENT_DETAILS, GET_BANK_DETAILS, GET_EMPLOYEE_BY_ID } from '../../../../services/graphql/employeeQueries';
import { useMutation, useQuery } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  employee,
  department,
  designation,
  mentor,
  employment,
} from '../../../../types/types';

import {
  employmentTypes,
  workModes,
  employeeStatus,
  fetchDepartments,
  fetchMentors,
  fetchDesignaitons,
} from '../../../../constants/Static';
import { UPDATE_EMPLOYEMENT } from '../../../../services/graphql/employeeMutations';
import { EmploymentModelInput } from '../../../../types/graphql';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../src/store/hooks';


/* eslint-disable-next-line */
export interface EmployeeEmploymentDetailProps { }

const validationSchema: ZodType<employment | unknown> = z.object({
  employment: z.object({
    employmentId: z.optional(z.number()),
    employeeId: z.optional(z.number()),
    dateOfJoining: z.date(),
    departmentId: z
      .number()
      .min(1, { message: 'Please select your department' }),
    designationId: z
      .number()
      .min(1, { message: 'Please select your designation' }),
    employmentType: z
      .string()
      .nonempty({ message: 'Please select employment type' }),
    workMode: z.string().nonempty({ message: 'Please select valid work mode' }),
    uan: z.string().nullable(),
    esic: z.string().nullable(),
    ctc: z.number().nullable(),
    companyProvidedBankAccountId: z.optional(z.number()).nullable(),
    status: z.optional(z.number()).nullable(),

  }),
});

export function EmployeeEmploymentDetail(props: any) {
  const [departments, setDepartments] = useState<department[]>([]);
  const [designations, setDesignations] = useState<designation[]>([]);
  const [mentors, setMentors] = useState<mentor[]>([]);
  const { setShowBankDetails, setShowEmployment, employeeId } = props;
  const userData = useAppSelector(state => state.user.userDetails);
  const { data, error } = useQuery(EMPLOYEMENT_DETAILS, {
    variables: {
      employeeId: employeeId ? Number(employeeId) : userData.employeeId,
    },
    fetchPolicy: 'no-cache',
  });

  const [updateEmploymentDetails] = useMutation(UPDATE_EMPLOYEMENT)

  if (data) console.log(data.employmentByEmployee.result);

  useEffect(() => {
    fetchDepartments(setDepartments);
    fetchMentors(setMentors);
    fetchDesignaitons(setDesignations);
    if (data?.employmentByEmployee) {
      const employmentData = data.employmentByEmployee.result
      employmentData.dateOfJoining = employmentData.dateOfJoining.toString().split('T')[0];
    }
    console.log(data);
    reset(data?.employmentByEmployee.result as employment);
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<employment>({
    resolver: zodResolver(validationSchema),

  });

  const onSubmit: SubmitHandler<employment> = async (reqObj) => {
    console.log("reqObj", reqObj);
    await updateEmploymentDetails(
      {
        variables: {
          employmentModel: reqObj as EmploymentModelInput
        }
      }
    ).then((result) => {
      console.log("result", result)
      toast.success("Updated Data")
    }).catch((err) => {
      toast.error("Error occured while updating employment")
    })
  };

  return (

    // <div className="page-wrapper">
    //   <div className="container-fluid">
    //     <div className="reverse-mode">
    //       <div
    //         className="overflow-hidden dashboard-part"
    //         style={{ height: '100%' }}
    //       >
    //         <div className="row page-titles">
    //           <div className="col-md-12">
    //             <div className="mb-2">
    //               <ol className="breadcrumb mb-0 p-0 bg-transparent">
    //                 <li className="breadcrumb-item">
    //                   <Link to="/employee/bankdetails">Bank Details</Link>
    //                 </li>
    //                 <li className="breadcrumb-item active d-flex align-items-center">
    //                   Employment Details
    //                 </li>
    //               </ol>
    //             </div>
    //           </div>
    //         </div>
    //         {/* insert employee details component here  start from card */}

    <>
      <div className="card">
        <div className="card-body">
          <div className="row" style={{ maxWidth: '1150px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" col-12">
                <div className="border-bottom rounded border-300 mb-4">
                  <div className="p-4 bg-white border rounded mb-6 box-shadow">
                    <h4 className="mb-2">Employment Details</h4>
                    <div className="row g-3">
                      {/* date of joining */}
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>

                            <label
                              className="text-700 form-icon-label"
                              htmlFor="dateOfJoining"
                            >
                              Date Of Joining
                            </label>
                            <input
                              className={
                                errors.dateOfJoining
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="date"
                              id="dateOfJoining"
                              placeholder="Date of Joining"
                              {...register('dateOfJoining', {
                                valueAsDate: true,
                              })}
                              autoComplete="off"
                            />
                            {errors?.dateOfJoining && (
                              <p className="error-text">
                                {errors.dateOfJoining.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* department */}

                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="departmentId"
                            >
                              Department
                            </label>
                            <select
                              className={
                                errors.departmentId
                                  ? 'form-select error'
                                  : 'form-select'
                              }
                              id="departmentId"
                              placeholder=""
                              {...register('departmentId', {
                                valueAsNumber: true,
                              })}
                              autoComplete="off"
                            >
                              {/* {!preLoadedValues?.departmentId && (
                              <option value={0} defaultValue={0}>
                                Select Your Department
                              </option>
                            )} */}

                              <option value={0} defaultValue={0}>
                                Select Your Department
                              </option>

                              {departments &&
                                departments.map((dep) => (
                                  <option
                                    key={dep.departmentId}
                                    value={dep.departmentId}
                                  >
                                    {dep.name}
                                  </option>
                                ))}
                            </select>

                            {errors.departmentId && (
                              <p className="error-text">
                                {errors.departmentId.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* designation */}
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="designation"
                            >
                              Designation
                            </label>
                            <select
                              className={
                                errors.designationId
                                  ? 'form-select error'
                                  : 'form-select'
                              }
                              id="designationId"
                              placeholder=""
                              {...register('designationId', {
                                valueAsNumber: true,
                              })}
                              autoComplete="off"
                            >
                              {/* {!preLoadedValues?.employment?.designationId && (
                              <option value={0} defaultValue={0}>
                                Select Your Designation
                              </option>
                            )} */}

                              <option value={0} defaultValue={0}>
                                Select Your Designation
                              </option>

                              {designations &&
                                designations.map((des) => (
                                  <option
                                    key={des.designationId}
                                    value={des.designationId}
                                  >
                                    {des.name}
                                  </option>
                                ))}
                            </select>

                            {errors.designationId && (
                              <p className="error-text">
                                {errors?.designationId.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Employment type */}
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="maritalStatus"
                            >
                              Employment Type
                            </label>
                            <select
                              className={
                                errors?.employmentType
                                  ? 'form-select error'
                                  : 'form-select'
                              }
                              id="employmentType"
                              placeholder=""
                              {...register('employmentType')}
                              autoComplete="off"
                            >
                              <option value="" defaultValue="">
                                Select Employment Type
                              </option>
                              {employmentTypes &&
                                employmentTypes.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>

                            {errors.employmentType && (
                              <p className="error-text">
                                {
                                  errors.employmentType
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Employment status */}
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="status"
                            >
                              Status
                            </label>
                            <select
                              className={
                                errors.status
                                  ? 'form-select error'
                                  : 'form-select'
                              }
                              id="status"
                              placeholder=""
                              {...register('status')}
                              autoComplete="off"
                            >
                              {/* {!preLoadedValues?.employment?.departmentId && (
                              <option value={0} defaultValue={0}>
                                Select Your Department
                              </option>
                            )} */}

                              <option value="" defaultValue="">
                                Select Employee Status
                              </option>

                              {employeeStatus &&
                                employeeStatus.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>

                            {errors.status && (
                              <p className="error-text">
                                {errors.status.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Work Mode */}
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="maritalStatus"
                            >
                              Work Mode
                            </label>
                            <select
                              className={
                                errors.workMode
                                  ? 'form-select error'
                                  : 'form-select'
                              }
                              id="workMode"
                              placeholder=""
                              {...register('workMode')}
                              autoComplete="off"
                            >
                              <option value="" defaultValue="">
                                Select Work Mode
                              </option>
                              {workModes &&
                                workModes.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>

                            {errors.workMode && (
                              <p className="error-text">
                                {errors.workMode.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* UAN */}
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="uan"
                            >
                              UAN
                            </label>
                            <input
                              className={
                                errors.uan
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="text"
                              id="uan"
                              placeholder="UAN"
                              {...register('uan')}
                              autoComplete="off"
                            />

                            {errors.uan && (
                              <p className="error-text">
                                {errors.uan.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>

                      {/* ESIC */}
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="esic"
                            >
                              ESIC
                            </label>
                            <input
                              className={
                                errors.esic
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="text"
                              id="esic"
                              placeholder="ESIC"
                              {...register('esic')}
                              autoComplete="off"
                            />

                            {errors.esic && (
                              <p className="error-text">
                                {errors.esic.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>

                      {/* CTC */}
                      <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="ctc"
                            >
                              CTC
                            </label>
                            <input
                              className={
                                errors.ctc
                                  ? 'form-control error'
                                  : 'form-control'
                              }
                              type="number"
                              id="ctc"
                              placeholder="CTC"
                              {...register('ctc', {
                                valueAsNumber: true,
                              })}
                              autoComplete="off"
                            />

                            {errors.ctc && (
                              <p className="error-text">
                                {errors.ctc.message}
                              </p>
                            )}
                          </div>
                          <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                        </div>
                      </div>

                      {/* Mentor */}
                      {/* <div className="col-12 col-sm-4">
                        <div className="form-icon-container">
                          <div>
                            <label
                              className="text-700 form-icon-label"
                              htmlFor="mentorId"
                            >
                              Mentor
                            </label>
                            <select
                              className={
                                errors.mentorId
                                  ? 'form-select error'
                                  : 'form-select'
                              }
                              id="mentorId"
                              placeholder=""
                              {...register('mentorId', {
                                valueAsNumber: true,
                              })}
                              autoComplete="off"
                            >
                          
                              <option value={0} defaultValue={0}>
                                Select Your Mentor
                              </option>
                              {mentors &&
                                mentors.map((emp) => (
                                  <option
                                    key={emp.employeeId}
                                    value={emp.employeeId}
                                  >
                                    {emp.employeeName}
                                  </option>
                                ))}
                            </select>

                            {errors?.mentorId && (
                              <p className="error-text">
                                {errors.mentorId.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mylink">
                <div>
                  {/* <Link to={'/employee/bankdetails'}>
                          <div className="mylink">
                            {' '}
                            <span className="material-symbols-outlined">
                              arrow_back
                            </span>
                            <span>Bank details</span>
                          </div>
                        </Link> */}

                  <button className="mylink" onClick={() => {
                    setShowBankDetails(true);
                    setShowEmployment(false);
                  }}>
                    <span className="material-symbols-outlined">
                      arrow_back
                    </span>
                    <span>Bank details</span>
                  </button>                      </div>

                <div >
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

                {/* <div className="my-4">
                        <button
                          className="btn btn-success"
                          // disabled={empData?.isProfileCompleted ? false : true}
                          onClick={() => navigate('/employeelist')}
                        >
                          Go to Employee list
                        </button>
                      </div> */}
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

export default EmployeeEmploymentDetail;
