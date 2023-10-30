import { APICONSTANT, createAPIEndpoint } from '../../constants/API';
import { ITableInitialValues } from '../../types/types';

const getLeaveList = async (reqObj: ITableInitialValues) => {
  const searchParams = `PageCount=${reqObj.pageCount}&RowCount=${reqObj.rowCount}&SortBy=${reqObj.sortBy}&OrderBy=${reqObj.orderBy}&SearchBy=${reqObj.searchBy}`;
  const res = await createAPIEndpoint(
    APICONSTANT.ENDPOINTS.LEAVE.LEAVE_REQUEST_LIST,
    searchParams
  )
    .fetchAll()
    .then((res) => res.data);
  return res;
};

const applyLeave = async (data: object) => {
  const res = await createAPIEndpoint(APICONSTANT.ENDPOINTS.LEAVE.LEAVE_REQUEST)
    .create(data)
    .then((res) => res.data);
  return res;
};

export const leaveService = {
  getLeaveList,
  applyLeave,
};
