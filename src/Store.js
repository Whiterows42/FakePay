import { configureStore } from "@reduxjs/toolkit";

import CreateReducer from "./features/CreateSlice";
export const store = configureStore({
  reducer: {
    data: CreateReducer,
  },
});