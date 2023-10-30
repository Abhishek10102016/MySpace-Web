import { gql } from '../../types';

const GET_LEAVE_LIST = gql(`
query getLeaves($commonRequest:CommonPaginationRequestInput!){
      leaveRequestList(commonRequest: $commonRequest){
         statusCode
         result {
          leaveRequestList{
            leaveRequestId,
            name,
            from,
            to,
            days,
            status,
            requestedTo
          }
          totalCount
         }
       errorMessage
      }
}
`);

const GET_MY_lEAVES = gql(`
query getMyLeaveList{
  myLeaves{
      statusCode
      result{
          leaveRequestId,
          from,
          to,
          days,
          leaveStatusCode
      }
      errorMessage
  }
}
`);

const GET_LEAVES_FOR_APPROVER = gql(`
query getLeavesForApprover($commonRequest:CommonPaginationRequestInput!){
  leaveRequestListForApprover(request: $commonRequest){
     statusCode
     result {
      leaveRequestList{
        leaveRequestId,
        name,
        from,
        to,
        days,
        status,
        requestedTo
      }
      totalCount
     }
   errorMessage
  }
}
`);
const GET_LEAVE_REQUEST_BY_ID = gql(` 
query getLeaveRequestById($requestId : Int!){
  leaveRequestById(requestId: $requestId){
     statusCode
     result{
      leaveRequestId
      userId
      leaveCategoryCode
      leaveTypeCode
      from 
      to
      leaveFrom
      leaveTo
      requestedTo
      reason
      requestedFor
     }
     errorMessage
  }
}
`);
export const leavesQuery = {
  GET_MY_lEAVES,
  GET_LEAVE_LIST,
  GET_LEAVES_FOR_APPROVER,
  GET_LEAVE_REQUEST_BY_ID
};
