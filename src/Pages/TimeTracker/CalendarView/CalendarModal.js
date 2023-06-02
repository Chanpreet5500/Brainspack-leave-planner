import React from "react";
import { format, getDay } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import { CustomDeleteButton, CustomEditButton } from "../styled";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { ButtonContainer, ButtonWrapper, Text } from "./CalenderStyled";

function CalendarModalComponent(props) {
  const navigate = useNavigate();
  const { eventVal, setShowModal, handleDelete, admin } = props;
  const {
    title,
    start,
    description,
    hours,
    eventId,
    type,
    firstName,
    lastName,
  } = eventVal;
  const formattedDate = format(new Date(start), "yyyy-dd-MM");

  const handleEdit = () => {
    navigate("/edituserdata", { state: { eventId } });
  };

  return (
    <>
      {!admin ? (
        getDay(start) == 0 || getDay(start) == 6 ? (
          <>
            {" "}
            <Text>Title :- {title}</Text>
            <ButtonContainer sx={{ justifyContent: "center" }}>
              <CustomEditButton onClick={() => setShowModal(false)}>
                <ButtonWrapper component="span">Cancel</ButtonWrapper>
              </CustomEditButton>
            </ButtonContainer>
          </>
        ) : (
          <>
            {" "}
            <Text variant="h5">Title :- {title}</Text>
            <Text variant="h5">Date :- {formattedDate}</Text>
            <Text variant="h5">Description :- {description}</Text>
            <Text variant="h5">Hours :- {hours}</Text>
            <ButtonContainer>
              <CustomEditButton onClick={() => handleEdit()}>
                <EditIcon
                  sx={{
                    fontSize: "24px",
                  }}
                />
                <ButtonWrapper component="span">Edit</ButtonWrapper>
              </CustomEditButton>
              <CustomDeleteButton onClick={() => handleDelete(eventId)}>
                <DeleteIcon />{" "}
                <ButtonWrapper component="span">Delete</ButtonWrapper>
              </CustomDeleteButton>
            </ButtonContainer>
          </>
        )
      ) : (
        <>
          <Text variant="h5">Name :- {firstName + " " + lastName}</Text>
          <Text variant="h5">Date :- {formattedDate}</Text>
          <Text variant="h5">Leave Type :- {type}</Text>
        </>
      )}
    </>
  );
}

export default CalendarModalComponent;
