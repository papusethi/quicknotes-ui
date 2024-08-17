import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { INote } from "../../pages/Dashboard";
import { useAppSelector } from "../../redux/hooks";
import NoteItem from "../note-item/NoteItem";

interface INoteList {
  notes: Array<INote>;
  emptyState: {
    Icon: React.ReactNode;
    title: string;
    subtitle?: string;
  };
  onClickPinNote: Function;
  onClickRemoveTag: Function;
  onClickDeleteNote: Function;
  onClickRemindMe: Function;
  onClickBgOptions: Function;
  onClickArchive: Function;
  onClickCard: Function;
}

const NoteList: React.FC<INoteList> = (props) => {
  const {
    notes,
    emptyState,
    onClickPinNote,
    onClickRemoveTag,
    onClickDeleteNote,
    onClickRemindMe,
    onClickBgOptions,
    onClickArchive,
    onClickCard
  } = props;

  const userPreferences = useAppSelector((state) => state.user.userPreferences);

  return (
    <Fragment>
      {Array.isArray(notes) && notes.length > 0 ? (
        <Box
          my={2}
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
                onClickBgOptions={onClickBgOptions}
                onClickArchive={onClickArchive}
                onClickRemoveTag={onClickRemoveTag}
                onClickCard={onClickCard}
              />
            );
          })}
        </Box>
      ) : (
        <Box my={2}>
          <Card variant="outlined">
            <CardContent>
              <Box textAlign="center">{emptyState.Icon}</Box>
              <Typography variant="h6" textAlign="center">
                {emptyState.title}
              </Typography>
              <Typography variant="body2" textAlign="center">
                {emptyState.subtitle}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Fragment>
  );
};

export default NoteList;
