require("dotenv").config();

const { Worker } = require("bullmq");
const { strategyAgent } = require("../agents/strategy.agent");
const contentQueue = require("../queues/content.queue");
const { connection } = require("../config/redis");

new Worker("strategyQueue", async job => {
  console.log("🤔 Strategy analyzing:", job.data.title);
  try {
    const decision = await strategyAgent(job.data);
    console.log("🧠 Strategy decision:", decision);
    if (decision.shouldPost) {
      await contentQueue.add("write", decision);
      console.log("📝 Added to contentQueue");
    } else {
      console.log("🚫 Strategy decided NOT to post");
    }
  } catch (error) {
    console.error("❌ Strategy Error:", error);
    throw error;
  }
}, { connection });
