/* =====================================================================
   FACETS OF THE ORDINARY — shared interactions
   Nav behaviour, smooth scroll, scroll-reveal, parallax, the immersive
   3D corridor, and the word-by-word statement. All animation is
   progressive enhancement: if a CDN library fails to load, the content
   is still fully visible and usable.
   ===================================================================== */

/* ---------- Mobile nav + scrolled state ---------- */
(function nav() {
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".burger");
  const links = document.querySelector(".nav-links");

  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  if (burger && links) {
    burger.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      burger.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      })
    );
  }
})();

/* ---------- Theme toggle (light / dark) ---------- */
(function theme() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  // initial state is applied by the inline <head> script to avoid a flash
  btn.addEventListener("click", () => {
    const toLight = root.getAttribute("data-theme") !== "light";
    if (toLight) root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    try { localStorage.setItem("foto_theme", toLight ? "light" : "dark"); } catch (e) {}
  });
})();

/* ---------- Smooth scroll (Lenis, optional) + GSAP wiring ---------- */
let lenis = null;
(function smooth() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof Lenis === "undefined") return;

  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  window.lenis = lenis;   // exposed so the gallery lightbox can pause/resume scroll
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
})();

/* ---------- Scroll reveal (Intersection Observer) ---------- */
(function reveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach(el => io.observe(el));
})();

