import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../services/AxiosInstance';
import { Alert } from '../services/AlertService';

const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  fetchedAt: null,
  data: [],
  machineData: [],
  operationData: [],
};

export const getOperationData = createAsyncThunk(
  'get/operation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('communications/getOperation');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const addOperation = createAsyncThunk(
  'add/operation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('/operation', data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateOperation = createAsyncThunk(
  'update/operations',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put('/operation', data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const operationSlice = createSlice({
  name: 'operation',
  initialState: initialState,
  extraReducers: {
    [getOperationData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getOperationData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
    [addOperation.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [addOperation.fulfilled]: (state, action) => {
      state.data.push({ ...action.payload });
      console.log('action.payload', action.payload);
      Alert('success', action.payload.msg);
      let filterOperationData = [];
      action.payload?.map((da) => {
        return filterOperationData.push({
          value: da.OperationId,
          label: da.OperationName,
        });
      });
      state.operationData = filterOperationData;
      state.status = 'succeeded';
    },
    [addOperation.rejected]: (state, action) => {
      Alert('error', action.payload);
    },

    [updateOperation.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data.push({ ...action.payload.data });
      Alert('success', action.payload.msg);
    },
    [updateOperation.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [updateOperation.rejected]: (state, action) => {
      console.log(action.payload);
      Alert('error', action.payload);
    },
  },
});
export default operationSlice.reducer;