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
      {/* PAGE HERO */}
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

      {/* BEFORE YOU LIST */}
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
              Antes de que tu casa salga al mercado, nos alinearemos en tu propiedad, tu cronograma y tus objetivos.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Prepararé un análisis de mercado con casas comparables, demanda actual y un rango de precio recomendado para que comencemos desde datos, no desde conjeturas.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              También cubriremos cualquier preparación que tenga sentido. No renovaciones mayores, solo lo que ayuda a los compradores a ver tu casa claramente.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Si aún estás decidiendo cuánto hacer antes de vender, la Guía para Propietarios desglosa esto más.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* GOING LIVE */}
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
              Una vez listada, tu casa aparece en plataformas principales como MLS, Zillow y Realtor.com. Fotos profesionales, presentación clara y precios estratégicos trabajan juntos para atraer a los compradores correctos.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Primeras Dos Semanas</h3>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Las primeras dos semanas son cuando tu casa recibe más atención. Aquí es donde vemos cómo responden los compradores y si se necesitan ajustes.
              </p>
            </RevealDiv>
            <RevealDiv delay={150} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Actividad Continua</h3>
              <p className="font-body text-base text-white/70 leading-relaxed">
                A medida que continúan las visualizaciones, te mantendré actualizado sobre la actividad de compradores, retroalimentación y cómo el mercado está respondiendo para que siempre sepas dónde están las cosas.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* OFFERS AND NEGOTIATION */}
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
              Una oferta es más que un número. Incluye términos, cronograma, financiamiento y condiciones de inspección. Te guiaré a través de cada parte para que entiendas exactamente en qué estás de acuerdo.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Evaluaremos las ofertas estratégicamente. A veces el precio más alto no es el mejor trato si viene con riesgo o un cronograma largo. Te ayudaré a ver el panorama completo antes de tomar una decisión.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Si se necesita negociación, la manejaremos profesionalmente. El objetivo es llegar a un acuerdo que funcione para ti.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* UNDER CONTRACT TO CLOSING */}
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
              Una vez aceptada una oferta, el proceso continúa con inspecciones, tasación y aprobación del prestamista. Podrías recibir solicitudes de reparaciones o créditos, y decidiremos cómo manejarlos.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Período de Inspección</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                El comprador inspeccionará tu casa. Problemas pueden surgir. Revisaremos todo y decidiremos qué abordar y qué negociar.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed text-sm">
                Cronograma típico: 7 a 10 días
              </p>
            </RevealDiv>
            <RevealDiv delay={150} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Tasación y Suscripción</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                El prestamista verifica el valor de tu casa y la posición financiera del comprador. Esto generalmente ocurre junto con el período de inspección.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed text-sm">
                Cronograma típico: 10 a 14 días
              </p>
            </RevealDiv>
          </div>

          <RevealDiv delay={200} className="mt-8 border border-white/10 p-8">
            <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Recorrido Final y Cierre</h3>
            <p className="font-body text-base text-white/70 leading-relaxed mb-4">
              Unos días antes del cierre, el comprador completa un recorrido final. Luego firmarás documentos y transferirás la propiedad.
            </p>
            <p className="font-body text-base text-white/70 leading-relaxed text-sm">
              Cronograma típico: 30 a 45 días de contrato a cierre
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* SELLER PROCEEDS */}
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
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Tu precio de venta no es lo que llevas a casa. Hay costos involucrados, incluyendo compensación del agente, costos de cierre, impuestos y cualquier reparación o crédito negociado.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Lo que te llevas depende de tu situación específica. El objetivo es entender tu ganancia neta antes de tomar cualquier decisión.
            </p>
          </RevealDiv>


        </div>
      </section>

      {/* CTA SECTION */}
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
