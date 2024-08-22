import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { INote, ITaskItem } from "../../pages/Dashboard";
import { openSnackbarAlert } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserNotes } from "../../redux/userSlice";
import ColorPickerPopover from "../color-picker-popover/ColorPickerPopover";
import ContentChecklistView from "../content-checklist-view/ContentChecklistView";
import ContentNoteView from "../content-note-view/ContentNoteView";
import { newNoteInitData } from "../create-note/CreateNote";

interface IEditNoteProps {
  open: boolean;
  note: INote | null;
  onClose: () => void;
}

const EditNote: React.FC<IEditNoteProps> = (props) => {
  const { open, note, onClose } = props;

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const timeoutRef = useRef<null | NodeJS.Timeout>(null);
  const [noteData, setNoteData] = useState<INote>(newNoteInitData);

  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  useEffect(() => {
    if (open) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      setNoteData(note ?? newNoteInitData);
    } else {
      const timeoutId = setTimeout(() => {
        setNoteData(newNoteInitData);
      }, 4000);
      timeoutRef["current"] = timeoutId;
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [note, open]);

  const handleChangeNoteFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updateNote = { ...noteData, [name]: value };
    setNoteData(updateNote);
  };

  const handleUpdateInChecklistView = (tasks: ITaskItem[] | null) => {
    const updateNote = { ...noteData, tasks: tasks };
    setNoteData(updateNote);
  };

  const handleClickNotePinned = () => {
    const updateNote = { ...noteData, isPinned: !noteData.isPinned };
    setNoteData(updateNote);
  };

  const handleClickBgOptions = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.stopPropagation();
    setOpenPopover((prev) => !prev);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickNoteColor = (colorValue: string) => {
    const updateNote = { ...noteData, color: noteData.color === colorValue ? null : colorValue };
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
        const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(newNote));
        dispatch(setUserNotes(data?.data));
        onClose();
      } catch (error: any) {
        dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
      }
    } else {
      onClose();
    }
  };

  const contentViewType: "note-view" | "checklist-view" = note?.tasks ? "checklist-view" : "note-view";

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={handleSaveNote}>
      <DialogContent>
        {contentViewType === "note-view" && <ContentNoteView note={noteData} onUpdate={handleChangeNoteFields} />}

        {contentViewType === "checklist-view" && (
          <ContentChecklistView
            note={noteData}
            onUpdateTitle={handleChangeNoteFields}
            onUpdateTasks={handleUpdateInChecklistView}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Box flex={1} display="flex" alignItems="center" gap={0.5}>
          <Tooltip title={noteData.isPinned ? "Pinned" : "Unpinned"}>
            <IconButton size="small" onClick={handleClickNotePinned}>
              {noteData.isPinned ? (
                <PushPinIcon fontSize="small" color="primary" sx={{ transform: "rotate(45deg)" }} />
              ) : (
                <PushPinOutlinedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Background options">
            <IconButton size="small" onClick={handleClickBgOptions}>
              <ColorLensOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <ColorPickerPopover
            open={openPopover}
            anchorEl={anchorEl}
            selectedColor={noteData?.color}
            onClose={handleClickBgOptions}
            onUpdate={(colorKey: string) => handleClickNoteColor(colorKey)}
          />
        </Box>

        <Button size="small" onClick={handleSaveNote}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNote;
