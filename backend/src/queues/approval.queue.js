const { Queue } = require("bullmq");
const { connection } = require("../config/redis");

module.exports = new Queue("approvalQueue", { connection });
