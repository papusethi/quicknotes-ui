import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleClickSignin = () => {
    navigate("/signin");
  };

  const handleClickCreateAccount = () => {
    navigate("/signup");
  };

  return (
    <Box py={2} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography component='a' href='/#' variant='h5' color='inherit' sx={{ textDecoration: "none" }}>
          QuikNotes.
        </Typography>
      </Box>
      <Box>
        <ul
          style={{
            margin: 0,
            listStyleType: "none",
            display: "flex",
            flexDirection: "row",
            gap: 16
          }}
        >
          <li>
            <Typography
              component='a'
              href='#services'
              variant='body2'
              color='inherit'
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Services
            </Typography>
          </li>
          <li>
            <Typography
              component='a'
              href='#plans-and-features'
              variant='body2'
              color='inherit'
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Plans & Features
            </Typography>
          </li>
          <li>
            <Typography
              component='a'
              href='/collaboration'
              variant='body2'
              color='inherit'
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Collaboration
            </Typography>
          </li>
        </ul>
      </Box>
      <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' gap={1}>
        <Button size='small' onClick={handleClickSignin}>
          Sign in
        </Button>
        <Button size='small' variant='contained' disableElevation onClick={handleClickCreateAccount}>
          Create an account
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
