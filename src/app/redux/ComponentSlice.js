import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  AxiosInstance from "../services/AxiosInstance";
import {Alert} from "../services/AlertService";


const initialState = {
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  fetchedAt: null,
  data: [],
  optionData: [],
};


export const addComponent =createAsyncThunk(
    'add/component',
    async (data,{ rejectWithValue }) => {
      try {
        const response = await AxiosInstance.post('/component',data);
       
        return response
      } catch (error){
        return rejectWithValue(error.response.data);
      }
    }
)

export const updateComponent =createAsyncThunk(
  'update/components',
  async (data,{ rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put('/component',data);
     
      return response.data.data
    } catch (error){
      return rejectWithValue(error.response.data);
    }
  }
)


export const ComponentSlice = createSlice({
  name: 'component',
  initialState: initialState,
  extraReducers: {
   
    [addComponent.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data.push({ ...action.payload.data });
      Alert('success',action.payload.msg);
    },
    [addComponent.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [addComponent.rejected]: (state, action) => {
      console.log(action.payload);
      Alert('error', action.payload);
    },
    
    [updateComponent.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data.push({ ...action.payload.data });
      Alert('success', action.payload.msg);
    },
    [updateComponent.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [updateComponent.rejected]: (state, action) => {
      console.log(action.payload);
      Alert('error', action.payload);
    },
   
  },
});
export default ComponentSlice.reducer;
