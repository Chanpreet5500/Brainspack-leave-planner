import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationModal({
  openModal,
  setOpenModal,
  title,
  submit,
  handleClose,
}) {
  console.log(openModal, setOpenModal, title, submit);
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            component="h2"
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "15px",
              fontSize: "23px",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                textTransform: "capitalize",
                fontSize: "18px"
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "#da3111",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#ba351a",
                },
                fontSize: "18px"
              }}
              onClick={submit}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
