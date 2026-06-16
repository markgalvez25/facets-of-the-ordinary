/* =====================================================================
   FACETS OF THE ORDINARY — Gallery + photo viewer
   Renders the grid, filtering, and the full lightbox experience:
   heart reactions (with double-tap like Instagram), a persistent
   comment section, and social sharing.

   STORAGE
   Likes and comments are read/written through `Store`, which talks to
   the serverless API (/api/state, /api/like, /api/comment) when it is
   available — that makes them LIVE and SHARED across all visitors once
   the site is deployed on Vercel with a KV store connected. If the API
   is unreachable (opened as a local file, or no KV configured yet), it
   transparently falls back to per-browser localStorage so nothing breaks.
   ===================================================================== */

const ICONS = {
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  heartFill: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21 4.2 13.4l-1-1a5.5 5.5 0 0 1 7.8-7.8l1 1 1-1a5.5 5.5 0 0 1 7.8 7.8l-1 1z"/></svg>',
  comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9 9 0 0 1-4-1L3 20l1-4a8.4 8.4 0 0 1-1-4.5 8.5 8.5 0 0 1 9-8.5 8.5 8.5 0 0 1 9 8.5z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18 9 12l6-6"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9h2.8L15.7 15h-2.3v7A10 10 0 0 0 22 12z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2h3.3l-7.2 8.3L23 22h-6.6l-5.2-6.8L5.3 22H2l7.7-8.8L1.7 2h6.8l4.7 6.2L18.2 2zm-1.2 18h1.8L7.1 3.9H5.2L17 20z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.2-.8 3.4-.2 1 .5 1.8 1.5 1.8 1.8 0 3-2.3 3-5 0-2-1.4-3.6-4-3.6-2.9 0-4.7 2.2-4.7 4.6 0 .8.2 1.4.6 1.9.2.2.2.3.1.5l-.2.9c-.1.3-.3.4-.6.2-1.1-.5-1.7-1.9-1.7-3.2 0-2.6 2-5.8 6-5.8 3.2 0 5.3 2.3 5.3 4.8 0 3.3-1.8 5.7-4.5 5.7-.9 0-1.8-.5-2.1-1.1l-.6 2.3c-.2.8-.7 1.6-1 2.2A10 10 0 1 0 12 2z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.5.1.3.6 1 1.4 1.7 1 .9 1.8 1.1 2 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.5.3.1.2.1.6-.1 1z"/></svg>'
};

/* =====================================================================
   STORE — likes & comments, remote (shared) with localStorage fallback
   ===================================================================== */
