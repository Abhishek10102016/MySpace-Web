import { APICONSTANT, createAPIEndpoint } from '../../constants/API';
import { IAddDepartment } from '../../types/types';

const getAllDepartments = async () => {
  const res = await createAPIEndpoint(APICONSTANT.ENDPOINTS.DEPARTMENT)
    .fetchAll()
    .then((res) => res.data);
  return res;
};

const addDepartment = async (reqObj: IAddDepartment) => {
  const res = await createAPIEndpoint(APICONSTANT.ENDPOINTS.DEPARTMENT)
    .create(reqObj)
    .then((res) => res.data);

  return res;
};

const updateDepartment = async (reqObj: IAddDepartment) => {
  const res = await createAPIEndpoint(APICONSTANT.ENDPOINTS.DEPARTMENT)
    .updateWithoutId(reqObj)
    .then((res) => res.data);

  return res;
};

const getDepartmentById = async (id: number) => {
  const res = await createAPIEndpoint(APICONSTANT.ENDPOINTS.DEPARTMENT)
    .fetchById(id)
    .then((res) => res.data);

  return res;
};

const deleteDepartment = async (id: number) => {
  const res = await createAPIEndpoint(APICONSTANT.ENDPOINTS.DEPARTMENT)
    .delete(id)
    .then((res) => res.data);

  return res;
};

export const departmentService = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
