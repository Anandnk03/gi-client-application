import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from '../services/AlertService';
import AxiosInstance from '../services/AxiosInstance';
const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  fetchedAt: null,
  data: [],
  moduleData: [],
  machineData: [],
  productData: [],
};

export const department = createAsyncThunk('plan/department', async () => {
  const response = await AxiosInstance.get('communications/department');
  return response.data.data[0];
});

export const module = createAsyncThunk('plan/module', async (data) => {
  const response = await AxiosInstance.get(`communications/module/${data}`);
  return response.data.data[0];
});

export const machine = createAsyncThunk('plan/machine', async (data) => {
  const response = await AxiosInstance.get(`communications/machine/${data}`);
  return response.data.data[0];
});

export const product = createAsyncThunk('plan/product', async (data) => {
  const response = await AxiosInstance.get(`communications/product/${data}`);
  return response.data.data[0];
});

export const commSlice = createSlice({
  name: 'comm',
  initialState: initialState,
  extraReducers: {
    [department.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
    [department.pending]: (state, action) => {
      state.state = 'submitting';
    },
    [department.rejected]: (state, action) => {
      state.state = 'failed';
      Alert('error', action.payload.code);
    },
    [module.fulfilled]: (state, action) => {
      state.moduleData = action.payload;
      state.status = 'succeeded';
    },
    [machine.fulfilled]: (state, action) => {
      state.machineData = action.payload;
      state.status = 'succeeded';
    },
    [product.fulfilled]: (state, action) => {
      state.productData = action.payload;
      state.status = 'succeeded';
    },
  },
});

export default commSlice.reducer;
