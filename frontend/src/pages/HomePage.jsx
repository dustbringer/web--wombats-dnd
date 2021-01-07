import React from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { DivFlexCenterHInside } from "../components/styled/Divs";

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
            onClick={() => showError("bruh")}
          >
            Alert Error
          </Button>
        </DivFlexCenterHInside>
        <DivFlexCenterHInside>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => showSuccess("mor ebruh")}
          >
            Alert Success
          </Button>
        </DivFlexCenterHInside>
        <DivFlexCenterHInside>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => history.push("/calender")}
          >
            Goto Calender
          </Button>
        </DivFlexCenterHInside>
      </Container>
    </>
  );
};

export default HomePage;
