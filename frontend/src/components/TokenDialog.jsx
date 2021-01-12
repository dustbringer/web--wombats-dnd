import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { GlobalContext } from "../GlobalContext";

const TokenDialog = ({ open = false, handleClose = () => {} }) => {
  const context = React.useContext(GlobalContext);
  const { CalenderToken, showSuccess } = context;
  const [, setCalenderToken] = CalenderToken;
  const [token, setToken] = React.useState("");

  const updateToken = (e) => {
    e.preventDefault();
    handleClose();
    setToken(""); // clear text box
    setCalenderToken(token);
    showSuccess("Token updated.");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="set-calender-token-dialog"
      >
        <DialogTitle>Set Token</DialogTitle>
        <DialogContent>
          <form onSubmit={updateToken}>
            <TextField
              autoFocus
              margin="dense"
              label="Calender Token"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={updateToken} disableElevation>
            Set
          </Button>
          <Button variant="contained" onClick={handleClose} disableElevation>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TokenDialog;
