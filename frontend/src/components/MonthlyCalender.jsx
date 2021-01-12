import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { GlobalContext } from "../GlobalContext";
import MonthlyCalenderTile from "./MonthlyCalenderTile";
import DayDialog from "./DayDialog";
import TokenDialog from "./TokenDialog";
import {
  DivRowSpaceBetween,
  DivFlexCenterHInside,
} from "../components/styled/Divs";
import cal from "../data/calenderDetails.json";
import Dates from "../util/dates";
import Api from "../util/Api";

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
  setTokenButton: {
    margin: "0 10px",
  },
}));

const MonthlyCalender = () => {
  const classes = useStyles();
  const context = React.useContext(GlobalContext);
  const { showError, showSuccess } = context;
  const [currMonth, setCurrMonth] = React.useState(cal.currDate.month);
  const [currYear, setCurrYear] = React.useState(cal.currDate.year);
  const [days, setDays] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [dayDialogDay, setDayDialogDay] = React.useState(1);
  const [dayDialogOpen, setDayDialogOpen] = React.useState(false);
  const [tokenDialogOpen, setTokenDialogOpen] = React.useState(false);

  React.useEffect(() => {
    const firstDay = Dates.dayOfWeek(1, currMonth, currYear);
    const d = new Array(firstDay - 1)
      .fill(-1)
      .concat(
        Array.from(Array(cal.months[currMonth - 1].days), (e, i) => i + 1)
      );
    setDays(d);
  }, [currMonth, currYear]);

  React.useEffect(() => {
    setEvents([]);
    Api.getMonth(currMonth, currYear)
      .then((res) => {
        console.log(res);
        if (
          currMonth === parseInt(res.query.m, 10) &&
          currYear === parseInt(res.query.y, 10)
        )
          setEvents(res.result);
      })
      .catch((err) => showError(err.message));
    // TODO fix this infinite loop when `showError` in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currMonth, currYear]);

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

  return (
    <div className="root">
      <DivRowSpaceBetween>
        <Typography variant="h6">
          {`${currMonth}. ${cal.months[currMonth - 1].name} ${currYear} P.D.`}
        </Typography>
        <div>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setTokenDialogOpen(true)}
            className={classes.setTokenButton}
          >
            Set Token
          </Button>
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
            <div key={`row ${i}`}>
              {days.slice(7 * i, 7 * (i + 1)).map((day, j) => {
                return (
                  <MonthlyCalenderTile
                    key={`row ${i} index ${j}`}
                    day={day}
                    month={currMonth}
                    year={currYear}
                    highlight={
                      day === cal.currDate.day &&
                      currMonth === cal.currDate.month &&
                      currYear === cal.currDate.year
                    }
                    events={events.filter((e) => e.day === day)}
                    onClick={(e) => {
                      setDayDialogDay(day);
                      setDayDialogOpen(true);
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </DivFlexCenterHInside>
      <DayDialog
        day={dayDialogDay}
        month={currMonth}
        year={currYear}
        open={dayDialogOpen}
        handleClose={() => setDayDialogOpen(false)}
      />
      <TokenDialog
        open={tokenDialogOpen}
        handleClose={() => setTokenDialogOpen(false)}
      />
    </div>
  );
};

export default MonthlyCalender;
