import { APICONSTANT, createAPIEndpoint } from '../../constants/API';
import {
  ITableInitialValues,
  employee,
  employeePersonalDetails,
} from '../../types/types';

export const registerEmployee = async (data: object) => {
  const res = await createAPIEndpoint(
    APICONSTANT.ENDPOINTS.EMPLOYEE.EMPLOYEE_REGISTER
  )
    .create(data)
    .then((res) => res.data);
  return res;
};

const getEmployeeList = async (reqObj: ITableInitialValues) => {
  const searchParams = `PageCount=${reqObj.pageCount}&RowCount=${reqObj.rowCount}&SortBy=${reqObj.sortBy}&OrderBy=${reqObj.orderBy}&SearchBy=${reqObj.searchBy}`;
  const res = await createAPIEndpoint(
    APICONSTANT.ENDPOINTS.EMPLOYEE.EMPLOYEE_LIST,
    searchParams
  )
    .fetchAll()
    .then((res) => res.data);
  return res;
};

const getEmployeeById = async (id: number) => {
  const res = await createAPIEndpoint(
    APICONSTANT.ENDPOINTS.EMPLOYEE.EMPLOYEE_EDIT
  )
    .fetchById(id)
    .then((res) => res.data);
  return res;
};

const updateEmployee = async (reqObj: employee) => {
  const res = await createAPIEndpoint(
    APICONSTANT.ENDPOINTS.EMPLOYEE.EMPLOYEE_EDIT
  )
    .updatePut(reqObj)
    .then((res) => res.data);
  return res;
};

const updateEmployeePersonalDetails = async (
  reqObj: employeePersonalDetails,
  id: number
) => {
  const res = await createAPIEndpoint(
    APICONSTANT.ENDPOINTS.EMPLOYEE.EMPLOYEE_PERSONAL_DETAILS
  )
    .updatePost(id, reqObj)
    .then((res) => res.data);

  return res;
};

const deleteEmployee = async (id: number) => {
  const res = await createAPIEndpoint(
    APICONSTANT.ENDPOINTS.EMPLOYEE.EMPLOYEE_EDIT
  )
    .delete(id)
    .then((res) => res.data);
  return res;
};

const getMentorList = async () => {
  const res = await createAPIEndpoint(
    APICONSTANT.ENDPOINTS.EMPLOYEE.MENTOR_LIST
  )
    .fetchAll()
    .then((res) => res.data);
  return res;
};

export const employeeService = {
  getEmployeeList,
  getEmployeeById,
  updateEmployee,
  registerEmployee,
  deleteEmployee,
  getMentorList,
  updateEmployeePersonalDetails,
};
