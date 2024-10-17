import { Box, Typography } from "@mui/material";
import React from "react";

export interface IScectionEmptyState {
  Icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

const SectionEmptyState: React.FC<IScectionEmptyState> = (props) => {
  const { Icon, title, subtitle } = props;

  return (
    <Box my={2}>
      <Box textAlign="center">{Icon}</Box>
      <Typography variant="h6" textAlign="center">
        {title}
      </Typography>
      <Typography variant="body2" textAlign="center">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default SectionEmptyState;
