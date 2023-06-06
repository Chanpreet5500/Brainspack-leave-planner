import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateProfileDetails } from "../ReactQuery/CustomHooks/LeavePlanner";
import { Field, Form, Formik } from "formik";
import validationSchema from "./validationSchema";
import { ErrorText } from "../TimeTracker/AddTask/EditStyled";

const defaultTheme = createTheme();

export default function EditProfile() {
  const location = useLocation();
  const data = location?.state?.data;

  const initialValues = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    phoneNumber: data?.phoneNumber,
    designation: data?.designation,
    _id: data?._id,
  };

  const { mutate } = UpdateProfileDetails();
  const navigate = useNavigate();

  const updateUserDetails = (values) => {
    mutate(values);
    navigate("/profile");
  };

  return (
    <>
      <Box
        sx={{
          marginTop: "10px",
          width: "100%",
          height: "90vh",
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(90deg, rgba(85,173,136,1) 31%, rgba(17,98,64,1) 62%)",
        }}
      >
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            p: 3.5,
            borderRadius: "8px",
            boxShadow: "0px 0px 2px 0px",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit User Details
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => updateUserDetails(values)}
            >
              {(props) => {
                console.log(props.values, "props of form");
                return (
                  <>
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="firstName"
                            label="First Name"
                            value={props.values.firstName}
                            onChange={props.handleChange}
                          />
                          {props.errors.firstName && props.touched.firstName ? (
                            <ErrorText>{props.errors.firstName}</ErrorText>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            label="Last Name"
                            name="lastName"
                            value={props.values.lastName}
                            onChange={props.handleChange}
                          />
                          {props.errors.lastName && props.touched.lastName ? (
                            <ErrorText>{props.errors.lastName}</ErrorText>
                          ) : null}
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label="Email Address"
                            name="email"
                            fullWidth
                            value={props.values.email}
                            onChange={props.handleChange}
                          />
                          {props.errors.email && props.touched.email ? (
                            <ErrorText>{props.errors.email}</ErrorText>
                          ) : null}
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="phoneNumber"
                            label="Phone Number"
                            fullWidth
                            value={props.values.phoneNumber}
                            onChange={props.handleChange}
                          />
                          {props.errors.phoneNumber &&
                          props.touched.phoneNumber ? (
                            <ErrorText>{props.errors.phoneNumber}</ErrorText>
                          ) : null}
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="designation"
                            label="Designation"
                            fullWidth
                            value={props.values.designation}
                            onChange={props.handleChange}
                          />
                          {props.errors.designation &&
                          props.touched.designation ? (
                            <ErrorText>{props.errors.designation}</ErrorText>
                          ) : null}
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={props.handleSubmit}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Update
                      </Button>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
}
