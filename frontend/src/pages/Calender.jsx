import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  button: {},
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Calender = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          calender
        </Typography>
      </Container>
    </>
  );
};

export default Calender;
