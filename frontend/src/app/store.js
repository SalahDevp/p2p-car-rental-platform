import { configureStore } from "@reduxjs/toolkit";
import checkConnectionReducer from "../features/connect/checkConnectionSlice";
import checkRegistrationReducer from "../features/register/checkRegistrationSlice";
import currentAddresReducer from "../features/currentAddress/currentAddresSlice";
import carsReducer from "../features/cars/carsSlice";

export const store = configureStore({
  reducer: {
    connector: checkConnectionReducer,
    registrator: checkRegistrationReducer,
    currentAddress: currentAddresReducer,
    cars: carsReducer,
  },
});
