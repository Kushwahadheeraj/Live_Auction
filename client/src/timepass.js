const initPayment = (data) => {

  
    // const { data: { key } } = await axios.get("http://localhost:3001/payment/getkey");
    const options = {
      key:"rzp_test_htRhWrvJFKZT2B",
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:3001/payment/paymentverification";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  
  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:3001/payment/checkout";
      const { data } = await axios.post(orderUrl,{amount:book.price});
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

// const checkoutHandler = async (amount) => {

//   const { data: { key } } = await axios.get("http://localhost:3001/payment/getkey")

//   const { data: { order } } = await axios.post("http://localhost:3001/payment/checkout", {
//       amount
//     // currentBid
//   })

//   const options = {
//       key,
//       amount: order.amount,
//       currency: "INR",
//       name: "6 Pack Programmer",
//       description: "Tutorial of RazorPay",
//       image: "https://avatars.githubusercontent.com/u/25058652?v=4",
//       order_id: order.id,
//       callback_url: "http://localhost:3001/payment/paymentverification",
//       prefill: {
//           name: "Dheeraj Kushwaha",
//           email: "kushwahadheeraj245@gmail.com",
//           contact: "8299301972"
//       },
//       notes: {
//           "address": "Razorpay Corporate Office"
//       },
//       theme: {
//           "color": "#121212"
//       }
//   };
//   const razor = new window.Razorpay(options);
//   razor.open();
// }