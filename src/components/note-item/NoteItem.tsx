import { FolderOpen, History, Home } from "@mui/icons-material";
import { Box, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import moment from "moment";
import React, { useMemo } from "react";
import { INote } from "../../pages/Dashboard";
import { useAppSelector } from "../../redux/hooks";

interface INoteItemProps {
  note: INote;
  onClickListItem: Function;
}

const NoteItem: React.FC<INoteItemProps> = (props) => {
  const { note, onClickListItem } = props;

  const { title, description } = note;

  const currentNote = useAppSelector((state) => state.note.currentNote);
  const userFolders = useAppSelector((state) => state.user.userFolders);

  // User folder id and folder name mapping for easier to display in note.
  const folderIdAndNameMapping = useMemo(() => {
    return userFolders.reduce((acc, eachFolder) => {
      if (eachFolder._id) {
        acc[eachFolder._id] = eachFolder.name;
      }
      return acc;
    }, {} as Record<string, string>);
  }, [userFolders]);

  const updatedAtValue = note?.updatedAt ? moment(note?.updatedAt).format("dddd") : null;

  return (
    <ListItem disableGutters divider>
      <ListItemButton
        selected={note?._id === currentNote?._id}
        onClick={(event) => onClickListItem(event, note)}
        sx={{ borderRadius: 2 }}
      >
        <Box width="100%">
          <ListItemText
            primary={title}
            secondary={description}
            primaryTypographyProps={{
              fontWeight: "bold",
              noWrap: true,
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
            secondaryTypographyProps={{
              noWrap: true,
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          />

          <Box display="flex" alignItems="center" gap={0.25} justifyContent="space-between">
            {note.folderId ? (
              <Box display="flex" alignItems="center" gap={0.25}>
                <FolderOpen color="action" fontSize="small" sx={{ fontSize: 16 }} />
                <Typography variant="caption" lineHeight={1}>
                  {folderIdAndNameMapping[note.folderId]}
                </Typography>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap={0.25}>
                <Home color="action" fontSize="small" sx={{ fontSize: 16 }} />
                <Typography variant="caption" lineHeight={1}>
                  Home
                </Typography>
              </Box>
            )}

            {updatedAtValue ? (
              <Box display="flex" alignItems="center" gap={0.25}>
                <History color="action" fontSize="small" sx={{ fontSize: 16 }} />
                <Typography variant="caption" lineHeight={1}>
                  {updatedAtValue}
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default NoteItem;
