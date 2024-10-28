import { Box, Typography } from "@mui/material";
import React from "react";
import NoteList from "../components/note-list/NoteList";
import { INote } from "../pages/Dashboard";
import { useAppSelector } from "../redux/hooks";

interface ILabelSectionProps {
  id: string;
  name: string;
}

const LabelSection: React.FC<ILabelSectionProps> = (props) => {
  const { id, name } = props;

  const userNotes = useAppSelector((state) => state.user.userNotes);

  const filteredNotes: INote[] = [];

  if (id && userNotes.length) {
    userNotes?.forEach((note) => {
      if (note.isDeleted || note.isArchived) {
        // do nothing.
      } else {
        if (note.labels && note.labels.includes(id)) {
          filteredNotes.push(note);
        }
      }
    });
  }

  return (
    <Box>
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">Notes with {name} label appear here!</Typography>
      </Box>

      <NoteList notes={filteredNotes} />
    </Box>
  );
};

export default LabelSection;
