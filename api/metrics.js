/* GET /api/metrics
   Returns aggregated, anonymous exhibit metrics for the live admin page —
   gathered in ONE round-trip to the KV store via a pipeline:
     • views   — total, per-page, unique visitors, and a 14-day daily trend
     • likes    — { photoId: count }  (visitor likes; base counts are 0)
     • comments — { photoId: [ {name,text,when}, ... ] }
   No personal data. No auth (the page is simply unlisted). To lock it later,
   set ADMIN_KEY and add a header check here. 503 if KV isn't configured.   */
const { pipeline, hashToObj } = require("./_lib");

const PAGES = ["home", "gallery", "photographers", "faq"];

function lastDays(n) {
  const out = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(now.getUTCDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

module.exports = async (req, res) => {
  try {
    const days = lastDays(14);

    // Build one ordered command list, then read results back by index.
    const cmds = [
      ["GET", "views:total"],                         // 0
      ["SCARD", "visitors"],                          // 1
      ...PAGES.map(p => ["GET", "views:page:" + p]),  // 2 .. 2+PAGES.length-1
      ...days.map(d => ["GET", "views:day:" + d]),    // then 14 day counts
      ["HGETALL", "likes"],                           // second to last
      ["HGETALL", "comments"]                         // last
    ];

    const r = await pipeline(cmds);

    let i = 0;
    const total = Number(r[i++]) || 0;
    const uniques = Number(r[i++]) || 0;
    const byPage = {};
    PAGES.forEach(p => { byPage[p] = Number(r[i++]) || 0; });
    const daily = days.map(date => ({ date, count: Number(r[i++]) || 0 }));
    const likes = hashToObj(r[i++], Number);
    const comments = hashToObj(r[i++], JSON.parse);

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ views: { total, uniques, byPage, daily }, likes, comments, ts: Date.now() });
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
};
