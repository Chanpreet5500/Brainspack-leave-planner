import { Box, styled, Button, Typography } from "@mui/material";

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

export const ErrorText= styled(Typography)(({theme})=>({
  color:'red',
  fontSize: "12px",
  position:'absolute',
}))
