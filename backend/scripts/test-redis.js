const IORedis = require("ioredis");

async function testConnection(port) {
  console.log(`Testing Redis connection on port ${port}...`);
  const redis = new IORedis({ port, maxRetriesPerRequest: null, retryStrategy: () => null }); // no retry
  
  try {
    await new Promise((resolve, reject) => {
      redis.on("connect", () => {
        console.log(`✅ Connected to Redis on port ${port}`);
        redis.disconnect();
        resolve();
      });
      redis.on("error", (err) => {
        console.log(`❌ Failed to connect on port ${port}: ${err.message}`);
        redis.disconnect();
        resolve(); // resolve to continue testing other ports
      });
    });
  } catch (e) {
    console.log(`❌ Error testing port ${port}: ${e.message}`);
  }
}

(async () => {
  await testConnection(6379);
  await testConnection(6380);
})();
