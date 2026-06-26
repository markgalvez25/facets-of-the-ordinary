/* =====================================================================
   FACETS OF THE ORDINARY — Admin metrics renderer
   Fetches /api/metrics and renders the dashboard. Joins server-side
   aggregates (keyed by photo id) with the photo/photographer details
   from data.js so it can show real titles and names.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("adm-app");
  if (!app) return;

  app.innerHTML = `<p class="adm-loading">Loading metrics…</p>`;

  let m;
  try {
    const r = await fetch("/api/metrics", { cache: "no-store" });
    if (!r.ok) throw new Error("HTTP " + r.status);
    m = await r.json();
  } catch (e) {
    app.innerHTML = `
      <div class="adm-error">
        <h3>Couldn't load metrics</h3>
        <p>This page only works on the deployed site with the KV store connected.
        (Opened locally there's no <code>/api</code>, so there's nothing to read.)</p>
        <p class="adm-dim">Details: ${escapeHTML(e.message)}</p>
      </div>`;
    return;
  }

  render(app, m);
});

function render(app, m) {
  const likes = m.likes || {};
  const comments = m.comments || {};
  const views = m.views || { total: 0, uniques: 0, byPage: {}, daily: [] };

  // photo id → record, for joining titles/photographers/categories
  const byId = {};
  (typeof PHOTOS !== "undefined" ? PHOTOS : []).forEach(p => (byId[p.id] = p));

  const totalLikes = Object.values(likes).reduce((s, n) => s + (Number(n) || 0), 0);
  const commentCount = (id) => (comments[id] ? comments[id].length : 0);
  const totalComments = Object.keys(comments).reduce((s, id) => s + commentCount(id), 0);

  /* ---- KPIs ---- */
  const kpis = [
    ["Page views", views.total],
    ["Unique visitors", views.uniques],
    ["Total likes", totalLikes],
    ["Comments", totalComments]
  ].map(([l, n]) => `<div class="adm-kpi"><div class="l">${l}</div><div class="n">${(n || 0).toLocaleString()}</div></div>`).join("");

  /* ---- Views over time (14-day sparkline) ---- */
  const daily = views.daily || [];
  const maxDay = Math.max(1, ...daily.map(d => d.count));
  const spark = daily.map(d =>
    `<span style="height:${Math.max(4, Math.round(d.count / maxDay * 100))}%" title="${d.date}: ${d.count}"></span>`
  ).join("") || `<span class="adm-empty">No view data yet</span>`;

  /* ---- Traffic by page ---- */
  const labels = { home: "Home", gallery: "Gallery", photographers: "Photographers", faq: "FAQ" };
  const pages = Object.entries(views.byPage || {}).sort((a, b) => b[1] - a[1]);
  const maxPage = Math.max(1, ...pages.map(p => p[1]));
  const traffic = pages.map(([k, v]) =>
    `<div class="adm-bar"><div class="r"><span>${labels[k] || k}</span><b>${v.toLocaleString()}</b></div>
     <div class="adm-track"><div class="adm-fill" style="width:${Math.round(v / maxPage * 100)}%"></div></div></div>`
  ).join("");

  /* ---- Top photographs (by likes) ---- */
  const top = Object.entries(likes)
    .map(([id, n]) => ({ id, likes: Number(n) || 0 }))
    .filter(x => x.likes > 0 || commentCount(x.id) > 0)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 8);
  const topRows = top.length ? top.map((x, i) => {
    const p = byId[x.id];
    const ph = p && typeof getPhotographer === "function" ? getPhotographer(p.photographer) : null;
    return `<tr>
      <td class="rank">${i + 1}</td>
      <td class="t">${escapeHTML(p ? p.title : x.id)}</td>
      <td>${escapeHTML(ph ? ph.name : "—")}</td>
      <td>${x.likes}</td>
      <td>${commentCount(x.id)}</td>
    </tr>`;
  }).join("") : `<tr><td colspan="5" class="adm-empty">No likes or comments yet</td></tr>`;

  /* ---- Engagement by facet ---- */
  const facets = { People: 0, Spaces: 0, Objects: 0, Moments: 0 };
  Object.keys(byId).forEach(id => {
    const cat = byId[id].category;
    if (cat in facets) facets[cat] += (Number(likes[id]) || 0) + commentCount(id);
  });
  const facetEntries = Object.entries(facets).sort((a, b) => b[1] - a[1]);
  const maxFacet = Math.max(1, ...facetEntries.map(f => f[1]));
  const facetBars = facetEntries.map(([k, v]) =>
    `<div class="adm-bar"><div class="r"><span>${k}</span><b>${v}</b></div>
     <div class="adm-track"><div class="adm-fill" style="width:${Math.round(v / maxFacet * 100)}%"></div></div></div>`
  ).join("");

  /* ---- Recent comments (most recently appended) ---- */
  const flat = [];
  Object.keys(comments).forEach(id => (comments[id] || []).forEach(c => flat.push({ id, ...c })));
  const recent = flat.slice(-6).reverse();
  const recentHTML = recent.length ? recent.map(c => {
    const p = byId[c.id];
    return `<div class="adm-cmt">
      <div class="adm-av">${(c.name && c.name[0] || "?").toUpperCase()}</div>
      <div><span class="who">${escapeHTML(c.name || "Anonymous")}</span>
      <span class="meta">· ${escapeHTML(p ? p.title : c.id)} · ${escapeHTML(c.when || "")}</span>
      <div class="txt">${escapeHTML(c.text || "")}</div></div>
    </div>`;
  }).join("") : `<p class="adm-empty">No comments yet</p>`;

  app.innerHTML = `
    <div class="adm-kpis">${kpis}</div>

    <div class="adm-grid2">
      <div class="adm-panel">
        <h3>Views over time</h3>
        <div class="sub">Daily page views · last 14 days</div>
        <div class="adm-spark">${spark}</div>
      </div>
      <div class="adm-panel">
        <h3>Traffic by page</h3>
        <div class="sub">Which pages visitors open</div>
        <div class="adm-bars">${traffic || '<p class="adm-empty">No view data yet</p>'}</div>
      </div>
    </div>

    <div class="adm-grid2">
      <div class="adm-panel">
        <h3>Top photographs</h3>
        <div class="sub">Most liked · all time</div>
        <table class="adm-table">
          <thead><tr><th>#</th><th>Title</th><th>Photographer</th><th>♥</th><th>💬</th></tr></thead>
          <tbody>${topRows}</tbody>
        </table>
      </div>
      <div class="adm-panel">
        <h3>Engagement by facet</h3>
        <div class="sub">Likes + comments per theme</div>
        <div class="adm-bars" style="margin-bottom:18px">${facetBars}</div>
        <h4 class="adm-subhead">Recent comments</h4>
        ${recentHTML}
      </div>
    </div>

    <div class="adm-note">Live data from the connected KV store · refresh the page to update</div>`;
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
