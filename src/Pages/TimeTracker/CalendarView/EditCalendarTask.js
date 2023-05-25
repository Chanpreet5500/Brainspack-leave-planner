import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { CustomTableCell, CustomTableHead } from "../styled";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, Snackbar, IconButton, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  GetDataById,
  UpdateUserData,
} from "../../ReactQuery/CustomHooks/TimeTracker";
import {
  ButtonContainer,
  ButtonWrapper,
  ErrorText,
  PickDate,
} from "../AddTask/EditStyled";
import { Formik } from "formik";
import validationSchema from "../formvalidation/validationSchema";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import axios from "axios";
import { useMutation } from "react-query";


const axiosInstance=axios.create();

let initialValues = {
  date: "",
  hours: "",
  projectName: "",
  status: "",
  taskDescription: "",
  taskName: "",
  userId: "",
};

const EditCalendarTask = () => {
  const id = useLocation((state) => state);
  const _id = id.state.eventId;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data } = GetDataById(_id);
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
    initialValues = {
      date: date,
      hours: hours,
      projectName: projectName,
      status: status,
      taskDescription: taskDescription,
      taskName: taskName,
      userId: userId,
      _id: _id,
    };
  }

  // const { mutate, isError } = UpdateUserData();

  // const saveData = (data) => {
  //   mutate(data);
  //   if (!isError) {
  //     setTimeout(() => {
  //       navigate(-1);
  //     }, 2000);
  //   }
  //   setOpen(true);
  // };
  const UpdateTask = useMutation(_id, (data) => {
    axiosInstance.patch(`http://localhost:5233/update/${_id}`, data);
    if (!UpdateTask.isError) {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
    setOpen(true);
  });
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
          UpdateTask.isError ? "User Data Not Updated" : "User Data Updated Successfully"
        }
        ContentProps={{
          sx: { backgroundColor: UpdateTask.isError ? "#F20000" : "#4BB543" },
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
            </IconButton>
          </>
        }
      ></Snackbar>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data)=>UpdateTask.mutate(data)}
      >
        {(props) => {
          return (
            <>
              <TableContainer
                component={Paper}
                sx={{
                  padding: "10px",
                }}
              >
                <Table
                  sx={{ minWidth: 650, flex: 1 }}
                  aria-label="simple table"
                >
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
                          name={"projectName"}
                          value={props.values.projectName}
                          onChange={props.handleChange}
                          disableUnderline={true}
                          onBlur={props.handleBlur}
                          placeholder="Enter project name"
                        />
                        {props.errors.projectName &&
                        props.touched.projectName ? (
                          <ErrorText>{props.errors.projectName}</ErrorText>
                        ) : null}
                      </CustomTableCell>
                      <CustomTableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <PickDate
                            value={moment(props.values.date)}
                            onChange={(value) =>
                              props.setFieldValue("date", value.$d)
                            }
                            renderInput={(props) => (
                              <TextField
                                {...props}
                                size="small"
                                varient={"standard"}
                                helperText={null}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </CustomTableCell>
                      <CustomTableCell>
                        <Input
                          name={"taskName"}
                          value={props.values.taskName}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          disableUnderline={true}
                          placeholder="Enter project name"
                        />
                        {props.errors.taskName && props.touched.taskName ? (
                          <ErrorText>{props.errors.taskName}</ErrorText>
                        ) : null}
                      </CustomTableCell>
                      <CustomTableCell>
                        <Input
                          name={"taskDescription"}
                          value={props.values.taskDescription}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          disableUnderline={true}
                          placeholder="Enter project name"
                        />
                        {props.errors.taskDescription &&
                        props.touched.taskDescription ? (
                          <ErrorText>{props.errors.taskDescription}</ErrorText>
                        ) : null}
                      </CustomTableCell>
                      <CustomTableCell>
                        <Input
                          name={"hours"}
                          value={props.values.hours}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          disableUnderline={true}
                          placeholder="Enter project name"
                        />
                        {props.errors.hours && props.touched.hours ? (
                          <ErrorText>{props.errors.hours}</ErrorText>
                        ) : null}
                      </CustomTableCell>
                      <CustomTableCell>
                        <Input
                          name={"status"}
                          value={
                            props.values.status === true ? "Approved" : "Pending"
                          }
                          onChange={props.handleChange}
                          disableUnderline={true}
                          disabled
                        />
                        {props.errors.status && props.touched.status ? (
                          <ErrorText>{props.errors.status}</ErrorText>
                        ) : null}
                      </CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <ButtonWrapper>
                <ButtonContainer type="submit" onClick={props.handleSubmit}>
                  Update Task
                </ButtonContainer>
              </ButtonWrapper>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default EditCalendarTask;