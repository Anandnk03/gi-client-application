import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosInstance from './../services/AxiosInstance';
import { Alert } from '../services/AlertService';

const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  submitstatus: 'idle',
  fetchedAt: null,
  data: [],
  categoryData: [],
  reasonOption: [],
};

export const fetchData = createAsyncThunk(
  'rejection/fetchData',
  async (data) => {
    const response = await AxiosInstance.get(`rejection/${data}`);
    return response.data.data[0];
  }
);

export const category = createAsyncThunk('rejection/category', async () => {
  const response = await AxiosInstance.get(`rejection/reason/category`);
  return response.data.data;
});

export const createReason = createAsyncThunk(
  'rejection/newReason',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(`rejection/newReason`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const updateNcQty = createAsyncThunk(
  'rejection/updateNcQty',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(`rejection/update`, data);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const reason = createAsyncThunk(
  'rejection/reason',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `rejection/reason/${data?.reasonType}/${data?.machineId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const updateReasonQty = createAsyncThunk(
  'rejection/updateReasonQty',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(`rejection/reason/update`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);
export const rejectionSlice = createSlice({
  name: 'rejection',
  initialState: initialState,
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      console.log(action.payload);
      state.data = action.payload;
    },
    [updateNcQty.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
      const id = action.payload.data.ShiftDataID;
      console.log('action.payload.data', id);
      const data = state.data.map((item) => {
        if (item.ShiftDataID === id) {
          console.log('item', action.payload.data);
          return action.payload.data;
        }
        return item;
      });
      state.data = data;
    },
    [updateNcQty.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [category.fulfilled]: (state, action) => {
      let option = [];
      action.payload.map((da) => {
        return option.push({
          value: da.id,
          label: da.ReasonCategory,
        });
      });
      state.categoryData = option;
    },
    [createReason.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [reason.fulfilled]: (state, action) => {
      let option = [];
      action.payload.map((da) => {
        return option.push({
          value: da.ReasonID,
          label: da.Reason,
        });
      });
      state.reasonOption = option;
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [updateReasonQty.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },
  },
});

export default rejectionSlice.reducer;
