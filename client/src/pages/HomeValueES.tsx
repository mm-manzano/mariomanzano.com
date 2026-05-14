/*
 * DESIGN: Quiet Luxury Editorial - Valor de la Casa (Español)
 * FINAL: Meta tags, Open Graph, schema, substantial educational copy in Spanish.
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
      "Obtén una estimación del valor de tu casa en Cedar Park y Leander TX. Luego descubre cuánto se vendería realmente tu propiedad en el mercado actual con una conversación real.",
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
            Los valores de las casas en Cedar Park y Leander han cambiado significativamente en los últimos años. Las estimaciones automáticas pueden ser un punto de partida útil, pero no toman en cuenta las condiciones específicas de tu casa, las mejoras realizadas ni cómo se compara con lo que está vendiendo actualmente en tu vecindario.
          </p>
        </div>

        {/* Contexto educativo antes de la herramienta */}
        <div className="mb-10 max-w-2xl">
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
            La estimación a continuación se basa en datos públicos y ventas comparables recientes en tu área. Es un punto de referencia razonable. Pero en un mercado como Cedar Park y Leander, donde la demanda de compradores, las tasas de interés y la oferta a nivel de vecindario pueden cambiar trimestre a trimestre, el número real frecuentemente se ve diferente a lo que produce un algoritmo.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
            Úsalo como punto de partida. Luego, si quieres saber cuánto se vendería realmente tu casa hoy y cuánto te quedarías después de los costos, eso es una conversación de quince minutos.
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

        {/* Aclaración */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p className="font-display text-xl md:text-2xl font-light text-[#1A1A18] mb-6">
            <em className="italic">Este es un punto de partida.</em>
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
            Las estimaciones automáticas no toman en cuenta la condición de tu casa, las actualizaciones realizadas ni cómo está posicionada frente a la competencia activa. En Cedar Park y Leander, una casa bien posicionada en buen estado puede venderse significativamente por encima de una estimación automática. Una casa desactualizada o en un sector más lento del mercado puede quedar por debajo.
          </p>
        </div>

        {/* Qué determina el valor */}
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">¿Qué determina realmente en cuánto se vende tu casa?</h2>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
            En el mercado de Cedar Park y Leander, la diferencia entre una buena venta y una excelente venta generalmente se reduce a tres cosas: preparación, precio y momento. Las herramientas automáticas pueden estimar el valor, pero no pueden decirte si tu casa debe salir al mercado en treinta días o en noventa, ni si una reducción estratégica de precio en el día diez generaría más ingresos netos que mantenerse firme en un número más alto.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
            La condición importa significativamente en este rango de precios. Los compradores en Cedar Park y Leander están comparando tu casa con otras opciones en tiempo real. Una casa que se presenta bien y tiene el precio correcto atrae ofertas competitivas. Una que está sobrevalorada o necesita trabajo visible se queda.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
            Si quieres una imagen real de cuánto vale tu casa y cuánto se vendería con la estrategia correcta de preparación y precio, eso es con lo que ayudo. Sin presión. Solo claridad.
          </p>
        </div>

        {/* Siguiente paso */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-[#1A1A18] text-white mb-12">
          <div>
            <h4 className="font-display text-xl font-light mb-2">Siguiente paso: Calcula tus ingresos netos</h4>
            <p className="font-body text-sm text-white/60">Descubre exactamente cuánto te quedarás después de los costos.</p>
          </div>
          <Link href="/es/net-sheet">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
              Ir a Ingresos Netos
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* CTA de contacto */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-4">¿Quieres un número real para tu casa específica?</h2>
          <p className="font-body text-base text-[#1A1A18]/65 mb-8 leading-relaxed">
            Trabajo con propietarios en Cedar Park y Leander que quieren entender cuánto vale realmente su casa antes de decidir cualquier cosa. Una conversación corta es todo lo que se necesita para tener una imagen más clara.
          </p>
          <Link href="/es/contacto">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
              Iniciar una Conversación
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
