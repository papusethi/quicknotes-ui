import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/hooks";

interface ILabelPopoverProps {
  open: boolean;
  anchorEl: Element | null;
  selectedLabels?: string[] | null;
  onClose: Function;
  onClickOption: Function;
}

const LabelPopover: React.FC<ILabelPopoverProps> = (props) => {
  const { open, anchorEl, selectedLabels, onClose, onClickOption } = props;

  const userLabels = useAppSelector((state) => state.user.userLabels);

  return (
    <Menu
      id="more-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={(event: any) => {
        event?.stopPropagation();
        onClose();
      }}
      MenuListProps={{ "aria-labelledby": "Add label" }}
    >
      {userLabels.map(({ _id, name }, index) => (
        <MenuItem
          key={_id}
          onClick={(event) => {
            event?.stopPropagation();
            onClickOption(event, _id);
          }}
        >
          {
            <ListItemIcon>
              {_id && selectedLabels?.includes(_id) ? <CheckOutlinedIcon fontSize="small" /> : null}
            </ListItemIcon>
          }
          <ListItemText primaryTypographyProps={{ variant: "body2" }}>{name}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default LabelPopover;
