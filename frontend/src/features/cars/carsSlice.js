import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carIds: [],
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addId: (state, action) => {
      state.carIds.push(action.payload.id);
    },
    setIds: (state, action) => {
      state.carIds = action.payload.ids;
    },
  },
});

export const { addId, setIds } = carsSlice.actions;

export default carsSlice.reducer;
