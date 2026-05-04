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
    <div ref={ref} className={`fade-in-up ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function StrategyHubES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] py-20 md:py-32">
      <div className="container">
        <RevealDiv>
          <div className="flex items-center gap-3 mb-4">
            <span className="section-rule" />
            <span className="section-number">01. Tu Estrategia</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
            Comienza con los números.<br />
            <em className="italic">Decide con claridad.</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12 max-w-2xl">
            Cada decisión sobre tu hogar es única. Obtén los datos precisos y los conocimientos estratégicos que necesitas para elegir el camino que maximice tus metas financieras y se adapte a tu estilo de vida.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Path A: Net Sheet */}
          <RevealDiv delay={100}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                Mira con cuánto dinero te quedarás <em className="italic">realmente</em>.
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                Más allá del precio de venta, entiende todos los costos y tarifas involucrados. Obtén una imagen clara de tus ganancias netas.
              </p>
              <Link href="/es/net-sheet">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Calcular Ganancias Netas
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>

          {/* Path B: Sell vs Rent */}
          <RevealDiv delay={200}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                ¿Deberías <em className="italic">vender o alquilar</em> tu casa?
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                Compara las implicaciones financieras de vender ahora frente a mantener tu propiedad como alquiler. Entiende el flujo de caja, la apreciación y los retornos a largo plazo.
              </p>
              <Link href="/es/sell-vs-rent">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Comparar Vender vs. Alquilar
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>

          {/* Path C: Remodel vs Sell */}
          <RevealDiv delay={300}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                ¿Vale la pena <em className="italic">remodelar antes</em> de vender?
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                Analiza el retorno potencial de la inversión en renovaciones. Descubre si una remodelación realmente aumentará tu beneficio neto o si vender tal cual es la mejor opción.
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

        {/* Optional: Add a CTA to contact you for personalized advice */}
        <RevealDiv delay={400} className="mt-20 text-center">
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-4">
            ¿Necesitas orientación personalizada?
          </h2>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-xl mx-auto leading-relaxed mb-8">
            Estas herramientas brindan claridad, pero para una estrategia adaptada a tu situación única, conectemos.
          </p>
          <Link href="/es/contacto">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
              Programar una Sesión de Estrategia
              <ArrowRight size={14} />
            </span>
          </Link>
        </RevealDiv>

      </div>
    </div>
  );
}
