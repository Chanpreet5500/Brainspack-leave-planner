import React, { useState } from "react";
import {
  Grid,
  IconButton,
  Stack,
  Typography,
  Box,
  Drawer,
  ListItemButton,
  ListItem,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import SpeedIcon from "@mui/icons-material/Speed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import BroadcastOnPersonalIcon from "@mui/icons-material/BroadcastOnPersonal";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import EmployeeDetails from "../AdmilLayout/EmployeeDetails";
import ManageEmployees from "../AdmilLayout/ManageEmployees";
import GroupIcon from "@mui/icons-material/Group";
import OutsideAlerter from "./OutsideAlerter";

function NavbarComponent(props) {
  const { values } = props;
  const firstName = values?.firstName;
  const [open, setOpen] = useState(false);

  const [logoutButton, setLogoutButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sidebarMenu = [
    { name: "Calendar", icon: <CalendarMonthIcon />, value: "calendar" },
    { name: "Statistics", icon: <DonutLargeIcon />, value: "statistics" },
    {
      name: "Dashboard",
      icon: <BroadcastOnPersonalIcon />,
      value: "dashboard",
    },
    { name: "Time Tracker", icon: <TimelapseIcon />, value: "timetracker" },
    { name: "Add Leave", icon: <SpeedIcon />, value: "leave" },
  ];

  const adminSidebarMenu = [
    { name: "Employees", icon: <GroupIcon />, value: "manage-employees" },
    { name: "Calendar", icon: <CalendarMonthIcon />, value: "admin-calender" },
  ];

  const navigate = useNavigate();

  const smallSideBar = () => {
    setIsOpen(true);
  };

  function ShowLogout(event) {
    if (isOpen === true) {
      setLogoutButton(false);
    } else {
      setLogoutButton(true);
    }
  }

  const localStorageValue = JSON.parse(localStorage.getItem("value"));
  console.log(localStorageValue, "localStorageValue");
  function logoutUser() {
    localStorage.clear();
    navigate("/");
  }

  function navigation() {
    if (localStorageValue.role == "client") {
      navigate(`/profile`);
    } else if (localStorageValue.role == "admin") {
      navigate(`/admin-profile`);
    }
  }

  function navigatePage(value) {
   if(value){

     navigate(`/${value}`);
   }
    
  }

  const navbarParent = {
    display: "flex",
    justifyContent: "space-between",
  };

  const navbarButtonParent = {
    display: "flex",
    margin: "10px 30px 0 0",
    cursor: "pointer",
  };

  const notificationButton = {
    backgroundColor: "#26b78a1a",
    height: "35px",
    marginTop: "10px",
    borderRadius: "5px",
  };

  const profileButtonParent = {
    display: "flex",
    borderRadius: "24px",
    padding: "5px 10px 10px",
    height: "56px",
    backgroundColor: "antiquewhite",
    cursor: "pointer",
  };

  const imageSearchParent = {
    display: "flex",
  };

  const defaultOptionParent = {
    height: "30px",
    marginTop: "11px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    setLogoutButton,
  };

  const logoutButtonParent = {
    position: "absolute",
    width: "19%",
    top: "70px",
    right: "23px",
    background: "white",
    height: "150px",
    zIndex: "100",
  };

  const logoutParent = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "flex-start",
  };
  const roleType = JSON.parse(localStorage.getItem("value"));

  return (
    <>
      <Grid sx={navbarParent}>
        <Grid sx={imageSearchParent}>
          <img
            src="Logo-light-versuion.png"
            style={{ height: "45px", margin: "10px 0 0 20px" }}
          />

          <Box>
            <IconButton
              onClick={() => smallSideBar()}
              style={{
                margin: "15px 0 0 20px",
              }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              open={isOpen}
              onClose={() => setIsOpen(false)}
              anchor="left"
              style={{ marginTop: "85px" }}
            >
              <Stack width={270}>
                <Grid>
                  <Grid style={{ margin: "20px 0px 5px 7px" }}>
                    <Typography
                      variant="p"
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        margin: "0 0 0 20px",
                        border: "border-bottom",
                      }}
                    >
                      Dashboard
                    </Typography>
                  </Grid>

                  {roleType.role != "admin"
                    ? sidebarMenu.map((e, i) => {
                        return (
                          <ListItem
                            onClick={() => {
                              console.log(e.value,'client')

                              setIsOpen(false);
                              navigatePage(e.value);
                            }}
                            key={i}
                          >
                            <ListItemButton sx={defaultOptionParent}>
                              <Grid>{e.icon}</Grid>
                              <Typography
                                variant="span"
                                style={{
                                  position: "relative",
                                  fontStyle: "17px",
                                  marginLeft: "15px",
                                }}
                              >
                                {e.name}
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        );
                      })
                    : adminSidebarMenu.map((e, i) => {
                        return (
                          <ListItem
                            onClick={() => {
                              console.log(e.value,'admin')
                              setIsOpen(false);
                              navigatePage(e.value);
                            }}
                            key={i}
                          >
                            <ListItemButton sx={defaultOptionParent}>
                              <Grid>{e.icon}</Grid>
                              <Typography
                                variant="span"
                                style={{
                                  position: "relative",
                                  fontStyle: "17px",
                                  marginLeft: "15px",
                                }}
                              >
                                {e.name}
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                </Grid>
              </Stack>
            </Drawer>
          </Box>
        </Grid>

        <Grid sx={navbarButtonParent}>
          <Grid sx={profileButtonParent} onClick={ShowLogout}>
            <Grid>
              <Typography
                variant="h5"
                style={{
                  backgroundColor: "#00000017",
                  fontSize: "34px",
                  borderRadius: "30px",
                  padding: "0px 10px",
                }}
              >
                {firstName ? <PersonIcon /> : ""}
              </Typography>
            </Grid>
            {logoutButton == true && (
              <OutsideAlerter
                setLogoutButton={setLogoutButton}
                logoutButton={logoutButton}
              >
                <Paper elevation={20} style={logoutButtonParent}>
                  <Typography
                    variant="h5"
                    style={{ fontSize: "30px", padding: "5px 0 0 13px" }}
                  >
                    Hey , {firstName}
                  </Typography>
                  <ListItem sx={logoutParent}>
                    <ListItemButton onClick={logoutUser}>
                      <LogoutIcon />
                      <Typography variant="h5" style={{ margin: "0 0 0 13px" }}>
                        {" "}
                        Logout
                      </Typography>
                    </ListItemButton>
                    <ListItemButton onClick={() => navigation()}>
                      <PersonOutlineIcon style={{ marginRight: "8px" }} />
                      <Typography variant="h5" style={{ margin: "0 0 0 13px" }}>
                        {" "}
                        Profile
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </Paper>
              </OutsideAlerter>
            )}
            <SettingsIcon
              style={{ fontSize: "30px", padding: "7px 2px 0 11px" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default NavbarComponent;
