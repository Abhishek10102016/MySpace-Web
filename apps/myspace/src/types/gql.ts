/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddEmployee ($request: AddEmployeeModelInput!){\n    registerEmployee(request:$request ){\n      statusCode\n      result\n      errorMessage\n    }\n}\n": types.AddEmployeeDocument,
    " \nmutation addEmployeePersonalDetails ($request:PersonalDetailsInput!){\n  addEmployeePersonalDetails(request: $request){\n    statusCode\n    result\n    errorMessage\n  }\n}\n": types.AddEmployeePersonalDetailsDocument,
    " \nmutation updateEmployeePersonalDetails ($request:PersonalDetailsInput!){\n  updateEmployeePersonalDetails(request: $request){\n    statusCode\n    result\n    errorMessage\n  }\n}\n": types.UpdateEmployeePersonalDetailsDocument,
    "\n  mutation updateBankDetails ($bankDetails:[BankDeatilsModelInput!]!){\n  updateBankDetails(bankDetails: $bankDetails){\n      statusCode\n      result\n      errorMessage\n  }\n}\n": types.UpdateBankDetailsDocument,
    "\nmutation updateEmploymentasync($employmentModel : EmploymentModelInput!){\n  updateEmploymentasync(employmentModel: $employmentModel){\n       statusCode\n       result\n       errorMessage\n  }\n}\n": types.UpdateEmploymentasyncDocument,
    "\nquery getAllEmployees($commonRequest:CommonPaginationRequestInput!){\n  employeeList(commonRequest: $commonRequest){\n    statusCode\n    result{\n      employeeList{\n           userId\n           employeeId\n           firstName\n           middleName\n           lastName\n           email\n           dateOfBirth\n           gender\n           status\n           maritalStatus\n           nationality\n        }\n        totalCount\n      }     \n      errorMessage          \n  }\n}\n": types.GetAllEmployeesDocument,
    "\nquery getEmployeeById($empId:Int!){\n    employeeById(empId: $empId){\n      statusCode\n      result{\n        userId\n        employeeId\n        firstName\n        middleName\n        lastName\n        fatherName\n        spouseName\n        nomineeName\n        nomineeRelation\n        email\n        dateOfBirth\n        gender\n        maritalStatus\n        mentorId\n        nationality\n        otherNationality\n        pan\n        aadhar\n        status\n        supervisorId        \n      }\n      errorMessage\n    }\n}\n": types.GetEmployeeByIdDocument,
    "\nquery getPersonalDetails{\n  personalDetails{\n    statusCode\n    result{          \n      employeeId\n      firstName\n      middleName\n      lastName\n      dateOfBirth\n      gender\n      maritalStatus\n      pan\n      aadhar\n      email\n      nationality\n      fatherName\n      spouseName\n      nomineeName\n      nomineeRelation\n    }\n    errorMessage\n  }\n}   \n ": types.GetPersonalDetailsDocument,
    "\n\nquery getBankDetails($employeeId:Int!){\n\n    bankDetails(employeeId: $employeeId){\n      statusCode\n      result{\n        bankDeatilsId\n        employeeId  \n        accountNumber  \n        ifscCode  \n        branch  \n        name  \n        isCompanyProvided\n      }\n      errorMessage\n    }\n  }\n": types.GetBankDetailsDocument,
    "\nquery getUserId {\n    userDetails{\n      statusCode\n      result{\n        userId\n        userName\n      }\n      errorMessage     \n    }\n}": types.GetUserIdDocument,
    "\nquery employmentByEmployee($employeeId : Int!){\n  employmentByEmployee(employeeId: $employeeId){\n      statusCode\n      result{             \n          employmentId\n          employeeId\n          dateOfJoining\n          dateOfLeaving\n          departmentId\n          designationId\n          employmentType\n          workMode\n          uan\n          esic\n          companyProvidedBankAccountId\n          ctc\n          status\n          createdDate\n          createdBy\n          modifiedDate\n          modifiedBy           \n      }\n      errorMessage\n  }\n}\n": types.EmploymentByEmployeeDocument,
    "\nmutation applyForLeave($request: AddLeaveRequestModelInput!){\n    addLeaveRequest(model: $request){\n      statusCode\n      result\n      errorMessage\n    }\n}\n": types.ApplyForLeaveDocument,
    "\nmutation updateLeave($request: UpdateLeaveRequestModelInput!){\n  updateLeaveRequest(model: $request){\n    statusCode,\n    result,\n    errorMessage\n  }\n}\n": types.UpdateLeaveDocument,
    "\nmutation approveRejectLeaveRequest($request : ApproveRejectLeaveRequestModelInput!){\n  approveRejectLeaveRequest(request: $request){\n       statusCode\n       result\n       errorMessage\n  }\n}\n": types.ApproveRejectLeaveRequestDocument,
    "\nmutation cancelLeaveRequest($leaveRequestId : Int!){\n  cancelLeaveRequest(leaveRequestId: $leaveRequestId){\n      statusCode\n      result\n      errorMessage\n  }\n}\n": types.CancelLeaveRequestDocument,
    "\nquery getLeaves($commonRequest:CommonPaginationRequestInput!){\n      leaveRequestList(commonRequest: $commonRequest){\n         statusCode\n         result {\n          leaveRequestList{\n            leaveRequestId,\n            name,\n            from,\n            to,\n            days,\n            status,\n            requestedTo\n          }\n          totalCount\n         }\n       errorMessage\n      }\n}\n": types.GetLeavesDocument,
    "\nquery getMyLeaveList{\n  myLeaves{\n      statusCode\n      result{\n          leaveRequestId,\n          from,\n          to,\n          days,\n          leaveStatusCode\n      }\n      errorMessage\n  }\n}\n": types.GetMyLeaveListDocument,
    "\nquery getLeavesForApprover($commonRequest:CommonPaginationRequestInput!){\n  leaveRequestListForApprover(request: $commonRequest){\n     statusCode\n     result {\n      leaveRequestList{\n        leaveRequestId,\n        name,\n        from,\n        to,\n        days,\n        status,\n        requestedTo\n      }\n      totalCount\n     }\n   errorMessage\n  }\n}\n": types.GetLeavesForApproverDocument,
    " \nquery getLeaveRequestById($requestId : Int!){\n  leaveRequestById(requestId: $requestId){\n     statusCode\n     result{\n      leaveRequestId\n      userId\n      leaveCategoryCode\n      leaveTypeCode\n      from \n      to\n      leaveFrom\n      leaveTo\n      requestedTo\n      reason\n      requestedFor\n     }\n     errorMessage\n  }\n}\n": types.GetLeaveRequestByIdDocument,
    "\nquery getUserDetails{\n  userPermissions{\n  statusCode\n  result{\n    employeeId,\n    name,\n    email,\n    role,\n    permissions\n  }\n  errorMessage\n  }\n}\n": types.GetUserDetailsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddEmployee ($request: AddEmployeeModelInput!){\n    registerEmployee(request:$request ){\n      statusCode\n      result\n      errorMessage\n    }\n}\n"): (typeof documents)["\n  mutation AddEmployee ($request: AddEmployeeModelInput!){\n    registerEmployee(request:$request ){\n      statusCode\n      result\n      errorMessage\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \nmutation addEmployeePersonalDetails ($request:PersonalDetailsInput!){\n  addEmployeePersonalDetails(request: $request){\n    statusCode\n    result\n    errorMessage\n  }\n}\n"): (typeof documents)[" \nmutation addEmployeePersonalDetails ($request:PersonalDetailsInput!){\n  addEmployeePersonalDetails(request: $request){\n    statusCode\n    result\n    errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \nmutation updateEmployeePersonalDetails ($request:PersonalDetailsInput!){\n  updateEmployeePersonalDetails(request: $request){\n    statusCode\n    result\n    errorMessage\n  }\n}\n"): (typeof documents)[" \nmutation updateEmployeePersonalDetails ($request:PersonalDetailsInput!){\n  updateEmployeePersonalDetails(request: $request){\n    statusCode\n    result\n    errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateBankDetails ($bankDetails:[BankDeatilsModelInput!]!){\n  updateBankDetails(bankDetails: $bankDetails){\n      statusCode\n      result\n      errorMessage\n  }\n}\n"): (typeof documents)["\n  mutation updateBankDetails ($bankDetails:[BankDeatilsModelInput!]!){\n  updateBankDetails(bankDetails: $bankDetails){\n      statusCode\n      result\n      errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation updateEmploymentasync($employmentModel : EmploymentModelInput!){\n  updateEmploymentasync(employmentModel: $employmentModel){\n       statusCode\n       result\n       errorMessage\n  }\n}\n"): (typeof documents)["\nmutation updateEmploymentasync($employmentModel : EmploymentModelInput!){\n  updateEmploymentasync(employmentModel: $employmentModel){\n       statusCode\n       result\n       errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getAllEmployees($commonRequest:CommonPaginationRequestInput!){\n  employeeList(commonRequest: $commonRequest){\n    statusCode\n    result{\n      employeeList{\n           userId\n           employeeId\n           firstName\n           middleName\n           lastName\n           email\n           dateOfBirth\n           gender\n           status\n           maritalStatus\n           nationality\n        }\n        totalCount\n      }     \n      errorMessage          \n  }\n}\n"): (typeof documents)["\nquery getAllEmployees($commonRequest:CommonPaginationRequestInput!){\n  employeeList(commonRequest: $commonRequest){\n    statusCode\n    result{\n      employeeList{\n           userId\n           employeeId\n           firstName\n           middleName\n           lastName\n           email\n           dateOfBirth\n           gender\n           status\n           maritalStatus\n           nationality\n        }\n        totalCount\n      }     \n      errorMessage          \n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getEmployeeById($empId:Int!){\n    employeeById(empId: $empId){\n      statusCode\n      result{\n        userId\n        employeeId\n        firstName\n        middleName\n        lastName\n        fatherName\n        spouseName\n        nomineeName\n        nomineeRelation\n        email\n        dateOfBirth\n        gender\n        maritalStatus\n        mentorId\n        nationality\n        otherNationality\n        pan\n        aadhar\n        status\n        supervisorId        \n      }\n      errorMessage\n    }\n}\n"): (typeof documents)["\nquery getEmployeeById($empId:Int!){\n    employeeById(empId: $empId){\n      statusCode\n      result{\n        userId\n        employeeId\n        firstName\n        middleName\n        lastName\n        fatherName\n        spouseName\n        nomineeName\n        nomineeRelation\n        email\n        dateOfBirth\n        gender\n        maritalStatus\n        mentorId\n        nationality\n        otherNationality\n        pan\n        aadhar\n        status\n        supervisorId        \n      }\n      errorMessage\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getPersonalDetails{\n  personalDetails{\n    statusCode\n    result{          \n      employeeId\n      firstName\n      middleName\n      lastName\n      dateOfBirth\n      gender\n      maritalStatus\n      pan\n      aadhar\n      email\n      nationality\n      fatherName\n      spouseName\n      nomineeName\n      nomineeRelation\n    }\n    errorMessage\n  }\n}   \n "): (typeof documents)["\nquery getPersonalDetails{\n  personalDetails{\n    statusCode\n    result{          \n      employeeId\n      firstName\n      middleName\n      lastName\n      dateOfBirth\n      gender\n      maritalStatus\n      pan\n      aadhar\n      email\n      nationality\n      fatherName\n      spouseName\n      nomineeName\n      nomineeRelation\n    }\n    errorMessage\n  }\n}   \n "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\nquery getBankDetails($employeeId:Int!){\n\n    bankDetails(employeeId: $employeeId){\n      statusCode\n      result{\n        bankDeatilsId\n        employeeId  \n        accountNumber  \n        ifscCode  \n        branch  \n        name  \n        isCompanyProvided\n      }\n      errorMessage\n    }\n  }\n"): (typeof documents)["\n\nquery getBankDetails($employeeId:Int!){\n\n    bankDetails(employeeId: $employeeId){\n      statusCode\n      result{\n        bankDeatilsId\n        employeeId  \n        accountNumber  \n        ifscCode  \n        branch  \n        name  \n        isCompanyProvided\n      }\n      errorMessage\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getUserId {\n    userDetails{\n      statusCode\n      result{\n        userId\n        userName\n      }\n      errorMessage     \n    }\n}"): (typeof documents)["\nquery getUserId {\n    userDetails{\n      statusCode\n      result{\n        userId\n        userName\n      }\n      errorMessage     \n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery employmentByEmployee($employeeId : Int!){\n  employmentByEmployee(employeeId: $employeeId){\n      statusCode\n      result{             \n          employmentId\n          employeeId\n          dateOfJoining\n          dateOfLeaving\n          departmentId\n          designationId\n          employmentType\n          workMode\n          uan\n          esic\n          companyProvidedBankAccountId\n          ctc\n          status\n          createdDate\n          createdBy\n          modifiedDate\n          modifiedBy           \n      }\n      errorMessage\n  }\n}\n"): (typeof documents)["\nquery employmentByEmployee($employeeId : Int!){\n  employmentByEmployee(employeeId: $employeeId){\n      statusCode\n      result{             \n          employmentId\n          employeeId\n          dateOfJoining\n          dateOfLeaving\n          departmentId\n          designationId\n          employmentType\n          workMode\n          uan\n          esic\n          companyProvidedBankAccountId\n          ctc\n          status\n          createdDate\n          createdBy\n          modifiedDate\n          modifiedBy           \n      }\n      errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation applyForLeave($request: AddLeaveRequestModelInput!){\n    addLeaveRequest(model: $request){\n      statusCode\n      result\n      errorMessage\n    }\n}\n"): (typeof documents)["\nmutation applyForLeave($request: AddLeaveRequestModelInput!){\n    addLeaveRequest(model: $request){\n      statusCode\n      result\n      errorMessage\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation updateLeave($request: UpdateLeaveRequestModelInput!){\n  updateLeaveRequest(model: $request){\n    statusCode,\n    result,\n    errorMessage\n  }\n}\n"): (typeof documents)["\nmutation updateLeave($request: UpdateLeaveRequestModelInput!){\n  updateLeaveRequest(model: $request){\n    statusCode,\n    result,\n    errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation approveRejectLeaveRequest($request : ApproveRejectLeaveRequestModelInput!){\n  approveRejectLeaveRequest(request: $request){\n       statusCode\n       result\n       errorMessage\n  }\n}\n"): (typeof documents)["\nmutation approveRejectLeaveRequest($request : ApproveRejectLeaveRequestModelInput!){\n  approveRejectLeaveRequest(request: $request){\n       statusCode\n       result\n       errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation cancelLeaveRequest($leaveRequestId : Int!){\n  cancelLeaveRequest(leaveRequestId: $leaveRequestId){\n      statusCode\n      result\n      errorMessage\n  }\n}\n"): (typeof documents)["\nmutation cancelLeaveRequest($leaveRequestId : Int!){\n  cancelLeaveRequest(leaveRequestId: $leaveRequestId){\n      statusCode\n      result\n      errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getLeaves($commonRequest:CommonPaginationRequestInput!){\n      leaveRequestList(commonRequest: $commonRequest){\n         statusCode\n         result {\n          leaveRequestList{\n            leaveRequestId,\n            name,\n            from,\n            to,\n            days,\n            status,\n            requestedTo\n          }\n          totalCount\n         }\n       errorMessage\n      }\n}\n"): (typeof documents)["\nquery getLeaves($commonRequest:CommonPaginationRequestInput!){\n      leaveRequestList(commonRequest: $commonRequest){\n         statusCode\n         result {\n          leaveRequestList{\n            leaveRequestId,\n            name,\n            from,\n            to,\n            days,\n            status,\n            requestedTo\n          }\n          totalCount\n         }\n       errorMessage\n      }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getMyLeaveList{\n  myLeaves{\n      statusCode\n      result{\n          leaveRequestId,\n          from,\n          to,\n          days,\n          leaveStatusCode\n      }\n      errorMessage\n  }\n}\n"): (typeof documents)["\nquery getMyLeaveList{\n  myLeaves{\n      statusCode\n      result{\n          leaveRequestId,\n          from,\n          to,\n          days,\n          leaveStatusCode\n      }\n      errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getLeavesForApprover($commonRequest:CommonPaginationRequestInput!){\n  leaveRequestListForApprover(request: $commonRequest){\n     statusCode\n     result {\n      leaveRequestList{\n        leaveRequestId,\n        name,\n        from,\n        to,\n        days,\n        status,\n        requestedTo\n      }\n      totalCount\n     }\n   errorMessage\n  }\n}\n"): (typeof documents)["\nquery getLeavesForApprover($commonRequest:CommonPaginationRequestInput!){\n  leaveRequestListForApprover(request: $commonRequest){\n     statusCode\n     result {\n      leaveRequestList{\n        leaveRequestId,\n        name,\n        from,\n        to,\n        days,\n        status,\n        requestedTo\n      }\n      totalCount\n     }\n   errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \nquery getLeaveRequestById($requestId : Int!){\n  leaveRequestById(requestId: $requestId){\n     statusCode\n     result{\n      leaveRequestId\n      userId\n      leaveCategoryCode\n      leaveTypeCode\n      from \n      to\n      leaveFrom\n      leaveTo\n      requestedTo\n      reason\n      requestedFor\n     }\n     errorMessage\n  }\n}\n"): (typeof documents)[" \nquery getLeaveRequestById($requestId : Int!){\n  leaveRequestById(requestId: $requestId){\n     statusCode\n     result{\n      leaveRequestId\n      userId\n      leaveCategoryCode\n      leaveTypeCode\n      from \n      to\n      leaveFrom\n      leaveTo\n      requestedTo\n      reason\n      requestedFor\n     }\n     errorMessage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getUserDetails{\n  userPermissions{\n  statusCode\n  result{\n    employeeId,\n    name,\n    email,\n    role,\n    permissions\n  }\n  errorMessage\n  }\n}\n"): (typeof documents)["\nquery getUserDetails{\n  userPermissions{\n  statusCode\n  result{\n    employeeId,\n    name,\n    email,\n    role,\n    permissions\n  }\n  errorMessage\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;