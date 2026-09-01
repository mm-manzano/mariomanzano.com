/*
 * DESIGN: Quiet Luxury Editorial - Presentación para Vendedores
 * Private route: /es/presentacion-vendedores
 * Sections: Hero, Process & Timeline, Communication, About, Next Steps
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

const HEADSHOT =
  "/images/mario-manzano-austin-realtor-professional-headshot.JPG";

export default function ListingPresentationES() {
  useEffect(() => {
    document.title = "Estrategia para Vendedores | Mario Manzano";
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${name}"]`
      ) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("robots", "noindex, nofollow");
  }, []);

  const processSteps = [
    {
      number: "01",
      title: "Preparación",
      desc: "Recorrido de la propiedad, lista de preparación, reparaciones y orientación de presentación.",
    },
    {
      number: "02",
      title: "Fotografía y Marketing",
      desc: "Fotografía profesional con drone y descripción de la propiedad.",
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

  const communicationItems = [
    "Comunicación según su preferencia",
    "Retroalimentación después de las visitas cuando esté disponible",
    "Actualizaciones inmediatas sobre ofertas oficiales",
    "Orientación clara antes de tomar decisiones",
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F0]">

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
              Su Hogar.<br />
              <em className="italic">Su Decisión.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Un plan claro basado en su situación, no en una presentación de ventas.
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
              Si decide vender, así es como funciona.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              Cada paso tiene un propósito. Nada ocurre sin su aprobación.
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

      {/* COMMUNICATION */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">02. Comunicación</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              Siempre sabrá cómo van las cosas.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              Si algo cambia, usted será el primero en saberlo.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communicationItems.map((item, i) => (
              <RevealDiv
                key={item}
                delay={i * 100}
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
                Por qué trabajo de manera diferente.
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed">
                No soy solo un agente que habla de decisiones inmobiliarias. Las
                he tomado con mi propio dinero en juego. He comprado y vendido
                propiedades, operado un Airbnb, hecho renovaciones mientras
                vivía en las propiedades, tengo rentas creciendo mi portafolio.
                Esa experiencia es lo que traigo a esta conversación.
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
              <span className="section-number">03. Próximos Pasos</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-10 max-w-2xl">
              Si está listo para seguir adelante, hablemos sobre los próximos pasos.
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
