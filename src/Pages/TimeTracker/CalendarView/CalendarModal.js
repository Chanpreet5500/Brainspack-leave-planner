import React, { useState } from "react";
import { Paper, Typography, Input, Button, Box, Modal } from "@mui/material";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { CustomDeleteButton, CustomEditButton } from "../styled";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteUserData } from "../../ReactQuery/CustomHooks/TimeTracker";


function CalendarModalComponent(props) {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { eventVal, setShowModal} = props;
  const { title, start, description, name, hours, eventId, display, end } =
    eventVal;
  console.log(eventVal);
  const formattedDate = format(new Date(start), "yyyy-dd-MM");

  const modalValues = {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "28px",
    textAlign: "left",
  };

  const handleEdit = () => {
    console.log("hello edit");
    navigate("/edituserdata", { state: { eventId } });
    navigate(-1)
    // setShowModal(false);
  };
  const { mutate } = DeleteUserData();
  const handleDelete = () => {
    // mutate(eventId);
    setShowModal(false);
    // setConfirmDelete(true)
  };
  return (
    <>
    
      <Typography variant="h5" sx={{ ...modalValues }}>
        Title :- {title}
      </Typography>
      <Typography variant="h5" sx={modalValues}>
        Date :- {formattedDate}
      </Typography>
      <Typography variant="h5" sx={modalValues}>
        Description :- {description}
      </Typography>
      <Typography variant="h5" sx={modalValues}>
        Hours :- {hours}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "20px",
        }}
      >
        <CustomEditButton onClick={() => handleEdit()}>
          <EditIcon
            sx={{
              fontSize: "24px",
            }}
          />
          <Box
            sx={{
              paddingLeft: "5px",
              paddingRight: "15px",
              fontFamily: "sans-serif",
            }}
            component="span"
          >
            Edit
          </Box>
        </CustomEditButton>
        <CustomDeleteButton onClick={() => handleDelete()}>
          <DeleteIcon />{" "}
          <Box
            sx={{ paddingLeft: "5px", fontFamily: "sans-serif" }}
            component="span"
          >
            Delete
          </Box>
        </CustomDeleteButton>
      </Box>
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
