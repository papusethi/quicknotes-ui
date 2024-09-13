import ArchiveIcon from "@mui/icons-material/Archive";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import LabelIcon from "@mui/icons-material/Label";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import CreateNote from "../components/create-note/CreateNote";
import EditNote from "../components/edit-note/EditNote";
import Header from "../components/header/Header";
import LabelList from "../components/label-list/LabelList";
import NoteList from "../components/note-list/NoteList";
import { openSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUserLabels, setUserNotes } from "../redux/userSlice";

export interface ILabelItem {
  readonly _id?: string;
  name: string;
}

export interface ITaskItem {
  title: string;
  checked: boolean;
  order: number;
}

export interface INote {
  readonly _id?: string;
  title: string;
  description: string;
  labels: null | string[];
  isPinned: boolean;
  isArchived: boolean;
  color: null | string;
  dueDateTime: null | Date;
  type: "NOTE" | "CHECKLIST";
  tasks: null | ITaskItem[];
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const userNotes = useAppSelector((state) => state.user.userNotes);
  const userLabels = useAppSelector((state) => state.user.userLabels);

  const [selectedId, setSelectedId] = useState("notes");
  const [openEditNote, setOpenEditNote] = useState(false);
  const [currentNote, setCurrentNote] = useState<null | INote>(null);

  const [completedTasks, setCompletedTasks] = useState(new Set());

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const { data } = await axiosInstance.get("/note");
        dispatch(setUserNotes(data?.data));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllLabels = async () => {
      try {
        const { data } = await axiosInstance.get("/label");
        dispatch(setUserLabels(data?.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllNotes();
    fetchAllLabels();
  }, [dispatch]);

  useEffect(() => {
    const reminders = userNotes.map((note) => {
      const timeDiff = note?.dueDateTime ? new Date(note?.dueDateTime)?.getTime() - Date.now() : 0;
      if (note?._id && timeDiff > 0 && !completedTasks.has(note?._id)) {
        return setTimeout(() => {
          alert(`Reminder: ${note.title || "One note"} is due in 1 minute.`);
          setCompletedTasks((prevCompletedTasks) => new Set(prevCompletedTasks).add(note?._id));
        }, timeDiff - 60000);
      }
      return null;
    });

    return () => {
      reminders.forEach((reminder) => {
        if (reminder) clearTimeout(reminder);
      });
    };
  }, [completedTasks, userNotes]);

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

  const handleClickUpdateLabel = async (event: any, note: INote) => {
    event?.stopPropagation();

    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(note));
      dispatch(setUserNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickRemindMe = async (dueDateTime: Date | null, note: INote) => {
    const updateNote = { ...note, dueDateTime };
    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(updateNote));
      dispatch(setUserNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickRemoveReminder = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    const updateNote = { ...note, dueDateTime: null };
    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(updateNote));
      dispatch(setUserNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickBgOptions = async (colorKey: string | null, note: INote) => {
    const updateNote = { ...note, color: note.color === colorKey ? null : colorKey };
    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(updateNote));
      dispatch(setUserNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
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
  const upcomingReminderNotes: INote[] = [];

  userNotes?.forEach((note) => {
    if (note.isArchived) {
      archivedNotes.push(note);
    } else {
      unarchivedNotes.push(note);
    }

    if (note.dueDateTime) {
      upcomingReminderNotes.push(note);
    }
  });

  // list items generated from labels.
  const listItemsFromLabels = userLabels.map(({ _id, name }) => ({
    id: name,
    text: name,
    Icon: LabelOutlinedIcon,
    ActiveIcon: LabelIcon,
    content: (
      <Box>
        <NoteList
          notes={userNotes?.filter(({ labels }) => labels && _id && labels.includes(_id))}
          emptyState={{
            Icon: <LocalOfferOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />,
            title: `Notes with ${name} label appear here`
          }}
          onClickPinNote={handleClickPinNote}
          onClickDeleteNote={handleClickDeleteNote}
          onClickRemindMe={handleClickRemindMe}
          onClickRemoveReminder={handleClickRemoveReminder}
          onClickBgOptions={handleClickBgOptions}
          onClickArchive={handleClickArchive}
          onClickUpdateLabel={handleClickUpdateLabel}
          onClickCard={handleClickCard}
          onClickMakeCopy={handleClickMakeCopy}
        />
      </Box>
    )
  }));

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
            onClickRemoveReminder={handleClickRemoveReminder}
            onClickBgOptions={handleClickBgOptions}
            onClickArchive={handleClickArchive}
            onClickUpdateLabel={handleClickUpdateLabel}
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
      content: (
        <Box>
          <NoteList
            notes={upcomingReminderNotes}
            emptyState={{
              Icon: <NotificationsOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />,
              title: "Notes with upcoming reminders appear here"
            }}
            onClickPinNote={handleClickPinNote}
            onClickDeleteNote={handleClickDeleteNote}
            onClickRemindMe={handleClickRemindMe}
            onClickRemoveReminder={handleClickRemoveReminder}
            onClickBgOptions={handleClickBgOptions}
            onClickArchive={handleClickArchive}
            onClickUpdateLabel={handleClickUpdateLabel}
            onClickCard={handleClickCard}
            onClickMakeCopy={handleClickMakeCopy}
          />
        </Box>
      )
    },

    ...listItemsFromLabels,

    {
      id: "manageLabels",
      text: "Manage labels",
      Icon: LocalOfferOutlinedIcon,
      ActiveIcon: LocalOfferIcon,
      content: (
        <Box>
          <Typography variant="h6">Manage labels</Typography>
          <Box mt={2}>
            <LabelList />
          </Box>
        </Box>
      )
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
            onClickRemoveReminder={handleClickRemoveReminder}
            onClickBgOptions={handleClickBgOptions}
            onClickArchive={handleClickArchive}
            onClickUpdateLabel={handleClickUpdateLabel}
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
