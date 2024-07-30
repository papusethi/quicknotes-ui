import { DarkMode, LightMode } from "@mui/icons-material";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { StyledLink } from "../components/styledComponents";
import { openSnackbarAlert, setTheme } from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentUser } from "../redux/userSlice";

const Profile: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const appTheme = useAppSelector((state) => state.app.theme);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [selectedValue, setSelectedValue] = useState("profile");
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
      dispatch(openSnackbarAlert({ severity: "success", message: data?.message }));
    } catch (error: any) {
      setLoading(false);
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickSignout = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/signout");
      navigate("/signin");
      dispatch(openSnackbarAlert({ severity: "success", message: data?.message }));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickListItem = async (value: string) => {
    if (value === "signout") {
      await handleClickSignout();
    } else {
      setSelectedValue(value);
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

  // tabs and contents

  const listConfig = [
    {
      value: "profile",
      title: "Profile",
      Icon: PersonOutlineOutlinedIcon,
      content: (
        <Box display='flex' flexDirection='column' gap={2}>
          <TextField
            required
            fullWidth
            type='text'
            variant='standard'
            name='username'
            label='Username'
            size='small'
            value={formData?.username ?? currentUser?.username}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            type='text'
            variant='standard'
            name='email'
            label='Email'
            size='small'
            value={formData?.email ?? currentUser?.email}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            type='password'
            variant='standard'
            name='password'
            label='Password'
            size='small'
            value={formData?.password}
            onChange={handleChange}
          />

          <Button size='small' variant='contained' disableElevation onClick={handleClickUpdate}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </Box>
      )
    },
    {
      value: "appearance",
      title: "Appearance",
      Icon: BrushOutlinedIcon,
      content: (
        <Box>
          <Typography variant='h6'>Theme preferences</Typography>
          <Typography variant='body2' mb={2}>
            choose your theme to see a different state of application
          </Typography>
          <Box my={2} display='flex' gap={2}>
            <Box>
              <LightMode fontSize='small' color='warning' />
              <Typography variant='body2' mb={1}>
                Day theme
              </Typography>
              <Button
                size='small'
                variant='contained'
                disableElevation
                disabled={appTheme === "light"}
                onClick={() => handleChangeTheme("light")}
              >
                Activate
              </Button>
            </Box>

            <Box>
              <DarkMode fontSize='small' />
              <Typography variant='body2' mb={1}>
                Night theme
              </Typography>
              <Button
                size='small'
                variant='contained'
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
      value: "accountSettings",
      title: "Account Settings",
      Icon: SettingsOutlinedIcon,
      content: (
        <Box>
          <Typography variant='h6'>Delete account</Typography>
          <Typography variant='body2' mb={2}>
            once you delete your account, there is no going back. please be certain.
          </Typography>
          <Button size='small' variant='contained' color='error' disableElevation onClick={handleClickDeleteAccount}>
            Delete account permanently
          </Button>
        </Box>
      )
    },
    {
      value: "signout",
      title: "Sign out",
      Icon: ExitToAppOutlinedIcon,
      content: <></>
    }
  ];

  return (
    <Container maxWidth='lg'>
      <Box py={2} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Box>
          <StyledLink to='/#'>
            <Typography variant='h5' display='inline-block'>
              QuikNotes.
            </Typography>
          </StyledLink>
        </Box>

        <Box>
          <StyledLink to='/profile'>
            <Typography>
              <Avatar sx={{ width: 24, height: 24, background: theme.palette.primary.main }}>
                {currentUser?.username?.[0]}
              </Avatar>
            </Typography>
          </StyledLink>
        </Box>
      </Box>

      <Divider />

      {/* profile page content */}

      <Box my={4}>
        <Typography variant='h5'>Your profile</Typography>
        <Typography variant='body2'>change your personal details and settings</Typography>

        <Box my={2} display='flex' flexDirection='row' justifyContent='space-between' gap={2}>
          <Box flex={1}>
            <Card variant='outlined'>
              <CardContent>
                <List disablePadding>
                  {listConfig?.map((item) => {
                    const { value, title, Icon } = item;
                    return (
                      <ListItem key={value} disablePadding>
                        <ListItemButton selected={selectedValue === value} onClick={() => handleClickListItem(value)}>
                          {
                            <Icon
                              fontSize='small'
                              sx={{ mr: 1 }}
                              color={value === "signout" ? "error" : value === selectedValue ? "primary" : "inherit"}
                            />
                          }
                          <ListItemText>{title}</ListItemText>
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Box>

          <Box flex={4}>
            <Card variant='outlined'>
              <CardContent>
                {listConfig?.map((item) => {
                  if (item.value === selectedValue) {
                    return item?.content;
                  } else {
                    return null;
                  }
                })}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
