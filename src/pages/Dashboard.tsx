import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArchiveIcon from "@mui/icons-material/Archive";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditIcon from "@mui/icons-material/Edit";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import Header from "../components/header/Header";
import NewNote from "../components/NewNote";
import NoteItem from "../components/noteItem/NoteItem";
import { openSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUserNotes } from "../redux/userSlice";

export interface INote {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  color?: string;
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const userNotes = useAppSelector((state) => state.user.userNotes);
  const userPreferences = useAppSelector((state) => state.user.userPreferences);

  const [selectedId, setSelectedId] = useState("notes");
  const [isOpenNoteDialog, setIsOpenNoteDialog] = useState(false);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const { data } = await axiosInstance.get("/note");
        dispatch(setUserNotes(data?.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllNotes();
  }, [dispatch]);

  const handleClickListItem = (newTabId: string) => {
    setSelectedId(newTabId);
  };

  const handleOpenNewNote = () => {
    setIsOpenNoteDialog(true);
  };

  const handleCloseNewNote = () => {
    setIsOpenNoteDialog(false);
  };

  const handleClickDeleteNote = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();

    try {
      const { data } = await axiosInstance.delete(`/note/${note._id}`);
      dispatch(setUserNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickPinNote = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();

    const updateNote = { ...note, isPinned: !note.isPinned };
    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(updateNote));
      dispatch(setUserNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickRemoveTag = async (event: any, note: INote, tag: string) => {
    event?.stopPropagation();

    const updatedTags = note.tags.filter((currentTag) => currentTag !== tag);
    const updateNote = { ...note, tags: updatedTags };
    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(updateNote));
      dispatch(setUserNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickRemindMe = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    console.log("remind me clicked");
  };

  const handleClickBgOptions = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    console.log("bg options clicked");
  };

  const handleClickArchive = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    const updateNote = { ...note, isArchived: !note.isArchived };
    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(updateNote));
      dispatch(setUserNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const unarchivedNotes: INote[] = [];
  const archivedNotes: INote[] = [];

  userNotes?.forEach((note) => {
    if (note.isArchived) {
      archivedNotes.push(note);
    } else {
      unarchivedNotes.push(note);
    }
  });

  const listConfig = [
    {
      id: "notes",
      text: "Notes",
      Icon: LightbulbOutlinedIcon,
      ActiveIcon: LightbulbIcon,
      content: (
        <Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" gap={1}>
            <Box>
              <Typography variant="h6">Notes ({unarchivedNotes.length})</Typography>
            </Box>

            <Box>
              <Button size="small" variant="contained" disableElevation onClick={handleOpenNewNote}>
                <AddOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
                New note
              </Button>
            </Box>
          </Box>

          {Array.isArray(unarchivedNotes) && unarchivedNotes.length > 0 ? (
            <Box
              my={2}
              display="grid"
              gap={1}
              gridTemplateColumns={userPreferences?.viewType === "list" ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
            >
              {unarchivedNotes?.map((note) => {
                return (
                  <NoteItem
                    key={note._id}
                    note={note}
                    onClickPinNote={handleClickPinNote}
                    onClickDeleteNote={handleClickDeleteNote}
                    onClickRemindMe={handleClickRemindMe}
                    onClickBgOptions={handleClickBgOptions}
                    onClickArchive={handleClickArchive}
                    onClickRemoveTag={handleClickRemoveTag}
                  />
                );
              })}
            </Box>
          ) : (
            <Box my={2}>
              <Card variant="outlined">
                <CardContent>
                  <Box
                    minHeight={300}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <LightbulbOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />
                    <Typography variant="h6" textAlign="center">
                      Nothing to see yet, why not start a new note?
                    </Typography>
                    <Typography variant="body2" textAlign="center">
                      It's time to save some ideas and thoughts of yours
                    </Typography>

                    <Box mt={2}>
                      <Button size="small" variant="contained" disableElevation onClick={handleOpenNewNote}>
                        Write your first note
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}

          {isOpenNoteDialog && <NewNote onClose={handleCloseNewNote} />}
        </Box>
      )
    },
    {
      id: "reminders",
      text: "Reminders",
      Icon: NotificationsOutlinedIcon,
      ActiveIcon: NotificationsIcon,
      content: null
    },
    {
      id: "editLabels",
      text: "Edit labels",
      Icon: EditOutlinedIcon,
      ActiveIcon: EditIcon,
      content: null
    },
    {
      id: "archived",
      text: "Archived",
      Icon: ArchiveOutlinedIcon,
      ActiveIcon: ArchiveIcon,
      content: (
        <Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between" gap={1}>
            <Box>
              <Typography variant="h6">Archived ({archivedNotes.length})</Typography>
            </Box>

            <Box>
              <Button size="small" variant="contained" disableElevation onClick={handleOpenNewNote}>
                <AddOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
                New note
              </Button>
            </Box>
          </Box>

          {Array.isArray(archivedNotes) && archivedNotes.length > 0 ? (
            <Box
              my={2}
              display="grid"
              gap={1}
              gridTemplateColumns={userPreferences?.viewType === "list" ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
            >
              {archivedNotes?.map((note) => {
                return (
                  <NoteItem
                    key={note._id}
                    note={note}
                    onClickPinNote={handleClickPinNote}
                    onClickDeleteNote={handleClickDeleteNote}
                    onClickRemindMe={handleClickRemindMe}
                    onClickBgOptions={handleClickBgOptions}
                    onClickArchive={handleClickArchive}
                    onClickRemoveTag={handleClickRemoveTag}
                  />
                );
              })}
            </Box>
          ) : (
            <Box my={2}>
              <Card variant="outlined">
                <CardContent>
                  <Box
                    minHeight={300}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <ArchiveOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />
                    <Typography variant="h6" textAlign="center">
                      Your archived notes appear here
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}

          {isOpenNoteDialog && <NewNote onClose={handleCloseNewNote} />}
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Header />

      <Divider />

      <Box display="flex" gap={2}>
        <Box flex={1}>
          <List>
            {listConfig.map(({ id, text, Icon, ActiveIcon }) => (
              <ListItem key={id} disablePadding disableGutters>
                <ListItemButton
                  selected={selectedId === id}
                  onClick={() => handleClickListItem(id)}
                  sx={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
                >
                  <ListItemIcon>
                    {selectedId === id ? <ActiveIcon fontSize="small" color="primary" /> : <Icon fontSize="small" />}
                  </ListItemIcon>
                  <ListItemText>{text}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex={4}>
          <Box p={2}>{listConfig?.find((item) => item.id === selectedId)?.content ?? null}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
