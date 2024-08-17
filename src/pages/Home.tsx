import ArchitectureOutlinedIcon from "@mui/icons-material/ArchitectureOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import { Avatar, Box, Button, Card, CardContent, Chip, Container, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledLink } from "../components/styledComponents";
import { useAppSelector } from "../redux/hooks";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const handleClickSignin = () => {
    navigate("/signin");
  };

  const handleClickCreateAccount = () => {
    navigate("/signup");
  };

  const handleClickCreateNote = () => {
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="lg">
      <Box py={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box>
          <StyledLink to="/#">
            <Typography variant="h5">QuikNotes.</Typography>
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
              <StyledLink to="#services">
                <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                  Services
                </Typography>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="#plans-and-features">
                <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                  Plans & Features
                </Typography>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/collaboration">
                <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                  Collaboration
                </Typography>
              </StyledLink>
            </li>
          </ul>
        </Box>

        {currentUser ? (
          <Box>
            <StyledLink to="/profile">
              <Typography>
                <Avatar sx={{ width: 24, height: 24, background: (theme) => theme.palette.primary.main }}>
                  {currentUser?.username?.[0]}
                </Avatar>
              </Typography>
            </StyledLink>
          </Box>
        ) : (
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap={1}>
            <Button size="small" onClick={handleClickSignin}>
              Sign in
            </Button>
            <Button size="small" variant="contained" disableElevation onClick={handleClickCreateAccount}>
              Create an account
            </Button>
          </Box>
        )}
      </Box>

      <Divider />

      {/* Hero section */}
      <Container maxWidth="md">
        <Box py={8}>
          <Typography variant="h2" fontWeight={500} textAlign="center">
            QuikNotes
          </Typography>
          <Typography mt={2} textAlign="center">
            QuikNote is your pocket-sized digital notepad in the cloud. Jot down quick ideas, create to-do lists, or
            save important information effortlessly. Access your notes anytime, anywhere from your computer, smartphone,
            or tablet. With QuikNote, your thoughts are always just a tap away, ensuring they're never lost or
            forgotten.
          </Typography>
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" size="small">
              <PlayCircleOutlinedIcon fontSize="small" sx={{ marginRight: 1 }} />
              Get demo
            </Button>
            <Button variant="contained" size="small" disableElevation onClick={handleClickCreateNote}>
              Create a note
            </Button>
          </Box>
        </Box>
      </Container>

      <Divider />

      {/* Services section */}
      <Container maxWidth="md" id="services">
        <Box py={8}>
          <Typography variant="h4" fontWeight={500} textAlign="center">
            Services
          </Typography>
          <Typography textAlign="center">explore more of our digital products to keep your thoughts</Typography>
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <Card variant="outlined">
              <CardContent>
                <DrawOutlinedIcon fontSize="large" color="primary" />
                <Typography variant="h6" fontWeight={500}>
                  QuikDraw
                </Typography>
                <Typography variant="body2" my={2}>
                  QuikDraw is your pocket-sized digital freeform board to instantly sketch your ideas and thoughts in
                  the cloud.
                </Typography>

                <Button size="small">
                  Try it
                  <ArrowOutwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                </Button>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <DesignServicesOutlinedIcon fontSize="large" color="secondary" />
                <Typography variant="h6" fontWeight={500}>
                  QuikDesign
                </Typography>
                <Typography variant="body2" my={2}>
                  QuikDraw is an industry grade design tool to plot your imagination into design in a collaborative way
                  in the cloud.
                </Typography>
                <Button size="small">
                  Try it
                  <ArrowOutwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                </Button>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <ArchitectureOutlinedIcon fontSize="large" color="warning" />
                <Typography variant="h6" fontWeight={500}>
                  QuikJam
                </Typography>
                <Typography variant="body2" my={2}>
                  QuikJam is a light-weight application to plot business model and software architectural diagrams in a
                  collaborative way in the cloud.
                </Typography>

                <Button size="small">
                  Try it
                  <ArrowOutwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      <Divider />

      {/* Pricing section */}
      <Container maxWidth="md" id="plans-and-features">
        <Box py={8}>
          <Typography variant="h4" fontWeight={500} textAlign="center">
            Plans & Features
          </Typography>
          <Typography textAlign="center">pick your plan and explore the features</Typography>
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <Box flex={1}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" fontWeight={500}>
                      Basic
                    </Typography>
                    <Chip label="Free" size="small" variant="outlined" color="warning" />
                  </Box>
                  <Box my={2}>
                    <ul>
                      <li>
                        <Typography component="span" variant="body2" fontWeight={600}>
                          Note Creation:
                        </Typography>
                        <Typography component="span" variant="body2">
                          Simple text-based note creation
                        </Typography>
                      </li>
                      <li>
                        <Typography component="span" variant="body2" fontWeight={600}>
                          Basic Formatting:
                        </Typography>
                        <Typography component="span" variant="body2">
                          Bold, italics, underline, bullet points, numbered lists
                        </Typography>
                      </li>
                      <li>
                        <Typography component="span" variant="body2" fontWeight={600}>
                          Note Search:
                        </Typography>
                        <Typography component="span" variant="body2">
                          Basic search functionality within notes
                        </Typography>
                      </li>
                      <li>
                        <Typography component="span" variant="body2" fontWeight={600}>
                          Note Sharing:
                        </Typography>
                        <Typography component="span" variant="body2">
                          Option to share notes via email or other basic sharing methods
                        </Typography>
                      </li>
                    </ul>
                  </Box>

                  <Button size="small">
                    Buy now
                    <ArrowOutwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                  </Button>
                </CardContent>
              </Card>
            </Box>

            <Box flex={1}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" fontWeight={500}>
                      Premium
                    </Typography>
                    <Chip label="$0.25/month" size="small" variant="outlined" color="info" />
                  </Box>

                  <Box my={2}>
                    <ul>
                      <li>
                        <Typography component="span" variant="body2" fontWeight={600}>
                          Extended Basic:
                        </Typography>
                        <Typography component="span" variant="body2">
                          All features of basic plan
                        </Typography>
                      </li>
                      <li>
                        <Typography component="span" variant="body2" fontWeight={600}>
                          Checklists:
                        </Typography>
                        <Typography component="span" variant="body2">
                          Create to-do lists within notes.
                        </Typography>
                      </li>
                      <li>
                        <Typography component="span" variant="body2" fontWeight={600}>
                          Image Attachment:
                        </Typography>
                        <Typography component="span" variant="body2">
                          Ability to add images to notes
                        </Typography>
                      </li>
                      <li>
                        <Typography component="span" variant="body2" fontWeight={600}>
                          Reminder Alerts:
                        </Typography>
                        <Typography component="span" variant="body2">
                          Set reminders for specific notes
                        </Typography>
                      </li>
                      <li>
                        <Typography component="span" variant="body2" fontWeight={600}>
                          Note Organization:
                        </Typography>
                        <Typography component="span" variant="body2">
                          Directory or label system for note categorization
                        </Typography>
                      </li>
                    </ul>
                  </Box>
                  <Button size="small">
                    Buy now
                    <ArrowOutwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>

      <Divider />

      {/* Footer section */}
      <Container maxWidth="lg">
        <Box py={8}>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box>
              <StyledLink to="/#">
                <Typography variant="h4" display="inline-block">
                  QuikNotes.
                </Typography>
              </StyledLink>

              <Typography variant="body2" textAlign="center">
                access thoughts anywhere, anytime
              </Typography>

              <Box py={4} display="flex" flexDirection="row" alignItems="center" gap={2}>
                <StyledLink
                  to="https://www.linkedin.com/in/papusethi"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  title="Follow on LinkedIn"
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "scale(1.2)" }
                  }}
                >
                  <LinkedInIcon />
                </StyledLink>

                <StyledLink
                  to="https://www.instagram.com/_papusethi_"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  title="Follow on Instagram"
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "scale(1.2)" }
                  }}
                >
                  <InstagramIcon />
                </StyledLink>

                <StyledLink
                  to="https://github.com/papusethi"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  title="Follow on GitHub"
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "scale(1.2)" }
                  }}
                >
                  <GitHubIcon />
                </StyledLink>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" textAlign="center">
                Services
              </Typography>
              <ul>
                <li>
                  <StyledLink to="/">
                    <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                      QuikNote
                    </Typography>
                  </StyledLink>
                </li>
                <li>
                  <StyledLink to="/quikdraw">
                    <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                      Our team
                    </Typography>
                  </StyledLink>
                </li>

                <li>
                  <StyledLink to="/quikdesgin">
                    <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                      QuikDesign
                    </Typography>
                  </StyledLink>
                </li>
                <li>
                  <StyledLink to="/quikjam">
                    <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                      QuikJam
                    </Typography>
                  </StyledLink>
                </li>
              </ul>
            </Box>
            <Box>
              <Typography variant="h6" textAlign="center">
                More info
              </Typography>
              <ul>
                <li>
                  <StyledLink to="/about-us">
                    <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                      About us
                    </Typography>
                  </StyledLink>
                </li>

                <li>
                  <StyledLink to="/our-team">
                    <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                      Our team
                    </Typography>
                  </StyledLink>
                </li>
                <li>
                  <StyledLink to="/collaboration">
                    <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                      Colloaboration
                    </Typography>
                  </StyledLink>
                </li>
                <li>
                  <StyledLink to="/privacy-policy">
                    <Typography variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                      Privacy policy
                    </Typography>
                  </StyledLink>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Container>

      <Divider />

      {/* Copyright section */}
      <Container maxWidth="lg">
        <Box py={2}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">&copy; Copyright 2024 | All rights reserved</Typography>

            <Typography variant="body2">
              Made with 💙 by{" "}
              <StyledLink to="https://papusethi.github.io/portfolio" target="_blank" referrerPolicy="no-referrer">
                <Typography component="span" variant="body2" sx={{ "&:hover": { textDecoration: "underline" } }}>
                  Papu Sethi
                </Typography>
              </StyledLink>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Home;
