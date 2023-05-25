import styled from "@emotion/styled";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { TableCell, Button, Box, TextField, FormControl } from "@mui/material";

export const CustomTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: "#ededed",
}));
export const CustomTableHead = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "16px",

}));
export const CustomEditButton = styled(Button)(({ theme }) => ({
  background: "#355edb",
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
  width: "100%"
}))

export const Username = styled(Box)(({ theme }) => ({
  padding: "5px",
  fontSize: "18px",
  color: "#7c7c7c",
  fontWeight: "500",
}))

export const HoursTextField = styled(TextField)(({ theme }) => ({
  '& .css-1pw81iq-MuiInputBase-root-MuiFilledInput-root': {
    background: "transparent !important"
  }
}))

export const TableFooterNoRecord = styled(Box)(({ theme }) => ({
  width: "97%",
  height: "10rem",
  borderRadius: "5px",
  display: "grid",
  placeItems: "center",
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  margin: '0 auto'
}))

export const ButtonTextBox = styled(Box)(({ theme }) => ({
  paddingLeft: "5px", fontFamily: "sans-serif", minWidth: '50px'
}))

export const WeekDayBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  color: "#8080809e",
  fontSize: "14px",
}))

export const HeaderMainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: "10px",
}))

export const UserDetailsBox = styled(Box)(({ theme }) => ({
  display: "flex", alignItems: "center"
}))

export const DateBox = styled(Box)(({ theme }) => ({
  display: "flex", alignItems: "center", gap: "16px",fontWeight:'bold'
}))

export const ArrowBack = styled(ArrowBackIos)(({ theme }) => ({
  color: "gray",
  cursor: "pointer",
  "&:hover": {
    color: "black",
  },
}))

export const ArrowForward = styled(ArrowForwardIos)(({ theme }) => ({
  color: "gray",
  cursor: "pointer",
  "&:hover": {
    color: "black",
  },
}))


export const FormControlBox = styled(Box)(({theme})=>({
  display: "flex", alignItems: "center", width: "150px" 
}))

export const FormControlPannel = styled(FormControl)(({theme})=>({
  width: "100%", paddingRight: "15px"
}))