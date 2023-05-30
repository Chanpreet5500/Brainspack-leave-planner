import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {
  CustomTableCell,
  CustomTableHead,
  CustomEditButton,
  CustomDeleteButton,
  TableFooterNoRecord,
  WeekDayBox,
} from "./styled";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography, TableFooter } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header/Header";
import Modal from "../Dialog/Modal";
import { FetchFilterdWeekData } from "../ReactQuery/CustomHooks/TimeTracker";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListView = () => {
  const dateForWeek = new Date();
  const axiosInstance = axios.create();
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("value");
  const finalData = JSON.parse(loggedInUser);
  const userId = finalData?._id;

  const [totalHours, setTotalHours] = useState({});
  const [totalValue, setTotalValue] = useState({});
  const [totalHoursWeeks, setTotalHoursWeeks] = useState([]);
  const [log, setLog] = React.useState("daily");
  const [openModal, setOpenModal] = useState(false);
  const [rowId, setRowId] = useState("");
  const [weekFIrstDay, setWeekFirstDay] = useState({
    formatDate: new Date(
      dateForWeek.getFullYear(),
      dateForWeek.getMonth(),
      dateForWeek.getDate()
    ),
    date: "Today",
  });

  const [navBarDate, setNavbarDate] = useState({
    formatDate: new Date(),
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

  const ddMMYY = (date) => {
    const d = new Date(date);
    const finalDate = d.toLocaleDateString();
    return finalDate;
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

  const apiData = weekDataUser?.data?.filterdUsers;
 
  useEffect(() => {
    if (log && weekFIrstDay) {
     
      refetch();
    }
  }, [log, weekFIrstDay,weekLastDay]);
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
    const [tempDate, tempDate2] = headerDate.date.split("T");
    let [year, month, date] = tempDate.split("-");
    const year2 = projectDate.formatDate.getFullYear();
    const month2 = projectDate.formatDate.getMonth() + 1;
    const date2 = projectDate.formatDate.getDate();
    if (+year === year2 && +month === month2 && ++date === date2) {
      return true;
    }
  };

  

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thru", "Fri", "Sat"];

  const editTask = (id) => {
    navigate("/editTask", { state: id });
  };
  const queryClient = useQueryClient()

  const deleteProjectData = useMutation(() => {
    return axiosInstance.delete(`http://localhost:5233/delete-user/${rowId}`);
  },{
    onSuccess(){
      queryClient.invalidateQueries('logged-user-week-data')
    }
  });

  const confirmModal = (id) => {
    setRowId(id);
    setOpenModal(true);
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
        totalHours.hours += element.hours + Math.trunc(totalHours.minutes/60);
        totalHours.minutes = totalHours.minutes%60;
      });
      setTotalValue(totalHours);
      setTotalHoursWeeks(arr);
    }
  }, [weekDataUser]);
 
  return (
    <>
      <Box>
        {openModal && (
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="Delete Project Detail"
            message="Are you sure you want to delete?"
            submit={() => {
              deleteProjectData.mutate(rowId);

              setOpenModal(false);
             
            }}
          />
        )}
      </Box>
      <Header
        data={{
          log,
          setLog,
          navBarDate,
          setNavbarDate,
          weekFIrstDay,
          setWeekFirstDay,
          weekLastDay,
          setWeekLastDay,
          userId,
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
                <CustomTableHead colSpan={2}>Actions</CustomTableHead>
              ) : (
                <CustomTableHead align="center" >
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

                  {log === "daily" ? (
                    <>
                      <CustomTableCell>
                        <CustomEditButton
                          onClick={() => editTask(row._id, row.userId)}
                        >
                          <EditIcon
                            sx={{
                              fontSize: "24px",
                            }}
                          />
                          <Box
                            sx={{
                              paddingLeft: "5px",
                              paddingRight: "15px",
                              fontFamily: "sans-serif",
                            }}
                            component="span"
                          >
                            Edit
                          </Box>
                        </CustomEditButton>

                        <CustomDeleteButton
                          onClick={() => confirmModal(row._id)}
                        >
                          <DeleteIcon />{" "}
                          <Box
                            sx={{
                              paddingLeft: "5px",
                              fontFamily: "sans-serif",
                            }}
                            component="span"
                          >
                            Delete
                          </Box>
                        </CustomDeleteButton>
                      </CustomTableCell>
                    </>
                  ) : (
                    <CustomTableCell sx={{ fontWeight: "bold",color:'black',}}>
                      {row.hours}
                    </CustomTableCell>
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
                <CustomTableCell sx={{border:'none',fontWeight: "bold" }} colSpan={4} align="right"></CustomTableCell>
                <CustomTableCell>
                  <CustomTableHead sx={{border:'none',fontWeight: "bold",color:'black', }} align="left"> Total </CustomTableHead>
                </CustomTableCell>
                {log === "daily" && (
                  <CustomTableCell align="left">
                    <CustomTableHead align="center" sx={{ fontWeight: "bold" ,border:'none',color:'black', }}>
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
                          sx={{ p: 0, textAlign: "center", fontWeight: "bold" ,border:'none',color:'black', }}
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
                    <CustomTableCell sx={{border:'none',fontWeight: "bold",color:'black', }}>
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

export default ListView;