/* ---------- Lightweight parallax for [data-parallax] ---------- */
(function parallax() {
  const items = [...document.querySelectorAll("[data-parallax]")];
  if (!items.length) return;
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    items.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

/* ---------- Word-by-word statement reveal ---------- */
(function statement() {
  const blocks = document.querySelectorAll(".statement p");
  blocks.forEach(p => {
    if (p.dataset.split) return;
    p.dataset.split = "1";
    const accentWords = (p.dataset.accent || "").split(",").map(s => s.trim().toLowerCase());
    const words = p.textContent.trim().split(/\s+/);
    p.innerHTML = words.map(w => {
      const clean = w.replace(/[.,—]/g, "").toLowerCase();
      const cls = accentWords.includes(clean) ? "word accent" : "word";
      return `<span class="${cls}">${w}</span>`;
    }).join(" ");
  });

  const spans = document.querySelectorAll(".statement .word");
  if (!spans.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const all = [...e.target.parentElement.querySelectorAll(".word")];
        all.forEach((w, i) => setTimeout(() => w.classList.add("lit"), i * 55));
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".statement p").forEach(p => io.observe(p));
})();

/* ---------- Immersive 3D corridor ---------- */
(function corridor() {
  const stage = document.querySelector(".corridor");
  const track = document.querySelector(".corridor-track");
  if (!stage || !track) return;

  // On phones/small screens the 3D walk-through clips off-screen — use a
  // simple swipeable strip instead (laid out by CSS via the .is-flat class).
  if (window.matchMedia("(max-width: 768px)").matches) {
    stage.classList.add("is-flat");
    return;
  }

  // Position frames in 3D space: alternating walls, increasing depth.
  const frames = [...track.querySelectorAll(".frame")];
  const GAP = 760;          // distance between frames along Z
  const START = -900;       // first frame depth
  const SIDE = 470;         // how far left/right off-centre
  let maxDepth = 0;

  frames.forEach((f, i) => {
    const z = START - i * GAP;
    const side = i % 2 === 0 ? -1 : 1;
    const x = side * SIDE;
    const rotY = side * -20;       // angle the frame to face the centre aisle
    const y = (i % 3 - 1) * 40;    // gentle vertical variation
    f.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg)`;
    maxDepth = Math.abs(z);
  });

  const travel = maxDepth + 600;   // how far the camera walks forward

  // Preferred: GSAP ScrollTrigger pin + scrub for a true "walk-through".
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined"
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.to(track, {
      z: travel,
      ease: "none",
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: "+=" + (travel * 1.1),
        scrub: 0.6,
        pin: true,
        anticipatePin: 1
      }
    });
    // fade the intro heading out as you enter
    const intro = stage.querySelector(".corridor-intro");
    if (intro) {
      gsap.to(intro, {
        opacity: 0, y: -40, ease: "none",
        scrollTrigger: { trigger: stage, start: "top top", end: "+=" + (travel * 0.4), scrub: true }
      });
    }
    return;
  }

  // Fallback (no GSAP / reduced motion): drive depth from native scroll.
  let ticking = false;
  const update = () => {
    const rect = stage.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh)));
    track.style.transform = `translateZ(${progress * travel}px)`;
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

/* ---------- Animated stat counters ---------- */
(function counters() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => io.observe(n));
})();

/* ---------- The Collection — paginated grid (Home) ---------- */
(function collection() {
  const grid = document.getElementById("col-grid");
  const pager = document.getElementById("col-pager");
  if (!grid || !pager || typeof PHOTOS === "undefined") return;

  const PER_PAGE = 8;                                   // tune to taste
  // Show the strongest work first. Primary sort = likes (highest first), so once
  // real visitors start liking, popular photos rise to page 1 and the top tile.
  // Tie-breaker (all photos start at 0 likes in production) = the curated
  // FEATURED_ORDER, so the best-looking images still lead page 1 from day one.
  const RANK = Object.fromEntries(
    (typeof FEATURED_ORDER !== "undefined" ? FEATURED_ORDER : []).map((id, i) => [id, i])
  );
  const ORDERED = [...PHOTOS].sort((a, b) =>
    ((b.likes || 0) - (a.likes || 0)) ||
    ((RANK[a.id] ?? 999) - (RANK[b.id] ?? 999))
  );
  const pages = Math.max(1, Math.ceil(ORDERED.length / PER_PAGE));
  let cur = 1;

  function render() {
    const start = (cur - 1) * PER_PAGE;
    grid.innerHTML = ORDERED.slice(start, start + PER_PAGE).map(p => {
      const ph = getPhotographer(p.photographer);
      return `
        <a class="col-card" href="gallery.html?photo=${p.id}">
          <img src="${p.img}" alt="${p.title}" loading="lazy">
          <span class="col-tag">${p.category}</span>
          <div class="ov"><h4>${p.title}</h4><span>${ph.name}</span></div>
        </a>`;
    }).join("");

    let html = `<button data-go="prev" ${cur === 1 ? "disabled" : ""} aria-label="Previous page">‹</button>`;
    for (let i = 1; i <= pages; i++) {
      html += `<button data-page="${i}" class="${i === cur ? "active" : ""}" aria-current="${i === cur}">${i}</button>`;
    }
    html += `<button data-go="next" ${cur === pages ? "disabled" : ""} aria-label="Next page">›</button>`;
    pager.innerHTML = html;
  }

  pager.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.page) cur = +b.dataset.page;
    else if (b.dataset.go === "prev" && cur > 1) cur--;
    else if (b.dataset.go === "next" && cur < pages) cur++;
    render();
    document.getElementById("collection").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  render();
})();

/* ---------- Instructor / adviser profile (Home) ---------- */
(function instructor() {
  const host = document.getElementById("mentor-card");
  if (!host || typeof INSTRUCTOR === "undefined") return;
  host.innerHTML = `
    <div class="mentor-portrait reveal">
      <img src="${INSTRUCTOR.portrait}" alt="${INSTRUCTOR.name}">
    </div>
    <div class="mentor-body reveal reveal-delay-1">
      <span class="eyebrow">Exhibit Adviser</span>
      <blockquote class="mentor-foreword">“${INSTRUCTOR.foreword}”</blockquote>
      <div class="mentor-name">${INSTRUCTOR.name}</div>
      <div class="mentor-role">${INSTRUCTOR.title}${INSTRUCTOR.institution ? " · " + INSTRUCTOR.institution : ""}</div>
    </div>`;
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    host.querySelectorAll(".reveal").forEach(el => io.observe(el));
  } else {
    host.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  }
})();

/* ---------- Footer year ---------- */
(function year() {
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---------- Toast helper (shared, used by gallery) ---------- */
window.showToast = function (msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
};
