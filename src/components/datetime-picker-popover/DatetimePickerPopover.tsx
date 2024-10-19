import { ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Popover, Typography } from "@mui/material";
import React, { useState } from "react";

interface IDatetimePickerPopoverProps {
  open: boolean;
  anchorEl: Element | null;
  dueDateTime: Date | null;
  onUpdate: Function;
  onClose: Function;
}

const DatetimePickerPopover: React.FC<IDatetimePickerPopoverProps> = (props) => {
  const { open, anchorEl, dueDateTime, onUpdate, onClose } = props;

  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleClickSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (!dueDate || !dueTime) return;

    const dueDateTime = new Date(`${dueDate}T${dueTime}:00`);
    onUpdate(dueDateTime);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      onClose={(event: any) => {
        event?.stopPropagation();
        onClose();
      }}
    >
      <Box p={1} minWidth={240}>
        <Box display="flex" alignItems="center">
          <IconButton
            size="small"
            onClick={(event) => {
              event?.stopPropagation();
              onClose();
            }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>
          <Typography variant="body2">Select date and time</Typography>
        </Box>

        <Box mt={1} px={1} display="flex" flexDirection="column" gap={1}>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            style={{ height: 32 }}
          />
          <input
            type="time"
            value={dueTime}
            onChange={(event) => setDueTime(event.target.value)}
            style={{ height: 32 }}
          />
        </Box>

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button size="small" variant="text" onClick={handleClickSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default DatetimePickerPopover;
