import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  theme: "light" | "dark";
}

const initialState: AppState = {
  theme: "light"
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    }
  }
});

export const { setTheme } = appSlice.actions;

export default appSlice.reducer;
