import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { CustomTableCell, CustomTableHead } from "../styled";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EditUserData,
  UpdateUserData,
} from "../../ReactQuery/CustomHooks/TimeTracker";
// import { GetUserData } from "../ReactQuery/CustomHooks/TimeTracker";

const obj = {
  projectName: "",
  date: "",
  taskName: "",
  taskDescription: "",
  status: "",
  hours: "",
  userId: "",
};
const EditTask = () => {
  const [projectTitle, setProjectTitle] = useState(obj);
  const [taskName, setTaskName] = useState([]);
  const [taskDescription, setTaskDescription] = useState([]);
  const [hours, setHours] = useState([]);
  const [projectReview, setProjectReview] = useState([]);
  const id = useLocation((state) => state);
  console.log(id.state.eventId, "user ud");
  const userId = id.state.eventId;
  const navigate=useNavigate();

  const handleChange = (e, id, field) => {
    setProjectTitle({ ...projectTitle, [field]: e.target.value });
  };

  const { data, isSuccess } = EditUserData(userId);
  const apiData = data?.data?.data;
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
    console.log(
      date,
      hours,
      projectName,
      status,
      taskDescription,
      taskName,
      userId
    );
  }

  useEffect(() => {
    if (apiData) {
      setProjectTitle({
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

  const { mutate } = UpdateUserData();
  const saveData = () => {
    mutate(projectTitle);
    navigate(-1)
  };
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
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <CustomTableCell component="th" scope="row">
                {1}
              </CustomTableCell>
              <CustomTableCell>
                <Input
                  value={projectTitle.projectName}
                  onChange={(e) => handleChange(e, id, "projectName")}
                  disableUnderline={true}
                  placeholder="Enter project name"
                />
              </CustomTableCell>
              <CustomTableCell>
                {" "}
                <Input
                  value={projectTitle.date}
                  onChange={(e) => handleChange(e, id, "date")}
                  disableUnderline={true}
                  placeholder="Enter project name"
                />
              </CustomTableCell>
              <CustomTableCell>
                {" "}
                <Input
                  value={projectTitle.taskName} // row,taskName
                  onChange={(e) => handleChange(e, id, "taskName")}
                  disableUnderline={true}
                  placeholder="Enter project name"
                />
              </CustomTableCell>
              <CustomTableCell>
                {" "}
                <Input
                  value={projectTitle.taskDescription} // row.taskDescription
                  onChange={(e) => handleChange(e, id, "taskDescription")}
                  disableUnderline={true}
                  placeholder="Enter project name"
                />
              </CustomTableCell>
              <CustomTableCell>
                {" "}
                <Input
                  value={projectTitle.hours}
                  onChange={(e) => handleChange(e, id, "hours")}
                  disableUnderline={true}
                  placeholder="Enter project name"
                />
              </CustomTableCell>
              <CustomTableCell>
                {" "}
                <Input
                  value={projectTitle.status == true ? "Approved" : "Pending"}
                  onChange={(e) => handleChange(e, id, "status")}
                  disableUnderline={true}
                  disabled
                />
              </CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          padding: "20px",
        }}
      >
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
          onClick={() => saveData()}
        >
          Update Task
        </Button>
      </Box>
    </>
  );
};

export default EditTask;
