import React from "react";
import {
  Paper,
  Typography,
  Input,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { Formik } from "formik";
import { RegisterData } from "../ReactQuery/CustomHooks/LeavePlanner";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format } from "date-fns";

function RegisterComponent() {
  const parentPopup = {
    width: "40%",
    margin: "44px 0 44px 590px",
    textAlign: "center",
    position: "relative",
    zIndex: 10,
    alignContent: "flex-end",
  };

  const popupFieldsParent = {
    backgroundColor: "#c9c9c9e0;",
    paddingTop: "30px",
    paddingLeft: "17px",
    height: "630px",
    position: "relative",
    zIndex: 10,
  };

  const loginButton = {
    backgroundColor: "#26b78a",
  };

  const textFieldEmail = {
    marginBottom: "13px",
    marginLeft: "50px",
    width: "70%",
    height: "56px",
  };

  const imageParent = {
    height: "630px",
    width: "30%",
    position: "absolute",
    zIndex: 11,
    margin: "44px 0 0 170px",
    borderRadius: "0",
    overflow: "hidden",
  };

  const pageHeading = {
    backgroundColor: "black",
    color: "White",
    margin: "140px 0 0 50px",
   
  };

  const mainImage = {
    height: "330px",
    width: "35%",
    position: "absolute",
    zIndex: 11,
    margin: "110px 0 0 60px",
  };

  const rightFullStop = {
    fontSize: "60px",
    position: "absolute",
    zIndex: 11,
    left: "47px",
    marginTop: "-24px",
  };
  const rightFullStop2 = {
    fontSize: "60px",
    position: "absolute",
    zIndex: 11,
    left: "47px",
    marginTop: "-71px",
  };

 
  const leftDot = {
    position: "absolute",
    zIndex: 12,
    color: "white",
    fontSize: "60px",
    position: "absolute",
    zIndex: 12,
    top: "6px",
    right: "15px",
  };

  const secondLeftDot = {
    position: "absolute",
    zIndex: 12,
    color: "white",
    fontSize: "60px",
    position: "absolute",
    zIndex: 12,
    top: "75px",
    right: "15px",
  };
  const thirdLeftDot = {
    position: "absolute",
    zIndex: 12,
    color: "white",
    fontSize: "60px",
    position: "absolute",
    zIndex: 12,
    top: "144px",
    right: "15px",
  };
  const fourthLeftDot = {
    position: "absolute",
    zIndex: 12,
    color: "white",
    fontSize: "60px",
    position: "absolute",
    zIndex: 12,
    top: "212px",
    right: "15px",
  };
  const fifthLeftDot = {
    position: "absolute",
    zIndex: 12,
    color: "white",
    fontSize: "60px",
    position: "absolute",
    zIndex: 12,
    top: "281px",
    right: "15px",
  };
  const sixthLeftDot = {
    position: "absolute",
    zIndex: 12,
    color: "white",
    fontSize: "60px",
    position: "absolute",
    zIndex: 12,
    top: "351px",
    right: "15px",
  };
  const seventhLeftDot = {
    position: "absolute",
    zIndex: 12,
    color: "white",
    fontSize: "60px",
    position: "absolute",
    zIndex: 12,
    top: "420px",
    right: "15px",
  };

  const navigate = useNavigate();

  const { mutate, data, isSuccess } = RegisterData();

  const RegisterDataValues = (props) => {
   

    const date = props.values.birthDate.$d;
    const finalBirthdate = format(date, "MM/dd/yyyy");

    const data = {
      firstName: props.values.firstName,
      lastName: props.values.lastName,
      phoneNumber: props.values.phoneNumber,
      designation: props.values.designation,
      email: props.values.email,
      password: props.values.password,
      birthdate: finalBirthdate,
      gender: props.values.gender,
    };

    mutate(data);
  };

  if (data && isSuccess) {
    navigate("/");
  }
  const selectLeaveType = {
   
    width: "100%",
    boxShadow: "none",

    ".MuiOutlinedInput-notchedOutline": {
      border: 0,
      borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
      borderRadius: "0px",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
      borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
    },
    textAlign: "left",
    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ":
      {
        padding: "11px 1px",
      },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      top: "calc(60% - 0.5em)",
    },
  };

  return (
    <>
      <Grid
        style={{
          background:
            "linear-gradient(to right bottom, rgb(81 155 99), rgb(0 0 0 / 95%))",
          height: "100vh",
          paddingTop: "1px",
        }}
      >
        <Paper elevation={20} sx={imageParent}>
          <Grid sx={mainImage}>
            <img
              src="Group 3 (2).svg"
              style={{
                height: "167px",
                marginLeft: "-35px",
                marginTop: "-115px",
              }}
            />
          </Grid>

          <Grid style={{ width: "35%" }}>
            <img
              src="Shaping The Fututre Of Your Business With Web.png"
              style={{ height: "682px", position: "absolute", zIndex: 10 }}
            />
          </Grid>

          <Grid sx={pageHeading}>
            <Typography
              variant="h5"
              style={{
                fontSize: "21px",
                marginLeft: "75px",
                position: "absolute",
                zIndex: 10,
              }}
            >
              Shaping The Future Of Business With Web
            </Typography>
          </Grid>

          <Grid style={{ height:'630px' }}>
            <Grid >
              <Typography variant="span" sx={leftDot}>
                .
              </Typography>
              <Typography
                variant="span"
                style={{
                  fontSize: "40px",
                  color: "white",
                  position: "absolute",
                  right: "0",
                  top: "17px",
                  zIndex: 10,
                }}
              >
                _
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="span" sx={secondLeftDot}>
                .
              </Typography>
              <Typography
                variant="span"
                style={{
                  fontSize: "40px",
                  color: "white",
                  position: "absolute",
                  right: "0",
                  top: "86px",
                  zIndex: 10,
                }}
              >
                _
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="span" sx={thirdLeftDot}>
                .
              </Typography>
              <Typography
                variant="span"
                style={{
                  fontSize: "40px",
                  color: "white",
                  position: "absolute",
                  right: "0",
                  top: "155px",
                  zIndex: 10,
                }}
              >
                _
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="span" sx={fourthLeftDot}>
                .
              </Typography>
              <Typography
                variant="span"
                style={{
                  fontSize: "40px",
                  color: "white",
                  position: "absolute",
                  right: "0",
                  top: "223px",
                  zIndex: 10,
                }}
              >
                _
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="span" sx={fifthLeftDot}>
                .
              </Typography>
              <Typography
                variant="span"
                style={{
                  fontSize: "40px",
                  color: "white",
                  position: "absolute",
                  right: "0",
                  top: "292px",
                  zIndex: 10,
                }}
              >
                _
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="span" sx={sixthLeftDot}>
                .
              </Typography>
              <Typography
                variant="span"
                style={{
                  fontSize: "40px",
                  color: "white",
                  position: "absolute",
                  right: "0",
                  top: "362px",
                  zIndex: 10,
                }}
              >
                _
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="span" sx={seventhLeftDot}>
                .
              </Typography>
              <Typography
                variant="span"
                style={{
                  fontSize: "40px",
                  color: "white",
                  position: "absolute",
                  right: "0",
                  top: "431px",
                  zIndex: 10,
                }}
              >
                _
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            designation: "",
            birthDate: "",
            gender: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (!values.password) {
              errors.password = "Required";
            } else if (!values.firstName) {
              errors.firstName = "Required";
            } else if (!values.lastName) {
              errors.lastName = "Required";
            } else if (!values.phoneNumber) {
              errors.phoneNumber = "Required";
            } else if (!values.designation) {
              errors.designation = "Required";
            } else if (!values.birthDate) {
              errors.birthDate = "Required";
            } else if (!values.gender) {
              errors.gender = "Required";
            }
            return errors;
          }}
        >
          {(props) => {
            return (
              <Paper elevation={20} sx={parentPopup}>
                <Grid sx={popupFieldsParent}>
                  <Grid>
                    <Grid>
                      <Typography variant="span" sx={rightFullStop}>
                        .
                      </Typography>
                      <Typography
                        variant="span"
                        style={{
                          fontSize: "40px",
                          color: "black",
                          position: "absolute",
                          left: "31px",
                          top: "17px",
                        }}
                      >
                        _
                      </Typography>
                    </Grid>
                    <Input
                      name="email"
                      onChange={props.handleChange}
                      label="Email"
                      placeholder="Enter Email"
                      sx={textFieldEmail}
                    />

                    <Typography
                      variant="span"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        position: "absolute",
                        zIndex: 13,
                        top: "90px",
                        left: "120px",
                      }}
                    >
                      {props.errors.email}
                    </Typography>
                    <Grid>
                      <Typography variant="span" sx={rightFullStop}>
                        .
                      </Typography>
                      <Typography
                        variant="span"
                        style={{
                          fontSize: "40px",
                          color: "black",
                          position: "absolute",
                          left: "31px",
                          top: "86px",
                        }}
                      >
                        _
                      </Typography>
                    </Grid>

                    <Input
                      name="password"
                      onChange={props.handleChange}
                      type="password"
                      placeholder="Enter Password"
                      sx={textFieldEmail}
                    />

                    <Typography
                      variant="span"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        position: "absolute",
                        zIndex: 13,
                        top: "160px",
                        left: "120px",
                      }}
                    >
                      {props.errors.password}
                    </Typography>
                  </Grid>

                  <Grid>
                    <Grid>
                      <Typography variant="span" sx={rightFullStop}>
                        .
                      </Typography>
                      <Typography
                        variant="span"
                        style={{
                          fontSize: "40px",
                          color: "black",
                          position: "absolute",
                          left: "31px",
                          top: "155px",
                        }}
                      >
                        _
                      </Typography>
                    </Grid>

                    <Input
                      name="firstName"
                      label="First Name"
                      onChange={props.handleChange}
                      placeholder="Enter First Name"
                      sx={textFieldEmail}
                    />

                    <Typography
                      variant="span"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        position: "absolute",
                        zIndex: 13,
                        top: "230px",
                        left: "120px",
                      }}
                    >
                      {props.errors.firstName}
                    </Typography>

                    <Grid>
                      <Typography variant="span" sx={rightFullStop}>
                        .
                      </Typography>
                      <Typography
                        variant="span"
                        style={{
                          fontSize: "40px",
                          color: "black",
                          position: "absolute",
                          left: "31px",
                          top: "224px",
                        }}
                      >
                        _
                      </Typography>
                    </Grid>
                    <Input
                      name="lastName"
                      onChange={props.handleChange}
                      placeholder="Enter Last Name"
                      sx={textFieldEmail}
                    />

                    <Typography
                      variant="span"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        position: "absolute",
                        zIndex: 13,
                        top: "300px",
                        left: "120px",
                      }}
                    >
                      {props.errors.lastName}
                    </Typography>
                  </Grid>
                  <Grid
                    style={{
                      width: "70%",
                      display: "flex",
                      justifyContent: "center",
                      marginLeft:'112px',
                    }}
                  >
                    <Select
                      labelId="gender"
                      defaultValue=""
                      label="Gender"
                      value={props.values.gender}
                      onChange={props.handleChange}
                      name="gender"
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <Box component="span">Select Gender</Box>;
                        }

                        return selected;
                      }}
                      displayEmpty
                      sx={selectLeaveType}
                    >
                      {" "}
                      <MenuItem disabled value="">
                        Select Gender
                      </MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </Grid>
                  <Grid>
                    <Grid>
                      <Typography variant="span" sx={rightFullStop2}>
                        .
                      </Typography>

                      <Typography
                        variant="span"
                        style={{
                          fontSize: "40px",
                          color: "black",
                          position: "absolute",
                          left: "31px",
                          top: "293px",
                        }}
                      >
                        _
                      </Typography>
                    </Grid>
                    <Input
                      name="phoneNumber"
                      onChange={props.handleChange}
                      placeholder="Enter Phone Number"
                      sx={textFieldEmail}
                    />

                    <Typography
                      variant="span"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        position: "absolute",
                        zIndex: 13,
                        top: "370px",
                        left: "120px",
                      }}
                    >
                      {props.errors.phoneNumber}
                    </Typography>
                    <Grid>
                      <Typography variant="span" sx={rightFullStop2}>
                        .
                      </Typography>
                      <Typography
                        variant="span"
                        style={{
                          fontSize: "40px",
                          color: "black",
                          position: "absolute",
                          left: "31px",
                          top: "362px",
                        }}
                      >
                        _
                      </Typography>
                    </Grid>

                    <Input
                      name="designation"
                      onChange={props.handleChange}
                      placeholder="Enter Your Designation"
                      sx={textFieldEmail}
                    />

                    <Typography
                      variant="span"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        position: "absolute",
                        zIndex: 13,
                        top: "440px",
                        left: "120px",
                      }}
                    >
                      {props.errors.designation}
                    </Typography>
                  </Grid>

                  <Grid>
                    <Typography variant="span" sx={rightFullStop2}>
                      .
                    </Typography>
                    <Typography
                      variant="span"
                      style={{
                        fontSize: "40px",
                        color: "black",
                        position: "absolute",
                        left: "31px",
                        top: "431px",
                      }}
                    >
                      _
                    </Typography>
                  </Grid>

               
                  <Grid style={{ marginBottom: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="birthDate"
                        label="Enter Your Birthday"
                        value={props.values.birthDate}
                        onChange={(value) =>
                          props.setFieldValue("birthDate", value, "true")
                        }
                        renderInput={(e) => <TextField {...e} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Button
                    variant="contained"
                    onClick={() => RegisterDataValues(props)}
                    sx={loginButton}
                  >
                    Register
                  </Button>
                </Grid>
              </Paper>
            );
          }}
        </Formik>
      </Grid>
    </>
  );
}

export default RegisterComponent;
