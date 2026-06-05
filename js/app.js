/**
 * app.js — Álvaro & Gabriela · Nuestro Viaje
 * Lógica principal: portada, tabs, galería masonry, lightbox, petals
 */

(function () {
  "use strict";

  /* ═══════════════════════════════════════════
     CONSTANTS
  ═══════════════════════════════════════════ */
  const IO_THRESHOLD    = 0.08; // visibility fraction before gallery items animate in
  const SWIPE_MIN_PX    = 40;   // minimum horizontal swipe distance to change image
  const MOBILE_BREAKPX  = 900;  // breakpoint for mobile scroll-to-content behaviour
  const SCROLL_DELAY_MS = 80;   // delay before scrolling to content on mobile tab switch

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

    const emoji = document.createElement("span");
    emoji.className = "country-card__emoji";
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = c.emoji;

    const name = document.createElement("span");
    name.className = "country-card__name";
    name.textContent = c.name;

    const tagline = document.createElement("span");
    tagline.className = "country-card__tagline";
    tagline.textContent = c.tagline;

    const arrow = document.createElement("span");
    arrow.className = "country-card__arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";

    link.appendChild(emoji);
    link.appendChild(name);
    link.appendChild(tagline);
    link.appendChild(arrow);
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

      const emoji = document.createElement("span");
      emoji.className = "tab-btn__emoji";
      emoji.setAttribute("aria-hidden", "true");
      emoji.textContent = c.emoji;

      const nameSpan = document.createElement("span");
      nameSpan.className = "tab-btn__name";
      nameSpan.textContent = c.name;

      link.appendChild(emoji);
      link.appendChild(nameSpan);
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
          revealGalleryItem(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: "400px 0px" });
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

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          revealGalleryItem(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: "400px 0px" });

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

    const emoji = document.createElement("span");
    emoji.className = "tab-btn__emoji";
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = c.emoji;

    const nameSpan = document.createElement("span");
    nameSpan.className = "tab-btn__name";
    nameSpan.textContent = c.name;

    btn.appendChild(emoji);
    btn.appendChild(nameSpan);

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

    const flagEmoji = document.createElement("span");
    flagEmoji.className = "country-panel__flag-emoji";
    flagEmoji.setAttribute("aria-hidden", "true");
    flagEmoji.textContent = c.emoji;

    const h2 = document.createElement("h2");
    h2.className = "country-panel__name";
    h2.textContent = c.name;

    const taglineEl = document.createElement("p");
    taglineEl.className = "country-panel__tagline";
    taglineEl.textContent = c.tagline;

    const quoteEl = document.createElement("blockquote");
    quoteEl.className = "country-panel__quote";
    quoteEl.textContent = c.quote;

    hdr.appendChild(flagEmoji);
    hdr.appendChild(h2);
    hdr.appendChild(taglineEl);
    hdr.appendChild(quoteEl);

    if (c.images && c.images.length > 0) {
      const ssBtn = document.createElement("button");
      ssBtn.className = "ss-trigger";
      ssBtn.innerHTML = "▶ Pase de fotos";
      ssBtn.addEventListener("click", function () { openSlideshow(c); });
      hdr.appendChild(ssBtn);
    }

    /* ── Gallery wrapper ── */
    const gw = document.createElement("div");
    gw.className = "gallery-wrapper";

    if (c.images && c.images.length > 0) {
      gw.appendChild(makeGallery(c));
    } else {
      gw.appendChild(emptyState(c));
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
      img.dataset.src = src;   // deferred: src set by IO when near viewport
      img.alt         = c.name + " — foto " + (idx + 1);
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

  /* Load image src when its gallery item is near the viewport */
  function revealGalleryItem(el) {
    const img = el.querySelector("img[data-src]");
    if (img) {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    }
    el.classList.add("gallery__item--visible");
  }

  /* ═══════════════════════════════════════════
     EMPTY STATE
  ═══════════════════════════════════════════ */
  function emptyState(c) {
    const folder = c.folder.split("/").pop();

    const div = document.createElement("div");
    div.className = "gallery-empty";

    const icon = document.createElement("div");
    icon.className = "gallery-empty__icon";
    icon.textContent = "📷";

    const text = document.createElement("p");
    text.className = "gallery-empty__text";
    text.appendChild(document.createTextNode("Tus fotos de "));
    const strong = document.createElement("strong");
    strong.textContent = c.name;
    text.appendChild(strong);
    text.appendChild(document.createTextNode(" irán aquí."));

    const hint = document.createElement("p");
    hint.className = "gallery-empty__hint";
    hint.appendChild(document.createTextNode("Copia tus imágenes a "));
    const code1 = document.createElement("code");
    code1.textContent = "fotos/" + folder + "/";
    hint.appendChild(code1);
    hint.appendChild(document.createTextNode(" y añade sus nombres al array "));
    const code2 = document.createElement("code");
    code2.textContent = "images";
    hint.appendChild(code2);
    hint.appendChild(document.createTextNode(" en "));
    const code3 = document.createElement("code");
    code3.textContent = "js/countries.js";
    hint.appendChild(code3);
    hint.appendChild(document.createTextNode("."));

    div.appendChild(icon);
    div.appendChild(text);
    div.appendChild(hint);
    return div;
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
    if (window.innerWidth < MOBILE_BREAKPX) {
      setTimeout(function () {
        if (mainContent) mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
      }, SCROLL_DELAY_MS);
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
      if (Math.abs(dx) < SWIPE_MIN_PX) return;
      if (dx < 0 && lbIndex < lbImages.length - 1) { lbIndex++; renderLbImage(false); }
      if (dx > 0 && lbIndex > 0)                   { lbIndex--; renderLbImage(false); }
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════
     SLIDESHOW
  ═══════════════════════════════════════════ */
  const SS_DUR = 4000; // ms per photo

  let ssEl = null, ssImgA = null, ssImgB = null, ssBar = null;
  let ssCtrEl = null, ssNameEl = null, ssPauseBtn = null;
  let ssImages = [], ssIndex = 0, ssTimer = null, ssPlaying = false, ssSlot = "a";

  function initSlideshowDOM() {
    if (ssEl) return;
    ssEl = document.createElement("div");
    ssEl.className = "slideshow";
    ssEl.setAttribute("hidden", "");
    ssEl.innerHTML =
      '<div class="slideshow__stage">' +
        '<img class="slideshow__img" id="ssImgA" alt="">' +
        '<img class="slideshow__img" id="ssImgB" alt="">' +
      '</div>' +
      '<div class="slideshow__head">' +
        '<div class="slideshow__meta">' +
          '<div class="slideshow__cname" id="ssName"></div>' +
          '<div class="slideshow__ctr" id="ssCtr"></div>' +
        '</div>' +
        '<button class="slideshow__close" id="ssClose" aria-label="Cerrar">\xd7</button>' +
      '</div>' +
      '<div class="slideshow__foot">' +
        '<button class="slideshow__ctrl" id="ssPrev" aria-label="Anterior">‹</button>' +
        '<button class="slideshow__ctrl slideshow__ctrl--play" id="ssPause" aria-label="Pausa">⏸</button>' +
        '<button class="slideshow__ctrl" id="ssNext" aria-label="Siguiente">›</button>' +
      '</div>' +
      '<div class="slideshow__prog"><div class="slideshow__prog-bar" id="ssBar"></div></div>';

    document.body.appendChild(ssEl);

    ssImgA     = document.getElementById("ssImgA");
    ssImgB     = document.getElementById("ssImgB");
    ssBar      = document.getElementById("ssBar");
    ssCtrEl    = document.getElementById("ssCtr");
    ssNameEl   = document.getElementById("ssName");
    ssPauseBtn = document.getElementById("ssPause");

    document.getElementById("ssClose").addEventListener("click", closeSlideshow);
    document.getElementById("ssPrev").addEventListener("click", function () { ssManual(ssIndex - 1); });
    document.getElementById("ssNext").addEventListener("click", function () { ssManual(ssIndex + 1); });
    ssPauseBtn.addEventListener("click", ssToggle);

    document.addEventListener("keydown", function (e) {
      if (!ssEl || ssEl.hasAttribute("hidden")) return;
      if (e.key === "Escape")     closeSlideshow();
      if (e.key === " ")          { e.preventDefault(); ssToggle(); }
      if (e.key === "ArrowLeft")  ssManual(ssIndex - 1);
      if (e.key === "ArrowRight") ssManual(ssIndex + 1);
    });

    let ssTouchX = 0;
    ssEl.addEventListener("touchstart", function (e) { ssTouchX = e.touches[0].clientX; }, { passive: true });
    ssEl.addEventListener("touchend",   function (e) {
      const dx = e.changedTouches[0].clientX - ssTouchX;
      if (Math.abs(dx) < 40) return;
      ssManual(dx < 0 ? ssIndex + 1 : ssIndex - 1);
    }, { passive: true });
  }

  function openSlideshow(c) {
    initSlideshowDOM();
    ssImages  = c.images.map(function (n) { return c.folder + "/" + n; });
    ssIndex   = 0;
    ssPlaying = true;
    ssSlot    = "a";
    ssNameEl.textContent = c.name;
    ssImgA.className = "slideshow__img";
    ssImgB.className = "slideshow__img";
    ssImgA.src = "";
    ssImgB.src = "";
    ssPauseBtn.textContent = "⏸";
    ssEl.removeAttribute("hidden");
    document.body.classList.add("no-scroll");
    ssShow(0);
    ssTick();
  }

  function ssShow(idx) {
    ssIndex = ((idx % ssImages.length) + ssImages.length) % ssImages.length;
    ssCtrEl.textContent = (ssIndex + 1) + " / " + ssImages.length;
    const incoming = ssSlot === "a" ? ssImgA : ssImgB;
    const outgoing = ssSlot === "a" ? ssImgB : ssImgA;
    incoming.src = ssImages[ssIndex];
    incoming.classList.add("slideshow__img--in");
    outgoing.classList.remove("slideshow__img--in");
    ssSlot = ssSlot === "a" ? "b" : "a";
    (new Image()).src = ssImages[(ssIndex + 1) % ssImages.length]; // preload next
    ssRestartBar();
  }

  function ssRestartBar() {
    ssBar.className = "slideshow__prog-bar";
    ssBar.style.setProperty("--ss-dur", (SS_DUR / 1000) + "s");
    void ssBar.offsetWidth; // force reflow to restart animation
    if (ssPlaying) ssBar.className = "slideshow__prog-bar slideshow__prog-bar--run";
  }

  function ssTick() {
    if (ssTimer) clearTimeout(ssTimer);
    ssTimer = setTimeout(function () {
      ssTimer = null;
      ssShow(ssIndex + 1);
      if (ssPlaying) ssTick();
    }, SS_DUR);
  }

  function ssManual(idx) {
    if (ssTimer) { clearTimeout(ssTimer); ssTimer = null; }
    ssShow(idx);
    if (ssPlaying) ssTick();
  }

  function ssToggle() {
    if (ssPlaying) {
      ssPlaying = false;
      if (ssTimer) { clearTimeout(ssTimer); ssTimer = null; }
      ssPauseBtn.textContent = "▶";
      ssBar.className = "slideshow__prog-bar"; // stop bar
    } else {
      ssPlaying = true;
      ssPauseBtn.textContent = "⏸";
      ssRestartBar();
      ssTick();
    }
  }

  function closeSlideshow() {
    if (ssTimer) { clearTimeout(ssTimer); ssTimer = null; }
    ssEl.setAttribute("hidden", "");
    document.body.classList.remove("no-scroll");
    ssPlaying = false;
    setTimeout(function () { if (ssImgA) ssImgA.src = ""; if (ssImgB) ssImgB.src = ""; }, 500);
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
