import { Box, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material'
import { useNavigate } from "react-router-dom";
import FlexBetween from '../FlexBetween/FlexBetween';
import SmallTimerWidget from '../Widgets/TimerWidgets/SmallTimerWidget';
import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";

const PostCard=({post}) =>{
  const navigate = useNavigate();

 const handleOpenRazorpay = (data) => {

        const options = {
            key: 'rzp_test_htRhWrvJFKZT2B',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'LIVE AUCTION',//
            description: 'XYZ',//
            handler: function (response) {
                console.log(response, "34")
                axios.post('http://localhost:3001/verify', { response: response })
                    .then(res => {
                        console.log(res, "37")
                        // your orders
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()

    }

    const handlePayment = (amount) => {
        const _data = { amount: amount }
        axios.post('http://localhost:3001/orders', _data)
            .then(res => {
                console.log(res.data, "29")
                handleOpenRazorpay(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }



  return (
    <FlexBetween>
      <Box width='300px' sx={{ margin: `20px 4px 10px 4px` }}>
        <Card>
          <CardMedia 
              component='img'
              height='140'
              image={`http://localhost:3001/assets/${post.picturePath}`}>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {post.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {post.shortDescription}
            </Typography>
            <Typography variant='body2' color='text.secondary' onClick={() => {navigate(`/profile/${post.userId}`)
            console.log(post.userId)} } sx={{
                "&:hover": {
                  color: "lightBlue",
                  cursor: "pointer",
                },
              }}>
            <u>Posted By:</u>  {post.firstName}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
            <u>Current Bid:</u> ${post.currentBid}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
            <u>Item Price:</u>  ${post.price}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <SmallTimerWidget expiryDate={post.endTime}/>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={() => navigate(`/post/${post._id}`)}>Open Post</Button>
            <Button size='small' onClick={() => handlePayment(post.currentBid)}>Pay</Button>
          </CardActions>
        </Card>
      </Box>
    </FlexBetween>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    picturePath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    currentBid: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    endTime: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
export default PostCard;