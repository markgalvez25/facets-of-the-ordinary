/* =====================================================================
   FACETS OF THE ORDINARY — Photographers page
   Builds one card per photographer, with a live count of their works
   and a link that opens the Gallery filtered to just their photos.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("ph-grid");
  if (!wrap) return;

  const social = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    behance: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 6H3v12h6.3c2.6 0 4.2-1.3 4.2-3.5 0-1.6-1-2.7-2.4-2.9 1.2-.3 2-1.3 2-2.7C13.1 7 11.7 6 9 6zm-.3 4.8H5.4V8h3.2c1 0 1.6.5 1.6 1.4 0 .9-.6 1.4-1.5 1.4zm.2 5.2H5.4v-3.1h3.4c1.2 0 1.8.6 1.8 1.5 0 1-.6 1.6-1.5 1.6zM21 12.4c0-2.6-1.6-4.5-4.2-4.5S12.5 9.9 12.5 12.5 14.2 17 16.9 17c2.1 0 3.6-1.1 4-2.8h-2c-.3.7-.9 1-1.9 1-1.2 0-2-.7-2.1-2H21v-.8zm-6-.9c.2-1.1.9-1.7 1.9-1.7s1.7.6 1.8 1.7H15zM15 6.5h4.5V8H15z"/></svg>'
  };

  const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>';

  wrap.innerHTML = PHOTOGRAPHERS.map(ph => {
    const works = PHOTOS.filter(p => p.photographer === ph.id);
    const likes = works.reduce((sum, p) => sum + p.likes, 0);
    const socials = Object.entries(ph.socials || {})
      .map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener" aria-label="${k}">${social[k] || ""}</a>`).join("");
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
          <div class="ph-socials">${socials}</div>
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
