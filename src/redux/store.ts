import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../redux/appSlice";

export const store = configureStore({
	reducer: {
		app: appReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;