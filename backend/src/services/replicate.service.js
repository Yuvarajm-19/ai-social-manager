const Replicate = require("replicate");

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

/**
 * Generate an image based on a prompt
 * @param {string} prompt - Image description
 * @returns {Promise<string>} - Image URL
 */
async function generateImage(prompt) {
    try {
        console.log("🎨 Generating image for:", prompt);

        const output = await replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    prompt: prompt,
                    width: 1024,
                    height: 1024,
                    refine: "expert_ensemble_refiner"
                }
            }
        );

        // Replicate returns an array of output URLs
        return output[0];
    } catch (error) {
        console.error("❌ Link generation failed:", error);
        return "https://placehold.co/1024x1024?text=Generation+Failed";
    }
}

module.exports = { generateImage };
