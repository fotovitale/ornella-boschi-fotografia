/**
 * ============================================================================
 * CONFIGURACIÓN CENTRALIZADA — ORNELLA BOSCHI · ESTUDIO DE FOTOGRAFÍA
 * ============================================================================
 *
 * GUÍA RÁPIDA DE EDICIÓN:
 * 1. WHATSAPP (`whatsappNumber`):
 *    Número completo con código de país (549 para Argentina) sin "+" ni espacios.
 *    Ejemplo: "5492634123456"
 *
 * 2. FOTOS PROPIAS (`photos` en cada categoría y `about.photo`):
 *    Guardá tus imágenes (.jpg / .webp) dentro de `img/<categoria>/` y cambiá
 *    el valor de `src`, por ejemplo: "img/recien-nacidos/foto-01.jpg".
 *    Cada categoría está pensada para lucirse con 6 fotos (o más).
 *
 * 3. CRÉDITO DE DESARROLLO (`developerCredit`):
 *    Podés cambiar `url` por tu portfolio, web o perfil de Instagram cuando quieras.
 * ============================================================================
 */

window.SITE_CONFIG = {
  // Número real de WhatsApp de Ornella (+54 9 2634 41-0662 -> sin "+" ni espacios)
  whatsappNumber: "5492634410662",
  whatsappDisplay: "+54 9 2634 41-0662",

  // Identidad de marca y contacto real
  studioName: "Ornella Boschi",
  monogram: "OB",
  studioSubtitle: "Estudio de Fotografía",
  stampText: "SAN MARTÍN · MENDOZA · LUZ NATURAL · ",
  location: "San Martín, Mendoza · Argentina",
  instagramUrl: "https://www.instagram.com/ornellaboschifotografia/",
  instagramHandle: "@ornellaboschifotografia",
  email: "ornelitaboschi@gmail.com",

  // Tira collage de bienvenida debajo del header
  welcomeStrip: {
    handwrittenTag: "capturando instantes reales"
  },

  // Pasos breves de "Cómo es tu sesión"
  processSteps: [
    {
      number: "01",
      title: "Elegís tu estilo",
      text: "Recorré las galerías, marcá con ♥ tus fotos favoritas y contame qué idea soñás."
    },
    {
      number: "02",
      title: "Pensamos la luz y el lugar",
      text: "Coordinamos vestuario, horarios cálidos y cada detalle sin apuros ni poses rígidas."
    },
    {
      number: "03",
      title: "Tus recuerdos para siempre",
      text: "Recibís una selección curada y editada con calidez artesanal, lista para guardar."
    }
  ],

  // ==========================================================================
  // 5 CATEGORÍAS CON PERSONALIDAD VISUAL PROPIA (6 fotos verificadas c/u = 30)
  // ==========================================================================
  categories: [
    {
      id: "recien-nacidos",
      navLabel: "Recién Nacidos",
      shortLabel: "Recién Nacidos",
      layout: "scrapbook-thumbs",
      themeClass: "theme-paper",
      eyebrow: "Primeros días",
      title: "Sesiones a nuestros Recién Nacidos",
      subtitle: "Sus primeros días guardados con delicadeza, calma y texturas suaves.",
      ctaText: "Consultar sesión de Recién Nacidos",
      whatsappMessage:
        "¡Hola Orne! Vi tu galería de Recién Nacidos en la web y me encantaría consultar disponibilidad y cómo trabajan las sesiones.",
      // Carpeta local lista: img/recien-nacidos/
      photos: [
        {
          src: "https://images.unsplash.com/photo-1773243086679-20c427d28092?auto=format&fit=crop&w=900&q=80",
          alt: "Bebé recién nacido durmiendo en calma sobre manta tejida beige",
          caption: "#primerosdías",
          decor: "tape-beige"
        },
        {
          src: "https://images.unsplash.com/photo-1770831208183-92f98cf3845b?auto=format&fit=crop&w=900&q=80",
          alt: "Manos de mamá y papá sosteniendo con ternura el piecito de su recién nacido",
          caption: "#pielapiel",
          decor: "paperclip"
        },
        {
          src: "https://images.unsplash.com/photo-1701839640980-032c6b88fc87?auto=format&fit=crop&w=900&q=80",
          alt: "Primer plano cálido de bebé recién nacido descansando sobre tejido color crema",
          caption: "#dulcecalma",
          decor: "tape-sage"
        },
        {
          src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=900&q=80",
          alt: "Piecitos pequeños de recién nacido asomando entre manta suave blanca",
          caption: "#tanchiquito",
          decor: "tape-blush"
        },
        {
          src: "https://images.unsplash.com/photo-1552819289-e14fbbcea868?auto=format&fit=crop&w=900&q=80",
          alt: "Detalle tierno de rostro y manito cerrada de recién nacido durmiendo",
          caption: "#ternura",
          decor: "paperclip"
        },
        {
          src: "https://images.unsplash.com/photo-1544268211-ba72491bf350?auto=format&fit=crop&w=900&q=80",
          alt: "Piecitos delicados de bebé recién nacido con luz natural suave",
          caption: "#bienvenido",
          decor: "tape-beige"
        }
      ]
    },
    {
      id: "familias",
      navLabel: "Familias",
      shortLabel: "Familias",
      layout: "collage-carousel",
      themeClass: "theme-butter",
      eyebrow: "Historias compartidas",
      collageNote: "#abrazosreales",
      title: "Sesiones de Familia",
      subtitle: "Abrazos reales, juegos al sol y recuerdos espontáneos para volver siempre.",
      ctaText: "Reservar nuestra sesión de Familia",
      whatsappMessage:
        "¡Hola Orne! Me enamoré de las fotos de Familia en tu web y quisiera consultar disponibilidad para hacer una sesión.",
      // Carpeta local lista: img/familias/
      photos: [
        {
          src: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=900&q=80",
          alt: "Familia caminando de la mano en el campo con luz cálida de tarde",
          caption: "#abrazosreales",
          decor: "tape-sage"
        },
        {
          src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=900&q=80",
          alt: "Papá abrazando y riendo con sus hijos pequeños al aire libre",
          caption: "#risas",
          decor: "paperclip"
        },
        {
          src: "https://images.unsplash.com/photo-1484665754804-74b091211472?auto=format&fit=crop&w=900&q=80",
          alt: "Mamá alzando en brazos a su hijo sonriente bajo el sol dorado",
          caption: "#luzdetarde",
          decor: "tape-blush"
        },
        {
          src: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?auto=format&fit=crop&w=900&q=80",
          alt: "Mamá y papá compartiendo un momento íntimo y cálido junto a su bebé",
          caption: "#enfamilia",
          decor: "tape-beige"
        },
        {
          src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80",
          alt: "Familia unida contemplando el atardecer dorado",
          caption: "#atardecer",
          decor: "paperclip"
        },
        {
          src: "https://images.unsplash.com/photo-1648221350871-e3ae3c8d0f58?auto=format&fit=crop&w=900&q=80",
          alt: "Padres e hijos tomados de la mano a contraluz en la hora dorada",
          caption: "#parasiempre",
          decor: "tape-sage"
        }
      ]
    },
    {
      id: "reinas",
      navLabel: "Reinas de la Vendimia",
      shortLabel: "Reinas de la Vendimia",
      layout: "editorial-lookbook",
      themeClass: "theme-espresso",
      eyebrow: "Edición Editorial · Mendoza",
      title: "Reinas de la Vendimia",
      subtitle: "Retratos de portada que celebran tu esencia, porte y tradición mendocina.",
      ctaText: "Consultar producción de Vendimia",
      whatsappMessage:
        "¡Hola Orne! Vi el lookbook de Reinas de la Vendimia en tu web y quisiera consultar para realizar una producción editorial.",
      // Fotos reales locales de Reinas de la Vendimia de Mendoza en img/reinas/
      photos: [
        {
          src: "img/reinas/reina-01.jpg",
          alt: "Retrato oficial de Reina Nacional de la Vendimia de Mendoza con corona, capa bordada, banda y cetro",
          caption: "Corona, capa y cetro · Retrato oficial",
          decor: "gold"
        },
        {
          src: "img/reinas/reina-02.jpg",
          alt: "Retrato de estudio de Virreina Nacional de la Vendimia con atributos reales mendocinos",
          caption: "Atributos vendimiales · Estudio",
          decor: "gold"
        },
        {
          src: "img/reinas/reina-03.jpg",
          alt: "Reina y Virreina Nacional de la Vendimia luciendo sus bandas oficiales bajo el sol mendocino",
          caption: "Soberanas Nacionales · Mendoza",
          decor: "gold"
        },
        {
          src: "img/reinas/reina-04.jpg",
          alt: "Coronación y saludo real con corona, capa y banda en la Fiesta Nacional de la Vendimia",
          caption: "Noche de coronación · Frank Romero Day",
          decor: "gold"
        },
        {
          src: "img/reinas/reina-05.jpg",
          alt: "Reina departamental de la Vendimia saludando con su corona y banda durante el desfile",
          caption: "Carrusel de las Reinas · Tradición",
          decor: "gold"
        },
        {
          src: "img/reinas/reina-06.jpg",
          alt: "Soberana departamental con corona, banda y canasto de cosecha en carro vendimial",
          caption: "Vía Blanca & Cosecha · Vendimia",
          decor: "gold"
        }
      ]
    },
    {
      id: "personales",
      navLabel: "Personales",
      shortLabel: "Sesiones Personales",
      layout: "polaroid-deck",
      themeClass: "theme-blush",
      eyebrow: "Retratos con alma",
      title: "Sesiones Personales",
      subtitle: "Un espacio relajado y auténtico para retratarte tal cual sos.",
      ctaText: "Quiero mi sesión Personal",
      whatsappMessage:
        "¡Hola Orne! Estuve recorriendo el mazo de Sesiones Personales en tu web y me encantaría consultar para hacer mi sesión.",
      // Carpeta local lista: img/personales/
      photos: [
        {
          src: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=900&q=80",
          alt: "Mujer joven sonriendo espontáneamente entre rayos de sol de tarde",
          caption: "#talcualsos",
          decor: "tape-beige"
        },
        {
          src: "https://images.unsplash.com/photo-1561375851-6afaa8fcb104?auto=format&fit=crop&w=900&q=80",
          alt: "Retrato sereno con sombrero en un campo dorado al atardecer",
          caption: "#horadorada",
          decor: "paperclip"
        },
        {
          src: "https://images.unsplash.com/photo-1784633319408-a5509da8c4d8?auto=format&fit=crop&w=900&q=80",
          alt: "Retrato personal en tonos tierra rodeada de flores silvestres",
          caption: "#luznatural",
          decor: "tape-sage"
        },
        {
          src: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?auto=format&fit=crop&w=900&q=80",
          alt: "Retrato cálido con sombrero junto a puerta rústica de madera",
          caption: "#esenciapropia",
          decor: "tape-blush"
        },
        {
          src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
          alt: "Primer plano natural al aire libre con luz suave envolvente",
          caption: "#miradareal",
          decor: "paperclip"
        },
        {
          src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
          alt: "Sonrisa luminosa y espontánea a contraluz durante el atardecer",
          caption: "#espontánea",
          decor: "tape-beige"
        }
      ]
    },
    {
      id: "productos",
      navLabel: "Productos",
      shortLabel: "Fotografía de Productos",
      layout: "boutique-mosaic",
      themeClass: "theme-sage",
      eyebrow: "Marcas & Emprendimientos",
      title: "Fotografía de Productos",
      subtitle: "Composiciones orgánicas, texturas y luz cuidada que muestran el alma de tu marca.",
      ctaText: "Consultar fotos para mi Marca",
      whatsappMessage:
        "¡Hola Orne! Vi tu sección de Fotografía de Productos y quisiera consultar para retratar los productos de mi marca.",
      // Carpeta local lista: img/productos/
      photos: [
        {
          src: "https://images.unsplash.com/photo-1793100123538-396050d9f5c1?auto=format&fit=crop&w=900&q=80",
          alt: "Frasco gotero ámbar sobre piedra natural con sombras cálidas de hojas",
          caption: "#identidadvisual",
          decor: "tape-beige"
        },
        {
          src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
          alt: "Piezas de cerámica artesanal en gres y tonos crema",
          caption: "#hechoamano",
          decor: "paperclip"
        },
        {
          src: "https://images.unsplash.com/photo-1793539267095-5798946eea27?auto=format&fit=crop&w=900&q=80",
          alt: "Detalle estético de cosmética botánica y pipetas sobre fondo beige cálido",
          caption: "#texturas",
          decor: "tape-blush"
        },
        {
          src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
          alt: "Botella ámbar sobre pedestal de madera con sombras orgánicas suaves",
          caption: "#luzdeestudio",
          decor: "tape-sage"
        },
        {
          src: "https://images.unsplash.com/photo-1781344116880-029945a42b75?auto=format&fit=crop&w=900&q=80",
          alt: "Presentación minimalista de envase artesanal sobre bloque de piedra",
          caption: "#tumarca",
          decor: "paperclip"
        },
        {
          src: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
          alt: "Vela aromática artesanal encendida en atmósfera cálida e íntima",
          caption: "#almaartesanal",
          decor: "tape-beige"
        }
      ]
    }
  ],

  // ==========================================================================
  // SECCIÓN "SOBRE MÍ" (al final de la página)
  // ==========================================================================
  about: {
    id: "sobre-mi",
    navLabel: "Sobre mí",
    eyebrow: "Detrás de cada historia",
    handwrittenNote: "Hola, soy Ornella...",
    title: "Fotografiar lo simple, lo sensible y lo verdadero",
    // Carpeta local lista: img/sobre-mi/
    photo: {
      src: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=900&q=80",
      alt: "Cámara fotográfica bañada por la luz dorada del atardecer en San Martín, Mendoza",
      caption: "San Martín, Mendoza · luz cálida"
    },
    paragraphs: [
      "Creo en una fotografía cercana, sin poses forzadas ni corridas: un rato tranquilo donde puedas relajarte, disfrutar y ser vos mismo mientras guardo esos gestos chiquitos que con los años valen oro.",
      "Desde San Martín, Mendoza, acompaño los primeros días de tu bebé, tardes en familia, producciones de Vendimia, retratos personales y marcas creadas a pulmón. Si alguna foto te inspiró, escribime y armamos juntos tu sesión."
    ],
    signature: "Con amor, Orne",
    ctaText: "Escribime y charlamos tu idea",
    whatsappMessage:
      "¡Hola Orne! Estuve recorriendo tu página web y me encantaría contarte mi idea para coordinar una sesión."
  },

  // ==========================================================================
  // CRÉDITO DE DESARROLLO WEB (última línea del footer)
  // ==========================================================================
  developerCredit: {
    prefix: "Diseño y desarrollo web por",
    label: "Vitale Martínez | Desarrollo Web",
    url: "https://fotovitale.github.io/desarrollo-web/"
  }
};
