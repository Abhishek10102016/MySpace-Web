import { gql } from '../../types';

export const GET_ALL_EMPLOYEES = gql(`
query getAllEmployees($commonRequest:CommonPaginationRequestInput!){
  employeeList(commonRequest: $commonRequest){
    statusCode
    result{
      employeeList{
           userId
           employeeId
           firstName
           middleName
           lastName
           email
           dateOfBirth
           gender
           status
           maritalStatus
           nationality
        }
        totalCount
      }     
      errorMessage          
  }
}
`);

export const GET_EMPLOYEE_BY_ID = gql(`
query getEmployeeById($empId:Int!){
    employeeById(empId: $empId){
      statusCode
      result{
        userId
        employeeId
        firstName
        middleName
        lastName
        fatherName
        spouseName
        nomineeName
        nomineeRelation
        email
        dateOfBirth
        gender
        maritalStatus
        mentorId
        nationality
        otherNationality
        pan
        aadhar
        status
        supervisorId        
      }
      errorMessage
    }
}
`);

export const GET_PERSONAL_DETAILS = gql(`
query getPersonalDetails{
  personalDetails{
    statusCode
    result{          
      employeeId
      firstName
      middleName
      lastName
      dateOfBirth
      gender
      maritalStatus
      pan
      aadhar
      email
      nationality
      fatherName
      spouseName
      nomineeName
      nomineeRelation
    }
    errorMessage
  }
}   
 `);

export const GET_BANK_DETAILS = gql(`

query getBankDetails($employeeId:Int!){

    bankDetails(employeeId: $employeeId){
      statusCode
      result{
        bankDeatilsId
        employeeId  
        accountNumber  
        ifscCode  
        branch  
        name  
        isCompanyProvided
      }
      errorMessage
    }
  }
`);

// export const GET_TOTAL_COUNT = gql(`

// query getEmployeeCount {

//     employeeCount

// }

// `);

export const GET_USER_DETAILS = gql(`
query getUserId {
    userDetails{
      statusCode
      result{
        userId
        userName
      }
      errorMessage     
    }
}`);

export const EMPLOYEMENT_DETAILS = gql(`
query employmentByEmployee($employeeId : Int!){
  employmentByEmployee(employeeId: $employeeId){
      statusCode
      result{             
          employmentId
          employeeId
          dateOfJoining
          dateOfLeaving
          departmentId
          designationId
          employmentType
          workMode
          uan
          esic
          companyProvidedBankAccountId
          ctc
          status
          createdDate
          createdBy
          modifiedDate
          modifiedBy           
      }
      errorMessage
  }
}
`);
