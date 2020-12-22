import React from "react";
import styled from "styled-components";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import cal from "../data/calenderDetails.json";
import Dates from "../util/dates";

const useStyles = makeStyles((theme) => ({
  square: {
    width: "120px",
    height: "120px",
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

const MonthlyCalenderTile = ({ isActive }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.square,
        isActive ? classes.squareActive : classes.squareInactive
      )}
    >
      tile
    </div>
  );
};

export default MonthlyCalenderTile;
