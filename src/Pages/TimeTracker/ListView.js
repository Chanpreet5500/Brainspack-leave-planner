import * as React from "react";
import axios from "axios";
import { useState } from "react";
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
import { useMutation } from "react-query";
import Modal from "../Dialog/Modal";
import { useNavigate } from "react-router-dom";

const ListView = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rowId, setRowId] = useState("");
  const navigate = useNavigate();
  const axiosInstance = axios.create();

  const loggedInUser = localStorage.getItem("value");
  const finalData = JSON.parse(loggedInUser);
  const userId = finalData._id;
  const { data, isSuccess } = GetUserData(userId);
  const apiData = data?.data?.data;

  const confirmModal = (id) => {
    setRowId(id);
    setOpenModal(true);
  };

  const deleteProjectData = useMutation(() => {
    return axiosInstance.delete(`http://localhost:5233/delete-user/${rowId}`);
  });

  const editTask = (id) => {
    navigate("/editTask", { state: id});
  };

  const ddMMYY = (date) => {
    const d = new Date(date);
    const finalDate = d.toLocaleDateString();
    return finalDate;
  };

  return (
    <>
      <Box>
        {openModal && (
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="Delete Project Detail"
            message="Are you sure you want to delete?"
            submit={() => {
              deleteProjectData.mutate(rowId);
              setOpenModal(false);
            }}
          />
        )}
      </Box>

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
              <CustomTableHead>Actions</CustomTableHead>
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
                <CustomTableCell>{row.projectName}</CustomTableCell>
                <CustomTableCell>{ddMMYY(row.date)}</CustomTableCell>
                <CustomTableCell>{row.taskName}</CustomTableCell>
                <CustomTableCell>{row.taskDescription}</CustomTableCell>
                <CustomTableCell>{row.hours}</CustomTableCell>
                <CustomTableCell>
                  {row.status == true ? "Approved" : "Pending"}
                </CustomTableCell>
                <CustomTableCell>
                  <CustomEditButton onClick={() => editTask(row._id, row.userId)}>
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

                  <CustomDeleteButton onClick={() => confirmModal(row._id)}>
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
