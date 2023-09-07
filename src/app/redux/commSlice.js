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
  componentData:[],
  operationData:[],
  machineData:[],
  componentDatas:[],
  operationDatas:[],
  machineOperationDatas:[],
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
  return response.data.data[0];
});

export const Type4M = createAsyncThunk('reason/type4M', async () => {
  const response = await AxiosInstance.get('communications/4mType');
  return response.data.data[0];
});

export const component= createAsyncThunk('comm/component',async()=>{
  const response = await AxiosInstance.get('communications/component');
  return response.data.data;
})

export const operation = createAsyncThunk('operation/featchData',async(data,{rejectWithValue})=>{
  try{
    const response = await AxiosInstance.get('communications/operation')
    return response.data.data

  }catch(error){
    return rejectWithValue(error.response);
  }
})


export const getMachine = createAsyncThunk('operation/machineName',async(data,{rejectWithValue})=>{

  try{
    const response = await AxiosInstance.get('communications/machine');
    return response.data.data;
  }catch(error){
    return rejectWithValue(error.response);
  }
})

export const getComponentData = createAsyncThunk('comm/getComponent',async()=>{ 
  try{
    const response = await AxiosInstance.get('communications/getComponent');
    return response.data.data;

  }
  catch(error){
    console.log(error);
  }
})

export const getOperationData = createAsyncThunk('comm/getOperation',async()=>{
  try{
    const response = await AxiosInstance.get('communications/getOperation');
    return response.data.data;
   }

  catch(error){
    console.log(error);
  }
})

export const getMachineOperationData = createAsyncThunk('comm/getMachineOperation',async()=>{
  try{
    const response = await AxiosInstance.get('communications/getMachineOperation');
    return response.data.data;

  }
  catch(error){
    console.log(error);
  }
})







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
      Alert('error', action.payload.code);
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
          label: da.PRODUCTNAME,
        });
      });
      state.type4mOption = type;
      state.status = 'succeeded';
    },
    [reasonMaster.fulfilled]: (state, action) => {
      state.reasonData = action.payload;
      state.status = 'succeeded';
    },
    [component.pending]: (state, action) => {
      state.status = 'loading';
    },
    [component.fulfilled]: (state, action) => {
      let data = [];
      action.payload.map((da) => {
        return data.push({
          value: da.ComponentId,
          label: da.ComponentName,
        });
      });
      state.componentData = data;
      state.status = 'succeeded';
    },
    [operation.fulfilled]: (state,action)=>{
          
      let data =[];
      action.payload.map((da)=>{
        return data.push({
          value:da.OperationId,
          label:da.OperationName,
        })
      });
      state.operationData = data
      state.status = 'succeeded';
    },
  [operation.pending]: (state, action) => {
    state.status = 'Loading';
  },
  [operation.rejected]: (state, action) => {
    
    Alert('error', action.payload);
  },
  [getMachine.fulfilled]: (state,action)=>{
          
    let data =[];
    action.payload.map((da)=>{
      return data.push({
        value:da.Id,
        label:da.MachineName,
      })
    });
    state.machineData = data
    state.status = 'succeeded';
  },
[getMachine.pending]: (state, action) => {
  state.status = 'Loading';
},
[getMachine.rejected]: (state, action) => {
  Alert('error', action.payload);
},
    [getComponentData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getComponentData.fulfilled]: (state, action) => {
      state.componentDatas = action.payload;
      state.status = 'succeeded';
    },
    [getOperationData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getOperationData.fulfilled]: (state, action) => {
      state.operationDatas = action.payload;
      state.status = 'succeeded';
    },
    [getMachineOperationData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getMachineOperationData.fulfilled]: (state, action) => {
      state.machineOperationDatas = action.payload;
      state.status = 'succeeded';
    },
  },

});

export default commSlice.reducer;
