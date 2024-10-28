import { Box, Typography } from "@mui/material";
import React from "react";
import NoteList from "../components/note-list/NoteList";
import { INote } from "../pages/Dashboard";
import { useAppSelector } from "../redux/hooks";

interface IFolderSectionProps {
  id: string;
  name: string;
}

const FolderSection: React.FC<IFolderSectionProps> = (props) => {
  const { id, name } = props;

  const userNotes = useAppSelector((state) => state.user.userNotes);

  const filteredNotes: INote[] = [];

  if (id && userNotes.length) {
    userNotes?.forEach((note) => {
      if (note.isDeleted || note.isArchived) {
        // do nothing.
      } else {
        if (note.folderId && note.folderId === id) {
          filteredNotes.push(note);
        }
      }
    });
  }

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
