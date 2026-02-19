const axios = require("axios");

/**
 * Fetch top posts from a subreddit
 * @param {string} subreddit - Subreddit name (default: "technews")
 * @returns {Promise<Array>} - List of trends
 */
async function fetchTrends(subreddit = "technews") {
    try {
        const url = `https://www.reddit.com/r/${subreddit}/top.json?limit=5&t=day`;
        const response = await axios.get(url);
        const posts = response.data.data.children;

        return posts.map(post => ({
            title: post.data.title,
            context: post.data.selftext || post.data.url,
            score: post.data.score,
            url: `https://reddit.com${post.data.permalink}`
        }));
    } catch (error) {
        console.error(`❌ Error fetching Reddit trends: ${error.message}`);
        return [];
    }
}

module.exports = { fetchTrends };
