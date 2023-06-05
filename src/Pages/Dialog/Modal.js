import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import "./Modal.css";
import { Box, Button, Typography } from "@mui/material";

function Modal({ setOpenModal, title, message, submit }) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "70vh",
        backdropFilter: "blur(5px)",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 11,
      }}
    >
      <Box
        sx={{
          width: "20%",
          height: "30%",
          borderRadius: "12px",
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          display: "flex",
          flexDirection: "column",
          padding: "25px",
          zIndex: "11",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          
        <Box
          sx={{
            display: "inline-block",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          <Typography variant="h5">{title}</Typography>
        </Box>
        <Button
            sx={{ color: "black", fontSize: "25px", cursor: "pointer" }}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <ClearIcon />
          </Button>
        </Box>
        <Box
          sx={{
            flex: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.7rem",
            textAalign: "center",
          }}
        >
          <Box variant="p">{message}</Box>
        </Box>
        <Box
          sx={{
            flex: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
            sx={{
              margin: "10px",
              border: "none",
              backgroundColor: "cornflowerblue",
              color: "white",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              margin: "10px",
              border: "none",
              backgroundColor: "crimson",
              color: "white",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={submit}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Modal;
