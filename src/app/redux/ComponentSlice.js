import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../services/AxiosInstance';
import { Alert } from '../services/AlertService';

const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  fetchedAt: null,
  componentData: [],
  data: [],
  optionData: [],
};

export const getComponentData = createAsyncThunk(
  'comm/getComponent',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('communications/getComponent');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComponent = createAsyncThunk(
  'add/component',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('/component', data);
      console.log(response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComponent = createAsyncThunk(
  'update/components',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put('/component', data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ComponentSlice = createSlice({
  name: 'component',
  initialState: initialState,
  extraReducers: {
    [getComponentData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getComponentData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
    [addComponent.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [addComponent.fulfilled]: (state, action) => {
      console.log('action.payload', action.payload);
      let filter = [];
      state.data.map((item) => {
        const filterData = action.payload.find(
          (da) => item.ComponentId != da.ComponentId
        );
        filter.push({ ...filterData });
      });
      state.data.push({ ...filter[0] });
      Alert('success', action.payload.msg);
      let data = [];
      action.payload?.map((da) => {
        return data.push({
          value: da.ComponentId,
          label: da.ComponentName,
        });
      });
      state.componentData = data;
      state.status = 'succeeded';
    },
    [addComponent.rejected]: (state, action) => {
      console.log(action.payload);
      Alert('error', action.payload);
    },
    [updateComponent.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [updateComponent.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data.push({ ...action.payload.data });
      Alert('success', action.payload.msg);
    },
    [updateComponent.rejected]: (state, action) => {
      console.log(action.payload);
      Alert('error', action.payload);
    },
  },
});
export default ComponentSlice.reducer;
