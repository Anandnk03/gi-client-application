import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from '../services/AlertService';
import AxiosInstance from '../services/AxiosInstance';

const initialState = {
  MachineStatus: 'idle',
  MachineData: [],
};

export const fetchData = createAsyncThunk(
  'fetchData/IdleTime',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('idleTime');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const AddMachine = createAsyncThunk(
  'IdleTime/AddMachine',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('idleTime/addMachine', data);
      console.log('response', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);
export const updateMachine = createAsyncThunk(
  'IdleTime/updateMachine',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put('idleTime/updateMachine', data);
      console.log('response', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const idle = createSlice({
  name: 'idle',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      state.MachineStatus = 'loading';
    },
    [fetchData.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.MachineData = action.payload;
      state.MachineStatus = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [fetchData.rejected]: (state, action) => {
      state.MachineStatus = 'error';
    },
    [AddMachine.pending]: (state, action) => {
      state.MachineStatus = 'loading';
    },
    [AddMachine.fulfilled]: (state, action) => {
      state.MachineData.push({ ...action.payload.data });
      state.MachineStatus = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [AddMachine.rejected]: (state, action) => {
      state.MachineStatus = 'error';
    },
    [updateMachine.pending]: (state, action) => {
      state.MachineStatus = 'loading';
    },
    [updateMachine.fulfilled]: (state, action) => {
      state.MachineData.push({ ...action.payload.data });
      state.MachineStatus = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [updateMachine.rejected]: (state, action) => {
      state.MachineStatus = 'error';
      Alert('error', action.payload.msg);
    },
  },
});

export default idle.reducer;
