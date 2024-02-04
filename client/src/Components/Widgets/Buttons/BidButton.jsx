import { Button } from "@mui/material";
import { useEffect, useState, React } from "react"
import { useNavigate} from "react-router-dom";
import { useSelector} from "react-redux"
import PropTypes from "prop-types";

BidButton.propTypes = {
  postId: PropTypes.string.isRequired,
  postUserId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default function BidButton({postId, postUserId, text}) {

    const navigate = useNavigate();
    const [isUserPost, setisUserPost] = useState(false)
    const { _id,} = useSelector((state) => state.user);

    useEffect(() => {
    if(postUserId === _id){
        setisUserPost(true)
    }
    }, [])


    const handleDelete = () => {
        navigate(`/post/${postId}/bid`);
    }

  return (
    <div>
        {isUserPost ? 
            <></>
              : 
              <Button
                sx={{
                  backgroundColor: "#ce93d8",
                  color:"black",
                  minWidth: "150px",
                  padding: "10px 40px",
                  borderRadius: "1rem",
                  marginBottom: "40px",
                }}
                onClick={handleDelete}
              >
                {text}
              </Button>}
    </div>
  )
}
