import { Box, Typography } from "@mui/material";
import NoteList from "../components/note-list/NoteList";
import { INote } from "../pages/Dashboard";
import { useAppSelector } from "../redux/hooks";

const TrashedSection = () => {
  const userNotes = useAppSelector((state) => state.user.userNotes);

  const trashedNotes: INote[] = [];

  userNotes?.forEach((note) => {
    if (note.isDeleted) {
      trashedNotes.push(note);
    }
  });

  return (
    <Box>
      <Box>
        <Typography variant="h6">Trash</Typography>
        <Typography variant="body2">Your deleted notes appear here!</Typography>
      </Box>

      <NoteList notes={trashedNotes} />
    </Box>
  );
};

export default TrashedSection;
