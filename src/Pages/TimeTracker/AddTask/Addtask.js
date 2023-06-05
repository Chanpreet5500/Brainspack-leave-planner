import * as React from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Box,
  Button,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { CustomTableCell, CustomTableHead, PickDate, Input } from "../styled";
import { ErrorText, RemoveRowButton } from "./EditStyled";
import { useMutation } from "react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { ValidationSchema } from "./ValidationSchema";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { CircularBar } from "../CalendarView/CalenderStyled";

const Addtask = ({ setValue }) => {
  const [open, setOpen] = useState(false);

  const loggedInUser = localStorage.getItem("value");
  const finalData = JSON.parse(loggedInUser);
  const userId = finalData?._id;

  const initialValues = {
    userId: userId,
    projectName: "",
    date: "",
    taskName: "",
    taskDescription: "",
    status: false,
    hours: "",
  };

  const addProjectData = useMutation(userId, (values) => {
    return axios.post(
      `http://localhost:5233/setTimeTrackerData/${userId}`,
      values
    );
  });

  const handleSubmit = (values) => {
    addProjectData.mutate(values.tasks);

    if (!addProjectData.isError) {
      setTimeout(() => {
        setValue("listView");
      }, 1000);
    }
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
        initialValues={{
          tasks: [initialValues],
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(props) => {
          return (
            <Form>
              <FieldArray name="tasks">
                {(arrayForm) => {
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
                              <CustomTableHead>
                                Task Description
                              </CustomTableHead>
                              <CustomTableHead>Hours</CustomTableHead>
                              <CustomTableHead>Action</CustomTableHead>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <>
                              {props.values.tasks.map((row, index) => {
                                return (
                                  <>
                                    <TableRow key={index}>
                                      <CustomTableCell>
                                        {index + 1 + "."}
                                      </CustomTableCell>
                                      <CustomTableCell>
                                        <Field
                                          as={Input}
                                          name={`tasks.${index}.projectName`}
                                          placeholder="Enter Project Name"
                                        />
                                        <Box>
                                          {props.errors && props.touched ? (
                                            <ErrorMessage
                                              component={ErrorText}
                                              name={`tasks.${index}.projectName`}
                                            />
                                          ) : null}
                                        </Box>
                                      </CustomTableCell>
                                      <CustomTableCell>
                                        <Field
                                          as={PickDate}
                                          value={props.values.date}
                                          name={`tasks.${index}.date`}
                                          onChange={(value) =>
                                            props.setFieldValue(
                                              `tasks.${index}.date`,
                                              value.$d
                                            )
                                          }
                                        />
                                        <Box>
                                          <ErrorMessage
                                            name={`tasks.${index}.date`}
                                            component={ErrorText}
                                          />
                                        </Box>
                                      </CustomTableCell>
                                      <CustomTableCell>
                                        <Field
                                          as={Input}
                                          name={`tasks.${index}.taskName`}
                                          placeholder="Enter Task Name"
                                        />
                                        <Box>
                                          <ErrorMessage
                                            name={`tasks.${index}.taskName`}
                                            component={ErrorText}
                                          />
                                        </Box>
                                      </CustomTableCell>
                                      <CustomTableCell>
                                        <Field
                                          as={Input}
                                          name={`tasks.${index}.taskDescription`}
                                          placeholder="Enter Task Description"
                                        />
                                        <Box>
                                          <ErrorMessage
                                            name={`tasks.${index}.taskDescription`}
                                            component={ErrorText}
                                          />
                                        </Box>
                                      </CustomTableCell>
                                      <CustomTableCell>
                                        <Field
                                          as={Input}
                                          name={`tasks.${index}.hours`}
                                          placeholder="Enter Hours"
                                        />
                                        <Box>
                                          <ErrorMessage
                                            name={`tasks.${index}.hours`}
                                            component={ErrorText}
                                          />
                                        </Box>
                                      </CustomTableCell>
                                      <CustomTableCell>
                                        <RemoveRowButton
                                          onClick={() =>
                                            arrayForm.remove(index)
                                          }
                                          disabled={
                                            props.values.tasks.length === 1
                                          }
                                        >
                                          <RemoveCircleOutlineOutlinedIcon
                                            sx={{ mr: "8px", color: "#fff" }}
                                          />
                                          <Typography sx={{ color: "#fff" }}>
                                            Remove
                                          </Typography>
                                        </RemoveRowButton>
                                      </CustomTableCell>
                                    </TableRow>
                                  </>
                                );
                              })}
                            </>
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
                          onClick={() => arrayForm.push(initialValues)}
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
                            padding: props.isSubmitting
                              ? "5px 11px"
                              : "5px 25px",
                            opacity: props.isSubmitting ? 0.7 : 1,
                            "&:hover": {
                              background: "#3547bd",
                            },
                          }}
                          type="submit"
                          disabled={props.isSubmitting}
                        >
                          {props.isSubmitting ? (
                            <>
                              <CircularBar
                                sx={{ height: "16px", width: "16px" }}
                              />
                              <Typography
                                sx={{ color: "#fff", marginLeft: "8px" }}
                              >
                                Save
                              </Typography>
                            </>
                          ) : (
                            "Save"
                          )}
                        </Button>
                      </Box>
                    </>
                  );
                }}
              </FieldArray>
            </Form>
          );
        }}
      </Formik>
    </LocalizationProvider>
  );
};

export default Addtask;
