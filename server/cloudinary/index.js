const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
})

const adventureStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Adventurer/adventures",
        allowedFormats: ["jpeg", "png", "jpg"]
    }
})

const postStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Adventurer/posts",
        allowedFormats: ["jpeg", "png", "jpg"]
    }
})

const userStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Adventurer/users",
        allowedFormats: ["jpeg", "png", "jpg"]
    }
})

module.exports = {
    cloudinary,
    postStorage,
    adventureStorage,
    userStorage
}