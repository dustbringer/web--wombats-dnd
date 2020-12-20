import React from "react";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import * as NavbarStyled from "./styled/NavbarStyled";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "",
    justifyContent: "space-between",
  },
  toolbar: {
    maxHeight: "100px",
    minHeight: "50px",
  },
  square: {
    width: "80px",
    height: "80px",
  },
  squareActive: {
    border: "1px solid #2f3241",
    borderRadius: "1px",
  },
  squareInactive: {
    border: "1px solid #dbdde3",
    borderRadius: "1px",
  },
}));

const MonthlyCalender = () => {
  const classes = useStyles();

  return (
    <div className="root">
      <Grid container>
        <Grid item>
          <Grid container>
            {[1, 2, 3, 4, 5, 6, 7].map((e, i) => {
              return (
                <Grid
                  item
                  key={i}
                  className={`${classes.square} ${
                    e === 1 ? classes.squareInactive : classes.squareActive
                  }`}
                >
                  {e}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid> 
    </div>
  );
};

export default MonthlyCalender;
