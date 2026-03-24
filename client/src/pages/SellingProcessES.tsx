/*
 * DESIGN: Quiet Luxury Editorial - Selling Process Page (Spanish)
 * Purpose: Post-decision clarity for sellers who have decided to sell
 * Sections: Hero, Before You List, Going Live, Offers & Negotiation, Under Contract to Closing, Seller Proceeds, CTA
 */

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const PROCESS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-KJyHvXlKKhLSVPNiGNFDEe.webp";

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
              Un recorrido claro del proceso de venta. Desde la lista hasta el cierre, aquí está lo que puedes esperar.
            </p>
          </div>
        </div>
      </section>

      {/* ANTES DE LISTAR */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <div className="flex flex-col">
                <span className="section-number">01. Antes de Listar</span>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/40">Before You List</span>
              </div>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Preparándose para salir al mercado.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl mb-6">
              Antes de que tu hogar salga al mercado, nos alinearemos en tu propiedad, tu cronograma y tus objetivos.
            </p>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl mb-6">
              Prepararé un análisis de mercado con casas comparables, demanda actual y un rango de precio recomendado para que comencemos con datos, no con adivinanzas.
            </p>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl mb-6">
              También cubriremos cualquier preparación que tenga sentido. No renovaciones mayores, solo lo que ayuda a los compradores a ver tu hogar claramente.
            </p>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl">
              Si aún estás decidiendo cuánto hacer antes de vender, la Guía para Propietarios lo desgrana más.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* SALIENDO AL MERCADO */}
      <section className="py-20 md:py-28 bg-dark-bg">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <div className="flex flex-col">
                <span className="section-number" style={{ color: "#D4B878" }}>02. Saliendo al Mercado</span>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40">Going Live</span>
              </div>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Tu hogar en el mercado.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl mb-8">
              Una vez listado, tu hogar aparece en plataformas principales como MLS, Zillow y Realtor.com. Fotos profesionales, presentación clara y precio trabajan juntos para atraer a los compradores correctos.
            </p>

            {/* Subsection: Primeras Dos Semanas */}
            <div className="mb-8">
              <h3 className="font-display text-2xl md:text-3xl font-light text-[#1A1A18] mb-4">
                Primeras Dos Semanas
              </h3>
              <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl">
                Las primeras dos semanas son cuando tu hogar recibe más atención. Aquí es donde vemos cómo responden los compradores y si se necesitan ajustes.
              </p>
            </div>

            {/* Subsection: Actividad Continua */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-light text-[#1A1A18] mb-4">
                Actividad Continua
              </h3>
              <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl">
                Conforme continúan las visitas, te mantendré actualizado sobre la actividad de compradores, retroalimentación y cómo el mercado está respondiendo para que siempre sepas dónde estamos.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* OFERTAS Y NEGOCIACIÓN */}
      <section className="py-20 md:py-28 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <div className="flex flex-col">
                <span className="section-number">03. Ofertas y Negociación</span>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/40">Offers and Negotiation</span>
              </div>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Cuando llegan las ofertas.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl mb-6">
              Una oferta es más que un número. Incluye términos, cronograma, financiamiento y condiciones de inspección. Te guiaré a través de cada parte para que entiendas a qué te estás comprometiendo.
            </p>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl mb-6">
              Evaluaremos las ofertas estratégicamente. A veces el precio más alto no es el mejor trato si viene con riesgo o un cronograma largo. Te ayudaré a ver el panorama completo antes de tomar una decisión.
            </p>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl">
              Si se necesita negociación, la manejaremos profesionalmente. El objetivo es llegar a un acuerdo que funcione para ti.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* BAJO CONTRATO HASTA EL CIERRE */}
      <section className="py-20 md:py-28 bg-dark-bg">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <div className="flex flex-col">
                <span className="section-number" style={{ color: "#D4B878" }}>04. Bajo Contrato hasta el Cierre</span>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40">Under Contract to Closing</span>
              </div>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              De la aceptación a las llaves.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl mb-8">
              Una vez que se acepta una oferta, el proceso continúa con inspecciones, tasación y aprobación del prestamista. Puedes recibir solicitudes de reparaciones o créditos, y decidiremos cómo manejarlos.
            </p>

            {/* Timeline Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Período de Inspección */}
              <div>
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">
                  Período de Inspección
                </h3>
                <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed mb-4">
                  El comprador inspeccionará tu hogar. Pueden surgir problemas. Revisaremos todo y decidiremos qué abordar y qué negociar.
                </p>
                <p className="font-body text-sm text-[#B8974A] font-semibold">
                  Cronograma típico: 7 a 10 días
                </p>
              </div>

              {/* Tasación y Suscripción */}
              <div>
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">
                  Tasación y Suscripción
                </h3>
                <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed mb-4">
                  El prestamista verifica el valor del hogar y la posición financiera del comprador. Esto generalmente ocurre junto con el período de inspección.
                </p>
                <p className="font-body text-sm text-[#B8974A] font-semibold">
                  Cronograma típico: 10 a 14 días
                </p>
              </div>

              {/* Cierre */}
              <div>
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">
                  Cierre
                </h3>
                <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed mb-4">
                  Unos días antes del cierre, el comprador completa una caminata final. Luego firmarás documentos y transferirás la propiedad.
                </p>
                <p className="font-body text-sm text-[#B8974A] font-semibold">
                  Cronograma típico: 30 a 45 días desde contrato hasta cierre
                </p>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* GANANCIAS DEL VENDEDOR */}
      <section className="py-20 md:py-28 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <div className="flex flex-col">
                <span className="section-number">05. Ganancias del Vendedor</span>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/40">Seller Proceeds</span>
              </div>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Entendiendo tus ganancias netas.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl mb-6">
              Tu precio de venta no es lo que te llevas a casa. Hay costos involucrados, incluyendo compensación del agente, costos de cierre, impuestos y cualquier reparación o crédito negociado.
            </p>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed max-w-2xl">
              Lo que te llevas depende de tu situación específica. El objetivo es entender tu neto antes de tomar cualquier decisión.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4">
              Listo para avanzar
              <br />
              <em className="italic">adelante?</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/80 leading-relaxed mb-8">
              Hablemos sobre tu situación y creemos un plan claro para tu venta.
            </p>
            <a
              href="#get-plan"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#B8974A] text-white font-body text-sm font-semibold tracking-wide hover:bg-[#9A7D3A] transition-colors"
            >
              Reservar una Llamada
              <ArrowRight size={16} />
            </a>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
