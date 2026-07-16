/*
 * DESIGN: Quiet Luxury Editorial - Página de Inicio (Español)
 * Secciones: Hero, Franja de Confianza, Introducción del Asesor, Cuadrícula de Servicios,
 *           Sección de Números, Herramientas Estratégicas, Análisis de Mercado, Testimonio,
 *           Proceso, Sección de Guía, Banda Final de CTA
 * COPY UPDATE: Subtítulo del hero reescrito, mención de Westlake corregida a Cedar Park,
 *              texto de mercado reescrito en voz de Mario, acordeón de proceso reescrito,
 *              sección de guía en lenguaje claro, CTAs diferenciados.
 * BUYERS UPDATE: Franja de Confianza ahora incluye botón CTA "Para Compradores".
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

function setPageMeta(title: string, description: string, url: string) {
  document.title = title;
  const setMeta = (name: string, content: string, property = false) => {
    const attr = property ? "property" : "name";
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  };
  setMeta("description", description);
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("og:url", url, true);
  setMeta("og:type", "website", true);
  setMeta("og:image", "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg", true);
}

export default function HomeES() {
  const [openStep, setOpenStep] = useState<number | null>(null);
  useEffect(() => {
    setPageMeta(
      "Agente de Bienes Raíces en Cedar Park y Leander TX | Mario Manzano",
      "Mario Manzano ayuda a propietarios en Cedar Park y Leander TX a entender todas sus opciones antes de tomar una decisión. Vender, remodelar, alquilar o mantener. Sin presión.",
      "https://mariomanzano.com/es"
    );
  }, []);

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

      {/* HERO */}
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
                BIENES RAÍCES EN CEDAR PARK Y LEANDER
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.0] mb-6">
              Tu Casa.<br />
              Tu Decisión.<br />
              <em className="italic">Tu Asesor.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/75 max-w-xl leading-relaxed mb-10">
              La mayoría de los propietarios solo escuchan una opción. Yo te ayudo a conocer todas tus opciones, ya sea vender, remodelar, rentar, conservar tu casa o comprar la siguiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/es/strategy-hub">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                  Ver Tus Opciones
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

      {/* FRANJA DE CONFIANZA */}
      <section className="bg-[#1A1A18] py-12">
        <div className="container">
          <div className="max-w-2xl">
            <p className="font-body text-base text-white/70 leading-relaxed mb-6">
              Ayudo a propietarios en Cedar Park, Leander y el área de Austin a crear una estrategia clara para vender, remodelar, rentar o conservar su casa. Si estás buscando comprar, también te ayudo a no pagar de más.
            </p>
            <Link href="/es/buyers">
              <span className="btn-luxury-outline border-white text-white hover:bg-white hover:text-black inline-flex items-center gap-3 cursor-pointer">
                Para Compradores
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CAMINO DIRECTO PARA VENDEDOR MOTIVADO */}
      <section className="py-16 border-b border-[#E8E0D5]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-w-4xl">
            <div>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-[#B8974A] mb-3">¿Ya sabes que quieres vender?</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-3">
                Empieza con tus números.
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 max-w-lg leading-relaxed">
                Descubre cuánto te quedarías realmente después de la comisión, los costos de cierre y el saldo de tu hipoteca. Toma dos minutos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link href="/es/net-sheet">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
                  Calcular Ingresos Netos
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/es/contacto">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
                  Hablar con Mario
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCCIÓN DEL ASESOR */}
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
                Soy Mario Manzano, REALTOR® y estratega de ventas en Leander, Texas. He comprado y vendido propiedades, operado un Airbnb, hecho renovaciones viviendo en la propiedad, tenido alquileres y tomado la decisión de vender vs mantener con mi propio dinero en juego. Esa experiencia es lo que traigo a cada conversación.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                Antes de decidir cualquier cosa sobre tu casa, mereces entender todas tus opciones. Eso puede significar vender. Puede significar otra cosa. Mi trabajo es guiarte a través de los números para que tomes la decisión que realmente se adapte a tu situación.
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

      {/* TESTIMONIO */}
      <section className="py-20 md:py-32 bg-[#1A1A18] text-white">
        <div className="container max-w-3xl text-center">
          <RevealDiv>
            <p className="font-display text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
              "La mayoría de los agentes solo me habrían presionado para poner la casa en venta. Mario hizo lo contrario. Me guió a través de cada opción, desde alquilar hasta subdividir, hasta que la decisión correcta fue clara. El proceso fue muy sencillo a partir de ahí."
            </p>
            <p className="font-body text-sm uppercase tracking-widest text-[#B8974A]">
              — Chris Stevens, Leander TX
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* CUADRÍCULA DE SERVICIOS */}
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
              La mayoría de los propietarios solo piensan en vender. Te ayudo a analizar cada opción con números reales para que decidas lo que realmente tiene sentido.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D5]">
            {[
              { num: "01", title: "Vender", desc: "Entiende el mercado, los tiempos y lo que realmente te llevarás después de los costos." },
              { num: "02", title: "Remodelar", desc: "Descubre qué mejoras valen la pena y cuáles rara vez recuperan lo que cuestan." },
              { num: "03", title: "Alquilar", desc: "Analiza si conservar la propiedad como alquiler tiene más sentido financiero que vender ahora." },
              { num: "04", title: "Mantener", desc: "Evalúa si esperar podría ponerte en una posición más fuerte antes de tomar una decisión." }
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

      {/* HERRAMIENTAS ESTRATÉGICAS */}
      <section className="py-20 md:py-32 bg-[#1A1A18] text-white">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6 max-w-2xl mx-auto">
              Analiza los números de cada opción.
            </h2>
            <p className="font-body text-base text-white/70 mb-10 max-w-lg mx-auto">
              Vender no siempre es la respuesta correcta. Estas herramientas te ayudan a comparar tus opciones reales antes de decidir cualquier cosa.
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

      {/* ANÁLISIS DE MERCADO */}
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
                Los mercados de Cedar Park y Leander se mueven de manera diferente al área de Austin en general. Los precios, las tasas de absorción y la demanda de compradores cambian a nivel de vecindario, no de ciudad.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                Me enfoco en Cedar Park, Leander y el área circundante de Austin para darte una lectura honesta de cómo están las cosas y lo que eso significa para tu decisión, ya sea que estés pensando en vender ahora, esperar o algo diferente.
              </p>
              <Link href="/es/guia-para-propietarios">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  Leer la Guía
                  <ArrowRight size={14} />
                </span>
              </Link>
            </RevealDiv>

            <RevealDiv delay={150} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={AERIAL_IMG} alt="Vista aérea de Cedar Park" className="w-full h-full object-cover" />
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>


      {/* CÓMO FUNCIONA */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Cómo Funciona</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12">
              Lo que trabajar conmigo<br />
              <em className="italic">realmente significa.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Tú te comunicas",
                desc: "Sin formularios, sin presión. Un mensaje, una llamada o un texto. Me dices dónde estás y qué estás pensando."
              },
              {
                step: "02",
                title: "Revisamos tus números",
                desc: "Te explico cuánto vale tu casa, cuánto te quedarías y cómo se ven realmente tus opciones en tu situación específica."
              },
              {
                step: "03",
                title: "Tú decides",
                desc: "Vender, esperar, alquilar o remodelar. Mi trabajo es darte claridad, no empujarte hacia ningún resultado. La decisión siempre es tuya."
              }
            ].map((item, i) => (
              <RevealDiv key={item.step} delay={i * 100}>
                <div className="border-t-2 border-[#B8974A] pt-6">
                  <p className="font-display text-4xl font-light text-[#E8E0D5] mb-4">{item.step}</p>
                  <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                  <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
                </div>
              </RevealDiv>
            ))}
          </div>

          <RevealDiv delay={300} className="mt-12">
            <Link href="/es/contacto">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Iniciar una Conversación
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* PROCESO */}
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
              Ya sea que decidas vender, remodelar, alquilar o mantener, saber qué sucede en cada etapa hace todo menos estresante. Así es como trabajo con los vendedores.
            </p>
          </RevealDiv>

          <div className="space-y-4">
            <AccordionItem
              title="Antes de Listar: Preparación y Estrategia"
              isOpen={openStep === 1}
              onClick={() => setOpenStep(openStep === 1 ? null : 1)}
            >
              Aquí es donde la mayoría de los vendedores ganan o pierden dinero. Antes de que algo salga al mercado, analizamos tu situación de capital, lo que está pasando en tu vecindario específico y qué mejoras realmente valen la pena hacer. El objetivo es salir al mercado en la posición más fuerte posible, no solo la más rápida.
            </AccordionItem>
            <AccordionItem
              title="Salida al Mercado: Lanzamiento y Exposición"
              isOpen={openStep === 2}
              onClick={() => setOpenStep(openStep === 2 ? null : 2)}
            >
              Cómo se presenta tu casa en los primeros días importa más de lo que la mayoría de los vendedores se da cuenta. La fotografía profesional, el precio preciso y los materiales de marketing claros son el punto de partida. Lo que diferencia un listado es el posicionamiento, la historia que les cuenta a los compradores sobre por qué esta casa vale lo que pides.
            </AccordionItem>
            <AccordionItem
              title="Ofertas y Negociación: Asegurando los Términos Correctos"
              isOpen={openStep === 3}
              onClick={() => setOpenStep(openStep === 3 ? null : 3)}
            >
              El precio es solo una parte de una oferta. Los términos, las contingencias y los plazos de cierre importan igual. Te explico lo que cada oferta realmente significa, no solo el número en la parte superior, y te ayudo a negociar desde una posición clara en lugar de reaccionar bajo presión.
            </AccordionItem>
            <AccordionItem
              title="Bajo Contrato hasta el Cierre: Manteniéndolo en Marcha"
              isOpen={openStep === 4}
              onClick={() => setOpenStep(openStep === 4 ? null : 4)}
            >
              La mayoría de los negocios que se caen lo hacen entre el contrato y el cierre. Las inspecciones, las tasaciones y los problemas de título pueden crear fricciones. Me mantengo al tanto de cada detalle para que no tengas que perseguir actualizaciones ni preguntarte qué pasa a continuación. El objetivo es un cierre limpio sin sorpresas.
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE GUÍA */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container max-w-3xl text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-2xl mx-auto">
              ¿No sabes por dónde empezar?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 max-w-lg mx-auto">
              La guía para propietarios explica la decisión de vender, remodelar, alquilar o mantener en lenguaje claro y con números reales. Sin presión, solo claridad.
            </p>
            <Link href="/es/guia-para-propietarios">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                Leer la Guía para Propietarios
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* BANDA FINAL DE CTA */}
      <section className="bg-[#1A1A18] py-20 md:py-32 text-center">
        <div className="container">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
              ¿Listo para hablar sobre tus opciones?
            </h2>
            <p className="font-body text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Sin discurso de ventas. Solo una conversación directa sobre tu casa, tu situación y lo que realmente tiene sentido para ti.
            </p>
            <Link href="/es/contacto">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Iniciar una Conversación
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
