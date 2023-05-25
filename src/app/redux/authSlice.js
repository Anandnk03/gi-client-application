import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from '../services/AlertService';
import { handleAPILogin } from '../services/AuthService';
import AxiosInstance from '../services/AxiosInstance';
const initialState = {
  submitstatus: 'idle',
  status: 'idle',
};
export const LoginDetail = createAsyncThunk(
  'auth/StandardLogin',
  async (data, { rejectWithValue }) => {
    // const auth = getAuth();
    console.log(data);
    try {
      const apiRes = await handleAPILogin(data);
      if (!apiRes) return rejectWithValue({ code: 'Invalid Credentials' });
      return apiRes;
    } catch (error) {
      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  }
);

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [LoginDetail.pending]: (state, action) => {
      state.submitstatus = 'submitting';
    },
    [LoginDetail.fulfilled]: async (state, action) => {
      console.log('action.payload', action.payload.msg);
      state.submitstatus = 'succeeded';
      localStorage.setItem('token', action.payload.token);
    },
    [LoginDetail.rejected]: (state, action) => {
      state.submitstatus = 'failed';
      Alert('error', action.payload.code);
    },
    [createUser.pending]: (state, action) => {
      state.status = 'user';
    },
    [createUser.fulfilled]: (state, action) => {
      Alert('success', action.payload.msg);
    },
    [createUser.rejected]: (state, action) => {
      Alert('failed', action.payload);
    },
  },
});

export default auth.reducer;
