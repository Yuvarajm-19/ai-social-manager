require('dotenv').config();
const Groq = require("groq-sdk");

// Only initialize Groq if we have a key and NOT in mock mode
const client = process.env.MOCK_AI === 'true' 
  ? null 
  : new Groq({ apiKey: process.env.GROQ_API_KEY });

async function runPrompt(prompt) {
  if (process.env.MOCK_AI === 'true') {
    console.log("🤖 [MOCK MODE] Returning dummy response for prompt:", prompt.substring(0, 50) + "...");
    
    // Simple heuristic to return different JSON based on what the agent expects
    // 1. Strategy Agent expects "shouldPost", "reason", "angle", "objective"
    if (prompt.includes("brand strategy agent")) {
      return JSON.stringify({
        shouldPost: true,
        reason: "Mock strategy decided this is a good trend.",
        angle: "AI is the future of work",
        objective: "engagement"
      });
    }

    // 2. Content Agent expects "text", "hashtags", "cta"
    if (prompt.includes("Twitter/X post")) {
      return JSON.stringify({
        text: "AI is changing the game! 🚀 #FutureOfWork",
        hashtags: ["#AI", "#Tech"],
        cta: "What do you think?"
      });
    }

    // Default fallback
    return JSON.stringify({ message: "Mock response" });
  }

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });
  return response.choices[0].message.content;
}

module.exports = { runPrompt };
