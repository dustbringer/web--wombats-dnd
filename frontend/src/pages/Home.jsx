import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {},
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          Home!!!
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => history.push("/calender")}
          >
            {" "}
            Goto Calender
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