const Store = {
  mode: "local",      // becomes "remote" once /api/state responds
  likes: {},          // { photoId: deltaCount }  (added on top of base)
  comments: {},       // { photoId: [ {name,text,when}, ... ] }
  liked: {},          // { photoId: true }  — always per-browser (this visitor)

  _ls(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  _save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} },

  async init() {
    this.liked = this._ls("foto_liked", {});           // who-liked stays local
    try {
      const r = await fetch("/api/state", { cache: "no-store" });
      if (!r.ok) throw new Error("no api");
      const d = await r.json();
      this.likes = d.likes || {};
      this.comments = d.comments || {};
      this.mode = "remote";
    } catch (e) {
      this.mode = "local";
      this.likes = this._ls("foto_likes", {});
      this.comments = this._ls("foto_comments", {});
    }
  },

  isLiked(id) { return !!this.liked[id]; },
  delta(id) { return this.likes[id] || 0; },
  list(id) { return this.comments[id] || []; },

  async setLike(id, forceOn) {
    const liked = !!this.liked[id];
    let willLike;
    if (forceOn) { if (liked) return true; willLike = true; }
    else willLike = !liked;

    if (willLike) this.liked[id] = true; else delete this.liked[id];
    this._save("foto_liked", this.liked);

    if (this.mode === "remote") {
      try {
        const r = await fetch("/api/like", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, op: willLike ? "like" : "unlike" })
        });
        const d = await r.json();
        if (typeof d.count === "number") this.likes[id] = d.count;
      } catch (e) {
        this.likes[id] = (this.likes[id] || 0) + (willLike ? 1 : -1); // optimistic
      }
    } else {
      this.likes[id] = (this.likes[id] || 0) + (willLike ? 1 : -1);
      this._save("foto_likes", this.likes);
    }
    return willLike;
  },

  async addComment(id, name, text) {
    const local = { name, text, when: "just now" };
    if (this.mode === "remote") {
      try {
        const r = await fetch("/api/comment", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, name, text })
        });
        const d = await r.json();
        const c = d.comment || local;
        (this.comments[id] || (this.comments[id] = [])).push(c);
        return c;
      } catch (e) { /* fall through to local */ }
    }
    (this.comments[id] || (this.comments[id] = [])).push(local);
    if (this.mode !== "remote") this._save("foto_comments", this.comments);
    return local;
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("grid");
  if (!grid) return;

  await Store.init();   // load live likes/comments (or fall back to local)

  const totalLikes = (p) => p.likes + Store.delta(p.id);
  const allComments = (p) => [...p.comments, ...Store.list(p.id)];

  /* -------- Build the grid -------- */
  let activeFilter = "All";
  let phLock = null;            // when set, the grid + lightbox are locked to one photographer's photos

  function cardHTML(p) {
    const ph = getPhotographer(p.photographer);
    return `
      <article class="card reveal" data-id="${p.id}">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        <div class="card-meta">${Store.isLiked(p.id) ? ICONS.heartFill : ICONS.heart}<span>${totalLikes(p)}</span></div>
        <div class="card-info">
          <h3>${p.title}</h3>
          <div class="by">${ph.name} · ${p.category}</div>
        </div>
      </article>`;
  }

  function currentList() {
    if (phLock) return phLock;   // locked to a single photographer's collection
    return activeFilter === "All" ? PHOTOS : PHOTOS.filter(p => p.category === activeFilter);
  }

  function render() {
    grid.innerHTML = currentList().map(cardHTML).join("");
    grid.querySelectorAll(".reveal").forEach((el, i) => setTimeout(() => el.classList.add("in"), 40 + i * 25));
  }

  /* -------- Filters -------- */
  const filterBar = document.getElementById("filters");
  if (filterBar) {
    const cats = ["All", ...new Set(PHOTOS.map(p => p.category))];
    filterBar.innerHTML = cats.map((c, i) =>
      `<button class="${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
    filterBar.addEventListener("click", e => {
      const btn = e.target.closest("button");
      if (!btn || !btn.dataset.cat) return;   // ignore non-category buttons (e.g. the photographer chip)
      activeFilter = btn.dataset.cat;
      filterBar.querySelectorAll("button").forEach(b => b.classList.toggle("active", b === btn));
      render();
    });
  }

  const params = new URLSearchParams(location.search);
  const phFilter = params.get("photographer");

  render();

  /* =====================================================================
     LIGHTBOX / PHOTO VIEWER
     ===================================================================== */
  const lb = document.getElementById("lightbox");
  let viewList = [];
  let viewIndex = 0;

  lb.innerHTML = `
    <button class="lb-close" aria-label="Close">${ICONS.close}</button>
    <div class="lb-inner">
      <div class="lb-stage-row">
        <button class="lb-nav lb-prev" aria-label="Previous">${ICONS.prev}</button>
        <div class="lb-deck">
          <img class="lb-side lb-side-prev" id="lb-prev-img" alt="" aria-hidden="true">
          <figure class="lb-focus">
            <img id="lb-img" alt="">
            <div class="lb-heart-burst" style="color:var(--heart)">${ICONS.heartFill}</div>
          </figure>
          <img class="lb-side lb-side-next" id="lb-next-img" alt="" aria-hidden="true">
        </div>
        <button class="lb-nav lb-next" aria-label="Next">${ICONS.next}</button>
      </div>

      <div class="lb-info">
        <div class="lb-meta">
          <span class="lb-cat" id="lb-cat"></span>
          <h2 id="lb-title"></h2>
          <p id="lb-caption"></p>
          <div class="lb-author">
            <img id="lb-av" alt="">
            <div><div class="nm" id="lb-author-name"></div><div class="ro" id="lb-author-role"></div></div>
          </div>
        </div>
        <div class="lb-actions">
          <button class="icon-btn like-btn" id="lb-like" aria-label="Like">${ICONS.heart}</button>
          <span class="like-count" id="lb-likecount">0</span>
          <button class="icon-btn" id="lb-comment-focus" aria-label="Comment">${ICONS.comment}</button>
          <div class="share-wrap">
            <button class="icon-btn" id="lb-share" aria-label="Share">${ICONS.share}</button>
            <div class="share-menu" id="lb-share-menu"></div>
          </div>
        </div>
        <div class="lb-comments" id="lb-comments"></div>
        <form class="lb-form" id="lb-form">
          <div class="row"><input id="lb-name" type="text" placeholder="Your name" maxlength="40" required></div>
          <div class="row">
            <input id="lb-text" type="text" placeholder="Add a comment…" maxlength="240" required>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>`;

  const el = {
    img: lb.querySelector("#lb-img"),
    prevImg: lb.querySelector("#lb-prev-img"),
    nextImg: lb.querySelector("#lb-next-img"),
    burst: lb.querySelector(".lb-heart-burst"),
    cat: lb.querySelector("#lb-cat"),
    title: lb.querySelector("#lb-title"),
    caption: lb.querySelector("#lb-caption"),
    av: lb.querySelector("#lb-av"),
    authorName: lb.querySelector("#lb-author-name"),
    authorRole: lb.querySelector("#lb-author-role"),
    like: lb.querySelector("#lb-like"),
    likeCount: lb.querySelector("#lb-likecount"),
    comments: lb.querySelector("#lb-comments"),
    form: lb.querySelector("#lb-form"),
    name: lb.querySelector("#lb-name"),
    text: lb.querySelector("#lb-text"),
    shareBtn: lb.querySelector("#lb-share"),
    shareMenu: lb.querySelector("#lb-share-menu")
  };

  function renderComments(p) {
    const list = allComments(p);
    el.comments.innerHTML =
      `<h4>${list.length} ${list.length === 1 ? "Comment" : "Comments"}</h4>` +
      (list.length
        ? list.map(c => `
            <div class="comment">
              <div class="av">${(c.name[0] || "?").toUpperCase()}</div>
              <div class="c-body">
                <span class="who">${escapeHTML(c.name)}</span><span class="when">${c.when || "now"}</span>
                <div class="c-text">${escapeHTML(c.text)}</div>
              </div>
            </div>`).join("")
        : `<p class="muted" style="font-size:.9rem">Be the first to react to this photograph.</p>`);
  }

  function syncLike(p) {
    const liked = Store.isLiked(p.id);
    el.like.classList.toggle("liked", liked);
    el.like.innerHTML = liked ? ICONS.heartFill : ICONS.heart;
    el.likeCount.textContent = `${totalLikes(p)} likes`;
  }

  function syncCardMeta(p) {
    const card = grid.querySelector(`.card[data-id="${p.id}"] .card-meta`);
    if (card) card.innerHTML = (Store.isLiked(p.id) ? ICONS.heartFill : ICONS.heart) + `<span>${totalLikes(p)}</span>`;
  }

  const meta = lb.querySelector(".lb-meta");
  const navPrev = lb.querySelector(".lb-nav.lb-prev");
  const navNext = lb.querySelector(".lb-nav.lb-next");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function open(list, index) {
    viewList = list; viewIndex = index;
    show(viewList[viewIndex], 0);       // 0 = open (gentle zoom-in)
    lb.classList.add("open");
    lb.scrollTop = 0;
    document.body.style.overflow = "hidden";
    if (window.lenis) window.lenis.stop();
  }

  // dir: +1 next, -1 prev, 0 initial open. The focused photo is centred and big;
  // the previous/next photos sit blurred on either side.
  function show(p, dir = 1) {
    const ph = getPhotographer(p.photographer);
    el.img.alt = p.title;
    el.cat.textContent = p.category;
    el.title.textContent = p.title;
    el.caption.textContent = p.caption;
    el.av.src = ph.portrait;
    el.authorName.textContent = ph.name;
    el.authorRole.textContent = ph.role;
    syncLike(p);
    renderComments(p);
    el.shareMenu.classList.remove("open");
    buildShareMenu(p);

    // Blurred neighbours on the sides (hidden when there's only one photo)
    const n = viewList.length;
    const prevP = n > 1 ? viewList[(viewIndex - 1 + n) % n] : null;
    const nextP = n > 1 ? viewList[(viewIndex + 1) % n] : null;
    if (prevP) { el.prevImg.src = prevP.img; el.prevImg.style.display = ""; } else { el.prevImg.style.display = "none"; }
    if (nextP) { el.nextImg.src = nextP.img; el.nextImg.style.display = ""; } else { el.nextImg.style.display = "none"; }
    navPrev.style.display = n > 1 ? "" : "none";
    navNext.style.display = n > 1 ? "" : "none";

    // Metadata fade-up
    if (meta && !reduceMotion) {
      meta.classList.remove("lb-rise");
      void meta.offsetWidth;
      meta.classList.add("lb-rise");
    }

    if (reduceMotion) { el.img.src = p.img; return; }

    // Photo transition: fade/slide the new image in once it has decoded, so the
    // change is smooth with no flash of a half-loaded picture.
    const animClass = dir < 0 ? "lb-enter-prev" : dir > 0 ? "lb-enter-next" : "lb-enter-open";
    const next = new Image();
    const reveal = () => {
      el.img.src = p.img;
      el.img.classList.remove("lb-enter-next", "lb-enter-prev", "lb-enter-open");
      void el.img.offsetWidth;            // restart the animation
      el.img.classList.add(animClass);
    };
    next.onload = reveal;
    next.onerror = reveal;                 // still swap even if preload fails
    next.src = p.img;
    if (next.complete) reveal();           // cached image: reveal immediately
  }

  el.img.addEventListener("animationend", () => {
    el.img.classList.remove("lb-enter-next", "lb-enter-prev", "lb-enter-open");
  });

  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    if (window.lenis) window.lenis.start();
  }

  function go(dir) {
    viewIndex = (viewIndex + dir + viewList.length) % viewList.length;
    show(viewList[viewIndex], dir);
  }

  async function like(p, forceOn) {
    await Store.setLike(p.id, forceOn);
    syncLike(p);
    syncCardMeta(p);
  }

  function buildShareMenu(p) {
    const ph = getPhotographer(p.photographer);
    const pageUrl = location.origin + location.pathname.replace(/[^/]*$/, "gallery.html") + "?photo=" + p.id;
    const shareText = `“${p.title}” by ${ph.name} — Facets of the Ordinary`;
    const u = encodeURIComponent(pageUrl);
    const t = encodeURIComponent(shareText);
    const img = encodeURIComponent(p.img);
    el.shareMenu.innerHTML = `
      ${navigator.share ? `<button data-act="native">${ICONS.share} Share via device…</button>` : ""}
      <a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener">${ICONS.fb} Facebook</a>
      <a href="https://twitter.com/intent/tweet?url=${u}&text=${t}" target="_blank" rel="noopener">${ICONS.x} X / Twitter</a>
      <a href="https://pinterest.com/pin/create/button/?url=${u}&media=${img}&description=${t}" target="_blank" rel="noopener">${ICONS.pin} Pinterest</a>
      <a href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener">${ICONS.wa} WhatsApp</a>
      <button data-act="copy">${ICONS.link} Copy link</button>`;
    el.shareMenu.querySelectorAll("[data-act]").forEach(b => {
      b.addEventListener("click", async () => {
        if (b.dataset.act === "copy") {
          try { await navigator.clipboard.writeText(pageUrl); showToast("Link copied to clipboard"); }
          catch { showToast("Couldn't copy — " + pageUrl); }
        } else if (b.dataset.act === "native") {
          try { await navigator.share({ title: p.title, text: shareText, url: pageUrl }); } catch {}
        }
        el.shareMenu.classList.remove("open");
      });
    });
  }

  /* -------- Events -------- */
  grid.addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (!card) return;
    const list = currentList();
    const idx = list.findIndex(p => p.id === card.dataset.id);
    open(list, idx);
  });

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-nav.lb-prev").addEventListener("click", () => go(-1));
  lb.querySelector(".lb-nav.lb-next").addEventListener("click", () => go(1));
  el.prevImg.addEventListener("click", () => go(-1));   // click a side photo to walk to it
  el.nextImg.addEventListener("click", () => go(1));
  lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lb-inner") || e.target.classList.contains("lb-stage-row") || e.target.classList.contains("lb-deck")) close(); });

  el.like.addEventListener("click", () => like(viewList[viewIndex]));

  // Double-tap / double-click the image to like (Instagram style)
  function heartBurst() { el.burst.classList.remove("go"); void el.burst.offsetWidth; el.burst.classList.add("go"); }
  el.img.addEventListener("dblclick", () => { like(viewList[viewIndex], true); heartBurst(); });
  let lastTap = 0;
  el.img.addEventListener("touchend", () => {
    const now = Date.now();
    if (now - lastTap < 300) { like(viewList[viewIndex], true); heartBurst(); }
    lastTap = now;
  });

  lb.querySelector("#lb-comment-focus").addEventListener("click", () => el.text.focus());

  el.shareBtn.addEventListener("click", e => { e.stopPropagation(); el.shareMenu.classList.toggle("open"); });
  document.addEventListener("click", e => { if (!e.target.closest(".share-wrap")) el.shareMenu.classList.remove("open"); });

  el.form.addEventListener("submit", async e => {
    e.preventDefault();
    const p = viewList[viewIndex];
    const name = el.name.value.trim();
    const text = el.text.value.trim();
    if (!name || !text) return;
    const btn = el.form.querySelector("button");
    btn.disabled = true;
    await Store.addComment(p.id, name, text);
    btn.disabled = false;
    el.text.value = "";
    renderComments(p);
    el.comments.scrollTop = el.comments.scrollHeight;
    showToast("Comment posted");
  });

  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });

  /* -------- Deep links: filter by photographer, or open a photo -------- */
  if (phFilter && filterBar) {
    const list = PHOTOS.filter(p => p.photographer === phFilter);
    const phName = getPhotographer(phFilter).name;

    // Viewing ONE photographer's collection: category filters don't apply here,
    // so replace them with the photographer's name (plus a way back to all works).
    // This runs whether or not they have photos yet, so an empty collection no
    // longer falls back to showing everyone's photos with the category filters.
    filterBar.innerHTML =
      `<button class="active" aria-current="true">${phName}</button>` +
      `<button data-go-all>← All works</button>`;
    const allBtn = filterBar.querySelector("[data-go-all]");
    if (allBtn) allBtn.addEventListener("click", () => { location.href = "gallery.html"; });

    // Lock the grid AND the lightbox navigation to this photographer's photos,
    // so the single card-click handler (which uses currentList()) can never fall
    // back to the full gallery.
    phLock = list;
    const note = document.getElementById("filter-note");
    if (list.length) {
      grid.innerHTML = list.map(cardHTML).join("");
      grid.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
      if (note) note.textContent = `Showing ${list.length} ${list.length === 1 ? "work" : "works"} by ${phName}`;
    } else {
      // Photographer is listed but hasn't uploaded any photos yet — show an
      // empty state instead of falling back to the full gallery.
      grid.innerHTML =
        `<div style="column-span:all;-webkit-column-span:all;text-align:center;padding:clamp(40px,8vh,90px) 1rem;color:var(--muted)">
           <p style="font-size:1.1rem;color:var(--text)">${phName} hasn't uploaded any photos yet.</p>
           <p style="margin-top:.5rem;font-size:.92rem">This collection is coming soon — check back later.</p>
         </div>`;
      if (note) note.textContent = `No works by ${phName} yet`;
    }
  }
  const photoParam = params.get("photo");
  if (photoParam) {
    const idx = PHOTOS.findIndex(p => p.id === photoParam);
    if (idx > -1) open(PHOTOS, idx);
  }
});

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
