import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
} from "@mui/icons-material";
import { useSelector, useDispatch} from "react-redux"
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "../FlexBetween/FlexBetween";
import WidgetWrapper from "../FlexBetween/WidgetWrapper";
import { useEffect, useState,React } from "react";
import { useNavigate } from "react-router-dom";
import { setFollowing } from "../../Redux/store";
import PropTypes from 'prop-types';


function ProfileWidget({ userId }) {

    const [profileuser, setUser] = useState(null);
    const currentUserFollowing = useSelector((state) => state.user.following)
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const { palette } = useTheme();
    const follow = "Follow";
    const unfollow = "Unfollow";
    const navigate = useNavigate();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const dispatch = useDispatch();
    const getUser = async() => {
        const response = await fetch(`http://localhost:3001/users/${userId}`,
        {
            method: "GET",
        })
        const data = await response.json();
        setUser(data);
    }
    useEffect(() =>{
        getUser();
    }, [])

    const patchFollow = async () => {
      const response = await fetch(
        `http://localhost:3001/users/${user._id}/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch(setFollowing({ friends: data }));
      navigate(`/followed/${userId}/follow`)
    };

    const patchUnFollow = async () => {
      const response = await fetch(
        `http://localhost:3001/users/${user._id}/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch(setFollowing({ friends: data }));
      navigate(`/followed/${userId}/unfollow`)
    };

    if(!profileuser){
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        viewedProfile,
        following,
    } = profileuser;

    console.log(currentUserFollowing)

    const isfollowed = currentUserFollowing.find((follower) => follower._id === userId);
    console.log(isfollowed)
    return (
      <WidgetWrapper>
        <FlexBetween>
        <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={profileuser.picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{following.length} Following</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
      {user._id === profileuser._id ? <><ManageAccountsOutlined  onClick={() => navigate(`/editProfile/${user._id}`)} /> </> :<> </> }
    </FlexBetween>
      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
      <FlexBetween gap="1rem">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        </FlexBetween>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
      <FlexBetween gap="1rem">
          <Typography color={medium}>Who&apos;s viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            3423
          </Typography>
          </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
      <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        </FlexBetween>
      </FlexBetween>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="http://localhost:3001/assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="http://localhost:3001/assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
            
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
          
        </FlexBetween>
        
      </Box>
      <FlexBetween gap="1rem">
      {user._id === profileuser._id ? <></> : 
      isfollowed ? <Button 
                fullWidth
                size="small"
                type="submit"
                onClick={() => patchUnFollow()}
                sx={{
                    p: "1rem",
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "1rem",
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    "&:hover" : { color: " #808080"}
                }}>
                {`${unfollow} User`}
                
                </Button> :
      <Button 
                fullWidth
                size="small"
                type="submit"
                onClick={() => patchFollow()}
                sx={{
                    p: "1rem",
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "1rem",
                    backgroundColor: "#458eff",
                    color: "#1A1A1A",
                    "&:hover" : { color: "#125688"}
                }}>
                {`${follow} user`}
                
                </Button>
                
      }
      </FlexBetween>
      </WidgetWrapper>
    )

}
  

ProfileWidget.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default ProfileWidget