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
import { IFolderItem } from "../../pages/Dashboard";
import { openSnackbarAlert } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserFolders } from "../../redux/userSlice";

interface IFolderItemProps {
  folderItem: IFolderItem;
  onUpdate: Function;
  onClickDelete: Function;
}

const FolderItem: React.FC<IFolderItemProps> = (props) => {
  const { folderItem, onUpdate, onClickDelete } = props;

  const [editMode, setEditMode] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folderItem.name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(event.target.value);
  };

  const handleClickEdit = () => {
    setEditMode(true);
    setNewFolderName(folderItem.name);
  };

  const updateFolderItem = () => {
    setEditMode(false);

    if (folderItem.name !== newFolderName.trim()) {
      const updatedFolderItem = { ...folderItem, name: newFolderName };
      onUpdate(updatedFolderItem);
    }
  };

  const handleClickSave = () => {
    updateFolderItem();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      updateFolderItem();
    }
  };

  return (
    <ListItem disablePadding>
      {editMode ? (
        <TextField
          fullWidth
          autoFocus
          variant="standard"
          value={newFolderName}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      ) : (
        <ListItemText>{folderItem.name}</ListItemText>
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
          <IconButton size="small" onClick={(event) => onClickDelete(event, folderItem)}>
            <DeleteForeverOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const FolderList: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const userFolders = useAppSelector((state) => state.user.userFolders);

  const [newFolderName, setNewFolderName] = useState("");

  const addItemToList = async () => {
    if (newFolderName.trim() && currentUser?._id) {
      const newFolderItem: IFolderItem = { name: newFolderName?.trim(), userId: currentUser?._id };
      try {
        const { data } = await axiosInstance.post("/folder", JSON.stringify(newFolderItem));
        dispatch(setUserFolders(data?.data));
        setNewFolderName("");
      } catch (error: any) {
        dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewFolderName(value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      addItemToList();
    }
  };

  const handleClickAddToList = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    addItemToList();
  };

  const handleClickUpdate = async (folderItem: IFolderItem) => {
    try {
      const { data } = await axiosInstance.put(`/folder/${folderItem._id}`, JSON.stringify(folderItem));
      dispatch(setUserFolders(data?.data));
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
    }
  };

  const handleClickDelete = async (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    folderItem: IFolderItem
  ) => {
    try {
      const { data } = await axiosInstance.delete(`/folder/${folderItem._id}`);
      dispatch(setUserFolders(data?.data));
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
              placeholder="Enter folder name"
              InputProps={{
                disableUnderline: true
              }}
              value={newFolderName}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
            />

            <Tooltip title="Add folder">
              <IconButton size="small" onClick={handleClickAddToList}>
                <KeyboardReturnOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </ListItem>
      </List>

      <Divider sx={{ mt: 0.5 }} />

      <Box my={2}>
        {Array.isArray(userFolders) && userFolders.length ? (
          <List disablePadding>
            {userFolders.map((folderItem) => {
              return (
                <FolderItem
                  key={folderItem._id}
                  folderItem={folderItem}
                  onUpdate={handleClickUpdate}
                  onClickDelete={handleClickDelete}
                />
              );
            })}
          </List>
        ) : (
          <Typography>No folders found!</Typography>
        )}
      </Box>
    </Fragment>
  );
};

export default FolderList;
