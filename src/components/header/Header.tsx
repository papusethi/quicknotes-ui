import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserPreferences } from "../../redux/userSlice";
import { StyledLink } from "../styledComponents";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const userPreferences = useAppSelector((state) => state.user.userPreferences);

  const handleClickViewChange = () => {
    const updatedUserPreferences = userPreferences ? { ...userPreferences } : {};
    if (userPreferences?.viewType === "list") {
      updatedUserPreferences["viewType"] = "grid";
    } else {
      updatedUserPreferences["viewType"] = "list";
    }

    dispatch(setUserPreferences(updatedUserPreferences));
  };

  return (
    <Box px={2} py={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Box>
        <StyledLink to="/dashboard">
          <Typography variant="h5" display="inline-block">
            QuikNotes
          </Typography>
        </StyledLink>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Tooltip title={userPreferences?.viewType === "list" ? "Grid view" : "List view"}>
          <IconButton size="small" onClick={handleClickViewChange}>
            {userPreferences?.viewType === "list" ? (
              <GridViewOutlinedIcon fontSize="small" />
            ) : (
              <ViewAgendaOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <StyledLink to="/profile">
          <Typography>
            <Avatar sx={{ width: 24, height: 24, background: (theme) => theme.palette.primary.main }}>
              {currentUser?.username?.[0]}
            </Avatar>
          </Typography>
        </StyledLink>
      </Box>
    </Box>
  );
};

export default Header;
