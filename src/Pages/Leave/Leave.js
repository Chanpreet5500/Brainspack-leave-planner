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
} from "@mui/material";
import { DatePicker, LocalizationProvider,StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GetDashboardData } from "../ReactQuery/CustomHooks/LeavePlanner";
import NavbarComponent from "../Navbar/Navbar";
import { Formik } from "formik";
import { LeaveValues } from '../ReactQuery/CustomHooks/LeavePlanner';
import { differenceInDays, format } from 'date-fns';

function LeaveComponent() {

  const userData = localStorage.getItem('value');
  const id = JSON.parse(userData)
  const finalUserId = id._id
  console.log(finalUserId)

  const holidayType = ["Sick Leave", "Travel Leave", "Ocassional Leave"];

  const popupFieldsParent = {
    display: "flex",
    height: "340px",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems : 'center',
  };

  const loginButton = {
    backgroundColor: "#26b78a",
    margin: "0 84px",
  };

  const dashboardParent = {
    backgroundColor: "#26b78a1c",
    height : '562px',
    paddingTop : '30px',
    marginTop : '10px'
  };

  const x = LeaveValues();

  const { mutate } = x;

  const submitFormValue = (props) => {

    const userValues = props.values ;

    const dateValue = differenceInDays(
      new Date(userValues.endDateValue.$d),
      new Date(userValues.startDateValue.$d)
      )

    let startDateMonthHourValue = userValues.startDateValue.$d

    const startDateValue = userValues.startDateValue.$D
    
    const endDateValue = userValues.endDateValue.$D

    const finalDateForLeave = []
    
    for(let i = 0 ; i <= dateValue ; i++){

      const a = new Date(startDateMonthHourValue)

      a.setDate(a.getDate() + i)

      const x = a.getDay()

      if(x != 0) {

        let isoDate = format(new Date(a), 'yyyy-MM-dd');
        finalDateForLeave.push(isoDate)

      }

    }

    const data = {
      leaveType : userValues?.leaveType,
      leaveDates : finalDateForLeave.map(leaves => leaves),
      description : userValues.description,
      userId : finalUserId
    }

    let x = mutate(data)
    
  }

  const gettingValueFromLocal = localStorage.getItem('value')
  const userParsedData = JSON.parse(gettingValueFromLocal)

  return (
    <>
      {/* <NavbarComponent userData={userParsedData} /> */}

      <Grid sx={dashboardParent}>
        <Paper
          elevation={20}
          style={{ height: "380px", width: "35%", margin: "0 auto", paddingTop : '40px' }}
        >

          <Formik
            initialValues={{
              startDateValue: "",
              endDateValue: "",
              leaveType: "",
              description: "",
            }}
            validate={(value) => {
              console.log(value, "VALIDATE VALUE");
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
                  <Grid style={{width : '60%', alignContent : 'center'}}>
                    <FormControl style={{width : '100%'}}>
                      <InputLabel id="leavetypeBox">
                        Select leave type
                      </InputLabel>
                      <Select
                        name="leaveType"
                        value={props.values.leaveType}
                        labelId="leavetypeBox"
                        label="Select leave type"
                        onChange={props.handleChange}
                      >
                        {holidayType.map((e) => (
                          <MenuItem value={e} key={e}>
                            {e}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
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

                  <Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      {/* <Box style={{ height: "20px" }}></Box> */}

                      <DatePicker
                        name="endDateValue"
                        label="End Date"
                        minDate={props.values.startDateValue}
                        value={(props.values.startDateValue <= props.values.endDateValue ? props.values.endDateValue : '' )}
                        onChange={(value) =>
                          props.setFieldValue("endDateValue", value, "true")
                        }
                        renderInput={(e) => <TextField {...e} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid style={{ height: "67px" }}>
                    <TextareaAutosize
                      name="description"
                      placeholder="Description"
                      variant="standard"
                      onChange={props.handleChange}
                      style={{
                        width: "258px",
                        marginBottom: "20px",
                        height: "21px",
                        padding: "15px 0 13px 13px",
                        fontSize: "15px",
                      }}
                    />
                  </Grid>

                  <Button variant="contained" sx={loginButton} onClick={() => submitFormValue(props)}>
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
