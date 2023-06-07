import React, { useEffect } from "react";
import { Typography, Box, Avatar, Button } from "@mui/material";
import { LoginUserProfileDetails } from "../ReactQuery/CustomHooks/LeavePlanner";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { LocalPhone, MailOutlineOutlined } from "@mui/icons-material";

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
    if (profileDetails) {
      localStorage.setItem("value", JSON.stringify(profileDetails));
    }
  }, [profileDetails]);

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
                fontFamily: "'Roboto', sans-serif",
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
            <Typography sx={{ fontFamily: "'Roboto', sans-serif" }}>
              {profileDetails?.designation}
            </Typography>
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
                  textTransform: "capitalize",
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
    </>
  );
}

export default ProfileComponent;
