import { APICONSTANT, createAPIEndpoint } from '../../constants/API';

const getAllDesignations = async () => {
  const res = await createAPIEndpoint(APICONSTANT.ENDPOINTS.DESIGNATION)
    .fetchAll()
    .then((res) => res.data);
  return res;
};

export const designationService = {
  getAllDesignations,
};
