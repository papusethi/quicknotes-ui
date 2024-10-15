import DarkModeIcon from "@mui/icons-material/DarkMode";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { Avatar, Box, Card, Divider, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import React from "react";
import { setTheme } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserPreferences } from "../../redux/userSlice";
import { StyledLink } from "../styledComponents";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const userPreferences = useAppSelector((state) => state.user.userPreferences);

  const appTheme = useAppSelector((state) => state.app.theme);

  const handleClickThemeChange = () => {
    if (appTheme === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };

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
    <Box
      position="sticky"
      top={0}
      bgcolor={(theme) => theme.palette.background.default}
      zIndex={(theme) => theme.zIndex.fab + 10}
    >
      <Box px={2} py={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
          <Box px={1}>
            <IconButton size="small">
              <MenuOutlinedIcon />
            </IconButton>
          </Box>
          <Box>
            <StyledLink to="/dashboard">
              <Typography variant="h5" display="inline-block">
                QuikNotes
              </Typography>
            </StyledLink>
          </Box>
        </Box>

        <Box flex={1} maxWidth={480}>
          <Card variant="outlined" elevation={0}>
            <Box px={1} py={0.5}>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Search..."
                inputProps={{ style: { fontSize: 14 } }}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: <SearchOutlinedIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                }}
              />
            </Box>
          </Card>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title={appTheme === "dark" ? "Light mode" : "Dark mode"}>
            <IconButton size="small" onClick={handleClickThemeChange}>
              {appTheme === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
          </Tooltip>

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

      <Divider />
    </Box>
  );
};

export default Header;
