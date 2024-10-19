import { createSlice } from "@reduxjs/toolkit";
import { INote } from "../pages/Dashboard";

export interface NoteState {
  isOpenNoteEditor: boolean;
  currentNote: null | INote;
}

const initialState: NoteState = {
  isOpenNoteEditor: false,
  currentNote: null
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openNoteEditor: (state) => {
      state.isOpenNoteEditor = true;
    },
    closeNoteEditor: (state) => {
      state.isOpenNoteEditor = false;
    },
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
    }
  }
});

export const { openNoteEditor, closeNoteEditor, setCurrentNote } = noteSlice.actions;

export default noteSlice.reducer;
