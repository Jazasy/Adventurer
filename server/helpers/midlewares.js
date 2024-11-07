const jwt = require('jsonwebtoken');
const User = require('../models/user');
const redisClient = require("../redis/index");

const hasToken = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        const refreshToken = req.cookies.refreshToken;
        console.log("accessToken: ", accessToken);
        console.log("refreshToken ", refreshToken);
        if (!accessToken || !refreshToken) return res.status(401).json({ message: "You need to be logged in" });
        next();
    } catch (error) {
        next(error);
    }
}

const validateRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const storedRefreshToken = await redisClient.get(refreshToken);
        if (storedRefreshToken !== "valid") return res.status(403).json({ message: "invalid or no refreshtoken. You need to log in" });         // instead of valid I could use a secret and put it in .env

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, data) => {
            if (err) return res.status(403).json({ message: "invalid refreshtoken. You need to log in" });
            req.userId = data.userId;
            next();
        })
    } catch (error) {
        next(error);
    }
}

const validateAccessToken = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) return res.status(403).json({ message: "invalid accesstoken" });
            req.role = data.role;
            next();
        })
    } catch (error) {
        next(error);
    }
}

/* const refreshAccessToken = async (req, res, next) => {
    if (req.accessToken) return next();

    const foundUser = await User.findById(req.userId);
    const accessToken = generateAccessToken({ role: foundUser.role });
    req.headers.authorization = `Bearer ${accessToken}`;
    next();
} */

module.exports = {
    hasToken,
    validateAccessToken,
    validateRefreshToken,
};