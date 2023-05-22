import React, { useState } from "react";
import { Paper, Typography, Input, Button, Box, Modal } from "@mui/material";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { CustomDeleteButton, CustomEditButton } from "../styled";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteUserData } from "../../ReactQuery/CustomHooks/TimeTracker";
import { ButtonContainer, ButtonWrapper, Text } from "./CalenderStyled";

function CalendarModalComponent(props) {
  const navigate = useNavigate();
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const { eventVal, setShowModal,setConfirmDelete,handleDelete } = props;
  const { title, start, description, name, hours, eventId, display, end } =
    eventVal;
  console.log(eventVal);
  const formattedDate = format(new Date(start), "yyyy-dd-MM");

  const handleEdit = () => {
    navigate("/edituserdata", { state: { eventId } });
  };
  // const { mutate } = DeleteUserData();
  // const handleDelete = () => {
  //   // mutate(eventId);
  //   // setShowModal(false);
  //   // setConfirmDelete(true)
  // };
  return (
    <>
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
        <CustomDeleteButton onClick={() => handleDelete()}>
          <DeleteIcon />{" "}
          <ButtonWrapper
            component="span"
          >
            Delete
          </ButtonWrapper>
        </CustomDeleteButton>
      </ButtonContainer>
      {/* <Modal
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          sx={{ width: "100%" }}  
        >
         {'dhfjkshdfjh'}
        </Modal> */}
    </>
  );
}

export default CalendarModalComponent;
