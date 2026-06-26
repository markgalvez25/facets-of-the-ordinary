/* =====================================================================
   FACETS OF THE ORDINARY — anonymous page-view tracker
   Fires once per page load. Sends only: which page, and a random
   anonymous visitor id (for a unique-visitor count). No names, no IPs,
   no personal data. Silently does nothing if the API/KV isn't available.
   The admin metrics page (admin.html) deliberately does NOT load this.
   ===================================================================== */
(function () {
  try {
    var p = location.pathname.toLowerCase();
    var page = p.indexOf("gallery") > -1 ? "gallery"
             : p.indexOf("photographer") > -1 ? "photographers"
             : p.indexOf("faq") > -1 ? "faq"
             : "home";

    var vid = localStorage.getItem("foto_vid");
    if (!vid) {
      vid = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      localStorage.setItem("foto_vid", vid);
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: page, vid: vid }),
      keepalive: true
    }).catch(function () {});
  } catch (e) {}
})();
