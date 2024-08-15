import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import NewNote from "../components/NewNote";
import { StyledLink } from "../components/styledComponents";
import { openSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSavedNotes } from "../redux/userSlice";

export interface INote {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  color?: string;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const savedNotes = useAppSelector((state) => state.user.savedNotes);

  const [isOpenNoteDialog, setIsOpenNoteDialog] = useState(false);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const { data } = await axiosInstance.get("/note");
        dispatch(setSavedNotes(data?.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllNotes();
  }, [dispatch]);

  const handleOpenNewNote = () => {
    setIsOpenNoteDialog(true);
  };

  const handleCloseNewNote = () => {
    setIsOpenNoteDialog(false);
  };

  const handleClickDeleteNote = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();

    try {
      const { data } = await axiosInstance.delete(`/note/${note._id}`);
      dispatch(setSavedNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickPinNote = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();

    const updateNote = { ...note, isPinned: !note.isPinned };
    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(updateNote));
      dispatch(setSavedNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickRemoveTag = async (event: any, note: INote, tag: string) => {
    event?.stopPropagation();

    const updatedTags = note.tags.filter((currentTag) => currentTag !== tag);
    const updateNote = { ...note, tags: updatedTags };
    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(updateNote));
      dispatch(setSavedNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickRemindMe = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    console.log("remind me clicked");
  };

  const handleClickBgOptions = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    console.log("bg options clicked");
  };

  const handleClickArchive = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    const updateNote = { ...note, isArchived: !note.isArchived };
    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(updateNote));
      dispatch(setSavedNotes(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  return (
    <Container maxWidth='lg'>
      <Box py={2} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Box>
          <StyledLink to='/#'>
            <Typography variant='h5' display='inline-block'>
              QuikNotes.
            </Typography>
          </StyledLink>
        </Box>

        <Box>
          <StyledLink to='/profile'>
            <Typography>
              <Avatar sx={{ width: 24, height: 24, background: theme.palette.primary.main }}>
                {currentUser?.username?.[0]}
              </Avatar>
            </Typography>
          </StyledLink>
        </Box>
      </Box>

      <Divider />

      <Box my={2}>
        <Box display='flex' flexDirection='row' justifyContent='space-between' gap={1}>
          <Box>
            <Typography variant='h6'>All your notes ({savedNotes.length})</Typography>
          </Box>

          <Box>
            <Button size='small' variant='contained' disableElevation onClick={handleOpenNewNote}>
              <AddOutlinedIcon fontSize='small' sx={{ mr: 0.5 }} />
              New note
            </Button>
          </Box>
        </Box>

        {Array.isArray(savedNotes) && savedNotes.length > 0 ? (
          <Box my={2} display='grid' gap={1} gridTemplateColumns={"repeat(3, 1fr)"}>
            {savedNotes?.map((note) => {
              const { _id, title, description, tags, isPinned, color } = note;

              return (
                <Card
                  key={_id}
                  variant='outlined'
                  sx={{ bgcolor: color, "&:hover": { boxShadow: (theme) => theme.shadows[4] } }}
                  onClick={() => console.log("clicked on card")}
                >
                  <CardContent>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' gap={1}>
                      <Typography variant='h6'>{title}</Typography>
                      <Box>
                        <Tooltip title={isPinned ? "Unpin note" : "Pin note"}>
                          <IconButton size='small' onClick={(event) => handleClickPinNote(event, note)}>
                            {isPinned ? (
                              <PushPinOutlinedIcon fontSize='small' />
                            ) : (
                              <PushPinIcon fontSize='small' color='primary' sx={{ transform: "rotate(45deg)" }} />
                            )}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Typography variant='body2' mt={1}>
                      {description}
                    </Typography>

                    <Box display='flex' flexDirection='row' flexWrap='wrap' gap={1} mt={1}>
                      {tags?.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size='small'
                          color='default'
                          variant='outlined'
                          onDelete={(event) => handleClickRemoveTag(event, note, tag)}
                        />
                      ))}
                    </Box>

                    <Box mt={1}>
                      <Tooltip title='Delete note'>
                        <IconButton size='small' onClick={(event) => handleClickDeleteNote(event, note)}>
                          <DeleteForeverOutlinedIcon fontSize='small' color='error' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Remind me'>
                        <IconButton size='small' onClick={(event) => handleClickRemindMe(event, note)}>
                          <AddAlertOutlinedIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Background options'>
                        <IconButton size='small' onClick={(event) => handleClickBgOptions(event, note)}>
                          <ColorLensOutlinedIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Archive'>
                        <IconButton size='small' onClick={(event) => handleClickArchive(event, note)}>
                          <ArchiveOutlinedIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        ) : (
          <Box my={2}>
            <Card variant='outlined'>
              <CardContent>
                <Box
                  minHeight={300}
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  justifyContent='center'
                  textAlign='center'
                >
                  <Typography variant='h6' textAlign='center'>
                    Nothing to see yet, why not start a new note?
                  </Typography>
                  <Typography variant='body2' textAlign='center'>
                    It's time to save some ideas and thoughts of yours
                  </Typography>

                  <Box mt={2}>
                    <Button size='small' variant='contained' disableElevation onClick={handleOpenNewNote}>
                      Write your first note
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {isOpenNoteDialog && <NewNote onClose={handleCloseNewNote} />}
      </Box>
    </Container>
  );
};

export default Dashboard;
