const { runPrompt } = require("../services/openai.service");

async function strategyAgent(trend) {
  const prompt = `
You are a brand strategy agent.

Trend:
Title: ${trend.title}
Context: ${trend.context}

Return ONLY valid JSON:
{
  "shouldPost": true,
  "reason": "...",
  "angle": "...",
  "objective": "engagement"
}
`;

  return JSON.parse(await runPrompt(prompt));
}

module.exports = { strategyAgent };
