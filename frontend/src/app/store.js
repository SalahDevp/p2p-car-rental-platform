import { configureStore } from "@reduxjs/toolkit";
import checkConnectionReducer from "../features/connect/checkConnectionSlice";
import checkRegistrationReducer from "../features/register/checkRegistrationSlice";
import currentAddresReducer from "../features/currentAddress/currentAddresSlice";

export const store = configureStore({
  reducer: {
    connector: checkConnectionReducer,
    registrator: checkRegistrationReducer,
    currentAddress: currentAddresReducer,
  },
});
