import React from "react";
import {  Typography } from "@mui/material";
import { format } from "date-fns";
import { ButtonContainer, CancelButton } from "./CalenderStyled";
import { UpdateLeaveStatus } from "../ReactQuery/CustomHooks/LeavePlanner";

function CalendarModalComponent(props) {
  const { eventVal, setShowModal, Id } = props;
  const { title, start, description, name, eventId, status, id, userId } =
    eventVal;
  const formattedDate = format(new Date(start), "yyyy-dd-MM");

  const leaveDate = `${start.getDate()}/${
    start.getMonth() + 1
  }/${start.getFullYear()}`;
  const date = new Date();
  const presentDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const modalValues = {
    fontSize: "28px",
  };

  const { mutate } = UpdateLeaveStatus();

  const cancelLeave = () => {
    mutate({ _id: id, status: 3 });
    setShowModal(false);
  };

  return (
    <>
      <Typography sx={modalValues}>Name :- {title}</Typography>
      <Typography sx={modalValues}>Date :-{formattedDate}</Typography>
      <Typography sx={modalValues}>Description :- {description}</Typography>
      {leaveDate != presentDate && status == 0 && Id == userId ? (
        <ButtonContainer onClick={() => cancelLeave()}>
          <CancelButton>Cancel Leave</CancelButton>
        </ButtonContainer>
      ) : (
        <Typography sx={modalValues}>
          Status :-{" "}
          {status != 3 ? (status == 1 ? "Approved" : "Rejected") : "Cancel"}
        </Typography>
      )}
    </>
  );
}

export default CalendarModalComponent;
