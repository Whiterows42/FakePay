import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  CamData: null,
  userCredentialsMsg: null,
  userDetails: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getDataGpay: (state, action) => {
      state.data.unshift(action.payload);
    },
    getDataFromCamera: (state, action) => {
      state.CamData = action.payload;
    },
    getUserCredentialMessage: (state, action) => {
      state.userCredentialsMsg = action.payload;
    },
    getFetchUserData: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const {
  getDataGpay,
  getDataFromCamera,
  getUserCredentialMessage,
  getFetchUserData,
} = dataSlice.actions;

export default dataSlice.reducer;
