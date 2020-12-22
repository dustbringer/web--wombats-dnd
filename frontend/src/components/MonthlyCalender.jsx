import React from "react";
import styled from "styled-components";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {
  DivRowSpaceBetween,
  DivFlexCenterHInside,
} from "../components/styled/Divs";
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
  container: {
    margin: "12px 0",
    padding: "12px",
    borderRadius: "5px",
    backgroundColor: "#dddddd",
  },
  dayTitleTile: {
    display: "inline-block",
    verticalAlign: "top", // Align blocks to the top
    width: "120px",
    height: "30px",
    backgroundColor: "#ffffff",
    margin: "0 1px 5px",
    borderRadius: "2px",
  },
  tile: {
    display: "inline-block",
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
  tileCurrent: {
    // border: "1px solid #ff4500",
    boxShadow: "0px 0px 0px 2px #ff4500 inset",
  },
}));

const MonthlyCalender = () => {
  const classes = useStyles();
  const [currMonth, setCurrMonth] = React.useState(cal.currDate.month);
  const [currYear, setCurrYear] = React.useState(cal.currDate.year);
  const [days, setDays] = React.useState([]);

  const prevMonth = () => {
    if (currMonth === 1) {
      setCurrMonth(cal.totalMonths);
      setCurrYear((y) => y - 1);
    } else {
      setCurrMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currMonth === cal.totalMonths) {
      setCurrMonth(1);
      setCurrYear((y) => y + 1);
    } else {
      setCurrMonth((m) => m + 1);
    }
  };

  React.useEffect(() => {
    const firstDay = Dates.dayOfWeek(1, currMonth, currYear);
    console.log(firstDay);
    const d = new Array(firstDay - 1)
      .fill(-1)
      .concat(
        Array.from(Array(cal.months[currMonth - 1].days), (e, i) => i + 1)
      );
    setDays(d);
    console.log(d);
  }, [currMonth, currYear]);

  // TODO Render MonthlyCalenderTile component for each tile
  // Pass in display and the events on that day

  return (
    <div className="root">
      <DivRowSpaceBetween>
        <Typography variant="h6">
          {`${currMonth}. ${cal.months[currMonth - 1].name} ${currYear} P.D.`}
        </Typography>
        <div>
          <Button variant="outlined" onClick={prevMonth}>
            Prev
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setCurrMonth(cal.currDate.month);
              setCurrYear(cal.currDate.year);
            }}
          >
            Now
          </Button>
          <Button variant="outlined" onClick={nextMonth}>
            Next
          </Button>
        </div>
      </DivRowSpaceBetween>
      <DivFlexCenterHInside>
        <div className={classes.container}>
          {/* Title days */}
          <div>
            {cal.days.map((e, i) => {
              return (
                <div key={i} className={classes.dayTitleTile}>
                  <Typography variant="body1" align="center">
                    <i>{e}</i>
                  </Typography>
                </div>
              );
            })}
          </div>

          {/* Tiles */}
          {[...new Array(Math.ceil(days.length / 7))].map((row, i) => (
            <div key={`row ${i}`} className={clsx(classes.row)}>
              {days.slice(7 * i, 7 * (i + 1)).map((e, j) => {
                return (
                  <div
                    key={`row ${i} index ${j}`}
                    className={clsx(
                      classes.tile,
                      e > 0 ? classes.tileActive : classes.tileInactive,
                      e === cal.currDate.day &&
                        currMonth === cal.currDate.month &&
                        currYear === cal.currDate.year
                        ? classes.tileCurrent
                        : ""
                    )}
                  >
                    {e > 0 && e}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </DivFlexCenterHInside>
    </div>
  );
};

export default MonthlyCalender;
