import { Box, Typography, useTheme, useMediaQuery,Button } from "@mui/material";
import { useSelector } from "react-redux"
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import React from "react";


function ErrorPage() {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const navigate = useNavigate();
    const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <>
    <Box>
        <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
        >
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem", textAlign: "center" }}>
            Sorry this is not a url
            </Typography>
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem", textAlign: "center" }}>
            <ErrorIcon/>
            </Typography>
            <Button
                onClick={() => navigate(
                    isAuth ? "/home" : "/"
                )}
                fullWidth
                size="small"
                type="submit"
                sx={{
                    backgroundColor: "#ce93d8",
                    color: "#1A1A1A",
                    "&:hover" : { color: "#ce93d7"}
                }}>
                <Typography fontWeight="500" variant="h5" sx={{m:"1rem",textAlign: "center" }}>
                    Back to home page
                    </Typography>
            </Button>

            </Box>
    </Box>
    </>
  )
}

export default ErrorPage