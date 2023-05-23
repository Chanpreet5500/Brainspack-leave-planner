import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { CustomTableCell, CustomTableHead } from "../styled";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, Snackbar, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import {
  EditUserData,
  UpdateUserData,
} from "../../ReactQuery/CustomHooks/TimeTracker";
import { ButtonContainer, ButtonWrapper } from "./EditStyled";

const EditTask = () => {
  const [projectTitle, setProjectTitle] = useState({});
  const id = useLocation((state) => state);
  const userId = id.state.eventId;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleChange = (e,field) => {
    setProjectTitle({ ...projectTitle, [field]: e.target.value });
  };

  const { data} = EditUserData(userId);
  const apiData = data?.data?.data;
  if (apiData) {
    const {
      date,
      hours,
      projectName,
      status,
      taskDescription,
      taskName,
      userId,
    } = apiData[0];
  }

  useEffect(() => {
    if (apiData) {
      setProjectTitle({
        projectName: apiData[0].projectName,
        date: apiData[0].date,
        taskName: apiData[0].taskName,
        taskDescription: apiData[0].taskDescription,
        status: apiData[0].status,
        hours: apiData[0].hours,
        _id: apiData[0]._id,
      });
    }
  }, [data]);

  const { mutate, isError } = UpdateUserData();
  const saveData = () => {
    mutate(projectTitle);
    if (!isError) {
      setOpen(true);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={
          isError ? "User Data Not Updated" : "User Data Updated Successfully"
        }
        ContentProps={{
          sx: { backgroundColor: isError ? "red" : "green" },
        }}
        action={
          <>
          <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton></>
        }
      ></Snackbar>
      <TableContainer
        component={Paper}
        sx={{
          padding: "10px",
        }}
      >
        <Table sx={{ minWidth: 650, flex: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CustomTableHead>S.No</CustomTableHead>
              <CustomTableHead>Project Name</CustomTableHead>
              <CustomTableHead>Date</CustomTableHead>
              <CustomTableHead>Task Name</CustomTableHead>
              <CustomTableHead>Task Description</CustomTableHead>
              <CustomTableHead>Hours</CustomTableHead>
              <CustomTableHead>Status</CustomTableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <CustomTableCell component="th" scope="row">
                {1}
              </CustomTableCell>
              <CustomTableCell>
                <Input
                  value={projectTitle.projectName}
                  onChange={(e) => handleChange(e, "projectName")}
                  disableUnderline={true}
                  placeholder="Enter project name"
                />
              </CustomTableCell>
              <CustomTableCell>
                <Input
                  value={projectTitle.date}
                  onChange={(e) => handleChange(e, "date")}
                  disableUnderline={true}
                  placeholder="Enter project name"
                />
              </CustomTableCell>
              <CustomTableCell>
                <Input
                  value={projectTitle.taskName} // row,taskName
                  onChange={(e) => handleChange(e, "taskName")}
                  disableUnderline={true}
                  placeholder="Enter project name"
                />
              </CustomTableCell>
              <CustomTableCell>
                <Input
                  value={projectTitle.taskDescription}
                  onChange={(e) => handleChange(e, "taskDescription")}
                  disableUnderline={true}
                  placeholder="Enter project name"
                />
              </CustomTableCell>
              <CustomTableCell>
                <Input
                  value={projectTitle.hours}
                  onChange={(e) => handleChange(e, "hours")}
                  disableUnderline={true}
                  placeholder="Enter project name"
                />
              </CustomTableCell>
              <CustomTableCell>
                <Input
                  value={projectTitle.status == true ? "Approved" : "Pending"}
                  onChange={(e) => handleChange(e, "status")}
                  disableUnderline={true}
                  disabled
                />
              </CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonWrapper>
        <ButtonContainer onClick={() => saveData()}>
          Update Task
        </ButtonContainer>
      </ButtonWrapper>
    </>
  );
};

export default EditTask;
