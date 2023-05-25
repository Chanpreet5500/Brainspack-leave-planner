import React from "react";
import { Input, Grid, Typography, Paper, Button } from "@mui/material";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { CreatingNewPassword } from "../ReactQuery/CustomHooks/LeavePlanner";

function CreateNewPasswordComponent() {
  // const userData = JSON.parse(localStorage.getItem('value'))

  // const userId = userData._id

  const { token } = useParams();

  const { mutate, isSuccess } = CreatingNewPassword();

  const navigate = useNavigate();

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

  const submitValue = (props) => {
    const userData = {
      newPassword: props.values.password,
      confirmPassword: props.values.confirmPassword,
      token: token,
    };

    mutate(userData);

    if (isSuccess) {
      navigate("/");
    }
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
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              console.log(values, "VALUES");
              const errors = {};
              if (!values.password) {
                errors.password = "Required";
              } else if (!values.confirmPassword) {
                errors.confirmPassword = "Required";
              }
              return errors;
            }}
          >
            {(props) => {
              console.log(props, "PROPS");
              return (
                <Grid sx={popupFieldsParent}>
                  <Typography
                    variant="h5"
                    style={{ marginTop: "1rem", fontSize: "40px" }}
                  >
                    Create New Password
                  </Typography>
                  <Grid
                    style={{
                      display: "flex",
                      width: "45%",
                      margin: "0 auto",
                      flexDirection: "column",
                    }}
                  >
                    <Input
                      name="password"
                      placeholder="Enter Password"
                      onChange={props.handleChange}
                      sx={inputFieldEmail}
                    />

                    <Input
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={props.handleChange}
                      sx={inputFieldEmail}
                    />
                  </Grid>
                  <Grid sx={loginButtonParent}>
                    <Button
                      variant="contained"
                      sx={loginButton}
                      onClick={() => submitValue(props)}
                    >
                      Create
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

export default CreateNewPasswordComponent;
