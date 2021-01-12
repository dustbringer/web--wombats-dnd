import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { GlobalContext } from "../GlobalContext";
import cal from "../data/calenderDetails.json";
import Api from "../util/Api";

const EventEditDialog = ({
  event,
  open = false,
  handleClose = () => {},
  postChange = () => {},
}) => {
  const context = React.useContext(GlobalContext);
  const { CalenderToken, showError, showSuccess } = context;
  const [calenderToken] = CalenderToken;
  const [title, setTitle] = React.useState(event.title);
  const [description, setDescription] = React.useState(event.description);
  const [priority, setPriority] = React.useState(event.priority);
  const { id, day, month, year } = event;

  const onEdit = () => {
    Api.editEvent(
      calenderToken,
      id,
      day,
      month,
      year,
      title,
      description,
      priority
    )
      .then((res) => {
        handleClose();
        postChange();

        // Fields get reset when cards get re-rendered

        showSuccess(`Event Id:${id} edited.`);
      })
      .catch((err) => showError(err.message));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-event-dialog"
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
            <TextField
              label="Priority"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 5 } }}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onEdit} disableElevation>
            Edit
          </Button>
          <Button variant="contained" onClick={handleClose} disableElevation>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventEditDialog;
