import AddOutlined from "@mui/icons-material/AddOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { INote } from "../pages/Dashboard";
import { openSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface INewNoteProps {
  onClose: () => void;
}

type INewNoteData = Pick<INote, "title" | "description" | "isPinned" | "tags">;

const NewNote: React.FC<INewNoteProps> = (props) => {
  const { onClose } = props;

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [newNoteData, setNewNoteData] = useState<INewNoteData>({
    title: "",
    description: "",
    tags: [],
    isPinned: false
  });
  const [tagInput, setTagInput] = useState("");

  const handleChangeNewNoteFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedData = { ...newNoteData, [name]: value };
    setNewNoteData(updatedData);
  };

  const handleClickNewNotePinned = () => {
    const updatedData = { ...newNoteData, isPinned: !newNoteData.isPinned };
    setNewNoteData(updatedData);
  };

  const handleChangeTagInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event?.target?.value);
  };

  const handleClickAddTag = () => {
    const updatedData = { ...newNoteData, tags: [...newNoteData.tags, tagInput] };
    setNewNoteData(updatedData);
    setTagInput("");
  };

  const handleClickSaveNewNote = async () => {
    if (newNoteData.title && newNoteData.title !== "") {
      const newNote = { ...newNoteData, userId: currentUser?._id };
      try {
        const { data } = await axiosInstance.post("/note", JSON.stringify(newNote));
        console.log("data", data);
        dispatch(openSnackbarAlert({ severity: "success", message: data?.message }));
        onClose();
      } catch (error: any) {
        dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
      }
    } else {
      dispatch(openSnackbarAlert({ severity: "warning", message: "Please add a title" }));
    }
  };

  return (
    <Dialog open={true} maxWidth='sm' fullWidth onClose={onClose}>
      <DialogTitle>{newNoteData.title || "Untitled note"}</DialogTitle>
      <DialogContent>
        <Chip
          size='small'
          icon={
            <PushPinOutlinedIcon
              fontSize='small'
              color={newNoteData.isPinned ? "warning" : "inherit"}
              sx={{ mr: 0.5, transform: newNoteData.isPinned ? "rotate(45deg)" : "rotate(0deg)" }}
            />
          }
          label={newNoteData.isPinned ? "Pinned" : "Unpinned"}
          clickable
          onClick={handleClickNewNotePinned}
        />

        <Box mt={1.5} display='flex' flexDirection='column' gap={1.5}>
          <TextField
            fullWidth
            name='title'
            label='Title'
            variant='standard'
            size='small'
            required
            value={newNoteData.title}
            onChange={handleChangeNewNoteFields}
          />

          <TextField
            fullWidth
            multiline
            name='description'
            label='Description'
            variant='standard'
            size='small'
            value={newNoteData.description}
            onChange={handleChangeNewNoteFields}
          />

          <TextField
            fullWidth
            name='tag'
            label='Tag'
            variant='standard'
            size='small'
            value={tagInput}
            onChange={handleChangeTagInput}
            InputProps={{
              endAdornment: (
                <IconButton size='small' onClick={handleClickAddTag}>
                  <AddOutlined fontSize='small' color='primary' />
                </IconButton>
              )
            }}
          />

          <Box display='flex' flexDirection='row' flexWrap='wrap' gap={1}>
            {newNoteData?.tags?.map((tag) => (
              <Chip key={tag} label={tag} size='small' color='default' variant='outlined' />
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button size='small' variant='outlined' disableElevation onClick={onClose}>
          Close
        </Button>
        <Button size='small' variant='contained' disableElevation onClick={handleClickSaveNewNote}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewNote;
