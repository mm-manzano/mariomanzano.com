/*
 * DESIGN: Quiet Luxury Editorial - Home Value Page (EDUCATIONAL ONLY - SPANISH)
 * Goal: Help homeowners understand home valuation - NO LEAD CAPTURE
 * Sections: Hero, Educational Content
 */

import { useEffect, useRef } from "react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-4NeoK6eSrnasPK9gSeTzGq.webp";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.15 }
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

export default function HomeValueES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/75" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Comprendiendo el Valor
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Comprende qué podría<br />
              <em className="italic">valer tu hogar</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Antes de tomar una decisión, es útil entender qué es realista en el mercado actual.
            </p>
          </div>
        </div>
      </section>

      {/* ─── EDUCATIONAL CONTENT ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">Cómo Pensar Sobre el Valor</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-10 max-w-2xl">
              No hay un número fijo.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <RevealDiv delay={100}>
              <p className="font-body text-base md:text-lg text-[#1A1A18]/70 leading-relaxed mb-8">
                Lo que una casa puede vender depende de la propiedad, el vecindario y cómo se posiciona.
              </p>
              <p className="font-body text-base md:text-lg text-[#1A1A18]/70 leading-relaxed mb-8">
                La mayoría de las estimaciones en línea se pierden esto porque no tienen en cuenta la condición, las actualizaciones o el comportamiento del comprador.
              </p>
              <p className="font-body text-base md:text-lg text-[#1A1A18]/70 leading-relaxed">
                Entender el verdadero valor de mercado de tu hogar requiere ver qué casas similares en tu área específica han vendido realmente, no solo lo que predicen los algoritmos.
              </p>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="bg-[#F8F5F0] p-8 md:p-10 border border-[#E8E0D5]">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-6">
                  Lo que importa:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Ventas comparables recientes en tu vecindario",
                    "Demanda actual de compradores en tu mercado",
                    "La condición y presentación de tu hogar",
                    "Tu cronograma y estrategia de precios",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 font-body text-sm text-[#1A1A18]/70">
                      <span className="text-[#B8974A] font-light">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── CLOSING SECTION ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-6">
              El enfoque correcto depende de tu situación.
            </h2>
            <p className="font-body text-base md:text-lg text-white/70 leading-relaxed">
              Ya sea que estés pensando en vender, considerando un refinanciamiento, o simplemente quieras claridad sobre la posición de tu hogar en el mercado, entender estos factores te da la base para tomar decisiones informadas.
            </p>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
