import React, { useState } from "react";
import {
  TextField,
  TextareaAutosize,
  MenuItem,
  Grid,
  Select,
  Paper,
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
  Box,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GetDashboardData } from "../ReactQuery/CustomHooks/LeavePlanner";
import NavbarComponent from "../Navbar/Navbar";
import { Formik } from "formik";
import { LeaveValues } from "../ReactQuery/CustomHooks/LeavePlanner";
import { differenceInDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";

function LeaveComponent() {
  const userData = localStorage.getItem("value");
  const id = JSON.parse(userData);
  const finalUserId = id._id;
  console.log(finalUserId);

  const holidayType = ["Sick Leave", "Travel Leave", "Ocassional Leave"];

  const popupFieldsParent = {
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const loginButton = {
    backgroundColor: "#26b78a",
    marginBottom: "20px",
  };

  const dashboardParent = {
    background:
      " linear-gradient(to left top,  rgba(51, 51, 51, 1) 0%,  rgb(0 0 0 / 90%)  ,rgba(85 173 136), rgba(51, 51, 51, 1)   100% )",

    height: "90vh",
    paddingTop: "30px",
    marginTop: "10px",
    display: "grid",
    placeItems: "center",
  };

  const selectLeaveType = {
    width: "80%",
    boxShadow: "none",

    ".MuiOutlinedInput-notchedOutline": {
      border: 0,
      borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
      borderRadius: "0px",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
      borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
    },
    textAlign: "left",
    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ":
      {
        padding: "25px 14px 10px",
      },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      top: "calc(60% - 0.5em)",
    },
  };

  const x = LeaveValues();

  const { mutate } = x;

  const navigate = useNavigate();

  const submitFormValue = (props) => {
    const { startDateValue, endDateValue, leaveType, description } =
      props.values;

    if (
      startDateValue != "" &&
      endDateValue != "" &&
      leaveType != "" &&
      description != ""
    ) {
      const dateValue = differenceInDays(
        new Date(endDateValue.$d),
        new Date(startDateValue.$d)
      );
      let startDateMonthHourValue = startDateValue.$d;
      const finalDateForLeave = [];

      for (let i = 0; i <= dateValue; i++) {
        const a = new Date(startDateMonthHourValue);

        a.setDate(a.getDate() + i);

        const x = a.getDay();

        if (x != 0) {
          let isDate = format(new Date(a), "yyyy-MM-dd");
          finalDateForLeave.push(isDate);
        }
      }
      const data = {
        leaveType: leaveType,
        leaveDates: finalDateForLeave.map((leaves) => leaves),
        description: description,
        userId: finalUserId,
      };

      mutate(data);
      navigate("/calendar");
    }
  };

  return (
    <>
      <Grid sx={dashboardParent}>
        <Paper
          style={{
            height: "430px",
            width: "30%",
          }}
        >
          <Formik
            initialValues={{
              startDateValue: "",
              endDateValue: "",
              leaveType: "",
              description: "",
            }}
            validate={(value) => {
              const errors = {};
              if (!value.startDateValue) {
                errors.startDateValue = "Required";
              } else if (!value.endDateValue) {
                errors.endDateValue = "Required";
              } else if (!value.leaveType) {
                errors.leaveType = "Required";
              } else if (!value.holidayType) {
                errors.holidayType = "Required";
              }
              return errors;
            }}
          >
            {(props) => {
              return (
                <Grid sx={popupFieldsParent}>
                  <Grid
                    style={{
                      width: "70%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Select
                      labelId="leavetypeBox"
                      label="Select leave type"
                      name="leaveType"
                      onChange={props.handleChange}
                      value={props.values.leaveType}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <Box component="span">Select Leave Type</Box>;
                        }

                        return selected;
                      }}
                      displayEmpty
                      sx={selectLeaveType}
                    >
                      <MenuItem disabled value="">
                        Select Leave Type
                      </MenuItem>
                      {holidayType.map((e, index) => (
                        <MenuItem value={e} key={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid
                    sx={{
                      width: "70%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "80%" }}
                        name="startDateValue"
                        label="Start Date"
                        value={props.values.startDateValue}
                        onChange={(value) =>
                          props.setFieldValue("startDateValue", value, "true")
                        }
                        renderInput={(e) => <TextField {...e} />}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid
                    sx={{
                      width: "70%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "80%" }}
                        name="endDateValue"
                        label="End Date"
                        minDate={props.values.startDateValue}
                        value={
                          props.values.startDateValue <=
                          props.values.endDateValue
                            ? props.values.endDateValue
                            : ""
                        }
                        onChange={(value) =>
                          props.setFieldValue("endDateValue", value, "true")
                        }
                        renderInput={(e) => <TextField {...e} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    sx={{
                      width: "70%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TextareaAutosize
                      name="description"
                      placeholder="Description"
                      variant="standard"
                      onChange={props.handleChange}
                      style={{
                        width: "70%",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop:'20px',
                      }}
                    />
                  </Grid>

                  <Button
                    variant="contained"
                    sx={loginButton}
                    onClick={() => submitFormValue(props)}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              );
            }}
          </Formik>
        </Paper>
      </Grid>
    </>
  );
}

export default LeaveComponent;
