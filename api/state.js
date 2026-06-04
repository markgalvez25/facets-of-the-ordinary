/* GET /api/state
   Returns all visitor-contributed likes (deltas on top of each photo's
   base count) and comments, so the front-end can show live totals.       */
const { redis, hashToObj } = require("./_lib");

module.exports = async (req, res) => {
  try {
    const likesRaw = await redis(["HGETALL", "likes"]);
    const commentsRaw = await redis(["HGETALL", "comments"]);
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      likes: hashToObj(likesRaw, Number),
      comments: hashToObj(commentsRaw, JSON.parse)
    });
  } catch (e) {
    // No KV configured (or it errored) → tell the client to use localStorage
    res.status(503).json({ error: e.message });
  }
};
