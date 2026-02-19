require("dotenv").config();
const trendQueue = require("../src/queues/trend.queue");
const approvalQueue = require("../src/queues/approval.queue");

async function testFlow() {
  console.log("🧪 Starting flow test...");

  // 1. Clear queues (optional, but good for testing)
  await trendQueue.drain();
  await approvalQueue.drain();

  // 2. Add a job to the start of the pipeline
  const trend = {
    title: "Test Trend: AI is cool",
    context: "Everyone is talking about AI agents."
  };
  
  console.log("Adding job to trendQueue:", trend);
  await trendQueue.add("fetch", trend);

  console.log("Waiting for job to reach approvalQueue...");
  
  // 3. Poll approvalQueue for completion
  let attempts = 0;
  const maxAttempts = 60; // 60 seconds
  
  const checkInterval = setInterval(async () => {
    attempts++;
    const jobs = await approvalQueue.getJobs(["waiting", "active", "completed", "failed"]);
    
    // Find our job (checking loose match on title might be enough)
    const found = jobs.find(j => j.data.post && j.data.post.text); 
    const failed = jobs.find(j => j.failedReason);

    if (failed) {
        console.error("❌ Job Failed:", failed.failedReason);
        clearInterval(checkInterval);
        process.exit(1);
    }
    
    if (found) {
      console.log("✅ Success! Job found in approvalQueue:", found.data);
      clearInterval(checkInterval);
      process.exit(0);
    }

    if (attempts >= maxAttempts) {
      console.error("❌ Timeout: Job did not reach approvalQueue in time.");
      clearInterval(checkInterval);
      process.exit(1);
    }
  }, 1000);
}

testFlow();
