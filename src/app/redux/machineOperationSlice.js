import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../services/AxiosInstance';
import { Alert } from '../services/AlertService';

const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  fetchedAt: null,
  data: [],
  optionData: [],
  msg_status: 'idle'
};

export const getMachineOperationData = createAsyncThunk(
  'comm/getMachineOperation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        'communications/getMachineOperation'
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMachineOperation = createAsyncThunk(
  'add/machineOperation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('/machineOperation', data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMachineOperation = createAsyncThunk(
  'update/machineOperations',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put('/machineOperation', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const machineOperationSlice = createSlice({
  name: 'machineOperation',
  initialState: initialState,
  extraReducers: {
    [getMachineOperationData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getMachineOperationData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
    [getMachineOperationData.rejected]: (state, action) => {
      Alert('error', action.payload.msg);
    },

    [addMachineOperation.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [addMachineOperation.fulfilled]: (state, action) => {
      state.data.push(...action.payload.data);
      state.msg_status = 'success';
      state.status = 'succeeded';
      Alert('success', action.payload.msg)

    },
    [addMachineOperation.rejected]: (state, action) => {
      Alert('error', action.payload.msg);

    },
    [updateMachineOperation.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [updateMachineOperation.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
      const id = action.payload.data.id
      const machineOperationData = state.data.map((item) => {
        if (item.Id === id) {
          return action.payload.data
        }
        return item;
      });
      state.data = machineOperationData

    },
    [updateMachineOperation.rejected]: (state, action) => {
      Alert('error', action.payload.msg);
    },
  },
});
export default machineOperationSlice.reducer;
