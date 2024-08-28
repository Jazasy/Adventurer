const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

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

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

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

app.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({ $or: [{ username }, { email }] })
    if (foundUser == null) {
        return res.status(400).send('User is not found')
    }
    try {
        if (await bcrypt.compare(req.body.password, foundUser.password)) {
            const accessToken = generateAccessToken({ foundUser });
            const refreshToken = generateRefreshToken({ foundUser });
            res.send('Success').json({ accessToken, refreshToken });
        } else {
            res.send('Invalid password')
        }
    } catch {
        res.status(500).send()
    }
})

const port = 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));