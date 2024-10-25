import { INote } from "../pages/Dashboard";

export const newNoteInitData: INote = {
  title: "Untitled note",
  description: "",
  labels: null,
  isPinned: false,
  isArchived: false,
  isDeleted: false,
  color: null,
  dueDateTime: null,
  type: "NOTE",
  tasks: null,
  folderId: null
};
