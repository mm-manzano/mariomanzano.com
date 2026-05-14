/*
 * DESIGN: Quiet Luxury Editorial - Calculadora de Ingresos Netos (Español)
 * FINAL: Meta tags, Open Graph, schema, educational copy in Spanish.
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

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

export default function NetSheetES() {
  const [salePrice, setSalePrice] = useState<string>("0");
  const [mortgageBalance, setMortgageBalance] = useState<string>("0");
  const [commission, setCommission] = useState<string>("6");
  const [closingCosts, setClosingCosts] = useState<string>("1");
  const [repairs, setRepairs] = useState<string>("0");

  useEffect(() => {
    setPageMeta(
      "Calculadora de Ingresos Netos | Cedar Park y Leander TX | Mario Manzano",
      "Descubre cuánto te quedarás realmente después de vender tu casa en Cedar Park o Leander TX. Calcula tus ingresos netos después de comisión, costos de cierre y saldo hipotecario. Herramienta gratuita.",
      "https://mariomanzano.com/es/net-sheet"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Calculadora de Ingresos Netos",
    "url": "https://mariomanzano.com/es/net-sheet",
    "description": "Calculadora gratuita para propietarios en Cedar Park y Leander TX. Ve exactamente cuánto te quedarás después de comisión, costos de cierre y pago de hipoteca antes de decidir vender.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  const price = parseFloat(salePrice) || 0;
  const mortgage = parseFloat(mortgageBalance) || 0;
  const commRate = parseFloat(commission) || 0;
  const closeRate = parseFloat(closingCosts) || 0;
  const repairCost = parseFloat(repairs) || 0;

  const commissionCost = price * (commRate / 100);
  const closingCostAmount = price * (closeRate / 100);
  const totalCosts = commissionCost + closingCostAmount + repairCost;
  const netProceeds = price - mortgage - totalCosts;

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);

  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "") { setter(""); }
    else {
      const cleanValue = value.startsWith("0") && value.length > 1 && value[1] !== "." ? value.substring(1) : value;
      setter(cleanValue);
    }
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
            Calcula tus<br /><em className="italic">ingresos netos.</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-6 leading-relaxed">
            El precio de venta no es lo que te llevas. Una vez que descuentas la comisión del agente, los costos de cierre, las reparaciones y el saldo pendiente de tu hipoteca, el número que llega a tu cuenta puede verse muy diferente al precio del contrato.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-12 leading-relaxed">
            Esta herramienta te da una estimación realista para propietarios en Cedar Park y Leander. No sustituye una conversación real, pero te da una base sólida antes de tomar cualquier decisión.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Entradas */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E8E0D5] shadow-sm">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-8 text-center">Detalles de la Venta</h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Precio de Venta Estimado</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input type="text" value={salePrice} onChange={handleInputChange(setSalePrice)}
                      onFocus={(e) => e.target.value === "0" && setSalePrice("")}
                      onBlur={(e) => e.target.value === "" && setSalePrice("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Saldo de Hipoteca</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input type="text" value={mortgageBalance} onChange={handleInputChange(setMortgageBalance)}
                      onFocus={(e) => e.target.value === "0" && setMortgageBalance("")}
                      onBlur={(e) => e.target.value === "" && setMortgageBalance("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Comisión (%)</label>
                    <input type="text" value={commission} onChange={handleInputChange(setCommission)}
                      onFocus={(e) => e.target.value === "0" && setCommission("")}
                      onBlur={(e) => e.target.value === "" && setCommission("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Costos de Cierre (%)</label>
                    <input type="text" value={closingCosts} onChange={handleInputChange(setClosingCosts)}
                      onFocus={(e) => e.target.value === "0" && setClosingCosts("")}
                      onBlur={(e) => e.target.value === "" && setClosingCosts("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Reparaciones / Costos de Preparación</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input type="text" value={repairs} onChange={handleInputChange(setRepairs)}
                      onFocus={(e) => e.target.value === "0" && setRepairs("")}
                      onBlur={(e) => e.target.value === "" && setRepairs("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-8 md:p-12 text-white sticky top-32">
              <h2 className="font-display text-3xl font-light mb-12 border-b border-white/10 pb-6">Estimado Neto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Costo de Comisión</p>
                    <p className="font-display text-3xl font-light text-white/60">{formatCurrency(commissionCost)}</p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Costos de Cierre</p>
                    <p className="font-display text-3xl font-light text-white/60">{formatCurrency(closingCostAmount)}</p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Total de Costos de Venta</p>
                    <p className="font-display text-3xl font-light text-white/60">{formatCurrency(totalCosts)}</p>
                  </div>
                </div>
                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-4">Ingresos Netos Estimados</p>
                  <p className={`font-display text-5xl md:text-6xl font-light mb-4 ${netProceeds >= 0 ? "text-white" : "text-red-400"}`}>
                    {formatCurrency(netProceeds)}
                  </p>
                  <p className="font-body text-xs text-white/40 leading-relaxed">
                    Esta es la cantidad estimada que recibirás después de pagar tu hipoteca y todos los costos de la transacción.
                  </p>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/10">
                <Link href="/es/contacto">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] w-full justify-center cursor-pointer">
                    Obtener una Hoja Neta Precisa
                    <ArrowRight size={14} className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sección educativa */}
        <div className="mt-20 max-w-3xl">
          <RevealDiv>
            <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">¿Qué te dice realmente una hoja de ingresos netos?</h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
              Una hoja de ingresos netos es el documento que muestra cuánto te quedas después de la venta, no cuánto se vende tu casa. En Cedar Park y Leander, los vendedores frecuentemente se sorprenden de cuánto reducen sus ingresos los costos de la transacción. La comisión, los honorarios de título, los impuestos y cualquier costo de reparación o preparación se descuentan del precio de venta.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
              Esta estimación es un punto de partida. No incluye los impuestos a la propiedad prorrateados al cierre, las tarifas de transferencia de HOA ni las concesiones al comprador que puedas negociar. Una hoja neta real de una compañía de título será más precisa.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
              Si quieres revisar una hoja neta real basada en tu casa y situación específica, eso es algo con lo que puedo ayudarte. Toma unos quince minutos y te da un panorama mucho más claro antes de tomar cualquier decisión.
            </p>
          </RevealDiv>
        </div>

        <div className="mt-20 pt-20 border-t border-[#E8E0D5]">
          <RevealDiv className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">¿No sabes cuánto vale tu casa?</h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 leading-relaxed">
              Estas estimaciones usan el precio de venta que tú ingresas. Si quieres un punto de referencia antes de correr los números, obtén primero una estimación del valor de tu casa.
            </p>
            <Link href="/es/home-value">
              <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                Obtener Estimación Base
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </div>
    </div>
  );
}
