const { runPrompt } = require("../services/openai.service");

async function contentAgent(strategy) {
  const prompt = `
Write a short Twitter/X post.

Angle: ${strategy.angle}
Objective: ${strategy.objective}

Return ONLY valid JSON:
{
  "text": "...",
  "hashtags": ["#AI"],
  "cta": "..."
}
`;

  return JSON.parse(await runPrompt(prompt));
}

module.exports = { contentAgent };
