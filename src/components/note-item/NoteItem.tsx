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
import { useAppSelector } from "../../redux/hooks";
import { DARK_THEME_COLORS, INoteColors, LIGHT_THEME_COLORS } from "../color";
import ColorPickerPopover from "../color-picker-popover/ColorPickerPopover";

interface INoteItemProps {
  note: INote;
  onClickPinNote: Function;
  onClickRemoveLabel: Function;
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
    onClickRemoveLabel,
    onClickDeleteNote,
    onClickRemindMe,
    onClickBgOptions,
    onClickArchive,
    onClickCard,
    onClickMakeCopy
  } = props;

  const { title, description, labels, isPinned, isArchived, color, tasks } = note;

  const appTheme = useAppSelector((state) => state.app.theme);
  const currentThemeColors = appTheme === "dark" ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  const [openMoreMenu, setOpenMoreMenu] = useState(false);
  const [moreAnchorEle, setMoreAnchorEle] = useState<null | Element>(null);

  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const handleClickBgOptions = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    setOpenPopover((prev) => !prev);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

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
    { title: "Background options", Icon: <ColorLensOutlinedIcon fontSize="small" />, onClick: handleClickBgOptions },
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
        bgcolor: color ? currentThemeColors[color as INoteColors] : "inherit",
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
          {labels?.map((label) => (
            <Chip
              key={label}
              label={label}
              size="small"
              color="default"
              variant="outlined"
              onDelete={(event) => onClickRemoveLabel(event, note, label)}
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

        <ColorPickerPopover
          open={openPopover}
          anchorEl={anchorEl}
          selectedColor={note?.color}
          onClose={handleClickBgOptions}
          onUpdate={(colorKey: string) => onClickBgOptions(colorKey, note)}
        />
      </CardActions>
    </Card>
  );
};

export default NoteItem;
