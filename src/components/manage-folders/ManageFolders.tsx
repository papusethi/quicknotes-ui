import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import FolderList from "./FolderList";

interface IManageFolders {
  open: boolean;
  onClose: () => void;
}

const ManageFolders: React.FC<IManageFolders> = (props) => {
  const { open, onClose } = props;

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Manage folders</DialogTitle>

      <DialogContent>
        <FolderList />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageFolders;
