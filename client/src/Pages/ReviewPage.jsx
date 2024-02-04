import Navbar from "../Components/NavBar/NavBar"
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Footer from "../Components/Footer/Footer";
import ReviewForm from "../Components/Forms/ReviewForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, React } from "react";
import UserImage from "../Components/Widgets/UserImage";
import FlexBetween from "../Components/FlexBetween/FlexBetween";


export default function ReviewPage() {
    const theme = useTheme();
    const token = useSelector((state) => state.token)
    const {_id} = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const getUserInfo = async() => {
        const response = await fetch(`http://localhost:3001/users/${_id}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json();
        console.log(data);
        setUserInfo(data);
      }
    useEffect(() => {
        getUserInfo();
    }, [])
    
  return (
    <>
        <Navbar />
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography 
                fontWeight="500" 
                variant="h5"
                textAlign="center"
                sx={{ mb: "1.5rem"}} 
                fontSize="clamp(1rem, 1.75rem, 2.25rem)"
                color="secondary">
                Leave a Review on {userInfo.firstName}&apos;s Profile
                </Typography>
                <FlexBetween gap="1rem">
                <UserImage image={userInfo.picturePath} />
                <Box>
                    <Typography
                      variant="h4"
                      color={dark}
                      fontWeight="500"
                      sx={{
                        "&:hover": {
                          color: palette.primary.light,
                          cursor: "pointer",
                        },
                      }}
                    >
                      {userInfo.firstName} {userInfo.lastName}
                    </Typography>
                  </Box>
                </FlexBetween>
                  
                <ReviewForm/>
                </Box>
        <Footer />
    </>
  )
}
