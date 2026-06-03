/**
 * app.js — Álvaro & Gabriela · Nuestro Viaje
 * Lógica principal: portada, tabs, galería masonry, lightbox, petals
 */

(function () {
  "use strict";

  const pageType  = document.body && document.body.dataset.page ? document.body.dataset.page : "full";
  const countryId = document.body && document.body.dataset.country ? document.body.dataset.country : null;

  /* ═══════════════════════════════════════════
     DOM REFERENCES
  ═══════════════════════════════════════════ */
  const cover        = document.getElementById("cover");
  const site         = document.getElementById("site");
  const enterBtn     = document.getElementById("enterBtn");
  const tabsList     = document.getElementById("tabsList");
  const mainContent  = document.getElementById("mainContent");
  const countriesGrid = document.getElementById("countriesGrid");
  const navToggle    = document.getElementById("navToggle");
  const lightbox     = document.getElementById("lightbox");
  const lbImg        = document.getElementById("lbImg");
  const lbCaption    = document.getElementById("lbCaption");
  const lbClose      = document.getElementById("lbClose");
  const lbPrev       = document.getElementById("lbPrev");
  const lbNext       = document.getElementById("lbNext");
  const petalsWrap   = document.getElementById("petals");

  /* ═══════════════════════════════════════════
     STATE
  ═══════════════════════════════════════════ */
  let activeId  = null;
  let lbImages  = [];
  let lbIndex   = 0;
  let siteBuilt = false;

  /* ═══════════════════════════════════════════
     PETAL RAIN
  ═══════════════════════════════════════════ */
  function spawnPetals() {
    if (!petalsWrap) return;
    const n = window.innerWidth < 600 ? 20 : 35;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("div");
      el.className = "petal";
      el.style.cssText = [
        "--x:"     + (Math.random() * 110 - 5) + "vw",
        "--delay:" + (Math.random() * 10)       + "s",
        "--size:"  + (Math.random() * 14 + 7)   + "px",
        "--drift:" + (Math.random() * 80 - 40)  + "px",
        "--dur:"   + (Math.random() * 7  + 7)   + "s",
        "--rot:"   + (Math.random() * 360)       + "deg"
      ].join(";");
      petalsWrap.appendChild(el);
    }
  }

  /* ═══════════════════════════════════════════
     COVER → SITE
  ═══════════════════════════════════════════ */
  if (enterBtn && cover && site) {
    enterBtn.addEventListener("click", function () {
  cover.classList.add("cover--exit");

  setTimeout(function () {
    window.location.href = "nuestro-viaje.html";
  }, 900);
});
  }

  /* ═══════════════════════════════════════════
     INDEX PAGE
  ═══════════════════════════════════════════ */
  function buildIndex() {
    if (!countriesGrid) return;
    COUNTRIES.forEach(function (c) {
      countriesGrid.appendChild(makeCountryCard(c));
    });
  }

  function makeCountryCard(c) {
    const link = document.createElement("a");
    link.className = "country-card";
    link.href = c.id + ".html";
    link.style.setProperty("--accent", c.accentColor);
    link.innerHTML =
      `<span class="country-card__emoji">${c.emoji}</span>`
    + `<span class="country-card__name">${c.name}</span>`
    + `<span class="country-card__tagline">${c.tagline}</span>`
    + `<span class="country-card__arrow" aria-hidden="true">→</span>`;
    return link;
  }

  /* ═══════════════════════════════════════════
     COUNTRY PAGE
  ═══════════════════════════════════════════ */
  function buildCountryPage() {
    if (!mainContent) return;
    const c = COUNTRIES.find(function (x) { return x.id === countryId; });
    if (!c) return;

    buildCountryNav();

    const panel = makePanel(c);
    panel.hidden = false;
    panel.classList.add("country-panel--in");
    mainContent.appendChild(panel);
    document.body.style.backgroundColor = c.bgTone;

    observeGalleryItems(panel);
  }

  function buildCountryNav() {
    if (!tabsList) return;
    COUNTRIES.forEach(function (c) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.className = "tab-btn tab-link";
      link.href = c.id + ".html";
      if (c.id === countryId) link.classList.add("tab-btn--active");
      link.innerHTML = `<span class="tab-btn__emoji">${c.emoji}</span>`
                   + `<span class="tab-btn__name">${c.name}</span>`;
      li.appendChild(link);
      tabsList.appendChild(li);
    });
  }

  function observeGalleryItems(root) {
    if (!root) return;
    const items = root.querySelectorAll(".gallery__item");
    if (!items.length) return;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("gallery__item--visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ═══════════════════════════════════════════
     BUILD ENTIRE SITE
  ═══════════════════════════════════════════ */
  function buildSite() {
    if (!tabsList || !mainContent) return;
    COUNTRIES.forEach(function (c, i) {
      tabsList.appendChild(makeTab(c, i));
      mainContent.appendChild(makePanel(c));
    });

    // IntersectionObserver for gallery items lazy-reveal
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("gallery__item--visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    // Watch panels becoming visible → start observing their items
    const mo = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === "hidden" && !m.target.hidden) {
          m.target.querySelectorAll(".gallery__item").forEach(function (el) {
            io.observe(el);
          });
        }
      });
    });
    mainContent.querySelectorAll(".country-panel").forEach(function (p) {
      mo.observe(p, { attributes: true });
    });

    activateTab(COUNTRIES[0].id);
  }

  /* ═══════════════════════════════════════════
     MAKE TAB BUTTON
  ═══════════════════════════════════════════ */
  function makeTab(c, i) {
    const li  = document.createElement("li");
    li.setAttribute("role", "presentation");
    li.style.setProperty("--i", i);

    const btn = document.createElement("button");
    btn.className   = "tab-btn";
    btn.id          = "tab-" + c.id;
    btn.setAttribute("role",          "tab");
    btn.setAttribute("aria-controls", "panel-" + c.id);
    btn.setAttribute("aria-selected", "false");
    btn.setAttribute("tabindex",      "-1");
    btn.dataset.country = c.id;
    btn.innerHTML = `<span class="tab-btn__emoji">${c.emoji}</span>`
                  + `<span class="tab-btn__name">${c.name}</span>`;

    btn.addEventListener("click", function () {
      activateTab(c.id);
      closeMobileNav();
    });

    li.appendChild(btn);
    return li;
  }

  /* ═══════════════════════════════════════════
     MAKE COUNTRY PANEL
  ═══════════════════════════════════════════ */
  function makePanel(c) {
    const section = document.createElement("section");
    section.className = "country-panel";
    section.id        = "panel-" + c.id;
    section.setAttribute("role",            "tabpanel");
    section.setAttribute("aria-labelledby", "tab-" + c.id);
    section.hidden    = true;
    section.style.setProperty("--accent",  c.accentColor);
    section.style.setProperty("--bg-tone", c.bgTone);

    /* ── Header ── */
    const hdr = document.createElement("div");
    hdr.className = "country-panel__header";
    hdr.innerHTML =
      `<span class="country-panel__flag-emoji" aria-hidden="true">${c.emoji}</span>`
    + `<h2 class="country-panel__name">${c.name}</h2>`
    + `<p class="country-panel__tagline">${c.tagline}</p>`
    + `<blockquote class="country-panel__quote">${c.quote}</blockquote>`;

    /* ── Gallery wrapper ── */
    const gw = document.createElement("div");
    gw.className = "gallery-wrapper";

    if (c.images && c.images.length > 0) {
      gw.appendChild(makeGallery(c));
    } else {
      gw.innerHTML = emptyState(c);
    }

    section.appendChild(hdr);
    section.appendChild(gw);
    return section;
  }

  /* ═══════════════════════════════════════════
     MAKE MASONRY GALLERY
  ═══════════════════════════════════════════ */
  function makeGallery(c) {
    const grid = document.createElement("div");
    grid.className = "gallery";
    grid.dataset.country = c.id;

    c.images.forEach(function (name, idx) {
      const src  = c.folder + "/" + name;
      const item = document.createElement("div");
      item.className = "gallery__item";
      item.style.setProperty("--i", idx);

      const btn = document.createElement("button");
      btn.className = "gallery__thumb-btn";
      btn.setAttribute("aria-label", "Ver foto " + (idx + 1) + " de " + c.name);

      const img = document.createElement("img");
      img.className   = "gallery__thumb";
      img.src         = src;
      img.alt         = c.name + " — foto " + (idx + 1);
      img.loading     = "lazy";
      img.decoding    = "async";

      img.addEventListener("error", function () {
        item.classList.add("gallery__item--broken");
      });

      btn.appendChild(img);
      if (lightbox) {
        btn.addEventListener("click", function () { openLightbox(c, idx); });
      }

      item.appendChild(btn);
      grid.appendChild(item);
    });

    return grid;
  }

  /* ═══════════════════════════════════════════
     EMPTY STATE
  ═══════════════════════════════════════════ */
  function emptyState(c) {
    const folder = c.folder.split("/").pop();
    return `<div class="gallery-empty">
      <div class="gallery-empty__icon">📷</div>
      <p class="gallery-empty__text">Tus fotos de <strong>${c.name}</strong> irán aquí.</p>
      <p class="gallery-empty__hint">
        Copia tus imágenes a <code>fotos/${folder}/</code>
        y añade sus nombres al array <code>images</code>
        en <code>js/countries.js</code>.
      </p>
    </div>`;
  }

  /* ═══════════════════════════════════════════
     ACTIVATE TAB
  ═══════════════════════════════════════════ */
  function activateTab(id) {
    if (activeId === id) return;

    // Deactivate previous
    if (activeId) {
      setTabState(activeId, false);
      const oldPanel = document.getElementById("panel-" + activeId);
      if (oldPanel) oldPanel.hidden = true;
    }

    // Activate new
    setTabState(id, true);
    const panel = document.getElementById("panel-" + id);
    if (panel) {
      panel.hidden = false;
      // Restart CSS animation
      panel.classList.remove("country-panel--in");
      void panel.offsetWidth;
      panel.classList.add("country-panel--in");
    }

    // Update body bg
    const c = COUNTRIES.find(function (x) { return x.id === id; });
    if (c) document.body.style.backgroundColor = c.bgTone;

    activeId = id;

    // Scroll to content on mobile
    if (window.innerWidth < 900) {
      setTimeout(function () {
        mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  function setTabState(id, active) {
    const btn = document.getElementById("tab-" + id);
    if (!btn) return;
    btn.setAttribute("aria-selected", active ? "true" : "false");
    btn.setAttribute("tabindex",      active ? "0"    : "-1");
    btn.classList.toggle("tab-btn--active", active);
  }

  /* ═══════════════════════════════════════════
     KEYBOARD NAVIGATION (arrow keys on tabs)
  ═══════════════════════════════════════════ */
  if (pageType === "full" && tabsList) {
    tabsList.addEventListener("keydown", function (e) {
      const tabs = Array.from(tabsList.querySelectorAll(".tab-btn"));
      const cur  = tabs.indexOf(document.activeElement);
      if (cur === -1) return;

      let next = -1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown")  next = (cur + 1) % tabs.length;
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")    next = (cur - 1 + tabs.length) % tabs.length;
      if (e.key === "Home")                                  next = 0;
      if (e.key === "End")                                   next = tabs.length - 1;

      if (next !== -1) {
        e.preventDefault();
        tabs[next].focus();
        activateTab(tabs[next].dataset.country);
      }
    });
  }

  /* ═══════════════════════════════════════════
     MOBILE NAV
  ═══════════════════════════════════════════ */
  if (navToggle && tabsList) {
    navToggle.addEventListener("click", function () {
      const open = tabsList.classList.toggle("tabs-nav__list--open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  function closeMobileNav() {
    if (!tabsList || !navToggle) return;
    tabsList.classList.remove("tabs-nav__list--open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  // Close nav when clicking outside
  if (navToggle && tabsList) {
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !tabsList.contains(e.target)) {
        closeMobileNav();
      }
    });
  }

  /* ═══════════════════════════════════════════
     LIGHTBOX
  ═══════════════════════════════════════════ */
  function openLightbox(c, startIdx) {
    if (!lightbox) return;
    lbImages = c.images.map(function (name, i) {
      return { src: c.folder + "/" + name, caption: c.name + "  ·  " + (i + 1) + " / " + c.images.length };
    });
    lbIndex = startIdx;
    renderLbImage(true);
    lightbox.removeAttribute("hidden");
    lightbox.classList.add("lightbox--visible");
    document.body.classList.add("no-scroll");
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("lightbox--visible");
    setTimeout(function () {
      lightbox.setAttribute("hidden", "");
      lbImg.src = "";
    }, 350);
    document.body.classList.remove("no-scroll");
  }

  function renderLbImage(instant) {
    const item = lbImages[lbIndex];
    if (!instant) {
      lbImg.classList.remove("lightbox__img--in");
      void lbImg.offsetWidth;
    }
    lbImg.src     = item.src;
    lbImg.alt     = item.caption;
    lbCaption.textContent = item.caption;
    lbImg.classList.add("lightbox__img--in");
    lbPrev.disabled = lbIndex === 0;
    lbNext.disabled = lbIndex === lbImages.length - 1;
  }

  if (lightbox) {
    lbClose.addEventListener("click", closeLightbox);

    lbPrev.addEventListener("click", function () {
      if (lbIndex > 0) { lbIndex--; renderLbImage(false); }
    });

    lbNext.addEventListener("click", function () {
      if (lbIndex < lbImages.length - 1) { lbIndex++; renderLbImage(false); }
    });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.hasAttribute("hidden")) return;
      if (e.key === "Escape")                                       closeLightbox();
      if (e.key === "ArrowLeft" && lbIndex > 0)                    { lbIndex--; renderLbImage(false); }
      if (e.key === "ArrowRight" && lbIndex < lbImages.length - 1) { lbIndex++; renderLbImage(false); }
    });
  }

  /* ═══════════════════════════════════════════
     SWIPE SUPPORT (touch)
  ═══════════════════════════════════════════ */
  let touchStartX = 0;
  if (lightbox) {
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) < 40) return;
      if (dx < 0 && lbIndex < lbImages.length - 1) { lbIndex++; renderLbImage(false); }
      if (dx > 0 && lbIndex > 0)                   { lbIndex--; renderLbImage(false); }
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════ */
  if (pageType === "country") {
    if (site) site.removeAttribute("hidden");
    buildCountryPage();
    siteBuilt = true;
  }

  if (pageType === "index" && (!cover || !enterBtn)) {
    if (site) site.removeAttribute("hidden");
    buildIndex();
    siteBuilt = true;
  }

  if (pageType === "full" && (!cover || !enterBtn)) {
    if (site) site.removeAttribute("hidden");
    buildSite();
    siteBuilt = true;
  }

  spawnPetals();

})();
