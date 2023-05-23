import React from "react";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import { CustomDeleteButton, CustomEditButton } from "../styled";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { ButtonContainer, ButtonWrapper, Text } from "./CalenderStyled";

function CalendarModalComponent(props) {
  const navigate = useNavigate();
  const { eventVal, setShowModal,setConfirmDelete,handleDelete } = props;
  const { title, start, description, name, hours, eventId, display, end } =
    eventVal;
  const formattedDate = format(new Date(start), "yyyy-dd-MM");

  const handleEdit = () => {
    navigate("/edituserdata", { state: { eventId } });
  };

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
        <CustomDeleteButton onClick={() => handleDelete(eventId)}>
          <DeleteIcon />{" "}
          <ButtonWrapper
            component="span"
          >
            Delete
          </ButtonWrapper>
        </CustomDeleteButton>
      </ButtonContainer>
    </>
  );
}

export default CalendarModalComponent;
