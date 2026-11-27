/**
 * ============================================================================
 * LÓGICA DE INTERFAZ — ORNELLA BOSCHI · ESTUDIO DE FOTOGRAFÍA
 * Renderizado dinámico desde SITE_CONFIG, carruseles independientes,
 * lightbox táctil/teclado y enlaces seguros a WhatsApp con encodeURIComponent.
 * ============================================================================
 */

(function () {
  "use strict";

  const config = window.SITE_CONFIG;
  if (!config) return;

  /**
   * Construye una URL de WhatsApp limpia y codificada correctamente
   * para conservar tildes, signos "¡!" y espacios en cualquier dispositivo.
   */
  function buildWhatsAppUrl(message) {
    const cleanPhone = String(config.whatsappNumber || "").replace(/\D/g, "");
    const encodedText = encodeURIComponent(message || "");
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  }

  /**
   * Escapa texto plano para inserción segura en atributos o HTML.
   */
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /**
   * Íconos y ornamentos botánicos livianos en SVG inline.
   */
  function getBotanicalSvg(variant) {
    if (variant === "mimosa") {
      return `
        <svg viewBox="0 0 54 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M7 18C19 15 34 11 47 6" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>
          <circle cx="19" cy="11" r="2.1" fill="currentColor" opacity="0.65"/>
          <circle cx="27" cy="8.5" r="2.3" fill="currentColor" opacity="0.75"/>
          <circle cx="36" cy="6.5" r="2" fill="currentColor" opacity="0.65"/>
          <circle cx="25" cy="17.5" r="2" fill="currentColor" opacity="0.6"/>
          <circle cx="34" cy="14.5" r="2.2" fill="currentColor" opacity="0.7"/>
        </svg>`;
    }
    if (variant === "vine-leaf") {
      return `
        <svg viewBox="0 0 54 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 16C18 16 34 11 46 7" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>
          <path d="M22 14C20 9 23 5 28 5C29 9 26 13 22 14Z" stroke="currentColor" stroke-width="1"/>
          <path d="M34 11C33 7 36 4 40 4C40 8 38 10 34 11Z" stroke="currentColor" stroke-width="1"/>
          <path d="M28 13C31 17 35 18 39 16C36 13 33 12 28 13Z" stroke="currentColor" stroke-width="1"/>
        </svg>`;
    }
    return `
      <svg viewBox="0 0 54 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7 17C20 15 34 11 47 7" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"/>
        <path d="M19 15C17 10 19 6 24 6C25 10 22 13 19 15Z" stroke="currentColor" stroke-width="1"/>
        <path d="M32 11.5C30.5 7.5 33 4.5 37 4.5C37.5 8 35.5 10.5 32 11.5Z" stroke="currentColor" stroke-width="1"/>
        <path d="M25 14C28 17.5 33 18.5 37 16.5C34 14 30 13 25 14Z" stroke="currentColor" stroke-width="1"/>
      </svg>`;
  }

  function getWatercolorWashSvg(index) {
    const fills = ["#EFE1CE", "#EAD5C5", "#E4DEC9", "#F1E3C6", "#DCE4CC"];
    const fill = fills[index % fills.length];
    return `
      <svg class="watercolor-wash" viewBox="0 0 320 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M24 49C16 28 45 13 92 12C142 11 188 6 239 14C285 21 308 37 299 56C291 74 246 80 193 79C138 78 86 83 50 72C29 66 30 63 24 49Z" fill="${fill}"/>
      </svg>`;
  }

  function getWhatsAppIconSvg() {
    return `
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.8z"></path>
        <path d="M9.4 8.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .6l-.4.6c-.1.2-.2.3 0 .6.3.5.8 1.1 1.4 1.5.6.4 1.1.5 1.3.6.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .4-.2 1-.7 1.4-.5.4-1.2.5-1.9.3-1.4-.4-2.9-1.3-4.1-2.6-1-1.1-1.7-2.4-1.9-3.5-.1-.7.1-1.3.3-1.4z"></path>
      </svg>`;
  }

  // ==========================================================================
  // RENDERIZADO DE CABECERA, NAVEGACIÓN, CATEGORÍAS Y SOBRE MÍ
  // ==========================================================================
  function hydrateStaticElements() {
    const brandTitle = document.getElementById("brand-title");
    const brandSubtitle = document.getElementById("brand-subtitle");
    const footerBrand = document.getElementById("footer-brand");
    const footerLocation = document.getElementById("footer-location");
    const footerIg = document.getElementById("footer-instagram");
    const footerIgLabel = document.getElementById("footer-ig-label");
    const footerWa = document.getElementById("footer-whatsapp");
    const footerYear = document.getElementById("footer-year");
    const floatingWa = document.getElementById("floating-whatsapp");
    const navList = document.getElementById("category-nav-list");

    if (brandTitle && config.studioName) brandTitle.textContent = config.studioName;
    if (brandSubtitle && config.studioSubtitle) brandSubtitle.textContent = config.studioSubtitle;
    if (footerBrand) {
      footerBrand.textContent = `${config.studioName} · ${config.studioSubtitle}`;
    }
    if (footerLocation && config.location) footerLocation.textContent = config.location;
    if (footerIg && config.instagramUrl) footerIg.href = config.instagramUrl;
    if (footerIgLabel && config.instagramHandle) {
      footerIgLabel.textContent = config.instagramHandle;
    }

    const generalWaUrl = buildWhatsAppUrl(config.floatingWhatsappMessage);
    if (footerWa) footerWa.href = generalWaUrl;
    if (floatingWa) floatingWa.href = generalWaUrl;
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    // Sincronizar píldoras del navegador superior desde SITE_CONFIG
    if (navList && Array.isArray(config.categories)) {
      const pillsHtml = config.categories
        .map(
          (cat, idx) =>
            `<a class="nav-pill${idx === 0 ? " is-active" : ""}" href="#${escapeHtml(cat.id)}">${escapeHtml(cat.navLabel || cat.title)}</a>`
        )
        .concat(
          config.about
            ? `<a class="nav-pill" href="#${escapeHtml(config.about.id)}">${escapeHtml(config.about.navLabel || "Sobre mí")}</a>`
            : []
        )
        .join("");
      navList.innerHTML = pillsHtml;
    }
  }

  function renderCategories() {
    const container = document.getElementById("categories-container");
    if (!container || !Array.isArray(config.categories)) return;

    const sectionsHtml = config.categories
      .map((cat, catIndex) => {
        const waUrl = buildWhatsAppUrl(cat.whatsappMessage);
        const total = Array.isArray(cat.photos) ? cat.photos.length : 0;
        // La primera foto del primer carrusel carga inmediato (LCP); el resto usa lazy loading
        const slidesHtml = (cat.photos || [])
          .map((photo, photoIndex) => {
            const isEager = catIndex === 0 && photoIndex === 0;
            const loadingAttr = isEager
              ? 'loading="eager" fetchpriority="high"'
              : 'loading="lazy" decoding="async"';
            const numberLabel = `${String(photoIndex + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;

            return `
              <div class="carousel-slide${photoIndex === 0 ? " is-active" : ""}" data-slide-index="${photoIndex}">
                <figure
                  class="polaroid-card"
                  data-tape="${escapeHtml(photo.tape || "beige")}"
                  data-category-index="${catIndex}"
                  data-photo-index="${photoIndex}"
                  tabindex="0"
                  role="button"
                  aria-label="Ampliar foto ${photoIndex + 1} de ${escapeHtml(cat.title)}: ${escapeHtml(photo.alt)}"
                >
                  <div class="polaroid-photo-wrap">
                    <img
                      class="polaroid-img"
                      src="${escapeHtml(photo.src)}"
                      alt="${escapeHtml(photo.alt)}"
                      ${loadingAttr}
                    />
                    <span class="polaroid-zoom-hint" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <circle cx="11" cy="11" r="6.5"></circle>
                        <path d="M16 16l4.2 4.2M11 8.5v5M8.5 11h5"></path>
                      </svg>
                    </span>
                  </div>
                  <figcaption class="polaroid-caption">
                    <span>${escapeHtml(photo.caption || "")}</span>
                    <span class="polaroid-number">${numberLabel}</span>
                  </figcaption>
                </figure>
              </div>`;
          })
          .join("");

        const dotsHtml = (cat.photos || [])
          .map(
            (_, dotIndex) => `
              <button
                type="button"
                class="carousel-dot${dotIndex === 0 ? " is-active" : ""}"
                data-dot-index="${dotIndex}"
                aria-label="Ir a la foto ${dotIndex + 1} de ${escapeHtml(cat.title)}"
              ></button>`
          )
          .join("");

        return `
          <section
            id="${escapeHtml(cat.id)}"
            class="category-section ${escapeHtml(cat.themeClass || "theme-paper")}"
            aria-labelledby="heading-${escapeHtml(cat.id)}"
            data-carousel-section="${escapeHtml(cat.id)}"
          >
            <div class="section-container">
              <header class="section-header">
                ${getWatercolorWashSvg(catIndex)}
                <div class="section-botanical">
                  ${getBotanicalSvg(cat.botanicalVariant)}
                </div>
                <h2 class="section-title" id="heading-${escapeHtml(cat.id)}">
                  ${escapeHtml(cat.title)}
                </h2>
                <p class="section-subtitle">${escapeHtml(cat.subtitle)}</p>
              </header>

              <div class="carousel-stage">
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

                <div class="carousel-track" role="region" aria-label="Carrusel de ${escapeHtml(cat.title)}">
                  ${slidesHtml}
                </div>

                <button
                  type="button"
                  class="carousel-arrow carousel-arrow--next"
                  aria-label="Siguiente foto en ${escapeHtml(cat.title)}"
                  ${total <= 1 ? "disabled" : ""}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6"></path>
                  </svg>
                </button>
              </div>

              <div class="carousel-dots" role="tablist" aria-label="Indicadores de fotos de ${escapeHtml(cat.title)}">
                ${dotsHtml}
              </div>

              <div class="section-cta-wrap">
                <a
                  class="btn-whatsapp"
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

    container.innerHTML = sectionsHtml;
  }

  function renderAbout() {
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
            <figure class="about-polaroid">
              <img
                src="${escapeHtml(about.photo.src)}"
                alt="${escapeHtml(about.photo.alt)}"
                loading="lazy"
                decoding="async"
              />
              <figcaption>${escapeHtml(about.photo.caption || "")}</figcaption>
            </figure>
            <svg class="about-sprig" viewBox="0 0 64 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M18 88C25 65 34 40 46 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M26 66C16 61 13 52 17 44C24 49 27 57 26 66Z" stroke="currentColor" stroke-width="1.05" fill="#D7E0C5" fill-opacity="0.55"/>
              <path d="M33 48C24 42 22 33 27 26C33 31 35 39 33 48Z" stroke="currentColor" stroke-width="1.05" fill="#D7E0C5" fill-opacity="0.55"/>
              <path d="M29 58C38 56 46 60 49 67C41 68 34 65 29 58Z" stroke="currentColor" stroke-width="1.05" fill="#D7E0C5" fill-opacity="0.55"/>
              <path d="M37 39C45 37 52 40 55 46C48 48 42 45 37 39Z" stroke="currentColor" stroke-width="1.05" fill="#D7E0C5" fill-opacity="0.55"/>
              <path d="M42 24C38 17 40 10 46 6C49 12 47 19 42 24Z" stroke="currentColor" stroke-width="1.05" fill="#D7E0C5" fill-opacity="0.55"/>
            </svg>
          </div>
        </div>

        <div class="about-content-col">
          <span class="about-eyebrow">${escapeHtml(about.eyebrow || "Sobre mí")}</span>
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
  // CARRUSELES INDEPENDIENTES (SCROLL-SNAP + FLECHAS + PUNTITOS)
  // ==========================================================================
  function initCarousels() {
    const sections = document.querySelectorAll("[data-carousel-section]");

    sections.forEach((sectionEl) => {
      const track = sectionEl.querySelector(".carousel-track");
      const slides = Array.from(sectionEl.querySelectorAll(".carousel-slide"));
      const prevBtn = sectionEl.querySelector(".carousel-arrow--prev");
      const nextBtn = sectionEl.querySelector(".carousel-arrow--next");
      const dots = Array.from(sectionEl.querySelectorAll(".carousel-dot"));

      if (!track || slides.length === 0) return;

      let activeIndex = 0;
      let scrollRaf = null;

      function updateUI(newIndex) {
        activeIndex = Math.max(0, Math.min(slides.length - 1, newIndex));

        slides.forEach((slide, idx) => {
          slide.classList.toggle("is-active", idx === activeIndex);
        });

        dots.forEach((dot, idx) => {
          const isCurrent = idx === activeIndex;
          dot.classList.toggle("is-active", isCurrent);
          dot.setAttribute("aria-selected", isCurrent ? "true" : "false");
        });

        if (prevBtn) prevBtn.disabled = activeIndex <= 0;
        if (nextBtn) nextBtn.disabled = activeIndex >= slides.length - 1;
      }

      function scrollToSlide(targetIndex) {
        const clamped = Math.max(0, Math.min(slides.length - 1, targetIndex));
        const targetSlide = slides[clamped];
        if (!targetSlide) return;

        const slideCenter = targetSlide.offsetLeft + targetSlide.offsetWidth / 2;
        const targetScrollLeft = slideCenter - track.clientWidth / 2;

        updateUI(clamped);
        track.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: "smooth"
        });
      }

      function detectClosestSlide() {
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let closestIdx = 0;
        let minDistance = Infinity;

        slides.forEach((slide, idx) => {
          const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
          const dist = Math.abs(slideCenter - trackCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        });

        if (closestIdx !== activeIndex) {
          updateUI(closestIdx);
        }
      }

      track.addEventListener(
        "scroll",
        () => {
          if (scrollRaf) cancelAnimationFrame(scrollRaf);
          scrollRaf = requestAnimationFrame(detectClosestSlide);
        },
        { passive: true }
      );

      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          scrollToSlide(activeIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          scrollToSlide(activeIndex + 1);
        });
      }

      dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
          scrollToSlide(idx);
        });
      });

      updateUI(0);
    });
  }

  // ==========================================================================
  // LIGHTBOX PANTALLA COMPLETA CON NAVEGACIÓN POR CATEGORÍA Y SWIPE TÁCTIL
  // ==========================================================================
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const imgEl = document.getElementById("lightbox-img");
    const captionEl = document.getElementById("lightbox-caption");
    const categoryEl = document.getElementById("lightbox-category");
    const counterEl = document.getElementById("lightbox-counter");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const stageEl = document.getElementById("lightbox-stage");

    if (!lightbox || !imgEl) return;

    let currentCatIndex = 0;
    let currentPhotoIndex = 0;
    let lastFocusedEl = null;
    let touchStartX = 0;
    let touchStartY = 0;

    function renderLightboxPhoto() {
      const category = config.categories[currentCatIndex];
      if (!category || !Array.isArray(category.photos)) return;

      const total = category.photos.length;
      currentPhotoIndex = ((currentPhotoIndex % total) + total) % total;
      const photo = category.photos[currentPhotoIndex];

      imgEl.src = photo.src;
      imgEl.alt = photo.alt || "";
      if (captionEl) captionEl.textContent = photo.caption || "";
      if (categoryEl) categoryEl.textContent = category.title;
      if (counterEl) counterEl.textContent = `${currentPhotoIndex + 1} de ${total}`;
    }

    function openLightbox(catIdx, photoIdx, triggerEl) {
      currentCatIndex = catIdx;
      currentPhotoIndex = photoIdx;
      lastFocusedEl = triggerEl || document.activeElement;

      renderLightboxPhoto();
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

      if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
        lastFocusedEl.focus();
      }
    }

    function stepPhoto(delta) {
      currentPhotoIndex += delta;
      renderLightboxPhoto();
    }

    // Delegación de eventos para abrir al tocar o presionar Enter/Espacio en cualquier Polaroid
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".polaroid-card[data-category-index]");
      if (card) {
        const catIdx = Number(card.getAttribute("data-category-index"));
        const photoIdx = Number(card.getAttribute("data-photo-index"));
        openLightbox(catIdx, photoIdx, card);
        return;
      }

      if (e.target.hasAttribute("data-lightbox-close") || e.target === stageEl) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      const card = e.target.closest && e.target.closest(".polaroid-card[data-category-index]");
      if (card && !lightbox.classList.contains("is-open") && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        const catIdx = Number(card.getAttribute("data-category-index"));
        const photoIdx = Number(card.getAttribute("data-photo-index"));
        openLightbox(catIdx, photoIdx, card);
        return;
      }

      if (!lightbox.classList.contains("is-open")) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        stepPhoto(-1);
      } else if (e.key === "ArrowRight") {
        stepPhoto(1);
      }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", () => stepPhoto(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => stepPhoto(1));

    // Soporte de deslizamiento táctil dentro del Lightbox
    lightbox.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      },
      { passive: true }
    );

    lightbox.addEventListener(
      "touchend",
      (e) => {
        if (e.changedTouches.length === 1) {
          const dx = e.changedTouches[0].clientX - touchStartX;
          const dy = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
            stepPhoto(dx < 0 ? 1 : -1);
          }
        }
      },
      { passive: true }
    );
  }

  // ==========================================================================
  // NAVEGACIÓN DE PÍLDORAS ACTIVA SEGÚN LA SECCIÓN EN PANTALLA
  // ==========================================================================
  function initScrollSpy() {
    const navList = document.getElementById("category-nav-list");
    if (!navList || !("IntersectionObserver" in window)) return;

    const pills = Array.from(navList.querySelectorAll(".nav-pill"));
    const sectionIds = pills
      .map((p) => p.getAttribute("href"))
      .filter((h) => h && h.startsWith("#"))
      .map((h) => h.slice(1));

    function setActivePill(id) {
      pills.forEach((pill) => {
        const isMatch = pill.getAttribute("href") === `#${id}`;
        pill.classList.toggle("is-active", isMatch);
        if (isMatch) {
          // Desplaza suavemente solo la barra de píldoras horizontal sin mover la página
          const pillCenter = pill.offsetLeft + pill.offsetWidth / 2;
          const targetLeft = pillCenter - navList.clientWidth / 2;
          navList.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePill(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-32% 0px -55% 0px",
        threshold: 0
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Inicialización principal
  hydrateStaticElements();
  renderCategories();
  renderAbout();
  initCarousels();
  initLightbox();
  initScrollSpy();
})();
