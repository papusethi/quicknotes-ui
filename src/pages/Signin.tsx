import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { openSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch } from "../redux/hooks";
import { setCurrentUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleClickSignin = async () => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/signin", JSON.stringify(formData));

      setLoading(false);
      dispatch(setCurrentUser(data.data));
      dispatch(openSnackbarAlert({ severity: "success", message: data.message }));
      navigate("/dashboard");
    } catch (error: any) {
      setLoading(false);
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  let disableSigninBtn = true;

  if (formData.email && formData.password && !loading) {
    disableSigninBtn = false;
  }

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
              sign in to your account to view your notes
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
                    disabled={disableSigninBtn}
                    onClick={handleClickSignin}
                  >
                    {loading ? "Signing in..." : "Sign in me"}
                    <ArrowForwardOutlinedIcon fontSize='small' sx={{ ml: 1 }} />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box textAlign='center'>
            <Typography variant='body2'>
              Geez, I'm new here,{" "}
              <Typography
                component='a'
                href='/signup'
                variant='body2'
                color='primary'
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline"
                  }
                }}
              >
                Crete an account
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

export default Signin;
