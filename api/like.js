/* POST /api/like   body: { id, op: "like" | "unlike" }
   Increments / decrements the shared like delta for a photo.            */
const { redis, getBody } = require("./_lib");

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "POST only" }); return; }
  try {
    const { id, op } = getBody(req);
    if (!id) { res.status(400).json({ error: "id required" }); return; }
    const delta = op === "unlike" ? -1 : 1;
    const count = await redis(["HINCRBY", "likes", String(id), delta]);
    res.status(200).json({ id, count: Number(count) });
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
};
