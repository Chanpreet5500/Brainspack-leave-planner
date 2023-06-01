import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField
} from "@mui/material";
import { StatisticsData } from "../ReactQuery/CustomHooks/LeavePlanner";

import NavbarComponent from "../Navbar/Navbar";

function StatisticsComponent() {

  const dashboardParent = {
    backgroundColor: "#26b78a1c",
    height: "auto",
    width: "95%",
    height: "auto",
    margin: "20px 0 0 31px",
    borderRadius: "7px",
  };

  const dashboardCardParent = {
    display: "flex",
    justifyContent: "space-around",
    width : "70%"
  };

  const nameParent = {
      width : '30%',
      margin :'70px auto'
  }

  const dashboardCard = {
    height: "200px",
    width: "40%",
    borderRadius: "7px",
    background:
      "linear-gradient(to right bottom, rgb(81 155 99), rgb(0 0 0 / 95%))",
    margin: "30px 0 0 0",
  };

  const dataParent = {
      display : "flex",
      width : '100%'
  }

  const userData = StatisticsData();

  const { data } = userData;

  const userDataMapping = data?.data?.data;

  const gettingValueFromLocal = localStorage.getItem('value')
  const userParsedData = JSON.parse(gettingValueFromLocal)

  return (
    <>
      {/* <NavbarComponent userData={userParsedData} /> */}

      <Grid sx={dashboardParent}>

        {userDataMapping?.map((e) => {
          return (
            <>
            <Grid sx={dataParent}>
            <Grid sx={nameParent}>
                <Typography variant='h5' style={{fontSize : '60px', paddingLeft : '30px'}}>{e?.firstName}</Typography>
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
                    {e.leaveAvailable}
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
                    {e.leaveTaken}
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
            </>
          );
        })}
      </Grid>
    </>
  );
}

export default StatisticsComponent;
