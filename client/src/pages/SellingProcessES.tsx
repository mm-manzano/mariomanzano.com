/*
 * DESIGN: Quiet Luxury Editorial - Selling Process Page (Spanish)
 * Purpose: Post-decision clarity for sellers who have decided to sell
 * Sections: Hero, Before You List, Going Live, Offers & Negotiation, Under Contract to Closing, Seller Proceeds, CTA
 * Note: Does NOT repeat decision-making content from Homeowner Guide
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const PROCESS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-KJyHvXlKKhLSVPNiGNFDEe.webp";
const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-hero-bg-Zzemi4ArQkuF2Ww9f72uuW.webp";

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

export default function SellingProcessES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={PROCESS_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/65" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Proceso de Venta
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Lo que sucede<br />
              <em className="italic">después de decidir.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Un recorrido claro del proceso de venta. De la lista al cierre, aquí está lo que esperar.
            </p>
          </div>
        </div>
      </section>

      {/* ─── BEFORE YOU LIST ─────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">01. Antes de Listar</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Preparándose para salir al mercado.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Antes de que tu casa salga al mercado, tendremos una conversación detallada sobre tu propiedad, tu cronograma y lo que esperas lograr. Aquí es donde alineamos la estrategia y establecemos expectativas realistas.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Prepararé un análisis de mercado que muestre casas comparables, demanda actual de compradores y un rango de precio recomendado. Esto nos da un punto de partida claro basado en datos reales, no en conjeturas.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              También discutiremos cualquier preparación que tenga sentido—no renovaciones mayores, pero lo básico que ayuda a los compradores a ver tu casa claramente. El objetivo es posicionamiento, no perfección.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── GOING LIVE ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">02. Saliendo al Mercado</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              Tu casa en el mercado.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Una vez listada, tu casa aparece en todas las plataformas principales—MLS, Zillow, Realtor.com y más. Fotografía profesional, descripciones detalladas y precios estratégicos trabajan juntos para atraer a los compradores correctos.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Primeras Dos Semanas</h3>
              <p className="font-body text-base text-white/70 leading-relaxed">
                El período inicial de visualización es crítico. La mayoría del interés de los compradores ocurre temprano. Monitorearemos las visualizaciones, recopilaremos retroalimentación y ajustaremos la estrategia si es necesario.
              </p>
            </RevealDiv>
            <RevealDiv delay={150} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Actividad Continua</h3>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Te mantendré actualizado sobre visualizaciones, interés de compradores y retroalimentación del mercado. Sabrás qué está funcionando y qué podría necesitar ajuste.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── OFFERS & NEGOTIATION ─────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03. Ofertas y Negociación</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Cuando llegan las ofertas.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Una oferta no es solo un número. Incluye contingencias, cronograma, financiamiento y términos de inspección. Te guiaré a través de cada uno para que entiendas exactamente en qué estás de acuerdo.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Evaluaremos las ofertas estratégicamente. A veces el precio más alto no es el mejor trato si viene con contingencias riesgosas o un cronograma de cierre largo. Te ayudaré a ver el panorama completo.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Si se necesita negociación, la manejaremos profesionalmente. El objetivo es llegar a un acuerdo que funcione para ti—no ganar una batalla.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── UNDER CONTRACT TO CLOSING ─────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">04. Bajo Contrato hasta el Cierre</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              De la aceptación a las llaves.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Una vez aceptada una oferta, comienza el trabajo real. El prestamista del comprador ordenará una tasación e inspección. Podrías recibir solicitudes de reparaciones o créditos. Te ayudaré a navegar cada paso.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Período de Inspección</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                El comprador inspeccionará tu casa. Podrían surgir problemas. Decidiremos juntos qué abordar y qué negociar.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed text-sm">
                Cronograma típico: 7-10 días
              </p>
            </RevealDiv>
            <RevealDiv delay={150} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Tasación y Suscripción</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                El prestamista verificará el valor de tu casa y la situación financiera del comprador. Esto generalmente ocurre en paralelo con la inspección.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed text-sm">
                Cronograma típico: 10-14 días
              </p>
            </RevealDiv>
          </div>

          <RevealDiv delay={200} className="mt-8 border border-white/10 p-8">
            <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Recorrido Final y Cierre</h3>
            <p className="font-body text-base text-white/70 leading-relaxed mb-4">
              Unos días antes del cierre, el comprador hace un recorrido final para confirmar que la casa está en la condición acordada. Luego firmarás documentos de cierre y transferirás las llaves.
            </p>
            <p className="font-body text-base text-white/70 leading-relaxed text-sm">
              Cronograma típico: 30-45 días de contrato a cierre
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── SELLER PROCEEDS ─────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Ganancias del Vendedor</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Entendiendo tus ganancias netas.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-8">
              Tu precio de venta no es lo que llevas a casa. Hay costos involucrados: comisión de agente inmobiliario, seguro de título, impuestos sobre la propiedad, cuotas de HOA y cualquier reparación negociada después de la inspección.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Costos Típicos</h3>
              <ul className="font-body text-base text-[#1A1A18]/65 leading-relaxed space-y-2">
                <li>• Comisión de agente inmobiliario (típicamente 5-6%)</li>
                <li>• Seguro de título y costos de cierre</li>
                <li>• Impuestos sobre la propiedad (prorrateados)</li>
                <li>• Cuotas de transferencia de HOA (si aplica)</li>
                <li>• Créditos de reparación o concesiones</li>
              </ul>
            </RevealDiv>
            <RevealDiv delay={150} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Lo Que Recibes</h3>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Tus ganancias netas = Precio de Venta − Todos los Costos. Proporcionaré una estimación detallada antes de listar para que sepas exactamente qué esperar en el cierre.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
                ¿Listo para avanzar?<br />
                <em className="italic">Hablemos.</em>
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed mb-10 max-w-lg">
                Hablemos sobre tu situación específica y creemos un plan claro para tu venta.
              </p>
              <Link href="/es/contacto">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Inicia la Conversación
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
