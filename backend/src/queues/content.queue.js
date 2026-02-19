const { Queue } = require("bullmq");
const { connection } = require("../config/redis");

const contentQueue = new Queue("contentQueue", { connection });

module.exports = contentQueue;
