import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosInstance from './../services/AxiosInstance';

const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  submitstatus: 'idle',
  fetchedAt: null,
  data: [],
};

export const fetchData = createAsyncThunk(
  'plan/planingData',
  async (ModuleId) => {
    const response = await AxiosInstance.get(`viewdept/view/${ModuleId}`);
    console.log('response', AxiosInstance.get);
    return response.data[0];
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
  },
});

export default planingSlice.reducer;
