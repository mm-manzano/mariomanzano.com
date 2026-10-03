/*
 * DESIGN: Quiet Luxury Editorial - About Page (Spanish)
 * Goal: Personal, real, based on lived experience
 * Sections: Intro, How It Started, Real Experience, Approach, Family, How I Work, Close
 * COPY UPDATE: Natural Spanish phrasing, consistent principles with English version,
 *              minor improvements throughout for clarity and voice consistency.
 *              Removed Dave Ramsey/debt/BiggerPockets from Section 1, Airbnb story
 *              and DSCR detail from Section 2, kids' specifics from Section 4.
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const MARIO_HEADSHOT = "/images/mario-manzano-austin-realtor-professional-headshot.JPG";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`fade-in-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
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
  setMeta("og:image", "https://mariomanzano.com/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

export default function AboutES() {
  useEffect(() => {
    setPageMeta(
      "Acerca de Mario Manzano | Agente de Bienes Raíces en Leander TX",
      "Mario Manzano es un REALTOR® licenciado y estratega de ventas en Leander TX. Conoce su historia, su experiencia en inversiones y su enfoque para ayudar a propietarios a tomar decisiones claras.",
      "https://mariomanzano.com/es/acerca/"
    );
  }, []);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mario Manzano",
    "jobTitle": "REALTOR® y Estratega de Ventas",
    "url": "https://mariomanzano.com/es/acerca",
    "image": "/images/mario-manzano-austin-realtor-professional-headshot.JPG",
    "telephone": "+1-512-695-9255",
    "email": "realtor@mariomanzano.com",
    "address": { "@type": "PostalAddress", "addressLocality": "Leander", "addressRegion": "TX", "addressCountry": "US" },
    "worksFor": { "@type": "RealEstateAgent", "name": "eXp Realty" },
    "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"],
    "sameAs": ["https://www.instagram.com/mariomanzanoatx", "https://www.tiktok.com/@mariomanzanoatx"]
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      {/* SECTION 1: INTRO */}
      <section className="bg-[#1A1A18] pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#C9A85C]">
                Acerca de Mario
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-medium text-white leading-tight mb-6">
              El Asesor<br />
              <span className="font-semibold">Detrás de la Estrategia.</span>
            </h1>
            <p className="font-body text-lg text-white/90 max-w-lg leading-relaxed">
              Un REALTOR® licenciado que cree que el mejor consejo inmobiliario a veces significa decirte que no vendas.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT STARTED */}
      <section className="py-16 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <RevealDiv>
              <div className="relative">
                <div className="overflow-hidden bg-[#E5E5E5]">
                  <img
                    src={MARIO_HEADSHOT}
                    alt="Mario Manzano"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01. Cómo Empezó</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-[#1A1A18] mb-6">
                De aprender sobre el dinero<br />
                <span className="font-semibold">a los bienes raíces.</span>
              </h2>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
                Me puse serio con el dinero y empecé a investigar cómo la gente realmente construye riqueza. Todo seguía apuntando hacia los bienes raíces.
              </p>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
                Pasé años aprendiendo cómo funciona la inversión inmobiliaria, obtuve mi licencia como REALTOR® y empecé a construir mi propio portafolio.
              </p>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                Los bienes raíces siempre han sido parte de mi vida. Mis padres y hermanos son todos propietarios de inmuebles. Nunca fue solo teoría para mí.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 3: REAL EXPERIENCE */}
      <section className="py-16 md:py-28 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#C9A85C] text-[#C9A85C]">02. Experiencia Real</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-12 max-w-2xl">
              He vivido en carne propia<br />
              <span className="font-semibold">estas decisiones.</span>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 max-w-4xl items-start">
            <RevealDiv delay={100}>
              <p className="font-body text-lg text-white/90 leading-relaxed mb-6">
                No aprendí bienes raíces solo de cursos. He tenido que tomar estas decisiones yo mismo.
              </p>
              <p className="font-body text-lg text-white/90 leading-relaxed mb-6">
                He comprado y vendido propiedades, conseguido negocios fuera del mercado, vendido terrenos, hecho renovaciones viviendo en la propiedad, tenido alquileres y sido propietario durante casi una década. Esa experiencia cambia cómo veo cada propiedad y cada decisión.
              </p>
            </RevealDiv>

            <RevealDiv delay={200}>
              <p className="font-body text-lg text-white/90 leading-relaxed mb-6">
                Mi esposa y yo tenemos buen ojo para el diseño. Eso se refleja en cómo ayudamos a los vendedores a preparar y presentar sus casas. Desde la distribución y el flujo hasta los detalles finales que hacen que un comprador sienta algo al entrar.
              </p>
              <p className="font-body text-lg text-white/90 leading-relaxed">
                Fueron decisiones reales con consecuencias reales. El tipo que no se olvida, y el tipo que cambia cómo guías a otros.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 4: APPROACH */}
      <section className="py-16 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03. Mi Enfoque</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-[#1A1A18] mb-12 max-w-2xl">
              Vender no siempre es<br />
              <span className="font-semibold">la mejor opción.</span>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl">
            <RevealDiv delay={100}>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6">
                La mayoría de las personas se sienten presionadas a tomar una decisión rápida sobre su casa. No saben cuáles son sus opciones. No tienen números claros. Entonces actúan de prisa.
              </p>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                Ayudo a las personas a pensar bien sus decisiones en lugar de empujarlas. Conservar puede crear más valor que vender. Alquilar puede tener más sentido que vender. Mejorar la propiedad primero puede cambiarlo todo.
              </p>
            </RevealDiv>

            <RevealDiv delay={200}>
              <div className="border-l-2 border-[#B8974A] pl-6">
                <p className="font-display text-xl font-medium text-[#1A1A18] leading-relaxed mb-4">
                  El mejor consejo que puedo dar a veces es esperar. O conservar. O mejorar la propiedad primero. Lo que tenga sentido para tu situación.
                </p>
                <p className="font-body text-lg text-[#2B2B2B]">Mario Manzano</p>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAMILY */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">04. Familia</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-[#1A1A18] mb-12 max-w-2xl">
              Casado con<br />
              <span className="font-semibold">dos hijos.</span>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-4xl">
            <RevealDiv delay={100}>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                Estoy casado con mi amor de la preparatoria. Tenemos dos hijos y ahora somos nido vacío.
              </p>
            </RevealDiv>

            <RevealDiv delay={200} className="-mt-3 md:mt-0">
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                Los bienes raíces son parte de la vida de nuestra familia, no solo mi trabajo.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW I WORK */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Cómo Trabajo</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-[#1A1A18] mb-12 max-w-2xl">
              Tres principios que<br />
              <span className="font-semibold">guían todo lo que hago.</span>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <RevealDiv delay={100}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#B8974A] text-[#1A1A18] font-display text-lg font-medium">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-[#1A1A18] mb-2">Claridad Antes de Cualquier Cosa</h3>
                  <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                    Antes de hablar de cualquier otra cosa, entiendes tu situación. Tu capital, tu mercado, tu plazo. La claridad siempre va primero.
                  </p>
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#B8974A] text-[#1A1A18] font-display text-lg font-medium">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-[#1A1A18] mb-2">Las Compensaciones Explicadas</h3>
                  <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                    Cada opción tiene compensaciones. Te ayudo a verlas con claridad, el lado financiero, el lado práctico, el momento. Tú decides.
                  </p>
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={200}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#B8974A] text-[#1A1A18] font-display text-lg font-medium">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-[#1A1A18] mb-2">Decisiones Basadas en Números Reales</h3>
                  <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                    Tu decisión debe basarse en información sólida. Ventas comparables, tasas de absorción del mercado, demanda de compradores. Eso te da una base realista para actuar.
                  </p>
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 7: CREDENTIALS */}
      <section className="py-20 md:py-32 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#C9A85C] text-[#C9A85C]">06. Credenciales</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-10 max-w-2xl">
              Experiencia<br />
              <span className="font-semibold">comprobable.</span>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {[
              {
                title: "REALTOR® Licenciado",
                body: "Miembro activo en buen estado con la Asociación Nacional de REALTORS®.",
              },
              {
                title: "Asesor en Estrategia de Precios (PSA)",
                body: "Formación especializada en estrategia de precios, análisis de mercado y toma de decisiones basada en datos para vendedores.",
              },
              {
                title: "Miembro, Asociación de REALTORS® de Austin (ABOR)",
                body: "Sirviendo el área metropolitana de Austin con conocimiento profundo del mercado local.",
              },
              {
                title: "Miembro, Asociación Nacional de REALTORS® (NAR)",
                body: "Parte de la organización profesional inmobiliaria más grande de Estados Unidos.",
              },
            ].map((cred, i) => (
              <RevealDiv key={cred.title} delay={i * 100} className="border-t border-white/10 pt-6">
                <h3 className="font-display text-lg font-medium text-white mb-2">{cred.title}</h3>
                <p className="font-body text-lg text-white/90 leading-relaxed">{cred.body}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CLOSE */}
      <section className="bg-[#1A1A18] pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-6xl font-medium text-white mb-6 max-w-2xl mx-auto">
              Hablemos de tu situación.
            </h2>
            <p className="font-body text-lg text-white/90 mb-10 max-w-lg mx-auto">
              Una conversación donde revisamos tu casa, tus opciones y lo que realmente tiene sentido para tu situación. Sin presión, solo claridad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={getCTALink("start-conversation", "es")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] inline-flex items-center gap-3">
                  Iniciar una Conversación
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
