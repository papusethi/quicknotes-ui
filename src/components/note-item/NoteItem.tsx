import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { INote, ITaskItem } from "../../pages/Dashboard";
import { AVAILABLE_COLORS, IAvailableColors } from "../color";

interface INoteItemProps {
  note: INote;
  onClickPinNote: Function;
  onClickRemoveTag: Function;
  onClickDeleteNote: Function;
  onClickRemindMe: Function;
  onClickBgOptions: Function;
  onClickArchive: Function;
  onClickCard: Function;
  onClickMakeCopy: Function;
}

const NoteItem: React.FC<INoteItemProps> = (props) => {
  const {
    note,
    onClickPinNote,
    onClickRemoveTag,
    onClickDeleteNote,
    onClickRemindMe,
    onClickBgOptions,
    onClickArchive,
    onClickCard,
    onClickMakeCopy
  } = props;

  const { title, description, tags, isPinned, isArchived, color, tasks } = note;

  const [openMoreMenu, setOpenMoreMenu] = useState(false);
  const [moreAnchorEle, setMoreAnchorEle] = useState<null | Element>(null);

  const bucketItems: ITaskItem[] = [];
  const completedItems: ITaskItem[] = [];

  tasks?.forEach((item) => {
    if (item.checked) {
      completedItems.push(item);
    } else {
      bucketItems.push(item);
    }
  });

  const actionButtons = [
    { title: "Remind me", Icon: <AddAlertOutlinedIcon fontSize="small" />, onClick: onClickRemindMe },
    { title: "Background options", Icon: <ColorLensOutlinedIcon fontSize="small" />, onClick: onClickBgOptions },
    {
      title: isArchived ? "Unarchive" : "Archive",
      Icon: isArchived ? <UnarchiveOutlinedIcon fontSize="small" /> : <ArchiveOutlinedIcon fontSize="small" />,
      onClick: onClickArchive
    }
  ];

  const moreActionOptions = [
    {
      title: "Make a copy",
      Icon: <ContentCopyOutlinedIcon fontSize="small" />,
      onClick: onClickMakeCopy
    },
    {
      title: "Delete note",
      Icon: <DeleteForeverOutlinedIcon fontSize="small" />,
      onClick: onClickDeleteNote
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

        {Array.isArray(tasks) && tasks.length ? (
          <List disablePadding>
            {bucketItems.map((taskItem) => {
              const { title, checked, order } = taskItem;
              return (
                <ListItem key={order} disablePadding>
                  <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                    <IconButton size="small" tabIndex={-1} aria-hidden="true">
                      {checked ? (
                        <CheckBoxOutlinedIcon fontSize="small" />
                      ) : (
                        <CheckBoxOutlineBlankOutlinedIcon fontSize="small" />
                      )}
                    </IconButton>

                    <ListItemText primaryTypographyProps={{ variant: "body2" }}>{title}</ListItemText>
                  </Box>
                </ListItem>
              );
            })}

            {completedItems.map((taskItem) => {
              const { title, checked, order } = taskItem;
              return (
                <ListItem key={order} disablePadding>
                  <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                    <IconButton size="small" tabIndex={-1} aria-hidden="true">
                      {checked ? (
                        <CheckBoxOutlinedIcon fontSize="small" />
                      ) : (
                        <CheckBoxOutlineBlankOutlinedIcon fontSize="small" />
                      )}
                    </IconButton>

                    <ListItemText primaryTypographyProps={{ variant: "body2" }}>{title}</ListItemText>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        ) : null}

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

        <Tooltip title="More">
          <IconButton
            id="more"
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              setMoreAnchorEle((prev) => (prev ? null : event.currentTarget));
              setOpenMoreMenu((prev) => !prev);
            }}
          >
            <MoreVertOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Menu
          id="more-menu"
          open={openMoreMenu}
          anchorEl={moreAnchorEle}
          onClose={(event: any) => {
            event?.stopPropagation();
            setMoreAnchorEle(null);
            setOpenMoreMenu(false);
          }}
          MenuListProps={{ "aria-labelledby": "more" }}
        >
          {moreActionOptions.map(({ title, Icon, onClick }) => (
            <MenuItem
              key={title}
              onClick={(event) => {
                event?.stopPropagation();
                setMoreAnchorEle(null);
                setOpenMoreMenu(false);
                onClick(event, note);
              }}
            >
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>{title}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </CardActions>
    </Card>
  );
};

export default NoteItem;
