const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const adventureRoutes = require("./routes/adventureRoutes");

const User = require("./models/user");
const catchAsync = require("./helpers/catchAsync");

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
app.use("/adventures", adventureRoutes);

app.get("/test", (req, res) => {
    res.json("server is responsing");
})

app.get("/user", (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.sendStatus(401);

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) return res.sendStatus(401);

        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, refreshData) => {
            if (err) return res.sendStatus(403);

            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, accessData) => {
                if (err) return res.sendStatus(403);

                if (accessData.role !== "admin") return res.status(403).json({ message: "You need to be an admin" });

                const foundUser = await User.findById(refreshData.userId);
                if (!foundUser) return res.status(404).json({ message: "User not found" });
                res.json(foundUser);
            });
        });
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An internal server error occurred" });
});


const port = 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));