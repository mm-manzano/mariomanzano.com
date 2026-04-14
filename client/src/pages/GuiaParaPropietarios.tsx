/*
 * DESIGN: Quiet Luxury Editorial - Guía para Propietarios
 * Content extracted from Gamma guide (Spanish)
 * Sections: Hero, Tus Opciones, Preparar vs Vender, Estrategia de Precio, Vender o Rentar, Mantener, Vender Tal Como Está, Renovar, Integrando Todo, CTA
 * Optimization: Added Comparison Table, FAQ Section, and JSON-LD Schema for AI Visibility.
 * REFINEMENT: Renovar section moved after Vender Tal Como Está. Long dashes removed. Renovar table row simplified for clarity.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const GUIDE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-KJyHvXlKKhLSVPNiGNFDEe.webp";

function useScrollReveal( ) {
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E0D5] py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left group focus:outline-none"
      >
        <span className="font-display text-xl md:text-2xl font-light text-[#1A1A18] group-hover:text-[#B8974A] transition-colors">
          {question}
        </span>
        <span className="text-[#B8974A] ml-4 flex-shrink-0">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function GuiaParaPropietarios() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuándo debería vender mi casa tal cual (as-is ) en Austin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vender tal cual tiene sentido cuando desea evitar el tiempo, el estrés y el costo inicial de las reparaciones. En el mercado de Austin, esto es una compensación: acepta una oferta potencialmente más baja a cambio de una salida más rápida y segura. Es ideal si la propiedad necesita trabajos significativos que usted no está dispuesto a gestionar."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es mejor alquilar que vender en Leander o Cedar Park?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En nuestro mercado local, alquilar es típicamente una apuesta por la apreciación a largo plazo. Si su tasa hipotecaria actual es significativamente más baja que los alquileres del mercado, puede ser una herramienta poderosa para generar riqueza. Sin embargo, si necesita esa plusvalía para el pago inicial de su próxima casa o desea evitar las responsabilidades de ser arrendador, vender suele ser el movimiento financiero más limpio."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo sé si una remodelación realmente aumentará el valor de mi casa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enfóquese en limpieza básica, sistemas funcionales y una presentación neutral. Las grandes renovaciones de lujo rara vez recuperan su costo total. Si la mejora no aumenta significativamente la demanda de los compradores o su calidad de vida diaria, probablemente no sea un movimiento estratégico antes de vender."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el mayor riesgo de mantener y no hacer nada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El riesgo principal es el costo de oportunidad. Aunque mantener la propiedad evita el estrés inmediato, su capital permanece ilíquido y usted sigue incurriendo en gastos de impuestos, seguros y mantenimiento. Mantener es una estrategia válida para obtener claridad, pero no debe usarse para evitar una decisión inevitable."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué el precio es la decisión más importante en el proceso de venta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El precio dicta cómo el mercado percibe su casa. Un precio bajo deja dinero sobre la mesa, mientras que un precio excesivo hace que su casa sea invisible para los compradores calificados. Un precio estratégico posiciona su casa para atraer el interés adecuado de inmediato."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* PAGE HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#1A1A18]/65" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Guía para Propietarios
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-6">
              Vender, Renovar,  

              <em className="italic">Rentar o Mantener.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Orientación para tu próximo paso. Claridad antes de decidir.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 01: TUS OPCIONES */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">01. Tus Opciones</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Una vista clara a tus opciones.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              La mayoría de los propietarios que están considerando vender quieren claridad antes de tomar una decisión, especialmente cuando no están seguros de cuánto podría venderse su casa en el mercado actual.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Aunque cada propiedad es diferente, entender una estimación aproximada de precio suele ser el primer paso para decidir si vender, remodelar, rentar o mantener la propiedad tiene más sentido.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Ya sea que todavía estés evaluando tus opciones o que ya te inclines por vender, ayuda dar un paso atrás y comparar los caminos uno al lado del otro.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Vender, remodelar, rentar o mantener puede tener sentido según tus metas, tu tiempo y tu nivel de estrés. La clave es entender qué opción realmente corresponde con tu situación.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-12">
              Esta guía te ayuda a bajar el proceso de la decisión, ver claramente los pros y contras y evitar movimientos innecesarios o costosos antes de decidir.
            </p>

            {/* COMPARISON TABLE */}
            <div className="mt-16 w-full">
              <div className="bg-white border border-[#E8E0D5] p-6 md:p-12 shadow-sm">
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-8">Estrategia de los Cuatro Caminos</h3>
                <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#E8E0D5]">
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Estrategia</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/4">Cuándo tiene sentido</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Ventaja Financiera</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Riesgos y Compensaciones</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Ideal para</th>
                      </tr>
                    </thead>
                    <tbody className="font-body text-sm text-[#1A1A18]/75 leading-relaxed">
                      <tr className="border-b border-[#F8F5F0]">
                        <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Vender</td>
                        <td className="py-6 pr-4">Necesita liquidez, un espacio diferente o desea capturar su plusvalía actual.</td>
                        <td className="py-6 pr-4">Acceso inmediato a los fondos netos para su próximo movimiento o inversión.</td>
                        <td className="py-6 pr-4">Renunciar a la apreciación futura y a los posibles ingresos por alquiler.</td>
                        <td className="py-6">Propietarios listos para un cambio definitivo y flexibilidad financiera.</td>
                      </tr>
                      <tr className="border-b border-[#F8F5F0]">
                        <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Renovar</td>
                        <td className="py-6 pr-4">Su casa actual tiene buena estructura pero necesita actualizaciones o mejoras.</td>
                        <td className="py-6 pr-4">Mejor calidad de vida y potencial aumento en el valor de reventa. En algunos casos, también puede crear la opción de acceder al capital para un próximo paso.</td>
                        <td className="py-6 pr-4">Altos costos iniciales; las mejoras de lujo rara vez devuelven el 100% de la inversión.</td>
                        <td className="py-6">Propietarios que aman su ubicación pero quieren que su casa funcione mejor.</td>
                      </tr>
                      <tr className="border-b border-[#F8F5F0]">
                        <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Rentar</td>
                        <td className="py-6 pr-4">Su pago de hipoteca es bajo y desea generar riqueza a largo plazo.</td>
                        <td className="py-6 pr-4">Crecimiento de la plusvalía a largo plazo y potencial de apreciación futura.</td>
                        <td className="py-6 pr-4">Mantenimiento continuo, gestión de inquilinos y riesgos de desocupación.</td>
                        <td className="py-6">Inversionistas enfocados en la riqueza a largo plazo más que en el flujo de caja inmediato.</td>
                      </tr>
                      <tr>
                        <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Mantener</td>
                        <td className="py-6 pr-4">Necesita más tiempo para decidir o las condiciones del mercado no favorecen sus metas.</td>
                        <td className="py-6 pr-4">Evita costos de transacción y permite mayor claridad antes de actuar.</td>
                        <td className="py-6 pr-4">La plusvalía permanece inmovilizada; impuestos, seguros y mantenimiento continuos.</td>
                        <td className="py-6">Propietarios que no están bajo presión y valoran la certeza sobre la rapidez.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* SECTION 02: PREPARAR VS VENDER */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">02. Preparar vs Vender</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              Entiende la diferencia.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Antes de poner tu casa en venta, es importante entender cuándo prepararla tiene sentido financiero y cuándo no. Muchos vendedores gastan dinero en reparaciones y mejoras que no aumentan de forma significativa el valor ni el interés de los compradores.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Lo que Funciona</h3>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Limpieza básica, sistemas funcionales y presentación neutral ayudan a los compradores a verse en el espacio.
              </p>
            </RevealDiv>
            <RevealDiv delay={150} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Lo que No Funciona</h3>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Las renovaciones grandes, cambios de lujo y proyectos basados en gustos personales rara vez recuperan toda la inversión.
              </p>
            </RevealDiv>
          </div>

          <RevealDiv delay={200} className="mt-8 border border-white/10 p-8">
            <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Pregúntate</h3>
            <p className="font-body text-base text-white/70 leading-relaxed">
              ¿Esta mejora realmente aumentará el interés de los compradores o el dinero neto que recibirás? Si la respuesta no es clara, vale la pena reconsiderarla.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* SECTION 03: ESTRATEGIA DE PRECIO */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03. Estrategia de Precio</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Tu decisión más importante.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-8">
              El precio correcto no se trata de perseguir el mercado ni de exprimir cada dólar. Se trata de posicionar tu casa donde realmente debe estar.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Riesgo de Precio Bajo</h3>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Vender demasiado bajo significa dejar dinero sobre la mesa. Los compradores pueden pensar que algo no está bien con la propiedad.
              </p>
            </RevealDiv>
            <RevealDiv delay={150} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Precio Estratégico</h3>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Empezar con un precio demasiado alto puede hacer que tu casa pase sin verse para la mayoría de los compradores y llevar a reducciones que transmiten urgencia.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 04: VENDER O RENTAR */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">04. Vender o Rentar</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              Entiende tus ventajas y desventajas.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100}>
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">La Realidad de Rentar</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                Mantener tu casa como renta implica responsabilidad continua. Tendrás que encargarte de seleccionar inquilinos, mantenimiento, administración y periodos sin inquilino.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                En nuestro mercado local, rentar normalmente es más una forma de ganar valor con el tiempo que de ganar dinero mensual alto. Tiene más sentido cuando tu pago es bajo comparado con las rentas o cuando tu meta es construir riqueza con el tiempo.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Rentar puede ofrecer apreciación futura y quizá algo de ingreso mensual, pero mantiene tu capital invertido y reduce tu flexibilidad.
              </p>
            </RevealDiv>

            <RevealDiv delay={150}>
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">La Realidad de Vender</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                Vender te da liquidez y te libera de la responsabilidad continua de la propiedad. Ya no dependes de la casa, ni eres responsable de reparaciones, ni de manejar inquilinos.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                El capital queda disponible para tu siguiente paso, inversión u otras metas financieras.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                El punto en contra es renunciar a la apreciación futura y al posible ingreso por renta. Una vez que vendes, ya no participas en las ganancias futuras de la propiedad.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 05: MANTENER */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Mantener</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              No hacer nada puede ser estratégico.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Esperar Tiene Sentido Cuando</h3>
              <ul className="font-body text-base text-[#1A1A18]/65 leading-relaxed space-y-2">
                <li>Necesitas tiempo para decidir tu siguiente paso</li>
                <li>Prefieres esperar hasta que las condiciones sean más favorables</li>
                <li>No estás listo para comprometerte a vender o rentar</li>
              </ul>
            </RevealDiv>

            <RevealDiv delay={150} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Considera los Costos</h3>
              <ul className="font-body text-base text-[#1A1A18]/65 leading-relaxed space-y-2">
                <li>Tu capital sigue invertido en la casa</li>
                <li>Mantenimiento continuo y costos de mantener la propiedad</li>
                <li>El momento futuro del mercado es imposible de predecir</li>
                <li>Sigues siendo responsable de los impuestos y el seguro</li>
              </ul>
            </RevealDiv>
          </div>

          <RevealDiv delay={200} className="mt-12 border-t border-[#E8E0D5] pt-8">
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Mantener tu propiedad no es procrastinar. Puede ser una estrategia válida cuando necesitas claridad o cuando las condiciones del mercado no favorecen tus objetivos.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* SECTION 06: VENDER TAL COMO ESTÁ */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">06. Vender Tal Como Está</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              Entendiendo los puntos a favor y en contra.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Vender tu casa tal cual significa ofrecerla en su condición actual sin hacer reparaciones ni actualizaciones. Esto no es un truco de marketing ni una forma de vender rápido. Es simplemente reconocer el estado de la propiedad.
            </p>
          </RevealDiv>

          <RevealDiv delay={100} className="mt-8 border border-white/10 p-8">
            <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Qué Considerar</h3>
            <ul className="font-body text-base text-white/70 leading-relaxed space-y-2 mb-6">
              <li>Los compradores van a inspeccionar y negociar según la condición de la casa</li>
              <li>Puedes recibir ofertas más bajas si el precio no refleja la condición</li>
              <li>Puede tomar más tiempo encontrar al comprador adecuado</li>
              <li>No estás obligado a hacer arreglos</li>
            </ul>
            <p className="font-body text-base text-white/70 leading-relaxed">
              Esta opción funciona cuando no quieres invertir tiempo ni dinero en preparar la casa, o cuando la propiedad necesita reparaciones que no quieres hacer. Es una compensación entre precio, preparación y esfuerzo.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* RENOVAR SECTION */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Renovar</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Renovar
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Renovar puede ser una forma de hacer que tu casa actual funcione mejor para tus necesidades o de posicionarla mejor para una reventa.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Para muchos propietarios, esto significa mejorar el diseño, actualizar áreas clave o abordar problemas funcionales que impactan la vida diaria o la percepción del comprador.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Algunos propietarios abordan este momento de manera diferente.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Una renovación estratégica combinada con un refinanciamiento puede, en ciertas situaciones, reposicionar la propiedad para un uso o resultado diferente, o liberar capital para el próximo paso.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Como cualquier camino, el valor de renovar depende de tus metas, tu tiempo y cómo se desarrollan realmente los números.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* SECTION 07: INTEGRANDO TODO */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">07. Integrando Todo</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              La mejor decisión depende de cuatro factores clave.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              No hay una sola respuesta correcta. Solo la respuesta correcta para tu situación.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              {
                title: "Tus Objetivos",
                desc: "¿Qué estás buscando lograr? ¿Más espacio, mayor flexibilidad financiera, planear tu retiro o algo más?"
              },
              {
                title: "Tu Tiempo",
                desc: "¿Cuándo necesitas tomar una decisión? ¿Estás bajo presión o tienes tiempo para esperar?"
              },
              {
                title: "El Estado de tu Casa",
                desc: "¿En qué estado está tu propiedad? ¿Tiene problemas mayores, arreglos menores o está lista para vender?"
              },
              {
                title: "Tu Capacidad",
                desc: "¿Cuánto esfuerzo y estrés estás dispuesto a manejar? Algunos caminos requieren más participación que otros."
              },
            ].map((item, i) => (
              <RevealDiv key={item.title} delay={i * 100} className="border-t border-white/10 pt-6">
                <h3 className="font-display text-xl font-light text-[#B8974A] mb-3">{item.title}</h3>
                <p className="font-body text-base text-white/70 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>

          <RevealDiv delay={400} className="mt-16 border-t border-white/10 pt-8 max-w-2xl">
            <p className="font-body text-base text-white/70 leading-relaxed mb-4">
              Algunos propietarios están decidiendo qué hacer a continuación.
            </p>
            <p className="font-body text-base text-white/70 leading-relaxed">
              Otros están considerando cómo usar esta propiedad para crear su próxima oportunidad.
            </p>
          </RevealDiv>

          {/* FAQ SECTION */}
          <div className="mt-24 max-w-3xl mx-auto w-full">
            <RevealDiv>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-12 text-center">
                Preguntas Comunes y Claridad
              </h2>
              <div className="bg-[#F8F5F0] border border-[#E8E0D5] p-6 md:p-12 shadow-sm">
                <FAQItem 
                  question="¿Cuándo debería vender mi casa tal cual (as-is) en Austin?" 
                  answer="Vender tal cual tiene sentido cuando desea evitar el tiempo, el estrés y el costo inicial de las reparaciones. En el mercado de Austin, esto es una compensación: acepta una oferta potencialmente más baja a cambio de una salida más rápida y segura. Es ideal si la propiedad necesita trabajos significativos que usted no está dispuesto a gestionar."
                />
                <FAQItem 
                  question="¿Es mejor alquilar que vender en Leander o Cedar Park?" 
                  answer="En nuestro mercado local, alquilar es típicamente una apuesta por la apreciación a largo plazo. Si su tasa hipotecaria actual es significativamente más baja que los alquileres del mercado, puede ser una herramienta poderosa para generar riqueza. Sin embargo, si necesita esa plusvalía para el pago inicial de su próxima casa o desea evitar las responsabilidades de ser arrendador, vender suele ser el movimiento financiero más limpio."
                />
                <FAQItem 
                  question="¿Cómo sé si una remodelación realmente aumentará el valor de mi casa?" 
                  answer="Enfóquese en limpieza básica, sistemas funcionales y una presentación neutral. Las grandes renovaciones de lujo rara vez recuperan su costo total. Si la mejora no aumenta significativamente la demanda de los compradores o su calidad de vida diaria, probablemente no sea un movimiento estratégico antes de vender."
                />
                <FAQItem 
                  question="¿Cuál es el mayor riesgo de mantener y no hacer nada?" 
                  answer="El riesgo principal es el costo de oportunidad. Aunque mantener la propiedad evita el estrés inmediato, su capital permanece ilíquido y usted sigue incurriendo en gastos de impuestos, seguros y mantenimiento. Mantener es una estrategia válida para obtener claridad, pero no debe usarse para evitar una decisión inevitable."
                />
                <FAQItem 
                  question="¿Por qué el precio es la decisión más importante en el proceso de venta?" 
                  answer="El precio dicta cómo el mercado percibe su casa. Un precio bajo deja dinero sobre la mesa, mientras que un precio excesivo hace que su casa sea invisible para los compradores calificados. Un precio estratégico posiciona su casa para atraer el interés adecuado de inmediato."
                />
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#F8F5F0]">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-2xl mx-auto">
              ¿Listo para explorar tus opciones?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 max-w-lg mx-auto">
              Si quieres hablar sobre tu situación o entender en cuánto podría venderse o rentarse tu casa de forma realista, estoy disponible.
            </p>
            <a href={getCTALink("get-plan", "es")}>
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                Obtener un plan
                <ArrowRight size={14} />
              </span>
            </a>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
