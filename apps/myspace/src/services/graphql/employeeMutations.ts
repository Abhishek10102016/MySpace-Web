import { gql } from '../../types';

export const REGISTER_EMPLOYEE = gql(`
  mutation AddEmployee ($request: AddEmployeeModelInput!){
    registerEmployee(request:$request ){
      statusCode
      result
      errorMessage
    }
}
`);

// export const UPDATE_EMPLOYEE =
//   gql(`mutation UpdateEmployee ($request: EmployeeModelInput!){
//     updateEmployee(request: $request)
// }`);

//server mutation for personal details update for user
// export const UPDATE_EMPLOYEE_PERSONAL_DETAILS =
//   gql(` mutation updatePersonalDetails ($request:PersonalDetailsInput!){
//   updateEmployeePersonalDetails(request: $request)
// }`);

//local host mutation
export const ADD_EMPLOYEE_PERSONAL_DETAILS = gql(` 
mutation addEmployeePersonalDetails ($request:PersonalDetailsInput!){
  addEmployeePersonalDetails(request: $request){
    statusCode
    result
    errorMessage
  }
}
`);
// localhost mutation
export const UPDATE_EMPLOYEE_PERSONAL_DETAILS = gql(` 
mutation updateEmployeePersonalDetails ($request:PersonalDetailsInput!){
  updateEmployeePersonalDetails(request: $request){
    statusCode
    result
    errorMessage
  }
}
`);

export const UPDATE_EMPLOYEE_BANK_DETAILS = gql(`
  mutation updateBankDetails ($bankDetails:[BankDeatilsModelInput!]!){
  updateBankDetails(bankDetails: $bankDetails){
      statusCode
      result
      errorMessage
  }
}
`);
export const UPDATE_EMPLOYEMENT = gql(`
mutation updateEmploymentasync($employmentModel : EmploymentModelInput!){
  updateEmploymentasync(employmentModel: $employmentModel){
       statusCode
       result
       errorMessage
  }
}
`);
