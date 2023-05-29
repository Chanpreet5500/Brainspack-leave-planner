import React, { useState } from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { GetDashboardData, GetLeaveDataById } from "../ReactQuery/CustomHooks/LeavePlanner";
import { useNavigate } from "react-router-dom";
import  NavbarComponent  from '../Navbar/Navbar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function DashboardComponent() {

  const loggedInUserData = localStorage.getItem("value");
  const userFinalData = JSON.parse(loggedInUserData);
  console.log(userFinalData, 'from dashboard component')
  const userId = userFinalData._id;

  const navigate = useNavigate();

  const dashboardParent = {
    backgroundColor: "#26b78a1c",
    height: "auto",
    width: "95%",
    height : '550px',
    margin: "20px 0 0 31px",
    borderRadius: "7px",
  };

  const dashboardCardParent = {
    display: "flex",
    justifyContent: "space-around",
  };

  const dashboardCard = {
    height: "200px",
    width: "40%",
    borderRadius: "7px",
    background:
      "linear-gradient(to right bottom, rgb(81 155 99), rgb(0 0 0 / 95%))",
    margin: "30px 0 0 0",
  };

  const userData = GetDashboardData(userId);

  const { data, isError } = userData;

  const networkStatus = data?.status

  const userDataMapping = data?.data?.data;

  const totalLeaveAvailable = userDataMapping?.leaveAvailable;
  const totalLeaveTaken = userDataMapping?.leaveTaken;

  const sendUserIdForLeaveData = GetLeaveDataById(userId)

  const leaveDates = sendUserIdForLeaveData?.data?.data?.data?.map(e => e.leaveDates)
  const leaveType = sendUserIdForLeaveData?.data?.data?.data?.map(e => e.leaveType)

  return (
    <>
    
    {/* <NavbarComponent userData = {userFinalData}/> */}

      <Grid >
        <Grid sx={dashboardParent}>
        
          <Grid>
            <Typography variant="h5" style={{fontSize: '4rem', padding: '20px 0 20px 30px'}}>Leaves Information :- </Typography>
          </Grid>
          <Grid sx={dashboardCardParent}>
            <Grid sx={dashboardCard}>
              <Typography
                variant="h5"
                style={{
                  margin: "30px 0 0 25px",
                  color: "white",
                  fontSize: "60px",
                }}
              >
                {totalLeaveAvailable}
              </Typography>

              <Typography
                variant="h5"
                style={{
                  color: "white",
                  margin: "5px 0 0 25px",
                  fontSize: "25px",
                }}
              >
                Leave Available
              </Typography>
            </Grid>

            <Grid sx={dashboardCard}>
              <Typography
                variant="h5"
                style={{
                  margin: "30px 0 0 20px",
                  color: "white",
                  fontSize: "60px",
                }}
              >
                {totalLeaveTaken}
              </Typography>

              <Typography
                variant="h5"
                style={{
                  color: "white",
                  margin: "5px 0 0 25px",
                  fontSize: "25px",
                }}
              >
                Leave Taken
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardComponent;
