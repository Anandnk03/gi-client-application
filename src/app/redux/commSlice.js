import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from '../services/AlertService';
import AxiosInstance from '../services/AxiosInstance';
const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  fetchedAt: null,
  departmentStatus: 'idle',
  machineStatus: [],
  data: [],
  dataOptions: [],
  moduleOption: [],
  machineOption: [],
  productOption: [],
  type4mOption: [],
  moduleData: [],
  machine: [],
  productData: [],
  type4M: [],
  reasonData: [],
  componentData: [],
  operationData: [],
  machineData: [],
};

export const department = createAsyncThunk('comm/department', async () => {
  const response = await AxiosInstance.get('communications/department');
  return response.data.data[0];
});

export const module = createAsyncThunk('comm/module', async (data) => {
  const response = await AxiosInstance.get(`communications/module/${data}`);
  return response.data.data[0];
});

export const machine = createAsyncThunk('comm/machine', async (data) => {
  const response = await AxiosInstance.get(`communications/machine/${data}`);
  return response.data.data[0];
});

export const product = createAsyncThunk('comm/product', async (data) => {
  const response = await AxiosInstance.get(`communications/product/${data}`);
  console.log('pro_data', response.data.data[0]);
  return response.data.data[0];
});

export const Type4M = createAsyncThunk('reason/type4M', async () => {
  const response = await AxiosInstance.get('communications/4mType');
  return response.data.data[0];
});

export const getMachine = createAsyncThunk(
  'operation/machineName',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('communications/machine');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// export const machineData = createAsyncThunk('comm/machineData', async () => {
//   const response = await AxiosInstance.get('communications/machineData');
//   return response.data.data;
// });

export const reasonMaster = createAsyncThunk(
  'reason/reasonMaster',
  async (data) => {
    const response = await AxiosInstance.get(
      `communications/reasonMaster/${data?.Mid}/${data?.id}`
    );
    return response.data.data[0];
  }
);
export const commSlice = createSlice({
  name: 'comm',
  initialState: initialState,
  extraReducers: {
    [department.fulfilled]: (state, action) => {
      let deptOption = [];
      action.payload.map((da) => {
        return deptOption.push({
          value: da.ID,
          label: da.DEPARTMENTNAME,
        });
      });
      state.dataOptions = deptOption;
      state.departmentStatus = 'success';
    },
    [department.pending]: (state, action) => {
      state.departmentStatus = 'submitting';
    },
    [department.rejected]: (state, action) => {
      state.departmentStatus = 'failed';
      Alert('error', action.payload?.code);
    },
    [module.fulfilled]: (state, action) => {
      state.moduleData = action.payload;
      let module = [];
      action.payload.map((da) => {
        return module.push({
          value: da.MODULEORDER,
          label: da.MODULES,
        });
      });
      state.moduleOption = module;
      state.status = 'succeeded';
    },
    [machine.fulfilled]: (state, action) => {
      let optionData = [];
      action.payload.map((da) => {
        return optionData.push({
          value: da.machine,
          label: da.MACHINENAME,
        });
      });
      state.machineOption = optionData;
      state.status = 'succeeded';
      state.machineStatus = 'succeeded';
    },
    [product.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      let data = [];
      action.payload.map((da) => {
        return data.push({
          value: da.product,
          label: da.PRODUCTNAME,
        });
      });
      state.productOption = data;
    },
    [Type4M.fulfilled]: (state, action) => {
      state.type4M = action.payload;
      let type = [];

      action.payload.map((da) => {
        return type.push({
          value: da.ID,
          label: da.MDESCRIPTION,
        });
      });
      state.type4mOption = type;
      state.status = 'succeeded';
    },
    [reasonMaster.fulfilled]: (state, action) => {
      state.reasonData = action.payload;
      state.status = 'succeeded';
    },

    [getMachine.fulfilled]: (state, action) => {
      let data = [];
      action.payload.map((da) => {
        return data.push({
          value: da.Id,
          label: da.MachineName,
        });
      });
      state.machineData = data;
      state.status = 'succeeded';
    },
    [getMachine.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [getMachine.rejected]: (state, action) => {
      Alert('error', action.payload);
    },
  },
});

export default commSlice.reducer;
