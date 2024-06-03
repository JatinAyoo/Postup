const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const postRoutes = require("./routes/Post");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const fileUpload = require("express-fileupload");
const {cloudinaryConnect } = require("./config/cloudinary");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		// origin:"http://localhost:3000",
		origin:"*",
		// methods: ["GET"],
		credentials:true,
	})
)
//cloudinary connection
cloudinaryConnect();

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/post", postRoutes);

//def route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

