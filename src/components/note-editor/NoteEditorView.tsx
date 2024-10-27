import {
  AccessTimeOutlined,
  AddAlertOutlined,
  DriveFileMoveOutlined,
  FolderOpen,
  History,
  Home,
  LocalOfferOutlined,
  SaveOutlined
} from "@mui/icons-material";
import { Box, Button, Chip, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { INote, ITaskItem } from "../../pages/Dashboard";
import { openSnackbarAlert } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserNotes } from "../../redux/userSlice";
import { newNoteInitData } from "../../utils/constants";
import ContentChecklistView from "../content-checklist-view/ContentChecklistView";
import ContentNoteView from "../content-note-view/ContentNoteView";
import DatetimePickerPopover from "../datetime-picker-popover/DatetimePickerPopover";
import FolderPopover from "../folder-popover/FolderPopover";
import LabelPopover from "../label-popover/LabelPopover";

const NoteEditorView: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const currentNote = useAppSelector((state) => state.note.currentNote);
  const userFolders = useAppSelector((state) => state.user.userFolders);
  const userLabels = useAppSelector((state) => state.user.userLabels);

  const [noteData, setNoteData] = useState<INote>(newNoteInitData);

  useEffect(() => {
    setNoteData(currentNote ?? newNoteInitData);
  }, [currentNote]);

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

  const handleChangeNoteFields = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const updateNote = { ...noteData, [name]: value };
    setNoteData(updateNote);
  };

  const handleUpdateInChecklistView = (tasks: ITaskItem[] | null) => {
    const updateNote = { ...noteData, tasks: tasks };
    setNoteData(updateNote);
  };

  const handleClickRemindMe = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    setOpenDatetimePopover((prev) => !prev);
    setAnchorElDatetimePopover(anchorElDatetimePopover ? null : event.currentTarget);
  };

  const handleUpdateReminder = (dueDateTime: Date | null) => {
    const updateNote = { ...noteData, dueDateTime: dueDateTime };
    setNoteData(updateNote);
  };

  const handleClickRemoveReminder = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    const updateNote = { ...noteData, dueDateTime: null };
    setNoteData(updateNote);
  };

  const handleClickAddLabel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    setOpenLabelPopover((prev) => !prev);
    setAnchorElLabelPopover(anchorElLabelPopover ? null : event.currentTarget);
  };

  const handleClickLabelOption = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, labelId: string) => {
    event.stopPropagation();

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

    // Move to new folder
    const updatedNote = { ...noteData, folderId: noteData.folderId === folderId ? null : folderId };
    setNoteData(updatedNote);
  };

  const saveNote = async () => {
    if (
      noteData.title.trim() ||
      noteData.description.trim() ||
      (Array.isArray(noteData.tasks) && noteData.tasks.length)
    ) {
      const newNote = { ...noteData, userId: currentUser?._id };
      try {
        if (newNote._id) {
          const { data } = await axiosInstance.put(`/note/${newNote?._id}`, JSON.stringify(newNote));
          dispatch(setUserNotes(data?.data));
        } else {
          const { data } = await axiosInstance.post("/note", JSON.stringify(newNote));
          dispatch(setUserNotes(data?.data));
        }
      } catch (error: any) {
        dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
      }
    } else {
      setNoteData(newNoteInitData);
    }
  };

  const handleClickSaveNote = async () => {
    await saveNote();
  };

  const actionButtons = [
    { title: "Remind me", Icon: <AddAlertOutlined fontSize="small" />, onClick: handleClickRemindMe },
    { title: "Add label", Icon: <LocalOfferOutlined fontSize="small" />, onClick: handleClickAddLabel },
    { title: "Move to folder", Icon: <DriveFileMoveOutlined fontSize="small" />, onClick: handleClickMoveToFolder }
  ];

  // User folder id and folder name mapping for easier to display in note.
  const folderIdAndNameMapping = useMemo(() => {
    return userFolders.reduce((acc, eachFolder) => {
      if (eachFolder._id) {
        acc[eachFolder._id] = eachFolder.name;
      }
      return acc;
    }, {} as Record<string, string>);
  }, [userFolders]);

  const updatedAtValue = currentNote?.updatedAt
    ? moment(currentNote?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")
    : null;

  return (
    <Box>
      <Box
        p={0.5}
        borderRadius={2}
        bgcolor={(theme) => theme.palette.action.hover}
        border={(theme) => `1px solid ${theme.palette.divider}`}
        display="flex"
        alignItems="center"
        justifySelf="space-between"
      >
        <Box width="100%" display="flex" alignItems="center" gap={0.5}>
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
        </Box>

        <Box justifySelf="flex-end" display="flex" alignItems="center" gap={0.5}>
          <Button
            size="small"
            variant="contained"
            disableElevation
            startIcon={<SaveOutlined fontSize="small" />}
            onClick={handleClickSaveNote}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Box
        mt={1}
        p={1.5}
        borderRadius={2}
        bgcolor={(theme) => theme.palette.action.hover}
        border={(theme) => `1px solid ${theme.palette.divider}`}
      >
        <Box>
          <Box mb={1} display="flex" alignItems="center" gap={0.25} justifyContent="space-between">
            {currentNote?.folderId ? (
              <Box display="flex" alignItems="center" gap={0.25}>
                <FolderOpen color="action" sx={{ fontSize: 16 }} />
                <Typography variant="caption" lineHeight={1}>
                  {folderIdAndNameMapping[currentNote?.folderId]}
                </Typography>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap={0.25}>
                <Home color="action" sx={{ fontSize: 16 }} />
                <Typography variant="caption" lineHeight={1}>
                  Home
                </Typography>
              </Box>
            )}

            {updatedAtValue ? (
              <Box display="flex" alignItems="center" gap={0.25}>
                <History color="action" sx={{ fontSize: 16 }} />
                <Typography variant="caption" lineHeight={1}>
                  {updatedAtValue}
                </Typography>
              </Box>
            ) : null}
          </Box>

          <Box>
            <TextField
              fullWidth
              size="small"
              variant="standard"
              name="title"
              placeholder="Untitled note"
              inputProps={{ style: { fontSize: 20 } }}
              InputProps={{ disableUnderline: true }}
              value={noteData?.title}
              onChange={(event) => handleChangeNoteFields(event)}
            />
          </Box>
        </Box>

        {Array.isArray(noteData?.labels) && noteData?.labels.length ? (
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={0.5} mt={1}>
            {noteData?.labels?.map((labelId) => (
              <Chip
                key={labelId}
                size="small"
                color="default"
                variant="outlined"
                label={labelIdAndNameMapping[labelId]}
                onDelete={(event) => handleClickRemoveLabel(event, labelId)}
              />
            ))}
          </Box>
        ) : null}

        {noteData?.dueDateTime && (
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={0.5} mt={1}>
            <Chip
              key="dueDateTime"
              size="small"
              color="default"
              variant="outlined"
              icon={<AccessTimeOutlined fontSize="small" />}
              label={noteData?.dueDateTime?.toString()}
              onDelete={(event) => handleClickRemoveReminder(event)}
            />
          </Box>
        )}

        <Box mt={1}>
          {noteData.type === "CHECKLIST" ? (
            <ContentChecklistView note={noteData} onUpdateTasks={handleUpdateInChecklistView} />
          ) : (
            <ContentNoteView note={noteData} onUpdate={handleChangeNoteFields} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NoteEditorView;
