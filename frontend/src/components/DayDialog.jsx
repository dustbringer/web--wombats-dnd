import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { GlobalContext } from "../GlobalContext";
import EventCard from "./EventCard";
import EventAddDialog from "./EventAddDialog";
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

const DayDialog = ({
  day,
  month,
  year,
  open = false,
  handleClose = () => {},
}) => {
  const context = React.useContext(GlobalContext);
  const { showError, showSuccess } = context;
  const [events, setEvents] = React.useState([]);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [updatedToggle, setUpdatedToggle] = React.useState(false);

  const updateList = () => setUpdatedToggle((b) => !b);

  const onAdd = () => {
    setAddDialogOpen(true);
  };

  React.useEffect(() => {
    if (!open) return;
    setEvents([]);
    Api.getDay(day, month, year)
      .then((res) => {
        // console.log(res);
        setEvents(res.result);
      })
      .catch((err) => showError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedToggle, day, month, year, open]);

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
          {events.length === 0 ? (
            <Typography variant="body2" component="p">
              No events to display.
            </Typography>
          ) : (
            events.map((e, i) => (
              <EventCard event={e} postChange={updateList} key={e.id} />
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onAdd} disableElevation>
            Add
          </Button>
          <Button variant="contained" onClick={handleClose} disableElevation>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <EventAddDialog
        day={day}
        month={month}
        year={year}
        open={addDialogOpen}
        handleClose={() => setAddDialogOpen(false)}
        postChange={updateList}
      />
    </>
  );
};

export default DayDialog;
