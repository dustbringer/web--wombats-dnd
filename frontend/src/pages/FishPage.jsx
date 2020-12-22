import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { DivFlexCenterHInside } from "../components/styled/Divs";
import ianImage from "../img/ian.jpg";

const useStyles = makeStyles((theme) => ({
  button: {},
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const FishPage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <DivFlexCenterHInside>
          <img src={ianImage} alt="ian the fisher-gnome"/>
        </DivFlexCenterHInside>
      </Container>
    </>
  );
};

export default FishPage;
