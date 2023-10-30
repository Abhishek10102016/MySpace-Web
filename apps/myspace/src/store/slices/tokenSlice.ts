import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Define a type for the slice state
export interface tokenState {
  value: string;
}

// Define the initial state using that type
const initialState: tokenState = {
  value: '',
};

const tokenSlice = createSlice({
  name: 'token',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      
    },
  },
});

export const { addToken } = tokenSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.token.value;

export default tokenSlice.reducer;
