import {
  Box,
  Button,
  InputBase,
  Table,
  TableBody,
  TableHead,
  TableRow,
  alpha,
} from "@mui/material";
import React from "react";
import { CustomTableCell, CustomTableHead } from "../TimeTracker/styled";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "@emotion/styled";
import SearchIcon from '@mui/icons-material/Search';
const ManageEmployees = () => {
  const tableHeader = [
    "Sr.No.",
    "Employee Name",
    "Email",
    "Phone No.",
    "Designation",
    "",
  ];
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <>
      <Box sx={{ margin: "40px" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Table sx={{ flex: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeader.map((element, index) => {
                return <CustomTableHead key={index}>{element}</CustomTableHead>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ cursor: "url(Logo-light-versuion.png)" }}>
              <CustomTableCell>1.</CustomTableCell>
              <CustomTableCell>Tushar Maheshwari</CustomTableCell>
              <CustomTableCell>jai@yoyo.com</CustomTableCell>
              <CustomTableCell>7418529632</CustomTableCell>
              <CustomTableCell>Intern Trainee</CustomTableCell>

              <CustomTableCell>
                <MoreHorizIcon sx={{ cursor: "pointer" }} />
              </CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default ManageEmployees;
