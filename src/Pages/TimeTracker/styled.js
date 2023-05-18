import styled from "@emotion/styled";
import { TableCell, Button } from "@mui/material";

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
  padding: "5px 15px",
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
  padding: "5px 15px",
  cursor: "pointer",
  minWidth: "0px",
  textTransform: "capitalize",
  "&:hover": {
    background: "#ba351a",
  },
}));
