import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from '../services/AlertService';
import AxiosInstance from '../services/AxiosInstance';

const initialState = {
  submitStatus: 'idle',
  status: 'idle',
  data: [],
  role: [],
  scope: [],
};

export const fetchData = createAsyncThunk(
  'role/fetchData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`role`);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createRole = createAsyncThunk(
  'role/createRole',
  async (data, { rejectWithValue }) => {
    console.log('data', data);
    try {
      const response = await AxiosInstance.post(`role`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRole = createAsyncThunk(
  'role/updateRole',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(`role/${data?.id}`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const archive = createAsyncThunk('role/archive', async (data) => {
  const response = await AxiosInstance.delete(`role/${data}`);
  return response.data;
});
export const fetchScope = createAsyncThunk(
  'scope/fetchData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('scope');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const role = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      let roleData = [];
      action.payload.map((item) => {
        roleData.push({
          value: item.name,
          label: item.name,
        });
      });
      state.role = roleData;
    },
    [fetchData.rejected]: (state, action) => {
      state.status = 'failed';
      Alert('error', action.payload.msg);
    },
    [createRole.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createRole.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data.push({ ...action.payload.data });
      console.log(action.payload);
      Alert('success', action.payload.msg);
    },
    [createRole.rejected]: (state, action) => {
      state.status = 'failed';
      console.log(action.payload);
      Alert('error', action.payload.msg);
    },
    [updateRole.pending]: (state, action) => {
      state.status = 'loading';
    },
    [updateRole.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [updateRole.rejected]: (state, action) => {
      state.status = 'failed';
      console.log(action.payload);
      Alert('error', action.payload.msg);
    },
    [archive.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [fetchScope.pending]: (state, action) => {
      state.status = 'loading';
      console.log(action.payload);
    },
    [fetchScope.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      let scopData = [];
      action.payload.map((item) => {
        scopData.push({
          value: item.id,
          label: item.scope,
        });
      });
      state.scope = scopData;
      Alert('success', action.payload.msg);
    },
  },
});

export default role.reducer;
