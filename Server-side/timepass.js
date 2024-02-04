/* FILE STORAGE */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//       cb(null, req.body.picturePath);
//     },
//   });
// const upload = multer({ storage });


// /* ROUTES WITH FILES */
// app.post("/auth/register",register);
// app.post('/posts', verifyToken, upload.single("picture"), createPost)
// //upload.single("picture"),
// /* ROUTES */
// app.use('/posts', postRoutes);
// app.use('/auth', authRoutes)
// app.use('/users', userRoutes )


// /* CONNECTION */
// const CONNECTION_URL = process.env.MONGO_URL
// const PORT = process.env.PORT || 3001;
// mongoose.connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     app.listen(PORT, () => console.log(`Server started ! \nServer is running on port http://localhost:${PORT}/`))

// })
// .catch((error)=> console.log(`${error} did not connect`))
// app.get('/', (req, res) => (res.send("Server Backend is running")));

// setInterval(function () {
//   checkExpiry();
// }, 300000 );
