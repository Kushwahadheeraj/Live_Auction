import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Razorpay from "razorpay";
import cors from 'cors';
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan';
import path from 'path'
import { fileURLToPath } from 'url';
// import { app } from "./app.js";

/* Routes */
import postRoutes from './Routes/posts.js';
import authRoutes from './Routes/auth.js';
import userRoutes from './Routes/users.js';
// import paymentRoute from "./Routes/paymentRoutes.js";
import { verifyToken } from './middleware/auth.js';
import { createPost, checkExpiry } from './Controllers/postController.js'
import { register } from './Controllers/auth.js'
import {orders,verfiy} from "./Controllers/paymentControllers.js"

/* CONFIG */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors({origin: '*'}));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  filename: function (req, file, cb) {
          cb(null, req.body.picturePath);
        },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.post('/orders', orders)
app.post('/verify', verfiy)

app.get("/payment/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
// app.use("/payment",paymentRoute)

//MONGOOSE SETUP
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ADD DATA ONE TIME 
})
.catch((error) => console.log( `${error} did not connect`));