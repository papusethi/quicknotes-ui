import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
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
  Tooltip,
  Typography
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { INote, ITaskItem } from "../../pages/Dashboard";
import { openSnackbarAlert } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserNotes } from "../../redux/userSlice";
import ContentChecklistView from "../content-checklist-view/ContentChecklistView";
import ContentNoteView from "../content-note-view/ContentNoteView";

export const newNoteInitData: INote = {
  title: "",
  description: "",
  tags: [],
  isPinned: false,
  isArchived: false,
  color: null,
  tasks: null
};

const CreateNote: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [expandCard, setExpandCard] = useState(false);
  const [contentViewType, setContentViewType] = useState<"note-view" | "checklist-view">("note-view");

  const [noteData, setNoteData] = useState<INote>(newNoteInitData);

  const handleClickAway = async (event: MouseEvent | TouchEvent) => {
    await handleSaveNote();
  };

  const handleClickClose = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    await handleSaveNote();
  };

  const handleClickCard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setExpandCard(true);
    setContentViewType("note-view");
  };

  const handleClickChecklist = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setExpandCard(true);
    setContentViewType("checklist-view");
  };

  const handleChangeNoteFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updateNote = { ...noteData, [name]: value };
    setNoteData(updateNote);
  };

  const handleUpdateInChecklistView = (tasks: ITaskItem[] | null) => {
    const updateNote = { ...noteData, tasks: tasks };
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
    if (
      noteData.title.trim() ||
      noteData.description.trim() ||
      (Array.isArray(noteData.tasks) && noteData.tasks.length)
    ) {
      const newNote = { ...noteData, userId: currentUser?._id };
      try {
        const { data } = await axiosInstance.post("/note", JSON.stringify(newNote));
        dispatch(setUserNotes(data?.data));
        setExpandCard(false);
        setNoteData(newNoteInitData);
      } catch (error: any) {
        dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
      }
    } else {
      setExpandCard(false);
      setNoteData(newNoteInitData);
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
      <Box mx="auto" mt={1} mb={3} width="60%">
        {expandCard ? (
          <Card elevation={3}>
            <CardContent>
              {contentViewType === "note-view" && <ContentNoteView note={noteData} onUpdate={handleChangeNoteFields} />}

              {contentViewType === "checklist-view" && (
                <ContentChecklistView
                  note={noteData}
                  onUpdateTitle={handleChangeNoteFields}
                  onUpdateTasks={handleUpdateInChecklistView}
                />
              )}
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
          </Card>
        ) : (
          <Card elevation={3} onClick={handleClickCard}>
            <Box px={2} py={1} display="flex" alignItems="center">
              <Typography flex={1} fontWeight={500}>
                Take a note...
              </Typography>
              <Tooltip title="Make a list">
                <IconButton size="small" onClick={handleClickChecklist}>
                  <CheckBoxOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default CreateNote;