import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CalendarModalComponent from "./CalendarModal";
import { GetUserData } from "../../ReactQuery/CustomHooks/TimeTracker";

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
        end: element.date,
        description: element.taskDescription,
      });
    });
    setEvents(arr);
  }, [data]);

  function visibleModal(events) {
    setShowModal(true);
    console.log(events, "todays Events");

    setEvent({
      title: events.event.title,
      start: events.event.start,
      description: events.event.display,
      name: events.event.constraint,
      eventId: events.event.id,
    });
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events?.length ? events : []}
        eventClick={(events) => (events ? visibleModal(events) : "")}
      />
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>
          <Typography variant="h5"></Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CalendarModalComponent eventVal={event} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarView;
