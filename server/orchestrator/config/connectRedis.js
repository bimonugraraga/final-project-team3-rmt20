const Redis = require("ioredis");
const redis = new Redis({
  port: +process.env.REDISPORT, // Redis port
  host: process.env.REDISENDPOINT, // Redis host
  password: process.env.REDISPASSWORD,
});

module.exports = {
  redis,
};
