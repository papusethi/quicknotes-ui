import ArchiveIcon from "@mui/icons-material/Archive";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditIcon from "@mui/icons-material/Edit";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import CreateNote from "../components/create-note/CreateNote";
import EditNote from "../components/edit-note/EditNote";
import Header from "../components/header/Header";
import NoteList from "../components/note-list/NoteList";
import { openSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUserNotes } from "../redux/userSlice";

export interface ITaskItem {
  title: string;
  checked: boolean;
  order: number;
}

export interface INote {
  readonly _id?: string;
  title: string;
  description: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  color: null | string;
  tasks: null | ITaskItem[];
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const userNotes = useAppSelector((state) => state.user.userNotes);

  const [selectedId, setSelectedId] = useState("notes");
  const [openEditNote, setOpenEditNote] = useState(false);
  const [currentNote, setCurrentNote] = useState<null | INote>(null);

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

  const handleClickClose = () => {
    setOpenEditNote(false);
    setCurrentNote(null);
  };

  const handleClickDeleteNote = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>, note: INote) => {
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

  const handleClickCard = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    setOpenEditNote(true);
    setCurrentNote(note);
  };

  const handleClickMakeCopy = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    const { _id, ...restNote } = note;
    const newNote = { ...restNote };

    try {
      const { data } = await axiosInstance.post("/note", JSON.stringify(newNote));
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
          <NoteList
            notes={unarchivedNotes}
            emptyState={{
              Icon: <LightbulbOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />,
              title: "Nothing to see yet, why not start a new note?",
              subtitle: "It's time to save some ideas and thoughts of yours"
            }}
            onClickPinNote={handleClickPinNote}
            onClickDeleteNote={handleClickDeleteNote}
            onClickRemindMe={handleClickRemindMe}
            onClickBgOptions={handleClickBgOptions}
            onClickArchive={handleClickArchive}
            onClickRemoveTag={handleClickRemoveTag}
            onClickCard={handleClickCard}
            onClickMakeCopy={handleClickMakeCopy}
          />
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
          <NoteList
            notes={archivedNotes}
            emptyState={{
              Icon: <ArchiveOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />,
              title: "Your archived notes appear here"
            }}
            onClickPinNote={handleClickPinNote}
            onClickDeleteNote={handleClickDeleteNote}
            onClickRemindMe={handleClickRemindMe}
            onClickBgOptions={handleClickBgOptions}
            onClickArchive={handleClickArchive}
            onClickRemoveTag={handleClickRemoveTag}
            onClickCard={handleClickCard}
            onClickMakeCopy={handleClickMakeCopy}
          />
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
          <Box p={2}>
            <CreateNote />

            {listConfig?.find((item) => item.id === selectedId)?.content ?? null}
          </Box>

          <EditNote open={openEditNote} note={currentNote} onClose={handleClickClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
