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
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import Header from "../components/header/Header";
import NoteEditorView from "../components/note-editor/NoteEditorView";
import SideNavbar from "../components/side-navbar/SideNavbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentNote } from "../redux/noteSlice";
import { setUserFolders, setUserLabels, setUserNotes } from "../redux/userSlice";
import ArchivedSection from "../sections/ArchivedSection";
import FolderSection from "../sections/FolderSection";
import HomeSection from "../sections/HomeSection";
import LabelSection from "../sections/LabelSection";
import ReminderSection from "../sections/ReminderSection";
import TrashedSection from "../sections/TrashedSection";

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
  isDeleted: boolean;
  color: null | string;
  dueDateTime: null | Date;
  type: "NOTE" | "CHECKLIST";
  tasks: null | ITaskItem[];
  folderId: null | string;
  createdAt?: string;
  updatedAt?: string;
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const userNotes = useAppSelector((state) => state.user.userNotes);
  const userLabels = useAppSelector((state) => state.user.userLabels);
  const userFolders = useAppSelector((state) => state.user.userFolders);
  const isOpenNoteEditor = useAppSelector((state) => state.note.isOpenNoteEditor);
  const { showSideNavbar, sidebarSelectedId } = useAppSelector((state) => state.app);

  const [completedTasks, setCompletedTasks] = useState(new Set());

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const { data } = await axiosInstance.get("/note");
        dispatch(setUserNotes(data?.data));
        dispatch(setCurrentNote(data?.data?.[0]));
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

  const unarchivedNotes: INote[] = [];
  const archivedNotes: INote[] = [];
  const upcomingReminderNotes: INote[] = [];
  const trashedNotes: INote[] = [];

  userNotes?.forEach((note) => {
    if (note.isDeleted) {
      trashedNotes.push(note);
    } else {
      if (note.isArchived) {
        archivedNotes.push(note);
      } else {
        unarchivedNotes.push(note);
      }

      if (note.dueDateTime) {
        upcomingReminderNotes.push(note);
      }
    }
  });

  // list items generated from labels.
  const listItemsFromLabels = userLabels.map(({ _id, name }) => ({
    id: "label" + name,
    text: name,
    Icon: LabelOutlinedIcon,
    ActiveIcon: LabelIcon,
    content: _id ? <LabelSection id={_id} name={name} /> : null
  }));

  // list items generated from folders.
  const listItemsFromFolders = userFolders.map(({ _id, name }) => ({
    id: "folder" + name,
    text: name,
    Icon: FolderOutlinedIcon,
    ActiveIcon: FolderIcon,
    content: _id ? <FolderSection id={_id} name={name} /> : null
  }));

  const listConfig = [
    {
      id: "home",
      text: "Home",
      Icon: HomeOutlinedIcon,
      ActiveIcon: HomeIcon,
      content: <HomeSection />
    },
    {
      id: "reminders",
      text: "Reminders",
      Icon: NotificationsOutlinedIcon,
      ActiveIcon: NotificationsIcon,
      content: <ReminderSection />
    },
    {
      id: "archived",
      text: "Archived",
      Icon: ArchiveOutlinedIcon,
      ActiveIcon: ArchiveIcon,
      content: <ArchivedSection />
    },
    {
      id: "trash",
      text: "Trash",
      Icon: DeleteOutlinedIcon,
      ActiveIcon: DeleteIcon,
      content: <TrashedSection />
    }
  ];

  const listConfigFolders = [
    {
      id: "manageFolders",
      text: "Manage folders",
      Icon: CreateNewFolderOutlinedIcon,
      ActiveIcon: CreateNewFolderIcon,
      content: <></>
    },
    ...listItemsFromFolders
  ];

  const listConfigLabels = [
    {
      id: "manageLabels",
      text: "Manage labels",
      Icon: LocalOfferOutlinedIcon,
      ActiveIcon: LocalOfferIcon,
      content: <></>
    },
    ...listItemsFromLabels
  ];

  return (
    <Box>
      <Header />

      <Box m={2} display="flex" gap={2}>
        {showSideNavbar ? (
          <SideNavbar
            listConfig={listConfig}
            listConfigFolders={listConfigFolders}
            listConfigLabels={listConfigLabels}
          />
        ) : null}

        <Box flex={1} maxWidth={300}>
          {listConfig?.find((item) => item.id === sidebarSelectedId)?.content ?? null}
          {listConfigFolders?.find((item) => item.id === sidebarSelectedId)?.content ?? null}
          {listConfigLabels?.find((item) => item.id === sidebarSelectedId)?.content ?? null}
        </Box>

        <Box flex={3} borderRadius={6}>
          {isOpenNoteEditor ? (
            <Box>
              <NoteEditorView />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
