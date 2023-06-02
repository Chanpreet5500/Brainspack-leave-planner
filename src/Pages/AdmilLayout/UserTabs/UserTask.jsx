import React, { useEffect, useState } from "react";
import Header from "../../TimeTracker/Header/Header";
import { FetchFilterdWeekData } from "../../ReactQuery/CustomHooks/TimeTracker";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CustomDeleteButton,
  CustomEditButton,
  CustomTableCell,
  CustomTableHead,
  TableFooterNoRecord,
  WeekDayBox,
} from "../../TimeTracker/styled";
import { UpdateStatus } from "../../ReactQuery/CustomHooks/TimeTracker";
import {
  ButtonContainer,
  ButtonWrapper,
  HeadingModal,
  MainContainer,
} from "../../TimeTracker/CalendarView/CalenderStyled";

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

export const UserTask = (props) => {
  const dateForWeek = new Date();
  const { userId, firstName, lastName } = props;
  const [log, setLog] = useState("daily");
  const [approveUserId, setApproveUserId] = useState();
  const [open, setOpen] = useState(false);
  const [totalHours, setTotalHours] = useState({});
  const [totalValue, setTotalValue] = useState({});
  const [totalHoursWeeks, setTotalHoursWeeks] = useState([]);
  const [navbarDate, setNavbarDate] = useState({
    formatDate: new Date(),
    date: "Today",
  });
  const [weekFIrstDay, setWeekFirstDay] = useState({
    formatDate: new Date(
      dateForWeek.getFullYear(),
      dateForWeek.getMonth(),
      dateForWeek.getDate()
    ),
    date: "Today",
  });
  const [weekLastDay, setWeekLastDay] = useState({
    formatDate: new Date(
      new Date(
        dateForWeek.getFullYear(),
        dateForWeek.getMonth(),
        dateForWeek.getDate() + 1
      )
    ),
    date: "Today",
  });

  const { data: weekDataUser, refetch } = FetchFilterdWeekData({
    userId,
    weekFIrstDay,
    weekLastDay,
  });

  const apiData = weekDataUser?.data?.filterdUsers;
  useEffect(() => {
    if (log && weekFIrstDay) {
      refetch();
    }
  }, [log, weekFIrstDay, weekLastDay]);

  const weekCleander = [
    {
      formatDate: new Date(
        weekFIrstDay.formatDate.getFullYear(),
        weekFIrstDay.formatDate.getMonth(),
        weekFIrstDay.formatDate.getDate() + 0
      ),
    },
    {
      formatDate: new Date(
        weekFIrstDay.formatDate.getFullYear(),
        weekFIrstDay.formatDate.getMonth(),
        weekFIrstDay.formatDate.getDate() + 1
      ),
    },
    {
      formatDate: new Date(
        weekFIrstDay.formatDate.getFullYear(),
        weekFIrstDay.formatDate.getMonth(),
        weekFIrstDay.formatDate.getDate() + 2
      ),
    },
    {
      formatDate: new Date(
        weekFIrstDay.formatDate.getFullYear(),
        weekFIrstDay.formatDate.getMonth(),
        weekFIrstDay.formatDate.getDate() + 3
      ),
    },
    {
      formatDate: new Date(
        weekFIrstDay.formatDate.getFullYear(),
        weekFIrstDay.formatDate.getMonth(),
        weekFIrstDay.formatDate.getDate() + 4
      ),
    },
  ];

  const checkHours = (headerDate, projectDate, hour) => {
    const checkDateFromHeader = new Date(headerDate.date);

    const checkYear = checkDateFromHeader.getFullYear();
    const checkMonth = checkDateFromHeader.getMonth() + 1;
    const checkDate = checkDateFromHeader.getDate();

    const year2 = projectDate.formatDate.getFullYear();
    const month2 = projectDate.formatDate.getMonth() + 1;
    const date2 = projectDate.formatDate.getDate();

    if (checkYear === year2 && checkMonth === month2 && checkDate === date2) {
      return true;
    }
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thru", "Fri", "Sat"];

  const ddMMYY = (date) => {
    const d = new Date(date);
    const finalDate = d.toLocaleDateString();
    return finalDate;
  };

  let dayTotalHours = [];

  useEffect(() => {
    if (weekDataUser?.data && log === "daily") {
      let arr = { hours: 0, minutes: 0 };
      weekDataUser.data.filterdUsers.map((element) => {
        const [hours, minutes] = element.hours.split(":");
        arr.minutes += Number(minutes);
        arr.hours += Number(hours) + Math.trunc(arr.minutes / 60);
        arr.minutes = arr.minutes % 60;
      });
      setTotalHours(arr);
    } else {
      let arr = [];
      weekCleander.map((element) => {
        arr.push({ date: element.formatDate.getDate(), hours: 0, minutes: 0 });
      });
      weekDataUser?.data.filterdUsers.map((userData) => {
        arr.map((element, index) => {
          let userTaskDate = new Date(userData.date).getDate();
          let currentDate = element.date;
          if (userTaskDate == currentDate) {
            let [hours, minutes] = userData.hours.split(":");
            arr[index].minutes += Number(minutes);
            arr[index].hours +=
              Number(hours) + Math.trunc(arr[index].minutes / 60);
            arr[index].minutes = arr[index].minutes % 60;
          }
        });
      });
      let totalHours = { hours: 0, minutes: 0 };
      arr.map((element, index) => {
        totalHours.minutes += element.minutes;
        totalHours.hours += element.hours + Math.trunc(totalHours.minutes / 60);
        totalHours.minutes = totalHours.minutes % 60;
      });
      setTotalValue(totalHours);
      setTotalHoursWeeks(arr);
    }
  }, [weekDataUser]);

  const { mutate } = UpdateStatus();

  const updateStatus = (value) => {
    setOpen(true);
    setApproveUserId(value);
  };

  const confirmApprove = () => {
    mutate({
      id: approveUserId,
      status: true,
    });
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} sx={{ width: "100%" }}>
        <MainContainer>
          <HeadingModal id="modal-modal-title" component="h4">
            Confirm Approve ?
          </HeadingModal>
          <ButtonContainer>
            <CustomEditButton onClick={() => setOpen(false)}>
              <ButtonWrapper component="span">Cancel</ButtonWrapper>
            </CustomEditButton>
            <CustomDeleteButton onClick={() => confirmApprove()}>
              <ButtonWrapper component="span">Approve</ButtonWrapper>
            </CustomDeleteButton>
          </ButtonContainer>
        </MainContainer>
      </Modal>

      <Header
        data={{
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
        }}
      />

      <TableContainer
        component={Paper}
        sx={{
          padding: "10px",
        }}
      >
        <Table sx={{ minWidth: 650, flex: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CustomTableHead>S.No</CustomTableHead>
              <CustomTableHead>Project Name</CustomTableHead>
              <CustomTableHead>Task Name</CustomTableHead>
              <CustomTableHead>Task Description</CustomTableHead>
              {log === "daily" ? (
                <>
                  <CustomTableHead>Date</CustomTableHead>
                  <CustomTableHead>Hours</CustomTableHead>
                </>
              ) : (
                ""
              )}

              <CustomTableHead>Status</CustomTableHead>
              {log === "daily" ? <CustomTableHead></CustomTableHead> : ""}

              {log === "weekly"
                ? weekCleander.map((element) => {
                    return (
                      <CustomTableHead sx={{ p: 0, textAlign: "center" }}>
                        <Box>
                          {`${
                            months[element.formatDate.getMonth()]
                          } - ${element.formatDate.getDate()}`}
                        </Box>
                        <WeekDayBox>
                          {`(${weekDays[element.formatDate.getDay()]})`}
                        </WeekDayBox>
                      </CustomTableHead>
                    );
                  })
                : ""}

              {log === "daily" ? (
                ""
              ) : (
                <CustomTableHead align="center">
                  <Box>Total</Box>
                  <WeekDayBox>(Hours)</WeekDayBox>
                </CustomTableHead>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData?.map((row, index) => {
              dayTotalHours.push(parseInt(row.hours));
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <CustomTableCell component="th" scope="row">
                    {index + 1 + "."}
                  </CustomTableCell>
                  <CustomTableCell>{row.projectName}</CustomTableCell>
                  <CustomTableCell>{row.taskName} </CustomTableCell>
                  <CustomTableCell>{row.taskDescription}</CustomTableCell>
                  {log === "daily" ? (
                    <>
                      <CustomTableCell>{ddMMYY(row.date)}</CustomTableCell>
                      <CustomTableCell>{row.hours}</CustomTableCell>
                    </>
                  ) : (
                    ""
                  )}

                  <CustomTableCell>
                    {row.status === true ? "Approved" : "Pending"}
                  </CustomTableCell>
                  {log === "weekly"
                    ? weekCleander.map((element, index) => {
                        const dateCheck = checkHours(row, element);
                        return (
                          <CustomTableCell
                            align="center"
                            key={index}
                            sx={{
                              fontWeight: dateCheck ? "bold" : "",
                              minWidth: "65px",
                            }}
                          >
                            {dateCheck ? row.hours : "00:00"}
                          </CustomTableCell>
                        );
                      })
                    : ""}

                  {log !== "daily" ? (
                    <>
                      <CustomTableCell
                        sx={{ fontWeight: "bold", color: "black" }}
                      >
                        {row.hours}
                      </CustomTableCell>
                    </>
                  ) : (
                    ""
                  )}
                  {log === "daily" && !row.status ? (
                    <>
                      <CustomTableCell>
                        <Button
                          onClick={() => updateStatus(row._id)}
                          sx={{
                            background: "#55AD88",
                            marginTop: "15px",
                            color: "#fff",
                            textTransform: "capitalize",
                            fontSize: "14px",
                            "&:hover": {
                              background: "#4d9b78",
                            },
                          }}
                        >
                          Approve
                        </Button>
                      </CustomTableCell>
                    </>
                  ) : (
                    ""
                  )}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            {!apiData?.length ? (
              <CustomTableCell colSpan={log === "daily" ? 8 : 11}>
                <TableFooterNoRecord>
                  <Typography>NO RECORD TO DISPLAY.....</Typography>
                </TableFooterNoRecord>
              </CustomTableCell>
            ) : (
              <>
                <CustomTableCell
                  sx={{ border: "none", fontWeight: "bold" }}
                  colSpan={4}
                  align="right"
                ></CustomTableCell>
                <CustomTableCell>
                  <CustomTableHead
                    sx={{ border: "none", fontWeight: "bold", color: "black" }}
                    align="left"
                  >
                    {" "}
                    Total{" "}
                  </CustomTableHead>
                </CustomTableCell>
                {log === "daily" && (
                  <CustomTableCell align="left">
                    <CustomTableHead
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        border: "none",
                        color: "black",
                      }}
                    >
                      {totalHours?.hours?.toString().padStart(2, "0") +
                        ":" +
                        totalHours.minutes?.toString().padStart(2, "0")}
                    </CustomTableHead>
                  </CustomTableCell>
                )}
                {log === "weekly" && (
                  <>
                    {totalHoursWeeks.map((element) => {
                      return (
                        <CustomTableHead
                          sx={{
                            p: 0,
                            textAlign: "center",
                            fontWeight: "bold",
                            border: "none",
                            color: "black",
                          }}
                        >
                          <Box>
                            {element.hours?.toString().padStart(2, "0") +
                              ":" +
                              element.minutes?.toString().padStart(2, "0")}
                          </Box>
                        </CustomTableHead>
                      );
                    })}
                  </>
                )}
                {log === "weekly" && (
                  <>
                    <CustomTableCell
                      sx={{
                        border: "none",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {totalValue.hours?.toString().padStart(2, "0") +
                        ":" +
                        totalValue.minutes?.toString().padStart(2, "0")}
                    </CustomTableCell>
                  </>
                )}
              </>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
