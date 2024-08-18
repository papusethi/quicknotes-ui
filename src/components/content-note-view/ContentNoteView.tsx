import { Box, TextField } from "@mui/material";
import React, { Fragment } from "react";
import { INote } from "../../pages/Dashboard";

interface IContentNoteViewProps {
  note: INote;
  onUpdate: Function;
}

const ContentNoteView: React.FC<IContentNoteViewProps> = (props) => {
  const { note, onUpdate } = props;

  return (
    <Fragment>
      <TextField
        fullWidth
        multiline
        size="small"
        variant="standard"
        name="title"
        placeholder="Untitled note"
        inputProps={{ style: { fontSize: 20 } }}
        InputProps={{ disableUnderline: true }}
        value={note.title}
        onChange={(event) => onUpdate(event)}
      />

      <Box mt={1}>
        <TextField
          fullWidth
          multiline
          autoFocus
          size="small"
          variant="standard"
          name="description"
          placeholder="Take a note..."
          inputProps={{ style: { fontSize: 14 } }}
          InputProps={{ disableUnderline: true }}
          value={note.description}
          onChange={(event) => onUpdate(event)}
        />
      </Box>
    </Fragment>
  );
};

export default ContentNoteView;
