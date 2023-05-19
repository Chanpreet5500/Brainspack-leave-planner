import React from "react";
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
    </>
  );
}

export default CalendarModalComponent;
