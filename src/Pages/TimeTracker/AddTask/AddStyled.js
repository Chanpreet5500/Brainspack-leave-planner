import { Box, Button, styled } from "@mui/material";

export const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const AddRow = styled(Button)(({ theme }) => ({
  background: "#55AD88",
  marginTop: "15px",
  color: "#fff",
  textTransform: "capitalize",
  fontSize: "14px",
  "&:hover": {
    background: "#4d9b78",
  },
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  background: "#355edb",
  marginTop: "15px",
  color: "#fff",
  textTransform: "capitalize",
  fontSize: "14px",
  "&:hover": {
    background: "#3547bd",
  },
}));
