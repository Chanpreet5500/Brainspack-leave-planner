import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetDataById } from "../../ReactQuery/CustomHooks/TimeTracker";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { CustomTableCell, CustomTableHead, PickDate } from "../styled";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "react-query";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CustomEditButton } from "../styled";

const loggedInUser = localStorage.getItem("value");
const finalData = JSON.parse(loggedInUser);
const userId = finalData._id;

const rows = {
  userId: userId,
  projectName: "",
  date: "",
  taskName: "",
  taskDescription: "",
  status: false,
  hours: "00:00",
};

const EditTask = () => {
  const [projectData, setProjectData] = useState(rows);
  const axiosInstance = axios.create();

  const location = useLocation();
  const id = location.state;

  const { data, isSuccess } = GetDataById(id);
  const apiData = data?.data?.data;
  console.log(apiData);

  if (apiData) {
    const {
      date,
      hours,
      projectName,
      status,
      taskDescription,
      taskName,
      userId,
    } = apiData[0];
  }

  const handleChange = (event, field) => {
    setProjectData({ ...projectData, [field]: event });
  };

  useEffect(() => {
    if (apiData) {
      setProjectData({
        projectName: apiData[0].projectName,
        date: apiData[0].date,
        taskName: apiData[0].taskName,
        taskDescription: apiData[0].taskDescription,
        status: apiData[0].status,
        hours: apiData[0].hours,
        _id: apiData[0]._id,
      });
    }
  }, [data]);

  const UpdateTask = useMutation((id) => {
    return axiosInstance.patch(
      `http://localhost:5233/update/${id}`,
      projectData
    );
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
                <CustomTableHead>Project Name</CustomTableHead>
                <CustomTableHead>Date</CustomTableHead>
                <CustomTableHead>Task Name</CustomTableHead>
                <CustomTableHead>Task Description</CustomTableHead>
                <CustomTableHead>Hours</CustomTableHead>
                <CustomTableHead>Action</CustomTableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <CustomTableCell>
                  <Input
                    value={projectData.projectName}
                    onChange={(e) =>
                      handleChange(e.target.value, "projectName")
                    }
                    disableUnderline={true}
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={projectData.date}
                    onChange={(e) => handleChange(e.target.value, "date")}
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={projectData.taskName}
                    onChange={(e) =>
                      handleChange(e.target.value, "taskName")
                    }
                    disableUnderline={true}
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={projectData.taskDescription}
                    onChange={(e) =>
                      handleChange(e.target.value, "taskDescription")
                    }
                    disableUnderline={true}
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={projectData.hours}
                    onChange={(e) => handleChange(e.target.value, "hours")}
                    disableUnderline={true}
                  />
                </CustomTableCell>
                <CustomTableCell>
                  <CustomEditButton
                    onClick={() => UpdateTask.mutate(projectData._id)}
                  >
                    Update Task
                  </CustomEditButton>
                </CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </LocalizationProvider>
    </>
  );
};

export default EditTask;
