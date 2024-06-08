import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  CamData: null,
  userCredentialsMsg: null,
  userDetails: null,
  userEmail: null,
  loading:true,
  snakmessage:{
    open:false,
    message:""
  }
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
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    showSnackbar: (state, action) => {
      state.snakmessage = {
        open: true,
        message: action.payload,
      };
    },
    hideSnackbar: (state) => {
      state.snakmessage = {
        open: false,
        message: "",
      };
    },
  },
});

export const {
  showSnackbar,
  hideSnackbar,
  getDataGpay,
  getDataFromCamera,
  getUserCredentialMessage,
  getFetchUserData,
  setUserEmail,
  setLoading,
} = dataSlice.actions;

export default dataSlice.reducer;
