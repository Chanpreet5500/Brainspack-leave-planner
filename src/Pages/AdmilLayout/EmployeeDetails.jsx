import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { UserLeave } from "./UserTabs/UserLeave";
import { UserTask } from "./UserTabs/UserTask";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import TabContext from "@mui/lab/TabContext/TabContext";

const EmployeeDetails = () => {
  const [value, setValue] = React.useState("leave");
  const location = useLocation();
  const { id, firstName, lastName } = location.state;

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ mt: "20px", pl: "20px" }}>
      <TabContext value={value}>
        <Tabs value={value} onChange={handleChange}>
          <Tab value="leave" label="All leave"></Tab>
          <Tab value="tasks" label="Tasks"></Tab>
        </Tabs>
        <TabPanel value="leave">
          <UserLeave userId={id} />
        </TabPanel>
        <TabPanel value="tasks">
          <UserTask userId={id} firstName={firstName} lastName={lastName} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default EmployeeDetails;
