import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import React from "react";

const Signup: React.FC = () => {
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
                  <TextField required fullWidth type='text' variant='standard' label='Username' size='small' />
                  <TextField required fullWidth type='email' variant='standard' label='Email' size='small' />
                  <TextField required fullWidth type='password' variant='standard' label='Password' size='small' />

                  <Button size='small' variant='contained' disableElevation>
                    Create my account
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
