import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { leaveRequest, leaveRequestModel, mentor } from '../../../../types/types';
import { ToastrService } from '../../../../services/Toastr';
import {
  leaveCategories,
  leaveTypes,
  fetchMentors,
  RequestedForTypes,
} from '../../../../constants/Static';
import { leaveService } from '../../../../services/API/Leave';
import { useMutation, useQuery } from '@apollo/client';
import { LeavesMutation } from '../../../../services/graphql/leaveMutation';
import { AddLeaveRequestModelInput, UpdateLeaveRequestModelInput } from '../../../../types/graphql';
import { leavesQuery } from '../../../../services/graphql/leaveQueries';
/* eslint-disable-next-line */
export interface LeaveapplyProps {
  leaveRequestId: any;
  showEmployeeModal: boolean;
  setShowEmployeeModal: Function
}

const validationSchema: ZodType<leaveRequest> = z
  .object({
    requestedFor: z.string().nonempty({ message: "Please select requested for " }),
    requestedTo: z
      .number()
      .min(1, { message: 'Please select a valid approver' }),
    from: z.date().refine((value) => value !== null, {
      message: 'Invalid Date',
      path: ['from'],
    }),
    leaveFrom: z.string().nonempty({ message: "Please select Leave From Type" }),
    to: z.date().refine((value) => value !== null, {
      message: 'Invalid date',
      path: ['to'],
    }),
    leaveTo: z.string().nonempty({ message: "Please select Leave To Type" }),
    leaveCategoryCode: z
      .string()
      .nonempty({ message: 'Please select a valid leave category' }),
    leaveTypeCode: z
      .string()
      .nonempty({ message: 'Please select a valid leave type' }),
    reason: z
      .string()
      .nonempty({ message: 'Please describe reason for leave' }),
  })
  .refine((data) => data.from <= data.to, {
    message: 'End date of leave must be greater than Start date',
    path: ['to'], // path of error
  });

