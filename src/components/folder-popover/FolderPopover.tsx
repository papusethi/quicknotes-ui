import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/hooks";

interface IFolderPopoverProps {
  open: boolean;
  anchorEl: Element | null;
  selectedFolderId?: string | null;
  onClose: Function;
  onClickOption: Function;
}

const FolderPopover: React.FC<IFolderPopoverProps> = (props) => {
  const { open, anchorEl, selectedFolderId, onClose, onClickOption } = props;

  const userFolders = useAppSelector((state) => state.user.userFolders);

  return (
    <Menu
      id="more-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={(event: any) => {
        event?.stopPropagation();
        onClose();
      }}
      MenuListProps={{ "aria-labelledby": "Move to folder" }}
    >
      {userFolders.map(({ _id, name }, index) => (
        <MenuItem
          key={_id}
          divider={userFolders.length === index + 1}
          onClick={(event) => {
            event?.stopPropagation();
            onClickOption(event, _id);
          }}
        >
          {
            <ListItemIcon>
              {_id && selectedFolderId === _id ? <CheckOutlinedIcon fontSize="small" /> : null}
            </ListItemIcon>
          }
          <ListItemText primaryTypographyProps={{ variant: "body2" }}>{name}</ListItemText>
        </MenuItem>
      ))}

      <MenuItem
        key="manage-folders"
        onClick={(event) => {
          event?.stopPropagation();
          onClose();
        }}
      >
        <ListItemIcon>
          <StyleOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ variant: "body2" }}>Manage folders</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default FolderPopover;
