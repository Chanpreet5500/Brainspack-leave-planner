import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListView from "./ListView";
import CalendarView from "./CalendarView/CalendarView";
import { Button } from "@mui/material";

const Timetracker = () => {
  const [value, setValue] = useState("listView");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", overflow: "hidden", paddingTop: "15px" }}>
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="List View" value="listView" />
              <Tab label="Calendar View" value="calendarView" />
            </TabList>
            <Button sx={{
              position : "relative",
              left: "81%",
              background: "#355edb",
              color: "#fff",
              marginTop: "10px",
              padding: "10px 15px 10px 15px",
              maxHeight: "30px",
              textTransform: "capitalize",
              fontSize: "16px",
              '&:hover' : {
                background: "#3547bd"
              }
            }}>Add +</Button>
          </Box>
          <TabPanel sx={{ padding: "0px" }} value="listView">
            <ListView />
          </TabPanel>
          <TabPanel value="calendarView">
            <CalendarView />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Timetracker;
