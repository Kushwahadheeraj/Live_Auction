import { useState, useEffect, React } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'

export default function ReviewForm() {
  // Current user = user._id
  // User to review = _id
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const {_id} = useParams();
  const [setReviewUser] = useState(null);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token); 
  const navigate = useNavigate();

  const leaveReview = async (values, onSubmitProps) => {
    const newData = { 
      newReview: values.newReview, 
      reviewUser: user._id, 
      reviewerName: user.firstName,
      revieweeId: _id};
    console.log(newData);
    const updatedPostResponse = await fetch(
      `http://localhost:3001/users/${_id}/leaveReview`,{
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", },
        body: JSON.stringify(newData),
      }
    )
    const savedUpdatedPost = await updatedPostResponse.json();
    console.log(savedUpdatedPost);
    onSubmitProps.resetForm();
  }
  const getUser = async() => {
    const response = await fetch(`http://localhost:3001/users/${_id}`,
    {
        method: "GET",
    })
    const data = await response.json();
    setReviewUser(data);
  }
  useEffect(() =>{
      getUser();
  }, [])

  const reviewSchema = yup.object().shape({
    newReview: yup.string().required("Required")
  }) 
  const initialReviewValues = {
    newReview: ""
  }

  const handleFormSubmit = async(values, onSubmitProps) =>{
    await leaveReview(values, onSubmitProps);
    navigate("/home")
  }

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialReviewValues} validationSchema={reviewSchema}>
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
        })=>(
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              padding="2rem"
              margin="0"
              gridTemplateColumns="repeat(4, minmax(1, 1fr))"
              sx={{
                "& > div" : {gridColumn: isNonMobile? undefined : "span 4"}
              }}
            >
              <TextField
                label="Review"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newReview}
                name="newReview"
                error={Boolean(touched.newReview) && Boolean(errors.newReview)}
                helperText={touched.newReview && errors.newReview}
                sx={{gridColumn: "span 4"}}
              />
            </Box>
            {/* BUTTONS SECTION */}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(1, 1fr))"
              sx={{
                "& > div" : {gridColumn: isNonMobile? undefined : "span 4"}
              }}
            >
              <Button
                fullWidth
                size="small"
                type="submit"
                sx={{
                  p: "1rem",
                  backgroundColor: "#ce93d8",
                  color: "#1A1A1A",
                  "&:hover" : { color: "#ce93d7"}
                }}>
                {"Leave review!"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
  )
}
