import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  AxiosInstance from "../services/AxiosInstance";
import { Alert } from "../services/AlertService";


const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  fetchedAt: null,
  data: [],
  optionData: [],
};


export const addMachineOperation =createAsyncThunk(
    'add/machineOperation',
    async (data,{ rejectWithValue }) => {
      try {
        const response = await AxiosInstance.post('/machineOperation',data);
        console.log(response);
        return response
      } catch (error){
        return rejectWithValue(error.response.data);
      }
    }
)


export const updateMachineOperation = createAsyncThunk(
  'update/machineOperations',
  async (data,{ rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put('/machineOperation',data);
      console.log(response);
      return response.data.data
    } catch (error){
      return rejectWithValue(error.response.data);
    }
  }
) 

export const machineOperationSlice = createSlice({
    name: 'machineOperation',
    initialState: initialState,
    extraReducers: {
        [addMachineOperation.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data.push({ ...action.payload.data });
            Alert('success', action.payload.msg);
          },
          [addMachineOperation.pending]: (state, action) => {
            state.status = 'Loading';
          },
          [addMachineOperation.rejected]: (state, action) => {
            console.log(action.payload);
            Alert('error', action.payload);
          },
          [updateMachineOperation.fulfilled]:(state, action) => {
            state.status = 'succeeded';
            state.data.push({ ...action.payload.data });
            Alert('success', action.payload.msg);
          },
          [updateMachineOperation.pending]: (state, action) => {
            state.status = 'Loading';
          },
          [updateMachineOperation.rejected]: (state, action) => {
            console.log(action.payload);
            Alert('error', action.payload);
          },
        },
    });
    export default machineOperationSlice.reducer;