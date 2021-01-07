import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { GlobalContext } from "../GlobalContext";

const Alerts = () => {
  const context = React.useContext(GlobalContext);
  const {
    AlertErrorOpen,
    AlertErrorMsg,
    AlertSuccessOpen,
    AlertSuccessMsg,
  } = context;

  // AlertErrorOpen: [alertErrorOpen, setAlertErrorOpen],
  // AlertErrorMsg: [alertErrorMsg, setAlertErrorMsg],
  // AlertSuccessOpen: [alertSuccessOpen, setAlertSuccessOpen],
  // AlertSuccessMsg: [alertSuccessMsg, setAlertSuccessMsg],
  const [alertErrorOpen, setAlertErrorOpen] = AlertErrorOpen;
  const [alertErrorMsg] = AlertErrorMsg;
  const [alertSuccessOpen, setAlertSuccessOpen] = AlertSuccessOpen;
  const [alertSuccessMsg] = AlertSuccessMsg;

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") return;
    setAlertErrorOpen(() => false);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") return;
    setAlertSuccessOpen(() => false);
  };

  return (
    <>
      <Snackbar
        open={alertSuccessOpen}
        autoHideDuration={2000}
        onClose={handleSuccessClose}
      >
        <MuiAlert
          elevation={5}
          variant="filled"
          onClose={handleSuccessClose}
          severity="success"
        >
          {alertSuccessMsg}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={alertErrorOpen}
        autoHideDuration={4000}
        onClose={handleErrorClose}
      >
        <MuiAlert
          elevation={5}
          variant="filled"
          onClose={handleErrorClose}
          severity="error"
        >
          {alertErrorMsg}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Alerts;
