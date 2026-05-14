/*
 * DESIGN: Quiet Luxury Editorial - Centro de Estrategia (Español)
 * FINAL: Meta tags, Open Graph, schema, educational copy in Spanish.
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

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
  setMeta("og:image", "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg", true);
}

export default function StrategyHubES() {
  useEffect(() => {
    setPageMeta(
      "Centro de Estrategia para Propietarios | Cedar Park y Leander TX | Mario Manzano",
      "Compara tus opciones reales antes de decidir cualquier cosa. Calcula tus ingresos netos, compara vender vs alquilar y analiza si remodelar tiene sentido financiero. Herramientas gratuitas.",
      "https://mariomanzano.com/es/strategy-hub"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Centro de Estrategia para Propietarios",
    "url": "https://mariomanzano.com/es/strategy-hub",
    "description": "Herramientas gratuitas para propietarios en Cedar Park y Leander TX. Compara vender vs alquilar, calcula ingresos netos y analiza el retorno de una remodelación antes de tomar cualquier decisión.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] py-20 md:py-32">
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
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
            Empieza con los números.<br />
            <em className="italic">Decide con claridad.</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-6 max-w-2xl">
            La mayoría de los propietarios en Cedar Park y Leander toman su decisión financiera más importante sin revisar los números reales primero. Estas herramientas están diseñadas para cambiar eso.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12 max-w-2xl">
            Ya sea que estés considerando vender, evaluando un alquiler o preguntándote si una remodelación tiene sentido, empieza aquí. Cada herramienta toma unos dos minutos y te da un panorama financiero claro antes de cualquier conversación con un agente.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Hoja de Ingresos Netos */}
          <RevealDiv delay={100}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                Mira con qué <em className="italic">realmente</em> te quedarías.
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                El precio de venta no es lo que te llevas. Después de la comisión, los costos de cierre y el saldo pendiente de tu hipoteca, tus ingresos netos pueden verse muy diferentes al número en el contrato. Esta calculadora te muestra el número real antes de que te comprometas con cualquier cosa.
              </p>
              <Link href="/es/net-sheet">
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
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                ¿Deberías <em className="italic">vender o alquilar</em> tu casa?
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                Vender te da liquidez ahora. Alquilar mantiene tu capital trabajando con el tiempo. Esta herramienta compara ambos caminos lado a lado para que veas cuál sale adelante financieramente según tus números y tu plazo específicos.
              </p>
              <Link href="/es/sell-vs-rent">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Comparar Vender vs. Alquilar
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>

          {/* Remodelar vs Vender */}
          <RevealDiv delay={300}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                ¿Vale la pena <em className="italic">remodelar</em> antes de vender?
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                La mayoría de las renovaciones no recuperan el 100 por ciento de su costo al revender. Esta herramienta analiza tu inversión en la remodelación frente al aumento esperado en valor para que decidas si vale la pena o si vender tal cual te deja más dinero en el bolsillo.
              </p>
              <Link href="/es/remodel-vs-sell">
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
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-4">
            ¿Quieres que alguien revise los números contigo?
          </h2>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-xl mx-auto leading-relaxed mb-8">
            Las herramientas te dan un punto de partida. Una conversación real te da una estrategia. Si eres propietario en Cedar Park o Leander y quieres entender qué significan realmente tus números, contáctame.
          </p>
          <Link href="/es/contacto">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
              Iniciar una Conversación
              <ArrowRight size={14} />
            </span>
          </Link>
        </RevealDiv>
      </div>
    </div>
  );
}
