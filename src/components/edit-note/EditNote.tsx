import { Check } from "@mui/icons-material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, IconButton, TextField, Tooltip } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { INote } from "../../pages/Dashboard";
import { openSnackbarAlert } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserNotes } from "../../redux/userSlice";
import { AVAILABLE_COLORS } from "../color";

interface IEditNote {
  open: boolean;
  note: INote | null;
  onClose: () => void;
}

const newNoteInitData: INote = {
  title: "",
  description: "",
  tags: [],
  isPinned: false,
  isArchived: false,
  color: null
};

const EditNote: React.FC<IEditNote> = (props) => {
  const { open, note, onClose } = props;

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const timeoutRef = useRef<null | NodeJS.Timeout>(null);
  const [noteData, setNoteData] = useState<INote>(newNoteInitData);

  useEffect(() => {
    if (open) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      setNoteData(note ?? newNoteInitData);
    } else {
      const timeoutId = setTimeout(() => {
        setNoteData(newNoteInitData);
      }, 4000);
      timeoutRef["current"] = timeoutId;
    }

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [note, open]);

  const handleChangeNoteFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updateNote = { ...noteData, [name]: value };
    setNoteData(updateNote);
  };

  const handleClickNotePinned = () => {
    const updateNote = { ...noteData, isPinned: !noteData.isPinned };
    setNoteData(updateNote);
  };

  const handleClickNoteColor = (colorValue: string) => {
    const updateNote = { ...noteData, color: noteData.color === colorValue ? null : colorValue };
    setNoteData(updateNote);
  };

  const handleClickDeleteTag = (tag: string) => {
    const updatedTags = noteData?.tags?.filter((item) => item !== tag);
    const updateNote = { ...noteData, tags: updatedTags };
    setNoteData(updateNote);
  };

  const handleSaveNote = async () => {
    if (noteData.title.trim() || noteData.description.trim()) {
      const newNote = { ...noteData, userId: currentUser?._id };
      try {
        const { data } = await axiosInstance.put("/note/" + noteData._id, JSON.stringify(newNote));
        dispatch(setUserNotes(data?.data));
        onClose();
      } catch (error: any) {
        dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
      }
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={handleSaveNote}>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          size="small"
          variant="standard"
          name="title"
          placeholder="Untitled note"
          inputProps={{ style: { fontSize: 20 } }}
          InputProps={{ disableUnderline: true }}
          value={noteData.title}
          onChange={handleChangeNoteFields}
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
            value={noteData.description}
            onChange={handleChangeNoteFields}
          />

          <Box mt={2} display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
            {noteData?.tags?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                color="default"
                variant="outlined"
                onDelete={() => handleClickDeleteTag(tag)}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Tooltip title={noteData.isPinned ? "Pinned" : "Unpinned"}>
            <IconButton size="small" onClick={handleClickNotePinned}>
              {noteData.isPinned ? (
                <PushPinIcon fontSize="small" color="primary" sx={{ transform: "rotate(45deg)" }} />
              ) : (
                <PushPinOutlinedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          {Object.entries(AVAILABLE_COLORS).map((entry) => {
            const [colorKey, colorValue] = entry;
            return (
              <Fragment key={colorKey}>
                <Tooltip title={colorKey}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={24}
                    height={24}
                    borderRadius="50%"
                    bgcolor={colorValue}
                    onClick={() => handleClickNoteColor(colorKey)}
                  >
                    {noteData.color === colorKey && <Check fontSize="small" />}
                  </Box>
                </Tooltip>
              </Fragment>
            );
          })}
        </Box>

        <Button size="small" onClick={handleSaveNote}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNote;
