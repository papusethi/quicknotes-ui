import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { INote } from "../../pages/Dashboard";
import { useAppSelector } from "../../redux/hooks";
import NoteItem from "../note-item/NoteItem";

interface INoteListProps {
  notes: Array<INote>;
  onClickPinNote: Function;
  onClickUpdateLabel: Function;
  onClickDeleteNote: Function;
  onClickRemindMe: Function;
  onClickRemoveReminder: Function;
  onClickBgOptions: Function;
  onClickArchive: Function;
  onClickCard: Function;
  onClickMakeCopy: Function;
}

const NoteList: React.FC<INoteListProps> = (props) => {
  const {
    notes,
    onClickPinNote,
    onClickUpdateLabel,
    onClickDeleteNote,
    onClickRemindMe,
    onClickRemoveReminder,
    onClickBgOptions,
    onClickArchive,
    onClickCard,
    onClickMakeCopy
  } = props;

  const userPreferences = useAppSelector((state) => state.user.userPreferences);

  return (
    <Box
      display="grid"
      gap={1}
      gridTemplateColumns={userPreferences?.viewType === "list" ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
    >
      {notes?.map((note) => {
        return (
          <NoteItem
            key={note._id}
            note={note}
            onClickPinNote={onClickPinNote}
            onClickDeleteNote={onClickDeleteNote}
            onClickRemindMe={onClickRemindMe}
            onClickRemoveReminder={onClickRemoveReminder}
            onClickBgOptions={onClickBgOptions}
            onClickArchive={onClickArchive}
            onClickUpdateLabel={onClickUpdateLabel}
            onClickCard={onClickCard}
            onClickMakeCopy={onClickMakeCopy}
          />
        );
      })}
    </Box>
  );
};

export default NoteList;
