// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { useQuery } from 'react-query';
// import { ArrowBackIos, ArrowDownwardOutlined, ArrowForwardIos, DeleteOutline, EditOutlined, ExpandMore, KeyboardArrowDown } from '@mui/icons-material';
// import { GetUserLoggedData } from '../../FrontendAPI/api';
// import LogBar from '../LogBar/LogBar';




// export default function ListView() {
//   const [log, setLog] = React.useState('daily')
//   const [navBarDate, setNavbarDate] = React.useState({
//     formatDate: new Date(),
//     date: 'Today'
//   })
//   const [weekFIrstDay, setWeekFirstDay] = React.useState('')
//   const [weekLastDay, setWeekLastDay] = React.useState('')
//   const [userTaskData, setUserTaskData] = React.useState([])

//   const userLoggedId = JSON.parse(localStorage.getItem('value'));


//   const { data } = GetUserLoggedData(userLoggedId._id)

//   const newData = data?.data


//   const date = new Date();
//   const formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`


//   React.useEffect(() => {
//     if (newData) {
//       setUserTaskData(newData)
//     }
   
//   }, [newData])


//   return (

//     <>


  

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="center"> Sr.No</TableCell>
//               <TableCell align="center">Project Name</TableCell>
//               <TableCell align="center">Task Name</TableCell>
//               <TableCell align="center">Task Description</TableCell>
//               <TableCell align="center">Hours</TableCell>
//               <TableCell align="center">Date</TableCell>
//               <TableCell align="center">Status</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {userTaskData?.map((row, index) => (
//               <TableRow
//                 key={index}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row" align="right">
//                   {index + 1}
//                 </TableCell>
//                 <TableCell align="center">{row.projectName}</TableCell>
//                 <TableCell align="center"> {row.taskName}</TableCell>
//                 <TableCell align="center">{row.taskDescription}</TableCell>
//                 <TableCell align="center">{row.hours}</TableCell>
//                 <TableCell align="center">{formatedDate}</TableCell>
//                 <TableCell align="center">{row.status ? "Approved" : "pending"}</TableCell>
//                 <TableCell align="center"  >
//                   <Button sx={{
//                     textTransform: "capitalize", borderRadius: "50px", minWidth: 0, p: "7px", backgroundColor: "transparent", color: "#4189e1", border: "1px solid #4189e1", mr: "10px",
//                     '&:hover': {
//                       backgroundColor: '#4189e1', color: "white",
//                     }
//                   }} size='small' variant='contained' ><EditOutlined fontSize='small' />  </Button>
//                   <Button sx={{
//                     textTransform: "capitalize", borderRadius: "50px", minWidth: 0, p: "7px", backgroundColor: "transparent", color: "red", border: "1px solid red", '&:hover': {
//                       backgroundColor: 'red', color: "white",
//                     }
//                   }} variant='contained' size='small'  ><DeleteOutline fontSize='small' /></Button>
//                 </TableCell>
import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {
  CustomTableCell,
  CustomTableHead,
  CustomEditButton,
  CustomDeleteButton,
} from "./styled";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header/Header";
import { GetUserData } from "../ReactQuery/CustomHooks/TimeTracker";

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

const ListView = () => {
  const [projectTitle, setProjectTitle] = useState(rows);
  const [taskName, setTaskName] = useState([]);
  const [taskDescription, setTaskDescription] = useState([]);
  const [hours, setHours] = useState([]);
  const [projectReview, setProjectReview] = useState([]);
  const [log, setLog] = React.useState('daily')
  const [navBarDate, setNavbarDate] = React.useState({
    formatDate: new Date(),
    date: 'Today'
  })
  const [weekFIrstDay, setWeekFirstDay] = React.useState('')
  const [weekLastDay, setWeekLastDay] = React.useState('')
  const [userTaskData, setUserTaskData] = React.useState([])


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

  const loggedInUser = localStorage.getItem("value");
  const finalData = JSON.parse(loggedInUser);
  const userId = finalData._id;
  console.log(userId, "userId");
  const { data, isSuccess } = GetUserData(userId);
  const apiData = data?.data?.data;
  console.log(apiData);

  const ddMMYY = (date) => {
    const d = new Date(date);
    const finalDate = d.toLocaleDateString();
    return finalDate;
  };

  return (
    <>
    {/* <LogBar data={{log,setLog,navBarDate,setNavbarDate,weekFIrstDay,setWeekFirstDay,weekLastDay,setWeekLastDay}}/> */}
      <Header />
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
              <CustomTableHead colSpan={2}>Actions</CustomTableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData?.map((row, id) => (
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
                    disabled
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={ddMMYY(row.date)}
                    onChange={(e) => handleChange(e, id, "date")}
                    disableUnderline={true}
                    disabled
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={row.taskName} // row,taskName
                    onChange={(e) => handleChange(e, id, "taskName")}
                    disableUnderline={true}
                    // disabled
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={row.taskDescription} // row.taskDescription
                    onChange={(e) => handleChange(e, id, "taskDescription")}
                    disableUnderline={true}
                    // disabled
                  />
                </CustomTableCell>
                <CustomTableCell>
                  {" "}
                  <Input
                    value={row.hours} // row.hours
                    onChange={(e) => handleChange(e, id, "hours")}
                    disableUnderline={true}
                    disabled
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
                <CustomTableCell>
                  <CustomEditButton>
                    <EditIcon
                      sx={{
                        fontSize: "24px",
                      }}
                    />
                    <Box
                      sx={{
                        paddingLeft: "5px",
                        paddingRight: "15px",
                        fontFamily: "sans-serif",
                      }}
                      component="span"
                    >
                      Edit
                    </Box>
                  </CustomEditButton>
                </CustomTableCell>
                <CustomTableCell>
                  <CustomDeleteButton>
                    <DeleteIcon />{" "}
                    <Box
                      sx={{ paddingLeft: "5px", fontFamily: "sans-serif" }}
                      component="span"
                    >
                      Delete
                    </Box>
                  </CustomDeleteButton>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListView;
