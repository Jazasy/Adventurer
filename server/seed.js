const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const { hashPassword } = require("./helpers/auth");
const { cloudinary } = require("./cloudinary");

const Adventure = require("./models/adventure");
const User = require("./models/user");
const Post = require("./models/post");
const Like = require("./models/like");
const Comment = require("./models/comment");
const Application = require("./models/application");

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database Connection Failed", err))

const adventures = [
    {
        title: "Climbing the K2",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179201/Adventurer/seed/i7onlcnzonv2xgf0umwq.jpg",
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179243/Adventurer/seed/u1h782p5nwafhsw5qwhz.jpg",
        ],
        description: "K2 is the second highest mountain in the world, after Mount Everest, at 8,611 metres (28,251 ft) above sea level. It is located on the China–Pakistan border between Baltistan in the Gilgit-Baltistan region of northern Pakistan, and Dafdar Township in Taxkorgan Tajik Autonomous County of Xinjiang, China.",
        location: "K2, China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179318/Adventurer/seed/flhbhapb5lodj51mdn5f.jpg",
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179334/Adventurer/seed/gc8vljqj7foa7md0s8bg.jpg",
        ],
        description: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean in the south and is bounded by the continents of Asia and Australia in the west and the Americas in the east.",
        location: "Pacific Ocean",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Learn to surf",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179349/Adventurer/seed/gb4uagccgquq6fqb1u4e.jpg",
        ],
        description: "Surfing is a surface water sport in which an individual, a surfer, uses a board to ride on the forward section, or face, of a moving wave of water, which usually carries the surfer towards the shore.",
        location: "Hawaii",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179362/Adventurer/seed/blpyiekqnurblsyowpiq.jpg",
        ],
        description: "Kung Fu is a Chinese term referring to any study, learning, or practice that requires patience, energy, and time to complete. In its original meaning, kung fu can refer to any discipline or skill achieved through hard work and practice, not necessarily martial arts.",
        location: "China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Climbing the K2",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179201/Adventurer/seed/i7onlcnzonv2xgf0umwq.jpg",
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179243/Adventurer/seed/u1h782p5nwafhsw5qwhz.jpg",
        ],
        description: "K2 is the second highest mountain in the world, after Mount Everest, at 8,611 metres (28,251 ft) above sea level. It is located on the China–Pakistan border between Baltistan in the Gilgit-Baltistan region of northern Pakistan, and Dafdar Township in Taxkorgan Tajik Autonomous County of Xinjiang, China.",
        location: "K2, China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179318/Adventurer/seed/flhbhapb5lodj51mdn5f.jpg",
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179334/Adventurer/seed/gc8vljqj7foa7md0s8bg.jpg",
        ],
        description: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean in the south and is bounded by the continents of Asia and Australia in the west and the Americas in the east.",
        location: "Pacific Ocean",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Learn to surf",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179349/Adventurer/seed/gb4uagccgquq6fqb1u4e.jpg",
        ],
        description: "Surfing is a surface water sport in which an individual, a surfer, uses a board to ride on the forward section, or face, of a moving wave of water, which usually carries the surfer towards the shore.",
        location: "Hawaii",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179362/Adventurer/seed/blpyiekqnurblsyowpiq.jpg",
        ],
        description: "Kung Fu is a Chinese term referring to any study, learning, or practice that requires patience, energy, and time to complete. In its original meaning, kung fu can refer to any discipline or skill achieved through hard work and practice, not necessarily martial arts.",
        location: "China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Climbing the K2",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179201/Adventurer/seed/i7onlcnzonv2xgf0umwq.jpg",
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179243/Adventurer/seed/u1h782p5nwafhsw5qwhz.jpg",
        ],
        description: "K2 is the second highest mountain in the world, after Mount Everest, at 8,611 metres (28,251 ft) above sea level. It is located on the China–Pakistan border between Baltistan in the Gilgit-Baltistan region of northern Pakistan, and Dafdar Township in Taxkorgan Tajik Autonomous County of Xinjiang, China.",
        location: "K2, China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179318/Adventurer/seed/flhbhapb5lodj51mdn5f.jpg",
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179334/Adventurer/seed/gc8vljqj7foa7md0s8bg.jpg",
        ],
        description: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean in the south and is bounded by the continents of Asia and Australia in the west and the Americas in the east.",
        location: "Pacific Ocean",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Learn to surf",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179349/Adventurer/seed/gb4uagccgquq6fqb1u4e.jpg",
        ],
        description: "Surfing is a surface water sport in which an individual, a surfer, uses a board to ride on the forward section, or face, of a moving wave of water, which usually carries the surfer towards the shore.",
        location: "Hawaii",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179362/Adventurer/seed/blpyiekqnurblsyowpiq.jpg",
        ],
        description: "Kung Fu is a Chinese term referring to any study, learning, or practice that requires patience, energy, and time to complete. In its original meaning, kung fu can refer to any discipline or skill achieved through hard work and practice, not necessarily martial arts.",
        location: "China",
        date: new Date(2024, 6, 1),
    },
];

const setDatabase = async () => {
    await Adventure.deleteMany({});
    await User.deleteMany({});
    await Like.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Application.deleteMany({});

    let prefix = "Adventurer/adventures";
    await cloudinary.api.delete_resources_by_prefix(prefix, { type: "upload", resource_type: "image" })
        .then(result => console.log("Cloudinary delete result:", result))
        .catch(error => console.error("Cloudinary delete error:", error));

    prefix = "Adventurer/posts";
    await cloudinary.api.delete_resources_by_prefix(prefix, { type: "upload", resource_type: "image" })
        .then(result => console.log("Cloudinary delete result:", result))
        .catch(error => console.error("Cloudinary delete error:", error));

    const admin = new User({
        username: "admin",
        password: await hashPassword("admin"),
        email: "admin@gmail.com",
        role: "admin",
        pfp: "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179548/Adventurer/seed/uiwuefdckhu8spiqb4pa.jpg",
    });
    const user = new User({
        username: "user",
        password: await hashPassword("password"),
        email: "user@gmail.com",
        role: "user",
        pfp: "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179548/Adventurer/seed/uiwuefdckhu8spiqb4pa.jpg",
    });
    for (const adventure of adventures) {
        const newAdventure = new Adventure({
            ...adventure,
            leader: admin._id
        });
        const newPost = new Post({
            author: admin._id,
            adventure: newAdventure._id,
            content: "This is a sample post",
            image: "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179201/Adventurer/seed/i7onlcnzonv2xgf0umwq.jpg",

        })
        const newPost1 = new Post({
            author: admin._id,
            adventure: newAdventure._id,
            content: "This is a sample post",
            image: "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179201/Adventurer/seed/i7onlcnzonv2xgf0umwq.jpg",

        })
        const newPost2 = new Post({
            author: admin._id,
            adventure: newAdventure._id,
            content: "This is a sample post",
            image: "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179201/Adventurer/seed/i7onlcnzonv2xgf0umwq.jpg",

        })
        await newPost.save();
        await newPost1.save();
        await newPost2.save();
        await newAdventure.save();
    }
    await admin.save();
    await user.save();
}

setDatabase().then(() => {
    mongoose.connection.close()
        .then(() => console.log("Database Connection Closed"));
})