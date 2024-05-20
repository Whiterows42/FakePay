import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  CamData:null
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    
    getDataGpay: (state, action) => {
       state.data.unshift(action.payload)
    },
  getDataFromCamera:(state,action)=>{
    state.CamData = action.payload
  }
  },
});

export const { getDataGpay ,getDataFromCamera  } = dataSlice.actions;

export default dataSlice.reducer;
