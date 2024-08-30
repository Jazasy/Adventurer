const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateAccessToken, generateRefreshToken } = require("../helpers/auth");

const User = require("../models/user");

let refreshTokens = [];

const registerUser = async (req, res) => {
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
}

const loginUser = async (req, res) => {
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
}

const logoutUser = (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
    res.sendStatus(204)
}

const giveNewToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ userId: data.userId });
        res.json({ accessToken });
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    giveNewToken,
}