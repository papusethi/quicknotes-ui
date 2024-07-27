import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../redux/appSlice";
import userReducer from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
