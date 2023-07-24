import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosInstance from './../services/AxiosInstance';
import { Alert } from '../services/AlertService';

const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  submitStatus: 'idle',
  fetchedAt: null,
  data: [],
  hourly: [],
};

export const fetchData = createAsyncThunk(
  'dashboard/fetchData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        data?.sDate != undefined
          ? `dashboard/productionData/${data?.id}/${data?.sDate}/${data?.shift}`
          : `dashboard/productionData/${data?.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const hourlyData = createAsyncThunk(
  'dashboard/hourlyData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        data?.sDate != undefined
          ? `dashboard/hourlyData/${data?.id}/${data?.sDate}/${data?.shift}`
          : `dashboard/hourlyData/${data?.id}`
      );

      return response.data.data[0];
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
    [hourlyData.fulfilled]: (state, action) => {
      state.hourly = action.payload;
      state.status = 'succeeded';
    },
  },
});

export default dashboardSlice.reducer;
