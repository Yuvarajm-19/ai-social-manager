require("dotenv").config();

const { Worker } = require("bullmq");
const approvalQueue = require("../queues/approval.queue");
const { connection } = require("../config/redis");

new Worker(
  "imageQueue",
  async job => {
    await approvalQueue.add(
      "approve",
      {
        post: job.data,
        image: { url: "placeholder.png" }
      },
      { removeOnComplete: false }
    );
  },
  { connection }
);
