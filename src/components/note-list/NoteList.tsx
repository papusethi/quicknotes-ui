import { Box, List } from "@mui/material";
import React from "react";
import { INote } from "../../pages/Dashboard";
import { useAppDispatch } from "../../redux/hooks";
import { openNoteEditor, setCurrentNote } from "../../redux/noteSlice";
import NoteItem from "../note-item/NoteItem";

interface INoteListProps {
  notes: INote[];
}

const NoteList: React.FC<INoteListProps> = (props) => {
  const { notes } = props;

  const dispatch = useAppDispatch();

  const handleClickListItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    dispatch(openNoteEditor());
    dispatch(setCurrentNote(note));
  };

  return (
    <Box>
      {Array.isArray(notes) && notes.length ? (
        <List>
          {notes?.map((note) => {
            return <NoteItem key={note._id} note={note} onClickListItem={handleClickListItem} />;
          })}
        </List>
      ) : null}
    </Box>
  );
};

export default NoteList;
