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
  'gapReason/fetchData',
  async (data) => {
    console.log(data);
    const response = await AxiosInstance.get(`gapReason/${data}`);
    return response.data.data;
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
  },
});

export default reasonSlice.reducer;
