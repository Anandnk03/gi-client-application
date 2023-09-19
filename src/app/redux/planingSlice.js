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
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const updatePlan = createAsyncThunk(
  'plan/updatePlan',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put('Plans', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const archivePlan = createAsyncThunk(
  'plan/archive',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.delete(`plans/delete/${data}`);
      return response.data;
    } catch (error) {
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
      state.status = 'succeeded';
      state.data.push({ ...action.payload.data });
      Alert('success', action.payload.msg);
    },
    [addPlan.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [addPlan.rejected]: (state, action) => {
      
      Alert('error', action.payload);
    },
    [updatePlan.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [updatePlan.fulfilled]: (state, action) => {
      Alert('success', action.payload.msg);
      state.status = 'succeeded';
      const id = action.payload.data.ID;
      const data = state.data.map((item) => {
        if (item.ID === id) {
          console.log('item', action.payload.data);
          return action.payload.data;
        }
        return item;
      });
      state.data = data;
    },

    [updatePlan.rejected]: (state, action) => {
      state.status = 'failed';
    },

    [archivePlan.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },
  },
});

export default planingSlice.reducer;
