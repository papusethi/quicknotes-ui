import AddIcon from "@mui/icons-material/Add";
import { Fab, Menu, MenuItem } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { openNoteEditor, setCurrentNote } from "../../redux/noteSlice";
import { newNoteInitData } from "../create-note/CreateNote";

const CreateButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMenu((prev) => !prev);
    setAnchorEl(openMenu ? null : event?.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const handleClickOption = (selectedOption: string) => {
    handleClose();

    dispatch(openNoteEditor());

    if (selectedOption === "new-note") {
      dispatch(setCurrentNote(newNoteInitData));
    } else if (selectedOption === "new-checklist") {
      dispatch(setCurrentNote({ ...newNoteInitData, type: "CHECKLIST" }));
    }
  };

  return (
    <Fragment>
      <Fab variant="extended" size="medium" color="primary" onClick={handleOpen}>
        <AddIcon sx={{ mr: 1 }} fontSize="small" />
        Create
      </Fab>

      <Menu open={openMenu} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem dense onClick={() => handleClickOption("new-note")}>
          New note
        </MenuItem>
        <MenuItem dense onClick={() => handleClickOption("new-checklist")}>
          New checklist
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default CreateButton;
