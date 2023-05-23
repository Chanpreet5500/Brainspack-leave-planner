import styled from "@emotion/styled";
import { TableCell, Button, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export const CustomTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: "#ededed",
  fontSize: "18px",
}));
export const CustomTableHead = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "18px",
}));
export const CustomEditButton = styled(Button)(({ theme }) => ({
  background: "#355edb",
  zIndex: 10,
  fontSize: "16px",
  marginRight: "5%",
  color: "#fff",
  padding: "5px 10px",
  minWidth: "0px",
  textTransform: "capitalize",
  cursor: "pointer",
  "&:hover": {
    background: "#3547bd !important",
  },
}));
export const CustomDeleteButton = styled(Button)(({ theme }) => ({
  background: "#c94328",
  fontSize: "16px",
  color: "#fff",
  padding: "5px 10px",
  cursor: "pointer",
  minWidth: "0px",
  textTransform: "capitalize",
  "&:hover": {
    background: "#ba351a",
  },
}));

export const Main = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  paddingLeft: "20px",
  display: "flex",
  alignItems: "center",
  width: "100%",
}));

export const Username = styled(Box)(({ theme }) => ({
  padding: "5px",
  fontSize: "18px",
  color: "#7c7c7c",
  fontWeight: "500",
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
