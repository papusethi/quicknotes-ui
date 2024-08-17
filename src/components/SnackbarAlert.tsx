import { Alert, Snackbar } from "@mui/material";
import { closeSnackbarAlert } from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const SnackbarAlert = () => {
  const dispatch = useAppDispatch();
  const snackbarAlertInfo = useAppSelector((state) => state.app.snackbarAlertInfo);

  const handleClose = () => {
    dispatch(closeSnackbarAlert());
  };

  return (
    <Snackbar
      open={snackbarAlertInfo.isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert variant="standard" severity={snackbarAlertInfo.severity}>
        {snackbarAlertInfo.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
