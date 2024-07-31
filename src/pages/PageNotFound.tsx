import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";
import { StyledLink } from "../components/styledComponents";
import { ArrowBackOutlined } from "@mui/icons-material";

const PageNotFound: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Box py={8}>
        <Container maxWidth='md'>
          <Box textAlign='center'>
            <StyledLink to='/#'>
              <Typography variant='h4' display='inline-block'>
                QuikNotes.
              </Typography>
            </StyledLink>
            <Typography variant='body2' textAlign='center'>
              resource not found that you are looking for
            </Typography>
          </Box>

          <Box my={4}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h3' textAlign='center' mb={2}>
                  404
                </Typography>
                <Typography variant='h5' textAlign='center' mb={2}>
                  this page is on vacation
                </Typography>
                <Box mb={2}>
                  <Typography variant='body2' textAlign='center'>
                    our monkeys are currently searching for it
                  </Typography>
                  <Typography variant='body2' textAlign='center'>
                    help us find something to put here
                  </Typography>
                </Box>

                <Box textAlign='center'>
                  <StyledLink to='/#'>
                    <Button size='small' variant='text' disableElevation>
                      <ArrowBackOutlined fontSize='small' sx={{ mr: 1 }} />
                      Go back to home
                    </Button>
                  </StyledLink>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default PageNotFound;
