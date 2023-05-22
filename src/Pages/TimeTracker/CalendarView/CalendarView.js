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
import {
  DeleteUserData,
  GetUserData,
} from "../../ReactQuery/CustomHooks/TimeTracker";
import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonContainer,
  ButtonWrapper,
  Heading,
  HeadingModal,
  MainContainer,
} from "./CalenderStyled";
import { CustomDeleteButton, CustomEditButton } from "../styled";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [event, setEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const loggedInUserData = localStorage.getItem("value");
  const userFinalData = JSON.parse(loggedInUserData);
  const userId = userFinalData._id;
  const { data, isSuccess } = GetUserData(userId);

  const { mutate } = DeleteUserData();

  const handleDelete = () => {
    setShowModal(false);
    setConfirmDelete(true);
  };

  const confirmDeleteUser = () => {
    mutate(userId);
    setConfirmDelete(false);
  };

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
        <MainContainer>
          <Box sx={{ float: "right", display: "block" }}>
            <CloseIcon onClick={() => setShowModal(false)} />
          </Box>
          <Heading id="modal-modal-title" variant="h4" component="h2">
            User's Task
          </Heading>
          <CalendarModalComponent
            eventVal={event}
            setShowModal={setShowModal}
            setConfirmDelete={setConfirmDelete}
            handleDelete={handleDelete}
          />
        </MainContainer>
      </Modal>
      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        sx={{ width: "100%" }}
      >
        <MainContainer>
          <HeadingModal id="modal-modal-title"  component="h4">
            Are You Sure To Delete this Task ?
          </HeadingModal>
          <ButtonContainer>
            <CustomEditButton onClick={() => setConfirmDelete(false)}>
              <ButtonWrapper component="span">Cancel</ButtonWrapper>
            </CustomEditButton>
            <CustomDeleteButton onClick={() => confirmDeleteUser()}>
              <ButtonWrapper component="span">Confirm</ButtonWrapper>
            </CustomDeleteButton>
          </ButtonContainer>
        </MainContainer>
      </Modal>
    </>
  );
};

export default CalendarView;
