/**
 * ============================================================================
 * LÓGICA EDITORIAL INTERACTIVA — ORNELLA BOSCHI · ESTUDIO DE FOTOGRAFÍA
 * - Header inteligente con monograma OB + scroll-spy centrado
 * - Tira collage de bienvenida pausable al tacto
 * - 5 layouts diferenciados (carrusel + thumbs, collage + carrusel, lookbook,
 *   mazo apilado interactivo con swipe, mosaico boutique + carrusel)
 * - Selector de fotos favoritas ♥ con barra flotante y armado de WhatsApp
 * - Lightbox mejorado con swipe, corazón ♥ y botón "Quiero este estilo"
 * ============================================================================
 */

(function () {
  "use strict";

  const config = window.SITE_CONFIG;
  if (!config || !Array.isArray(config.categories)) return;

  const STORAGE_KEY = "ob_favoritos_v1";

  // SVG de respaldo elegante en caso de caída de red en alguna imagen externa
  const FALLBACK_SVG_URI =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23EBE0D0'/%3E%3Ccircle cx='200' cy='230' r='38' fill='none' stroke='%237A6A5C' stroke-width='2' opacity='0.45'/%3E%3Ctext x='200' y='295' text-anchor='middle' font-family='Georgia,serif' font-size='16' fill='%237A6A5C'%3EOrnella Boschi%3C/text%3E%3C/svg%3E";

  window.__handleImgError = function (imgEl) {
    if (!imgEl || imgEl.dataset.fallbackApplied) return;
    imgEl.dataset.fallbackApplied = "1";
    imgEl.src = FALLBACK_SVG_URI;
  };

  // ==========================================================================
  // ESTADO DE FOTOS FAVORITAS ("ME INSPIRA ESTA FOTO")
  // ==========================================================================
  const favorites = new Set();

  function loadFavorites() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach((key) => {
            if (isValidFavKey(key)) favorites.add(key);
          });
        }
      }
    } catch (_) {
      // Si localStorage está bloqueado en modo privado, funciona en memoria
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
    } catch (_) {
      // Ignorar errores de cuota/privacidad
    }
  }

  function isValidFavKey(key) {
    if (typeof key !== "string" || !key.includes(":")) return false;
    const [catId, idxStr] = key.split(":");
    const cat = config.categories.find((c) => c.id === catId);
    const idx = Number(idxStr);
    return Boolean(cat && Array.isArray(cat.photos) && cat.photos[idx]);
  }

  function buildWhatsAppUrl(message) {
    const cleanPhone = String(config.whatsappNumber || "").replace(/\D/g, "");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message || "")}`;
  }

  function buildFavoritesWhatsAppMessage() {
    const grouped = new Map();

    favorites.forEach((key) => {
      const [catId, idxStr] = key.split(":");
      const cat = config.categories.find((c) => c.id === catId);
      if (!cat) return;
      const photo = cat.photos[Number(idxStr)];
      if (!photo) return;
      const label = cat.shortLabel || cat.navLabel || cat.title;
      if (!grouped.has(label)) grouped.set(label, []);
      grouped.get(label).push(photo.caption || `foto ${Number(idxStr) + 1}`);
    });

    const parts = [];
    grouped.forEach((captions, catLabel) => {
      parts.push(`${catLabel} (${captions.join(", ")})`);
    });

    return `¡Hola Orne! Estuve viendo tu web y me encantaron estas referencias: ${parts.join("; ")}. ¿Me contás cómo son las sesiones y disponibilidad?`;
  }

  function syncFavoriteButtonsUI() {
    document.querySelectorAll("[data-fav-key]").forEach((btn) => {
      const key = btn.getAttribute("data-fav-key");
      const active = favorites.has(key);
      btn.classList.toggle("is-fav", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    const lbFav = document.getElementById("lightbox-fav");
    if (lbFav && lbFav.dataset.currentFavKey) {
      const active = favorites.has(lbFav.dataset.currentFavKey);
      lbFav.classList.toggle("is-fav", active);
      lbFav.setAttribute("aria-pressed", active ? "true" : "false");
    }

    const bar = document.getElementById("favorites-bar");
    const barText = document.getElementById("favorites-bar-text");
    const barLink = document.getElementById("favorites-wa-link");

    if (!bar || !barText || !barLink) return;

    const count = favorites.size;
    if (count === 0) {
      bar.hidden = true;
    } else {
      bar.hidden = false;
      const label = count === 1 ? "1 foto elegida" : `${count} fotos elegidas`;
      barText.textContent = `${label} · Consultar por WhatsApp`;
      barLink.href = buildWhatsAppUrl(buildFavoritesWhatsAppMessage());
    }
  }

  function toggleFavorite(key) {
    if (!isValidFavKey(key)) return;
    if (favorites.has(key)) {
      favorites.delete(key);
    } else {
      favorites.add(key);
    }
    saveFavorites();
    syncFavoriteButtonsUI();
  }

  function clearFavorites() {
    favorites.clear();
    saveFavorites();
    syncFavoriteButtonsUI();
  }

  // ==========================================================================
  // HELPERS DE HTML Y SVGs ARTESANALES
  // ==========================================================================
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getHeartIconSvg() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>`;
  }

  function getPaperclipSvg() {
    return `
      <svg class="paperclip-svg" viewBox="0 0 26 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M18 13V34C18 39.2 13.8 43.5 8.5 43.5C3.2 43.5 -1 39.2 -1 34" transform="translate(4,0)" stroke="#8B6F56" stroke-width="2.1" stroke-linecap="round"/>
        <path d="M7 33V10C7 5.8 10.4 2.5 14.5 2.5C18.6 2.5 22 5.8 22 10V33C22 36.3 19.3 39 16 39C12.7 39 10 36.3 10 33V13" stroke="#A6866A" stroke-width="2" stroke-linecap="round"/>
      </svg>`;
  }

  function getStampSvg(idSuffix) {
    const text = escapeHtml(config.stampText || "EST. MENDOZA · LUZ NATURAL · ");
    const pathId = `stamp-circle-${idSuffix}`;
    return `
      <svg class="editorial-stamp" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <path id="${pathId}" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"/>
        </defs>
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2"/>
        <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="0.7"/>
        <text font-size="7.1" font-family="DM Sans, sans-serif" letter-spacing="2.1" fill="currentColor">
          <textPath href="#${pathId}">${text}</textPath>
        </text>
        <path d="M45 53C48 48 52 48 55 45" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
      </svg>`;
  }

  function getWhatsAppIconSvg() {
    return `
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.8z"></path>
        <path d="M9.4 8.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .6l-.4.6c-.1.2-.2.3 0 .6.3.5.8 1.1 1.4 1.5.6.4 1.1.5 1.3.6.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .4-.2 1-.7 1.4-.5.4-1.2.5-1.9.3-1.4-.4-2.9-1.3-4.1-2.6-1-1.1-1.7-2.4-1.9-3.5-.1-.7.1-1.3.3-1.4z"></path>
      </svg>`;
  }

  function getTornTopSvg(prevHex) {
    if (!prevHex) return "";
    return `
      <div class="torn-divider torn-divider--top" aria-hidden="true">
        <svg viewBox="0 0 1200 26" preserveAspectRatio="none">
          <path d="M0,0 L1200,0 L1200,13 L1158,20 L1112,12 L1065,21 L1018,14 L968,22 L918,12 L868,19 L818,13 L768,22 L718,14 L668,20 L618,12 L568,21 L518,13 L468,22 L418,14 L368,20 L318,12 L268,21 L218,14 L168,22 L118,13 L64,20 L0,14 Z" fill="${prevHex}"></path>
        </svg>
      </div>`;
  }

  function renderFavButton(catId, photoIdx, photoAlt) {
    const favKey = `${catId}:${photoIdx}`;
    return `
      <button
        type="button"
        class="fav-btn"
        data-fav-key="${escapeHtml(favKey)}"
        aria-label="Me inspira esta foto: ${escapeHtml(photoAlt)}"
        aria-pressed="false"
      >
        ${getHeartIconSvg()}
      </button>`;
  }

  function renderPolaroidFigure(cat, catIndex, photo, photoIndex, eager) {
    const total = cat.photos.length;
    const numberLabel = `${String(photoIndex + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
    const decor = photo.decor || "tape-beige";
    const clipMarkup = decor === "paperclip" ? getPaperclipSvg() : "";
    const loadingAttr = eager
      ? 'loading="eager" fetchpriority="high"'
      : 'loading="lazy" decoding="async"';

    return `
      <figure
        class="polaroid-card"
        data-decor="${escapeHtml(decor)}"
        data-open-lightbox
        data-category-index="${catIndex}"
        data-photo-index="${photoIndex}"
        tabindex="0"
        role="button"
        aria-label="Ver en pantalla completa foto ${photoIndex + 1} de ${escapeHtml(cat.title)}"
      >
        ${clipMarkup}
        <div class="polaroid-photo-wrap">
          ${renderFavButton(cat.id, photoIndex, photo.alt)}
          <img
            class="polaroid-img"
            src="${escapeHtml(photo.src)}"
            alt="${escapeHtml(photo.alt)}"
            ${loadingAttr}
            onerror="window.__handleImgError(this)"
          />
        </div>
        <figcaption class="polaroid-caption">
          <span>${escapeHtml(photo.caption || "")}</span>
          <span class="polaroid-number">${numberLabel}</span>
        </figcaption>
      </figure>`;
  }

  // ==========================================================================
  // CABECERA, TIRA DE BIENVENIDA, 5 BLOQUES DIFERENCIADOS, PROCESO Y FOOTER
  // ==========================================================================
  function hydrateBrandingAndFooter() {
    const brandTitle = document.getElementById("brand-title");
    const brandSubtitle = document.getElementById("brand-subtitle");
    const stickyMonogram = document.getElementById("sticky-monogram");
    const welcomeTag = document.getElementById("welcome-tag");
    const navList = document.getElementById("category-nav-list");
    const footerBrand = document.getElementById("footer-brand");
    const footerLocation = document.getElementById("footer-location");
    const footerIg = document.getElementById("footer-instagram");
    const footerIgLabel = document.getElementById("footer-ig-label");
    const footerWa = document.getElementById("footer-whatsapp");
    const footerYear = document.getElementById("footer-year");
    const devWrap = document.getElementById("footer-dev");

    if (brandTitle && config.studioName) brandTitle.textContent = config.studioName;
    if (brandSubtitle && config.studioSubtitle) brandSubtitle.textContent = config.studioSubtitle;
    if (stickyMonogram && config.monogram) stickyMonogram.textContent = config.monogram;
    if (welcomeTag && config.welcomeStrip && config.welcomeStrip.handwrittenTag) {
      welcomeTag.textContent = config.welcomeStrip.handwrittenTag;
    }

    if (navList) {
      const items = config.categories
        .map(
          (cat, i) =>
            `<a class="nav-pill${i === 0 ? " is-active" : ""}" href="#${escapeHtml(cat.id)}">${escapeHtml(cat.navLabel || cat.title)}</a>`
        )
        .concat(
          config.about
            ? `<a class="nav-pill" href="#${escapeHtml(config.about.id)}">${escapeHtml(config.about.navLabel || "Sobre mí")}</a>`
            : []
        );
      navList.innerHTML = items.join("");
    }

    if (footerBrand) {
      footerBrand.textContent = `${config.studioName} · ${config.studioSubtitle}`;
    }
    if (footerLocation && config.location) footerLocation.textContent = config.location;
    if (footerIg && config.instagramUrl) footerIg.href = config.instagramUrl;
    if (footerIgLabel && config.instagramHandle) footerIgLabel.textContent = config.instagramHandle;
    if (footerWa && config.about) {
      footerWa.href = buildWhatsAppUrl(config.about.whatsappMessage);
    }
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    if (devWrap && config.developerCredit) {
      devWrap.innerHTML = `<span>${escapeHtml(config.developerCredit.prefix || "Diseño y desarrollo web por ")}</span><a href="${escapeHtml(config.developerCredit.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(config.developerCredit.label)}</a>`;
    }
  }

  function renderWelcomeMarquee() {
    const track = document.getElementById("welcome-track");
    const viewport = document.getElementById("welcome-marquee");
    if (!track) return;

    // Selecciona 8 mini-Polaroids intercalando todas las categorías
    const picks = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [0, 1],
      [1, 2],
      [2, 1]
    ];

    const cardsHtml = picks
      .map(([catIdx, photoIdx]) => {
        const cat = config.categories[catIdx];
        if (!cat || !cat.photos[photoIdx]) return "";
        const photo = cat.photos[photoIdx];
        return `
          <div
            class="mini-polaroid"
            data-open-lightbox
            data-category-index="${catIdx}"
            data-photo-index="${photoIdx}"
            role="button"
            tabindex="0"
            aria-label="Ver foto de ${escapeHtml(cat.shortLabel || cat.title)}"
          >
            <img
              src="${escapeHtml(photo.src)}"
              alt="${escapeHtml(photo.alt)}"
              loading="eager"
              onerror="window.__handleImgError(this)"
            />
            <span>${escapeHtml(photo.caption || cat.navLabel)}</span>
          </div>`;
      })
      .join("");

    // Duplicamos la tira para lograr un loop infinito perfecto sin cortes
    track.innerHTML = cardsHtml + cardsHtml;

    if (viewport) {
      viewport.addEventListener(
        "touchstart",
        () => viewport.classList.add("is-paused"),
        { passive: true }
      );
      viewport.addEventListener(
        "touchend",
        () => {
          setTimeout(() => viewport.classList.remove("is-paused"), 1200);
        },
        { passive: true }
      );
    }
  }

  function buildCarouselMarkup(cat, catIndex, photoIndices, depthEffect) {
    const slidesHtml = photoIndices
      .map((photoIndex, slidePos) => {
        const photo = cat.photos[photoIndex];
        const eager = catIndex === 0 && slidePos === 0;
        return `
          <div class="carousel-slide${slidePos === 0 ? " is-active" : ""}" data-slide-pos="${slidePos}">
            ${renderPolaroidFigure(cat, catIndex, photo, photoIndex, eager)}
          </div>`;
      })
      .join("");

    const dotsHtml = photoIndices
      .map(
        (_, slidePos) => `
          <button
            type="button"
            class="carousel-dot${slidePos === 0 ? " is-active" : ""}"
            data-dot-pos="${slidePos}"
            aria-label="Ir a la imagen ${slidePos + 1} de ${escapeHtml(cat.title)}"
          ></button>`
      )
      .join("");

    return `
      <div class="carousel-stage" data-carousel>
        <button
          type="button"
          class="carousel-arrow carousel-arrow--prev"
          aria-label="Foto anterior en ${escapeHtml(cat.title)}"
          disabled
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>

        <div class="carousel-track${depthEffect ? " carousel-track--depth" : ""}" role="region" aria-label="Galería deslizable de ${escapeHtml(cat.title)}">
          ${slidesHtml}
        </div>

        <button
          type="button"
          class="carousel-arrow carousel-arrow--next"
          aria-label="Siguiente foto en ${escapeHtml(cat.title)}"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>

        <div class="carousel-dots">
          ${dotsHtml}
        </div>
      </div>`;
  }

  function renderSectionBody(cat, catIndex) {
    const allIndices = cat.photos.map((_, idx) => idx);

    // 1. RECIÉN NACIDOS: Carrusel con profundidad + tira de 6 miniaturas clicables
    if (cat.layout === "scrapbook-thumbs") {
      const thumbsHtml = cat.photos
        .map(
          (photo, idx) => `
            <button
              type="button"
              class="thumb-btn${idx === 0 ? " is-active" : ""}"
              data-thumb-pos="${idx}"
              aria-label="Ver miniatura ${idx + 1} de ${escapeHtml(cat.title)}"
            >
              <img
                src="${escapeHtml(photo.src)}"
                alt=""
                loading="lazy"
                onerror="window.__handleImgError(this)"
              />
            </button>`
        )
        .join("");

      return `
        <div data-carousel-with-thumbs>
          ${buildCarouselMarkup(cat, catIndex, allIndices, true)}
          <div class="thumb-strip" aria-label="Miniaturas rápidas">
            ${thumbsHtml}
          </div>
        </div>`;
    }

    // 2. FAMILIAS: Mini-collage scrapbook asimétrico (fotos 0..2) + carrusel (fotos 3..5 + 0)
    if (cat.layout === "collage-carousel") {
      const p0 = cat.photos[0];
      const p1 = cat.photos[1];
      const p2 = cat.photos[2];
      const restIndices = cat.photos.length > 3 ? [3, 4, 5, 0] : allIndices;

      return `
        <div class="family-collage" data-reveal>
          <div class="family-collage__paper" aria-hidden="true"></div>
          <div class="family-collage__grid">
            <div class="family-collage__main">
              ${renderPolaroidFigure(cat, catIndex, p0, 0, false)}
            </div>
            <div class="family-collage__side">
              ${renderPolaroidFigure(cat, catIndex, p1, 1, false)}
              ${renderPolaroidFigure(cat, catIndex, p2, 2, false)}
            </div>
          </div>
          <div class="family-collage__note">${escapeHtml(cat.collageNote || "#abrazosreales")}</div>
        </div>
        <p class="sub-carousel-label">Más instantes de esta galería</p>
        ${buildCarouselMarkup(cat, catIndex, restIndices, true)}`;
    }

    // 3. REINAS DE LA VENDIMIA: Lookbook de Revista en tono Espresso & Dorado Champán
    if (cat.layout === "editorial-lookbook") {
      const totalStr = String(cat.photos.length).padStart(2, "0");
      const slidesHtml = cat.photos
        .map((photo, idx) => {
          const idxStr = String(idx + 1).padStart(2, "0");
          return `
            <div class="carousel-slide${idx === 0 ? " is-active" : ""}" data-slide-pos="${idx}">
              <figure
                class="lookbook-card"
                data-open-lightbox
                data-category-index="${catIndex}"
                data-photo-index="${idx}"
                tabindex="0"
                role="button"
                aria-label="Ampliar retrato ${idx + 1} de ${escapeHtml(cat.title)}"
              >
                <div class="lookbook-photo-wrap">
                  ${renderFavButton(cat.id, idx, photo.alt)}
                  <img
                    src="${escapeHtml(photo.src)}"
                    alt="${escapeHtml(photo.alt)}"
                    loading="lazy"
                    decoding="async"
                    onerror="window.__handleImgError(this)"
                  />
                </div>
                <figcaption class="lookbook-caption">
                  <span>${escapeHtml(photo.caption || "")}</span>
                  <span class="lookbook-index">${idxStr} — ${totalStr}</span>
                </figcaption>
              </figure>
            </div>`;
        })
        .join("");

      const dotsHtml = cat.photos
        .map(
          (_, idx) => `
            <button
              type="button"
              class="carousel-dot${idx === 0 ? " is-active" : ""}"
              data-dot-pos="${idx}"
              aria-label="Ir al retrato ${idx + 1}"
            ></button>`
        )
        .join("");

      return `
        <div data-lookbook-wrap>
          <div class="lookbook-topbar" aria-live="polite">
            <span class="lookbook-topbar__line"></span>
            <span data-lookbook-counter>01 — ${totalStr}</span>
            <span class="lookbook-topbar__line"></span>
          </div>
          <div class="carousel-stage" data-carousel>
            <button type="button" class="carousel-arrow carousel-arrow--prev" aria-label="Retrato anterior" disabled>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
            <div class="carousel-track" role="region" aria-label="Lookbook de ${escapeHtml(cat.title)}">
              ${slidesHtml}
            </div>
            <button type="button" class="carousel-arrow carousel-arrow--next" aria-label="Siguiente retrato">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
            <div class="carousel-dots">${dotsHtml}</div>
          </div>
        </div>`;
    }

    // 4. SESIONES PERSONALES: Mazo Interactivo de Polaroids apiladas sobre mesa
    if (cat.layout === "polaroid-deck") {
      const cardsHtml = cat.photos
        .map((photo, idx) => {
          const stateClass =
            idx === 0 ? " is-front" : idx === 1 ? " is-second" : idx === 2 ? " is-third" : "";
          return `
            <div class="deck-card${stateClass}" data-deck-card="${idx}">
              ${renderPolaroidFigure(cat, catIndex, photo, idx, false)}
            </div>`;
        })
        .join("");

      return `
        <div class="deck-wrapper" data-polaroid-deck data-cat-index="${catIndex}">
          <div class="deck-stage">
            ${cardsHtml}
          </div>
          <div class="deck-controls">
            <button type="button" class="deck-btn" data-deck-prev aria-label="Foto anterior del mazo">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>
              <span>Anterior</span>
            </button>
            <span class="deck-status" data-deck-counter>1 de ${cat.photos.length}</span>
            <button type="button" class="deck-btn" data-deck-next aria-label="Siguiente foto del mazo">
              <span>Siguiente</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <button
            type="button"
            class="deck-all-link"
            data-open-lightbox
            data-category-index="${catIndex}"
            data-photo-index="0"
          >
            Ver las ${cat.photos.length} fotos en pantalla completa
          </button>
        </div>`;
    }

    // 5. PRODUCTOS: Mosaico Boutique de 2 columnas asimétricas + Carrusel Detalle
    if (cat.layout === "boutique-mosaic") {
      const mosaicIndices = [0, 1, 2];
      const detailIndices = [3, 4, 5];

      const mosaicHtml = mosaicIndices
        .map((idx) => {
          const photo = cat.photos[idx];
          const isTall = idx === 0;
          return `
            <figure
              class="mosaic-tile ${isTall ? "mosaic-tile--tall" : "mosaic-tile--small"}"
              data-open-lightbox
              data-category-index="${catIndex}"
              data-photo-index="${idx}"
              tabindex="0"
              role="button"
              aria-label="Ampliar fotografía de producto ${idx + 1}"
            >
              ${renderFavButton(cat.id, idx, photo.alt)}
              <div class="mosaic-img-box">
                <img
                  src="${escapeHtml(photo.src)}"
                  alt="${escapeHtml(photo.alt)}"
                  loading="lazy"
                  decoding="async"
                  onerror="window.__handleImgError(this)"
                />
              </div>
              <figcaption>${escapeHtml(photo.caption || "")}</figcaption>
            </figure>`;
        })
        .join("");

      return `
        <div class="boutique-mosaic" data-reveal>
          ${mosaicHtml}
        </div>
        <p class="sub-carousel-label">Más detalles y tomas de catálogo</p>
        ${buildCarouselMarkup(cat, catIndex, detailIndices, true)}`;
    }

    return buildCarouselMarkup(cat, catIndex, allIndices, true);
  }

  function renderCategories() {
    const container = document.getElementById("categories-container");
    if (!container) return;

    // Mapa de colores de fondo para transiciones suaves con papel rasgado
    const themeHexMap = {
      "theme-paper": "#FAF6EE",
      "theme-butter": "#F5E9C8",
      "theme-espresso": "#241F1C",
      "theme-blush": "#F1DDD0",
      "theme-sage": "#DCE4CE"
    };

    let prevHex = "#F2E8D8"; // Empalma con borde de papel rasgado desde la tira de bienvenida

    const html = config.categories
      .map((cat, catIndex) => {
        const tornSvg = getTornTopSvg(prevHex);
        prevHex = themeHexMap[cat.themeClass] || "#FAF6EE";

        const isDark = cat.themeClass === "theme-espresso";
        const ctaBtnClass = isDark ? "btn-whatsapp btn-whatsapp--champagne" : "btn-whatsapp";
        const waUrl = buildWhatsAppUrl(cat.whatsappMessage);
        const showStamp = catIndex === 0 || catIndex === 2;
        const stampHtml = showStamp
          ? `<div class="section-stamp-badge">${getStampSvg(cat.id)}</div>`
          : "";
        const sprigHtml = `
          <div class="section-botanical" aria-hidden="true">
            <svg viewBox="0 0 54 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16C20 14 34 10 46 6" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
              <path d="M20 14C18 9.5 20.5 6 25 6C25.5 9.8 23 12.5 20 14Z" stroke="currentColor" stroke-width="0.95"/>
              <path d="M33 10.5C31.5 6.8 34 4 38 4C38.5 7.5 36.2 9.8 33 10.5Z" stroke="currentColor" stroke-width="0.95"/>
              <path d="M26 13C29 16.5 33.5 17.2 37.5 15.5C34.5 13 31 12.2 26 13Z" stroke="currentColor" stroke-width="0.95"/>
            </svg>
          </div>`;

        return `
          <section
            id="${escapeHtml(cat.id)}"
            class="category-section ${escapeHtml(cat.themeClass || "theme-paper")}"
            aria-labelledby="heading-${escapeHtml(cat.id)}"
          >
            ${tornSvg}
            <div class="section-container">
              <header class="section-header" data-reveal>
                ${stampHtml}
                ${sprigHtml}
                <span class="section-eyebrow">${escapeHtml(cat.eyebrow || "Porfolio")}</span>
                <h2 class="section-title" id="heading-${escapeHtml(cat.id)}">${escapeHtml(cat.title)}</h2>
                <p class="section-subtitle">${escapeHtml(cat.subtitle)}</p>
              </header>

              ${renderSectionBody(cat, catIndex)}

              <div class="section-cta-wrap">
                <a
                  class="${ctaBtnClass}"
                  href="${escapeHtml(waUrl)}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${getWhatsAppIconSvg()}
                  <span>${escapeHtml(cat.ctaText)}</span>
                </a>
              </div>
            </div>
          </section>`;
      })
      .join("");

    container.innerHTML = html;
  }

  function renderProcessAndAbout() {
    // Agregar borde rasgado entre Productos (#DCE4CE) y Cómo es tu sesión (#FAF6EE)
    const processSection = document.querySelector(".process-section");
    if (processSection && !processSection.querySelector(".torn-divider")) {
      processSection.insertAdjacentHTML("afterbegin", getTornTopSvg("#DCE4CE"));
    }

    const processRoot = document.getElementById("process-root");
    if (processRoot && Array.isArray(config.processSteps)) {
      processRoot.innerHTML = config.processSteps
        .map(
          (step) => `
            <article class="process-note" data-reveal>
              <span class="process-note__num">${escapeHtml(step.number)}</span>
              <div>
                <h3 class="process-note__title">${escapeHtml(step.title)}</h3>
                <p class="process-note__text">${escapeHtml(step.text)}</p>
              </div>
            </article>`
        )
        .join("");
    }

    const aboutRoot = document.getElementById("about-root");
    if (!aboutRoot || !config.about) return;

    const about = config.about;
    const waUrl = buildWhatsAppUrl(about.whatsappMessage);
    const paragraphsHtml = (about.paragraphs || [])
      .map((p) => `<p class="about-text">${escapeHtml(p)}</p>`)
      .join("");

    aboutRoot.innerHTML = `
      <div class="about-grid">
        <div class="about-portrait-col">
          <div class="about-polaroid-wrap">
            <div class="about-stamp-wrap">${getStampSvg("about")}</div>
            <figure class="about-polaroid">
              <img
                src="${escapeHtml(about.photo.src)}"
                alt="${escapeHtml(about.photo.alt)}"
                loading="lazy"
                decoding="async"
                onerror="window.__handleImgError(this)"
              />
              <figcaption>${escapeHtml(about.photo.caption || "")}</figcaption>
            </figure>
            <svg class="about-sprig" viewBox="0 0 64 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M18 88C25 65 34 40 46 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M26 66C16 61 13 52 17 44C24 49 27 57 26 66Z" stroke="currentColor" stroke-width="1.05" fill="#DCE4CE" fill-opacity="0.6"/>
              <path d="M33 48C24 42 22 33 27 26C33 31 35 39 33 48Z" stroke="currentColor" stroke-width="1.05" fill="#DCE4CE" fill-opacity="0.6"/>
              <path d="M29 58C38 56 46 60 49 67C41 68 34 65 29 58Z" stroke="currentColor" stroke-width="1.05" fill="#DCE4CE" fill-opacity="0.6"/>
              <path d="M37 39C45 37 52 40 55 46C48 48 42 45 37 39Z" stroke="currentColor" stroke-width="1.05" fill="#DCE4CE" fill-opacity="0.6"/>
            </svg>
          </div>
        </div>

        <div class="about-content-col">
          <span class="section-eyebrow">${escapeHtml(about.eyebrow || "Sobre mí")}</span>
          <p class="about-handwritten">${escapeHtml(about.handwrittenNote || "")}</p>
          <h2 class="about-title" id="about-title">${escapeHtml(about.title)}</h2>
          ${paragraphsHtml}
          <p class="about-signature">${escapeHtml(about.signature || "")}</p>
          <div class="about-cta-wrap">
            <a
              class="btn-whatsapp btn-whatsapp--olive"
              href="${escapeHtml(waUrl)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${getWhatsAppIconSvg()}
              <span>${escapeHtml(about.ctaText)}</span>
            </a>
          </div>
        </div>
      </div>`;
  }

  // ==========================================================================
  // LÓGICA DE CARRUSELES + MINIATURAS + CONTADOR LOOKBOOK
  // ==========================================================================
  function initCarousels() {
    document.querySelectorAll("[data-carousel]").forEach((stageEl) => {
      const track = stageEl.querySelector(".carousel-track");
      const slides = Array.from(stageEl.querySelectorAll(".carousel-slide"));
      const prevBtn = stageEl.querySelector(".carousel-arrow--prev");
      const nextBtn = stageEl.querySelector(".carousel-arrow--next");
      const dots = Array.from(stageEl.querySelectorAll(".carousel-dot"));

      const thumbsParent = stageEl.closest("[data-carousel-with-thumbs]");
      const thumbs = thumbsParent
        ? Array.from(thumbsParent.querySelectorAll("[data-thumb-pos]"))
        : [];

      const lookbookParent = stageEl.closest("[data-lookbook-wrap]");
      const lookbookCounter = lookbookParent
        ? lookbookParent.querySelector("[data-lookbook-counter]")
        : null;

      if (!track || slides.length === 0) return;

      let activePos = 0;
      let rafId = null;

      function updateUI(pos) {
        activePos = Math.max(0, Math.min(slides.length - 1, pos));

        slides.forEach((s, i) => s.classList.toggle("is-active", i === activePos));
        dots.forEach((d, i) => d.classList.toggle("is-active", i === activePos));
        thumbs.forEach((t, i) => t.classList.toggle("is-active", i === activePos));

        if (prevBtn) prevBtn.disabled = activePos <= 0;
        if (nextBtn) nextBtn.disabled = activePos >= slides.length - 1;

        if (lookbookCounter) {
          const cur = String(activePos + 1).padStart(2, "0");
          const tot = String(slides.length).padStart(2, "0");
          lookbookCounter.textContent = `${cur} — ${tot}`;
        }
      }

      function scrollToPos(targetPos) {
        const clamped = Math.max(0, Math.min(slides.length - 1, targetPos));
        const slide = slides[clamped];
        if (!slide) return;

        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const left = slideCenter - track.clientWidth / 2;

        updateUI(clamped);
        track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      }

      function detectActiveOnScroll() {
        const center = track.scrollLeft + track.clientWidth / 2;
        let bestIdx = 0;
        let minDist = Infinity;

        slides.forEach((s, idx) => {
          const c = s.offsetLeft + s.offsetWidth / 2;
          const dist = Math.abs(c - center);
          if (dist < minDist) {
            minDist = dist;
            bestIdx = idx;
          }
        });

        if (bestIdx !== activePos) updateUI(bestIdx);
      }

      track.addEventListener(
        "scroll",
        () => {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(detectActiveOnScroll);
        },
        { passive: true }
      );

      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          scrollToPos(activePos - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          scrollToPos(activePos + 1);
        });
      }

      dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => scrollToPos(idx));
      });

      thumbs.forEach((thumb, idx) => {
        thumb.addEventListener("click", () => scrollToPos(idx));
      });

      updateUI(0);
    });
  }

  // ==========================================================================
  // MAZO INTERACTIVO DE POLAROIDS (SESIONES PERSONALES) CON SWIPE TÁCTIL
  // ==========================================================================
  function initPolaroidDecks() {
    document.querySelectorAll("[data-polaroid-deck]").forEach((deckEl) => {
      const cards = Array.from(deckEl.querySelectorAll("[data-deck-card]"));
      const prevBtn = deckEl.querySelector("[data-deck-prev]");
      const nextBtn = deckEl.querySelector("[data-deck-next]");
      const counterEl = deckEl.querySelector("[data-deck-counter]");
      const stageEl = deckEl.querySelector(".deck-stage");
      const allLink = deckEl.querySelector(".deck-all-link");

      if (cards.length === 0) return;

      let frontIdx = 0;
      let animating = false;
      let startX = 0;
      let startY = 0;

      function layoutStack() {
        const total = cards.length;
        cards.forEach((card, i) => {
          card.classList.remove(
            "is-front",
            "is-second",
            "is-third",
            "is-swiping-next",
            "is-swiping-prev"
          );
          const rel = (i - frontIdx + total) % total;
          if (rel === 0) card.classList.add("is-front");
          else if (rel === 1) card.classList.add("is-second");
          else if (rel === 2) card.classList.add("is-third");
        });

        if (counterEl) {
          counterEl.textContent = `${frontIdx + 1} de ${total}`;
        }
        if (allLink) {
          allLink.setAttribute("data-photo-index", String(frontIdx));
        }
      }

      function stepDeck(dir) {
        if (animating) return;
        animating = true;

        const currentCard = cards[frontIdx];
        currentCard.classList.add(dir > 0 ? "is-swiping-next" : "is-swiping-prev");

        setTimeout(() => {
          const total = cards.length;
          frontIdx = (frontIdx + dir + total) % total;
          layoutStack();
          animating = false;
        }, 230);
      }

      if (prevBtn) prevBtn.addEventListener("click", () => stepDeck(-1));
      if (nextBtn) nextBtn.addEventListener("click", () => stepDeck(1));

      if (stageEl) {
        stageEl.addEventListener(
          "touchstart",
          (e) => {
            if (e.touches.length === 1) {
              startX = e.touches[0].clientX;
              startY = e.touches[0].clientY;
            }
          },
          { passive: true }
        );

        stageEl.addEventListener(
          "touchend",
          (e) => {
            if (e.changedTouches.length === 1) {
              const dx = e.changedTouches[0].clientX - startX;
              const dy = e.changedTouches[0].clientY - startY;
              if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
                stepDeck(dx < 0 ? 1 : -1);
              }
            }
          },
          { passive: true }
        );
      }

      layoutStack();
    });
  }

  // ==========================================================================
  // LIGHTBOX EDITORIAL MEJORADO (SWIPE + ♥ + "QUIERO ESTE ESTILO")
  // ==========================================================================
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const imgEl = document.getElementById("lightbox-img");
    const captionEl = document.getElementById("lightbox-caption");
    const categoryEl = document.getElementById("lightbox-category");
    const counterEl = document.getElementById("lightbox-counter");
    const favBtn = document.getElementById("lightbox-fav");
    const waCta = document.getElementById("lightbox-wa-cta");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const stageEl = document.getElementById("lightbox-stage");

    if (!lightbox || !imgEl) return;

    let currentCatIdx = 0;
    let currentPhotoIdx = 0;
    let lastFocused = null;
    let touchX = 0;
    let touchY = 0;

    function renderCurrent() {
      const cat = config.categories[currentCatIdx];
      if (!cat || !Array.isArray(cat.photos)) return;

      const total = cat.photos.length;
      currentPhotoIdx = ((currentPhotoIdx % total) + total) % total;
      const photo = cat.photos[currentPhotoIdx];
      const favKey = `${cat.id}:${currentPhotoIdx}`;

      delete imgEl.dataset.fallbackApplied;
      imgEl.onerror = function () {
        window.__handleImgError(imgEl);
      };
      imgEl.src = photo.src;
      imgEl.alt = photo.alt || "";

      if (captionEl) captionEl.textContent = photo.caption || "";
      if (categoryEl) categoryEl.textContent = cat.shortLabel || cat.title;
      if (counterEl) {
        counterEl.textContent = `Foto ${currentPhotoIdx + 1} de ${total}`;
      }

      if (favBtn) {
        favBtn.dataset.currentFavKey = favKey;
        const isFav = favorites.has(favKey);
        favBtn.classList.toggle("is-fav", isFav);
        favBtn.setAttribute("aria-pressed", isFav ? "true" : "false");
      }

      if (waCta) {
        const refText = photo.caption ? ` (${photo.caption})` : "";
        const styleMsg = `¡Hola Orne! Estuve viendo tu web y me encantó el estilo de ${cat.shortLabel || cat.title}${refText}. ¿Me contás cómo podemos armar una sesión así?`;
        waCta.href = buildWhatsAppUrl(styleMsg);
      }
    }

    function openLightbox(catIdx, photoIdx, trigger) {
      currentCatIdx = catIdx;
      currentPhotoIdx = photoIdx;
      lastFocused = trigger || document.activeElement;

      renderCurrent();
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");

      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      if (!lightbox.classList.contains("is-open")) return;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");

      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    function step(delta) {
      currentPhotoIdx += delta;
      renderCurrent();
    }

    // Delegación global: primero detecta corazón ♥ (sin abrir lightbox), luego apertura de foto
    document.addEventListener("click", (e) => {
      const heartBtn = e.target.closest("[data-fav-key]");
      if (heartBtn) {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(heartBtn.getAttribute("data-fav-key"));
        return;
      }

      const opener = e.target.closest("[data-open-lightbox]");
      if (opener) {
        const cIdx = Number(opener.getAttribute("data-category-index"));
        const pIdx = Number(opener.getAttribute("data-photo-index"));
        openLightbox(cIdx, pIdx, opener);
        return;
      }

      if (e.target.hasAttribute("data-lightbox-close") || e.target === stageEl) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      const opener = e.target.closest && e.target.closest("[data-open-lightbox]");
      if (
        opener &&
        !e.target.closest("[data-fav-key]") &&
        !lightbox.classList.contains("is-open") &&
        (e.key === "Enter" || e.key === " ")
      ) {
        e.preventDefault();
        openLightbox(
          Number(opener.getAttribute("data-category-index")),
          Number(opener.getAttribute("data-photo-index")),
          opener
        );
        return;
      }

      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });

    if (favBtn) {
      favBtn.addEventListener("click", () => {
        if (favBtn.dataset.currentFavKey) {
          toggleFavorite(favBtn.dataset.currentFavKey);
        }
      });
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", () => step(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => step(1));

    lightbox.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 1) {
          touchX = e.touches[0].clientX;
          touchY = e.touches[0].clientY;
        }
      },
      { passive: true }
    );

    lightbox.addEventListener(
      "touchend",
      (e) => {
        if (e.changedTouches.length === 1) {
          const dx = e.changedTouches[0].clientX - touchX;
          const dy = e.changedTouches[0].clientY - touchY;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            step(dx < 0 ? 1 : -1);
          }
        }
      },
      { passive: true }
    );
  }

  // ==========================================================================
  // HEADER COMPACTO INTELIGENTE + SCROLL-SPY + REVEAL SUAVE
  // ==========================================================================
  function initHeaderAndObservers() {
    const masthead = document.getElementById("inicio");
    const stickyNav = document.getElementById("sticky-nav");
    const navTrack = document.getElementById("category-nav-list");
    const clearFavBtn = document.getElementById("favorites-clear");

    if (clearFavBtn) {
      clearFavBtn.addEventListener("click", clearFavorites);
    }

    if ("IntersectionObserver" in window) {
      // 1. Compacta la barra mostrando el monograma OB cuando el masthead sale de vista
      if (masthead && stickyNav) {
        const mastheadObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              stickyNav.classList.toggle("is-compact", !entry.isIntersecting);
            });
          },
          { threshold: 0.05 }
        );
        mastheadObserver.observe(masthead);
      }

      // 2. Sincroniza y centra la píldora activa según la sección visible
      if (navTrack) {
        const pills = Array.from(navTrack.querySelectorAll(".nav-pill"));
        const ids = pills
          .map((p) => p.getAttribute("href"))
          .filter((h) => h && h.startsWith("#"))
          .map((h) => h.slice(1));

        function activatePill(id) {
          pills.forEach((pill) => {
            const match = pill.getAttribute("href") === `#${id}`;
            pill.classList.toggle("is-active", match);
            if (match) {
              const pillCenter = pill.offsetLeft + pill.offsetWidth / 2;
              const targetScroll = pillCenter - navTrack.clientWidth / 2;
              navTrack.scrollTo({ left: Math.max(0, targetScroll), behavior: "smooth" });
            }
          });
        }

        const sectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                activatePill(entry.target.id);
              }
            });
          },
          {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
          }
        );

        ids.forEach((id) => {
          const el = document.getElementById(id);
          if (el) sectionObserver.observe(el);
        });
      }

      // 3. Animación suave de aparición de títulos, collages y notas
      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );

      document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));
    } else {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    }
  }

  // Inicialización ordenada
  loadFavorites();
  hydrateBrandingAndFooter();
  renderWelcomeMarquee();
  renderCategories();
  renderProcessAndAbout();
  initCarousels();
  initPolaroidDecks();
  initLightbox();
  initHeaderAndObservers();
  syncFavoriteButtonsUI();
})();
