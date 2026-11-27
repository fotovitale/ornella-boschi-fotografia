/**
 * ============================================================================
 * CONFIGURACIÓN GENERAL DEL SITIO — ORNELLA BOSCHI · ESTUDIO DE FOTOGRAFÍA
 * ============================================================================
 *
 * ¿CÓMO EDITAR ESTE ARCHIVO CUANDO LA CLIENTA PASE SUS DATOS Y FOTOS?
 *
 * 1. NÚMERO DE WHATSAPP (`whatsappNumber`):
 *    Escribí el número completo con código de país (549 para celulares de
 *    Argentina) + código de área sin el 0 + número sin el 15.
 *    Sin signo "+", ni espacios, ni guiones.
 *    Ejemplo Mendoza: "5492634123456" o "5492615123456"
 *
 * 2. FOTOS PROPIAS (`photos` en cada categoría y `about.photo`):
 *    Guardá las fotos optimizadas (.jpg o .webp) en su carpeta correspondiente
 *    dentro de `img/` y reemplazá la URL de prueba (`src`) por la ruta local:
 *      Ejemplo: src: "img/recien-nacidos/foto-01.jpg"
 *
 * 3. MENSAJES DE WHATSAPP (`whatsappMessage`):
 *    Podés cambiar libremente cualquier frase, tilde o signo de exclamación;
 *    el sistema los codifica automáticamente para que lleguen impecables al chat.
 * ============================================================================
 */

