import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  AxiosInstance from "../services/AxiosInstance";
import { Alert } from "../services/AlertService";


const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  fetchedAt: null,
  data: [],
  optionData: [],
  operationData:[],
  machineData:[]
};


export const addOperation = createAsyncThunk(
    'add/operation',
    async(data,{rejectWithValue})=>{
      try{
      const response = await AxiosInstance.post('/operation',data);
      console.log(response);
      return response;
      }
      catch(error){
        return rejectWithValue(error.response);
      }
    }
  )

  export const feactData = createAsyncThunk('operation/featchData',async(data,{rejectWithValue})=>{
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
      console.log(response);
      return response.data.data;
    }catch(error){
      return rejectWithValue(error.response);
    }

  })

  export const operationSlice = createSlice({
    name: 'operation',
    initialState: initialState,
    extraReducers: {

        [addOperation.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data.push({ ...action.payload.data });
            Alert('success', action.payload.msg);
          },
          [addOperation.pending]: (state, action) => {
            state.status = 'Loading';
          },
          [addOperation.rejected]: (state, action) => {
            console.log(action.payload);
            Alert('error', action.payload);
          },
          
          [feactData.fulfilled]: (state,action)=>{
          
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
        [feactData.pending]: (state, action) => {
          state.status = 'Loading';
        },
        [feactData.rejected]: (state, action) => {
          
          Alert('error', action.payload);
        },
        [getMachine.fulfilled]: (state,action)=>{
          console.log('machine action.payload',action.payload)
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
        },


      
    });
    export default operationSlice.reducer;