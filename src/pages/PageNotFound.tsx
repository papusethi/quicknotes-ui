import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";

const PageNotFound: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Box py={8}>
        <Container maxWidth='md'>
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
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default PageNotFound;
