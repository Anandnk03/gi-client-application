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
  'gapReason/fetchData',
  async (data) => {
    const response = await AxiosInstance.get(`gapReason/${data}`);
    return response.data.data;
  }
);

export const UpdateReason = createAsyncThunk(
  'gapReason/updateReason',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('gapReason/update', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const createMaster = createAsyncThunk(
  'gapReason/masterReason',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(`gapReason/newReason`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const reasonSlice = createSlice({
  name: 'reason',
  initialState: initialState,
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    },
    [fetchData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [UpdateReason.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [UpdateReason.rejected]: (state, action) => {
      console.log(state);
    },
    [createMaster.fulfilled]: (state, action) => {
      Alert('success', action.payload.msg);
    },
  },
});

export default reasonSlice.reducer;
