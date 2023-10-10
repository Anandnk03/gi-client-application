import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../services/AxiosInstance';
import { Alert } from '../services/AlertService';

const initialState = {
  operationStatus: 'idle', // idle, loading, succeeded, failed
  error: null,
  fetchedAt: null,
  data: [],
  machineData: [],
  operationData: [],
  filterOption: [],
};

export const getOperationData = createAsyncThunk(
  'get/operation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('communications/getOperation');
      console.log('response', response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const addOperation = createAsyncThunk(
  'add/operation',
  async (data, { rejectWithValue }) => {
    console.log('data', data);
    try {
      const response = await AxiosInstance.post('/operation', data);
      return response.data;
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
      return response.data;
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
      state.operationStatus = 'loading';
    },
    [getOperationData.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
      let filterOperationData = [];
      action.payload?.map((da) => {
        return filterOperationData.push({
          value: da.OperationId,
          label: da.OperationName,
        });
      });
      state.operationData = filterOperationData;
      state.operationStatus = 'succeeded';
    },
    [getOperationData.rejected]: (state, action) => {
      Alert('error', action.payload?.msg);
    },
    [addOperation.pending]: (state, action) => {
      state.operationStatus = 'Loading';
    },
    [addOperation.fulfilled]: (state, action) => {
      let filter = [];
      state.data.map((item) => {
        const filterData = action.payload.data.find(
          (da) => item.OperationId !== da.OperationId
        );
        return filter.push({ ...filterData });
      });
      state.data.push({ ...filter[0] });
      Alert('success', action.payload.msg);
      let filterOperationData = [];
      action.payload.data?.map((da) => {
        return filterOperationData.push({
          value: da.OperationId,
          label: da.OperationName,
          filter: action.payload.data[0].OperationName,
        });
      });
      state.filterOption = filterOperationData;
      state.operationStatus = 'succeeded';
    },
    [addOperation.rejected]: (state, action) => {
      Alert('error', action.payload.msg);
    },
    [updateOperation.pending]: (state, action) => {
      state.operationStatus = 'Loading';
    },
    [updateOperation.fulfilled]: (state, action) => {
      state.operationStatus = 'succeeded';
      Alert('success', action.payload.msg);
      const operationId = action.payload.data.OperationId;
      const operationdata = state.data.map((item) => {
        if (item.OperationId === operationId) {
          return action.payload.data;
        }
        return item;
      });
      state.data = operationdata;
    },
    [updateOperation.rejected]: (state, action) => {
      Alert('error', action.payload);
    },
  },
});
export default operationSlice.reducer;
