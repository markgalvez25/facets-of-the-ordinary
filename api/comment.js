/* POST /api/comment   body: { id, name, text }
   Appends a visitor comment to a photo (stored in the shared KV).        */
const { redis, getBody } = require("./_lib");

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "POST only" }); return; }
  try {
    const { id, name, text } = getBody(req);
    if (!id || !name || !text) { res.status(400).json({ error: "id, name and text required" }); return; }
    const comment = {
      name: String(name).trim().slice(0, 40),
      text: String(text).trim().slice(0, 240),
      when: "just now"
    };
    const existing = await redis(["HGET", "comments", String(id)]);
    const list = existing ? JSON.parse(existing) : [];
    list.push(comment);
    await redis(["HSET", "comments", String(id), JSON.stringify(list)]);
    res.status(200).json({ id, comment });
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
};
