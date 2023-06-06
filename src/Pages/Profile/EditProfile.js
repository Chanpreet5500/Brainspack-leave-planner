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

const defaultTheme = createTheme();

export default function EditProfile() {
  const [userDetails, setUserDetails] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
  };
  const location = useLocation();
  const { data: profileDetails } = location.state;


  React.useEffect(() => {
    setUserDetails(profileDetails);
  }, [profileDetails]);

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };
  

  const { mutate } = UpdateProfileDetails();
  const navigate = useNavigate();
  const updateUserDetails = () => {
    if (
      userDetails.firstName != "" &&
      userDetails.lastName != "" &&
      userDetails.email != "" &&
      userDetails.designation != "" &&
      userDetails.phoneNumber != ""
    ) {
      mutate(userDetails);
      navigate("/profile");
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
    
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          height: "90vh",
          display: "grid",
          placeItems: "center",
          background: 'linear-gradient(to right bottom, rgb(81, 155, 99), rgba(0, 0, 0, 0.95))'
        }}
      >
        <Box
          sx={{
            width: "30%",
            // marginTop: 8,
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={userDetails?.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={userDetails?.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userDetails?.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="number"
                  id="number"
                  autoComplete="phone-number"
                  value={userDetails?.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="designation"
                  label="Designation"
                  type="text"
                  id="designation"
                  autoComplete="designation"
                  value={userDetails?.designation}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={updateUserDetails}
            >
              Update
            </Button>
            <Typography sx={{width:'100%' ,    textAlign: 'center',textDecoration:'underline',fontSize:'13px',cursor:'pointer'}}
            onClick={()=>navigate('/profile')}
            >Go Back</Typography>
          </Box>
        </Box>
      </Box>
      
      
    </ThemeProvider>
  );
}