window.SITE_CONFIG = {
  // Reemplazar por el número real de Ornella (formato internacional sin "+" ni espacios)
  whatsappNumber: "5492634000000",

  // Datos de marca y contacto para Header y Footer
  studioName: "Ornella Boschi",
  studioSubtitle: "Estudio de Fotografía",
  location: "Mendoza, Argentina",
  instagramUrl: "https://www.instagram.com/",
  instagramHandle: "@ornellaboschi.ph",

  // Mensaje del botón flotante general (esquina inferior derecha)
  floatingWhatsappMessage:
    "¡Hola Ornella! Estuve recorriendo tu página web y me gustaría hacerte una consulta sobre una sesión fotográfica.",

  // ==========================================================================
  // CATEGORÍAS DE PORFOLIO (se renderizan en este mismo orden)
  // ==========================================================================
  categories: [
    {
      id: "recien-nacidos",
      navLabel: "Recién Nacidos",
      title: "Sesiones a nuestros Recién Nacidos",
      subtitle: "Sus primeros días guardados con delicadeza, calma y luz natural.",
      ctaText: "Consultar sesión de Recién Nacidos",
      whatsappMessage:
        "¡Hola Ornella! Vi tu galería en la web y me encantaría consultar disponibilidad para una sesión de Recién Nacidos.",
      themeClass: "theme-paper",
      botanicalVariant: "olive-sprig",
      // Carpeta preparada para tus fotos reales: img/recien-nacidos/
      photos: [
        {
          src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80",
          alt: "Bebé recién nacido durmiendo plácidamente envuelto en manta tejida cálida",
          caption: "#reciénnacidos · primeros días",
          tape: "beige"
        },
        {
          src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=900&q=80",
          alt: "Detalle tierno de recién nacido descansando sobre textura suave color crema",
          caption: "#calma · tan chiquito",
          tape: "sage"
        },
        {
          src: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80",
          alt: "Manitos pequeñas de bebé recién nacido sostenidas con ternura",
          caption: "#detalles · piel a piel",
          tape: "blush"
        },
        {
          src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80",
          alt: "Retrato cálido e íntimo de recién nacido durmiendo en cuna artesanal",
          caption: "#bienvenido · dulce espera",
          tape: "beige"
        }
      ]
    },
    {
      id: "familias",
      navLabel: "Familias",
      title: "Sesiones de Familia",
      subtitle: "Abrazos reales y recuerdos espontáneos para volver siempre.",
      ctaText: "Reservar nuestra sesión de Familia",
      whatsappMessage:
        "¡Hola Ornella! Me enamoré de las fotos de tu web y quisiera consultar por una sesión de Familia.",
      themeClass: "theme-butter",
      botanicalVariant: "mimosa",
      // Carpeta preparada para tus fotos reales: img/familias/
      photos: [
        {
          src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80",
          alt: "Familia abrazándose al aire libre durante el atardecer dorado",
          caption: "#abrazosreales · atardecer",
          tape: "sage"
        },
        {
          src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=900&q=80",
          alt: "Mamá, papá e hijos riendo juntos con luz cálida natural",
          caption: "#enfamilia · risas",
          tape: "beige"
        },
        {
          src: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=900&q=80",
          alt: "Madre alzando a su hijo pequeño en un entorno natural luminoso",
          caption: "#conexión · crecer juntos",
          tape: "blush"
        },
        {
          src: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&w=900&q=80",
          alt: "Retrato espontáneo familiar caminando de la mano al sol",
          caption: "#recuerdos · para siempre",
          tape: "sage"
        }
      ]
    },
    {
      id: "reinas",
      navLabel: "Reinas de la Vendimia",
      title: "Reinas de la Vendimia",
      subtitle: "Retratos editoriales que celebran tu esencia, tradición y presencia.",
      ctaText: "Consultar producción de Vendimia",
      whatsappMessage:
        "¡Hola Ornella! Vi tus retratos de Reinas de la Vendimia en la web y quisiera consultar para realizar una producción.",
      themeClass: "theme-blush",
      botanicalVariant: "vine-leaf",
      // Carpeta preparada para tus fotos reales: img/reinas/
      photos: [
        {
          src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
          alt: "Retrato editorial femenino elegante con iluminación cálida y mirada serena",
          caption: "#vendimia · esencia real",
          tape: "beige"
        },
        {
          src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
          alt: "Producción editorial de gala con luz suave y porte distinguido",
          caption: "#reinas · mendoza",
          tape: "blush"
        },
        {
          src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
          alt: "Mujer joven con vestido elegante posando en sesión editorial clásica",
          caption: "#elegancia · gala",
          tape: "sage"
        },
        {
          src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=80",
          alt: "Primer plano artístico femenino destacando facciones y luz dorada",
          caption: "#presencia · retrato editorial",
          tape: "beige"
        }
      ]
    },
    {
      id: "personales",
      navLabel: "Personales",
      title: "Sesiones Personales",
      subtitle: "Un espacio relajado y genuino para retratarte tal cual sos.",
      ctaText: "Quiero mi sesión Personal",
      whatsappMessage:
        "¡Hola Ornella! Estuve viendo tu porfolio web y me gustaría consultar para hacer una sesión Personal.",
      themeClass: "theme-sand",
      botanicalVariant: "olive-sprig",
      // Carpeta preparada para tus fotos reales: img/personales/
      photos: [
        {
          src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
          alt: "Retrato personal natural de mujer sonriendo con luz suave de tarde",
          caption: "#talcualsos · autenticidad",
          tape: "sage"
        },
        {
          src: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=900&q=80",
          alt: "Sesión personal al aire libre con estética orgánica y cálida",
          caption: "#luznatural · tu momento",
          tape: "beige"
        },
        {
          src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
          alt: "Retrato artístico femenino con sombrero en entorno rústico soleado",
          caption: "#espontánea · aire libre",
          tape: "blush"
        },
        {
          src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
          alt: "Primer plano cálido y relajado con luz natural envolvente",
          caption: "#retratos · mirada propia",
          tape: "beige"
        }
      ]
    },
    {
      id: "productos",
      navLabel: "Productos",
      title: "Fotografía de Productos",
      subtitle: "Imágenes cuidadas y orgánicas que muestran el alma de tu marca.",
      ctaText: "Consultar fotos para mi Marca",
      whatsappMessage:
        "¡Hola Ornella! Vi tus trabajos de Fotografía de Productos en la web y quisiera consultar por una sesión para mi marca.",
      themeClass: "theme-sage",
      botanicalVariant: "mimosa",
      // Carpeta preparada para tus fotos reales: img/productos/
      photos: [
        {
          src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
          alt: "Fotografía estética de frascos botánicos y cosmética artesanal con sombras suaves",
          caption: "#tumarca · identidad visual",
          tape: "beige"
        },
        {
          src: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=80",
          alt: "Vela artesanal y cerámica minimalista sobre lino cálido",
          caption: "#hechoamano · texturas",
          tape: "blush"
        },
        {
          src: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
          alt: "Composición editorial de productos naturales en tonos tierra y crema",
          caption: "#detalles · emprendedores",
          tape: "sage"
        },
        {
          src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=80",
          alt: "Presentación cuidada de producto de autor con iluminación de estudio natural",
          caption: "#almaartesanal · catálogo",
          tape: "beige"
        }
      ]
    }
  ],

  // ==========================================================================
  // SECCIÓN "SOBRE MÍ" (se ubica al final del recorrido visual)
  // ==========================================================================
  about: {
    id: "sobre-mi",
    navLabel: "Sobre mí",
    eyebrow: "Detrás de la cámara",
    handwrittenNote: "Hola, soy Ornella...",
    title: "Guardar lo simple, lo real y lo que emociona",
    // Carpeta preparada para tu retrato real: img/sobre-mi/
    photo: {
      src: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=900&q=80",
      alt: "Ornella Boschi en su estudio sosteniendo su cámara fotográfica",
      caption: "Mendoza · luz natural & calma"
    },
    paragraphs: [
      "Creo en la fotografía que se siente como casa: sin poses rígidas ni apuros, cuidando cada detalle para que te sientas cómodo y disfrutes el momento tanto como el recuerdo que nos queda después.",
      "Desde Mendoza acompaño los primeros días de tu bebé, abrazos en familia, sueños de Vendimia, retratos personales y proyectos hechos con amor. Contame qué tenés en mente y armamos juntos una sesión a tu medida."
    ],
    signature: "Con cariño, Orne",
    ctaText: "Escribime y charlamos tu idea",
    whatsappMessage:
      "¡Hola Ornella! Estuve viendo toda tu web y me encantaría contarte mi idea para coordinar una sesión."
  }
};
