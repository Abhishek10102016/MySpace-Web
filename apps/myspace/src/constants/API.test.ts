import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import { createAPIEndpoint, APICONSTANT } from './API';  // Replace with the actual import path

// Create a new instance of the Axios Mock Adapter
const mock = new MockAdapter(axios);

describe('API Endpoint Tests', () => {
  // Create an instance of the API endpoint for testing
  const employeeAPI = createAPIEndpoint(APICONSTANT.ENDPOINTS.EMPLOYEE.EMPLOYEE_LIST);
  
  // Mock the Axios GET request for fetching all employees
  it('fetches all employees', async () => {
    const mockData = [{ id: 1, name: 'Employee 1' }, { id: 2, name: 'Employee 2' }];
    mock.onGet(APICONSTANT.BASE_URL + APICONSTANT.ENDPOINTS.EMPLOYEE.EMPLOYEE_LIST).reply(200, mockData);

    const response = await employeeAPI.fetchAll();
    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockData);
  });

  // Mock the Axios GET request for fetching an employee by ID
  it('fetches an employee by ID', async () => {
    const employeeId = 1;
    const mockData = { id: employeeId, name: 'Employee 1' };
    mock.onGet(APICONSTANT.BASE_URL + APICONSTANT.ENDPOINTS.EMPLOYEE.EMPLOYEE_LIST + employeeId).reply(200, mockData);

    const response = await employeeAPI.fetchById(employeeId);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockData);
  });

  // Similarly, you can write tests for other API methods (create, update, delete, etc.)
});
