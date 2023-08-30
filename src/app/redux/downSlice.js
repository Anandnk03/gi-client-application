import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosInstance from './../services/AxiosInstance';
import { Alert } from '../services/AlertService';

const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  fetchedAt: null,
  data: [],
  optionData: [],
};

export const fetchData = createAsyncThunk(
  'downTime/downTime',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`downTime/${data}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const fetchDownReason = createAsyncThunk(
  'fetchReason/downTime',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`downTime/reason/master`);
      return response.data.data[0];
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const updateReason = createAsyncThunk(
  'update/downTime',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(`downTime`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);
export const NewReason = createAsyncThunk(
  'update/downTime',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(`downTime`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const downTimeSlice = createSlice({
  name: 'downTime',
  initialState: initialState,
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchData.fulfilled]: (state, action) => {
      state.data = action.payload;
      console.log(action.payload);
      state.status = 'succeeded';
    },
    [fetchDownReason.fulfilled]: (state, action) => {
      const data = [];
      action.payload.map((da) => {
        return data.push({
          value: da.DownTimeId,
          label: da.Reason,
        });
      });
      state.optionData = data;
      state.status = 'succeeded';
    },
    [updateReason.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      console.log(action.payload.msg);
      Alert('success', action.payload.msg);
    },
    [NewReason.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      console.log(action.payload.msg);
      Alert('success', action.payload.msg);
    },
  },
});

export default downTimeSlice.reducer;
