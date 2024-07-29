import { createSlice } from "@reduxjs/toolkit";
import { INote } from "../pages/Dashboard";

export interface UserState {
  currentUser: null | Record<string, string>;
  savedNotes: INote[];
}

const initialState: UserState = {
  currentUser: null,
  savedNotes: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setSavedNotes: (state, action) => {
      state.savedNotes = action.payload || [];
    }
  }
});

export const { setCurrentUser, setSavedNotes } = userSlice.actions;

export default userSlice.reducer;
