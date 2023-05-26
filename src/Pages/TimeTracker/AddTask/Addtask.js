import * as React from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { CustomTableCell, CustomTableHead, PickDate, Input } from "../styled";
import { ErrorText } from "./EditStyled";
import { Box, Button } from "@mui/material";
import { useMutation } from "react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { ValidationSchema } from "./ValidationSchema";
import { Snackbar, IconButton } from "@mui/material";
import * as Yup from "yup";

const loggedInUser = localStorage.getItem("value");
const finalData = JSON.parse(loggedInUser);
const userId = finalData._id;

const Addtask = () => {
  const [newRow, setRow] = useState([]);
  const [open, setOpen] = useState(false);

  const addProjectData = useMutation(userId, (values) => {
    return axios.post(`http://localhost:5233/sendData/${userId}`, values);
  });

  const handleSubmit = (values) => {
    values.row.map((e) => {
      e.userId = userId;
    });
    addProjectData.mutate(values.row);
    setOpen(true);
  };

  const addRowOnClick = (props) => {
    const data = {
      userId: userId,
      projectName: "",
      date: "",
      taskName: "",
      taskDescription: "",
      status: false,
      hours: "00:00",
    };
    props.push(data);
    setRow([...newRow, data]);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const validateFunction = (value) => {
    let error;
    if (value === "") {
      error = "Field Required";
    }
    return error;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={
          addProjectData.isError
            ? "Failed adding data"
            : "Data added successfully"
        }
        ContentProps={{
          sx: {
            backgroundColor: addProjectData.isError ? "#F20000" : "#4BB543",
          },
        }}
        action={
          <>
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </>
        }
      />
      <Formik
        initialValues={[
          {
            userId: userId,
            projectName: "",
            date: "",
            taskName: "",
            taskDescription: "",
            status: false,
            hours: "00:00",
          },
        ]}
        // validationSchema={ValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(props) => {
          setRow(props.values);
          return (
            <form onSubmit={props.handleSubmit}>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <FieldArray>
                      <>
                        {newRow.map((row, index) => {
                          return (
                            <>
                              <TableRow>
                                <CustomTableCell>
                                  {index + 1 + "."}
                                </CustomTableCell>
                                <CustomTableCell>
                                  <Field
                                    as={Input}
                                    name={`row.${index}.projectName`}
                                    placeholder="Enter Project Name"
                                    validate={validateFunction}
                                  />
                                  <Box>
                                    {props.touched && props.errors ? (
                                      <ErrorMessage
                                        name={`row.${index}.projectName`}
                                      />
                                    ) : null}
                                  </Box>
                                </CustomTableCell>
                                <CustomTableCell>
                                  <Field
                                    as={PickDate}
                                    value={props.values.date}
                                    onChange={(value) =>
                                      props.setFieldValue(
                                        `row.${index}.date`,
                                        value.$d
                                      )
                                    }
                                    validate={validateFunction}
                                  />
                                  <Box>
                                    {props.touched ? (
                                      <ErrorMessage
                                        name={`row.${index}.date`}
                                      />
                                    ) : null}
                                  </Box>
                                </CustomTableCell>
                                <CustomTableCell>
                                  <Field
                                    as={Input}
                                    name={`row.${index}.taskName`}
                                    placeholder="Enter Task Name"
                                    validate={validateFunction}
                                  />
                                  <Box>
                                    {props.touched ? (
                                      <ErrorMessage
                                        name={`row.${index}.taskName`}
                                      />
                                    ) : null}
                                  </Box>
                                </CustomTableCell>
                                <CustomTableCell>
                                  <Field
                                    as={Input}
                                    name={`row.${index}.taskDescription`}
                                    placeholder="Enter Task Description"
                                    validate={validateFunction}
                                  />
                                  <Box>
                                    {props.touched ? (
                                      <ErrorMessage
                                        name={`row.${index}.taskDescription`}
                                      />
                                    ) : null}
                                  </Box>
                                </CustomTableCell>
                                <CustomTableCell>
                                  <Field
                                    as={Input}
                                    name={`row.${index}.hours`}
                                    placeholder="Enter Hours"
                                    validate={validateFunction}
                                  />
                                  <Box>
                                    {props.touched ? (
                                      <ErrorMessage
                                        name={`row.${index}.hours`}
                                      />
                                    ) : null}
                                  </Box>
                                </CustomTableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </>
                    </FieldArray>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => addRowOnClick(props.values)}
                  sx={{
                    background: "#55AD88",
                    marginTop: "15px",
                    color: "#fff",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    "&:hover": {
                      background: "#4d9b78",
                    },
                  }}
                >
                  Add Row <AddIcon />{" "}
                </Button>
                <Button
                  sx={{
                    background: "#355edb",
                    marginTop: "15px",
                    color: "#fff",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    padding: "5px 25px",
                    "&:hover": {
                      background: "#3547bd",
                    },
                  }}
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </LocalizationProvider>
  );
};

export default Addtask;
