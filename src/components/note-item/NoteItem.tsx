import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import { Box, Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { INote } from "../../pages/Dashboard";
import { AVAILABLE_COLORS, IAvailableColors } from "../color";

interface INoteItem {
  note: INote;
  onClickPinNote: Function;
  onClickRemoveTag: Function;
  onClickDeleteNote: Function;
  onClickRemindMe: Function;
  onClickBgOptions: Function;
  onClickArchive: Function;
  onClickCard: Function;
}

const NoteItem: React.FC<INoteItem> = (props) => {
  const {
    note,
    onClickPinNote,
    onClickRemoveTag,
    onClickDeleteNote,
    onClickRemindMe,
    onClickBgOptions,
    onClickArchive,
    onClickCard
  } = props;

  const { title, description, tags, isPinned, isArchived, color } = note;

  const actionButtons = [
    { title: "Delete note", Icon: <DeleteForeverOutlinedIcon fontSize="small" />, onClick: onClickDeleteNote },
    { title: "Remind me", Icon: <AddAlertOutlinedIcon fontSize="small" />, onClick: onClickRemindMe },
    { title: "Background options", Icon: <ColorLensOutlinedIcon fontSize="small" />, onClick: onClickBgOptions },
    {
      title: isArchived ? "Unarchive" : "Archive",
      Icon: isArchived ? <UnarchiveOutlinedIcon fontSize="small" /> : <ArchiveOutlinedIcon fontSize="small" />,
      onClick: onClickArchive
    }
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: color ? AVAILABLE_COLORS[color as IAvailableColors] : "inherit",
        "&:hover": { boxShadow: (theme) => theme.shadows[4] }
      }}
      onClick={(event) => onClickCard(event, note)}
    >
      <CardContent>
        <Box display="flex" flexDirection="row" justifyContent="space-between" gap={1}>
          <Typography variant="h6">{title}</Typography>
          <Box>
            <Tooltip title={isPinned ? "Unpin note" : "Pin note"}>
              <IconButton size="small" onClick={(event) => onClickPinNote(event, note)}>
                {isPinned ? (
                  <PushPinIcon fontSize="small" color="primary" sx={{ transform: "rotate(45deg)" }} />
                ) : (
                  <PushPinOutlinedIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography whiteSpace="pre-wrap" variant="body2" mt={1}>
          {description}
        </Typography>

        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1} mt={1}>
          {tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              color="default"
              variant="outlined"
              onDelete={(event) => onClickRemoveTag(event, note, tag)}
            />
          ))}
        </Box>
      </CardContent>

      <CardActions>
        {actionButtons.map(({ title, Icon, onClick }) => (
          <Fragment key={title}>
            <Tooltip title={title}>
              <IconButton size="small" onClick={(event) => onClick(event, note)}>
                {Icon}
              </IconButton>
            </Tooltip>
          </Fragment>
        ))}
      </CardActions>
    </Card>
  );
};

export default NoteItem;
