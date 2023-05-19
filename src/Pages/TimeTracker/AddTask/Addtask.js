import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { CustomTableCell, CustomTableHead } from "../styled";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import { GetUserData } from "../ReactQuery/CustomHooks/TimeTracker";

const rows = [
  {
    projectName: "",
    date: "",
    taskName: "",
    taskDescription: "",
    status: "",
    hours: "",
  },
];

const Addtask = () => {
  const [projectTitle, setProjectTitle] = useState(rows);
  const [taskName, setTaskName] = useState([]);
  const [taskDescription, setTaskDescription] = useState([]);
  const [hours, setHours] = useState([]);
  const [projectReview, setProjectReview] = useState([]);

  const handleChange = (e, index, field) => {
    const newArray = projectTitle.map((item, i) => {
      if (index === i) {
        return { ...item, [field]: e.target.value };
      } else {
        return item;
      }
    });
    setProjectTitle(newArray);
  };

  const addRowOnClick = () => {
    const data = {
      projectName: "",
      date: "",
      taskName: "",
      taskDescription: "",
      status: "",
      hours: "",
    };
    setProjectTitle([...projectTitle, data]);
  };

  console.log(projectTitle);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          padding: "10px",
        }}
      >
        <Table sx={{ minWidth: 650, flex: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CustomTableHead>S.No</CustomTableHead>
              <CustomTableHead>Project Name</CustomTableHead>
              <CustomTableHead>Date</CustomTableHead>
              <CustomTableHead>Task Name</CustomTableHead>
              <CustomTableHead>Task Description</CustomTableHead>
              <CustomTableHead>Hours</CustomTableHead>
              <CustomTableHead>Status</CustomTableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectTitle?.map((row, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <CustomTableCell component="th" scope="row">
                  {id + 1 + "."}
                </CustomTableCell>
                <CustomTableCell>
                  <Input
                    value={row.projectName} // row.projectName
                    onChange={(e) => handleChange(e, id, "projectName")}
                    disableUnderline={true}
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={row.date}
                    onChange={(e) => handleChange(e, id, "date")}
                    disableUnderline={true}
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={row.taskName} // row,taskName
                    onChange={(e) => handleChange(e, id, "taskName")}
                    disableUnderline={true}
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={row.taskDescription} // row.taskDescription
                    onChange={(e) => handleChange(e, id, "taskDescription")}
                    disableUnderline={true}
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={row.hours} // row.hours
                    onChange={(e) => handleChange(e, id, "hours")}
                    disableUnderline={true}
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={row.status == true ? "Approved" : "Pending"}
                    onChange={(e) => handleChange(e, id, "status")}
                    disableUnderline={true}
                    disabled
                  />
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={addRowOnClick}
          sx={{
            background: "#55AD88",
            marginTop: "15px",
            color: "#fff",
            textTransform: "capitalize",
            fontSize: "14px",
            "&:hover": {
              background: "#4d9b78",
            },
          }}
        >
          Add Row <AddIcon />{" "}
        </Button>
        <Button
          sx={{
            background: "#355edb",
            marginTop: "15px",
            color: "#fff",
            textTransform: "capitalize",
            fontSize: "14px",
            padding: "5px 25px",
            "&:hover": {
              background: "#3547bd",
            },
          }}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default Addtask;
