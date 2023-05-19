import React from "react";
import { Paper, Typography, Input, Button } from "@mui/material";
import { Formik } from "formik";
import { format } from "date-fns";
import {EditOutlined} from "@mui/icons-material"
// import {DeleteUserEventById} from '../ReactQuery/CustomHooks/LeavePlanner'

function CalendarViewModal(props) {
  console.log(props, "PROS");

  const { eventVal, deleteId } = props;
  const { title, start,end, description, name, eventId, status ,startStr} = eventVal;
   const formattedDate = format(new Date(start), "yyyy-dd-MM");
console.log(startStr,'hours')
  const modalValues = {
    fontSize: "28px",
  };

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
              Hours : {end}
              </Typography>
            <Button><EditOutlined></EditOutlined></Button>
                </>
          );
        }}
      </Formik>
    </>
  );
}

export default CalendarViewModal;
