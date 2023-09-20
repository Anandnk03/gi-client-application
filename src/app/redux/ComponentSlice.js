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
  componentName: [],
  componentId: null,
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
      return response.data;
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
      return response.data;
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
    [getComponentData.rejected]: (state, action) => {
      console.log(action.payload);
      Alert('error', action.payload.msg);
    },
    [addComponent.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [addComponent.fulfilled]: (state, action) => {
      let filter = [];
      state.data.map((item) => {
        const filterData = action.payload.data.find(
          (da) => item.ComponentId !== da.ComponentId
        );
        filter.push({ ...filterData });
      });
      state.data.push({ ...filter[0] });
      Alert('success', action.payload.msg);
      let data = [];
      action.payload.data?.map((da) => {
        return data.push({
          value: da.ComponentId,
          label: da.ComponentName,
          filter: action.payload.data[0].ComponentName,
        });
      });
      state.componentData = data;
      state.status = 'succeeded';
    },
    [addComponent.rejected]: (state, action) => {
      console.log(action.payload);
      Alert('error', action.payload.msg);
    },
    [updateComponent.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [updateComponent.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
      const componentId = action.payload.data.ComponentId;
      const data = state.data.map((item) => {
        if (item.ComponentId === componentId) {
          return action.payload.data;
        }
        return item;
      });
      state.data = data;
    },
    [updateComponent.rejected]: (state, action) => {
      Alert('error', action.payload.msg);
    },
  },
});
export default ComponentSlice.reducer;
