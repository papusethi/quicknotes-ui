import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { openSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch } from "../redux/hooks";

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleClickSignup = async () => {
    if (formData.username && formData.email && formData.password) {
      setLoading(true);
      try {
        const { data } = await axiosInstance.post("/auth/signup", JSON.stringify(formData));

        setLoading(false);
        dispatch(openSnackbarAlert({ severity: "success", message: data?.message }));
        navigate("/signin");
      } catch (error: any) {
        setLoading(false);
        dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
      }
    } else {
      dispatch(openSnackbarAlert({ severity: "error", message: "Please enter the details" }));
    }
  };

  return (
    <Container maxWidth='lg'>
      <Box py={8}>
        <Container maxWidth='sm'>
          <Box>
            <Typography
              component='a'
              href='/#'
              variant='h4'
              color='inherit'
              textAlign='center'
              display='block'
              sx={{ textDecoration: "none" }}
            >
              QuikNotes
            </Typography>
            <Typography variant='body2' textAlign='center'>
              create your account to save your notes
            </Typography>
          </Box>
          <Box m={4}>
            <Card variant='outlined'>
              <CardContent>
                <Box display='flex' flexDirection='column' gap={2}>
                  <TextField
                    required
                    fullWidth
                    type='text'
                    variant='standard'
                    name='username'
                    label='Username'
                    size='small'
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    fullWidth
                    type='email'
                    variant='standard'
                    name='email'
                    label='Email'
                    size='small'
                    value={formData.email}
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
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <Button
                    size='small'
                    variant='contained'
                    disableElevation
                    disabled={loading}
                    onClick={handleClickSignup}
                  >
                    {loading ? "Creating your account..." : "Create my account"}
                    <ArrowForwardOutlinedIcon fontSize='small' sx={{ ml: 1 }} />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box textAlign='center'>
            <Typography variant='body2'>
              Geez, I've an account here,{" "}
              <Typography
                component='a'
                href='/signin'
                variant='body2'
                color='primary'
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline"
                  }
                }}
              >
                Sign in
              </Typography>
            </Typography>
            <Typography
              component='a'
              href='/privacy-policy'
              variant='body2'
              color='inherit'
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Privacy policy
            </Typography>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default Signup;
