import { Box, Button, styled } from "@mui/material";

export const CancelButton = styled(Button)(({ theme }) => ({
  background: "#ba351a",
  marginTop: "15px",
  color: "#fff",
  textTransform: "capitalize",
  fontSize: "14px",
  "&:hover": {
    background: "#c94328",
  },
}));

export const ButtonContainer =styled(Box)(({theme})=>({
    display:'flex',
    justifyContent:'center'
}))
