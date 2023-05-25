import * as React from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { CustomTableCell, CustomTableHead, PickDate } from "../styled";
import { Input, Box, Button } from "@mui/material";
import { useMutation } from "react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const loggedInUser = localStorage.getItem("value");
const finalData = JSON.parse(loggedInUser);
const userId = finalData._id;

const rows = [
  {
    userId: userId,
    projectName: "",
    date: "",
    taskName: "",
    taskDescription: "",
    status: false,
    hours: "00:00",
  },
];
const Addtask = () => {
  const [projectData, setProjectData] = useState(rows);
  console.log(projectData, 'date from state')

  const handleChange = (event, index, field) => {
    const updatedField = projectData?.map((item, i) => {
      console.log(item, "item");
      if (index === i) {
        return { ...item, [field]: event };
      } else {
        return item;
      }
    });
    setProjectData(updatedField);
  };

  const addRowOnClick = () => {
    const data = {
      userId: userId,
      projectName: "",
      date: "",
      taskName: "",
      taskDescription: "",
      status: false,
      hours: "00:00",
    };
    setProjectData([...projectData, data]);
  };

  const addProjectData = useMutation((userId) => {
    return axios.post(`http://localhost:5233/sendData/${userId}`, projectData);
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
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
              </TableRow>
            </TableHead>
            <TableBody>
              {projectData &&
                projectData.map((row, id) => {
                  return (
                    <TableRow
                      key={id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <CustomTableCell component="th" scope="row">
                        {id + 1 + "."}
                      </CustomTableCell>
                      <CustomTableCell>
                        <Input
                          value={row.projectName}
                          onChange={(e) =>
                            handleChange(e.target.value, id, "projectName")
                          }
                          disableUnderline={true}
                          type="text"
                          placeholder="Enter Project Name"
                        />
                      </CustomTableCell>
                      <CustomTableCell>
                        {" "}
                        <PickDate
                          value={row.date}
                          onChange={(e) => handleChange(e.$d, id, "date")}
                        />
                      </CustomTableCell>
                      <CustomTableCell>
                        {" "}
                        <Input
                          value={row.taskName}
                          onChange={(e) =>
                            handleChange(e.target.value, id, "taskName")
                          }
                          disableUnderline={true}
                          type="text"
                          placeholder="Enter Task Name"
                        />
                      </CustomTableCell>
                      <CustomTableCell>
                        {" "}
                        <Input
                          value={row.taskDescription}
                          onChange={(e) =>
                            handleChange(e.target.value, id, "taskDescription")
                          }
                          disableUnderline={true}
                          type="text"
                          placeholder="Enter Task Description"
                        />
                      </CustomTableCell>
                      <CustomTableCell>
                        {" "}
                        <Input
                          value={row.hours}
                          onChange={(e) =>
                            handleChange(e.target.value, id, "hours")
                          }
                          disableUnderline={true}
                          type="text"
                          placeholder="Enter Hours"
                        />
                      </CustomTableCell>
                    </TableRow>
                  );
                })}
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
            onClick={() => addProjectData.mutate(userId)}
          >
            Save
          </Button>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default Addtask;
