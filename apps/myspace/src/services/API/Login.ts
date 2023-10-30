import { APICONSTANT, createAPIEndpoint } from '../../constants/API';
import { ILoginFormValues } from '../../types/types';

const getToken = async (reqObj: ILoginFormValues) => {
  const res = await createAPIEndpoint(APICONSTANT.ENDPOINTS.AUTH.LOGIN)
    .create(reqObj)
    .then((res) => res.data);
  return res;
};

export const authService = {
  getToken,
};
