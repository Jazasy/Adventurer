const jwt = require('jsonwebtoken');

const hasToken = (req, res, next) => {
    const accessToken = req.headers.authorization;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken || !refreshToken) return res.status(401).json({ message: "You need to be logged in" });
    next();
}

verifyToken = (req, res, next) => {
    const accessToken = req.headers.authorization;
    jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET, (err, data) => {
        
        
    })
}

module.exports = { hasToken };