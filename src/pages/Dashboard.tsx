import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LabelIcon from "@mui/icons-material/Label";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Box, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import EditNote from "../components/edit-note/EditNote";
import FolderList from "../components/folder-list/FolderList";
import Header from "../components/header/Header";
import LabelList from "../components/label-list/LabelList";
import NoteList from "../components/note-list/NoteList";
import { openSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUserFolders, setUserLabels, setUserNotes } from "../redux/userSlice";
import CreateNote from "../components/create-note/CreateNote";
import NewNoteView from "../components/new-note/NewNoteView";
import SectionEmptyState from "../components/section-empty-state/SectionEmptyState";

export interface IFolderItem {
  readonly _id?: string;
  userId: string;
  name: string;
}

export interface ILabelItem {
  readonly _id?: string;
  userId: string;
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
  folderId: null | string;
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const userNotes = useAppSelector((state) => state.user.userNotes);
  const userLabels = useAppSelector((state) => state.user.userLabels);
  const userFolders = useAppSelector((state) => state.user.userFolders);

  const [selectedId, setSelectedId] = useState("home");
  const [openEditNote, setOpenEditNote] = useState(false);
  const [currentNote, setCurrentNote] = useState<null | INote>(null);

  const [completedTasks, setCompletedTasks] = useState(new Set());

  const [openNewNote, setOpenNewNote] = useState(false);

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

