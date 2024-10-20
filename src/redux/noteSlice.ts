import { createSlice } from "@reduxjs/toolkit";
import { INote } from "../pages/Dashboard";

export interface NoteState {
  drawerNotes: INote[];
  isOpenNoteEditor: boolean;
  currentNote: null | INote;
}

const initialState: NoteState = {
  drawerNotes: [],
  isOpenNoteEditor: false,
  currentNote: null
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setDrawerNotes: (state, action) => {
      state.drawerNotes = action.payload;
    },
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

export const { setDrawerNotes, openNoteEditor, closeNoteEditor, setCurrentNote } = noteSlice.actions;

export default noteSlice.reducer;
