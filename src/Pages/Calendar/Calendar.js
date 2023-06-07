import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import {
  Modal,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import dayGridPlugin from "@fullcalendar/daygrid";
import {
  GetLeaveDataById,
  DeleteUserEventById,
} from "../ReactQuery/CustomHooks/LeavePlanner";
import {
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CalendarModalComponent from "./CalendarModal";
import ToastContainer from "../../Toast/Toast";
import Snackbar from "@mui/material/Snackbar";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Heading,
  MainContainer,
} from "../TimeTracker/CalendarView/CalenderStyled";

function CalendarComponent() {
  const Id=JSON.parse(localStorage.getItem("value"));
  const [showModal, setShowModal] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [event, setEvent] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [leavesData, setLeavesData] = useState([]);
  const loggedInUserData = localStorage.getItem("value");
  const [leaveType, setLeaveType] = useState("my_leave");
  const userFinalData = JSON.parse(loggedInUserData);
  let allLeaves = [];
  const userId = userFinalData._id;

  const { data: employeeList, isFetching } = useQuery("employee-list", () => {
    return axios.get("http://localhost:5233/getEmpList");
  });



  useEffect(() => {
    let arrayOfColor = [];
    employeeList?.data?.userList.map((element) => {
      arrayOfColor.push({
        _id: element._id,
        userColor: setRandomColor(),
      });
    });
    setClientList(arrayOfColor);
  }, [employeeList]);

  const setRandomColor = () => {
    let letters = "BCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const {
    data: apiData,
    refetch,
  } = GetLeaveDataById(userId, leaveType);

  const [resultMessage, setResultMessage] = useState("");

  const randomColorForClient = (name) => {
    const givenColor = clientList.filter((element) => element._id === name);
    return givenColor[0]?.userColor;
  };

  useEffect(() => {
    if (apiData) {
      const allLeaves = apiData?.data?.data?.map((e, i) => {
        const colorValue = randomColorForClient(e.userId?._id);
        return {
          start: e.leaveDates,
          title: e.userId.firstName + " " + e.userId.lastName,
          allDay: true,
          display: e.description,
          constraint: e.userId?.firstName,
          id: e._id,
          backgroundColor: colorValue,
          borderColor: colorValue,
          textColor: "black",
          extendedProps: {
            status: e.status,
            id: e._id,
            userId:e.userId._id,
          },
        };
      });
      setResultMessage(apiData?.data?.message);
      // setOpenToast(true);
      setLeavesData(allLeaves);
    }
  }, [apiData]);

  function visibleModal(events) {
    setShowModal(true);

    setEvent({
      title: events.event.title,
      start: events.event.start,
      description: events.event.display,
      name: events.event.constraint,
      eventId: userId,
      status: events.event.extendedProps.status,
      id: events.event.extendedProps.id,
      userId: events.event.extendedProps.userId,
    });
  }

  const dashboardParent = {
    backgroundColor: "#26b78a1c",
    height: "auto",
    width: "95%",
    margin: "20px 0 0 31px",
    borderRadius: "7px",
    position: "relative",
  };

  const radioButtonParent = {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "35px",
  };

  const eventModal = {
    width: "20rem",
    height: "185px",
  };

  const modalTitle = {
    fontSize: "40px",
  };

  const getAllLeaves = (val) => {
    setLeaveType(val);
    refetch({ queryKey: ["get-leave-data-id", userId, val] });
  };

  const { mutate } = DeleteUserEventById();

  return (
    <>
      <RadioGroup sx={radioButtonParent}>
        <FormControlLabel
          control={
            <Radio
              value={"my_leave"}
              onChange={() => getAllLeaves("my_leave")}
              label="My Leave"
              checked={leaveType === "my_leave" ? true : false}
            />
          }
          label="My Leave"
        />

        <FormControlLabel
          control={
            <Radio
              value={"all_leaves"}
              onChange={() => getAllLeaves("all_user_leave")}
              label="All Users Leave"
            />
          }
          label="All Users Leave"
        />
      </RadioGroup>

      <Grid sx={dashboardParent}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={leavesData?.length ? leavesData : []}
          eventClick={(events) => (events ? visibleModal(events) : "")}
        />
      </Grid>

      <ToastContainer
        message={resultMessage}
        open={openToast}
        closeToast={() => setOpenToast(false)}
      />

      <>
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ width: "100%" }}
        >
          <MainContainer sx={{width:'400px'}}>
            <Box sx={{ float: "right", display: "block" }}>
              <CloseIcon onClick={() => setShowModal(false)} />
            </Box>
            <Heading id="modal-modal-title" variant="h4" component="h2">
              Leave Data
            </Heading>
            <CalendarModalComponent
              eventVal={event}
              setShowModal={setShowModal}
              Id={Id._id}
            />
          </MainContainer>
        </Modal>
      </>
    </>
  );
}

export default CalendarComponent;
