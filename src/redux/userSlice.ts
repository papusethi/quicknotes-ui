import { createSlice } from "@reduxjs/toolkit";
import { IFolderItem, ILabelItem, INote } from "../pages/Dashboard";

export interface UserState {
  currentUser: null | Record<string, string>;
  userPreferences: null | Record<string, string>;
  userNotes: INote[];
  userLabels: ILabelItem[];
  userFolders: IFolderItem[];
}

const initialState: UserState = {
  currentUser: null,
  userPreferences: null,
  userNotes: [],
  userLabels: [],
  userFolders: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUserPreferences: (state, action) => {
      state.userPreferences = action.payload;
    },
    setUserNotes: (state, action) => {
      state.userNotes = action.payload || [];
    },
    setUserLabels: (state, action) => {
      state.userLabels = action.payload || [];
    },
    setUserFolders: (state, action) => {
      state.userFolders = action.payload || [];
    }
  }
});

export const { setCurrentUser, setUserPreferences, setUserNotes, setUserLabels, setUserFolders } = userSlice.actions;

export default userSlice.reducer;
