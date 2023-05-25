import React from "react";
<<<<<<< HEAD
import { Paper, Typography, Input, Button } from "@mui/material";
import { Formik } from "formik";
import { format } from "date-fns";
// import {DeleteUserEventById} from '../ReactQuery/CustomHooks/LeavePlanner'

function CalendarModalComponent(props) {
  console.log(props, "PROS")

  const { eventVal, deleteId } = props;
  const { title, start, description, name, eventId } = eventVal;
  const formattedDate = format(new Date(start), "yyyy-dd-MM");

  const modalValues = {
      fontSize : '28px'
  };

  // const x = DeleteUserEventById()
  // console.log(x , "X")

  // const { mutate } = x
  
  // const deleteEvent = (eventId) => {
    
  //   mutate(eventId)
  // }

  return (
    <>
      <Formik
        initialValues={{
          eventVal: "",
        }}
      >
        {(props) => {
          return (
            <>
              <Typography variant="h5" sx={modalValues}>
                Title :- {title}
              </Typography>
              <Typography variant="h5" sx={modalValues}>
                Date :-{formattedDate}
              </Typography>
              <Typography variant="h5" sx={modalValues}>
                Description :- {description}
              </Typography>
              <Typography variant="h5" sx={modalValues}>
                Name :-{name}
              </Typography>
              <Button onClick={() => deleteId(eventId)}>
                Delete
              </Button>
            </>
          );
        }}
      </Formik>
=======
import { format, getDay } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import { CustomDeleteButton, CustomEditButton } from "../styled";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { ButtonContainer, ButtonWrapper, Text } from "./CalenderStyled";

function CalendarModalComponent(props) {
  const navigate = useNavigate();
  const { eventVal, setShowModal, setConfirmDelete, handleDelete } = props;
  const { title, start, description, name, hours, eventId, display, end } =
    eventVal;

  const formattedDate = format(new Date(start), "yyyy-dd-MM");

  const handleEdit = () => {
    navigate("/edituserdata", { state: { eventId } });
  };

  return (
    <>
      {getDay(start) == 0 || getDay(start) == 6 ? (
        <>
          {" "}
          <Text>Title :- {title}</Text>
          <ButtonContainer sx={{justifyContent:"center"}}>
          <CustomEditButton  onClick={() => setShowModal(false)}>
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
      )}
>>>>>>> origin/gourav-frontend
    </>
  );
}

export default CalendarModalComponent;
