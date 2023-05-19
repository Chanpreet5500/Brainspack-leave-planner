import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListView from "./ListView";

const Timetracker = () => {
  const [value, setValue] = useState("listView");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: 'space-between' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="List View" value="listView" />
            <Tab label="Calendar View" value="calendarView" />
          </TabList>
          <TabList onChange={handleChange}>
            <Tab label='Add Task' value='addtask' />
          </TabList>
        </Box>
        <TabPanel value="listView"><ListView /></TabPanel>
        <TabPanel value="calendarView">Calendar View</TabPanel>
        <TabPanel value="addtask">Add Task</TabPanel>
      </TabContext>
    </Box>
  );
};

export default Timetracker;
