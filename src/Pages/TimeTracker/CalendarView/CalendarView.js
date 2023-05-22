import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import CalendarModalComponent from "./CalendarModal";
import { GetUserData } from "../../ReactQuery/CustomHooks/TimeTracker";
import CloseIcon from "@mui/icons-material/Close";
import { MainContainer } from "./CalenderStyled";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const loggedInUserData = localStorage.getItem("value");
  const userFinalData = JSON.parse(loggedInUserData);
  const userId = userFinalData._id;
  const { data, isSuccess } = GetUserData(userId);

  useEffect(() => {
    let arr = [];
    data?.data.data.map((element, index) => {
      arr.push({
        title: element.projectName,
        date: element.date,
        start: element.date,
        id: element._id,
        display: element.taskDescription,
        backgroundColor: "rgb(0 0 0 / 17%)",
        borderColor: "#fff",
        borderRadius: "3px",
        textColor: "black",
        extendedProps: {
          title: element.projectName,
          hours: element.hours,
          description: element.taskDescription,
        },
      });
    });
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        const event = {
          title: "Weekend Holiday",
          start: date,
          end: date,
          display: "true",
          backgroundColor: "#1976d2a6",
          borderColor: "#fff",
          borderRadius: "3px",
          border: "2px solid black !important",
          textColor: "black",
        };
        arr.push(event);
      }
    }

    setEvents(arr);
  }, [data]);

  function visibleModal(events) {
    setShowModal(true);
    setEvent({
      title: events.event.title,
      start: events.event.start,
      hours: events.event.extendedProps.hours,
      description: events.event.extendedProps.description,
      end: events.event.end,
      eventId: events.event.id,
    });
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek",
        }}
        events={events?.length ? events : []}
        eventClick={(e) => (e ? visibleModal(e) : "")}
      />
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ width: "100%" }}
      >
        <MainContainer sx={style}>
          <Box sx={{float:'right',display:'block'}}>
            <CloseIcon onClick={() => setShowModal(false)} />
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            align="center"
            sx={{
              marginBottom: "20px",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "24px",
            }}
          >
            User's Task
          </Typography>
          <CalendarModalComponent
            eventVal={event}
            setShowModal={setShowModal}
          />
        </MainContainer>
      </Modal>
    </>
  );
};

export default CalendarView;
