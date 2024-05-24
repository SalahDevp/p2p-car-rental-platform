import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
};

export const currentAddressSlice = createSlice({
  name: "currentAddress",
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { updateAddress } = currentAddressSlice.actions;

export default currentAddressSlice.reducer;
