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
import CalendarViewModal from "./CalenderViewModal";

export const CalenderView = () => {
  const [events, setEvents] = useState([]);
  const [eventOnModal, setEventOnModal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const loggedInUserData = localStorage.getItem("value");
  const userFinalData = JSON.parse(loggedInUserData);
  const userId = userFinalData._id;
  const { data, isSuccess } = GetUserData(userId);
  console.log(data);

  function visibleModal(events) {
    setShowModal(true);
    console.log(events, "todays Events");
    console.log(events.event.hours ,"hours time")
    setEventOnModal({
      title: events.event.title,
      start: events.event.start,
      description: events.event.display,
      hours:events.event.startStr,
      name: events.event.constraint,
      eventId: events.event.id,
      status: events.event.status == true ? "1" : "2",
    });
  }

  useEffect(() => {
    let arr = [];
    data?.data.data.map((element, index) => {
      console.log(element,"Project Name")
      arr.push({
        title: element.projectName,
        date: element.date,
        start: element.date,
        end: element.date,
        hours:element.hours,
        // description: element.taskDescription,
        id: userId,
        status: element.status == true ? "Approved" : "Pending",
        display: element.taskDescription,
      });
    });
    console.log(arr[0]);
    setEvents(arr);
  }, [data]);
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events?.length ? events : []}
        eventClick={(events) => (events ? visibleModal(events) : "")}
        height={700}
      />
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{ width: "100%", m: 0, p: "20px" }}
      >
        <DialogTitle>
          <Typography variant="h5" align="center">
            Task Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CalendarViewModal
              eventVal={eventOnModal}
              // deleteId={deleteUserById}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
