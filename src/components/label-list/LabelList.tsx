import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
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
import React, { Fragment, useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openSnackbarAlert } from "../../redux/appSlice";

interface ILabelItem {
  readonly _id?: string;
  name: string;
}

const LabelList: React.FC = (props) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [labelsList, setLabelsList] = useState<ILabelItem[]>([]);
  const [newLabelName, setNewLabelName] = useState("");

  useEffect(() => {
    const fetchAllLabels = async () => {
      try {
        const { data } = await axiosInstance.get("/label");
        setLabelsList(data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllLabels();
  }, []);

  const addItemToList = async () => {
    if (newLabelName.trim()) {
      const newLabelItem = { name: newLabelName, userId: currentUser?._id };

      try {
        const { data } = await axiosInstance.post("/label", JSON.stringify(newLabelItem));
        setLabelsList(data?.data);
        setNewLabelName("");
      } catch (error: any) {
        dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
      }
    }
  };

  const removeItemFromList = async (labelItem: ILabelItem) => {
    try {
      const { data } = await axiosInstance.delete(`/label/${labelItem._id}`);
      setLabelsList(data?.data);
    } catch (error: any) {
      dispatch(openSnackbarAlert({ severity: "error", message: error?.message }));
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

  const handleClickRemove = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>, task: ILabelItem) => {
    removeItemFromList(task);
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
                disableUnderline: true,
                startAdornment: <LocalOfferOutlinedIcon color="action" sx={{ mr: 0.5 }} />
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
        {Array.isArray(labelsList) && labelsList.length ? (
          <List disablePadding>
            {labelsList.map((labelItem) => {
              const { _id, name } = labelItem;
              return (
                <ListItem key={_id} disablePadding>
                  <ListItemText>{name}</ListItemText>

                  <ListItemSecondaryAction>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={(event) => handleClickRemove(event, labelItem)}>
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={(event) => handleClickRemove(event, labelItem)}>
                        <DeleteForeverOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
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
