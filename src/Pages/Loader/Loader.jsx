import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: 'rgba(0,0,0, 0.2)',
        position:'absolute',
        top:0,
        left:0,
        
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
