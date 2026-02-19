require("dotenv").config();

const { Worker } = require("bullmq");
const trendQueue = require("../queues/trend.queue");
const strategyQueue = require("../queues/strategy.queue");
const { connection } = require("../config/redis");

console.log("📡 Trend Worker running");

new Worker(
  "trendQueue",
  async job => {
    console.log("📈 Trend:", job.data);
    await strategyQueue.add("analyze", job.data);
  },
  { connection }
);

// simulate incoming trend
(async () => {
  await trendQueue.add("fetch", {
    title: "AI replacing junior developers",
    context: "Trending discussion on Reddit"
  });
})();
