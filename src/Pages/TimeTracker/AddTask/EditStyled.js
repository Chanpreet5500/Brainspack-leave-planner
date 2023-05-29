import { Box, styled, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const ButtonWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  padding: "20px",
}));

export const ButtonContainer = styled(Button)(({ theme }) => ({
  background: "#355edb",
  marginTop: "15px",
  color: "#fff",
  textTransform: "capitalize",
  fontSize: "14px",
  padding: "5px 25px",
  "&:hover": {
    background: "#3547bd",
  },
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: "red",
  fontSize: "14px",
  // position:'absolute',
}));

export const PickDate = styled(DatePicker)(({ theme }) => ({
  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
    borderWidth: "0px !important",
  },
  "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#000 !important",
    },
}));

export const RemoveRowButton = styled(Button)(({ theme }) => ({
  background: "#c94328",
  marginTop: "15px",
  color: "#fff",
  textTransform: "capitalize",
  fontSize: "14px",
  "&:hover": {
    background: "#ba351a",
  },
}));
