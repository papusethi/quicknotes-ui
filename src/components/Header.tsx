import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledLink } from "./styledComponents";

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
        <StyledLink to='/#'>
          <Typography variant='h5'>QuikNotes.</Typography>
        </StyledLink>
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
            <StyledLink to='#services'>
              <Typography variant='body2' sx={{ "&:hover": { textDecoration: "underline" } }}>
                Services
              </Typography>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='#plans-and-features'>
              <Typography variant='body2' sx={{ "&:hover": { textDecoration: "underline" } }}>
                Plans & Features
              </Typography>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/collaboration'>
              <Typography variant='body2' sx={{ "&:hover": { textDecoration: "underline" } }}>
                Collaboration
              </Typography>
            </StyledLink>
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
