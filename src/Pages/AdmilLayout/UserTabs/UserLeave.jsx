import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { GetLeaveDataById } from "../../ReactQuery/CustomHooks/LeavePlanner";
import { Box, Modal } from "@mui/material";
import { Heading, MainContainer } from "../../TimeTracker/CalendarView/CalenderStyled";
import CalendarModalComponent from "../../TimeTracker/CalendarView/CalendarModal";
import CloseIcon from "@mui/icons-material/Close";


export const UserLeave = (props) => {
  const { userId } = props;
  const [leavesData, setLeavesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState([]);


  const { data: apiData, refetch: refetedUser } = GetLeaveDataById(
    userId,
    "my_leave"
  );

  function visibleModal(events) {
    setShowModal(true);
    setEvent({
      title: events.event.title,
      start: events.event.start,
      hours: events.event.extendedProps.hours,
      description: events.event.extendedProps.description,
      end: events.event.end,
      eventId: events.event.id,
      type: events.event.extendedProps.type,
      firstName: events.event.extendedProps.firstName,
      lastName: events.event.extendedProps.lastName,
    });
  }

  useEffect(() => {
    if (apiData) {
      const allLeaves = apiData?.data?.data?.map((e, i) => {
        return {
          start: e.leaveDates,
          title: e.userId.firstName + " " + e.userId.lastName,
          allDay: true,
          display: e.description,
          constraint: e.userId?.firstName,
          id: e._id,
          backgroundColor: "#0f8d47",
          borderColor: "#0f8d47",
          extendedProps: {
            type: e.leaveType,
            firstName: e.userId.firstName,
            lastName: e.userId.lastName,
          },
        };
      });

      setLeavesData(allLeaves);
    }
  }, [apiData]);
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
        events={leavesData?.length ? leavesData : []}
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
            Leaves Data
          </Heading>
          <CalendarModalComponent eventVal={event} admin={true} />
        </MainContainer>
      </Modal>
    </>
  );
};
