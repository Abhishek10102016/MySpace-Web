import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { userDetails } from '../../types/types';
import { nullable } from 'zod';

// Define a type for the slice state
export interface userState {
  userId: number;
  employeeId: number;
  userDetails: userDetails;
}

// Define the initial state using that type
const initialState: userState = {
  userId: 0,
  employeeId: 0,
  userDetails: {
    email: '',
    employeeId: 0,
    name: '',
    role: '',
    permissions: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    // addUserId: (state, action: PayloadAction<number>) => {
    //   state.userId = action.payload;
    // },
    // addEmployeeId: (state, action: PayloadAction<number>) => {
    //   state.employeeId = action.payload;
    // },
    // addUserPermissions: (state, action: PayloadAction<userDetails>) => {
    //   state.userDetails = action.payload;
    // },
    addUserPermissions: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    resetUserPersissions: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    }
  },
});

export const { addUserPermissions, resetUserPersissions } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.user.userId;

export default userSlice.reducer;
