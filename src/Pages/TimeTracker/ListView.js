import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetUserData } from "../ReactQuery/CustomHooks/timeTracker";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ListView() {
  const loggedInUserData = localStorage.getItem("value");
  const userFinalData = JSON.parse(loggedInUserData);
  const userId = userFinalData._id;
  console.log(userId);
  const { data, isSuccess } = GetUserData(userId);
  console.log(data, isSuccess, "user Data");
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Task Description</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((element, index) => (
            <TableRow
              key={element.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {element.name}
              </TableCell>
              <TableCell>{element.calories}</TableCell>
              <TableCell>{element.fat}</TableCell>
              <TableCell>{element.carbs}</TableCell>
              <TableCell>{element.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
