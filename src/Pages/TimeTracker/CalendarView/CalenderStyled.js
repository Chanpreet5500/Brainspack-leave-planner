import { Box, CircularProgress, styled, Typography } from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: 24,
  padding: "20px",
}));

export const Heading = styled(Typography)(({ theme }) => ({
  marginBottom: "20px",
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "24px",
  textAlign: "center",
}));

export const Text = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "28px",
  textAlign: "left",
  overflow: "hidden",
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  marginTop: "20px",
}));

export const ButtonWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: "5px",
  paddingRight: "15px",
  fontFamily: "sans-serif",
}));

export const HeadingModal = styled(Typography)(({ theme }) => ({
  margin: "15px 0px 30px 0px",
  textAlign: "center",
  fontWeight: "bold",
}));

export const CircularBar = styled(CircularProgress)(({ theme }) => ({
  width: "20px !important",
  height: "20px!important",
  color: "#ffffff",
}));
