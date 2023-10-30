import { gql } from '../../types';

const GET_USER_DETAILS = gql(`
query getUserDetails{
  userPermissions{
  statusCode
  result{
    employeeId,
    name,
    email,
    role,
    permissions
  }
  errorMessage
  }
}
`);

export const userQueries = {
  GET_USER_DETAILS,
};
