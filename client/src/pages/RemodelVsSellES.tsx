/*
 * DESIGN: Quiet Luxury Editorial - Remodelar vs. Vender (Español)
 * Purpose: Helps homeowners analyze the financial impact of renovations before selling.
 * FINAL: Meta tags, Open Graph, schema, educational copy in Spanish.
 * UPDATE: Meta description and schema description broadened to Greater Austin.
 *         Geography removed from intro body paragraph.
 *         Educational section retains Cedar Park & Leander (local SEO content).
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, AlertCircle } from "lucide-react";

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
  setMeta("og:image", "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg", true);
}

export default function RemodelVsSellES() {
  const [currentValue, setCurrentValue] = useState<string>("");
  const [remodelCost, setRemodelCost] = useState<string>("");
  const [expectedIncrease, setExpectedIncrease] = useState<string>("");

  useEffect(() => {
    setPageMeta(
      "¿Vale la Pena Remodelar Antes de Vender? Calculadora Gratuita | Cedar Park y Leander TX",
      "Corre los números antes de decidir. Ingresa el valor de tu casa, el costo de remodelación y el aumento esperado para ver si renovar antes de vender realmente vale la pena. Herramienta gratuita para propietarios en el área de Austin.",
      "https://mariomanzano.com/es/remodel-vs-sell"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Calculadora de Remodelar vs. Vender",
    "url": "https://mariomanzano.com/es/remodel-vs-sell",
    "description": "Calculadora gratuita de remodelar vs vender para propietarios en el área de Austin. Descubre si tu remodelación aumentará lo suficiente tus ganancias netas como para justificar el costo antes de vender.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  const current = parseFloat(currentValue) || 0;
  const cost = parseFloat(remodelCost) || 0;
  const increase = parseFloat(expectedIncrease) || 0;

  const newValue = current * (1 + increase / 100);
  const netGain = newValue - current - cost;
  const valueAdded = newValue - current;
  const roi = cost === 0 ? 0 : (netGain / cost) * 100;

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);

  const formatPercentage = (num: number) =>
    new Intl.NumberFormat("en-US", { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num / 100);

  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "") { setter(""); }
    else {
      const cleanValue = value.startsWith("0") && value.length > 1 && value[1] !== "." ? value.substring(1) : value;
      setter(cleanValue);
    }
  };

  const getRoiClassification = (roiValue: number) => {
    if (roiValue >= 20) return "Retorno sólido";
    if (roiValue >= 10) return "Retorno moderado";
    if (roiValue >= 0) return "Retorno marginal";
    return "Retorno negativo";
  };

  const getStrategicTakeaway = (roiValue: number) => {
    if (roiValue >= 20) return "Esta remodelación muestra un retorno sólido con estos números. Dependiendo de tu plazo y el trabajo específico, puede valer la pena considerarla. Hablar con un contratista y revisar ventas comparables recientes te ayudará a confirmar el estimado.";
    if (roiValue >= 10) return "Esta remodelación muestra un retorno moderado. Puede tener sentido si mejora significativamente cómo se ve la casa para los compradores. El riesgo es que los estimados de aumento de valor suelen ser optimistas. Mejor enfocarse en actualizaciones funcionales y presentación neutra que en acabados de lujo.";
    if (roiValue >= 0) return "Esta remodelación produce un retorno limitado. En la mayoría de los casos, el tiempo, el costo y la molestia no valen la pena. Vender como está y fijar el precio correctamente muchas veces te deja más dinero en el bolsillo, más rápido.";
    return "Con estos números, es probable que la remodelación cueste más de lo que regresa en valor. Vender como está es probablemente la decisión financiera más sólida aquí.";
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container">
        <RevealDiv>
          <div className="flex items-center gap-3 mb-4">
            <span className="section-rule" />
            <span className="section-number">Herramienta Estratégica</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            ¿Vale la pena<br /><em className="italic">remodelar?</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-6 leading-relaxed">
            La mayoría de los propietarios sobreestiman lo que una remodelación va a recuperar. Las renovaciones de lujo rara vez recuperan el 100 por ciento de su costo al momento de vender. Las actualizaciones funcionales y la presentación neutra tienden a superar los acabados de alto nivel cuando se trata del comportamiento real de los compradores.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-12 leading-relaxed">
            Esta herramienta te ayuda a correr los números antes de comprometerte con cualquier trabajo. Ingresa el valor actual de tu casa, el costo proyectado de la remodelación y el aumento de valor esperado para ver si la inversión tiene sentido.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E8E0D5] shadow-sm">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-8 text-center">Detalles del Proyecto</h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Valor Actual de la Casa (Como Está)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input type="text" value={currentValue} onChange={handleInputChange(setCurrentValue)}
                      onFocus={(e) => e.target.value === "0" && setCurrentValue("")}
                      onBlur={(e) => e.target.value === "" && setCurrentValue("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Costo Estimado de Remodelación</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input type="text" value={remodelCost} onChange={handleInputChange(setRemodelCost)}
                      onFocus={(e) => e.target.value === "0" && setRemodelCost("")}
                      onBlur={(e) => e.target.value === "" && setRemodelCost("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Aumento de Valor Esperado (%)</label>
                  <div className="relative">
                    <input type="text" value={expectedIncrease} onChange={handleInputChange(setExpectedIncrease)}
                      onFocus={(e) => e.target.value === "0" && setExpectedIncrease("")}
                      onBlur={(e) => e.target.value === "" && setExpectedIncrease("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">%</span>
                  </div>
                  <p className="font-body text-xs text-[#1A1A18]/50 mt-2 leading-relaxed">
                    Rangos típicos: Actualizaciones cosméticas 3 a 7% | Cocina/baño 5 a 12% | Renovación completa 10 a 20%+
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F5F0] p-6 border border-[#E8E0D5] flex gap-4">
              <AlertCircle className="text-[#B8974A] shrink-0" size={20} />
              <p className="font-body text-xs text-[#1A1A18]/60 leading-relaxed">
                Nota del asesor: La mayoría de las remodelaciones de lujo rara vez recuperan el 100 por ciento de su costo al vender. Concéntrate en actualizaciones funcionales y presentación neutra para el mayor retorno. Si tienes dudas, precio bien la casa como está en lugar de gastar dinero persiguiendo un número más alto.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-8 md:p-12 text-white sticky top-32">
              <h2 className="font-display text-3xl font-light mb-12 border-b border-white/10 pb-6">Análisis de Retorno</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Valor Nuevo Proyectado</p>
                    <p className="font-display text-4xl font-light text-white">{formatCurrency(newValue)}</p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Inversión en Remodelación</p>
                    <p className="font-display text-4xl font-light text-white/60">{formatCurrency(cost)}</p>
                  </div>
                </div>
                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-4">Ganancia Neta Estimada Después de Remodelar</p>
                  <p className={`font-display text-5xl md:text-6xl font-light mb-2 ${netGain >= 0 ? "text-white" : "text-red-400"}`}>
                    {formatCurrency(netGain)}
                  </p>
                  <p className="font-body text-xs text-white/40 leading-relaxed mb-4">
                    Valor agregado: {formatCurrency(valueAdded)}<br />
                    Retorno sobre la remodelación: {formatPercentage(roi)}
                  </p>
                  <p className="font-body text-sm text-white/60">{getRoiClassification(roi)}</p>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/10">
                <h3 className="font-display text-xl font-light text-white mb-4">Qué Significa Esto</h3>
                <p className="font-body text-base text-white/70 leading-relaxed mb-8">{getStrategicTakeaway(roi)}</p>
                <Link href="/es/contacto">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] w-full justify-center cursor-pointer">
                    Revisemos Esto Juntos
                    <ArrowRight size={14} className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Educational section */}
        <div className="mt-20 max-w-3xl">
          <RevealDiv>
            <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">¿Qué retornan realmente las remodelaciones en Cedar Park y Leander?</h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
              En el área de Cedar Park y Leander, los compradores tienden a preferir casas limpias y listas para habitar sobre las que tienen renovaciones pesadas. Los compradores aquí suelen estar comparando varias opciones y son sensibles al precio. Una casa con el precio correcto como está frecuentemente supera a una que fue remodelada y cuyo precio subió para recuperar el costo.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
              Las actualizaciones que suelen mover la aguja son funcionales y cosméticas: pintura fresca, jardín limpio, accesorios actualizados y una presentación despejada. Las renovaciones completas de cocina o baño antes de vender rara vez valen la inversión, a menos que la casa esté muy desactualizada en comparación con su competencia directa.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
              Antes de gastar cualquier cosa, vale la pena revisar dónde está tu casa en relación con las ventas comparables actuales. Ese contexto cambia mucho los números de la remodelación.
            </p>
          </RevealDiv>
        </div>

        <div className="mt-20 pt-20 border-t border-[#E8E0D5]">
          <RevealDiv className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">¿No sabes cuánto vale tu casa como está?</h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 leading-relaxed">
              Obtén un estimado base primero para que los números de tu remodelación partan del número correcto.
            </p>
            <Link href="/es/home-value">
              <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                Obtener Estimado Base
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </div>
    </div>
  );
}
