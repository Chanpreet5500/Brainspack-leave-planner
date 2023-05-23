import * as React from "react";
import { useState, useEffect } from "react";
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
  EditUserData,
  UpdateUserData,
} from "../../ReactQuery/CustomHooks/TimeTracker";
import { ButtonContainer, ButtonWrapper, ErrorText } from "./EditStyled";
import { Formik } from "formik";
import validationSchema from "../formvalidation/validationSchema";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

let initialValues = {
  date: "",
  hours: "",
  projectName: "",
  status: "",
  taskDescription: "",
  taskName: "",
  userId: "",
};

const EditTask = () => {
  const [projectTitle, setProjectTitle] = useState({});

  const id = useLocation((state) => state);
  const _id = id.state.eventId;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleChange = (e, field) => {
    setProjectTitle({ ...projectTitle, [field]: e.target.value });
  };

  const { data } = EditUserData(_id);
  // console.log(userId, "_id");
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
    // console.log(date, hours, projectName, status, taskDescription, taskName);

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

    // setUserInitialValues(initialValues);
  }
  // const { submitForm } = useFormikContext();
  // console.log(useFormikContext(),'submit Form')

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
  const saveData = (data) => {
    console.log(data.date);
    mutate(data);
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
            </IconButton>
          </>
        }
      ></Snackbar>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          // console.log(data, "data of Formik");
          saveData(data);
        }}
      >
        {(props) => {
          // console.log(props, "propes of Formik");
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
                          placeholder="Enter project name"
                        />
                        {props.errors.projectName &&
                        props.touched.projectName ? (
                          <ErrorText>{props.errors.projectName}</ErrorText>
                        ) : null}
                      </CustomTableCell>
                      <CustomTableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={props.values.date}
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
                            props.values.status == true ? "Approved" : "Pending"
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
                <ButtonContainer
                  type="submit"
                  onClick={props.handleSubmit}
                >
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

export default EditTask;
