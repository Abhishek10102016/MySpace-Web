/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The built-in `Decimal` scalar type. */
  Decimal: { input: any; output: any; }
};

export type AddEmployeeModelInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type AddLeaveRequestModelInput = {
  from: Scalars['DateTime']['input'];
  leaveCategoryCode: Scalars['String']['input'];
  leaveFrom: Scalars['String']['input'];
  leaveTo: Scalars['String']['input'];
  leaveTypeCode: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  requestedFor: Scalars['String']['input'];
  requestedTo: Scalars['Int']['input'];
  to: Scalars['DateTime']['input'];
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type ApproveRejectLeaveRequestModelInput = {
  approverId: Scalars['Int']['input'];
  leaveRequestId: Scalars['Int']['input'];
  leaveStatusCode: Scalars['String']['input'];
  remark: Scalars['String']['input'];
};

export type BankDeatilsModelInput = {
  accountNumber: Scalars['String']['input'];
  bankDeatilsId: Scalars['Int']['input'];
  branch?: InputMaybe<Scalars['String']['input']>;
  employeeId: Scalars['Int']['input'];
  ifscCode?: InputMaybe<Scalars['String']['input']>;
  isCompanyProvided?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type BankDetail = {
  __typename?: 'BankDetail';
  accountNumber: Scalars['String']['output'];
  bankDeatilsId: Scalars['Int']['output'];
  branch?: Maybe<Scalars['String']['output']>;
  employee: Employee;
  employeeId: Scalars['Int']['output'];
  ifscCode?: Maybe<Scalars['String']['output']>;
  isCompanyProvided?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** The scope of a cache hint. */
export enum CacheControlScope {
  /** The value to cache is specific to a single user. */
  Private = 'PRIVATE',
  /** The value to cache is not tied to a single user. */
  Public = 'PUBLIC'
}

export type Client = {
  __typename?: 'Client';
  clientId: Scalars['Int']['output'];
  country?: Maybe<Country>;
  countryId?: Maybe<Scalars['Int']['output']>;
  createdBy: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  isInternal?: Maybe<Scalars['Boolean']['output']>;
  modifiedBy?: Maybe<Scalars['Int']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  projects: Array<Project>;
};

export type CommonPaginationRequestInput = {
  orderBy: Scalars['String']['input'];
  pageCount: Scalars['Int']['input'];
  rowCount: Scalars['Int']['input'];
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy: Scalars['String']['input'];
};

export type Country = {
  __typename?: 'Country';
  clients: Array<Client>;
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Department = {
  __typename?: 'Department';
  createdBy: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  departmentId: Scalars['Int']['output'];
  employments: Array<Employment>;
  modifiedBy?: Maybe<Scalars['Int']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
};

export type Designation = {
  __typename?: 'Designation';
  designationId: Scalars['Int']['output'];
  employments: Array<Employment>;
  name: Scalars['String']['output'];
};

export type Employee = {
  __typename?: 'Employee';
  aadhar?: Maybe<Scalars['String']['output']>;
  bankDetails: Array<BankDetail>;
  createdBy: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  employeeDeactivationReasonCode?: Maybe<Scalars['String']['output']>;
  employeeId: Scalars['Int']['output'];
  employments: Array<Employment>;
  fatherName?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  inverseMentor: Array<Employee>;
  isProfileCompleted?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  leaveRequestApprovers: Array<LeaveRequest>;
  leaveRequestRequestedToNavigations: Array<LeaveRequest>;
  maritalStatus?: Maybe<Scalars['String']['output']>;
  mentor?: Maybe<Employee>;
  mentorId?: Maybe<Scalars['Int']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  modifiedBy?: Maybe<Scalars['Int']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  nomineeName?: Maybe<Scalars['String']['output']>;
  nomineeRelation?: Maybe<Scalars['String']['output']>;
  otherNationality?: Maybe<Scalars['String']['output']>;
  pan?: Maybe<Scalars['String']['output']>;
  projects: Array<Project>;
  remarks?: Maybe<Scalars['String']['output']>;
  spouseName?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type EmployeeListModel = {
  __typename?: 'EmployeeListModel';
  employeeList: Array<GetEmployeeListModel>;
  totalCount: Scalars['Int']['output'];
};

export type EmployeeModel = {
  __typename?: 'EmployeeModel';
  aadhar?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  defaultReportingManager?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  employeeDeactivationReasonCode?: Maybe<Scalars['String']['output']>;
  employeeId: Scalars['Int']['output'];
  fatherName?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  isProfileCompleted?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  maritalStatus?: Maybe<Scalars['String']['output']>;
  mentorId?: Maybe<Scalars['Int']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  nomineeName?: Maybe<Scalars['String']['output']>;
  nomineeRelation?: Maybe<Scalars['String']['output']>;
  otherNationality?: Maybe<Scalars['String']['output']>;
  pan?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  spouseName?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  supervisorId?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type Employment = {
  __typename?: 'Employment';
  companyProvidedBankAccountId: Scalars['Int']['output'];
  createdBy: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  ctc?: Maybe<Scalars['Decimal']['output']>;
  dateOfJoining?: Maybe<Scalars['DateTime']['output']>;
  dateOfLeaving?: Maybe<Scalars['DateTime']['output']>;
  department: Department;
  departmentId: Scalars['Int']['output'];
  designation: Designation;
  designationId: Scalars['Int']['output'];
  employee: Employee;
  employeeId: Scalars['Int']['output'];
  employmentId: Scalars['Int']['output'];
  employmentType?: Maybe<Scalars['String']['output']>;
  esic?: Maybe<Scalars['String']['output']>;
  modifiedBy?: Maybe<Scalars['Int']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  uan?: Maybe<Scalars['String']['output']>;
  workMode?: Maybe<Scalars['String']['output']>;
};

export type EmploymentModelInput = {
  companyProvidedBankAccountId?: InputMaybe<Scalars['Int']['input']>;
  createdBy: Scalars['Int']['input'];
  createdDate: Scalars['DateTime']['input'];
  ctc?: InputMaybe<Scalars['Decimal']['input']>;
  dateOfJoining?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfLeaving?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId: Scalars['Int']['input'];
  designationId: Scalars['Int']['input'];
  employeeId: Scalars['Int']['input'];
  employmentId: Scalars['Int']['input'];
  employmentType?: InputMaybe<Scalars['String']['input']>;
  esic?: InputMaybe<Scalars['String']['input']>;
  modifiedBy?: InputMaybe<Scalars['Int']['input']>;
  modifiedDate?: InputMaybe<Scalars['DateTime']['input']>;
  status: Scalars['String']['input'];
  uan?: InputMaybe<Scalars['String']['input']>;
  workMode?: InputMaybe<Scalars['String']['input']>;
};

export type GetBankDetailsModel = {
  __typename?: 'GetBankDetailsModel';
  accountNumber?: Maybe<Scalars['String']['output']>;
  bankDeatilsId?: Maybe<Scalars['Int']['output']>;
  branch?: Maybe<Scalars['String']['output']>;
  employeeId?: Maybe<Scalars['Int']['output']>;
  ifscCode?: Maybe<Scalars['String']['output']>;
  isCompanyProvided?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type GetEmployeeListModel = {
  __typename?: 'GetEmployeeListModel';
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  employeeId: Scalars['Int']['output'];
  firstName: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  maritalStatus?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type GetUserDetailsModel = {
  __typename?: 'GetUserDetailsModel';
  userId: Scalars['Int']['output'];
  userName: Scalars['String']['output'];
};

export type LeaveRequest = {
  __typename?: 'LeaveRequest';
  approver?: Maybe<Employee>;
  approverId?: Maybe<Scalars['Int']['output']>;
  approverRemarks?: Maybe<Scalars['String']['output']>;
  approverResponseDate?: Maybe<Scalars['DateTime']['output']>;
  createdBy: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  days?: Maybe<Scalars['Decimal']['output']>;
  from: Scalars['DateTime']['output'];
  leaveCategoryCode: Scalars['String']['output'];
  leaveFrom: Scalars['String']['output'];
  leaveRequestId: Scalars['Int']['output'];
  leaveStatusCode: Scalars['String']['output'];
  leaveTo: Scalars['String']['output'];
  leaveTypeCode: Scalars['String']['output'];
  modifiedBy?: Maybe<Scalars['Int']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  reason: Scalars['String']['output'];
  requestedFor: Scalars['String']['output'];
  requestedTo: Scalars['Int']['output'];
  requestedToNavigation: Employee;
  to: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type LeaveRequestListModel = {
  __typename?: 'LeaveRequestListModel';
  leaveRequestList: Array<LeaveRequestModel>;
  totalCount: Scalars['Int']['output'];
};

export type LeaveRequestModel = {
  __typename?: 'LeaveRequestModel';
  days?: Maybe<Scalars['Decimal']['output']>;
  from: Scalars['DateTime']['output'];
  leaveRequestId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  requestedTo?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  to: Scalars['DateTime']['output'];
};

export type MentorModel = {
  __typename?: 'MentorModel';
  employeeId: Scalars['Int']['output'];
  employeeName: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addEmployeePersonalDetails: ResponseModelOfBoolean;
  addLeaveRequest: ResponseModelOfBoolean;
  approveRejectLeaveRequest: ResponseModelOfBoolean;
  cancelLeaveRequest: ResponseModelOfBoolean;
  registerEmployee: ResponseModelOfBoolean;
  updateBankDetails: ResponseModelOfBoolean;
  updateEmployeePersonalDetails: ResponseModelOfBoolean;
  updateEmploymentasync: ResponseModelOfBoolean;
  updateLeaveRequest: ResponseModelOfBoolean;
};


export type MutationAddEmployeePersonalDetailsArgs = {
  request: PersonalDetailsInput;
};


export type MutationAddLeaveRequestArgs = {
  model: AddLeaveRequestModelInput;
};


export type MutationApproveRejectLeaveRequestArgs = {
  request: ApproveRejectLeaveRequestModelInput;
};


export type MutationCancelLeaveRequestArgs = {
  leaveRequestId: Scalars['Int']['input'];
};


export type MutationRegisterEmployeeArgs = {
  request: AddEmployeeModelInput;
};


export type MutationUpdateBankDetailsArgs = {
  bankDetails: Array<BankDeatilsModelInput>;
};


export type MutationUpdateEmployeePersonalDetailsArgs = {
  request: PersonalDetailsInput;
};


export type MutationUpdateEmploymentasyncArgs = {
  employmentModel: EmploymentModelInput;
};


export type MutationUpdateLeaveRequestArgs = {
  model: UpdateLeaveRequestModelInput;
};

export type PersonalDetails = {
  __typename?: 'PersonalDetails';
  aadhar?: Maybe<Scalars['String']['output']>;
  dateOfBirth: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  employeeId: Scalars['Int']['output'];
  fatherName: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  maritalStatus: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
  nationality: Scalars['String']['output'];
  nomineeName?: Maybe<Scalars['String']['output']>;
  nomineeRelation?: Maybe<Scalars['String']['output']>;
  pan: Scalars['String']['output'];
  spouseName?: Maybe<Scalars['String']['output']>;
};

export type PersonalDetailsInput = {
  aadhar?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth: Scalars['DateTime']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  employeeId: Scalars['Int']['input'];
  fatherName: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  maritalStatus: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  nationality: Scalars['String']['input'];
  nomineeName?: InputMaybe<Scalars['String']['input']>;
  nomineeRelation?: InputMaybe<Scalars['String']['input']>;
  pan: Scalars['String']['input'];
  spouseName?: InputMaybe<Scalars['String']['input']>;
};

export type Project = {
  __typename?: 'Project';
  client: Client;
  clientId: Scalars['Int']['output'];
  code?: Maybe<Scalars['String']['output']>;
  createdBy: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  modifiedBy?: Maybe<Scalars['Int']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  projectId: Scalars['Int']['output'];
  projectManager?: Maybe<Employee>;
  projectManagerId?: Maybe<Scalars['Int']['output']>;
  projectResources: Array<ProjectResource>;
};

export type ProjectResource = {
  __typename?: 'ProjectResource';
  actualEndDate?: Maybe<Scalars['DateTime']['output']>;
  actualStartDate?: Maybe<Scalars['DateTime']['output']>;
  allocationType?: Maybe<Scalars['String']['output']>;
  createdBy: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  modifiedBy?: Maybe<Scalars['Int']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  monthlyHours?: Maybe<Scalars['Decimal']['output']>;
  plannedEndDate?: Maybe<Scalars['DateTime']['output']>;
  plannedStartDate?: Maybe<Scalars['DateTime']['output']>;
  project: Project;
  projectId: Scalars['Int']['output'];
  projectResourceId: Scalars['Int']['output'];
  roleId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  user: User;
  userId: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  bankDetails: ResponseModelOfListOfGetBankDetailsModel;
  employeeById: ResponseModelOfEmployeeModel;
  employeeList: ResponseModelOfEmployeeListModel;
  employmentByEmployee: ResponseModelOfEmployment;
  leaveRequestById: ResponseModelOfLeaveRequest;
  leaveRequestList: ResponseModelOfLeaveRequestListModel;
  leaveRequestListForApprover: ResponseModelOfLeaveRequestListModel;
  mentorList: ResponseModelOfListOfMentorModel;
  myLeaves: ResponseModelOfListOfLeaveRequest;
  personalDetails: ResponseModelOfPersonalDetails;
  userDetails: ResponseModelOfGetUserDetailsModel;
  userPermissions: ResponseModelOfUserPermissionModel;
};


export type QueryBankDetailsArgs = {
  employeeId: Scalars['Int']['input'];
};


export type QueryEmployeeByIdArgs = {
  empId: Scalars['Int']['input'];
};


export type QueryEmployeeListArgs = {
  commonRequest: CommonPaginationRequestInput;
};


export type QueryEmploymentByEmployeeArgs = {
  employeeId: Scalars['Int']['input'];
};


export type QueryLeaveRequestByIdArgs = {
  requestId: Scalars['Int']['input'];
};


export type QueryLeaveRequestListArgs = {
  commonRequest: CommonPaginationRequestInput;
};


export type QueryLeaveRequestListForApproverArgs = {
  request: CommonPaginationRequestInput;
};

export type ResponseModelOfBoolean = {
  __typename?: 'ResponseModelOfBoolean';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: Scalars['Boolean']['output'];
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfEmployeeListModel = {
  __typename?: 'ResponseModelOfEmployeeListModel';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: EmployeeListModel;
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfEmployeeModel = {
  __typename?: 'ResponseModelOfEmployeeModel';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: EmployeeModel;
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfEmployment = {
  __typename?: 'ResponseModelOfEmployment';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: Employment;
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfGetUserDetailsModel = {
  __typename?: 'ResponseModelOfGetUserDetailsModel';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: GetUserDetailsModel;
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfLeaveRequest = {
  __typename?: 'ResponseModelOfLeaveRequest';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: LeaveRequest;
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfLeaveRequestListModel = {
  __typename?: 'ResponseModelOfLeaveRequestListModel';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: LeaveRequestListModel;
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfListOfGetBankDetailsModel = {
  __typename?: 'ResponseModelOfListOfGetBankDetailsModel';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: Array<GetBankDetailsModel>;
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfListOfLeaveRequest = {
  __typename?: 'ResponseModelOfListOfLeaveRequest';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: Array<LeaveRequest>;
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfListOfMentorModel = {
  __typename?: 'ResponseModelOfListOfMentorModel';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: Array<MentorModel>;
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfPersonalDetails = {
  __typename?: 'ResponseModelOfPersonalDetails';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: PersonalDetails;
  statusCode: Scalars['Int']['output'];
};

export type ResponseModelOfUserPermissionModel = {
  __typename?: 'ResponseModelOfUserPermissionModel';
  errorMessage?: Maybe<Array<Scalars['String']['output']>>;
  result: UserPermissionModel;
  statusCode: Scalars['Int']['output'];
};

export type UpdateLeaveRequestModelInput = {
  from: Scalars['DateTime']['input'];
  leaveCategoryCode: Scalars['String']['input'];
  leaveFrom: Scalars['String']['input'];
  leaveRequestId: Scalars['Int']['input'];
  leaveTo: Scalars['String']['input'];
  leaveTypeCode: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  requestedFor: Scalars['String']['input'];
  requestedTo: Scalars['Int']['input'];
  to: Scalars['DateTime']['input'];
};

export type User = {
  __typename?: 'User';
  accessFailedCount: Scalars['Int']['output'];
  concurrencyStamp?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailConfirmed: Scalars['Boolean']['output'];
  employees: Array<Employee>;
  id: Scalars['Int']['output'];
  leaveRequests: Array<LeaveRequest>;
  lockoutEnabled: Scalars['Boolean']['output'];
  lockoutEnd?: Maybe<Scalars['DateTime']['output']>;
  normalizedEmail?: Maybe<Scalars['String']['output']>;
  normalizedUserName?: Maybe<Scalars['String']['output']>;
  passwordHash?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneNumberConfirmed: Scalars['Boolean']['output'];
  projectResources: Array<ProjectResource>;
  securityStamp?: Maybe<Scalars['String']['output']>;
  twoFactorEnabled: Scalars['Boolean']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type UserPermissionModel = {
  __typename?: 'UserPermissionModel';
  email?: Maybe<Scalars['String']['output']>;
  employeeId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Scalars['String']['output']>>;
  role?: Maybe<Scalars['String']['output']>;
};

export type AddEmployeeMutationVariables = Exact<{
  request: AddEmployeeModelInput;
}>;


export type AddEmployeeMutation = { __typename?: 'Mutation', registerEmployee: { __typename?: 'ResponseModelOfBoolean', statusCode: number, result: boolean, errorMessage?: Array<string> | null } };

export type AddEmployeePersonalDetailsMutationVariables = Exact<{
  request: PersonalDetailsInput;
}>;


export type AddEmployeePersonalDetailsMutation = { __typename?: 'Mutation', addEmployeePersonalDetails: { __typename?: 'ResponseModelOfBoolean', statusCode: number, result: boolean, errorMessage?: Array<string> | null } };

export type UpdateEmployeePersonalDetailsMutationVariables = Exact<{
  request: PersonalDetailsInput;
}>;


export type UpdateEmployeePersonalDetailsMutation = { __typename?: 'Mutation', updateEmployeePersonalDetails: { __typename?: 'ResponseModelOfBoolean', statusCode: number, result: boolean, errorMessage?: Array<string> | null } };

export type UpdateBankDetailsMutationVariables = Exact<{
  bankDetails: Array<BankDeatilsModelInput> | BankDeatilsModelInput;
}>;


export type UpdateBankDetailsMutation = { __typename?: 'Mutation', updateBankDetails: { __typename?: 'ResponseModelOfBoolean', statusCode: number, result: boolean, errorMessage?: Array<string> | null } };

export type UpdateEmploymentasyncMutationVariables = Exact<{
  employmentModel: EmploymentModelInput;
}>;


export type UpdateEmploymentasyncMutation = { __typename?: 'Mutation', updateEmploymentasync: { __typename?: 'ResponseModelOfBoolean', statusCode: number, result: boolean, errorMessage?: Array<string> | null } };

export type GetAllEmployeesQueryVariables = Exact<{
  commonRequest: CommonPaginationRequestInput;
}>;


export type GetAllEmployeesQuery = { __typename?: 'Query', employeeList: { __typename?: 'ResponseModelOfEmployeeListModel', statusCode: number, errorMessage?: Array<string> | null, result: { __typename?: 'EmployeeListModel', totalCount: number, employeeList: Array<{ __typename?: 'GetEmployeeListModel', userId?: number | null, employeeId: number, firstName: string, middleName?: string | null, lastName: string, email: string, dateOfBirth?: any | null, gender?: string | null, status?: string | null, maritalStatus?: string | null, nationality?: string | null }> } } };

export type GetEmployeeByIdQueryVariables = Exact<{
  empId: Scalars['Int']['input'];
}>;


export type GetEmployeeByIdQuery = { __typename?: 'Query', employeeById: { __typename?: 'ResponseModelOfEmployeeModel', statusCode: number, errorMessage?: Array<string> | null, result: { __typename?: 'EmployeeModel', userId?: number | null, employeeId: number, firstName: string, middleName?: string | null, lastName: string, fatherName?: string | null, spouseName?: string | null, nomineeName?: string | null, nomineeRelation?: string | null, email?: string | null, dateOfBirth?: any | null, gender?: string | null, maritalStatus?: string | null, mentorId?: number | null, nationality?: string | null, otherNationality?: string | null, pan?: string | null, aadhar?: string | null, status?: string | null, supervisorId?: number | null } } };

export type GetPersonalDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonalDetailsQuery = { __typename?: 'Query', personalDetails: { __typename?: 'ResponseModelOfPersonalDetails', statusCode: number, errorMessage?: Array<string> | null, result: { __typename?: 'PersonalDetails', employeeId: number, firstName: string, middleName?: string | null, lastName: string, dateOfBirth: any, gender: string, maritalStatus: string, pan: string, aadhar?: string | null, email?: string | null, nationality: string, fatherName: string, spouseName?: string | null, nomineeName?: string | null, nomineeRelation?: string | null } } };

export type GetBankDetailsQueryVariables = Exact<{
  employeeId: Scalars['Int']['input'];
}>;


export type GetBankDetailsQuery = { __typename?: 'Query', bankDetails: { __typename?: 'ResponseModelOfListOfGetBankDetailsModel', statusCode: number, errorMessage?: Array<string> | null, result: Array<{ __typename?: 'GetBankDetailsModel', bankDeatilsId?: number | null, employeeId?: number | null, accountNumber?: string | null, ifscCode?: string | null, branch?: string | null, name?: string | null, isCompanyProvided?: boolean | null }> } };

export type GetUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserIdQuery = { __typename?: 'Query', userDetails: { __typename?: 'ResponseModelOfGetUserDetailsModel', statusCode: number, errorMessage?: Array<string> | null, result: { __typename?: 'GetUserDetailsModel', userId: number, userName: string } } };

export type EmploymentByEmployeeQueryVariables = Exact<{
  employeeId: Scalars['Int']['input'];
}>;


export type EmploymentByEmployeeQuery = { __typename?: 'Query', employmentByEmployee: { __typename?: 'ResponseModelOfEmployment', statusCode: number, errorMessage?: Array<string> | null, result: { __typename?: 'Employment', employmentId: number, employeeId: number, dateOfJoining?: any | null, dateOfLeaving?: any | null, departmentId: number, designationId: number, employmentType?: string | null, workMode?: string | null, uan?: string | null, esic?: string | null, companyProvidedBankAccountId: number, ctc?: any | null, status?: string | null, createdDate: any, createdBy: number, modifiedDate?: any | null, modifiedBy?: number | null } } };

export type ApplyForLeaveMutationVariables = Exact<{
  request: AddLeaveRequestModelInput;
}>;


export type ApplyForLeaveMutation = { __typename?: 'Mutation', addLeaveRequest: { __typename?: 'ResponseModelOfBoolean', statusCode: number, result: boolean, errorMessage?: Array<string> | null } };

export type UpdateLeaveMutationVariables = Exact<{
  request: UpdateLeaveRequestModelInput;
}>;


export type UpdateLeaveMutation = { __typename?: 'Mutation', updateLeaveRequest: { __typename?: 'ResponseModelOfBoolean', statusCode: number, result: boolean, errorMessage?: Array<string> | null } };

export type ApproveRejectLeaveRequestMutationVariables = Exact<{
  request: ApproveRejectLeaveRequestModelInput;
}>;


export type ApproveRejectLeaveRequestMutation = { __typename?: 'Mutation', approveRejectLeaveRequest: { __typename?: 'ResponseModelOfBoolean', statusCode: number, result: boolean, errorMessage?: Array<string> | null } };

export type CancelLeaveRequestMutationVariables = Exact<{
  leaveRequestId: Scalars['Int']['input'];
}>;


export type CancelLeaveRequestMutation = { __typename?: 'Mutation', cancelLeaveRequest: { __typename?: 'ResponseModelOfBoolean', statusCode: number, result: boolean, errorMessage?: Array<string> | null } };

export type GetLeavesQueryVariables = Exact<{
  commonRequest: CommonPaginationRequestInput;
}>;


export type GetLeavesQuery = { __typename?: 'Query', leaveRequestList: { __typename?: 'ResponseModelOfLeaveRequestListModel', statusCode: number, errorMessage?: Array<string> | null, result: { __typename?: 'LeaveRequestListModel', totalCount: number, leaveRequestList: Array<{ __typename?: 'LeaveRequestModel', leaveRequestId: number, name: string, from: any, to: any, days?: any | null, status: string, requestedTo?: string | null }> } } };

export type GetMyLeaveListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyLeaveListQuery = { __typename?: 'Query', myLeaves: { __typename?: 'ResponseModelOfListOfLeaveRequest', statusCode: number, errorMessage?: Array<string> | null, result: Array<{ __typename?: 'LeaveRequest', leaveRequestId: number, from: any, to: any, days?: any | null, leaveStatusCode: string }> } };

export type GetLeavesForApproverQueryVariables = Exact<{
  commonRequest: CommonPaginationRequestInput;
}>;


export type GetLeavesForApproverQuery = { __typename?: 'Query', leaveRequestListForApprover: { __typename?: 'ResponseModelOfLeaveRequestListModel', statusCode: number, errorMessage?: Array<string> | null, result: { __typename?: 'LeaveRequestListModel', totalCount: number, leaveRequestList: Array<{ __typename?: 'LeaveRequestModel', leaveRequestId: number, name: string, from: any, to: any, days?: any | null, status: string, requestedTo?: string | null }> } } };

export type GetLeaveRequestByIdQueryVariables = Exact<{
  requestId: Scalars['Int']['input'];
}>;


export type GetLeaveRequestByIdQuery = { __typename?: 'Query', leaveRequestById: { __typename?: 'ResponseModelOfLeaveRequest', statusCode: number, errorMessage?: Array<string> | null, result: { __typename?: 'LeaveRequest', leaveRequestId: number, userId: number, leaveCategoryCode: string, leaveTypeCode: string, from: any, to: any, leaveFrom: string, leaveTo: string, requestedTo: number, reason: string, requestedFor: string } } };

export type GetUserDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDetailsQuery = { __typename?: 'Query', userPermissions: { __typename?: 'ResponseModelOfUserPermissionModel', statusCode: number, errorMessage?: Array<string> | null, result: { __typename?: 'UserPermissionModel', employeeId: number, name: string, email?: string | null, role?: string | null, permissions?: Array<string> | null } } };


export const AddEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddEmployeeModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<AddEmployeeMutation, AddEmployeeMutationVariables>;
export const AddEmployeePersonalDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEmployeePersonalDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonalDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEmployeePersonalDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<AddEmployeePersonalDetailsMutation, AddEmployeePersonalDetailsMutationVariables>;
export const UpdateEmployeePersonalDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateEmployeePersonalDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonalDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEmployeePersonalDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<UpdateEmployeePersonalDetailsMutation, UpdateEmployeePersonalDetailsMutationVariables>;
export const UpdateBankDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBankDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bankDetails"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BankDeatilsModelInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBankDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bankDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bankDetails"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<UpdateBankDetailsMutation, UpdateBankDetailsMutationVariables>;
export const UpdateEmploymentasyncDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateEmploymentasync"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employmentModel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmploymentModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEmploymentasync"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"employmentModel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employmentModel"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<UpdateEmploymentasyncMutation, UpdateEmploymentasyncMutationVariables>;
export const GetAllEmployeesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllEmployees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commonRequest"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommonPaginationRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commonRequest"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commonRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"maritalStatus"}},{"kind":"Field","name":{"kind":"Name","value":"nationality"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>;
export const GetEmployeeByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEmployeeById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"empId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"empId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"empId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"fatherName"}},{"kind":"Field","name":{"kind":"Name","value":"spouseName"}},{"kind":"Field","name":{"kind":"Name","value":"nomineeName"}},{"kind":"Field","name":{"kind":"Name","value":"nomineeRelation"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"maritalStatus"}},{"kind":"Field","name":{"kind":"Name","value":"mentorId"}},{"kind":"Field","name":{"kind":"Name","value":"nationality"}},{"kind":"Field","name":{"kind":"Name","value":"otherNationality"}},{"kind":"Field","name":{"kind":"Name","value":"pan"}},{"kind":"Field","name":{"kind":"Name","value":"aadhar"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"supervisorId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>;
export const GetPersonalDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPersonalDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"maritalStatus"}},{"kind":"Field","name":{"kind":"Name","value":"pan"}},{"kind":"Field","name":{"kind":"Name","value":"aadhar"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"nationality"}},{"kind":"Field","name":{"kind":"Name","value":"fatherName"}},{"kind":"Field","name":{"kind":"Name","value":"spouseName"}},{"kind":"Field","name":{"kind":"Name","value":"nomineeName"}},{"kind":"Field","name":{"kind":"Name","value":"nomineeRelation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<GetPersonalDetailsQuery, GetPersonalDetailsQueryVariables>;
export const GetBankDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBankDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bankDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"employeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bankDeatilsId"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"accountNumber"}},{"kind":"Field","name":{"kind":"Name","value":"ifscCode"}},{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCompanyProvided"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<GetBankDetailsQuery, GetBankDetailsQueryVariables>;
export const GetUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<GetUserIdQuery, GetUserIdQueryVariables>;
export const EmploymentByEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"employmentByEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employmentByEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"employeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employmentId"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfJoining"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfLeaving"}},{"kind":"Field","name":{"kind":"Name","value":"departmentId"}},{"kind":"Field","name":{"kind":"Name","value":"designationId"}},{"kind":"Field","name":{"kind":"Name","value":"employmentType"}},{"kind":"Field","name":{"kind":"Name","value":"workMode"}},{"kind":"Field","name":{"kind":"Name","value":"uan"}},{"kind":"Field","name":{"kind":"Name","value":"esic"}},{"kind":"Field","name":{"kind":"Name","value":"companyProvidedBankAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"ctc"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<EmploymentByEmployeeQuery, EmploymentByEmployeeQueryVariables>;
export const ApplyForLeaveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"applyForLeave"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddLeaveRequestModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLeaveRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"model"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<ApplyForLeaveMutation, ApplyForLeaveMutationVariables>;
export const UpdateLeaveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateLeave"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLeaveRequestModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLeaveRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"model"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<UpdateLeaveMutation, UpdateLeaveMutationVariables>;
export const ApproveRejectLeaveRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"approveRejectLeaveRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApproveRejectLeaveRequestModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveRejectLeaveRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<ApproveRejectLeaveRequestMutation, ApproveRejectLeaveRequestMutationVariables>;
export const CancelLeaveRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"cancelLeaveRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leaveRequestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelLeaveRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leaveRequestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leaveRequestId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<CancelLeaveRequestMutation, CancelLeaveRequestMutationVariables>;
export const GetLeavesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLeaves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commonRequest"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommonPaginationRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRequestList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commonRequest"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commonRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRequestList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRequestId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedTo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<GetLeavesQuery, GetLeavesQueryVariables>;
export const GetMyLeaveListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyLeaveList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myLeaves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRequestId"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"leaveStatusCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<GetMyLeaveListQuery, GetMyLeaveListQueryVariables>;
export const GetLeavesForApproverDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLeavesForApprover"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commonRequest"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommonPaginationRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRequestListForApprover"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commonRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRequestList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRequestId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedTo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<GetLeavesForApproverQuery, GetLeavesForApproverQueryVariables>;
export const GetLeaveRequestByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLeaveRequestById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRequestById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"requestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRequestId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"leaveCategoryCode"}},{"kind":"Field","name":{"kind":"Name","value":"leaveTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"leaveFrom"}},{"kind":"Field","name":{"kind":"Name","value":"leaveTo"}},{"kind":"Field","name":{"kind":"Name","value":"requestedTo"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"requestedFor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<GetLeaveRequestByIdQuery, GetLeaveRequestByIdQueryVariables>;
export const GetUserDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<GetUserDetailsQuery, GetUserDetailsQueryVariables>;