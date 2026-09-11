/*
 * DESIGN: Quiet Luxury Editorial - Presentación para Vendedores
 * Route: /es/presentacion-vendedores/ (now public)
 * Sections: Hero, Process, Photography, Marketing, Commitments, No Contract, Communication, About, Next Steps
 * SEO: Full meta tags + canonical. noindex removed — page is now public.
 */

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
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
  setMeta("og:image", "/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

const HEADSHOT =
  "/images/mario-manzano-austin-realtor-professional-headshot.JPG";

export default function ListingPresentationES() {
  useEffect(() => {
    setPageMeta(
      "Estrategia para Vendedores | Cedar Park y Leander TX | Mario Manzano",
      "Cómo Mario Manzano maneja la venta de casas en Cedar Park y Leander: un proceso de 8 pasos basado en tu situación, comunicación clara y sin presión.",
      "https://mariomanzano.com/es/presentacion-vendedores/"
    );
  }, []);

  const sellerSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Representación para Vendedores",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "telephone": "+1-512-695-9255",
      "url": "https://mariomanzano.com"
    },
    "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"],
    "url": "https://mariomanzano.com/es/presentacion-vendedores/",
    "description": "Mario Manzano ayuda a propietarios en Cedar Park y Leander a vender con un plan claro, marketing profesional y orientación en cada paso."
  };

  const processSteps = [
    {
      number: "01",
      title: "Preparación",
      desc: "Recorrido de la propiedad, lista de preparación, reparaciones y orientación de presentación.",
    },
    {
      number: "02",
      title: "Fotografía y Lanzamiento",
      desc: "Fotografía profesional con drone, copy de la propiedad y activación completa de marketing.",
    },
    {
      number: "03",
      title: "Lanzamiento",
      desc: "Publicación en MLS, precio acordado y exposición dirigida.",
    },
    {
      number: "04",
      title: "Visitas y Retroalimentación",
      desc: "Visitas coordinadas con retroalimentación de compradores revisada.",
    },
    {
      number: "05",
      title: "Revisión de Ofertas",
      desc: "Todas las ofertas presentadas con un desglose claro de los términos.",
    },
    {
      number: "06",
      title: "Bajo Contrato",
      desc: "Inspección, tasación y título manejados paso a paso.",
    },
    {
      number: "07",
      title: "Cierre",
      desc: "Recorrido final y firma de documentos.",
    },
    {
      number: "08",
      title: "Fondos y Registro",
      desc: "Fondos recibidos, documentos registrados y llaves entregadas.",
    },
  ];

  const marketingItems = [
    "Publicación completa en MLS revisada contigo antes de salir al mercado",
    "Difusión en Zillow, Realtor.com y todas las plataformas principales",
    "Fotografía profesional con drone",
    "Campaña en redes sociales dirigida a compradores activos",
    "Anuncio de Nueva Propiedad enviado al vecindario por correo postal",
    "Anuncio de Nueva Propiedad publicado en todas mis redes sociales",
  ];

  const commitments = [
    "Siempre te daré orientación experta para que puedas tomar la mejor decisión para tu familia.",
    "Siempre seré honesto sobre el precio de tu casa, su condición y lo que se necesita para venderla.",
    "Siempre te diré la verdad, incluso cuando no sea lo que quieras escuchar.",
    "Siempre actuaré en tu mejor interés, no en el mío.",
    "Siempre trabajaré para que te vayas con el mayor dinero posible.",
    "Siempre usaré las estrategias más efectivas para comercializar tu propiedad.",
    "Siempre te mantendré informado antes de que algo cambie.",
    "Nunca te voy a amarrar a un contrato de largo plazo.",
  ];

  const communicationItems = [
    "Comunicación según tus términos, llamada, texto o correo",
    "Retroalimentación de visitas dentro de 24 horas cuando el agente del comprador la proporciona",
    "Las ofertas se revisan contigo antes de que respondas, no después",
    "Actualizaciones regulares durante todo el proceso, aunque no haya nada nuevo que reportar",
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sellerSchema) }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-[#1A1A18]">
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="section-rule"
                style={{ background: "#B8974A" }}
              />
              <span
                className="font-body text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "#B8974A" }}
              >
                Estrategia para Vendedores
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Tu Casa.<br />
              <em className="italic">Tu Decisión.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Un plan claro basado en tu situación, no en una presentación de ventas.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS & TIMELINE */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">01. Proceso</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              Si decides vender, así es como funciona.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              Cada paso tiene un propósito. Nada ocurre sin tu aprobación.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <RevealDiv
                key={step.number}
                delay={i * 75}
                className="border-t-2 border-[#B8974A] pt-6"
              >
                <span className="font-display text-sm text-[#B8974A] tracking-widest block mb-3">
                  {step.number}
                </span>
                <h3 className="font-display text-lg font-light text-[#1A1A18] mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                  {step.desc}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTOGRAPHY */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">02. Fotografía</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              La primera visita ocurre en línea.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              Antes de que un comprador entre a tu casa, ya tomó una decisión basada en las fotos. La calidad aquí no es opcional.
            </p>
          </RevealDiv>

          <RevealDiv delay={100}>
            <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-3xl">
              {/* Ejemplo deficiente */}
              <div className="relative overflow-hidden">
                <div
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80"
                    alt="Foto de propiedad de baja calidad, oscura y mal iluminada"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.3) saturate(0.4)" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-4">
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/70">
                    Ejemplo Deficiente
                  </span>
                </div>
              </div>

              {/* Mi ejemplo */}
              <div className="relative overflow-hidden">
                <div
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80"
                    alt="Foto profesional de propiedad, bien iluminada"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(1.15) saturate(1.25) contrast(1.05)" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 py-2 px-4" style={{ background: "rgba(184,151,74,0.85)" }}>
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white">
                    Mi Ejemplo
                  </span>
                </div>
              </div>
            </div>

            <p className="font-body text-sm text-[#1A1A18]/55 mt-6 max-w-md leading-relaxed">
              Las casas con fotografía profesional se venden 32% más rápido y atraen ofertas más competitivas.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* MARKETING PLAN */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03. Marketing</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              Cómo pongo tu casa frente a los compradores.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              Cada elemento a continuación es parte de cada propiedad que listo. Nada es un extra.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {marketingItems.map((item, i) => (
              <RevealDiv
                key={i}
                delay={i * 75}
                className="flex items-start gap-4 border-t border-[#1A1A18]/10 pt-5"
              >
                <span className="font-display text-[#B8974A] text-xs tracking-widest mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-sm text-[#1A1A18]/75 leading-relaxed">
                  {item}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">04. Compromisos</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              Lo que puedes exigirme.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              Estos no son puntos de venta. Es el estándar que me exijo en cada propiedad.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commitments.map((item, i) => (
              <RevealDiv
                key={i}
                delay={i * 75}
                className="border-l-2 border-[#B8974A] pl-8 py-6 bg-white"
              >
                <p className="font-body text-base text-[#1A1A18]/75 leading-relaxed">
                  {item}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* NO CONTRACT */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="section-rule"
                style={{ background: "#B8974A" }}
              />
              <span
                className="font-body text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "#B8974A" }}
              >
                Sin Compromiso
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              Sin ataduras. Sin contrato a largo plazo.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-xl">
              Nunca te voy a amarrar a un contrato de largo plazo. Si en algún momento sientes que no me he ganado tu confianza, nos separamos sin penalizaciones y sin rencores. Tú mantienes el control todo el tiempo.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* COMMUNICATION */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Comunicación</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              Siempre vas a saber cómo van las cosas.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              Si algo cambia, tú eres el primero en saberlo.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communicationItems.map((item, i) => (
              <RevealDiv
                key={item}
                delay={i * 100}
                className="border-l-2 border-[#B8974A] pl-8 py-6 bg-[#F8F5F0]"
              >
                <p className="font-body text-base text-[#1A1A18]/75 leading-relaxed">
                  {item}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 md:py-32 bg-[#1A1A18]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealDiv>
              <img
                src={HEADSHOT}
                alt="Mario Manzano"
                className="w-full max-w-sm mx-auto lg:mx-0 object-cover"
                style={{ aspectRatio: "3/4" }}
              />
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="section-rule"
                  style={{ background: "#B8974A" }}
                />
                <span
                  className="font-body text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: "#B8974A" }}
                >
                  Acerca de Mario
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8">
                Por qué trabajo diferente.
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed">
                No soy solo un agente que habla de decisiones inmobiliarias. Las
                he tomado con mi propio dinero en juego. He comprado y vendido
                propiedades, hecho renovaciones mientras vivía en las propiedades,
                y tengo rentas creciendo mi portafolio. Esa experiencia es lo que
                traigo a esta conversación.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">06. Próximos Pasos</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-10 max-w-2xl">
              Si estás listo para seguir adelante, hablemos.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:5126959255">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Llamar 512-695-9255
                  <ArrowRight size={14} />
                </span>
              </a>
              <a href="mailto:realtor@mariomanzano.com">
                <span className="btn-luxury inline-flex items-center gap-3">
                  Enviar un Correo
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
          </RevealDiv>
        </div>
      </section>

    </div>
  );
}
