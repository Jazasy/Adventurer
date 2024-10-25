const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../redis/index");

const { generateAccessToken, generateRefreshToken, hashPassword } = require("../helpers/auth");

const User = require("../models/user");

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    //check if username/email/password is given
    const regDatas = { username, email, password };
    for (let [key, value] of Object.entries(regDatas)) {
        if (!value) {
            return res.status(403).json({
                message: `${key} is required`
            })
        }
    }
    // Check if the email and username is free
    const exUserTest = { username, email };
    for (let [key, value] of Object.entries(exUserTest)) {
        const query = { [key]: value };
        const exist = await User.findOne(query);
        if (exist) {
            return res.status(403).json({
                message: `${key} is already taken`
            })
        }
    }
    const hashedPassword = await hashPassword(password);
    const role = "user";
    const pfpUrl = req.file ? req.file.path : "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179548/Adventurer/seed/uiwuefdckhu8spiqb4pa.jpg";       // I will change this later
    const newUser = new User({ username, email, password: hashedPassword, role, pfp: pfpUrl });
    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
}

const loginUser = async (req, res) => {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({ $or: [{ username }, { email }] });

    if (foundUser == null) return res.status(404).json({ message: "User not found" });

    if (await bcrypt.compare(password, foundUser.password)) {
        let refreshToken = req.cookies.refreshToken;
        if (refreshToken) await redisClient.del(refreshToken);

        const accessToken = generateAccessToken({ role: foundUser.role });
        refreshToken = generateRefreshToken({ userId: foundUser._id });
        
        await redisClient.set(refreshToken, "valid", {
            EX: 7 * 24 * 60 * 60 // expires in 7 days
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
            sameSite: 'Strict'
        }).json({ accessToken });
    } else {
        res.status(401).json({ message: "Invalid password" })
    }
}

const logoutUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) await redisClient.del(refreshToken);
    res.status(204).cookie('refreshToken', "", {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
        sameSite: 'Strict'
    }).send();
}

const giveNewToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);

    const storedRefreshToken = await redisClient.get(refreshToken);
    if (storedRefreshToken !== "valid") return res.sendStatus(403);         // instead of valid I could use a secret and put it in .env
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, data) => {
        if (err) return res.sendStatus(403);
        const foundUser = await User.findById(data.userId);
        const accessToken = generateAccessToken({ role: foundUser.role });
        res.json({ accessToken });
    })
}

const giveUser = async (req, res) => {
    const foundUser = await User.findById(req.userId).lean();
    !foundUser && res.status(404).json({ message: "User not found" });
    delete foundUser.password;
    res.json(foundUser);
}

const giveUserById = async (req, res) => {
    const foundUser = await User.findById(req.params.userId).lean();
    !foundUser && res.status(404).json({ message: "User not found" });
    delete foundUser.password;
    res.json(foundUser);
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    giveNewToken,
    giveUser,
    giveUserById,
}