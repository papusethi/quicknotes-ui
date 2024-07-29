import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
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
  Typography,
  useTheme
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import NewNote from "../components/NewNote";
import { openSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSavedNotes } from "../redux/userSlice";

export interface INote {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  isPinned: boolean;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const savedNotes = useAppSelector((state) => state.user.savedNotes);

  const [isOpenNoteDialog, setIsOpenNoteDialog] = useState(false);

  useEffect(() => {
    const fetchAllNotes = async () => {
      const { data } = await axiosInstance.get("/note");
      dispatch(setSavedNotes(data?.data));
    };

    fetchAllNotes();
  }, [dispatch]);

  const handleOpenNewNote = () => {
    setIsOpenNoteDialog(true);
  };

  const handleCloseNewNote = () => {
    setIsOpenNoteDialog(false);
  };

  const handleClickDeleteNote = async (noteId: string) => {
    try {
      const { data } = await axiosInstance.delete(`/note/${noteId}`);
      dispatch(setSavedNotes(data?.data));
      dispatch(openSnackbarAlert({ severity: "success", message: data?.message }));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickPinNote = async (note: INote) => {
    const updateNote = { ...note, isPinned: !note.isPinned };
    try {
      const { data } = await axiosInstance.put(`/note/${note?._id}`, JSON.stringify(updateNote));
      dispatch(setSavedNotes(data?.data));
      dispatch(openSnackbarAlert({ severity: "success", message: data?.message }));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

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

      <Box my={2}>
        <Box display='flex' flexDirection='row' justifyContent='space-between' gap={1}>
          <Box>
            <Typography variant='h6'>All your notes</Typography>
          </Box>

          <Box>
            <Button size='small' variant='contained' disableElevation onClick={handleOpenNewNote}>
              <AddOutlinedIcon fontSize='small' sx={{ mr: 0.5 }} />
              New note
            </Button>
          </Box>
        </Box>

        {Array.isArray(savedNotes) && savedNotes.length > 0 ? (
          <Box mt={2} display='grid' gap={1} gridTemplateColumns={"repeat(3, 1fr)"}>
            {savedNotes?.map((note) => {
              const { _id, title, description, tags, isPinned } = note;

              return (
                <Card key={_id} variant='outlined'>
                  <CardContent>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' gap={1}>
                      <Typography variant='h6'>{title}</Typography>
                      <Box>
                        <IconButton size='small' onClick={() => handleClickPinNote(note)}>
                          <PushPinOutlinedIcon
                            fontSize='small'
                            color={isPinned ? "primary" : "inherit"}
                            sx={{ transform: isPinned ? "rotate(45deg)" : "rotate(0deg)" }}
                          />
                        </IconButton>
                        <IconButton size='small' onClick={() => handleClickDeleteNote(_id)}>
                          <DeleteForeverOutlinedIcon fontSize='small' color='error' />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography variant='body2' my={1}>
                      {description}
                    </Typography>

                    <Box display='flex' flexDirection='row' flexWrap='wrap' gap={1}>
                      {tags?.map((tag) => (
                        <Chip key={tag} label={tag} size='small' color='default' variant='outlined' />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        ) : (
          <Box my={4}>
            <Container maxWidth='md'>
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
            </Container>
          </Box>
        )}

        {isOpenNoteDialog && <NewNote onClose={handleCloseNewNote} />}
      </Box>
    </Container>
  );
};

export default Dashboard;
