import React from 'react'
import EditProfileForm from '../Components/Forms/EditProfileForm'
import Navbar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import { Typography } from '@mui/material'
export default function EditProfilePage() {
  return (
    <>
      <Navbar />
      <Typography 
              fontWeight="500" 
              variant="h5"
              textAlign="center"
              sx={{ paddingTop: "1.5rem",
                    mb: "2 rem" }} 
              fontSize="clamp(1rem, 1.75rem, 2.25rem)"
              color="secondary">
              Edit Your Profile
            </Typography>
      <EditProfileForm />
      <Footer />
    </>

  )
}
