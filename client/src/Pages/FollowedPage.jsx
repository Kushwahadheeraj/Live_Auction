import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react"
import { Typography, Button } from "@mui/material";
import { useSelector} from "react-redux"
import Navbar from '../Components/NavBar/NavBar';
import Footer from '../Components/Footer/Footer';
import FlexBetween from '../Components/FlexBetween/FlexBetween';

export default function FollowedPage() {
  const [user, setUser] = useState([])
  const {id, follwId} = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token)
  const getUser = async() => {
    const response = await fetch(`http://localhost:3001/users/${id}/`,
    {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json();
    console.log(data);
    setUser(data);
  }

  useEffect(()=>{
    getUser();
  },[])

  return (
    <div>
    <Navbar/>
    <Typography 
              fontWeight="500" 
              variant="h5"
              textAlign="center"
              sx={{ paddingTop: "1.5rem",
                    mb: "2 rem" }} 
              fontSize="clamp(1rem, 1.75rem, 2.25rem)"
              color="secondary">
              You have {follwId}ed {user.firstName}
            </Typography>
    <FlexBetween >
        <Button
          fullWidth
          size="small"
          type="submit"
          onClick={() => navigate("/home")}
          sx={{
            p: "1rem",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "1rem",
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            "&:hover": { color: "#125688" }
          }}
        >
          {"Home Page"}
        </Button>
        </FlexBetween>
      <Footer />
    </div>
  );
}
