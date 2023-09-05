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




export const addComponent =createAsyncThunk(
    'add/component',
    async (data,{ rejectWithValue }) => {
      try {
        const response = await AxiosInstance.post('/component',data);
        console.log(data)
        console.log(response);
        return response
      } catch (error){
        return rejectWithValue(error.response.data);
      }
    }
)






export const ComponentSlice = createSlice({
  name: 'component',
  initialState: initialState,
  extraReducers: {
    // [fetchData.fulfilled]: (state, action) => {
    //   state.data = action.payload;
    //   state.status = 'succeeded';
    // },
    // [fetchData.pending]: (state, action) => {
    //   state.status = 'loading';
    // },
    // [fetchData.rejected]: (state, action) => {
    //   state.status = 'failed';
    // },
    [addComponent.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data.push({ ...action.payload.data });
      Alert('success', action.payload.msg);
    },
    [addComponent.pending]: (state, action) => {
      state.status = 'Loading';
    },
    [addComponent.rejected]: (state, action) => {
      console.log(action.payload);
      Alert('error', action.payload);
    },
    // [updatePlan.pending]: (state, action) => {
    //   state.status = 'Loading';
    // },
    // [updatePlan.fulfilled]: (state, action) => {
    //   Alert('success', action.payload.msg);
    //   state.status = 'succeeded';
    //   const id = action.payload.data.ID;
    //   const data = state.data.map((item) => {
    //     if (item.ID === id) {
    //       console.log('item', action.payload.data);
    //       return action.payload.data;
    //     }
    //     return item;
    //   });
    //   state.data = data;
    // },

    // [updatePlan.rejected]: (state, action) => {
    //   state.status = 'failed';
    // },

    // [archivePlan.fulfilled]: (state, action) => {
    //   state.status = 'succeeded';
    //   Alert('success', action.payload.msg);
    // },
  },
});
export default ComponentSlice.reducer;
