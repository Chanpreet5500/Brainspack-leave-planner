import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListView from "./ListView";
import CalendarView from "./CalendarView/CalendarView";
import Addtask from "./AddTask/Addtask";

const Timetracker = () => {
  const [value, setValue] = useState("listView");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("tab", newValue);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          overflow: "hidden",
          paddingTop: "15px",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                sx={{ textTransform: "capitalize", fontSize: "16px" }}
                label="List View"
                value="listView"
              />
              <Tab
                sx={{ textTransform: "capitalize", fontSize: "16px" }}
                label="Calendar View"
                value="calendarView"
              />
            </TabList>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                sx={{ textTransform: "capitalize", fontSize: "16px" }}
                label="Add Task"
                value="addTask"
              />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: "0px" }} value="listView">
            <ListView />
          </TabPanel>
          <TabPanel value="calendarView">
            <CalendarView />
          </TabPanel>
          <TabPanel value="addTask">
            <Addtask setValue={setValue} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Timetracker;
