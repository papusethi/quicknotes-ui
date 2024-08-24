import { Box, Popover, Typography } from "@mui/material";
import React from "react";

interface ILabelPopoverProps {
  open: boolean;
  anchorEl: Element | null;
  selectedLabels?: string[] | null;
  onUpdate: Function;
  onClose: Function;
}

const LabelPopover: React.FC<ILabelPopoverProps> = (props) => {
  const { open, anchorEl, selectedLabels, onUpdate, onClose } = props;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={(event: any) => {
        event?.stopPropagation();
        onClose();
      }}
    >
      <Box p={1} display="flex" gap={1} onClick={(event) => event.stopPropagation()}>
        <Typography>Label note</Typography>
      </Box>
    </Popover>
  );
};

export default LabelPopover;
