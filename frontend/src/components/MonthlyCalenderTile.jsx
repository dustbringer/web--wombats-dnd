import React from "react";
import styled from "styled-components";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { DivFlexCenterInside } from "./styled/Divs";
import Dot from "./Dot";

const useStyles = makeStyles((theme) => ({
  tile: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "top", // Align blocks to the top
    width: "120px",
    height: "120px",
    margin: "1px",
  },
  tileActive: {
    // border: "1px solid #2f3241",
    backgroundColor: "#ffffff",
    borderRadius: "2px",
  },
  tileInactive: {
    // border: "1px solid #ffffff",
    backgroundColor: "transparent",
    borderRadius: "2px",
  },
  tileHighlight: {
    // border: "1px solid #ff4500",
    boxShadow: "0px 0px 0px 2px #ff4500 inset",
  },
}));

const MonthlyCalenderTile = ({ number, highlight = false, events = [] }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.tile,
        number > 0 ? classes.tileActive : classes.tileInactive,
        highlight ? classes.tileHighlight : ""
      )}
    >
      {number > 0 && (
        <>
          <Typography variant="h5">{number}</Typography>
          <DivFlexCenterInside>
            {events.map((e, i) => {
              return <Dot key={i} />;
            })}
          </DivFlexCenterInside>
        </>
      )}
    </div>
  );
};

export default MonthlyCalenderTile;
