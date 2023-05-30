import React, { useState, useEffect } from "react";
import {
  Input,
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { LoginAdmin, LoginData } from "../ReactQuery/CustomHooks/LeavePlanner";
import { Formik } from "formik";
import * as Yup from "yup";

function googleAuthentication() {
  window.open("http://localhost:5233/google", "_blank");
}

function Login() {
  const [role, setRole] = useState("client");

  const parentPopup = {
    width: "60%",
    margin: "110px auto",
    alignContent: "center",
    textAlign: "center",
    height: "500px",
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

  const {
    mutate: admin,
    data: adminData,
    isSuccess: adminSuccess,
  } = LoginAdmin();
  const {
    mutate: client,
    data: clientData,
    isSuccess: clientSuccess,
  } = LoginData();

  function LoginValues(props) {
    console.log(props.role);
    const values = {
      email: props.email,
      password: props.password,
      role: props.role,
    };

    if (role == "admin") {
      admin(values);
    } else {
      client(values);
    }
  }

  useEffect(() => {
    if (role == "admin") {
      const gettingToken = adminData?.data;

      const token = gettingToken?.token;

      const loggedInAdminData = gettingToken?.data;

      console.log(token, adminData, adminSuccess, loggedInAdminData);

      if (token && adminData && adminSuccess && loggedInAdminData) {
        localStorage.setItem("admintoken", token);
        localStorage.setItem("value", JSON.stringify(loggedInAdminData));
        console.log("function called");
        return navigate("/hello");
      }
    } else {
      const gettingClientToken = clientData?.data;

      const clientToken = gettingClientToken?.token;

      const loggedInUserData = gettingClientToken?.data;

      if (clientToken && clientData && clientSuccess && loggedInUserData) {
        localStorage.setItem("tokenn", clientToken);
        localStorage.setItem("value", JSON.stringify(loggedInUserData));

        return navigate("/dashboard");
      }
    }
  }, [adminData, clientData]);

  const validationSchema = Yup.object({
    email: Yup.string().required("Please enter email"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Please select a role"),
  });

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          role: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => LoginValues(data)}
      >
        {(props) => {
          return (
            <Grid
              style={{
                background:
                  "linear-gradient(to right bottom, rgb(81 155 99), rgb(0 0 0 / 95%))",
                height: "700px",
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
                  <Box>
                    <FormControl
                      sx={{
                        width: "450px",
                        marginTop: "30px",
                      }}
                    >
                      <InputLabel>Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        value={role}
                        onChange={(e) => {
                          props.handleChange(e);
                          setRole(e.target.value);
                        }}
                        label="Role"
                      >
                        <MenuItem value="client">Client</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                      <Typography
                        variant="span"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          position: "absolute",
                          zIndex: 13,
                          top: "60px",
                        }}
                      >
                        {props.errors.role}
                      </Typography>
                    </FormControl>
                  </Box>
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
                      onClick={() => props.handleSubmit(props)}
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
}

export default Login;
