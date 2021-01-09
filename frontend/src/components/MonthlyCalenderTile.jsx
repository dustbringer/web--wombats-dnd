import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
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
    "&:hover, &:focus": {
      backgroundColor: "#f0f0f0",
    },
    "&:active": {
      backgroundColor: "#eaeaea",
    },
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
  unselectable: {
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  },
}));

const MonthlyCalenderTile = ({
  day,
  month,
  year,
  highlight = false,
  events = [],
  onClick = (e) => {},
}) => {
  const classes = useStyles();

  const handleClick = (e) => {
    if (day < 0) return;
    onClick(e);
  };

  return (
    <div
      className={clsx(
        classes.tile,
        day > 0 ? classes.tileActive : classes.tileInactive,
        highlight ? classes.tileHighlight : ""
      )}
      role="button"
      onClick={handleClick}
    >
      {day > 0 && (
        <>
          <Typography variant="h5" className={classes.unselectable}>
            {day}
          </Typography>
          <DivFlexCenterInside>
            {events &&
              events.map((e, i) => {
                return <Dot key={i} />;
              })}
          </DivFlexCenterInside>
        </>
      )}
    </div>
  );
};

export default MonthlyCalenderTile;
