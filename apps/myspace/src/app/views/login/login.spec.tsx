import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from './login';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { authService } from '../../../services/API/Login';
import { APICONSTANT } from '../../../constants/API';
import { ILoginFormValues } from '../../../types/types';

// Create a new instance of the mock adapter
// const mock = new MockAdapter(axios);
// jest.mock('./fetchData', () => ({
//   fetchData: async () => 'Mocked Data', // Provide a custom implementation
// }));

// describe('Login', () => {
//   it('should render successfully', () => {
//     const { baseElement } = render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );
//     expect(baseElement).toBeTruthy();
//   });
// });

// describe('getToken Function', () => {
//   const email = 'hradesh.shivastav@mindruby.com';
//   const password = 'Ideavate@123';
//   const expectedToken =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiaHJhZGVzaC5zaHJpdmFzdGF2IiwiRW1haWwiOiJocmFkZXNoLnNoaXZhc3RhdkBtaW5kcnVieS5jb20iLCJVc2VySWQiOiIxMDEyIiwiZXhwIjoxNjk1OTgxOTg3LCJpc3MiOiJNeVNwYWNlLk1pbmRydWJ5IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMzEvIn0.13RTCZt7wdTNuuqMYg-n07M3mi9ai7WlCVdZy0TDKWY';

//   it('should make a successful API request and return the expected token', async () => {
//     // Mock the API request
//     mock
//       .onPost('http://20.20.20.21:85/api/Auth/token', {
//         email,
//         password,
//       })
//       .reply(200, {
//         token: expectedToken,
//       });

//     try {
//       // Call the getToken function
//       const token = String(await authService.getToken({ email, password }));

//       // Assertions
//       expect(token).toBe(expectedToken);
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   });

//   // it('should handle API request errors', async () => {
//   //   // Mock a failed API request with a 500 internal server error
//   //   mock
//   //     .onPost('http://20.20.20.21:85/api/Auth/token', {
//   //       email,
//   //       password,
//   //     })
//   //     .reply(500);

//   //   // Call the getToken function
//   //   try {
//   //     await authService.getToken({ email, password });
//   //   } catch (error: any) {
//   //     // Ensure that an error is thrown
//   //     expect(error.message).toBe('Failed to get a token');
//   //   }
//   // });
// });

// Create a mock implementation for authService.getToken
export const mockGetToken = async (reqObj: ILoginFormValues) => {
  // Simulate the behavior of the getToken function
  if (
    reqObj.email === 'hradesh.shivastav@mindruby.com' &&
    reqObj.password === 'Ideavate@123'
  ) {
    // Simulate a successful response with a token
    return { token: 'mockedToken123' };
  } else {
    // Simulate an error response
    throw new Error('Authentication failed');
  }
};

// Create a mock authService object
const mockAuthService = {
  getToken: mockGetToken,
};

describe('Login Component', () => {
  beforeEach(() => {
    // Replace the getToken function with our mock implementation
    authService.getToken = mockGetToken;
  });

  it('should render the login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign In');

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  it('should call authService.getToken on form submission', async () => {
    // const { navigate } = useLink();

    // Mock the response from authService.getToken
    // authService.getToken.mockResolvedValue('mockedToken123');

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign In');

    fireEvent.change(emailInput, {
      target: { value: 'hradesh.shivastav@mindruby.com' },
    });
    fireEvent.change(passwordInput, { target: { value: 'Ideavate@123' } });

    fireEvent.click(submitButton);

    // Wait for the getToken function to be called
    await waitFor(() => {
      expect(authService.getToken).toHaveBeenCalledWith({
        email: 'hradesh.shivastav@mindruby.com',
        password: 'Ideavate@123',
      });
    });

    // Expect navigation to have been called with the correct route
    // navigate('/dashboard');
  });

  it('should display an error message on authentication failure', async () => {
    // Mock an error response from authService.getToken
    // authService.getToken.mockRejectedValue(new Error('Authentication failed'));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Wait for the error message to be displayed
    await waitFor(() => {
      const errorMessage = screen.getByText(
        'Something went wrong Authentication failed'
      );
      expect(errorMessage).toBeDefined();
    });
  });
});
