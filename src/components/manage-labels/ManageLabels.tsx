import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import LabelList from "./LabelList";

interface IManageLabels {
  open: boolean;
  onClose: () => void;
}

const ManageLabels: React.FC<IManageLabels> = (props) => {
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
      <DialogTitle id="alert-dialog-title">Manage labels</DialogTitle>

      <DialogContent>
        <LabelList />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageLabels;
