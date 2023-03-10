import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  GetLeaveDataById,
  DeleteUserEventById,
} from "../ReactQuery/CustomHooks/LeavePlanner";
import {
  Grid,
  FormControlLabel,
  Typography,
  Radio,
  RadioGroup,
} from "@mui/material";
import CalendarModalComponent from "./CalendarModal";
import ToastContainer from "../../Toast/Toast";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function CalendarComponent() {
  const [showModal, setShowModal] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [event, setEvent] = useState([]);
  const [leavesData, setLeavesData] = useState([]);
  const loggedInUserData = localStorage.getItem("value");
  const [leaveType, setLeaveType] = useState("my_leave");
  const userFinalData = JSON.parse(loggedInUserData);
  let allLeaves = [];
  const userId = userFinalData._id;

  const {
    data: apiData,
    refetch,
    isSuccess,
    isError,
  } = GetLeaveDataById(userId, leaveType);

  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    if (apiData) {
      const allLeaves = apiData?.data?.data?.map((e, i) => {
        return {
          start: e.leaveDates,
          title: e.leaveType,
          allDay: true,
          display: e.description,
          constraint: e.userId?.firstName,
          id: e._id,
        };
      });
      setResultMessage(apiData?.data?.message);
      setOpenToast(true);
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
      eventId: events.event.id,
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

  const deleteUserById = (id) => {
    const x = mutate(id);
  };

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
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogTitle>
            <Typography variant="h5" sx={modalTitle}>
              Leave Title
            </Typography>
          </DialogTitle>
          <DialogContent sx={eventModal}>
            <DialogContentText>
              <CalendarModalComponent
                eventVal={event}
                deleteId={deleteUserById}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </>
    </>
  );
}

export default CalendarComponent;
