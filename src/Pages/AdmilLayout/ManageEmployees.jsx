import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  InputBase,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomTableCell,
  CustomTableHead,
  TableFooterNoRecord,
  UserDetailsBox,
  Username,
} from "../TimeTracker/styled";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackIosNew,
  AccountCircle,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { useQuery } from "react-query";
import axios from "axios";
const ManageEmployees = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState("");

  const navigate = useNavigate();
  const tableHeader = [
    "Sr.No.",
    "Employee Name",
    "Email",
    "Phone No.",
    "Designation",
    "",
  ];

  const usersData = [
    {
      name: "Tushar Maheshwari",
      email: "jai@yoyo.com",
      phoneNo: "7418529632",
      designation: "Intern Trainee",
    },
    {
      name: "Gourav Kashyap",
      email: "	gourav@yoyo.com",
      phoneNo: "4564565256",
      designation: "Intern Trainee",
    },
    {
      name: "Amam Sharma",
      email: "	amam@yoyo.com",
      phoneNo: "7858596589",
      designation: "Intern Trainee",
    },
    {
      name: "Vaibhav Mani",
      email: "	vaibhav@yoyo.com",
      phoneNo: "7485965652",
      designation: "Intern Trainee",
    },
  ];
  const { data, refetch } = useQuery("employee-list", () => {
    return axios.get("http://localhost:5233/getEmpList");
  });

  let employeeList = data?.data.userList;

  const searchEmployee = (event) => {
    setSearchBarValue(event.target.value);
  };
  useEffect(() => {
    
    if (searchBarValue != "" && employeeData.length > 0) {
      const filterdData = employeeData?.filter(
        (element) =>
          element.firstName
            .toLowerCase()
            .includes(searchBarValue.toLowerCase()) ||
          element.lastName.toLowerCase().includes(searchBarValue.toLowerCase())
      );

      setEmployeeData(filterdData);
    } else if (employeeList) {
      setEmployeeData(employeeList);
    }
  }, [searchBarValue, employeeList]);

  

  const admin = JSON.parse(localStorage.getItem("value"));
 
  const uniqueId = admin._id.slice(admin._id.length - 4)
 
  return (
    <>
      <Box sx={{ margin: "40px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: "25px 0px",
          }}
        >
          <UserDetailsBox>
            <ArrowBackIosNew sx={{ color: "#174dc2" }} />
            <AccountCircle sx={{ color: "#ebebeb", fontSize: "3rem" }} />
            <Username component="span">{uniqueId.toUpperCase()} - {admin.firstName} {admin.lastName}</Username>
            <KeyboardArrowDown sx={{ padding: "10px" }} />
          </UserDetailsBox>

          <TextField
            onChange={searchEmployee}
            value={searchBarValue}
            placeholder="Search Employee"
            sx={{
              "& .css-1iulo1y-MuiInputBase-root-MuiFilledInput-root": {
                background: "none",
                "&:hover": {
                  background: "none",
                },

                "&:focus-within": {
                  width: "350px",
                },
                "&:active": {
                  background: "none",
                },
              },
            }}
            variant="filled"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Table sx={{ flex: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeader.map((element, index) => {
                return <CustomTableHead key={index}>{element}</CustomTableHead>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.length ? (
              employeeData?.map((element, index) => {
                return (
                  <>
                    <TableRow sx={{ cursor: "url(Logo-light-versuion.png)" }}>
                      <CustomTableCell>{index + 1}.</CustomTableCell>
                      <CustomTableCell>
                        {`${element.firstName} ${element.lastName}`}
                      </CustomTableCell>
                      <CustomTableCell>{element.email}</CustomTableCell>
                      <CustomTableCell>{element.phoneNumber}</CustomTableCell>
                      <CustomTableCell>{element.designation}</CustomTableCell>
                      <CustomTableCell>
                        <MoreHorizIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate("/employe-details", {
                              state: { id: element._id },
                            })
                          }
                        />
                      </CustomTableCell>
                    </TableRow>
                  </>
                );
              })
            ) : (
              <CustomTableCell colSpan={6}>
                <TableFooterNoRecord>
                  <Typography>NO RECORD TO DISPLAY.....</Typography>
                </TableFooterNoRecord>
              </CustomTableCell>
            )}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default ManageEmployees;
