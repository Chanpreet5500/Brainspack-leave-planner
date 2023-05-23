import React from "react";
import "./Modal.css";

function Modal({ setOpenModal, title, message, submit }) {
  console.log(submit, 'submit from modal')
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
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
          <button onClick={submit}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
