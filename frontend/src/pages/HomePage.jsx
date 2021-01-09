import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { GlobalContext } from "../GlobalContext";
import { DivFlexCenterHInside } from "../components/styled/Divs";
import Api from "../util/Api";

const useStyles = makeStyles((theme) => ({
  button: {},
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const context = React.useContext(GlobalContext);
  const { showError, showSuccess } = context;

  const [token, setToken] = React.useState("");
  const [id, setId] = React.useState("");
  const [day, setDay] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState("");

  const prevDef = (e, fn) => {
    e.preventDefault();
    fn();
  };

  const add = () => {
    Api.addEvent(token, day, month, year, title, description, priority)
      .then(() => showSuccess("Added"))
      .catch((err) => showError(err.message));
  };

  const edit = () => {
    Api.editEvent(token, id, day, month, year, title, description, priority)
      .then(() => showSuccess("Edited"))
      .catch((err) => showError(err.message));
  };

  const remove = () => {
    Api.removeEvent(token, id)
      .then(() => showSuccess("Removed"))
      .catch((err) => showError(err.message));
  };

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Home!!!
        </Typography>
        <DivFlexCenterHInside>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => history.push("/calender")}
          >
            Goto Calender
          </Button>
        </DivFlexCenterHInside>
        <DivFlexCenterHInside>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="token"
          />

          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="id"
          />
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="day"
          />
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="month"
          />
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="year"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="desc"
          />
          <input
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="priority"
          />
          <button onClick={(e) => prevDef(e, add)}>add</button>
          <button onClick={(e) => prevDef(e, edit)}>edit</button>
          <button onClick={(e) => prevDef(e, remove)}>remove</button>
        </DivFlexCenterHInside>
      </Container>
    </>
  );
};

export default HomePage;
