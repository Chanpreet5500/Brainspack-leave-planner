import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, TableCell, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const rows = [
  {
    projectName: "",
    date: "",
    taskName: "",
    taskDescription: "",
    status: "",
    hours: "",
  },
  {
    projectName: "",
    date: "",
    taskName: "",
    taskDescription: "",
    status: "",
    hours: "",
  },
  {
    projectName: "",
    date: "",
    taskName: "",
    taskDescription: "",
    status: "",
    hours: "",
  },
  {
    projectName: "",
    date: "",
    taskName: "",
    taskDescription: "",
    status: "",
    hours: "",
  },
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

  // const handleChange = (e, id) => {
  //   setProjectTitle(
  //     projectTitle.map(item =>
  //       item.id === index
  //       ? {...item, someProp : "changed", someOtherProp: 42}
  //       : item
  //   )
  // }
  const handleChange = (e, index, field) => {
    // console.log(e.target.value, index);
    const newArray = projectTitle.map((item, i) => {
      if (index === i) {
        return { ...item, [field]: e.target.value };
      } else {
        return item;
      }
    });
    setProjectTitle(newArray);
  };
  // console.log(projectTitle, "data in project name");
  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: "20px",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {projectTitle.map((row, id) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <CustomTableCell component="th" scope="row">
                {id + 1 + "."}
              </CustomTableCell>
              <CustomTableCell>
                <Input
                  value={row.projectName}
                  onChange={(e) => handleChange(e, id, "projectName")}
                  disableUnderline={true}
                />
              </CustomTableCell>
              <CustomTableCell>
                {" "}
                <Input
                  value={"May 2023"}
                  onChange={(e) => handleChange(e, id, "date")}
                  disableUnderline={true}
                  disabled
                />
              </CustomTableCell>
              <CustomTableCell>
                {" "}
                <Input
                  value={row.taskName}
                  onChange={(e) => handleChange(e, id, "taskName")}
                  disableUnderline={true}
                />
              </CustomTableCell>
              <CustomTableCell>
                {" "}
                <Input
                  value={row.taskDescription}
                  onChange={(e) => handleChange(e, id, "taskDescription")}
                  disableUnderline={true}
                />
              </CustomTableCell>
              <CustomTableCell>
                {" "}
                <Input
                  value={row.hours}
                  onChange={(e) => handleChange(e, id, "hours")}
                  disableUnderline={true}
                />
              </CustomTableCell>
              <CustomTableCell>
                {" "}
                <Input
                  value={"Pending"}
                  onChange={(e) => handleChange(e, id, "status")}
                  disableUnderline={true}
                  disabled
                />
              </CustomTableCell>
              <CustomTableCell>
                <CustomEditButton><EditIcon sx={{
                  fontSize: "24px"
                }}/></CustomEditButton>
              </CustomTableCell>
              <CustomTableCell>
                <CustomDeleteButton><DeleteIcon /></CustomDeleteButton>
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListView;
