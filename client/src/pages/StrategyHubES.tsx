/*
 * DESIGN: Quiet Luxury Editorial - Centro de Estrategia (Español)
 * FINAL: Meta tags, Open Graph, schema, educational copy in Spanish.
 * UPDATE: Schema description broadened. Geography removed from body copy
 *         and bottom CTA to match English version changes.
 * UPDATE: Matched to the English version. Search wording in title and intro, time claim set to
 *         30 seconds, Home Value card added, card order changed, FAQ section with FAQ schema.
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

const faqs = [
  {
    q: "¿Cuánto me quedaría al vender mi casa en Leander o Cedar Park?",
    a: "Lo que te queda es el precio de venta menos el saldo de tu hipoteca, la comisión del agente, los costos de cierre y cualquier reparación o preparación. La calculadora de ingresos netos te da un estimado rápido en unos 30 segundos. Si quieres un número preciso, puedo revisar contigo una hoja neta real en unos quince minutos.",
    href: "/es/net-sheet/",
    label: "Calcular Ingresos Netos",
  },
  {
    q: "¿Vale la pena remodelar mi casa antes de venderla?",
    a: "La mayoría de las remodelaciones no recuperan el 100 por ciento de lo que gastas. Depende de lo que arregles, cuánto cueste y lo que esperan los compradores en tu rango de precio. Corre tus números primero para saber si el trabajo agrega más de lo que cuesta.",
    href: "/es/remodel-vs-sell/",
    label: "Analizar Remodelar vs. Vender",
  },
  {
    q: "¿Debo vender mi casa o rentarla?",
    a: "Vender te da el dinero ahora y te quita el trabajo de ser arrendador. Rentar mantiene tu capital trabajando, pero tienes que lidiar con inquilinos, reparaciones y vacancias. En el área de Cedar Park y Leander, rentar suele ser más una estrategia de apreciación a largo plazo que una fuente fuerte de flujo de caja mensual.",
    href: "/es/sell-vs-rent/",
    label: "Comparar Vender vs. Rentar",
  },
  {
    q: "¿Cómo sé cuánto vale mi casa?",
    a: "Empieza con una estimación base para tener un rango aproximado. Después puedo comparar tu casa con ventas recientes cerca de ti para darte un número más cercano. Las estimaciones en línea son un punto de partida, no una respuesta final.",
    href: "/es/home-value/",
    label: "Obtener Estimación Base",
  },
];

export default function StrategyHubES() {
  useEffect(() => {
    setPageMeta(
      "Calculadoras Gratuitas para Vender tu Casa | Cedar Park y Leander",
      "Calculadoras gratuitas para propietarios en Cedar Park, Leander y el área de Austin. Calcula tus ingresos netos, compara vender o rentar y analiza si remodelar conviene.",
      "https://mariomanzano.com/es/strategy-hub/"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Calculadoras Gratuitas para Vender tu Casa",
        "url": "https://mariomanzano.com/es/strategy-hub/",
        "inLanguage": "es",
        "description": "Herramientas gratuitas para propietarios en el área de Austin. Compara vender vs alquilar, calcula ingresos netos y analiza el retorno de una remodelación antes de tomar cualquier decisión.",
        "author": {
          "@type": "RealEstateAgent",
          "name": "Mario Manzano",
          "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
        }
      },
      {
        "@type": "FAQPage",
        "inLanguage": "es",
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
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
          <p className="font-body text-xl text-[#1A1A18] font-medium leading-relaxed mb-6 max-w-2xl">
            Calculadoras gratuitas para propietarios en Cedar Park, Leander y Austin.
          </p>
          <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6 max-w-2xl">
            La mayoría de los propietarios toman la decisión financiera más grande de su vida sin ver los números de verdad primero. Para eso están estas herramientas.
          </p>
          <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12 max-w-2xl">
            Si estás pensando en vender, evaluar una renta o preguntándote si remodelar vale la pena, empieza aquí. Cada herramienta toma unos 30 segundos, no requiere registro y te da un panorama financiero claro antes de hablar con cualquier agente.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Remodelar vs Vender */}
          <RevealDiv delay={100}>
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

          {/* Hoja de Ingresos Netos */}
          <RevealDiv delay={200}>
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
          <RevealDiv delay={300}>
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

          {/* Valor de la Casa */}
          <RevealDiv delay={400}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-medium text-[#1A1A18] mb-4">
                ¿No sabes <span className="font-semibold">cuánto vale tu casa?</span>
              </h2>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6 flex-grow">
                Todas las demás herramientas empiezan con el valor de tu casa. Obtén primero una estimación base y después corre los números con un precio en el que puedas confiar.
              </p>
              <Link href="/es/home-value/">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Obtener Estimación Base
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>

        {/* Preguntas frecuentes */}
        <div className="mt-20 max-w-3xl">
          <RevealDiv>
            <h2 className="font-display text-3xl font-medium text-[#1A1A18] mb-8">
              Preguntas comunes de vendedores en Cedar Park y Leander
            </h2>
            <div className="space-y-8">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-display text-xl font-medium text-[#1A1A18] mb-2">{f.q}</h3>
                  <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-3">{f.a}</p>
                  <Link href={f.href}>
                    <span className="font-body text-base font-semibold text-[#1A1A18] underline underline-offset-4 inline-flex items-center gap-2 cursor-pointer">
                      {f.label}
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </RevealDiv>
        </div>

        {/* CTA inferior */}
        <RevealDiv delay={100} className="mt-20 text-center">
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
