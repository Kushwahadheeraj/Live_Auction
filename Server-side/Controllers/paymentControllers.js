
import Razorpay from "razorpay";
import crypto from "crypto";
const KEY_ID = 'rzp_test_htRhWrvJFKZT2B'
const KEY_SECRET = 'xzv0cTwMY3qAKGQmSFG0snYE'

export const orders = async(req, res) => {

    let instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })

    var options = {
        amount: req.body.amount * 100,  // amount in the smallest currency unit
        currency: "INR",
    };

    instance.orders.create(options, function (err, order) {
        if (err) {
            return res.send({ code: 500, message: 'Server Err.' })
        }
        return res.send({ code: 200, message: 'order created', data: order })
    });
}


export const verfiy = async(req, res) => {


    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === req.body.response.razorpay_signature) {
        res.send({ code: 200, message: 'Sign Valid' });
    } else {

        res.send({ code: 500, message: 'Sign Invalid' });
    }
}