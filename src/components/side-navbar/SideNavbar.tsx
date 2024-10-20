import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CreateButton from "../../components/create-button/CreateButton";
import { setSidebarSelectedId } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface ISideNavbarProps {
  listConfig: any[];
  listConfigFolders: any[];
  listConfigLabels: any[];
}

const SideNavbar: React.FC<ISideNavbarProps> = (props) => {
  const { listConfig, listConfigFolders, listConfigLabels } = props;

  const dispatch = useAppDispatch();

  const sidebarSelectedId = useAppSelector((state) => state.app.sidebarSelectedId);

  const handleClickListItem = (newTabId: string) => {
    dispatch(setSidebarSelectedId(newTabId));
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
    </Box>
  );
};

export default SideNavbar;
