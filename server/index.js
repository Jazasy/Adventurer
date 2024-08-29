const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

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

function generateAccessToken(data) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
}

function generateRefreshToken(data) {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
}

let refreshTokens = [];

app.get("/test", (req, res) => {
    res.json("server is responsing");
})

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //check if username/email/password is given
        const regDatas = { username, email, password };
        for (let [key, value] of Object.entries(regDatas)) {
            if (!value) {
                return res.json({
                    error: `${key} is required`
                })
            }
        }
        // Check if the email and username is free
        const exUserTest = { username, email };
        for (let [key, value] of Object.entries(exUserTest)) {
            const query = { [key]: value };
            const exist = await User.findOne(query);
            if (exist) {
                return res.json({
                    error: `${key} is already taken`
                })
            }
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/token', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ userId: data.userId });
        res.json({ accessToken });
    })
})

app.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({ $or: [{ username }, { email }] })
    if (foundUser == null) {
        return res.status(400).send('User is not found')
    }
    try {
        if (await bcrypt.compare(req.body.password, foundUser.password)) {
            const accessToken = generateAccessToken({ userId: foundUser._id });
            const refreshToken = generateRefreshToken({ userId: foundUser._id });
            refreshTokens.push(refreshToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
                sameSite: 'Strict'
            }).json({ accessToken }).send('Success');
        } else {
            res.send('Invalid password')
        }
    } catch {
        res.status(500).send();
    }
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
    res.sendStatus(204)
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