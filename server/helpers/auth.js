const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 

const generateAccessToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '600s' })
}

const generateRefreshToken = (data) => {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
}

const hashPassword = async (password) => {
    return bcrypt.hash(password, 12);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    hashPassword,
}