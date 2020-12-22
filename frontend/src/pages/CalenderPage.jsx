import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import MonthlyCalender from "../components/MonthlyCalender";

const useStyles = makeStyles((theme) => ({
  button: {},
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const CalenderPage = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" gutterBottom className={classes.title}>
          Calender
        </Typography>
        <MonthlyCalender />
      </Container>
    </>
  );
};

export default CalenderPage;
