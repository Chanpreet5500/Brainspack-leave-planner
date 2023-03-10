import React from "react";
import { Input, Grid, Typography, Paper, Button } from "@mui/material";
import { Formik } from "formik";
import { ForgotPasswordData } from "../ReactQuery/CustomHooks/LeavePlanner";
import { mergeSlotProps } from "@mui/base";

function ForgotComponent() {
  // const userData = JSON.parse(localStorage.getItem('value'))

  // const userId = userData._id

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
    marginTop: "65px",
    marginBottom: "20px",
    borderColor: "green",
  };

  const loginButton = {
    marginRight: "10px",
    backgroundColor: "#26b78a",
  };

  const loginButtonParent = {
    marginBottom: "20px",
  };

  const hookData = ForgotPasswordData();

  const { mutate } = hookData

  const submitValue = (props) => {
    const userData = {
      email : props.values.email
    };
    mutate(userData)
    
  };

  return (
    <>
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

          <Formik
            initialValues={{
              email: "",
            }}
            validate={(values) => {
              console.log(values, "VALUES")
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              }
              return errors;
            }}
          >
            {(props) => {
              return (
                <Grid sx={popupFieldsParent}>
                  <Typography
                    variant="h5"
                    style={{ marginTop: "1rem", fontSize: "40px" }}
                  >
                    Forgot Password
                  </Typography>
                  <Input
                    name="email"
                    placeholder="Enter Email"
                    onChange={props.handleChange}
                    sx={inputFieldEmail}
                  />

                  <Grid sx={loginButtonParent}>
                    <Button
                      variant="contained"
                      sx={loginButton}
                      onClick={() => submitValue(props)}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              );
            }}
          </Formik>
        </Paper>
      </Grid>
    </>
  );
}

export default ForgotComponent;
