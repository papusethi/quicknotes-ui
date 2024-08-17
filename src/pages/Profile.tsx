import { DarkMode, LightMode } from "@mui/icons-material";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import Header from "../components/header/Header";
import { openSnackbarAlert, setTheme } from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentUser } from "../redux/userSlice";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const appTheme = useAppSelector((state) => state.app.theme);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [selectedId, setSelectedId] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
    password: ""
  });

  const handleChangeTheme = (value: string) => {
    dispatch(setTheme(value));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleClickUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.put(`/user/${currentUser?._id}`, JSON.stringify(formData));
      setLoading(false);
      dispatch(setCurrentUser(data?.data));
    } catch (error: any) {
      setLoading(false);
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickSignout = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/signout");
      dispatch(setCurrentUser(null));
      dispatch(openSnackbarAlert({ severity: "success", message: data?.message }));
      navigate("/signin");
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickListItem = async (neTabId: string) => {
    if (neTabId === "signout") {
      await handleClickSignout();
    } else {
      setSelectedId(neTabId);
    }
  };

  const handleClickDeleteAccount = async () => {
    try {
      const { data } = await axiosInstance.delete(`/user/${currentUser?._id}`);
      navigate("/signin");
      dispatch(setCurrentUser(data?.data));
      dispatch(openSnackbarAlert({ severity: "success", message: data?.message }));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const listConfig = [
    {
      id: "profile",
      text: "Profile",
      Icon: PersonOutlineOutlinedIcon,
      content: (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            required
            fullWidth
            type="text"
            variant="standard"
            name="username"
            label="Username"
            size="small"
            value={formData?.username ?? currentUser?.username}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            type="text"
            variant="standard"
            name="email"
            label="Email"
            size="small"
            value={formData?.email ?? currentUser?.email}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            type="password"
            variant="standard"
            name="password"
            label="Password"
            size="small"
            value={formData?.password}
            onChange={handleChange}
          />

          <Button size="small" variant="contained" disableElevation onClick={handleClickUpdate}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </Box>
      )
    },
    {
      id: "appearance",
      text: "Appearance",
      Icon: BrushOutlinedIcon,
      content: (
        <Box>
          <Typography variant="h6">Theme preferences</Typography>
          <Typography variant="body2" mb={2}>
            choose your theme to see a different state of application
          </Typography>
          <Box my={2} display="flex" gap={2}>
            <Box>
              <LightMode fontSize="small" color="warning" />
              <Typography variant="body2" mb={1}>
                Day theme
              </Typography>
              <Button
                size="small"
                variant="contained"
                disableElevation
                disabled={appTheme === "light"}
                onClick={() => handleChangeTheme("light")}
              >
                Activate
              </Button>
            </Box>

            <Box>
              <DarkMode fontSize="small" />
              <Typography variant="body2" mb={1}>
                Night theme
              </Typography>
              <Button
                size="small"
                variant="contained"
                disableElevation
                disabled={appTheme === "dark"}
                onClick={() => handleChangeTheme("dark")}
              >
                Activate
              </Button>
            </Box>
          </Box>
        </Box>
      )
    },
    {
      id: "accountSettings",
      text: "Account Settings",
      Icon: SettingsOutlinedIcon,
      content: (
        <Box>
          <Typography variant="h6">Delete account</Typography>
          <Typography variant="body2" mb={2}>
            once you delete your account, there is no going back. please be certain.
          </Typography>
          <Button size="small" variant="contained" color="error" disableElevation onClick={handleClickDeleteAccount}>
            Delete account permanently
          </Button>
        </Box>
      )
    },
    {
      id: "signout",
      text: "Sign out",
      Icon: ExitToAppOutlinedIcon,
      content: <></>
    }
  ];

  return (
    <Box>
      <Header />

      <Divider />

      <Box display="flex">
        <Box flex={1}>
          <List>
            {listConfig?.map((item) => {
              const { id, text, Icon } = item;
              return (
                <ListItem key={id} disablePadding disableGutters>
                  <ListItemButton
                    selected={selectedId === id}
                    onClick={() => handleClickListItem(id)}
                    sx={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
                  >
                    <ListItemIcon>
                      <Icon fontSize="small" color={id === selectedId ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box flex={4}>
          <Box py={1} px={2}>
            <Card variant="outlined">
              <CardContent>{listConfig?.find((item) => item.id === selectedId)?.content ?? null}</CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
