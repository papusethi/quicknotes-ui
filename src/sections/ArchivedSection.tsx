import { Box, Typography } from "@mui/material";
import NoteList from "../components/note-list/NoteList";
import { INote } from "../pages/Dashboard";
import { useAppSelector } from "../redux/hooks";

const ArchivedSection = () => {
  const userNotes = useAppSelector((state) => state.user.userNotes);

  const archivedNotes: INote[] = [];

  userNotes?.forEach((note) => {
    if (note.isDeleted) {
      // do nothing
    } else {
      if (note.isArchived) {
        archivedNotes.push(note);
      }
    }
  });

  return (
    <Box>
      <Box>
        <Typography variant="h6">Archived</Typography>
        <Typography variant="body2">Your archived notes appear here!</Typography>
      </Box>

      <NoteList notes={archivedNotes} />
    </Box>
  );
};

export default ArchivedSection;
