const jwt = require('jsonwebtoken');
const User = require('../models/user');

const hasToken = (req, res, next) => {
    const accessToken = req.headers.authorization;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken || !refreshToken) return res.status(401).json({ message: "You need to be logged in" });
    next();
}

const validateRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    const storedRefreshToken = await redisClient.get(refreshToken);
    if (storedRefreshToken !== "valid") return res.status(403).json({ message: "invalid refreshtoken" });         // instead of valid I could use a secret and put it in .env

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, data) => {
        if (err) return res.status(403).json({ message: "invalid refreshtoken" });
        req.userId = data.userId;
        next();
    })
}

const validateAccessToken = (req, res, next) => {
    if (req.accessToken) return next();

    const accessToken = req.headers.authorization.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return next();

        req.accessToken = accessToken;
        req.role = data.role;
        next();
    })
}

const refreshAccessToken = async (req, res, next) => {
    if (req.accessToken) return next();

    const foundUser = await User.findById(req.userId);
    const accessToken = generateAccessToken({ role: foundUser.role });
    req.headers.authorization = `Bearer ${accessToken}`;
    next();
}

module.exports = {
    hasToken,
    validateAccessToken,
    validateRefreshToken,
    refreshAccessToken,
};