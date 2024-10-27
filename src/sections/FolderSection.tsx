import { Box, Typography } from "@mui/material";
import React from "react";
import NoteList from "../components/note-list/NoteList";
import { INote } from "../pages/Dashboard";
import { useAppSelector } from "../redux/hooks";

interface IHomeSection {
  id: string;
  name: string;
}

const FolderSection: React.FC<IHomeSection> = (props) => {
  const { id, name } = props;

  const userNotes = useAppSelector((state) => state.user.userNotes);

  const unarchivedNotes: INote[] = [];
  const archivedNotes: INote[] = [];
  const upcomingReminderNotes: INote[] = [];
  const trashedNotes: INote[] = [];

  userNotes?.forEach((note) => {
    if (note.isDeleted) {
      trashedNotes.push(note);
    } else {
      if (note.isArchived) {
        archivedNotes.push(note);
      } else {
        unarchivedNotes.push(note);
      }

      if (note.dueDateTime) {
        upcomingReminderNotes.push(note);
      }
    }
  });

  return (
    <Box>
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">Notes with {name} folder appear here!</Typography>
      </Box>
      <NoteList notes={userNotes?.filter(({ folderId }) => folderId === id)} />
    </Box>
  );
};

export default FolderSection;
