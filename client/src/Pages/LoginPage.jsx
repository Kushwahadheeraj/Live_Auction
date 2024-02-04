import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import RegisterForm from "../Components/Forms/RegisterForm";
import logo from '../Assets/Logo.png'
import React from "react";


export default function LoginPage() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return <Box>
  
  <Box
    width="100%"
    backgroundColor={theme.palette.background.alt}
    p="1rem 6%"
    textAlign="center"
  >
    <a href="/">
          <img src={logo} width='35px' className='logo' alt="img"></img>
    </a>
    <Typography fontWeight="bold" fontSize="25px" color="secondary">
      Live Auctions
    </Typography>
  </Box>

  <Box
    width={isNonMobileScreens ? "50%" : "93%"}
    p="2rem"
    m="2rem auto"
    borderRadius="1.5rem"
    backgroundColor={theme.palette.background.alt}
  >
    <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem", textAlign: "center" }}>
      Welcome to Live Auctions
    </Typography>
    <RegisterForm />
  </Box>
</Box>
}