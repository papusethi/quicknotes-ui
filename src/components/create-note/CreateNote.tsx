import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  ClickAwayListener,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { INote } from "../../pages/Dashboard";
import { openSnackbarAlert } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserNotes } from "../../redux/userSlice";

const newNoteInitData: INote = {
  title: "",
  description: "",
  tags: [],
  isPinned: false,
  isArchived: false,
  color: null
};

const CreateNote: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [openNewNote, setOpenNewNote] = useState(false);
  const [noteData, setNoteData] = useState<INote>(newNoteInitData);

  const handleClickAway = async (event: MouseEvent | TouchEvent) => {
    await handleSaveNote();
  };

  const handleClickClose = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    await handleSaveNote();
  };

  const handleClickCard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpenNewNote(true);
  };

  const handleChangeNoteFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updateNote = { ...noteData, [name]: value };
    setNoteData(updateNote);
  };

  const handleClickRemindMe = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    console.log("remind me clicked");
  };

  const handleClickBgOptions = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    console.log("bg options clicked");
  };

  const handleClickArchive = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    const updateNote = { ...noteData, isArchived: !noteData.isArchived };
    setNoteData(updateNote);
  };

  const handleSaveNote = async () => {
    if (noteData.title.trim() || noteData.description.trim()) {
      const newNote = { ...noteData, userId: currentUser?._id };
      try {
        const { data } = await axiosInstance.post("/note", JSON.stringify(newNote));
        dispatch(setUserNotes(data?.data));
        setOpenNewNote(false);
        setNoteData(newNoteInitData);
      } catch (error: any) {
        dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
      }
    } else {
      setOpenNewNote(false);
    }
  };

  const actionButtons = [
    {
      title: "Remind me",
      Icon: <AddAlertOutlinedIcon fontSize="small" />,
      onClick: handleClickRemindMe
    },
    {
      title: "Background options",
      Icon: <ColorLensOutlinedIcon fontSize="small" />,
      onClick: handleClickBgOptions
    },
    {
      title: noteData.isArchived ? "Unarchive" : "Archive",
      Icon: noteData.isArchived ? <UnarchiveOutlinedIcon fontSize="small" /> : <ArchiveOutlinedIcon fontSize="small" />,
      onClick: handleClickArchive
    }
  ];

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box mx="auto" mt={1} mb={3} width="50%">
        <Card elevation={3} onClick={handleClickCard}>
          {openNewNote ? (
            <Fragment>
              <CardContent>
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
                </Box>
              </CardContent>

              <CardActions>
                {actionButtons.map(({ title, Icon, onClick }) => (
                  <Fragment key={title}>
                    <Tooltip title={title}>
                      <IconButton size="small" onClick={onClick}>
                        {Icon}
                      </IconButton>
                    </Tooltip>
                  </Fragment>
                ))}

                <Box flex={1} display="flex" justifyContent="flex-end" alignItems="center">
                  <Button size="small" onClick={handleClickClose}>
                    Close
                  </Button>
                </Box>
              </CardActions>
            </Fragment>
          ) : (
            <Box p={2}>
              <Typography fontWeight={500}>Take a note...</Typography>
            </Box>
          )}
        </Card>
      </Box>
    </ClickAwayListener>
  );
};

export default CreateNote;
