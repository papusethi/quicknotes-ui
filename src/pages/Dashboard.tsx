import { Avatar, Box, Container, Divider, Typography, useTheme } from "@mui/material";
import React from "react";
import { useAppSelector } from "../redux/hooks";

const Dashboard: React.FC = () => {
  const theme = useTheme();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <Container maxWidth='lg'>
      <Box py={2} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Box>
          <Typography component='a' href='/#' variant='h5' color='inherit' sx={{ textDecoration: "none" }}>
            QuikNotes.
          </Typography>
        </Box>
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' gap={1}>
          <Typography component='a' href='/profile'>
            <Avatar sx={{ width: 24, height: 24, background: theme.palette.primary.main }}>
              {currentUser?.username?.[0]}
            </Avatar>
          </Typography>
        </Box>
      </Box>

      <Divider />
    </Container>
  );
};

export default Dashboard;
