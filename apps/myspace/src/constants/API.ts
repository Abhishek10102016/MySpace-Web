import axios from 'axios';

export const APICONSTANT = {
  // BASE_URL: 'http://20.20.20.78:5008/api/',
  BASE_URL: 'http://20.20.20.21:85/api/',
  ENDPOINTS: {
    AUTH: {
      LOGIN: 'Auth/token',
    },
    EMPLOYEE: {
      EMPLOYEE_LIST: 'employee?',
      EMPLOYEE_EDIT: 'employee',
      EMPLOYEE_REGISTER: 'Employee/employeeRegistration',
      MENTOR_LIST: 'employee/mentor-list',
      EMPLOYEE_PERSONAL_DETAILS: 'employee/personal-details',
    },
    DEPARTMENT: 'department',
    DESIGNATION: 'designation',
    LEAVE: {
      LEAVE_REQUEST_LIST: 'LeaveRequest?',
      LEAVE_REQUEST: 'LeaveRequest',
    },
  },
};

export const createAPIEndpoint = (endpoint: string, searchParams?: string) => {
  let url = '';
  if (searchParams) {
    url = APICONSTANT.BASE_URL + endpoint + searchParams;
  } else {
    url = APICONSTANT.BASE_URL + endpoint + '/';
  }
  return {
    fetchAll: async () => await axios.get(url),
    fetchById: async (id: number) => await axios.get(url + id),
    create: async (newRecord: object) => await axios.post(url, newRecord),
    update: async (id: number, updatedRecord: object) =>
      await axios.put(url + id, updatedRecord),
    updatePost: async (id: number, updatedRecord: object) =>
      await axios.post(url + id, updatedRecord),
    updatePut: async (updatedRecord: object) =>
      await axios.put(url, updatedRecord),
    updateWithoutId: async (updatedRecord: object) =>
      await axios.put(url, updatedRecord),
    delete: async (id: number) => await axios.delete(url + id),
  };
};
