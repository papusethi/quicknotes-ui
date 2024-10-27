import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import CreateButton from "../../components/create-button/CreateButton";
import { setSidebarSelectedId } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ManageFolders from "../manage-folders/ManageFolders";
import ManageLabels from "../manage-labels/ManageLabels";

interface ISideNavbarProps {
  listConfig: any[];
  listConfigFolders: any[];
  listConfigLabels: any[];
}

const SideNavbar: React.FC<ISideNavbarProps> = (props) => {
  const { listConfig, listConfigFolders, listConfigLabels } = props;

  const dispatch = useAppDispatch();

  const sidebarSelectedId = useAppSelector((state) => state.app.sidebarSelectedId);

  const [openManageFolders, setOpenManageFolders] = useState(false);
  const [openManageLabels, setOpenManageLabels] = useState(false);

  const handleClickListItem = (newTabId: string) => {
    if (newTabId === "manageFolders") {
      setOpenManageFolders(true);
    } else if (newTabId === "manageLabels") {
      setOpenManageLabels(true);
    } else {
      dispatch(setSidebarSelectedId(newTabId));
    }
  };

  return (
    <Box flex={1} maxWidth={240}>
      <Box mb={1}>
        <CreateButton />
      </Box>

      <List>
        {listConfig.map(({ id, text, Icon, ActiveIcon }) => (
          <ListItem key={id} disablePadding disableGutters dense>
            <ListItemButton
              selected={sidebarSelectedId === id}
              onClick={() => handleClickListItem(id)}
              sx={{ borderRadius: 8 }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {sidebarSelectedId === id ? <ActiveIcon fontSize="small" color="primary" /> : <Icon fontSize="small" />}
              </ListItemIcon>
              <ListItemText>{text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        {listConfigFolders.map(({ id, text, Icon, ActiveIcon }) => (
          <ListItem key={id} disablePadding disableGutters dense>
            <ListItemButton
              selected={sidebarSelectedId === id}
              onClick={() => handleClickListItem(id)}
              sx={{ borderRadius: 8 }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {sidebarSelectedId === id ? <ActiveIcon fontSize="small" color="primary" /> : <Icon fontSize="small" />}
              </ListItemIcon>
              <ListItemText>{text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        {listConfigLabels.map(({ id, text, Icon, ActiveIcon }) => (
          <ListItem key={id} disablePadding disableGutters dense>
            <ListItemButton
              selected={sidebarSelectedId === id}
              onClick={() => handleClickListItem(id)}
              sx={{ borderRadius: 8 }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {sidebarSelectedId === id ? <ActiveIcon fontSize="small" color="primary" /> : <Icon fontSize="small" />}
              </ListItemIcon>
              <ListItemText>{text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <ManageFolders open={openManageFolders} onClose={() => setOpenManageFolders(false)} />
      <ManageLabels open={openManageLabels} onClose={() => setOpenManageLabels(false)} />
    </Box>
  );
};

export default SideNavbar;
