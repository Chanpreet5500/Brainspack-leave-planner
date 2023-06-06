import React, { useEffect, useState } from "react";
import { GetLeaveDataById } from "../../ReactQuery/CustomHooks/LeavePlanner";
import { Box, Modal } from "@mui/material";
import {
  Heading,
  MainContainer,
} from "../../TimeTracker/CalendarView/CalenderStyled";
import CalendarModalComponent from "../../TimeTracker/CalendarView/CalendarModal";
import CloseIcon from "@mui/icons-material/Close";
import { FullCalender } from "../../FullCalender/FullCalender";

export const UserLeave = (props) => {
  const { userId } = props;
  const [leavesData, setLeavesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState([]);

  const { data: apiData } = GetLeaveDataById(userId, "my_leave");
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
      status:events.event.extendedProps.status,
    });
  }

  useEffect(() => {
    if (apiData) {
      const allLeaves = apiData?.data?.data?.map((e) => {
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
            status:e.status,
          },
        };
      });

      setLeavesData(allLeaves);
    }
  }, [apiData]);
  return (
    <>
      <FullCalender events={leavesData} eventClick={visibleModal} />
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{ width: "100%" }}
      >
        <MainContainer>
          <Box sx={{ float: "right", display: "block" }}>
            <CloseIcon onClick={() => setShowModal(false)} />
          </Box>
          <Heading id="modal-modal-title" variant="h4" component="h2">
            Leaves Data
          </Heading>
          <CalendarModalComponent eventVal={event} admin={true} setShowModal={setShowModal} />
        </MainContainer>
      </Modal>
    </>
  );
};
