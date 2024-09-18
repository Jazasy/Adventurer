const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const { hashPassword } = require("./helpers/auth")

const Adventure = require("./models/adventure");
const User = require("./models/user");
const Post = require("./models/post");

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database Connection Failed", err))

const adventures = [
    {
        title: "Climbing the K2",
        images: [
            "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        description: "K2 is the second highest mountain in the world, after Mount Everest, at 8,611 metres (28,251 ft) above sea level. It is located on the China–Pakistan border between Baltistan in the Gilgit-Baltistan region of northern Pakistan, and Dafdar Township in Taxkorgan Tajik Autonomous County of Xinjiang, China.",
        location: "K2, China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhaWxpbmd8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1664304679616-b35eb168e3e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        description: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean in the south and is bounded by the continents of Asia and Australia in the west and the Americas in the east.",
        location: "Pacific Ocean",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Learn to surf",
        images: [
            "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description: "Surfing is a surface water sport in which an individual, a surfer, uses a board to ride on the forward section, or face, of a moving wave of water, which usually carries the surfer towards the shore.",
        location: "Hawaii",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://images.unsplash.com/photo-1617480348565-d60644e43fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bmdmdXxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description: "Kung Fu is a Chinese term referring to any study, learning, or practice that requires patience, energy, and time to complete. In its original meaning, kung fu can refer to any discipline or skill achieved through hard work and practice, not necessarily martial arts.",
        location: "China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Climbing the K2",
        images: [
            "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        description: "K2 is the second highest mountain in the world, after Mount Everest, at 8,611 metres (28,251 ft) above sea level. It is located on the China–Pakistan border between Baltistan in the Gilgit-Baltistan region of northern Pakistan, and Dafdar Township in Taxkorgan Tajik Autonomous County of Xinjiang, China.",
        location: "K2, China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhaWxpbmd8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1664304679616-b35eb168e3e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        description: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean in the south and is bounded by the continents of Asia and Australia in the west and the Americas in the east.",
        location: "Pacific Ocean",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Learn to surf",
        images: [
            "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description: "Surfing is a surface water sport in which an individual, a surfer, uses a board to ride on the forward section, or face, of a moving wave of water, which usually carries the surfer towards the shore.",
        location: "Hawaii",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://images.unsplash.com/photo-1617480348565-d60644e43fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bmdmdXxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description: "Kung Fu is a Chinese term referring to any study, learning, or practice that requires patience, energy, and time to complete. In its original meaning, kung fu can refer to any discipline or skill achieved through hard work and practice, not necessarily martial arts.",
        location: "China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Climbing the K2",
        images: [
            "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        description: "K2 is the second highest mountain in the world, after Mount Everest, at 8,611 metres (28,251 ft) above sea level. It is located on the China–Pakistan border between Baltistan in the Gilgit-Baltistan region of northern Pakistan, and Dafdar Township in Taxkorgan Tajik Autonomous County of Xinjiang, China.",
        location: "K2, China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhaWxpbmd8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1664304679616-b35eb168e3e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        description: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean in the south and is bounded by the continents of Asia and Australia in the west and the Americas in the east.",
        location: "Pacific Ocean",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Learn to surf",
        images: [
            "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description: "Surfing is a surface water sport in which an individual, a surfer, uses a board to ride on the forward section, or face, of a moving wave of water, which usually carries the surfer towards the shore.",
        location: "Hawaii",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://images.unsplash.com/photo-1617480348565-d60644e43fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bmdmdXxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description: "Kung Fu is a Chinese term referring to any study, learning, or practice that requires patience, energy, and time to complete. In its original meaning, kung fu can refer to any discipline or skill achieved through hard work and practice, not necessarily martial arts.",
        location: "China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Climbing the K2",
        images: [
            "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        description: "K2 is the second highest mountain in the world, after Mount Everest, at 8,611 metres (28,251 ft) above sea level. It is located on the China–Pakistan border between Baltistan in the Gilgit-Baltistan region of northern Pakistan, and Dafdar Township in Taxkorgan Tajik Autonomous County of Xinjiang, China.",
        location: "K2, China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhaWxpbmd8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1664304679616-b35eb168e3e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        description: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean in the south and is bounded by the continents of Asia and Australia in the west and the Americas in the east.",
        location: "Pacific Ocean",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Learn to surf",
        images: [
            "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description: "Surfing is a surface water sport in which an individual, a surfer, uses a board to ride on the forward section, or face, of a moving wave of water, which usually carries the surfer towards the shore.",
        location: "Hawaii",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://images.unsplash.com/photo-1617480348565-d60644e43fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bmdmdXxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description: "Kung Fu is a Chinese term referring to any study, learning, or practice that requires patience, energy, and time to complete. In its original meaning, kung fu can refer to any discipline or skill achieved through hard work and practice, not necessarily martial arts.",
        location: "China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Climbing the K2",
        images: [
            "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        description: "K2 is the second highest mountain in the world, after Mount Everest, at 8,611 metres (28,251 ft) above sea level. It is located on the China–Pakistan border between Baltistan in the Gilgit-Baltistan region of northern Pakistan, and Dafdar Township in Taxkorgan Tajik Autonomous County of Xinjiang, China.",
        location: "K2, China",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhaWxpbmd8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1664304679616-b35eb168e3e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        description: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean in the south and is bounded by the continents of Asia and Australia in the west and the Americas in the east.",
        location: "Pacific Ocean",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Learn to surf",
        images: [
            "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description: "Surfing is a surface water sport in which an individual, a surfer, uses a board to ride on the forward section, or face, of a moving wave of water, which usually carries the surfer towards the shore.",
        location: "Hawaii",
        date: new Date(2024, 6, 1),
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://images.unsplash.com/photo-1617480348565-d60644e43fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bmdmdXxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description: "Kung Fu is a Chinese term referring to any study, learning, or practice that requires patience, energy, and time to complete. In its original meaning, kung fu can refer to any discipline or skill achieved through hard work and practice, not necessarily martial arts.",
        location: "China",
        date: new Date(2024, 6, 1),
    },

];

const setDatabase = async () => {
    await Adventure.deleteMany({});
    await User.deleteMany({});
    const admin = new User({
        username: "admin",
        password: await hashPassword("admin"),
        email: "admin@gmail.com",
        role: "admin"
    });
    const user = new User({
        username: "user",
        password: await hashPassword("password"),
        email: "user@gmail.com",
        role: "user"
    });
    for (const adventure of adventures) {
        const newAdventure = new Adventure({
            ...adventure,
            leader: admin._id
        });
        const newPost = new Post({
            author: admin._id,
            content: "This is a sample post",
            image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        })
        const newPost1 = new Post({
            author: admin._id,
            content: "This is a sample post",
            image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        })
        const newPost2 = new Post({
            author: admin._id,
            content: "This is a sample post",
            image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        })
        newAdventure.posts.push(newPost);
        newAdventure.posts.push(newPost1);
        newAdventure.posts.push(newPost2);
        admin.posts.push(newPost);
        admin.posts.push(newPost1);
        admin.posts.push(newPost2);
        await admin.save();
        await user.save();
        await newPost.save();
        await newPost1.save();
        await newPost2.save();
        await newAdventure.save();
    }
}

setDatabase().then(() => {
    mongoose.connection.close()
        .then(() => console.log("Database Connection Closed"));
})