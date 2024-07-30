import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";
import { StyledLink } from "../components/styledComponents";

const AboutUs: React.FC = () => {
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
              read a little about us to know our journey
            </Typography>
          </Box>

          <Box my={4}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h5' mb={2}>
                  About QuikNote
                </Typography>
                <Box mb={2}>
                  <Typography variant='body2'>
                    <Typography component='span' variant='inherit' fontWeight={600}>
                      QuikNote{" "}
                    </Typography>
                    is your pocket-sized digital notepad, designed to capture your thoughts, ideas, and lists
                    effortlessly. In today's fast-paced world, it's essential to have a tool that keeps up with your
                    busy life.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body2'>
                    With QuikNote, you can jot down anything, anytime, anywhere. Whether it's a brilliant idea, a
                    shopping list, or a simple reminder, our app is your go-to companion. We believe in simplicity and
                    efficiency, so we've created a clean, intuitive interface that lets you focus on what matters most -
                    your notes.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body2'>
                    We're committed to providing you with the best note-taking experience possible. If you have any
                    feedback or suggestions, please don't hesitate to contact us.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body2'>
                    Join millions of users who have discovered the power of QuikNote. Exlore now and experience the
                    difference!
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

export default AboutUs;
