import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from '../services/AlertService';
import AxiosInstance from '../services/AxiosInstance';

const initialState = {
  submitStatus: 'idle',
  status: 'idle',
};
export const LoginDetail = createAsyncThunk(
  'auth/StandardLogin',
  async (data, { rejectWithValue }) => {
    // const auth = getAuth();
    try {
      const response = await AxiosInstance.post(`auth/login`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(`users/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [LoginDetail.pending]: (state, action) => {
      state.submitStatus = 'submitting';
    },
    [LoginDetail.fulfilled]: async (state, action) => {
      console.log('action.payload', action.payload);
      state.submitStatus = 'succeeded';
      localStorage.setItem('token', action.payload.token);
    },
    [LoginDetail.rejected]: (state, action) => {
      state.submitStatus = 'failed';
      console.log('action.payload', action.payload);
      Alert('error', action.payload.msg);
    },
    [createUser.pending]: (state, action) => {
      state.status = 'user';
    },
    [createUser.fulfilled]: (state, action) => {
      Alert('success', action.payload.msg);
    },
    [createUser.rejected]: (state, action) => {
      Alert('error', action.payload.msg);
    },
  },
});

export default auth.reducer;
