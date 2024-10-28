import { Box, Typography } from "@mui/material";
import NoteList from "../components/note-list/NoteList";
import { INote } from "../pages/Dashboard";
import { useAppSelector } from "../redux/hooks";

const ReminderSection = () => {
  const userNotes = useAppSelector((state) => state.user.userNotes);

  const upcomingReminderNotes: INote[] = [];

  userNotes?.forEach((note) => {
    if (note.isDeleted || note.isArchived) {
      // do nothing.
    } else {
      if (note.dueDateTime) {
        upcomingReminderNotes.push(note);
      }
    }
  });

  return (
    <Box>
      <Box>
        <Typography variant="h6">Reminders</Typography>
        <Typography variant="body2">Notes with upcoming reminders appear here!</Typography>
      </Box>
      <NoteList notes={upcomingReminderNotes} />
    </Box>
  );
};

export default ReminderSection;
