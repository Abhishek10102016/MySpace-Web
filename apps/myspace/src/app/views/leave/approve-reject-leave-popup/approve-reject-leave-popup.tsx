
import { Modal } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { leaveRequest, leaveRequestModel, mentor, leaveApplyRequest, leavesStatusCode } from '../../../../types/types';
import { leavesQuery } from '../../../../services/graphql/leaveQueries';
import { useMutation, useQuery } from '@apollo/client';
import {
  leaveCategories,
  leaveTypes,
  fetchMentors,
  RequestedForTypes,
  leaveStatusAction,
} from '../../../../constants/Static';
import { LeavesMutation } from '../../../../services/graphql/leaveMutation';
import { ApproveRejectLeaveRequestModelInput } from '../../../../types/graphql';
import { toast } from 'react-toastify';

/* eslint-disable-next-line */
export interface ApplyLeavePopupProps {
  leaveRequestId: number,
  leaveApplyModal: boolean,
  setLeaveApplyModal: Function
}
const validationSchema: ZodType<leaveApplyRequest> = z
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
    remark: z
      .string()
      .nonempty({ message: 'Please add remark' }),


  })
  .refine((data) => data.from <= data.to, {
    message: 'End date of leave must be greater than Start date',
    path: ['to'], // path of error
  });

export function ApplyLeavePopup(props: ApplyLeavePopupProps) {
  const { leaveRequestId, leaveApplyModal, setLeaveApplyModal } = props;
  const formRef = useRef(null)
  const [clickedButton, setClickedButton] = useState<string>("");

  let leaveData = null;
  let data: any = null;

  if (leaveRequestId !== null) {
    leaveData = useQuery(leavesQuery.GET_LEAVE_REQUEST_BY_ID, {
      variables: {
        requestId: Number(leaveRequestId),
      },
      fetchPolicy: 'no-cache',
    });
    data = leaveData.data?.leaveRequestById.result;
  }
  const [acceptRejectLeave] = useMutation(LeavesMutation.AcceptRejectLeave, {
    refetchQueries: [leavesQuery.GET_LEAVE_LIST],
  });

  console.log("datadata", data)

  const {
    register, handleSubmit, reset, formState: { errors }, } = useForm<leaveApplyRequest>({
      resolver: zodResolver(validationSchema),
    });
  useEffect(() => {
    if (data) {
      data.from = data.from.toString().split('T')[0];
      data.to = data.to.toString().split('T')[0]
    }
    reset(data)
  }, [data])


  const onSubmit: SubmitHandler<leaveApplyRequest> = async (reqObj) => {
    let statusAction: leavesStatusCode | undefined;
    if (clickedButton) {
      statusAction = leaveStatusAction.find((action) => action.name === clickedButton);

      const payload = {
        leaveRequestId: leaveRequestId,
        leaveStatusCode: statusAction?.id,
        remark: reqObj.remark,
        approverId: reqObj.requestedTo
      }
      await acceptRejectLeave({
        variables: {
          request: payload as ApproveRejectLeaveRequestModelInput,
        },
      }).then((result) => {
        setLeaveApplyModal(false)
        toast.success(` Leave ${statusAction?.name} !`)
      }).catch((error) => {
        setLeaveApplyModal(false)
        toast.success(`Something went wrong`)
      })


    }

    // if (leaveRequestId !== null) {
    //   reqObj.leaveRequestId = leaveRequestId;
    //   console.log(reqObj, "ReqObject for update leave")
    //   await updateLeaveRequest({
    //     variables: {
    //       request: reqObj as UpdateLeaveRequestModelInput,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       // navigate("/Myleaves") my leaves pr to hu me abhi why should i navigate to myleaves
    //       props.showEmployeeModal = false
    //       ToastrService.success('Updated leave successfully');
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       ToastrService.error('Failed to Update, Retry!');
    //     });
    // }
    // else {
    //   console.log(reqObj, "ReqObject to leave")
    //   await addLeaveRequest({
    //     variables: {
    //       request: reqObj as AddLeaveRequestModelInput,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       navigate("/Myleaves")
    //       ToastrService.success('Applied for leave successfully');
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       ToastrService.error('Failed to apply, Retry');
    //     });
    // }
  };
  const handleButton = (e: any) => {
    setClickedButton(e.target.name)
  }

  return (
    <Modal
      show={leaveApplyModal}
      onHide={() => setLeaveApplyModal(false)}
      className="leave_modal"
    >
      <Modal.Header>
        <div className="modal-header d-flex w-100 p-1">
          <div>
            <h4 className="mb-0">{leaveRequestId ? 'Update Leave' : 'Apply Leave'}</h4>
          </div>

          <div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setLeaveApplyModal(false)}
            ></button>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className="p-2 bg-white rounded mb-6 box-shadow">
            <div className="row g-3">

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
                      disabled
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
              <div className="col-12 col-sm-6">
                <div className="form-icon-container">
                  <div >
                    <label
                      className="text-700 form-icon-label"
                      htmlFor="leaveFrom"
                    >
                      Leave From
                    </label>
                    <select
                      className={
                        errors.leaveFrom
                          ? 'form-select error'
                          : 'form-select'
                      }
                      disabled
                      id="leaveFrom"
                      placeholder=""
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
                      disabled
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

              {/* Leave To Type */}
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
                      disabled
                      placeholder=''
                      {...register('leaveTo')}
                      autoComplete="off"
                    >
                      <option value="" defaultValue="">
                        Select Leave To
                      </option>

                      {leaveTypes &&
                        leaveTypes.map((item) => (
                          <option key={item.id} value={item.id} >
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
                      disabled
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
                      disabled
                      placeholder=""
                      {...register('leaveTypeCode')}
                      autoComplete="off"
                    >
                      <option value="" defaultValue="" >
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
                      disabled
                      style={{ height: '115px' }}
                      // placeholder="Reason"
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
              <hr />

              <div className="col-12">
                <div className="form-icon-container">
                  <div >
                    <label
                      className="text-700 form-icon-label"
                      htmlFor="reason"
                    >
                      Remark
                    </label>
                    <textarea
                      className={
                        errors.reason
                          ? 'form-control error'
                          : 'form-control'
                      }
                      id="remark"
                      style={{ height: '115px' }}
                      // placeholder="Reason"
                      {...register('remark')}
                    ></textarea>

                    {errors.remark && (
                      <p className="error-text mb-0">
                        {errors.remark?.message}
                      </p>
                    )}
                  </div>
                  <span className="fa-solid fa-circle-info text-900 fs--1 form-icon"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-end my-4">
            <div>
              <button className="btn btn-success me-2 p-2 px-3" type="submit" name="Approve" onClick={(e: any) => handleButton(e)}>
                Approve
              </button>
              <button className="btn btn-success p-2 px-3" type="submit" name="Reject" onClick={(e: any) => handleButton(e)} >
                Reject
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ApplyLeavePopup;
