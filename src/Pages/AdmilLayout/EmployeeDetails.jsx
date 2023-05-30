import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const EmployeeDetails = () => {
  const [value, setValue] = React.useState("leave");
const location = useLocation();

const {id}= location.state;


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", mt: "20px", ml: "20px" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="leave" label="All leave" />
        <Tab value="tasks" label="Tasks" />
      </Tabs>
    </Box>
  );
};

export default EmployeeDetails;
