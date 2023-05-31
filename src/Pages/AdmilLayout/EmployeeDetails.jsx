import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { UserLeave } from "./UserTabs/UserLeave";
import { UserTask } from "./UserTabs/UserTask";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import TabContext from "@mui/lab/TabContext/TabContext";

const EmployeeDetails = (props) => {
  // console.log("props of ",props)
  const [value, setValue] = React.useState("leave");
  const location = useLocation();
  console.log("location",location)

  const { id } = location.state;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", mt: "20px", ml: "20px" }}>
      <TabContext value={value}>

      <Tabs value={value} onChange={handleChange}>
        <Tab value="leave" label="All leave"></Tab>
        <Tab value="tasks" label="Tasks"></Tab>
      </Tabs>
      <TabPanel  value="leave">
        <UserLeave />
      </TabPanel>
      <TabPanel value="tasks">
        <UserTask />
      </TabPanel>
      </TabContext>
    </Box>
  );
};

export default EmployeeDetails;
