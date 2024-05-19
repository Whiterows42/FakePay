import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getDataGpay: (state, action) => {
       state.data.push(action.payload)
    },
  
  },
});

export const { getDataGpay } = dataSlice.actions;

export default dataSlice.reducer;
