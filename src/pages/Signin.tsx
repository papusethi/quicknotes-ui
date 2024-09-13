import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { StyledLink } from "../components/styledComponents";
import { openSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch } from "../redux/hooks";
import { setCurrentUser } from "../redux/userSlice";

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
    if (formData.email && formData.password) {
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
    } else {
      dispatch(openSnackbarAlert({ severity: "error", message: "Please enter your details" }));
    }
  };

  return (
    <Container maxWidth="lg">
      <Box py={8}>
        <Container maxWidth="sm">
          <Box textAlign="center">
            <StyledLink to="/#">
              <Typography variant="h4" display="inline-block">
                QuikNotes
              </Typography>
            </StyledLink>
            <Typography variant="body2" textAlign="center">
              sign in to your account to view your notes
            </Typography>
          </Box>
          <Box m={4}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    variant="standard"
                    name="email"
                    label="Email"
                    size="small"
                    value={formData.email}
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
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    disabled={loading}
                    onClick={handleClickSignin}
                  >
                    {loading ? "Signing in..." : "Sign in me"}
                    <ArrowForwardOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box textAlign="center">
            <Typography variant="body2">
              Geez, I'm new here,{" "}
              <StyledLink to="/signup">
                <Typography
                  component="span"
                  variant="body2"
                  color="primary"
                  sx={{ "&:hover": { textDecoration: "underline" } }}
                >
                  Crete an account
                </Typography>
              </StyledLink>
            </Typography>
            <StyledLink to="/privacy-policy">
              <Typography component="span" variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                Privacy policy
              </Typography>
            </StyledLink>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default Signin;
