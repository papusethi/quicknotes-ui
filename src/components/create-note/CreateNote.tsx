import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  ClickAwayListener,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import React, { Fragment, useMemo, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { INote, ITaskItem } from "../../pages/Dashboard";
import { openSnackbarAlert } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserNotes } from "../../redux/userSlice";
import ColorPickerPopover from "../color-picker-popover/ColorPickerPopover";
import ContentChecklistView from "../content-checklist-view/ContentChecklistView";
import ContentNoteView from "../content-note-view/ContentNoteView";
import DatetimePickerPopover from "../datetime-picker-popover/DatetimePickerPopover";
import FolderPopover from "../folder-popover/FolderPopover";
import LabelPopover from "../label-popover/LabelPopover";

export const newNoteInitData: INote = {
  title: "",
  description: "",
  labels: null,
  isPinned: false,
  isArchived: false,
  color: null,
  dueDateTime: null,
  type: "NOTE",
  tasks: null,
  folderId: null
};

const CreateNote: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const userLabels = useAppSelector((state) => state.user.userLabels);

  const [expandCard, setExpandCard] = useState(false);

  const [noteData, setNoteData] = useState<null | INote>(null);

  const [openColorPopover, setOpenColorPopover] = useState(false);
  const [anchorElColorPopover, setAnchorElColorPopover] = useState<null | Element>(null);

  const [openLabelPopover, setOpenLabelPopover] = useState(false);
  const [anchorElLabelPopover, setAnchorElLabelPopover] = useState<null | Element>(null);

  const [openFolderPopover, setOpenFolderPopover] = useState(false);
  const [anchorElFolderPopover, setAnchorElFolderPopover] = useState<null | Element>(null);

  const [openDatetimePopover, setOpenDatetimePopover] = useState(false);
  const [anchorElDatetimePopover, setAnchorElDatetimePopover] = useState<null | Element>(null);

  // User label id and label name mapping for easier to display in note.
  const labelIdAndNameMapping = useMemo(() => {
    return userLabels.reduce((acc, eachLabel) => {
      if (eachLabel._id) {
        acc[eachLabel._id] = eachLabel.name;
      }
      return acc;
    }, {} as Record<string, string>);
  }, [userLabels]);

  const handleClickAway = async (event: MouseEvent | TouchEvent) => {
    await handleSaveNote();
  };

  const handleClickClose = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    await handleSaveNote();
  };

  const handleClickCard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setExpandCard(true);
    setNoteData({ ...newNoteInitData, type: "NOTE" });
  };

  const handleClickChecklist = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setExpandCard(true);
    setNoteData({ ...newNoteInitData, type: "CHECKLIST" });
  };

  const handleChangeNoteFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!noteData) {
      return;
    }
    const { name, value } = event.target;
    const updateNote = { ...noteData, [name]: value };
    setNoteData(updateNote);
  };

  const handleUpdateInChecklistView = (tasks: ITaskItem[] | null) => {
    if (!noteData) {
      return;
    }
    const updateNote = { ...noteData, tasks: tasks };
    setNoteData(updateNote);
  };

  const handleClickPinNote = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    if (!noteData) {
      return;
    }
    const updateNote = { ...noteData, isPinned: !noteData.isPinned };
    setNoteData(updateNote);
  };

  const handleClickRemindMe = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    setOpenDatetimePopover((prev) => !prev);
    setAnchorElDatetimePopover(anchorElDatetimePopover ? null : event.currentTarget);
  };

  const handleUpdateReminder = (dueDateTime: Date | null) => {
    if (!noteData) {
      return;
    }

    const updateNote = { ...noteData, dueDateTime: dueDateTime };
    setNoteData(updateNote);
  };

  const handleClickRemoveReminder = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (!noteData) {
      return;
    }

    const updateNote = { ...noteData, dueDateTime: null };
    setNoteData(updateNote);
  };

  const handleClickBgOptions = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    setOpenColorPopover((prev) => !prev);
    setAnchorElColorPopover(anchorElColorPopover ? null : event.currentTarget);
  };

  const handleClickAddLabel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    setOpenLabelPopover((prev) => !prev);
    setAnchorElLabelPopover(anchorElLabelPopover ? null : event.currentTarget);
  };

  const handleClickLabelOption = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, labelId: string) => {
    event.stopPropagation();
    if (!noteData) {
      return;
    }

    if (Array.isArray(noteData?.labels)) {
      if (noteData.labels.includes(labelId)) {
        // Remove existing label
        const updatedLabels = noteData?.labels?.filter((eachLabelId) => eachLabelId !== labelId);
        const updatedNote = { ...noteData, labels: updatedLabels ?? null };
        setNoteData(updatedNote);
      } else {
        // Add new label
        const updatedLabels = [...noteData.labels, labelId];
        const updatedNote = { ...noteData, labels: updatedLabels };
        setNoteData(updatedNote);
      }
    } else {
      const updatedLabels = [labelId];
      const updatedNote = { ...noteData, labels: updatedLabels };
      setNoteData(updatedNote);
    }
  };

  const handleClickRemoveLabel = (event: any, labelId: string) => {
    event.stopPropagation();
    if (!noteData) {
      return;
    }

    const updatedLabels = noteData?.labels?.filter((eachLabelId) => eachLabelId !== labelId);
    const updatedNote = { ...noteData, labels: updatedLabels ?? null };
    setNoteData(updatedNote);
  };

  const handleClickMoveToFolder = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    setOpenFolderPopover((prev) => !prev);
    setAnchorElFolderPopover(anchorElFolderPopover ? null : event?.currentTarget);
  };

  const handleClickFolderOption = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, folderId: string) => {
    event.stopPropagation();
    if (!noteData) {
      return;
    }

    // Move to new folder
    const updatedNote = { ...noteData, folderId: folderId };
    setNoteData(updatedNote);
  };

  const handleClickNoteColor = (colorValue: string) => {
    if (!noteData) {
      return;
    }
    const updateNote = { ...noteData, color: noteData.color === colorValue ? null : colorValue };
    setNoteData(updateNote);
  };

  const handleClickArchive = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    if (!noteData) {
      return;
    }
    const updateNote = { ...noteData, isArchived: !noteData.isArchived };
    setNoteData(updateNote);
  };

  const handleSaveNote = async () => {
    if (!noteData) {
      return;
    }

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
      title: noteData?.isPinned ? "Unpin note" : "Pin note",
      Icon: noteData?.isPinned ? (
        <PushPinIcon fontSize="small" sx={{ transform: "rotate(45deg)" }} />
      ) : (
        <PushPinOutlinedIcon fontSize="small" />
      ),
      onClick: handleClickPinNote
    },
    { title: "Remind me", Icon: <AddAlertOutlinedIcon fontSize="small" />, onClick: handleClickRemindMe },
    { title: "Background options", Icon: <ColorLensOutlinedIcon fontSize="small" />, onClick: handleClickBgOptions },
    {
      title: noteData?.isArchived ? "Unarchive" : "Archive",
      Icon: noteData?.isArchived ? (
        <UnarchiveOutlinedIcon fontSize="small" />
      ) : (
        <ArchiveOutlinedIcon fontSize="small" />
      ),
      onClick: handleClickArchive
    },
    { title: "Add label", Icon: <LocalOfferOutlinedIcon fontSize="small" />, onClick: handleClickAddLabel },
    { title: "Move to folder", Icon: <FolderOutlinedIcon fontSize="small" />, onClick: handleClickMoveToFolder }
  ];

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box mx="auto" mt={1} mb={3} width="60%">
        {expandCard ? (
          <Card elevation={3}>
            <CardContent>
              {noteData?.type === "NOTE" && <ContentNoteView note={noteData} onUpdate={handleChangeNoteFields} />}

              {noteData?.type === "CHECKLIST" && (
                <ContentChecklistView
                  note={noteData}
                  onUpdateTitle={handleChangeNoteFields}
                  onUpdateTasks={handleUpdateInChecklistView}
                />
              )}

              {Array.isArray(noteData?.labels) && noteData?.labels.length ? (
                <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1} mt={2}>
                  {noteData?.labels?.map((labelId) => (
                    <Chip
                      key={labelId}
                      label={labelIdAndNameMapping[labelId]}
                      size="small"
                      color="default"
                      variant="outlined"
                      onDelete={(event) => handleClickRemoveLabel(event, labelId)}
                    />
                  ))}
                </Box>
              ) : null}

              {noteData?.dueDateTime && (
                <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1} mt={2}>
                  <Chip
                    key="dueDateTime"
                    label={noteData?.dueDateTime?.toString()}
                    size="small"
                    color="default"
                    variant="outlined"
                    onDelete={(event) => handleClickRemoveReminder(event)}
                  />
                </Box>
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

              <DatetimePickerPopover
                open={openDatetimePopover}
                anchorEl={anchorElDatetimePopover}
                dueDateTime={null}
                onClose={handleClickRemindMe}
                onUpdate={(dueDateTime: Date | null) => handleUpdateReminder(dueDateTime)}
              />

              <ColorPickerPopover
                open={openColorPopover}
                anchorEl={anchorElColorPopover}
                selectedColor={noteData?.color}
                onClose={handleClickBgOptions}
                onUpdate={(colorKey: string) => handleClickNoteColor(colorKey)}
              />

              <LabelPopover
                open={openLabelPopover}
                anchorEl={anchorElLabelPopover}
                selectedLabels={noteData?.labels}
                onClose={handleClickAddLabel}
                onClickOption={handleClickLabelOption}
              />

              <FolderPopover
                open={openFolderPopover}
                anchorEl={anchorElFolderPopover}
                selectedFolderId={noteData?.folderId}
                onClose={handleClickMoveToFolder}
                onClickOption={handleClickFolderOption}
              />

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
              <LightbulbOutlinedIcon color="action" fontSize="small" sx={{ mr: 1 }} />
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
