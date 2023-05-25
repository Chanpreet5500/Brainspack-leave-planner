import React from "react";
import ClearIcon from '@mui/icons-material/Clear';
import "./Modal.css";

function Modal({ setOpenModal, title, message, submit }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <ClearIcon />
          </button>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="body">
          <p>{message}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={submit}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
