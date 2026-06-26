/* =====================================================================
   FACETS OF THE ORDINARY — Live admin metrics
   Auto-refreshes every 30s (pauses when the tab is hidden, refreshes the
   moment you return). Renders KPIs, a 14-day trend, traffic, top photos,
   facet engagement, recent comments — plus an auto-generated "Insights"
   panel that reads the live data and writes the key takeaways in plain
   language. Joins server aggregates (by photo id) with data.js details.
   ===================================================================== */
(function () {
  const POLL_MS = 30000;
  let app, liveEl, lastData = null, lastFetch = 0, pollTimer = null;

  document.addEventListener("DOMContentLoaded", () => {
    app = document.getElementById("adm-app");
    liveEl = document.getElementById("adm-live");
    if (!app) return;
    app.innerHTML = `<p class="adm-loading">Loading live metrics…</p>`;
    fetchNow();
    setInterval(updateLiveLabel, 1000);               // tick the "updated Ns ago"
    document.addEventListener("visibilitychange", () => { if (!document.hidden) fetchNow(); });
  });

  function schedule() {
    clearTimeout(pollTimer);
    pollTimer = setTimeout(() => { if (!document.hidden) fetchNow(); else schedule(); }, POLL_MS);
  }

  async function fetchNow() {
    try {
      const r = await fetch("/api/metrics", { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const m = await r.json();
      lastData = m; lastFetch = Date.now();
      render(app, m);
      setLive(true);
    } catch (e) {
      if (!lastData) app.innerHTML = errorHTML(e);
      setLive(false);
    }
    schedule();
  }

  function setLive(ok) { if (liveEl) { liveEl.classList.toggle("off", !ok); updateLiveLabel(); } }
  function updateLiveLabel() {
    if (!liveEl) return;
    const off = liveEl.classList.contains("off");
    if (off && !lastData) { liveEl.innerHTML = `<span class="dot"></span> Offline`; return; }
    const s = lastFetch ? Math.round((Date.now() - lastFetch) / 1000) : 0;
    const ago = s < 5 ? "just now" : s < 60 ? s + "s ago" : Math.round(s / 60) + "m ago";
    liveEl.innerHTML = `<span class="dot"></span> ${off ? "Reconnecting…" : "Live"} · updated ${ago}`;
  }

  /* ----------------------------- render ----------------------------- */
  function render(app, m) {
    const likes = m.likes || {}, comments = m.comments || {};
    const views = m.views || { total: 0, uniques: 0, byPage: {}, daily: [] };

    const byId = {};
    (typeof PHOTOS !== "undefined" ? PHOTOS : []).forEach(p => (byId[p.id] = p));

    const cc = (id) => (comments[id] ? comments[id].length : 0);
    const totalLikes = Object.values(likes).reduce((s, n) => s + (Number(n) || 0), 0);
    const totalComments = Object.keys(comments).reduce((s, id) => s + cc(id), 0);

    /* KPIs */
    const kpis = [
      ["Page views", views.total], ["Unique visitors", views.uniques],
      ["Total likes", totalLikes], ["Comments", totalComments]
    ].map(([l, n]) => `<div class="adm-kpi"><div class="l">${l}</div><div class="n">${(n || 0).toLocaleString()}</div></div>`).join("");

    /* Insights (auto-generated) */
    const insights = buildInsights({ likes, comments, views, byId, cc, totalLikes, totalComments });
    const insightsHTML = `
      <div class="adm-panel adm-insights">
        <h3><span class="adm-ai">✦</span> Insights</h3>
        <div class="sub">Auto-generated from your live data · updates as people visit</div>
        <ul>${insights.map(t => `<li>${t}</li>`).join("")}</ul>
      </div>`;

    /* Trend sparkline */
    const daily = views.daily || [];
    const maxDay = Math.max(1, ...daily.map(d => d.count));
    const spark = daily.length
      ? daily.map(d => `<span style="height:${Math.max(4, Math.round(d.count / maxDay * 100))}%" data-tip="${fmtDay(d.date)} · ${d.count} view${d.count === 1 ? "" : "s"}"></span>`).join("")
      : `<p class="adm-empty">No view data yet</p>`;

    /* Traffic by page */
    const labels = { home: "Home", gallery: "Gallery", photographers: "Photographers", faq: "FAQ" };
    const pages = Object.entries(views.byPage || {}).sort((a, b) => b[1] - a[1]);
    const maxPage = Math.max(1, ...pages.map(p => p[1]));
    const traffic = pages.length
      ? pages.map(([k, v]) => bar(labels[k] || k, v, maxPage)).join("")
      : `<p class="adm-empty">No view data yet</p>`;

    /* Top photographs */
    const top = Object.entries(likes).map(([id, n]) => ({ id, likes: Number(n) || 0 }))
      .filter(x => x.likes > 0 || cc(x.id) > 0).sort((a, b) => b.likes - a.likes).slice(0, 8);
    const topRows = top.length ? top.map((x, i) => {
      const p = byId[x.id], ph = p && typeof getPhotographer === "function" ? getPhotographer(p.photographer) : null;
      return `<tr><td class="rank">${i + 1}</td><td class="t">${esc(p ? p.title : x.id)}</td><td>${esc(ph ? ph.name : "—")}</td><td>${x.likes}</td><td>${cc(x.id)}</td></tr>`;
    }).join("") : `<tr><td colspan="5" class="adm-empty">No likes or comments yet</td></tr>`;

    /* Engagement by facet */
    const facets = { People: 0, Spaces: 0, Objects: 0, Moments: 0 };
    Object.keys(byId).forEach(id => { const c = byId[id].category; if (c in facets) facets[c] += (Number(likes[id]) || 0) + cc(id); });
    const fe = Object.entries(facets).sort((a, b) => b[1] - a[1]);
    const maxFacet = Math.max(1, ...fe.map(f => f[1]));
    const facetBars = fe.map(([k, v]) => bar(k, v, maxFacet)).join("");

    /* Recent comments */
    const flat = [];
    Object.keys(comments).forEach(id => (comments[id] || []).forEach(c => flat.push({ id, ...c })));
    const recent = flat.slice(-6).reverse();
    const recentHTML = recent.length ? recent.map(c => {
      const p = byId[c.id];
      return `<div class="adm-cmt"><div class="adm-av">${(c.name && c.name[0] || "?").toUpperCase()}</div>
        <div><span class="who">${esc(c.name || "Anonymous")}</span><span class="meta"> · ${esc(p ? p.title : c.id)} · ${esc(c.when || "")}</span>
        <div class="txt">${esc(c.text || "")}</div></div></div>`;
    }).join("") : `<p class="adm-empty">No comments yet</p>`;

    app.innerHTML = `
      <div class="adm-kpis">${kpis}</div>
      ${insightsHTML}
      <div class="adm-grid2">
        <div class="adm-panel"><h3>Views over time</h3><div class="sub">Daily page views · last 14 days</div><div class="adm-spark">${spark}</div></div>
        <div class="adm-panel"><h3>Traffic by page</h3><div class="sub">Which pages visitors open</div><div class="adm-bars">${traffic}</div></div>
      </div>
      <div class="adm-grid2">
        <div class="adm-panel"><h3>Top photographs</h3><div class="sub">Most liked · all time</div>
          <table class="adm-table"><thead><tr><th>#</th><th>Title</th><th>Photographer</th><th>♥</th><th>💬</th></tr></thead><tbody>${topRows}</tbody></table></div>
        <div class="adm-panel"><h3>Engagement by facet</h3><div class="sub">Likes + comments per theme</div>
          <div class="adm-bars" style="margin-bottom:18px">${facetBars}</div>
          <h4 class="adm-subhead">Recent comments</h4>${recentHTML}</div>
      </div>
      <div class="adm-note">Live data from the connected KV store · auto-refreshing every 30s</div>`;
  }

  function bar(label, v, max) {
    return `<div class="adm-bar"><div class="r"><span>${esc(label)}</span><b>${(v || 0).toLocaleString()}</b></div>
      <div class="adm-track"><div class="adm-fill" style="width:${Math.round((v || 0) / max * 100)}%"></div></div></div>`;
  }

  /* -------- automated insight writer (reads data → plain language) -------- */
  function buildInsights(d) {
    const { likes, views, byId, cc, totalLikes, totalComments } = d;
    const out = [];
    const pages = Object.entries(views.byPage || {});
    const pageTotal = pages.reduce((s, p) => s + p[1], 0);

    if (views.total) {
      const t = trend(views.daily || []);
      const tt = t > 5 ? ` — trending up ${t}% over the last week`
              : t < -5 ? ` — down ${Math.abs(t)}% over the last week` : "";
      out.push(`<b>${views.total.toLocaleString()}</b> page views from <b>${(views.uniques || 0).toLocaleString()}</b> unique visitors${tt}.`);
    }
    if (pageTotal) {
      const labels = { home: "Home", gallery: "Gallery", photographers: "Photographers", faq: "FAQ" };
      const tp = pages.slice().sort((a, b) => b[1] - a[1])[0];
      out.push(`<b>${labels[tp[0]] || tp[0]}</b> is the most-visited page (${Math.round(tp[1] / pageTotal * 100)}% of views).`);
    }
    const topId = Object.keys(likes).sort((a, b) => likes[b] - likes[a])[0];
    if (topId && likes[topId] > 0) {
      const p = byId[topId], ph = p && typeof getPhotographer === "function" ? getPhotographer(p.photographer) : null;
      out.push(`“${esc(p ? p.title : topId)}”${ph ? " by " + esc(ph.name) : ""} is the most-liked work (<b>${likes[topId]}</b> ♥).`);
    }
    const facets = { People: 0, Spaces: 0, Objects: 0, Moments: 0 };
    Object.keys(byId).forEach(id => { const c = byId[id].category; if (c in facets) facets[c] += (Number(likes[id]) || 0) + cc(id); });
    const fe = Object.entries(facets).sort((a, b) => b[1] - a[1]);
    if (fe[0][1] > 0) out.push(`The <b>${fe[0][0]}</b> facet is driving the most engagement (${fe[0][1]} reactions).`);
    if (totalLikes + totalComments > 0) out.push(`Visitors have left <b>${totalLikes}</b> likes and <b>${totalComments}</b> comments so far.`);
    if (!out.length) out.push(`No activity yet — share the exhibit link to start collecting views, likes, and comments.`);
    return out;
  }

  function trend(daily) {
    if (!daily || daily.length < 6) return 0;
    const first = daily.slice(0, 3).reduce((s, d) => s + d.count, 0) / 3;
    const last = daily.slice(-3).reduce((s, d) => s + d.count, 0) / 3;
    if (first <= 0) return last > 0 ? 100 : 0;
    return Math.round((last - first) / first * 100);
  }

  function errorHTML(e) {
    return `<div class="adm-error"><h3>Couldn't load metrics</h3>
      <p>This page only works on the deployed site with the KV store connected.
      (Opened locally there's no <code>/api</code>, so there's nothing to read.)</p>
      <p class="adm-dim">Details: ${esc(e.message)}</p></div>`;
  }
  function fmtDay(s) {
    const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const p = String(s).split("-");
    return p.length === 3 ? m[(+p[1]) - 1] + " " + (+p[2]) : s;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
})();
