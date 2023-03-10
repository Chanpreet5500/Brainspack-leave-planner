import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

function ToastContainer({ message , open=false, closeToast }) {
  
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} style={{backgroundColor : 'yellow', paddingTop:'8px'}}>
        <Alert severity="success" style={{paddingTop : "8px", fontSize : '16px'}} >
          {`${message}`} <CloseIcon style={{position : 'absolute'}} onClick={() => closeToast()} />
        </Alert>
      </Snackbar>
    </>
  );
}

export default ToastContainer;
