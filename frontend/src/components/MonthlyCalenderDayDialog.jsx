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

const daySuffix = (day) => {
  if (day % 10 === 1 && day !== 11) {
    return "st";
  } else if (day % 10 === 2 && day !== 12) {
    return "nd";
  } else if (day % 10 === 3 && day !== 13) {
    return "rd";
  } else {
    return "th";
  }
};

const MonthlyCalenderDayDialog = ({
  day,
  month,
  year,
  open = false,
  handleClose = () => {},
}) => {
  const context = React.useContext(GlobalContext);
  const { showError, showSuccess } = context;
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    if (!open) return;
    Api.getDay(day, month, year)
      .then((res) => {
        console.log(res);
        setEvents(res.result);
      })
      .catch((err) => showError(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, month, year, open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="calender-day-events-dialog"
      >
        <DialogTitle id="day-dialog-title">{`${day + daySuffix(day)} ${
          cal.months[month - 1].name
        } ${year} P.D.`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          {events.map((e, i) => (
            <div>
              Title: {e.title}
              Description: {e.description}
              Created: {e.date_created}
              Edited: {e.date_edited}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MonthlyCalenderDayDialog;
