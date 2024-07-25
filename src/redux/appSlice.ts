import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
	theme: "LIGHT" | "DARK";
}

const initialState: AppState = {
	theme: "LIGHT",
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
	},
});

export const { setTheme } = appSlice.actions;

export default appSlice.reducer;
