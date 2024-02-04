import React from 'react'
import { useSelector} from "react-redux"
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'

export default function EditProfileForm() {
  const user = useSelector((state) => state.user)
  const isNonMobile = useMediaQuery("(min-width:600px)")


  const editSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("invalid email").required("Required"),
    //password: yup.string().required("Required"),
    location: yup.string().required("Required"),
    occupation: yup.string().required("Required"),
    //picture: yup.string().required("Required"),
    });


    const initialValuesEdit = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
        occupation: user.occupation
    }

    function handleFormSubmit(){
        console.log("Hello World")
    }
  return (
    <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesEdit }
        validationSchema={editSchema}
    >
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
            padding="5rem"
            margin="0"
            gridTemplateColumns="repeat(4, minmax(1, 1fr))"
            sx={{
                "& > div" : {gridColumn: isNonMobile? undefined : "span 4"}
            }}
            >
                        <TextField
                            label="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            name="firstName"
                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                            sx={{gridColumn: "span 2"}}
                        />
                        <TextField
                            label="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            sx={{gridColumn: "span 2"}}
                        />
                        <TextField
                            label="Location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            name="location"
                            error={Boolean(touched.location) && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                            sx={{gridColumn: "span 4"}}
                        />
                        <TextField
                            label="Occupation"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.occupation}
                            name="occupation"
                            error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                            helperText={touched.occupation && errors.occupation}
                            sx={{gridColumn: "span 4"}}
                        />
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{gridColumn: "span 4"}}
                        />
                        <Button
                        fullWidth
                        size="small"
                        type="submit"
                        sx={{
                            gridColumn: "span 4",
                            p: "1rem",
                            backgroundColor: "#ce93d8",
                            color: "#1A1A1A",
                            "&:hover" : { color: "#ce93d7"}
                        }}>
                        {"Update Profile"}
                        </Button>
            </Box>
        </form>
    )}
    </Formik>
  )
}
