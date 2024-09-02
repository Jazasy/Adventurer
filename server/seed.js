const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const Adventure = require("./models/adventure");
const User = require("./models/user");

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
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhaWxpbmd8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1664304679616-b35eb168e3e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        title: "Learn to surf",
        images: [
            "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D",
        ],
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://images.unsplash.com/photo-1617480348565-d60644e43fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bmdmdXxlbnwwfHwwfHx8MA%3D%3D",
        ],
    },
    {
        title: "Climbing the K2",
        images: [
            "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhaWxpbmd8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1664304679616-b35eb168e3e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        title: "Learn to surf",
        images: [
            "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D",
        ],
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://images.unsplash.com/photo-1617480348565-d60644e43fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bmdmdXxlbnwwfHwwfHx8MA%3D%3D",
        ],
    },
    {
        title: "Climbing the K2",
        images: [
            "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhaWxpbmd8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1664304679616-b35eb168e3e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        title: "Learn to surf",
        images: [
            "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D",
        ],
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://images.unsplash.com/photo-1617480348565-d60644e43fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bmdmdXxlbnwwfHwwfHx8MA%3D%3D",
        ],
    },
    {
        title: "Climbing the K2",
        images: [
            "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhaWxpbmd8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1664304679616-b35eb168e3e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        title: "Learn to surf",
        images: [
            "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D",
        ],
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://images.unsplash.com/photo-1617480348565-d60644e43fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bmdmdXxlbnwwfHwwfHx8MA%3D%3D",
        ],
    },
    {
        title: "Climbing the K2",
        images: [
            "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        title: "Sailing across the Pacific Ocean",
        images: [
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhaWxpbmd8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1664304679616-b35eb168e3e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
    },
    {
        title: "Learn to surf",
        images: [
            "https://images.unsplash.com/photo-1486890598084-3673ba1808c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D",
        ],
    },
    {
        title: "Go China to learn kungfu",
        images: [
            "https://images.unsplash.com/photo-1617480348565-d60644e43fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bmdmdXxlbnwwfHwwfHx8MA%3D%3D",
        ],
    },
];

const setDatabase = async () => {
    await Adventure.deleteMany({});
    await User.deleteMany({});
    const admin = new User({
        username: "admin",
        password: "admin",
        email: "admin@gmail.com",
        role: "admin"
    });
    const user = new User({
        username: "user",
        password: "password",
        email: "user@gmail.com",
        role: "user"
    });
    await admin.save();
    await user.save();
    for (const adventure of adventures) {
        const newAdventure = new Adventure({
            ...adventure,
            leader: admin._id
        });
        await newAdventure.save();
    }
}

setDatabase().then(() => {
    mongoose.connection.close()
        .then(() => console.log("Database Connection Closed"));
})