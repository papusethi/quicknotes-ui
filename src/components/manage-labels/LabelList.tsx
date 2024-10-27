import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { ILabelItem } from "../../pages/Dashboard";
import { openSnackbarAlert } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserLabels } from "../../redux/userSlice";

interface ILabelItemProps {
  labelItem: ILabelItem;
  onUpdate: Function;
  onClickDelete: Function;
}

const LabelItem: React.FC<ILabelItemProps> = (props) => {
  const { labelItem, onUpdate, onClickDelete } = props;

  const [editMode, setEditMode] = useState(false);
  const [newLabelName, setNewLabelName] = useState(labelItem.name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLabelName(event.target.value);
  };

  const handleClickEdit = () => {
    setEditMode(true);
    setNewLabelName(labelItem.name);
  };

  const updateLabelItem = () => {
    setEditMode(false);

    if (labelItem.name !== newLabelName.trim()) {
      const updatedLabelItem = { ...labelItem, name: newLabelName };
      onUpdate(updatedLabelItem);
    }
  };

  const handleClickSave = () => {
    updateLabelItem();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      updateLabelItem();
    }
  };

  return (
    <ListItem disablePadding>
      {editMode ? (
        <TextField
          fullWidth
          autoFocus
          variant="standard"
          value={newLabelName}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      ) : (
        <ListItemText>{labelItem.name}</ListItemText>
      )}

      <ListItemSecondaryAction>
        {editMode ? (
          <Tooltip title="Save">
            <IconButton size="small" onClick={handleClickSave}>
              <CheckOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Edit">
            <IconButton size="small" onClick={handleClickEdit}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Delete">
          <IconButton size="small" onClick={(event) => onClickDelete(event, labelItem)}>
            <DeleteForeverOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const LabelList: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const userLabels = useAppSelector((state) => state.user.userLabels);

  const [newLabelName, setNewLabelName] = useState("");

  const addItemToList = async () => {
    if (newLabelName.trim() && currentUser?._id) {
      const newLabelItem: ILabelItem = { name: newLabelName, userId: currentUser?._id };

      try {
        const { data } = await axiosInstance.post("/label", JSON.stringify(newLabelItem));
        dispatch(setUserLabels(data?.data));
        setNewLabelName("");
      } catch (error: any) {
        dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewLabelName(value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      addItemToList();
    }
  };

  const handleClickAddToList = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    addItemToList();
  };

  const handleClickUpdate = async (labelItem: ILabelItem) => {
    try {
      const { data } = await axiosInstance.put(`/label/${labelItem._id}`, JSON.stringify(labelItem));
      dispatch(setUserLabels(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickDelete = async (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>, labelItem: ILabelItem) => {
    try {
      const { data } = await axiosInstance.delete(`/label/${labelItem._id}`);
      dispatch(setUserLabels(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  return (
    <Fragment>
      <List disablePadding>
        <ListItem disablePadding>
          <Box width="100%" display="flex" alignItems="center">
            <TextField
              fullWidth
              autoFocus
              size="small"
              variant="standard"
              placeholder="Enter label name"
              InputProps={{
                disableUnderline: true
              }}
              value={newLabelName}
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

      <Box my={2}>
        {Array.isArray(userLabels) && userLabels.length ? (
          <List disablePadding>
            {userLabels.map((labelItem) => {
              return (
                <LabelItem
                  key={labelItem._id}
                  labelItem={labelItem}
                  onUpdate={handleClickUpdate}
                  onClickDelete={handleClickDelete}
                />
              );
            })}
          </List>
        ) : (
          <Typography>No labels found!</Typography>
        )}
      </Box>
    </Fragment>
  );
};

export default LabelList;
