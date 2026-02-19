require("dotenv").config();

const { Worker } = require("bullmq");
const { contentAgent } = require("../agents/content.agent");
const imageQueue = require("../queues/image.queue");
const { connection } = require("../config/redis");

new Worker("contentQueue", async job => {
  console.log("✍️ Content writing for:", job.data.angle);
  try {
    const post = await contentAgent(job.data);
    console.log("📄 Generated post:", post);
    await imageQueue.add("generate", post);
    console.log("🎨 Added to imageQueue");
  } catch (error) {
    console.error("❌ Content Error:", error);
    throw error; 
  }
}, { connection });
