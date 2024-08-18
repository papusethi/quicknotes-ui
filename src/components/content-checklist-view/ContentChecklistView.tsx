import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { Box, Divider, IconButton, List, ListItem, ListSubheader, TextField, Tooltip } from "@mui/material";
import React, { Fragment, useState } from "react";
import { INote } from "../../pages/Dashboard";

interface INoteTaskItem {
  title: string;
  checked: boolean;
  order: number;
}

interface IContentChecklistViewProps {
  note: INote;
  onUpdate: Function;
}

const updateTaskOrderValue = (arr: any[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => ({ ...item, order: index }));
  } else {
    return [];
  }
};

const ContentChecklistView: React.FC<IContentChecklistViewProps> = (props) => {
  const { note, onUpdate } = props;

  const [taskList, setTaskList] = useState<INoteTaskItem[] | null>(null);

  const [newItemTitle, setNewItemTitle] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setNewItemTitle(value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      addItemToList();
    }
  };

  const handleClickAddToList = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    addItemToList();
  };

  const addItemToList = () => {
    const newTaskItem = { title: newItemTitle, checked: false, order: -1 };
    let updatedTaskList: INoteTaskItem[] = [];
    updatedTaskList = [...(taskList ?? []), newTaskItem];
    updatedTaskList = updateTaskOrderValue(updatedTaskList);
    setTaskList(updatedTaskList);
    setNewItemTitle("");
  };

  const bucketItems: INoteTaskItem[] = [];
  const completedItems: INoteTaskItem[] = [];

  taskList?.forEach((item) => {
    if (item.checked) {
      completedItems.push(item);
    } else {
      bucketItems.push(item);
    }
  });

  return (
    <Fragment>
      <TextField
        fullWidth
        multiline
        size="small"
        variant="standard"
        name="title"
        placeholder="Untitled note"
        inputProps={{ style: { fontSize: 20 } }}
        InputProps={{ disableUnderline: true }}
        value={note.title}
        onChange={(event) => onUpdate(event)}
      />

      <Box mt={1}>
        <List disablePadding>
          <ListItem disablePadding>
            <Box width="100%" display="flex" alignItems="center">
              <TextField
                fullWidth
                // multiline
                autoFocus
                size="small"
                variant="standard"
                name="title"
                placeholder="write an item"
                inputProps={{ style: { fontSize: 14 } }}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: <AssignmentOutlinedIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                }}
                value={newItemTitle}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
              />

              <Tooltip title="Add to list">
                <IconButton size="small" onClick={handleClickAddToList}>
                  <KeyboardReturnOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </ListItem>
        </List>

        <Divider sx={{ mt: 0.5 }} />

        {bucketItems.length ? (
          <List
            disablePadding
            subheader={
              <ListSubheader disableGutters sx={{ bgcolor: "transparent" }}>
                {bucketItems.length} bucket items
              </ListSubheader>
            }
          >
            {bucketItems.map(({ title, checked, order }) => (
              <ListItem key={order} disablePadding>
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                  <DragIndicatorOutlinedIcon fontSize="small" color="action" aria-hidden="true" />

                  <IconButton size="small">
                    {checked ? (
                      <CheckBoxOutlinedIcon fontSize="small" />
                    ) : (
                      <CheckBoxOutlineBlankOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>

                  <TextField
                    fullWidth
                    multiline
                    size="small"
                    variant="standard"
                    name="title"
                    placeholder="List item"
                    inputProps={{ style: { fontSize: 14 } }}
                    InputProps={{ disableUnderline: true }}
                    sx={{ marginTop: 0.5 }}
                    value={title}
                    // onChange={handleChangeNoteFields}
                  />
                  <Tooltip title="Delete">
                    <IconButton size="small">
                      <CloseOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : null}

        {completedItems.length ? (
          <List
            disablePadding
            subheader={
              <ListSubheader disableGutters sx={{ bgcolor: "transparent" }}>
                {completedItems.length} completed items
              </ListSubheader>
            }
          >
            {completedItems.map(({ title, checked, order }) => (
              <ListItem key={order} disablePadding>
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                  <IconButton size="small">
                    {checked ? (
                      <CheckBoxOutlinedIcon fontSize="small" />
                    ) : (
                      <CheckBoxOutlineBlankOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>

                  <TextField
                    fullWidth
                    multiline
                    size="small"
                    variant="standard"
                    name="title"
                    placeholder="List item"
                    inputProps={{ style: { fontSize: 14 } }}
                    InputProps={{ disableUnderline: true }}
                    sx={{ marginTop: 0.5 }}
                    value={title}
                    // onChange={handleChangeNoteFields}
                  />
                  <Tooltip title="Delete">
                    <IconButton size="small">
                      <CloseOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : null}
      </Box>
    </Fragment>
  );
};

export default ContentChecklistView;
