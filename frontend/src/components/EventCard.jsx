import React from "react";

import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { GlobalContext } from "../GlobalContext";
import EventEditDialog from "./EventEditDialog";
import Api from "../util/Api";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5px 0",
  },
  detailsText: {
    fontSize: "75%",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  button: {
    margin: "2px 0",
  },
});

const formatDate = (dateStr) => moment(dateStr).format("DD/MM/YYYY HH:mm");

const EventCard = ({ event, postChange = () => {} }) => {
  const classes = useStyles();
  const context = React.useContext(GlobalContext);
  const { CalenderToken, showError, showSuccess } = context;
  const [calenderToken] = CalenderToken;
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const onEdit = () => {
    setEditDialogOpen(true);
  };

  const onDelete = () => {
    Api.removeEvent(calenderToken, event.id)
      .then((res) => {
        postChange();
        showSuccess(`Event Id:${event.id} removed.`);
      })
      .catch((err) => showError(err.message));
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h6">
            {event.title}
          </Typography>
          <i>
            <Typography
              className={classes.detailsText}
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              {"Id: "}
              <b>{event.id}</b>
              {", Priority: "}
              <b>{event.priority}</b>
              {", Created: "}
              <b>{formatDate(event.date_created)}</b>
              {", Edited: "}
              <b>{formatDate(event.date_edited)}</b>
            </Typography>
          </i>
          <Typography variant="body2" component="p">
            {event.description === "" ? "No Description" : event.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.buttons}>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            onClick={onEdit}
            fullWidth
            disableElevation
          >
            Edit
          </Button>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            onClick={onDelete}
            fullWidth
            disableElevation
          >
            Remove
          </Button>
        </CardActions>
      </Card>
      <EventEditDialog
        event={event}
        open={editDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        postChange={postChange}
      />
    </>
  );
};

export default EventCard;
