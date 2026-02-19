const IORedis = require("ioredis");

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null,
});

connection.on("connect", () => console.log("✅ Redis connected"));
connection.on("error", err => console.error("❌ Redis error", err));

module.exports = { connection };
