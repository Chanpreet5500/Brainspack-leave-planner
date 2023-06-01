import { Box, MenuItem, Select, styled } from "@mui/material";

export const MainContainerCalender = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "30px",
}));

export const CalendarContainer = styled(Box)(({ theme }) => ({
  width: "90%",
}));

export const DropDown = styled(Select)(({ theme }) => ({
  width:'auto',
  minWidth:'200px',
  height: "40px",
  marginBottom: "20px",
  '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
    display:"flex",
    justifyContent:'space-between',
    gap:'16px'
  }
}));

export const CustomMenu = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const CustomBox = styled(Box)(({ theme }) => ({
  width: "20px !important",
  height: "20px",
  borderRadius: "50%",
}));
