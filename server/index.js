const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const User = require("./models/user");

const app = express();

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

app.get("/test", (req, res) => {
    res.json("server is responsing");
})

app.get("/user", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) return res.sendStatus(401);
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) return res.sendStatus(403);
        const foundUser = await User.findOne({ _id: data.userId });
        res.json(foundUser);
    })
})

const port = 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));