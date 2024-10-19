import { ArrowBack, Check } from "@mui/icons-material";
import { Box, IconButton, Popover, Tooltip, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useAppSelector } from "../../redux/hooks";
import { DARK_THEME_COLORS, LIGHT_THEME_COLORS } from "../color";

interface IColorPickerPopoverProps {
  open: boolean;
  anchorEl: Element | null;
  selectedColor?: string | null;
  onUpdate: Function;
  onClose: Function;
}

const ColorPickerPopover: React.FC<IColorPickerPopoverProps> = (props) => {
  const { open, anchorEl, selectedColor, onUpdate, onClose } = props;

  const appTheme = useAppSelector((state) => state.app.theme);
  const currentThemeColors = appTheme === "dark" ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      onClose={(event: any) => {
        event?.stopPropagation();
        onClose();
      }}
    >
      <Box p={1} minWidth={240}>
        <Box display="flex" alignItems="center">
          <IconButton
            size="small"
            onClick={(event) => {
              event?.stopPropagation();
              onClose();
            }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>
          <Typography variant="body2">Choose background</Typography>
        </Box>

        <Box my={1} px={1} display="flex" gap={1}>
          {Object.entries(currentThemeColors).map((entry) => {
            const [colorKey, colorValue] = entry;
            return (
              <Fragment key={colorKey}>
                <Tooltip title={colorKey}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={24}
                    height={24}
                    borderRadius="50%"
                    bgcolor={colorValue}
                    onClick={(event) => {
                      event?.stopPropagation();
                      onUpdate(colorKey);
                    }}
                  >
                    {selectedColor === colorKey && <Check fontSize="small" />}
                  </Box>
                </Tooltip>
              </Fragment>
            );
          })}
        </Box>
      </Box>
    </Popover>
  );
};

export default ColorPickerPopover;
