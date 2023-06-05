import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  ArrowBack,
  ArrowForward,
  DateBox,
  FormControlBox,
  FormControlPannel,
  HeaderMainBox,
  UserDetailsBox,
  Username,
} from "../styled";
import { Box, Select, MenuItem } from "@mui/material";

const Header = ({ data }) => {
  console.log(data);
  const {
    log,
    setLog,
    navbarDate,
    setNavbarDate,
    weekFIrstDay,
    setWeekFirstDay,
    weekLastDay,
    setWeekLastDay,
    userId,
    firstName,
    lastName,
  } = data;
  const date = new Date();

  const handleChange = (event) => {
    if (event.target.value == "daily") {
      const dataDate = {
        formatDate: navbarDate.formatDate,
        date: navbarDate.date,
      };
      setWeekFirstDay(dataDate);
      setWeekLastDay(dataDate);
    } else {
      setWeekFirstDay({
        formatDate: firstDayOfWeek,
        date: firstDayFormat,
      });
      setWeekLastDay({
        formatDate: lastDayOfWeek,
        date: lastDayFormat,
      });
    }
    setLog(event.target.value);
  };

  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const setDateBackward = () => {
    if (log != "weekly") {
      const newFormatDate = new Date(
        navbarDate.formatDate.getFullYear(),
        navbarDate.formatDate.getMonth(),
        navbarDate.formatDate.getDate() - 1
      );

      const month = newFormatDate.getMonth();
      const newDate = ` ${newFormatDate.getDate()}-${
        months[month]
      }-${newFormatDate.getFullYear()}`;
      const setNewDate = {
        formatDate: newFormatDate,
        date: newDate,
      };
      setNavbarDate(setNewDate);
      setWeekFirstDay(setNewDate);
      setWeekLastDay(setNewDate);
    } else {
      const newFirstFormatDate = new Date(
        weekFIrstDay.formatDate.setDate(weekFIrstDay.formatDate.getDate() - 7)
      );
      const newLastFormatDate = new Date(
        weekLastDay.formatDate.setDate(weekLastDay.formatDate.getDate() - 7)
      );

      const firstDayDateStyle = `${newFirstFormatDate.getDate()}-${
        months[newFirstFormatDate.getMonth()]
      }-${newFirstFormatDate.getFullYear()}`;
      const LastDayDateStyle = `${newLastFormatDate.getDate()}-${
        months[newLastFormatDate.getMonth()]
      }-${newLastFormatDate.getFullYear()}`;

      setWeekFirstDay({
        formatDate: newFirstFormatDate,
        date: firstDayDateStyle,
      });
      setWeekLastDay({
        formatDate: newLastFormatDate,
        date: LastDayDateStyle,
      });
    }
  };

  const setDateForward = () => {
    if (log != "weekly") {
      const newFormatDate = new Date(
        navbarDate.formatDate.getFullYear(),
        navbarDate.formatDate.getMonth(),
        navbarDate.formatDate.getDate() + 1
      );

      const month = newFormatDate.getMonth();
      const newDate = ` ${newFormatDate.getDate()}-${
        months[month]
      }-${newFormatDate.getFullYear()}`;
      const setNewDate = {
        formatDate: newFormatDate,
        date: newDate,
      };

      setNavbarDate(setNewDate);
      setWeekFirstDay(setNewDate);
      setWeekLastDay(setNewDate);
    } else {
      const newFirstFormatDate = new Date(
        weekFIrstDay.formatDate.setDate(weekFIrstDay.formatDate.getDate() + 7)
      );
      const newLastFormatDate = new Date(
        weekLastDay.formatDate.setDate(weekLastDay.formatDate.getDate() + 7)
      );

      const firstDayDateStyle = `${newFirstFormatDate.getDate()}-${
        months[newFirstFormatDate.getMonth()]
      }-${newFirstFormatDate.getFullYear()}`;

      const LastDayDateStyle = `${newLastFormatDate.getDate()}-${
        months[newLastFormatDate.getMonth()]
      }-${newLastFormatDate.getFullYear()}`;

      setWeekFirstDay({
        formatDate: newFirstFormatDate,
        date: firstDayDateStyle,
      });
      setWeekLastDay({
        formatDate: newLastFormatDate,
        date: LastDayDateStyle,
      });
    }
  };
  const compareDate = () => {
    const tempDate = navbarDate.formatDate;
    const newDateForToday = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate() + 1
    );
    const dateForToday = `${newDateForToday.getFullYear()}/${newDateForToday.getMonth()}/${newDateForToday.getDate()}`;

    const date = new Date();

    const currDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

    if (dateForToday == currDate) {
      const data = {
        formatDate: new Date(),
        date: "Today",
      };
      setNavbarDate(data);
      setWeekFirstDay(data);
      setWeekLastDay({
        formatDate: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ),
        date: "Today",
      });
    } else if (dateForToday != currDate || log == "weekly") {
      setDateForward();
    }
  };

  const firstDay = date.getDate() - date.getDay() + 1;

  const lastDay = firstDay + 4;

  const firstDayOfWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    firstDay
  );

  const lastDayOfWeek = new Date(date.getFullYear(), date.getMonth(), lastDay);

  const firstDayFormat = `${firstDayOfWeek.getDate()}-${
    months[firstDayOfWeek.getMonth()]
  }-${firstDayOfWeek.getFullYear()}`;

  const lastDayFormat = `${lastDayOfWeek.getDate()}-${
    months[lastDayOfWeek.getMonth()]
  }-${lastDayOfWeek.getFullYear()}`;

  const checkCurrDate = () => {
    const navDate = navbarDate.formatDate;

    const navBarsYear = navDate.getFullYear();
    const navBarsMonth = navDate.getMonth();
    const navBarsDate = navDate.getDate();

    const currDate = new Date();

    const todaysYear = currDate.getFullYear();
    const todaysMonth = currDate.getMonth();
    const todaysDate = currDate.getDate();

    const lastdate = weekLastDay.formatDate;
    const currWeekFirstDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay() + 1
    );
    const currWeekLastDate = new Date(
      currWeekFirstDate.getFullYear(),
      currWeekFirstDate.getMonth(),
      currWeekFirstDate.getDate() + 4
    );

    const lastDateYear = lastdate.getFullYear();
    const lastDateMonth = lastdate.getMonth();
    const lastDateDate = lastdate.getDate();

    const currWeekLastDateYear = currWeekLastDate.getFullYear();
    const currWeekLastDateMonth = currWeekLastDate.getMonth();
    const currWeekLastDateDate = currWeekLastDate.getDate();

    const conditionForDailyLog =
      log == "daily" &&
      (navBarsYear == todaysYear &&
        navBarsMonth == todaysMonth &&
        navBarsDate == todaysDate) == false;

    const conditionForWeeklyLog =
      log == "weekly" &&
      (lastDateYear == currWeekLastDateYear &&
        lastDateMonth == currWeekLastDateMonth &&
        lastDateDate == currWeekLastDateDate) == false;

    if (conditionForDailyLog || conditionForWeeklyLog) {
      compareDate();
    }
  };
console.log(navbarDate,'navbarDate')
  return (
    <>
      <HeaderMainBox>
        <UserDetailsBox  >
          <ArrowBackIosNewIcon sx={{ color: "#174dc2" }} />
          <AccountCircleIcon sx={{ color: "#ebebeb", fontSize: "3rem" }} />
          <Username component={"span"}>{firstName + " " + lastName}</Username>
          
          
        </UserDetailsBox>

        <DateBox>
          <ArrowBack
            onClick={() => {
              setDateBackward();
            }}
          />
          {log == "daily" ? (
            <Box component="p">{navbarDate.date}</Box>
          ) : (
            <Box component="p">
              {weekFIrstDay.date} - {weekLastDay.date}
            </Box>
          )}

          <ArrowForward onClick={checkCurrDate} />
        </DateBox>
        <FormControlBox>
          <FormControlPannel size="small">
            <Select value={log ? log : "daily"} onChange={handleChange}>
              <MenuItem value="daily">Daily Log</MenuItem>
              <MenuItem value="weekly">Weekly Log</MenuItem>
            </Select>
          </FormControlPannel>
        </FormControlBox>
      </HeaderMainBox>
    </>
  );
};

export default Header;
