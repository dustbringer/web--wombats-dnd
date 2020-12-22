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
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toolbar: {
    maxHeight: "100px",
    minHeight: "50px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  daysBar: {
    width: "120px",
    height: "30px",
  },
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

const MonthlyCalender = () => {
  const classes = useStyles();
  const [currDay, setCurrDat] = React.useState(cal.currDate.day);
  const [currMonth, setCurrMonth] = React.useState(cal.currDate.month);
  const [currYear, setCurrYear] = React.useState(cal.currDate.year);
  const [nRows, setNRows] = React.useState(0);

  React.useEffect(
    () =>
      setNRows(
        Math.ceil(
          (Dates.dayOfWeek(1, currMonth, currYear) -
            1 +
            cal.months[currMonth - 1].days) /
            7
        )
      ),
    [currMonth, currYear]
  );

  // TODO Render rows depending on month and year
  // TODO Render MonthlyCalenderTile component for each tile
    // Pass in display and the events on that day

  return (
    <div className="root">
      <div>
        <div className={clsx(classes.row)}>
          {cal.days.map((e, i) => {
            return (
              <div
                key={i}
                className={clsx(
                  classes.daysBar,
                  i + 1 === 7 ? classes.squareInactive : classes.squareActive
                )}
              >
                {e}
              </div>
            );
          })}
        </div>
        <div className={clsx(classes.row)}>
          {cal.days.map((e, i) => {
            return (
              <div
                key={i}
                className={clsx(
                  classes.square,
                  i + 1 === 7 ? classes.squareInactive : classes.squareActive
                )}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalender;
