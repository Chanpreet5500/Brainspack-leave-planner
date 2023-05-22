import { Box, styled, Button } from "@mui/material";

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
