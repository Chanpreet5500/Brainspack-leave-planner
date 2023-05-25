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
  ButtonTextBox,
  WeekDayBox,
} from "./styled";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, Box, Typography, TableFooter } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header/Header";
import Modal from "../Dialog/Modal";
import { FetchFilterdWeekData } from "../ReactQuery/CustomHooks/TimeTracker";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const rows = [
  {
    projectName: "",
    date: "",
    taskName: "",
    taskDescription: "",
    status: "",
    hours: "",
  },
];

const ListView = () => {
  const dateForWeek = new Date();
  const axiosInstance = axios.create();
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("value");
  const finalData = JSON.parse(loggedInUser);
  const userId = finalData?._id;

  const [projectTitle, setProjectTitle] = useState(rows);
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

  const handleChange = (e, index, field) => {
    const newArray = projectTitle.map((item, i) => {
      if (index === i) {
        return { ...item, [field]: e.target.value };
      } else {
        return item;
      }
    });
    setProjectTitle(newArray);
  };

  const { data: weekDataUser, refetch } = FetchFilterdWeekData({
    userId,
    weekFIrstDay,
    weekLastDay,
  });

  useEffect(() => {
    if (log && weekFIrstDay) {
      refetch();
    }
  }, [log, weekFIrstDay]);

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

  const checkHours = (headerDate, projectDate) => {
    const [tempDate, tempDate2] = headerDate.date.split("T");

    const [year, month, date] = tempDate.split("-");
    const year2 = projectDate.formatDate.getFullYear();
    const month2 = projectDate.formatDate.getMonth() + 1;
    const date2 = projectDate.formatDate.getDate();

    if (+year == year2 && +month == month2 && +date == date2) {
      return true;
    }
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thru", "Fri", "Sat"];

  const editTask = (id) => {
    navigate("/editTask", { state: id });
  };

  const deleteProjectData = useMutation(() => {
    return axiosInstance.delete(`http://localhost:5233/delete-user/${rowId}`);
  });

  const confirmModal = (id) => {
    setRowId(id);
    setOpenModal(true);
  };

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
              {log == "daily" ? (
                <>
                  {" "}
                  <CustomTableHead>Date</CustomTableHead>
                  <CustomTableHead>Hours</CustomTableHead>
                </>
              ) : (
                ""
              )}

              {log == "weekly"
                ? weekCleander.map((element) => {
                    console.log(element.formatDate.getDay());
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

              <CustomTableHead>Status</CustomTableHead>

              <CustomTableHead colSpan={2}>Actions</CustomTableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData?.map((row, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <CustomTableCell component="th" scope="row">
                  {id + 1 + "."}
                </CustomTableCell>
                <CustomTableCell>{row.projectName}</CustomTableCell>
                <CustomTableCell>{row.taskName} </CustomTableCell>
                <CustomTableCell>{row.taskDescription}</CustomTableCell>
                {log == "daily" ? (
                  <>
                    <CustomTableCell>{ddMMYY(row.date)}</CustomTableCell>
                    <CustomTableCell>{row.hours}</CustomTableCell>
                  </>
                ) : (
                  ""
                )}

                {log == "weekly"
                  ? weekCleander.map((element, index) => {
                      return (
                        <CustomTableCell
                          key={index}
                          sx={{
                            fontWeight: checkHours(row, element) ? "bold" : "",
                            minWidth: "65px",
                          }}
                        >
                          {checkHours(row, element) ? row.hours : "00:00"}
                        </CustomTableCell>
                      );
                    })
                  : ""}

                <CustomTableCell>
                  {row.status == true ? "Approved" : "Pending"}
                </CustomTableCell>
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

                  <CustomDeleteButton onClick={() => confirmModal(row._id)}>
                    <DeleteIcon />{" "}
                    <Box
                      sx={{ paddingLeft: "5px", fontFamily: "sans-serif" }}
                      component="span"
                    >
                      Delete
                    </Box>
                  </CustomDeleteButton>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
          {!apiData?.length ? (
            <TableFooter>
              <CustomTableCell colSpan={log == "daily" ? 8 : 11}>
                <TableFooterNoRecord>
                  <Typography>NO RECORD TO DISPLAY.....</Typography>
                </TableFooterNoRecord>
              </CustomTableCell>
            </TableFooter>
          ) : (
            ""
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default ListView;
