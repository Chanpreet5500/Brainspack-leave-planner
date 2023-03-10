import React, { useState } from "react";
import {
  Input,
  Grid,
  Typography,
  Paper,
  Button,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { LoginData } from "../ReactQuery/CustomHooks/LeavePlanner";
import { Formik } from "formik";

function googleAuthentication() {
  window.open("http://localhost:5233/google", "_blank");
}

function LoginComponent () {

  const parentPopup = {
    width: "60%",
    margin: "110px auto",
    alignContent: "center",
    textAlign: "center",
    height: "400px",
    display: "flex",
  };

  const popupImageParent = {
    width: "40%",
    backgroundColor: "black",
    paddingTop: "7rem",
  };

  const popupFieldsParent = {
    width: "60%",
    backgroundColor: "#c9c9c9e0;",
  };

  const inputFieldEmail = {
    marginTop: "35px",
    width: "70%",
    marginBottom: "30px",
  };

  const loginButton = {
    marginRight: "10px",
    backgroundColor: "#26b78a",
  };

  const registerButton = {
    marginRight: "10px",
    backgroundColor: "#26b78a",
  };

  const googleIcon = {
    paddingLeft: "10px",
  };

  const logo = {
    height: "63px",
  };

  const loginButtonParent = {
    marginBottom: "20px",
  };

  const forgotPasswordLink = {
    marginBottom: "20px",
  };

  const forgotPasswordText = {
    fontSize: "12px",
    marginLeft: "135px",
    textDecoration: "none",
  };

  const textFields = {
    display: "flex",
    flexDirection: "column",
    marginLeft: "104px",
  };

  const inputFieldPassword = {
    width: "70%",
  };

  const navigate = useNavigate();

  const { mutate, data, isSuccess } = LoginData();

  const gettingToken = data?.data;

  const token = gettingToken?.token;

  const loggedInUserData = gettingToken?.data;

  function LoginValues(props) {
    const values = {
      email: props.values.email,
      password: props.values.password,
    };

    let x = mutate(values);
    return x;
  }

  if (token && data && isSuccess && loggedInUserData) {
    localStorage.setItem("tokenn", token);
    localStorage.setItem("value", JSON.stringify(loggedInUserData));

    return navigate("/dashboard");
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {(props) => {
          return (
            <Grid
              style={{
                background:
                  "linear-gradient(to right bottom, rgb(81 155 99), rgb(0 0 0 / 95%))",
                height: "636px",
                paddingTop: "20px",
              }}
            >
              <Paper elevation={20} sx={parentPopup}>
                <Grid sx={popupImageParent}>
                  <img src="Group 3 (2).svg" style={{ height: "120px" }} />
                </Grid>

                <Grid sx={popupFieldsParent}>
                  <Typography
                    variant="h5"
                    style={{ marginTop: "1rem", fontSize: "35px" }}
                  >
                    Employee Management
                  </Typography>

                  <Grid sx={textFields}>
                    <Input
                      name="email"
                      placeholder="Enter email"
                      onChange={props.handleChange}
                      sx={inputFieldEmail}
                    />
                    <Typography
                      variant="span"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        position: "absolute",
                        zIndex: 13,
                        top: "265px",
                      }}
                    >
                      {props.errors.email}
                    </Typography>
                    <Input
                      name="password"
                      placeholder="Enter Password"
                      onChange={props.handleChange}
                      type="password"
                      sx={inputFieldPassword}
                    />

                    <Typography
                      variant="span"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        position: "absolute",
                        zIndex: 13,
                        top: "328px",
                      }}
                    >
                      {props.errors.password}
                    </Typography>
                  </Grid>

                  <Box sx={forgotPasswordLink}>
                    <Link
                      to="/forgot"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography variant="span" sx={forgotPasswordText}>
                        Forgot Password?
                      </Typography>
                    </Link>
                  </Box>

                  <Grid sx={loginButtonParent}>
                    <Button
                      variant="contained"
                      sx={loginButton}
                      onClick={() => LoginValues(props)}
                    >
                      Login
                    </Button>

                    <Link to="/register" style={{ textDecoration: "none" }}>
                      <Button variant="contained" sx={registerButton}>
                        Register
                      </Button>
                    </Link>
                  </Grid>

                  <Button variant="contained" onClick={googleAuthentication}>
                    Sign In with google <GoogleIcon sx={googleIcon} />
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginComponent;
