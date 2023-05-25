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

export const fetchData = createAsyncThunk('plan/planingData', async (data) => {
  const response = await AxiosInstance.get(`plans/${data}`);
  return response.data.data[0];
});

export const addPlan = createAsyncThunk(
  'plan/addPlan',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(`plans`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const updatePlan = createAsyncThunk(
  'plan/updatePlan',
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await AxiosInstance.put('Plans', data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const archivePlan = createAsyncThunk(
  'plan/archive',
  async (data, { rejectWithValue }) => {
    try {
      console.log('archivePlan', data);
      const response = await AxiosInstance.delete(`plans/delete/${data}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.msg);
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
      Alert('success', action.payload.msg);
      state.data.push({ ...action.payload.data });
    },
    [addPlan.pending]: (state, action) => {
      state.submitstatus = 'Submiting';
    },
    [addPlan.rejected]: (state, action) => {
      console.log(action.payload);
      Alert('error', action.payload);
    },
    [updatePlan.fulfilled]: (state, action) => {
      Alert('success', action.payload.msg);
      state.data.push(action.payload.data);
    },
    [updatePlan.pending]: (state, action) => {
      state.state = 'Loading';
    },
    [updatePlan.rejected]: (state, action) => {
      state.status = 'failed';
    },

    [archivePlan.fulfilled]: (state, action) => {
      state.submitstatus = 'succeeded';
      Alert('success', action.payload.msg);
    },
  },
});

export default planingSlice.reducer;
