export type bank = {
  bankDeatilsId?: number | null;
  employeeId?: number | null;
  accountNumber?: string | null;
  ifscCode?: string | null;
  branch?: string | null;
  name?: string | null;
  isCompanyProvided?: boolean | null;
};

export type mentor = {
  employeeId: number;
  employeeName: string;
};

export type designation = {
  designationId: number;
  name: string;
  employments: [];
};

export type department = {
  departmentId: number;
  name: string;
  createdDate?: Date;
  createdBy?: number;
  modifiedDate?: null;
  modifiedBy?: null;
  employments?: [];
};

export type employment = {
  employmentId?: number;
  employeeId: number | undefined;
  dateOfJoining: Date | string;
  dateOfLeaving?: Date;
  departmentId: number;
  designationId: number;
  employmentType: string;
  workMode: string;
  uan: string | null;
  esic: string | null;
  companyProvidedBankAccountId?: number;
  ctc: number | null;
  status?: string;
};

export type employee = {
  employeeId: number;
  userId: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  email: string;
  dateOfBirth?: Date | string;
  gender: string;
  maritalStatus: string;
  pan?: string;
  aadhar?: string;
  bankDetails?: bank[] | null;
  nationality: string;
  otherNationality?: string | null;
  fatherName: string;
  spouseName?: string | null;
  nomineeName?: string | null;
  nomineeRelation?: string | null;
  supervisorId?: number | null;
  status: string | null;
  mentorId?: number | null;
  defaultReportingManager?: number | null;
  employeeStatusCode?: string | null;
  employeeDeactivationReasonCode?: string | null;
  remarks?: string | null;
  isProfileCompleted?: boolean | null;
  createdDate?: Date | null;
  createdBy?: number | null;
  modifiedDate?: Date | null;
  modifiedBy?: number | null;
  defaultReportingManagerNavigation?: object | null;
  employment?: employment | null;
  inverseDefaultReportingManagerNavigation?: [] | null;
  inverseMentor?: [] | null;
  leaveRequests?: [] | null;
  mentor?: object | null;
  projects?: [] | null;
};

export type leaveRequest = {
  leaveRequestId?: number | null;
  name?: string;
  userId?: number;
  leaveFrom?: string | null;
  leaveTo?: string | null;
  leaveCategoryCode: string;
  leaveTypeCode: string;
  from: Date | string;
  to: Date | string;
  reason: string;
  days?: number | null;
  leaveStatusCode?: string;
  status?: string;
  approverId?: number | null;
  requestedTo: number;
  requestedFor?: string;
  approverResponseDate?: string | Date | null;
  approverRemarks?: string | null;
  createdDate?: Date | string;
  createdBy?: number;
  modifiedDate?: Date | string | null;
  modifiedBy?: number | null;
  approver?: employee | null;
};
export type leaveRequestModel = {
  leaveRequestId?: number;
  name?: string;
  from: Date | string | any;
  to: Date | string | any;
  status?: string;
  days?: number | null;
  requestedTo: string;
};

export type employeePersonalDetails = {
  employeeId?: number | null;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  dateOfBirth?: Date | string;
  email?: string | null;
  gender: string;
  maritalStatus: string;
  pan?: string;
  aadhar?: string;
  nationality: string;
  fatherName: string;
  spouseName?: string | null;
  nomineeName?: string | null;
  nomineeRelation?: string | null;
};

export type employeeBankDetails = {
  bankDetails: bank[];
};

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IRegisterFormValues {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}

export interface ITableInitialValues {
  pageCount: number;
  rowCount: number;
  sortBy: string;
  orderBy: string;
  searchBy?: string;
  totalCount?: number;
}

export interface getEmployeesResponseModel {
  statusCode: number;
  result: {
    employeeList: employee[];
    totalCount: number;
  };
  errorMessage: string[];
}

export interface getLeavesResponseModel {
  statusCode: number;
  result: leaveRequest[];
  errorMessage: string[] | null;
}

export interface getEmployeeListUsingGraphQl {
  employeeList: employee[];
}

export interface IDepartment {
  departmentId: number;
  name: string;
}

export interface IDepartmentResponse {
  statusCode: number;
  result: {
    departmentList: IDepartment[];
    totalCount: number;
  };
  errorMessage: string[];
}

export interface IAddDepartmentResponse {
  statusCode: number;
  result: boolean;
  errorMessage: string[];
}

export interface IAddDepartment {
  departmentName: string;
}

export interface IUpdateDepartment {
  departmentId: number;
  departmentName: string;
}

export interface IDepartmentById {
  statusCode: number;
  result: {
    departmentId: number;
    name: string;
  };
  errorMessage: string[];
}

export type userDetails = {
  email: string;
  employeeId: number;
  name: string;
  role: string;
  permissions: [string] | null;
};

export type leaveApplyRequest = {
  leaveRequestId?: number | null;
  name?: string;
  userId?: number;
  leaveFrom?: string | null;
  leaveTo?: string | null;
  leaveCategoryCode: string;
  leaveTypeCode: string;
  from: Date | string;
  to: Date | string;
  reason: string;
  days?: number | null;
  leaveStatusCode?: string;
  status?: string;
  approverId?: number | null;
  requestedTo: number;
  requestedFor?: string;
  approverResponseDate?: string | Date | null;
  approverRemarks?: string | null;
  createdDate?: Date | string;
  createdBy?: number;
  modifiedDate?: Date | string | null;
  modifiedBy?: number | null;
  approver?: employee | null;
  remark: string;
};

export type leaveAcceptReject = {
  leaveRequestId: Number;
  leaveStatusCode: String;
  remark: String;
  approverId: Number;
};
export type leavesStatusCode = {
  id: String;
  name: String;
};
