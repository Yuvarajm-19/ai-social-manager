const { generateImage } = require("../services/replicate.service");

async function imageAgent(prompt) {
  const imageUrl = await generateImage(prompt);
  return {
    imagePrompt: prompt,
    url: imageUrl
  };
}

module.exports = { imageAgent };
