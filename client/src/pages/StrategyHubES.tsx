/*
 * DESIGN: Quiet Luxury Editorial - Centro de Estrategia (Español)
 * FINAL: Meta tags, Open Graph, schema, educational copy in Spanish.
 * UPDATE: Schema description broadened. Geography removed from body copy
 *         and bottom CTA to match English version changes.
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useLayoutEffect } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Above the fold: show right away with no fade, so the top of the page is never blank
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible", "no-fade");
      return;
    }
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
  return (
    <div ref={ref} className={`fade-in-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
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
  setMeta("og:image", "https://mariomanzano.com/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

export default function StrategyHubES() {
  useEffect(() => {
    setPageMeta(
      "Centro de Estrategia | Propietarios en Cedar Park y Leander",
      "Compara tus opciones reales antes de decidir. Calcula tus ingresos netos, compara vender o rentar y analiza si remodelar conviene. Herramientas gratuitas.",
      "https://mariomanzano.com/es/strategy-hub/"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Centro de Estrategia para Propietarios",
    "url": "https://mariomanzano.com/es/strategy-hub/",
    "inLanguage": "es",
    "description": "Herramientas gratuitas para propietarios en el área de Austin. Compara vender vs alquilar, calcula ingresos netos y analiza el retorno de una remodelación antes de tomar cualquier decisión.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container">
        <RevealDiv>
          <div className="flex items-center gap-3 mb-4">
            <span className="section-rule" />
            <span className="section-number">01. Tu Estrategia</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-[#1A1A18] mb-6">
            Empieza con los números.<br />
            <span className="font-semibold">Decide con claridad.</span>
          </h1>
          <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6 max-w-2xl">
            La mayoría de los propietarios toman la decisión financiera más grande de su vida sin ver los números de verdad primero. Para eso están estas herramientas.
          </p>
          <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12 max-w-2xl">
            Si estás pensando en vender, evaluar una renta o preguntándote si remodelar vale la pena, empieza aquí. Cada herramienta toma unos dos minutos y te da un panorama financiero claro antes de hablar con cualquier agente.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Hoja de Ingresos Netos */}
          <RevealDiv delay={100}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-medium text-[#1A1A18] mb-4">
                Mira con qué <span className="font-semibold">realmente</span> te quedarías.
              </h2>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6 flex-grow">
                El precio de venta no es lo que te llevas a casa. Después de la comisión, los costos de cierre y lo que queda de tu hipoteca, el número real puede verse muy diferente. Esta calculadora te lo muestra antes de que firmes nada.
              </p>
              <Link href="/es/net-sheet/">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Calcular Ingresos Netos
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>

          {/* Vender vs Alquilar */}
          <RevealDiv delay={200}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-medium text-[#1A1A18] mb-4">
                ¿Conviene más <span className="font-semibold">vender o rentar</span> tu casa?
              </h2>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6 flex-grow">
                Vender te da el dinero ahora. Rentar mantiene tu capital trabajando a largo plazo. Esta herramienta compara los dos caminos con tus números reales para que veas cuál te conviene más según tu situación y tu plazo.
              </p>
              <Link href="/es/sell-vs-rent/">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Comparar Vender vs. Rentar
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>

          {/* Remodelar vs Vender */}
          <RevealDiv delay={300}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-medium text-[#1A1A18] mb-4">
                ¿Vale la pena <span className="font-semibold">remodelar</span> antes de vender?
              </h2>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6 flex-grow">
                La mayoría de las renovaciones no recuperan lo que cuestan al momento de vender. Esta herramienta compara lo que gastarías contra lo que podrías ganar para que decidas si remodelar tiene sentido o si vender como está te deja más dinero en el bolsillo.
              </p>
              <Link href="/es/remodel-vs-sell/">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Analizar Remodelar vs. Vender
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>

        {/* CTA inferior */}
        <RevealDiv delay={400} className="mt-20 text-center">
          <h2 className="font-display text-3xl font-medium text-[#1A1A18] mb-4">
            ¿Quieres que alguien revise los números contigo?
          </h2>
          <p className="font-body text-lg text-[#2B2B2B] max-w-xl mx-auto leading-relaxed mb-8">
            Las herramientas te dan un punto de partida. Una conversación real te da una estrategia. Si quieres entender lo que significan tus números, escríbeme.
          </p>
          <Link href="/es/contacto/">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] inline-flex items-center gap-3 cursor-pointer">
              Iniciar una Conversación
              <ArrowRight size={14} />
            </span>
          </Link>
        </RevealDiv>
      </div>
    </div>
  );
}
