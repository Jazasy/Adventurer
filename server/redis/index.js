const { createClient } = require("redis");

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})

client.on('error', (err) => {
    console.error('Redis error:', err);
})

client.connect().then(()=>console.log("Redis connected"));

module.exports = client