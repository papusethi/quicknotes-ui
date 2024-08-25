import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
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
  ListItemText,
  Tooltip,
  Typography
} from "@mui/material";
import React, { Fragment, useMemo, useRef, useState } from "react";
import { INote, ITaskItem } from "../../pages/Dashboard";
import { useAppSelector } from "../../redux/hooks";
import { DARK_THEME_COLORS, INoteColors, LIGHT_THEME_COLORS } from "../color";
import ColorPickerPopover from "../color-picker-popover/ColorPickerPopover";
import LabelPopover from "../label-popover/LabelPopover";
import MorePopover from "../more-popover/MorePopover";

interface INoteItemProps {
  note: INote;
  onClickPinNote: Function;
  onClickUpdateLabel: Function;
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
    onClickUpdateLabel,
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

  const userLabels = useAppSelector((state) => state.user.userLabels);

  const [openMorePopover, setOpenMorePopover] = useState(false);
  const [anchorElMorePopover, setAnchorElMorePopover] = useState<null | Element>(null);

  const [openColorPopover, setOpenColorPopover] = useState(false);
  const [anchorElColorPopover, setAnchorElColorPopover] = useState<null | Element>(null);

  const [openLabelPopover, setOpenLabelPopover] = useState(false);
  const [anchorElLabelPopover, setAnchorElLabelPopover] = useState<null | Element>(null);

  const moreButtonRef = useRef<HTMLButtonElement | null>(null);

  // User label id and label name mapping for easier to display in note.
  const labelIdAndNameMapping = useMemo(() => {
    return userLabels.reduce((acc, eachLabel) => {
      if (eachLabel._id) {
        acc[eachLabel._id] = eachLabel.name;
      }
      return acc;
    }, {} as Record<string, string>);
  }, [userLabels]);

  const handleClickBgOptions = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    setOpenColorPopover((prev) => !prev);
    setAnchorElColorPopover(anchorElColorPopover ? null : event.currentTarget);
  };

  const handleClickAddLabel = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event?.stopPropagation();
    setOpenLabelPopover((prev) => !prev);
    setAnchorElLabelPopover(anchorElLabelPopover ? null : moreButtonRef?.current);
  };

  const handleClickMore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, note: INote) => {
    event?.stopPropagation();
    setOpenMorePopover((prev) => !prev);
    setAnchorElMorePopover(anchorElMorePopover ? null : event.currentTarget);
  };

  const handleClickMoreOption = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, optionId: string) => {
    event.stopPropagation();
    setOpenMorePopover((prev) => !prev);
    setAnchorElMorePopover(anchorElMorePopover ? null : event.currentTarget);

    switch (optionId) {
      case "add-label": {
        handleClickAddLabel(event);
        break;
      }
      case "make-copy": {
        onClickMakeCopy(event, note);
        break;
      }
      case "delete-note": {
        onClickDeleteNote(event, note);
        break;
      }
    }
  };

  const handleClickLabelOption = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, labelId: string) => {
    event.stopPropagation();

    if (Array.isArray(note.labels)) {
      if (note.labels.includes(labelId)) {
        // Remove existing label
        const updatedLabels = note?.labels?.filter((eachLabelId) => eachLabelId !== labelId);
        const updatedNote = { ...note, labels: updatedLabels ?? null };
        onClickUpdateLabel(event, updatedNote);
      } else {
        // Add new label
        const updatedLabels = [...note.labels, labelId];
        const updatedNote = { ...note, labels: updatedLabels };
        onClickUpdateLabel(event, updatedNote);
      }
    } else {
      const updatedLabels = [labelId];
      const updatedNote = { ...note, labels: updatedLabels };
      onClickUpdateLabel(event, updatedNote);
    }
  };

  const handleClickRemoveLabel = (event: any, labelId: string) => {
    event.stopPropagation();

    const updatedLabels = note?.labels?.filter((eachLabelId) => eachLabelId !== labelId);
    const updatedNote = { ...note, labels: updatedLabels ?? null };
    onClickUpdateLabel(event, updatedNote);
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

  return (
    <Fragment>
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

          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1} mt={2}>
            {labels?.map((labelId) => (
              <Chip
                key={labelId}
                label={labelIdAndNameMapping[labelId]}
                size="small"
                color="default"
                variant="outlined"
                onDelete={(event) => handleClickRemoveLabel(event, labelId)}
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
            <IconButton id="more" size="small" ref={moreButtonRef} onClick={(event) => handleClickMore(event, note)}>
              <MoreVertOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      <ColorPickerPopover
        open={openColorPopover}
        anchorEl={anchorElColorPopover}
        selectedColor={note?.color}
        onClose={handleClickBgOptions}
        onUpdate={(colorKey: string) => onClickBgOptions(colorKey, note)}
      />

      <MorePopover
        open={openMorePopover}
        anchorEl={anchorElMorePopover}
        onClose={handleClickMore}
        onClickOption={handleClickMoreOption}
      />

      <LabelPopover
        open={openLabelPopover}
        anchorEl={anchorElLabelPopover}
        selectedLabels={note.labels}
        onClose={handleClickAddLabel}
        onClickOption={handleClickLabelOption}
      />
    </Fragment>
  );
};

export default NoteItem;
