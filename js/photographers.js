/* =====================================================================
   FACETS OF THE ORDINARY — Photographers page
   Builds one card per photographer, with a live count of their works
   and a link that opens the Gallery filtered to just their photos.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("ph-grid");
  if (!wrap) return;

  const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>';

  wrap.innerHTML = PHOTOGRAPHERS.map(ph => {
    const works = PHOTOS.filter(p => p.photographer === ph.id);
    const likes = works.reduce((sum, p) => sum + p.likes, 0);
    return `
      <article class="ph-card reveal">
        <a class="ph-portrait" href="gallery.html?photographer=${ph.id}">
          <img src="${ph.portrait}" alt="${ph.name}" loading="lazy">
        </a>
        <div class="ph-body">
          <span class="ph-cat">${ph.role}</span>
          <h3>${ph.name}</h3>
          ${ph.location ? `<div class="ph-loc">${pin}<span>${ph.location}</span></div>` : ""}
          ${ph.quote ? `<blockquote class="ph-quote">“${ph.quote}”</blockquote>` : ""}
          <p>${ph.bio}</p>
          <div class="ph-stats">
            <div><b>${works.length}</b><span>Works</span></div>
            <div><b>${likes.toLocaleString()}</b><span>Likes</span></div>
            <div><b>${ph.facet || "—"}</b><span>Facet</span></div>
          </div>
          <p style="margin-top:1.3rem">
            <a href="gallery.html?photographer=${ph.id}" class="btn btn-ghost" style="font-size:.74rem;padding:.6em 1.2em">
              View collection <span class="arrow">→</span>
            </a>
          </p>
        </div>
      </article>`;
  }).join("");

  // trigger reveal for the freshly built cards
  wrap.querySelectorAll(".reveal").forEach((el, i) => setTimeout(() => el.classList.add("in"), 60 + i * 90));
});
