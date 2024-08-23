const redis = require("redis");

require("dotenv").config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("error", (err) => {
  console.log("Redis error:", err);
});

// Additional logging to debug Redis connection
console.log("Attempting to connect to Redis...");

redisClient.connect().catch((err) => {
  console.log("Failed to connect to Redis:", err);
});

module.exports = redisClient;
