import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { GetUserData } from "../ReactQuery/CustomHooks/timeTracker";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import CalendarModalComponent from "../Calendar/CalendarModal";

export const CalenderView = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const loggedInUserData = localStorage.getItem("value");
  const userFinalData = JSON.parse(loggedInUserData);
  const userId = userFinalData._id;
  const { data, isSuccess } = GetUserData(userId);
  console.log(data);

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
    console.log(arr[0].title);
    setEvents(arr);
  }, [data]);
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
            <CalendarModalComponent
              eventVal={event}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
