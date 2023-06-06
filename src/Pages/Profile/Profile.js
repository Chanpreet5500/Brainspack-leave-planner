import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Input, Grid, Typography, Box, Avatar, Button } from "@mui/material";
import { LoginUserProfileDetails } from "../ReactQuery/CustomHooks/LeavePlanner";
import {
  KeyboardArrowLeft,
  KeyboardArrowLeftOutlined,
  LocalPhone,
  MailOutlineOutlined,
} from "@mui/icons-material";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

function ProfileComponent() {
  const userValues = localStorage.getItem("value");
  const finalUserValues = JSON.parse(userValues);

  const navigate = useNavigate();

  const { data, refetch, isFetching } = LoginUserProfileDetails(
    finalUserValues?._id
  );
  const profileDetails = data?.data?.data;
  const createdAtDate = new Date(profileDetails?.createdAt);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {isFetching ? <Loader /> : ""}
      <Box
        sx={{
          background: "#f3f3f3",

          width: "100vw",
          height: "90vh",
          marginTop: "10px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(163deg, rgba(92,191,149,1) 14%, rgba(55,154,113,1) 35%, rgba(24,108,72,1) 54%, rgba(5,71,43,1) 78%)",

            width: "27%",

            borderRadius: "8px",
            p: "30px 20px",
            boxShadow: "0px 0px 2px 0px",
          }}
        >
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Box>
              <Avatar
                sx={{
                  width: 160,
                  height: 160,
                  cursor: "pointer",
                  boxShadow: "1px 2px 4px 0px black",
                }}
                src={
                  profileDetails?.gender == "male"
                    ? "/maleavatar2.png"
                    : "/femaleavatar.png"
                }
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "22px",
              color: "#fff",
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "bold",
                letterSpacing: "2px",
                fontFamily: "'Roboto', sans-serif"
              }}
            >
              {profileDetails?.firstName} {profileDetails?.lastName}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <Typography sx={{fontFamily: "'Roboto', sans-serif"}}>{profileDetails?.designation}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
                color: "#dee3e7",
                marginTop: "15px",
                p: "7px",
              }}
            >
              <Box component="span">
                <LocalPhone />
              </Box>
              <Typography>{profileDetails?.phoneNumber}</Typography>
            </Box>
            <Box
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
                color: "#dee3e7",
                // marginTop: "15px",
                p: "7px",
              }}
            >
              <Box component="span">
                <MailOutlineOutlined />
              </Box>
              <Typography>{profileDetails?.email}</Typography>
            </Box>
            <Box
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
                color: "#dee3e7",

                p: "7px",
              }}
            >
              <Box component="span">Gender</Box>
              <Typography>{profileDetails?.gender}</Typography>
            </Box>
            <Box
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
                color: "#dee3e7",

                p: "7px",
              }}
            >
              <Box component="span">Date of birth </Box>
              <Typography>{profileDetails?.birthDate}</Typography>
            </Box>
            <Box
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
                color: "#dee3e7",

                p: "7px",
              }}
            >
              <Box component="span">Member Since </Box>
              <Typography>{createdAtDate.toLocaleDateString()}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                mt: "20px",
                ml: "7px",
              }}
            >
              <Button
                sx={{
                  color: "#fff",
                textTransform:'capitalize',
                
                }}
                variant="contained"
                onClick={() =>
                  navigate("/edit-profile", { state: { data: profileDetails } })
                }
              >
                Edit Details
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ================================================================================================== */}
      {/* <Box
        sx={{
          // background:
          //   " linear-gradient(to left top,  rgba(51, 51, 51, 1) 0%,  rgb(0 0 0 / 90%)  ,rgba(85 173 136), rgba(51, 51, 51, 1)   100% )",
          background:
            "linear-gradient(to right bottom, rgb(81, 155, 99), rgba(0, 0, 0, 0.95))",
          width: "100vw",
          height: "95vh",
          marginTop: "10px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            width: "30%",

            borderRadius: "8px",
            p: "30px 20px",
            boxShadow: "0px 0px 2px 0px",
          }}
        >
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Box>
              <Avatar
                sx={{ width: 80, height: 80, cursor: "pointer" }}
                src="/broken-image.jpg"
              />
            </Box>
          </Box>
          <Box
            sx={{
              margin: "20px 10px 0px",
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
              padding: "15px 8px",
            }}
          >
            <Typography sx={{ color: "#726f6f" }}>Your User Name</Typography>
            <Typography>
              {profileDetails?.firstName} {profileDetails?.lastName}
            </Typography>
          </Box>

          <Box
            sx={{
              margin: "10px 10px 0px",
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
              padding: "15px 8px",
            }}
          >
            <Typography sx={{ color: "#726f6f" }}>Your E-mail</Typography>
            <Typography>{profileDetails?.email}</Typography>
          </Box>

          <Box
            sx={{
              margin: "10px 10px 0px",
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
              padding: "15px 8px",
            }}
          >
            <Typography sx={{ color: "#726f6f" }}>Your Phone</Typography>
            <Typography>{profileDetails?.phoneNumber}</Typography>
          </Box>

          <Box
            sx={{
              margin: "10px 10px 0px",
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
              padding: "15px 8px",
            }}
          >
            <Typography sx={{ color: "#726f6f" }}>Date of birth</Typography>
            <Typography>{profileDetails?.birthDate}</Typography>
          </Box>

          <Box
            sx={{
              margin: "10px 10px 0px",
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
              padding: "15px 8px",
            }}
          >
            <Typography sx={{ color: "#726f6f" }}>Member Since</Typography>
            <Typography>{createdAtDate.toLocaleDateString()}</Typography>
          </Box>

          <Box
            sx={{
              margin: "10px 10px 20px",
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
              padding: "15px 8px",
            }}
          >
            <Typography sx={{ color: "#726f6f" }}>Designation</Typography>
            <Typography>{profileDetails?.designation}</Typography>
          </Box>
          <Box
            sx={{
              margin: "10px 10px 20px",
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
              padding: "15px 8px",
            }}
          >
            <Typography sx={{ color: "#726f6f" }}>Gender</Typography>
            <Typography>{profileDetails?.gender}</Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              variant="contained"
              onClick={() =>
                navigate("/edit-profile", { state: { data: profileDetails } })
              }
            >
              Edit Details
            </Button>
          </Box>
        </Box>
      </Box> */}

      {/* ==================================================================================================== */}

      {/* <Box
        sx={{
          backgroundColor: "#ced5df",
          width: "100vw",
          height: "90vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          sx={{
            width: "40%",
            height: "85%",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" sx={{ fontSize: "28px" }}>
            {finalUserValues.firstName} {finalUserValues.lastName}
          </Typography>

          <Typography variant="h4" sx={{ fontSize: "16px", color: "gray" }}>
            {finalUserValues.email}
          </Typography>

          <Box>
            <Avatar sx={{ width: 100, height: 100 }} src="/broken-image.jpg" />
          </Box>
          <Typography variant="h4" sx={{ fontSize: "20px", color: "gray" }}>
            {finalUserValues.role}
          </Typography>
          <Typography variant="h4" sx={{ fontSize: "18px", color: "gray" }}>
            Birth Year :-{" "}
            <Box component="span" sx={{ color: "black" }}>
              {birthdateYear} {months[+birthDateMonth]} {birthDate}
            </Box>
          </Typography>

          <Button variant="contained">Edit User</Button>
        </Box>
      </Box> */}

      {/* =========================================================================================== */}

      {/* <Grid sx={dashboardParent}>
        
        <Grid>
          <Typography variant="h5" style={{fontSize: '4rem', padding: '20px 0 20px 30px'}}>User Information :- </Typography>
        </Grid>
        
      
            <Formik
                initialValues = {{
                    firstName : finalUserValues?.firstName,
                    lastName : finalUserValues?.lastName,
                    email : finalUserValues?.email,
                    birthday : finalUserValues?.birthDate,
                    designation : finalUserValues?.designation
                }}
                validate = {(values) => {
                    const errors = {}
                    if(!values.email){
                        errors.email = 'Required'
                    } else if(!values.firstName){
                        errors.firstName = 'Required'
                    } else if(!values.lastName){
                        errors.lastName = 'Required'
                    } else if(!values.birthday){
                        errors.birthday = 'Required'
                    } else if(!values.designation){
                        errors.designation = 'Required'
                    } else if(!values.password){
                        errors.password = 'Required'
                    } 
                        return errors;
                }} >
                    {(props) => {
                       
                        return (
                            <>
                            <Grid sx={textFields}>

                                <Grid style={{display : "flex", width : '60%', justifyContent : 'space-between'}}>

                                <Input
                                    name = 'firstName'
                                    value={props.values.firstName }
                                    onChange = {props.handleChange}
                                    sx={inputFieldsWidth} />
                                <Input
                                    name = 'lastName'
                                    value={props.values.lastName }
                                    onChange = {props.handleChange}
                                    sx={inputFieldsWidth} />

                                </Grid>

                                <Grid style={{display : "flex", width : '60%', justifyContent : 'space-between'}}>

                                <Input
                                    name = 'email'
                                    value={props.values.email }
                                    onChange = {props.handleChange}
                                    sx={inputFieldsWidth} />
                                <Input
                                    name = 'birthday'
                                    value={props.values.birthday }
                                    onChange = {props.handleChange}
                                    sx={inputFieldsWidth} />

                                </Grid>
                                <Input
                                    name = 'designation'
                                    value={props.values.designation }
                                    onChange = {props.handleChange}
                                   style={{ width: '60%'}} />
                               </Grid>
                            </>
                        )
                    }}

            </Formik>
            </Grid> */}
    </>
  );
}

export default ProfileComponent;
