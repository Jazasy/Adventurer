const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const adventureRoutes = require("./routes/adventureRoutes");
const postRoutes = require("./routes/postRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

app.use(helmet());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database Connection Failed", err))

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/adventures", adventureRoutes);
app.use("/posts", postRoutes);
app.use("/applications", applicationRoutes);

app.get("/test", (req, res) => {
    res.json("server is responsing");
})

app.use((err, req, res, next) => {
    console.error("*************************ERROR*************************");
    console.error(err.stack);
    res.status(500).json({ message: "An internal server error occurred" });
});


const port = 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));