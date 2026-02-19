require("dotenv").config();

console.log("🚀 Starting all workers...");

require("./trend.worker");
require("./strategy.worker");
require("./content.worker");
require("./image.worker");

console.log("✅ All workers started");
