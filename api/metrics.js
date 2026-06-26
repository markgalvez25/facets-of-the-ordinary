/* GET /api/metrics
   Returns aggregated, anonymous exhibit metrics for the admin page:
     • views   — total, per-page, unique visitors, and a 14-day daily trend
     • likes    — { photoId: count }  (visitor likes; base counts are 0)
     • comments — { photoId: [ {name,text,when}, ... ] }
   No personal data. No auth (the page is simply unlisted — reachable only
   by its URL). To lock it later, set an ADMIN_KEY env var and we can add a
   header check here. Returns 503 if the KV store isn't configured.        */
const { redis, hashToObj } = require("./_lib");

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
    const total = Number(await redis(["GET", "views:total"])) || 0;
    const uniques = Number(await redis(["SCARD", "visitors"])) || 0;

    const byPage = {};
    for (const p of PAGES) byPage[p] = Number(await redis(["GET", "views:page:" + p])) || 0;

    const days = lastDays(14);
    const daily = [];
    for (const day of days) {
      daily.push({ date: day, count: Number(await redis(["GET", "views:day:" + day])) || 0 });
    }

    const likes = hashToObj(await redis(["HGETALL", "likes"]), Number);
    const comments = hashToObj(await redis(["HGETALL", "comments"]), JSON.parse);

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ views: { total, uniques, byPage, daily }, likes, comments });
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
};
