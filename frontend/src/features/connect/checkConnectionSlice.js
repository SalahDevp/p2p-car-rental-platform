import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
};

export const checkConnectionSlice = createSlice({
  name: "connector",
  initialState,
  reducers: {
    connect: (state) => {
      state.connected = true;
    },
    disconnect: (state) => {
      state.connected = false;
    },
  },
});

export const { connect, disconnect } = checkConnectionSlice.actions;

export default checkConnectionSlice.reducer;
