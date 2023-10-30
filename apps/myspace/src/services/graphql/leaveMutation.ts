import { gql } from '../../types';

const addLeave = gql(`
mutation applyForLeave($request: AddLeaveRequestModelInput!){
    addLeaveRequest(model: $request){
      statusCode
      result
      errorMessage
    }
}
`);

const updateLeave = gql(`
mutation updateLeave($request: UpdateLeaveRequestModelInput!){
  updateLeaveRequest(model: $request){
    statusCode,
    result,
    errorMessage
  }
}
`);
const AcceptRejectLeave = gql(`
mutation approveRejectLeaveRequest($request : ApproveRejectLeaveRequestModelInput!){
  approveRejectLeaveRequest(request: $request){
       statusCode
       result
       errorMessage
  }
}
`);

const cancelLeaveRequest = gql(`
mutation cancelLeaveRequest($leaveRequestId : Int!){
  cancelLeaveRequest(leaveRequestId: $leaveRequestId){
      statusCode
      result
      errorMessage
  }
}
`);

export const LeavesMutation = {
  addLeave,
  updateLeave,
  AcceptRejectLeave,
  cancelLeaveRequest,
};
