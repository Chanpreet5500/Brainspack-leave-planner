import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Main, Username } from "../styled";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Header = () => {
  const [log, setLog] = useState("dailyLog");

  const handleChange = (event) => {
    setLog(event.target.value);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: "10px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIosNewIcon sx={{ color: "#174dc2" }} />
          <AccountCircleIcon sx={{ color: "#ebebeb", fontSize: "3rem" }} />
          <Username component="span">C1936 - Vaibhav Maini</Username>
          <KeyboardArrowDownIcon sx={{ padding: "10px" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center"}}>
          <ArrowBackIosIcon sx={{ }} />
          <Box component="span" sx={{ margin: "0 auto", fontSize: "18px", margin: "20px" }}>
            Today
          </Box>
          <ArrowForwardIosIcon sx={{ }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "150px"}}>
          <FormControl sx={{ width: "100%", paddingRight: "15px" }} size="small">
            <Select value={log} onChange={handleChange}>
              <MenuItem value="dailyLog">Daily Log</MenuItem>
              <MenuItem value="weeklyLog">Weekly Log</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default Header;