    const fetchAllFolders = async () => {
      try {
        const { data } = await axiosInstance.get("/folder");
        dispatch(setUserFolders(data?.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllNotes();
    fetchAllLabels();
    fetchAllFolders();
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

  const handleClickCreate = () => {
    setOpenNewNote(true);
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
    id: "label" + name,
    text: name,
    Icon: LabelOutlinedIcon,
    ActiveIcon: LabelIcon,
    content: (
      <Box>
        <NoteList
          notes={userNotes?.filter(({ labels }) => labels && _id && labels.includes(_id))}
          // emptyState={{
          //   Icon: <LocalOfferOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />,
          //   title: `Notes with ${name} label appear here`
          // }}
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

  // list items generated from folders.
  const listItemsFromFolders = userFolders.map(({ _id, name }) => ({
    id: "folder" + name,
    text: name,
    Icon: FolderOutlinedIcon,
    ActiveIcon: FolderIcon,
    content: (
      <Box>
        <NoteList
          notes={userNotes?.filter(({ folderId }) => folderId === _id)}
          // emptyState={{
          //   Icon: <FolderIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />,
          //   title: `Notes with ${name} folder appear here`
          // }}
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
      id: "home",
      text: "Home",
      Icon: HomeOutlinedIcon,
      ActiveIcon: HomeIcon,
      content: (
        <Box>
          <Box mb={3}>
            <Typography variant="h6">Welcome home, {currentUser?.username}!</Typography>
          </Box>

          {Array.isArray(userFolders) && userFolders.length ? (
            <Box>
              <Typography>Recent folders</Typography>
              <Box my={1} display="grid" gap={2} gridTemplateColumns="repeat(4, 1fr)">
                {userFolders.map(({ _id, name }) => (
                  <Box
                    key={_id}
                    borderRadius={2}
                    border="1px solid"
                    borderColor={(theme) => theme.palette.divider}
                    paddingY={1}
                    paddingX={2}
                    display="flex"
                    gap={2}
                    alignItems="center"
                  >
                    <FolderIcon fontSize="large" color="action" />
                    <Box>
                      <Typography>{name}</Typography>
                      <Typography variant="body2" color="GrayText">
                        5 notes
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : null}

          {Array.isArray(unarchivedNotes) && unarchivedNotes.length ? (
            <Box mt={3}>
              <Typography>Recent notes</Typography>
              <Box mt={1}>
                <NoteList
                  notes={unarchivedNotes}
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
            </Box>
          ) : (
            <SectionEmptyState
              Icon={<LightbulbOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />}
              title="Nothing to see yet, why not start a new note?"
              subtitle="It's time to save some ideas and thoughts of yours"
            />
          )}
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
          <Box mb={2}>
            <Typography variant="h6">Reminders</Typography>
            <Typography variant="body2">Notes with upcoming reminders appear here!</Typography>
          </Box>

          <NoteList
            notes={upcomingReminderNotes}
            // emptyState={{
            //   Icon: <NotificationsOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />,
            //   title: "Notes with upcoming reminders appear here"
            // }}
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
      id: "archived",
      text: "Archived",
      Icon: ArchiveOutlinedIcon,
      ActiveIcon: ArchiveIcon,
      content: (
        <Box>
          <Box mb={2}>
            <Typography variant="h6">Archived</Typography>
            <Typography variant="body2">Your archived notes appear here!</Typography>
          </Box>

          {Array.isArray(archivedNotes) && archivedNotes.length ? (
            <NoteList
              notes={archivedNotes}
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
          ) : (
            <SectionEmptyState
              Icon={<ArchiveOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />}
              title="Your archived notes appear here"
              subtitle="It's time to save some ideas and thoughts of yours"
            />
          )}
        </Box>
      )
    },
    {
      id: "trash",
      text: "Trash",
      Icon: DeleteOutlinedIcon,
      ActiveIcon: DeleteIcon,
      content: (
        <Box>
          <Box mb={2}>
            <Typography variant="h6">Trash</Typography>
            <Typography variant="body2">Your deleted notes appear here!</Typography>
          </Box>

          <NoteList
            notes={archivedNotes}
            // emptyState={{
            //   Icon: <DeleteOutlinedIcon color="action" sx={{ fontSize: (theme) => theme.spacing(8) }} />,
            //   title: "Your deleted notes appear here!"
            // }}
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

  const listConfigFolders = [
    {
      id: "manageFolders",
      text: "Manage folders",
      Icon: CreateNewFolderOutlinedIcon,
      ActiveIcon: CreateNewFolderIcon,
      content: (
        <Box>
          <Typography variant="h6">Manage folders</Typography>
          <Box mt={2}>
            <FolderList />
          </Box>
        </Box>
      )
    },
    ...listItemsFromFolders
  ];

  const listConfigLabels = [
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
    ...listItemsFromLabels
  ];

  return (
    <Box>
      <Header />

      <Box m={2} display="flex" gap={2}>
        <Box flex={1}>
          <Box mb={1}>
            <Fab variant="extended" size="medium" color="primary" onClick={handleClickCreate}>
              <AddIcon sx={{ mr: 1 }} fontSize="small" />
              Create
            </Fab>
          </Box>

          <List>
            {listConfig.map(({ id, text, Icon, ActiveIcon }) => (
              <ListItem key={id} disablePadding disableGutters dense>
                <ListItemButton
                  selected={selectedId === id}
                  onClick={() => handleClickListItem(id)}
                  sx={{ borderRadius: 8 }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {selectedId === id ? <ActiveIcon fontSize="small" color="primary" /> : <Icon fontSize="small" />}
                  </ListItemIcon>
                  <ListItemText>{text}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List>
            {listConfigFolders.map(({ id, text, Icon, ActiveIcon }) => (
              <ListItem key={id} disablePadding disableGutters dense>
                <ListItemButton
                  selected={selectedId === id}
                  onClick={() => handleClickListItem(id)}
                  sx={{ borderRadius: 8 }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {selectedId === id ? <ActiveIcon fontSize="small" color="primary" /> : <Icon fontSize="small" />}
                  </ListItemIcon>
                  <ListItemText>{text}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List>
            {listConfigLabels.map(({ id, text, Icon, ActiveIcon }) => (
              <ListItem key={id} disablePadding disableGutters dense>
                <ListItemButton
                  selected={selectedId === id}
                  onClick={() => handleClickListItem(id)}
                  sx={{ borderRadius: 8 }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {selectedId === id ? <ActiveIcon fontSize="small" color="primary" /> : <Icon fontSize="small" />}
                  </ListItemIcon>
                  <ListItemText>{text}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex={4}>
          <Box borderRadius={6}>
            {/* <CreateNote /> */}

            {openNewNote ? (
              <Box
                p={2}
                bgcolor={(theme) => theme.palette.action.hover}
                border={(theme) => `1px solid ${theme.palette.divider}`}
                borderRadius={4}
              >
                <NewNoteView />
              </Box>
            ) : (
              <Box>
                {listConfig?.find((item) => item.id === selectedId)?.content ?? null}
                {listConfigFolders?.find((item) => item.id === selectedId)?.content ?? null}
                {listConfigLabels?.find((item) => item.id === selectedId)?.content ?? null}
              </Box>
            )}
          </Box>

          <EditNote open={openEditNote} note={currentNote} onClose={handleClickClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
