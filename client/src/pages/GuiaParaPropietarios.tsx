/*
 * DESIGN: Quiet Luxury Editorial - Guía para Propietarios
 * Contenido extraído de la guía Gamma (Español)
 * Secciones: Héroe, Una Mirada Clara a las Opciones, Preparación vs Venta, Estrategia de Precios, Vender vs Alquilar, Mantener, Vender Tal Cual, Remodelar (Actualizado), Integrando Todo, CTA
 * Optimización: Se agregó Tabla Comparativa, Sección de Preguntas Frecuentes y Esquema JSON-LD para Visibilidad de IA.
 * Corrección: Diseño responsive-first para visibilidad en escritorio y móvil.
 * REFINAMIENTO: Sección de Remodelación actualizada con redacción estratégica de refinanciamiento/capital. Sin guiones largos.
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
        "name": "¿Cuándo debería vender mi casa tal cual (as-is) en Austin?",
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
          "text": "Enfóquese en limpieza básica, sistemas funcionales y una presentación neutral. Las grandes renovaciones de lujo rara vez recuperan su costo total. Si la mejora no aumenta significativamente la demanda de los compradores o su calidad de vida diaria, es probable que no sea un movimiento estratégico antes de vender."
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
      {/* ─── FAQ SCHEMA ───────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#1A1A18]/65" />
        </div>
        <div className="relative z-10 container">
          <div className="flex justify-end mb-4">
            <a
              href="/guia-para-propietarios.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm md:text-base opacity-90 hover:opacity-100 font-light tracking-wide border-b border-white/40 pb-1"
            >
              Descargar PDF
            </a>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                GUÍA PARA PROPIETARIOS
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Vender, Remodelar,<br />
              <em className="italic">Alquilar o Mantener.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Orientación para tu próximo paso. Claridad antes de decidir.
            </p>
          </div>
        </div>
      </section>

      {/* ─── A CLEAR LOOK AT YOUR OPTIONS ─────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">01. Tus Opciones</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Una mirada clara a tus opciones.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              La mayoría de los propietarios que están considerando una venta quieren claridad antes de comprometerse, especialmente cuando no están seguros de lo que su casa podría venderse de manera realista en el mercado actual.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Si bien cada propiedad es diferente, comprender un rango de precios razonable suele ser el primer paso para decidir si vender, remodelar, alquilar o mantener tiene más sentido.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Ya sea que aún estés sopesando tus opciones o ya te inclines por vender, ayuda dar un paso atrás y comparar los caminos uno al lado del otro.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Vender, remodelar, alquilar o mantener pueden tener sentido dependiendo de tus objetivos, plazos y nivel de estrés. La clave es comprender qué dirección se adapta realmente a tu situación.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Esta guía ralentiza la decisión, expone claramente las ventajas y desventajas, y te ayuda a evitar movimientos innecesarios o costosos antes de comprometerte.
            </p>

            {/* ─── COMPARISON TABLE ─────────────────────────────────── */}
            <div className="mt-16 w-full">
              <div className="bg-white border border-[#E8E0D5] p-6 md:p-12 shadow-sm">
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-8">La Estrategia de los Cuatro Caminos</h3>
                <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#E8E0D5]">
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Estrategia</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/4">Cuando Tiene Sentido</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Ventaja Financiera</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Riesgos y Desventajas</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Mejor Para</th>
                      </tr>
                    </thead>
                    <tbody className="font-body text-sm text-[#1A1A18]/75 leading-relaxed">
                      <tr className="border-b border-[#F8F5F0]">
                        <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Vender</td>
                        <td className="py-6 pr-4">Necesitas liquidez, un espacio diferente o quieres capturar el capital actual.</td>
                        <td className="py-6 pr-4">Acceso inmediato a los ingresos netos para tu próximo movimiento o inversión.</td>
                        <td className="py-6 pr-4">Renunciar a la apreciación futura y a los posibles ingresos por alquiler.</td>
                        <td className="py-6">Propietarios listos para un cambio limpio y flexibilidad financiera.</td>
                      </tr>
                      <tr className="border-b border-[#F8F5F0]">
                        <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Remodelar</td>
                        <td className="py-6 pr-4">Tu casa tiene buena estructura pero necesita actualizaciones para funcionar mejor según tus necesidades.</td>
                        <td className="py-6 pr-4">Mejora de la calidad de vida y posible aumento del valor de reventa. En algunos casos, también puede crear la opción de acceder al capital para un futuro movimiento.</td>
                        <td className="py-6 pr-4">Altos costos iniciales; las mejoras de lujo rara vez recuperan el 100% de la inversión.</td>
                        <td className="py-6">Propietarios que aman su ubicación pero quieren que su casa funcione mejor.</td>
                      </tr>
                      <tr className="border-b border-[#F8F5F0]">
                        <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Alquilar</td>
                        <td className="py-6 pr-4">Tu pago hipotecario es bajo y quieres construir riqueza a largo plazo.</td>
                        <td className="py-6 pr-4">Crecimiento del capital a largo plazo y potencial de apreciación futura.</td>
                        <td className="py-6 pr-4">Mantenimiento continuo, gestión de inquilinos y riesgos de vacancia.</td>
                        <td className="py-6">Inversores enfocados en la riqueza a largo plazo en lugar del flujo de caja inmediato.</td>
                      </tr>
                      <tr className="border-b border-[#F8F5F0]">
                        <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Mantener</td>
                        <td className="py-6 pr-4">Necesitas más tiempo para decidir o las condiciones del mercado no favorecen tus objetivos.</td>
                        <td className="py-6 pr-4">Evita los costos de transacción y permite mayor claridad antes de actuar.</td>
                        <td className="py-6 pr-4">El capital permanece inmovilizado; impuestos, seguros y mantenimiento continuos.</td>
                        <td className="py-6">Propietarios que no están bajo presión y valoran la certeza sobre la velocidad.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── PREPARING VS SELLING ─────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">02. Preparación</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Conoce la diferencia antes de listar.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-12">
              Antes de listar tu casa, es importante entender cuándo la preparación tiene sentido financiero y cuándo no. Muchos vendedores gastan dinero en reparaciones y mejoras que no aumentan significativamente el valor o la demanda del comprador.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealDiv delay={100} className="p-8 bg-[#F8F5F0] border border-[#E8E0D5]">
              <h3 className="font-display text-xl font-light text-[#1A1A18] mb-4 text-[#B8974A]">Lo que Importa</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                La limpieza básica, los sistemas funcionales y una presentación neutral ayudan a los compradores a imaginarse en el espacio.
              </p>
            </RevealDiv>
            <RevealDiv delay={200} className="p-8 bg-[#F8F5F0] border border-[#E8E0D5]">
              <h3 className="font-display text-xl font-light text-[#1A1A18] mb-4 text-[#B8974A]">Lo que No Importa</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                Las renovaciones importantes, las mejoras de lujo y los proyectos de gusto personal rara vez ofrecen un retorno completo de la inversión.
              </p>
            </RevealDiv>
            <RevealDiv delay={300} className="p-8 bg-[#F8F5F0] border border-[#E8E0D5]">
              <h3 className="font-display text-xl font-light text-[#1A1A18] mb-4 text-[#B8974A]">Pregúntate</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                ¿Esta mejora aumentará significativamente el interés del comprador o los ingresos netos? Si la respuesta no es clara, reconsidera.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── PRICING STRATEGY ─────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">03. Precios</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                Tu decisión <br />
                <em className="italic">más importante.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-6">
                Ponerle precio a tu casa correctamente es una de las decisiones más importantes que tomarás. Afecta tanto cómo se percibe tu casa como el resultado que finalmente obtengas.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                El precio correcto no se trata de perseguir el mercado o maximizar cada dólar. Se trata de posicionar tu casa donde debe estar.
              </p>
            </RevealDiv>

            <div className="space-y-8">
              <RevealDiv delay={150} className="border-l-2 border-[#B8974A] pl-8">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-2">Riesgo de Subvaloración</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                  Vender demasiado bajo significa dejar dinero sobre la mesa. Los compradores pueden preguntarse si hay algo mal con la propiedad.
                </p>
              </RevealDiv>
              <RevealDiv delay={250} className="border-l-2 border-[#B8974A] pl-8">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-2">Precios Reflexivos</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                  Empezar demasiado alto puede hacer que tu casa sea invisible para la mayoría de los compradores y llevar a reducciones que señalen angustia.
                </p>
              </RevealDiv>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SELLING VS RENTING ───────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">04. Estrategia</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-12 max-w-2xl">
              Comprendiendo tus ventajas y desventajas.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <RevealDiv delay={100}>
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-6">La Realidad de Alquilar</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                Mantener tu casa como alquiler conlleva una responsabilidad continua. Tendrás que encargarte de la selección de inquilinos, el mantenimiento, la gestión de la propiedad y los períodos de vacancia.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                En nuestro mercado local, alquilar es a menudo más una estrategia de capital y apreciación a largo plazo que una estrategia de flujo de caja fuerte. Tiende a tener más sentido cuando tu pago es bajo en relación con los alquileres.
              </p>
            </RevealDiv>
            <RevealDiv delay={200}>
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-6">La Realidad de Vender</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                Vender proporciona liquidez y te libera de la responsabilidad continua de la propiedad. Ya no estás atado a la casa, ni eres responsable de reparaciones o de la gestión de inquilinos.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                La desventaja es renunciar a la apreciación futura y a los posibles ingresos por alquiler. Una vez vendida, ya no participas en las futuras ganancias del mercado ligadas a la propiedad.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── REMODEL (UPDATED STRATEGIC WORDING) ──────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Remodelar</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Más que solo <br />
              <em className="italic">simplemente remodelar.</em>
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Remodelar puede ser una forma de hacer que tu hogar actual funcione mejor para tus necesidades o de posicionarlo mejor para la reventa. Para muchos propietarios, esto significa mejorar la distribución, actualizar áreas clave o abordar problemas funcionales que afectan la vida diaria o la percepción del comprador.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed font-medium text-[#1A1A18]">
                Algunos propietarios abordan este momento de manera diferente.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Una remodelación estratégica combinada con un refinanciamiento puede, en ciertas situaciones, reposicionar la propiedad para un uso o resultado diferente, o liberar capital para el próximo movimiento.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Como cualquier camino, el valor de la remodelación depende de tus objetivos, plazos y de cómo resulten los números.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── HOLDING ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">06. Mantener</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              No hacer nada puede ser estratégico.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-12">
              Mantener tu propiedad no es procrastinación. Puede ser una estrategia válida cuando necesitas claridad o cuando las condiciones del mercado no favorecen tus objetivos.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealDiv delay={100}>
              <h3 className="font-display text-xl font-light text-[#1A1A18] mb-4">Esperar Tiene Sentido Cuando</h3>
              <ul className="font-body text-sm text-[#1A1A18]/65 leading-relaxed space-y-3 list-disc pl-5">
                <li>Necesitas tiempo para decidir tu próximo movimiento</li>
                <li>Prefieres esperar hasta que las condiciones sean más favorables</li>
                <li>No estás listo para comprometerte a vender o alquilar</li>
              </ul>
            </RevealDiv>
            <RevealDiv delay={200}>
              <h3 className="font-display text-xl font-light text-[#1A1A18] mb-4">Considera los Costos</h3>
              <ul className="font-body text-sm text-[#1A1A18]/65 leading-relaxed space-y-3 list-disc pl-5">
                <li>Tu capital permanece inmovilizado en la casa</li>
                <li>Mantenimiento continuo y costos de tenencia</li>
                <li>Es imposible predecir el momento futuro del mercado</li>
                <li>Sigues siendo responsable de los impuestos a la propiedad y el seguro</li>
              </ul>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── PUTTING IT TOGETHER ─────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">07. Resumen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              La mejor elección depende de cuatro factores clave.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Tus Objetivos", desc: "¿Qué intentas lograr? ¿Más espacio, flexibilidad financiera o planificación para la jubilación?" },
              { title: "Tu Plazo", desc: "¿Cuándo necesitas tomar una decisión? ¿Estás bajo presión o tienes tiempo?" },
              { title: "Tu Condición", desc: "¿En qué estado se encuentra tu propiedad? ¿Problemas importantes, actualizaciones menores o lista para mudarse?" },
              { title: "Tu Capacidad", desc: "¿Cuánto esfuerzo e incertidumbre estás dispuesto a manejar?" }
            ].map((item, i) => (
              <RevealDiv key={item.title} delay={i * 100} className="border-t border-[#E8E0D5] pt-6">
                <h3 className="font-display text-lg font-light text-[#B8974A] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ───────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container max-w-3xl">
          <RevealDiv>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-12 text-center">
              Preguntas Comunes y Claridad
            </h2>
            <div className="space-y-2">
              <FAQItem 
                question="¿Cuándo debería vender mi casa tal cual (as-is) en Austin?" 
                answer="Vender tal cual tiene sentido cuando desea evitar el tiempo, el estrés y el costo inicial de las reparaciones. En el mercado de Austin, esto es una compensación: acepta una oferta potencialmente más baja a cambio de una salida más rápida y segura."
              />
              <FAQItem 
                question="¿Es mejor alquilar que vender en Leander o Cedar Park?" 
                answer="En nuestro mercado local, alquilar es típicamente una apuesta por la apreciación a largo plazo. Si su tasa hipotecaria actual es significativamente más baja que los alquileres del mercado, puede ser una herramienta poderosa para generar riqueza."
              />
              <FAQItem 
                question="¿Cómo sé si una remodelación realmente aumentará el valor de mi casa?" 
                answer="Enfóquese en limpieza básica, sistemas funcionales y una presentación neutral. Las grandes renovaciones de lujo rara vez recuperan su costo total. Si la mejora no aumenta significativamente la demanda de los compradores, es probable que no sea estratégica."
              />
              <FAQItem 
                question="¿Cuál es el mayor riesgo de mantener y no hacer nada?" 
                answer="El riesgo principal es el costo de oportunidad. Aunque mantener la propiedad evita el estrés inmediato, su capital permanece ilíquido y usted sigue incurriendo en gastos de impuestos, seguros y mantenimiento."
              />
              <FAQItem 
                question="¿Por qué el precio es la decisión más importante en el proceso de venta?" 
                answer="El precio dicta cómo el mercado percibe su casa. Un precio bajo deja dinero sobre la mesa, mientras que un precio excesivo hace que su casa sea invisible para los compradores calificados."
              />
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-2xl mx-auto">
              ¿Listo para explorar tus opciones?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 max-w-lg mx-auto">
              Si deseas hablar sobre tu situación o comprender lo que tu casa podría venderse o alquilarse de manera realista, estoy disponible.
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
