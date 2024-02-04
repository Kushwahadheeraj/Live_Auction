import { Button } from "@mui/material";
import { useEffect, useState, React } from "react"
import { useNavigate} from "react-router-dom";
import { useSelector} from "react-redux"
import PropTypes from 'prop-types';

DeleteButton.propTypes = {
  postId: PropTypes.string.isRequired,
  postUserId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default function DeleteButton({postId, postUserId, text}) {

    const navigate = useNavigate();
    const [isUserPost, setisUserPost] = useState(false)
    const { _id,} = useSelector((state) => state.user);

    useEffect(() => {
    if(postUserId === _id){
        setisUserPost(true)
    }
    }, [])


    const handleDelete = () => {
        delPost();
        navigate("/home");
    }

    const delPost = async() => {
        const response = await fetch(`http://localhost:3001/posts/${postId}`,
        {
            method: "DELETE",
        })
        const data = await response.json();
        console.log(data);
    }

  return (
    <div>
        {isUserPost ? 
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
              </Button>
              : <></>}
    </div>
  )
}
