/*
 * DESIGN: Quiet Luxury Editorial - Valor de la Casa (Español)
 * UPDATED: Alineado con versión en inglés. Estimación reposicionada como punto
 *          de partida general, mensajería ampliada para todo tipo de propietario,
 *          jerarquía de CTAs actualizada (CMA primario, hoja neta secundaria).
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft } from "lucide-react";

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

export default function HomeValueES() {
  useEffect(() => {
    setPageMeta(
      "¿Cuánto Vale Mi Casa en Cedar Park o Leander TX? | Mario Manzano",
      "Obtén una estimación gratuita del valor de tu casa en Cedar Park y Leander TX. Descubre cuánto vale realmente tu propiedad hoy con un Análisis Comparativo de Mercado personalizado de un Realtor local en Austin.",
      "https://mariomanzano.com/es/home-value"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "¿Cuánto Vale Mi Casa?",
    "url": "https://mariomanzano.com/es/home-value",
    "description": "Obtén una estimación del valor de tu casa en Cedar Park y Leander TX. Mario Manzano ayuda a los propietarios a entender cuánto vale realmente su casa antes de tomar cualquier decisión.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "telephone": "+1-512-695-9255",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-24 pb-16 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container max-w-4xl">
        {/* Enlace de regreso */}
        <Link href="/es">
          <span className="inline-flex items-center gap-2 text-[#1A1A18]/40 hover:text-[#B8974A] transition-colors mb-8 cursor-pointer font-body text-sm uppercase tracking-widest">
            <ChevronLeft size={16} />
            Volver a Estrategia
          </span>
        </Link>

        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            ¿Cuánto vale<br />
            <em className="italic">realmente tu casa?</em>
          </h1>
          <p className="font-body text-base md:text-lg text-[#1A1A18]/60 max-w-2xl leading-relaxed">
            La estimación de abajo te da un punto de partida útil basado en datos disponibles del mercado y la propiedad. Como estas estimaciones automáticas pueden usar datos de un área geográfica más amplia, puede que no reflejen el valor exacto de tu casa en particular. Tampoco toman en cuenta el estado de tu propiedad, las mejoras que has hecho, el diseño u otras características específicas. Úsala para orientarte y luego sigue leyendo.
          </p>
        </div>

        {/* Herramienta */}
        <div className="bg-white p-4 md:p-8 shadow-sm border border-[#E8E0D5] min-h-[200px] flex flex-col items-center justify-center mb-12">
          <div className="w-full">
            <iframe
              style={{ width: "100%", height: "160px" }}
              src="https://mariomanzano.exprealty.com/sellembed.php"
              allowTransparency={true}
              frameBorder="0"
              title="Herramienta de Valoración de Casa"
            ></iframe>
          </div>
        </div>

        {/* Qué determina el valor */}
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">¿Qué determina realmente cuánto vale tu casa?</h2>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
            Las estimaciones automáticas son un buen punto de partida, pero trabajan con datos generales. Puede que no tomen en cuenta el estado específico de tu casa, las mejoras que has hecho, cómo se compara el diseño con casas similares, ni lo que está compitiendo actualmente en tu vecindario.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
            Un Análisis Comparativo de Mercado personalizado va más a fondo. Se enfoca en tu propiedad específica, las ventas comparables más relevantes, las condiciones actuales del mercado en tu área y los factores propios de tu casa que afectan el valor. Ya sea que estés revisando tu capital, pensando en un movimiento futuro o evaluando una mejora, eso te da el panorama más claro que puedes obtener sin una tasación formal.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
            Si quieres un número más preciso para tu casa en particular, para eso es un CMA personalizado.
          </p>
        </div>

        {/* CTA principal: CMA */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-4">¿Quieres un número más preciso para tu casa?</h2>
          <p className="font-body text-base text-[#1A1A18]/65 mb-8 leading-relaxed">
            Te puedo preparar un Análisis Comparativo de Mercado personalizado basado en tu propiedad y el mercado actual. Sin compromiso. Solo un panorama más claro de dónde está parada tu casa.
          </p>
          <Link href="/es/contacto">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
              Solicitar mi CMA personalizado
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* Hoja neta: recurso secundario */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-[#1A1A18] text-white mb-12">
          <div>
            <h4 className="font-display text-xl font-light mb-2">También útil: Calcula tus ingresos netos</h4>
            <p className="font-body text-sm text-white/60">Si estás pensando en vender, descubre cuánto te quedarás después de los costos.</p>
          </div>
          <Link href="/es/net-sheet">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
              Ir a Ingresos Netos
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
