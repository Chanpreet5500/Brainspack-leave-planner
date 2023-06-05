import React, { useState, useEffect } from "react";
import { Modal, Box, Snackbar, IconButton } from "@mui/material";
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
import Loader from "../../Loader/Loader";
import { FullCalender } from "../../FullCalender/FullCalender";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userid, setUserId] = useState();
  const [event, setEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const loggedInUserData = localStorage.getItem("value");
  const userFinalData = JSON.parse(loggedInUserData);
  const userId = userFinalData._id;
  const { data, isFetching } = GetUserData(userId);

  const { mutate, isError, isLoading } = DeleteUserData();

  const handleDelete = (eventId) => {
    setUserId(eventId);
    setShowModal(false);
    setConfirmDelete(true);
  };

  const confirmDeleteUser = () => {
    mutate(userid);
    setConfirmDelete(false);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    let arrayOfEvents = [];
    data?.data.data.map((element) => {
      return arrayOfEvents.push({
        title: element.projectName,
        date: element.date,
        allDay: true,
        id: element._id,
        display: element.taskDescription,
        backgroundColor: "#0f8d47",
        borderColor: "#fff",
        borderRadius: "5px",
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
          allDay: true,
          display: "Weekend Holiday",
          backgroundColor: "#1976d2a6",
          borderColor: "#fff",
          borderRadius: "3px",
          border: "2px solid black !important",
          textColor: "black",
        };
        arrayOfEvents.push(event);
      }
    }
    setEvents(arrayOfEvents);
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
      {isLoading || isFetching ? <Loader /> : ""}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={
          isError ? "Something Went Wrong" : "User Task Deleted Successfully"
        }
        ContentProps={{
          sx: { backgroundColor: isError ? "#F20000" : "#4BB543" },
        }}
        action={
          <>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </>
        }
      ></Snackbar>
      <FullCalender events={events} eventClick={visibleModal} />
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
          <HeadingModal id="modal-modal-title" component="h4">
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