export function Leaveapply(props: LeaveapplyProps) {
  const { setShowEmployeeModal, leaveRequestId } = props
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<leaveRequest>({
    resolver: zodResolver(validationSchema),
  });
  const navigate = useNavigate();
  const [mentors, setMentors] = useState<mentor[]>([]);

  let leaveData = null;
  let data: any = null;

  console.log(leaveRequestId, "leaveRequestId")

  if (leaveRequestId !== null) {
    leaveData = useQuery(leavesQuery.GET_LEAVE_REQUEST_BY_ID, {
      variables: {
        requestId: Number(leaveRequestId),
      },
      fetchPolicy: 'no-cache',
    });

    data = leaveData.data?.leaveRequestById.result;
    if (data) {
      data.from = data.from
        .toString()
        .split('T')[0];
      data.to = data.to
        .toString()
        .split('T')[0];
    }
  }

  // const { data, error } = useQuery(leavesQuery.GET_LEAVE_REQUEST_BY_ID, {
  //   variables: {
  //     requestId: Number(leaveRequestId),
  //   },
  //   fetchPolicy: 'no-cache',
  // });


  useEffect(() => {
    fetchMentors(setMentors);
    reset(data)
  }, [data]);

  const [addLeaveRequest] = useMutation(LeavesMutation.addLeave,
    {
      refetchQueries: [leavesQuery.GET_MY_lEAVES],
    }
  )

  const [updateLeaveRequest] = useMutation(LeavesMutation.updateLeave, // this is for update leave
    {
      refetchQueries: [leavesQuery.GET_MY_lEAVES],
    }
  )

  const onSubmit: SubmitHandler<leaveRequest> = async (reqObj) => {
    console.log(reqObj, "add Leave Request Data");
    if (leaveRequestId !== null) {
      reqObj.leaveRequestId = leaveRequestId;
      console.log(reqObj, "ReqObject for update leave")
      await updateLeaveRequest({
        variables: {
          request: reqObj as UpdateLeaveRequestModelInput,
        },
      })
        .then((res) => {
          setShowEmployeeModal(false)
          console.log(res);
          ToastrService.success('Updated leave successfully');
        })
        .catch((err) => {
          console.log(err);
          ToastrService.error('Failed to Update, Retry!');
        });
    }
    else {
      console.log(reqObj, "ReqObject to leave")
      await addLeaveRequest({
        variables: {
          request: reqObj as AddLeaveRequestModelInput,
        },
      })
        .then((res) => {
          setShowEmployeeModal(false)
          console.log(res);
          navigate("/Myleaves")
          ToastrService.success('Applied for leave successfully');
        })
        .catch((err) => {
          console.log(err);
          ToastrService.error('Failed to apply, Retry');
        });
    }
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
    //             <div className="mb-4">
    //               <ol className="breadcrumb mb-0 p-0 bg-transparent">
    //                 <li className="breadcrumb-item">
    //                   <Link to="/myleaves">My Leaves</Link>
    //                 </li>
    //                 <li className="breadcrumb-item active d-flex align-items-center">
    //                   Leave Application
    //                 </li>
    //               </ol>
    //             </div>
    //           </div>
    //           <div className="col-md-12">
    //             <div className="d-flex align-items-center">
    //               <div>
    //                 <h3 className="text-dark mb-0">Leave Application</h3>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    <>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-2 bg-white rounded mb-6 box-shadow">
          <div className="row g-3">
            {/* Requested For */}
            <div className="col-12 col-sm-6">
              <div className="form-icon-container">
                <div >
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="leaveTypeCode"
                  >
                    Requested For
                  </label>
                  <select
                    className={
                      errors.requestedFor
                        ? 'form-select error'
                        : 'form-select'
                    }
                    id="requestedFor"
                    placeholder=""
                    {...register('requestedFor')}
                    autoComplete="off"
                  >
                    <option value="" defaultValue="">
                      Select Requesting For
                    </option>

                    {RequestedForTypes &&
                      RequestedForTypes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>

                  {errors.requestedFor && (
                    <p className="error-text mb-0">
                      {errors.requestedFor.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* requested to */}
            <div className="col-12 col-sm-6">
              <div className="form-icon-container">
                <div >
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="requestedTo"
                  >
                    Requested To
                  </label>
                  <select
                    className={
                      errors.requestedTo
                        ? 'form-select error'
                        : 'form-select'
                    }
                    id="requestedTo"
                    placeholder=""
                    {...register('requestedTo', {
                      valueAsNumber: true,
                    })}
                    autoComplete="off"
                  >
                    <option value={0} defaultValue={0}>
                      Select Approver
                    </option>

                    {mentors &&
                      mentors.map((item) => (
                        <option
                          key={item.employeeId}
                          value={item.employeeId}
                        >
                          {item.employeeName}
                        </option>
                      ))}
                  </select>

                  {errors.requestedTo && (
                    <p className="error-text mb-0">
                      {errors.requestedTo.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* from date */}
            <div className="col-12 col-sm-6">
              <div className="form-icon-container">
                <div >
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="dateOfBirth"
                  >
                    From Date
                  </label>
                  <input
                    className={
                      errors.from
                        ? 'form-control error'
                        : 'form-control'
                    }
                    type="date"
                    id="from"
                    placeholder="Date From"
                    {...register('from', {
                      valueAsDate: true,
                    })}
                    autoComplete="off"
                  />

                  {errors.from && (
                    <p className="error-text mb-0">
                      {errors.from?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* leave from type */}
            {/* <div className="col-12 col-sm-6">
              <div className="form-icon-container">
                <div>
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="maritalStatus"
                  >
                    Leave From
                  </label>
                  <select
                    className={
                      errors.leaveFrom
                        ? 'form-select error'
                        : 'form-select'
                    }
                    id="maritalStatus"
                    {...register('leaveFrom')}
                  >
                    <option value="" defaultValue="">
                      Select Leave From
                    </option>
                    {leaveTypes &&
                      leaveTypes.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  {errors.leaveFrom && (
                    <p className="error-text">
                      {errors.leaveFrom?.message}
                    </p>
                  )}
                </div>
              </div>
            </div> */}
            <div className="col-12 col-sm-6">
              <div className="form-icon-container">
                <div >
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="leaveTo"
                  >
                    Leave From
                  </label>
                  <select
                    className={
                      errors.leaveFrom
                        ? 'form-select error'
                        : 'form-select'
                    }
                    id="leaveFrom"
                    {...register('leaveFrom')}
                    autoComplete="off"
                  >
                    <option value="" defaultValue="">
                      Select Leave From
                    </option>

                    {leaveTypes &&
                      leaveTypes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>

                  {errors.leaveFrom && (
                    <p className="error-text mb-0">
                      {errors.leaveFrom.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* to date */}
            <div className="col-12 col-sm-6">
              <div className="form-icon-container">
                <div >
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="to"
                  >
                    To Date
                  </label>
                  <input
                    className={
                      errors.to
                        ? 'form-control error'
                        : 'form-control'
                    }
                    type="date"
                    id="to"
                    placeholder="To"
                    {...register('to', {
                      valueAsDate: true,
                    })}
                    autoComplete="off"
                  />

                  {errors.to && (
                    <p className="error-text mb-0">
                      {errors.to.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Leave To Type */} {/* commented code below does not show leave from and leave to and the uncommented does show it
            issue is uncommented code does not fetch the older value type here dont know why */ }
            {/* <div className="col-12 col-sm-6">
              <div className="form-icon-container">
                <div >
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="leaveTypeCode"
                  >
                    Leave To
                  </label>
                  <select
                    className={
                      errors.leaveTo
                        ? 'form-select error'
                        : 'form-select'
                    }
                    id="leaveTo"
                    placeholder=""
                    {...register('leaveTo')}
                    autoComplete="off"
                  >
                    <option value="" defaultValue="">
                      Select Leave To
                    </option>

                    {leaveTypes &&
                      leaveTypes.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>

                  {errors.leaveTo && (
                    <p className="error-text mb-0">
                      {errors.leaveTo.message}
                    </p>
                  )}
                </div>
              </div>
            </div> */}

            <div className="col-12 col-sm-6">
              <div className="form-icon-container">
                <div >
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="leaveTo"
                  >
                    Leave To
                  </label>
                  <select
                    className={
                      errors.leaveTo
                        ? 'form-select error'
                        : 'form-select'
                    }
                    id="leaveTo"
                    {...register('leaveTo')}
                    autoComplete="off"
                  >
                    <option value="" defaultValue="">
                      Select Leave To
                    </option>

                    {leaveTypes &&
                      leaveTypes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>

                  {errors.leaveTo && (
                    <p className="error-text mb-0">
                      {errors.leaveTo.message}
                    </p>
                  )}
                </div>
              </div>
            </div>


            {/* leave category */}
            <div className="col-12 col-sm-6">
              <div className="form-icon-container">
                <div >
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="leaveCategoryCode"
                  >
                    Leave Category
                  </label>
                  <select
                    className={
                      errors.leaveCategoryCode
                        ? 'form-select error'
                        : 'form-select'
                    }
                    id="leaveCategoryCode"
                    placeholder=""
                    {...register('leaveCategoryCode')}
                    autoComplete="off"
                  >
                    <option value="" defaultValue="">
                      Select Leave Category
                    </option>

                    {leaveCategories &&
                      leaveCategories.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>

                  {errors.leaveCategoryCode && (
                    <p className="error-text mb-0">
                      {errors.leaveCategoryCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>


            {/* leave type */}
            <div className="col-12 col-sm-6">
              <div className="form-icon-container">
                <div >
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="leaveTypeCode"
                  >
                    Leave Type
                  </label>
                  <select
                    className={
                      errors.leaveTypeCode
                        ? 'form-select error'
                        : 'form-select'
                    }
                    id="leaveTypeCode"
                    placeholder=""
                    {...register('leaveTypeCode')}
                    autoComplete="off"
                  >
                    <option value="" defaultValue="">
                      Select Leave Type
                    </option>

                    {leaveTypes &&
                      leaveTypes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>

                  {errors.leaveTypeCode && (
                    <p className="error-text mb-0">
                      {errors.leaveTypeCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>


            {/* reason */}
            {/* <div className="col-12 col-sm-4">
                              <div className="form-icon-container">
                                <div >
                                  <input
                                    className={
                                      errors.reason
                                        ? 'form-control error'
                                        : 'form-control'
                                    }
                                    type="text"
                                    placeholder="reason for leave application"
                                    id="reason"
                                    {...register('reason')}
                                    autoComplete="off"
                                  />
                                  <label
                                    className="text-700 form-icon-label"
                                    htmlFor="reason"
                                  >
                                    Reason
                                  </label>
                                  {errors.reason && (
                                    <p className="error-text mb-0">
                                      {errors.reason?.message}
                                    </p>
                                  )}
                                </div>
                                <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                              </div>
                            </div> */}

            <div className="col-12">
              <div className="form-icon-container">
                <div >
                  <label
                    className="text-700 form-icon-label"
                    htmlFor="reason"
                  >
                    Reason
                  </label>
                  <textarea
                    className={
                      errors.reason
                        ? 'form-control error'
                        : 'form-control'
                    }
                    id="reason"
                    style={{ height: '115px' }}
                    placeholder="Reason"
                    {...register('reason')}
                  ></textarea>

                  {errors.reason && (
                    <p className="error-text mb-0">
                      {errors.reason?.message}
                    </p>
                  )}
                </div>
                <span className="fa-solid fa-circle-info text-900 fs--1 form-icon"></span>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-12">
          <div className="rounded border-300 mb-4">

          </div>
        </div>
        <div className="text-end my-4">
          <div>
            <button className="btn btn-secondary me-2 p-2 px-3" type="reset">
              Cancel Changes
            </button>
            <button className="btn btn-success p-2 px-3" type="submit" >
              {leaveRequestId ? 'Save Update' : 'Apply Leave'}
            </button>
          </div>
        </div>
      </form>

    </>
    // </div>
    //</div>
    // </div>
    // </div> 
  );
}

export default Leaveapply;
