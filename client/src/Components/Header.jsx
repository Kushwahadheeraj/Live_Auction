import { Typography, Box } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={"#e0e0e0"}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {"Antique Auctions"}
      </Typography>
      <Typography variant="h5" color={"#70d8bd"}>
        {"DASHBOARD"}
      </Typography>
    </Box>
  );
};

export default Header;