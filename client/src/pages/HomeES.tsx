/*
 * DESIGN: Quiet Luxury Editorial - Página de Inicio
 * Secciones: Hero (pantalla completa), Franja de Confianza, Introducción del Asesor, Cuadrícula de Servicios,
 *           Sección de Números, Herramientas Estratégicas (NUEVO), Análisis de Mercado, Testimonio, Franja de Proceso (Actualizado), 
 *           Sección de Guía, Banda Final de CTA
 * Imágenes: Imágenes de héroe generadas por IA (URLs de CDN)
 * Tipografía: Títulos Cormorant Garamond, cuerpo DM Sans
 * Optimización: Se agregó el esquema JSON-LD de RealEstateAgent para SEO local y visibilidad de IA.
 * REFINAMIENTO: Se integró la redacción estratégica de remodelación/refinanciamiento en la sección de Servicios.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Plus, Minus } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-4NeoK6eSrnasPK9gSeTzGq.webp";
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-interior-luxury-8ttBRGUkDcTUkKucmQzirD.webp";
const AERIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/cedar-park-aerial-SPVZiqyQFqbArbkNwV7GJu.webp";
const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-hero-bg-Zzemi4ArQkuF2Ww9f72uuW.webp";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`fade-in-up ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function AccordionItem({ title, children, isOpen, onClick }: { title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-[#E8E0D5] last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="font-display text-xl md:text-2xl font-light text-[#1A1A18] group-hover:text-[#B8974A] transition-colors">
          {title}
        </span>
        {isOpen ? <Minus size={20} className="text-[#B8974A]" /> : <Plus size={20} className="text-[#1A1A18]/40" />}
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] pb-8" : "max-h-0"}`}>
        <div className="font-body text-sm md:text-base text-[#1A1A18]/60 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function HomeES() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Mario Manzano, Agente Inmobiliario",
    "alternateName": ["Mario Manzano", "Mario Manzano Agente Inmobiliario Austin"],
    "@id": "https://mariomanzano.com",
    "url": "https://mariomanzano.com",
    "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg",
    "telephone": "+1-512-695-9255",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "areaServed": ["Austin TX", "Cedar Park TX", "Leander TX"],
    "sameAs": [
      "https://www.instagram.com/mariomanzanoatx",
      "https://www.tiktok.com/@mariomanzanoatx"
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative h-auto md:min-h-screen flex items-start">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Casa de lujo en Cedar Park" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 container py-16 md:py-0 md:pt-32 lg:pt-40 md:pb-16 lg:pb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-10 md:mb-12 pt-4 md:pt-0">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                BIENES RAÍCES EN EL ÁREA DE AUSTIN
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.0] mb-6">
              Tu Casa.<br />
              Tu Decisión.<br />
              <em className="italic">Tu Asesor.</em>
            </h1>
              <p className="font-body text-base md:text-lg text-white/75 max-w-xl leading-relaxed mb-10">
                Toma decisiones basadas en estrategia, no solo en el valor de tu casa. Compara tus opciones para encontrar el camino más rentable para tu propiedad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/es/strategy-hub">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                    Compara Tus Opciones
                    <ArrowRight size={14} />
                  </span>
                </Link>
                <Link href="/es/home-value">
                  <span className="btn-luxury-outline border-white text-white hover:bg-white hover:text-black inline-flex items-center gap-3 cursor-pointer">
                    Mira Cuánto Podría Valer Tu Casa
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* ─── STRATEGY HUB CTA ────────────────────────────────────────── */}
      <section className="bg-[#1A1A18] py-12">
        <div className="container">
          <div className="max-w-2xl">
            <p className="font-body text-base text-white/70 leading-relaxed">
              Ayudo a los propietarios en toda el área de Austin a desarrollar una estrategia clara sobre vender, remodelar, alquilar o mantener. Mi papel es darte claridad para que tomes la decisión correcta para tu familia.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ADVISOR INTRO ─────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={INTERIOR_IMG} alt="Interior de lujo" className="w-full h-full object-cover" />
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01. Sobre Mí</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                Claridad antes de<br />
                <em className="italic">cualquier decisión.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Soy Mario Manzano, agente inmobiliario (REALTOR®) y estratega de ventas en Leander, Texas. Antes de que decidas algo sobre tu casa, mereces entender todas tus opciones.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                Eso puede significar vender, o puede significar algo diferente. Mi trabajo es guiarte a través de los datos, los costos y los tiempos para que tomes la decisión que tenga más sentido para tu situación.
              </p>
              <Link href="/es/acerca">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  Mi Historia
                  <ArrowRight size={14} />
                </span>
              </Link>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─────────────────────────────────────────── */}
      <section
        className="py-20 md:py-32 relative"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#F8F5F0]/90" />
        <div className="relative z-10 container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">02. Cómo Ayudo</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-3 max-w-xl">
              Cuatro caminos que los propietarios suelen considerar.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-12 max-w-lg">
              La mayoría de los propietarios no conocen todas sus opciones. Te ayudo a explorar cada una con datos reales y un análisis honesto.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D5]">
            {[
              { num: "01", title: "Vender", desc: "Entiende el mercado, los tiempos y los costos que implica vender tu casa." },
              { num: "02", title: "Remodelar", desc: "Explora mejoras para aumentar el valor o combinar con un refinanciamiento para tu próximo paso." },
              { num: "03", title: "Alquilar", desc: "Considera si mantener la propiedad como alquiler sirve mejor a tus metas financieras a largo plazo." },
              { num: "04", title: "Mantener", desc: "Evalúa si esperar podría fortalecer tu posición antes de vender." }
            ].map((service, i) => (
              <RevealDiv
                key={service.num}
                delay={i * 80}
                className="bg-[#F8F5F0] p-8 md:p-10 group hover:bg-[#1A1A18] transition-colors duration-500"
              >
                <Link href="/es/guia-para-propietarios" className="block h-full cursor-pointer">
                  <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                    {service.num}
                  </div>
                  <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="font-body text-base text-[#1A1A18]/60 group-hover:text-white/60 mb-6 transition-colors duration-500">
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#B8974A] group-hover:text-white font-body text-sm uppercase tracking-widest">
                    Explorar Opciones
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── START WITH THE NUMBERS ────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-2xl mx-auto">
                  ¿Listo para dar un paso estratégico?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 max-w-lg mx-auto">
                  Explora todas tus opciones y obtén una ruta clara para tu hogar.
            </p>
                <Link href="/es/strategy-hub">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                    Compara Tus Opciones
                    <ArrowRight size={14} />
                  </span>
                </Link>
          </RevealDiv>
        </div>
      </section>

      {/* ─── STRATEGIC TOOLS (NEW SECTION) ─────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#1A1A18] text-white">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6 max-w-2xl mx-auto">
              Análisis Profundo. Decisiones Inteligentes.
            </h2>
            <p className="font-body text-base text-white/70 mb-10 max-w-lg mx-auto">
              Ve más allá de las simples valoraciones. Explora el verdadero impacto financiero de tus opciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/es/sell-vs-rent">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                  Calculadora Vender vs. Alquilar
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/es/remodel-vs-sell">
                <span className="btn-luxury-outline border-white text-white hover:bg-white hover:text-black inline-flex items-center gap-3 cursor-pointer">
                  Calculadora Remodelar vs. Vender
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── MARKET INSIGHT ────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">03. Información</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                Inteligencia del<br />
                <em className="italic">mercado local.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Entender el mercado de Austin va más allá de las noticias. Requiere profundizar en las microtendencias, los datos específicos de cada vecindario y las proyecciones de crecimiento futuro.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                Te brindo la información que necesitas para tomar decisiones informadas, ya sea que estés vendiendo una casa de lujo en Westlake o evaluando una propiedad de inversión en Leander.
              </p>
              <Link href="/es/guia-para-propietarios">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  Obtener la Guía
                  <ArrowRight size={14} />
                </span>
              </Link>
            </RevealDiv>

            <RevealDiv delay={150} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={AERIAL_IMG} alt="Vista aérea de Austin" className="w-full h-full object-cover" />
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ───────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#1A1A18] text-white">
        <div className="container max-w-3xl text-center">
          <RevealDiv>
            <p className="font-display text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
              "La mayoría de los agentes solo me habrían presionado para poner la casa en venta. Mario hizo lo contrario. Me guió a través de cada opción, desde alquilar hasta subdividir, hasta que la decisión correcta fue clara. El proceso fue muy sencillo a partir de ahí."
            </p>
            <p className="font-body text-sm uppercase tracking-widest text-[#B8974A]">
              - Chris Stevens, Leander TX
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── PROCESS STRIP (SELLING PROCESS ACCORDION) ──────────────── */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">04. Proceso</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8">
              Tu camino, claramente definido.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12">
              Ya sea que decidas vender, remodelar, alquilar o mantener, tener una comprensión clara del proceso reduce el estrés y asegura que siempre tengas el control.
            </p>
          </RevealDiv>

          <div className="space-y-4">
            <AccordionItem
              title="Antes de Vender: Preparación Estratégica"
              isOpen={openStep === 1}
              onClick={() => setOpenStep(openStep === 1 ? null : 1)}
            >
              Esta fase se enfoca en entender tus metas, evaluar las condiciones del mercado y preparar tu casa para un impacto máximo. Discutiremos el momento ideal, las reparaciones necesarias frente a las actualizaciones estéticas y la preparación profesional para atraer a los compradores adecuados.
            </AccordionItem>
            <AccordionItem
              title="Salida al Mercado: Lanzamiento y Exposición"
              isOpen={openStep === 2}
              onClick={() => setOpenStep(openStep === 2 ? null : 2)}
            >
              Una vez que tu casa está lista, la lanzamos al mercado con fotografía profesional, descripciones atractivas y campañas de marketing dirigidas. Esto asegura que tu propiedad llegue a una amplia audiencia de compradores calificados, generando un fuerte interés y visitas.
            </AccordionItem>
            <AccordionItem
              title="Ofertas y Negociación: Asegurando los Mejores Términos"
              isOpen={openStep === 3}
              onClick={() => setOpenStep(openStep === 3 ? null : 3)}
            >
              Recibir ofertas es solo el comienzo. Te guiaré en la evaluación de cada propuesta, negociando términos y manejando contraofertas para asegurar el mejor precio y condiciones posibles para tu venta. Mi meta es proteger tus intereses en cada paso.
            </AccordionItem>
            <AccordionItem
              title="Bajo Contrato hasta el Cierre: Una Transición Fluida"
              isOpen={openStep === 4}
              onClick={() => setOpenStep(openStep === 4 ? null : 4)}
            >
              Desde la firma del contrato hasta el día del cierre, gestiono todos los detalles: inspecciones, tasaciones, trámites de título y comunicación con todas las partes. Mi enfoque es una transacción fluida y sin estrés, asegurando que se cumplan todos los requisitos y que llegues al cierre con éxito.
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* ─── GUIDE SECTION (MOVED LOWER) ───────────────────────────── */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container max-w-3xl text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-2xl mx-auto">
              Aprendizaje y Perspectivas Profundas.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 max-w-lg mx-auto">
              Para una comprensión completa de tus opciones y del mercado de Austin, descarga mi guía exclusiva para propietarios.
            </p>
            <Link href="/es/guia-para-propietarios">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                Obtener la Guía Completa
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* ─── FINAL CTA BAND ────────────────────────────────────────── */}
      <section className="bg-[#1A1A18] py-20 md:py-32 text-center">
        <div className="container">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
              ¿Listo para dar tu próximo paso?
            </h2>
            <p className="font-body text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Obtén una estrategia clara adaptada a tus metas. Compara tus opciones y gana la claridad que necesitas.
            </p>
            <Link href="/es/strategy-hub">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Compara Tus Opciones
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
