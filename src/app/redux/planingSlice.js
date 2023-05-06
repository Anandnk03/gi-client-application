import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosInstance from './../services/AxiosInstance';
import { Alert } from '../services/AlertService';

const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  submitstatus: 'idle',
  fetchedAt: null,
  data: [],
};

export const fetchData = createAsyncThunk(
  'plan/planingData',
  async (ModuleId) => {
    const response = await AxiosInstance.get(`viewdept/view/${ModuleId}`);
    return response.data[0];
  }
);

export const addPlan = createAsyncThunk(
  'plan/addPlan',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(`add`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const planingSlice = createSlice({
  name: 'planing',
  initialState: initialState,
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
    [fetchData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchData.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [addPlan.fulfilled]: (state, action) => {
      state.submitstatus = 'succeeded';
      Alert('success', action.payload.status);
      console.log('action.payload', action.payload.status);
    },
  },
});

export default planingSlice.reducer;
