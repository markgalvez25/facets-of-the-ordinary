/* POST /api/track   body: { page, vid }
   Records one anonymous page view in the KV store:
     • views:total                 (running total)
     • views:page:<page>           (per-page total)
     • views:day:<YYYY-MM-DD>      (per-day total, for the trend line)
     • visitors  (a SET of anonymous ids → unique-visitor count)
   Stores no personal data. Fails quietly (503) if KV isn't configured.  */
const { redis, getBody } = require("./_lib");

const PAGES = { home: 1, gallery: 1, photographers: 1, faq: 1 };

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "POST only" }); return; }
  try {
    const { page, vid } = getBody(req);
    const p = PAGES[page] ? page : "home";
    const day = new Date().toISOString().slice(0, 10); // server date, UTC

    await redis(["INCR", "views:total"]);
    await redis(["INCR", "views:page:" + p]);
    await redis(["INCR", "views:day:" + day]);
    if (vid) await redis(["SADD", "visitors", String(vid).slice(0, 40)]);

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
};
