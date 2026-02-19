require("dotenv").config();
const express = require("express");
const router = express.Router();
const approvalQueue = require("../queues/approval.queue");

router.get("/", async (req, res) => {
  const states = ["waiting", "completed", "delayed", "paused"];
  const result = {};

  for (const state of states) {
    const jobs = await approvalQueue.getJobs([state]);
    result[state] = jobs.map(j => ({
      id: j.id,
      state,
      data: j.data
    }));
  }

  res.json(result);
});

module.exports = router;
