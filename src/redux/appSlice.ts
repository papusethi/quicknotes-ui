import { type AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  theme: "light" | "dark";
  snackbarAlertInfo: { isOpen: boolean; severity: AlertColor; message: string };
  showMainSidebar: boolean;
}

const initialState: AppState = {
  theme: "light",
  snackbarAlertInfo: { isOpen: false, severity: "info", message: "" },
  showMainSidebar: true
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    openSnackbarAlert: (state, action) => {
      state.snackbarAlertInfo = {
        ...action.payload,
        isOpen: true
      };
    },
    closeSnackbarAlert: (state) => {
      state.snackbarAlertInfo.isOpen = false;
    },
    toggleMainSidebar: (state) => {
      state.showMainSidebar = !state.showMainSidebar;
    }
  }
});

export const { setTheme, openSnackbarAlert, closeSnackbarAlert, toggleMainSidebar } = appSlice.actions;

export default appSlice.reducer;
