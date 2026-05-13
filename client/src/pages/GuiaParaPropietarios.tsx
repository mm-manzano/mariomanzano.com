/*
 * DESIGN: Quiet Luxury Editorial - Guía para Propietarios
 * Secciones: Héroe, Una Mirada Clara a las Opciones, Preparación, Estrategia de Precios,
 *            Vender vs Alquilar, Mantener, Remodelar, Integrando Todo, FAQ, CTA
 * Optimización: Tabla Comparativa, Sección de Preguntas Frecuentes y Esquema JSON-LD.
 * COPY UPDATE: Sección 01 reducida, etiquetas de precios corregidas, titular de remodelación
 *              mejorado, sección de mantener reescrita en prosa, CTA final actualizado.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const GUIDE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-KJyHvXlKKhLSVPNiGNFDEe.webp";

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

export default function GuiaParaPropietarios() {
  useEffect(() => {
    setPageMeta(
      "Guía para Propietarios: Vender, Remodelar, Alquilar o Mantener | Cedar Park y Leander TX",
      "Guía en lenguaje claro para propietarios en Cedar Park y Leander TX. Entiende las cuatro opciones para tu casa antes de tomar cualquier decisión. Sin presión, solo claridad.",
      "https://mariomanzano.com/es/guia-para-propietarios"
    );
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuándo debería vender mi casa tal cual (as-is) en Austin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vender tal cual tiene sentido cuando deseas evitar el tiempo, el estrés y el costo inicial de las reparaciones. En el mercado de Austin, esto implica una compensación: aceptas una oferta potencialmente más baja a cambio de una salida más rápida y segura. Es la mejor opción cuando la propiedad necesita trabajos importantes que no estás preparado para gestionar."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es mejor alquilar que vender en Leander o Cedar Park?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En el mercado de Cedar Park y Leander, alquilar suele ser una estrategia de apreciación a largo plazo. Si tu tasa hipotecaria actual es significativamente más baja que los alquileres del mercado, puede ser una herramienta sólida para construir riqueza. Sin embargo, si necesitas ese capital para el pago inicial de tu próxima casa o quieres evitar las responsabilidades de ser arrendador, vender suele ser el movimiento financiero más limpio."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo sé si una remodelación realmente aumentará el valor de mi casa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enfócate en la limpieza básica, sistemas funcionales y una presentación neutral. Las renovaciones de lujo rara vez recuperan su costo total. Si la mejora no aumenta de manera significativa la demanda de los compradores, probablemente no sea un movimiento estratégico antes de vender."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el mayor riesgo de mantener y no hacer nada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El riesgo principal es el costo de oportunidad. Aunque mantener evita el estrés inmediato, tu capital permanece ilíquido y sigues pagando impuestos, seguros y mantenimiento. Mantener es válido cuando necesitas claridad, pero no debe usarse para aplazar una decisión que ya tienes en mente."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué el precio es la decisión más importante en el proceso de venta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El precio define cómo el mercado percibe tu casa desde el primer día. Un precio bajo deja dinero sobre la mesa. Un precio demasiado alto aleja a los compradores calificados antes de que agenden una visita. Un precio bien posicionado genera el interés correcto de inmediato, antes de que el impulso se pierda."
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

      {/* HERO */}
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
              Una guía en lenguaje claro para las cuatro decisiones que enfrentan los propietarios en Cedar Park y Leander. Sin presión, solo claridad.
            </p>
          </div>
        </div>
      </section>

      {/* UNA MIRADA CLARA A TUS OPCIONES */}
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
              La mayoría de los propietarios solo considera vender. Pero dependiendo de tus objetivos, tu plazo y tu situación financiera, uno de los otros tres caminos podría servirte mejor.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Esta guía presenta las cuatro opciones lado a lado para que puedas ver las ventajas y desventajas con claridad antes de comprometerte con cualquier decisión. El camino correcto depende de tu situación, no de una regla general.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Tómate el tiempo que necesitas. Una decisión de este tamaño merece más que unas pocas horas de investigación.
            </p>

            {/* TABLA COMPARATIVA */}
            <div className="mt-16 w-full">
              <div className="bg-white border border-[#E8E0D5] p-6 md:p-12 shadow-sm">
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-8">Los Cuatro Caminos de un Vistazo</h3>
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
                        <td className="py-6 pr-4">Tu casa tiene buena estructura pero necesita actualizaciones para funcionar mejor.</td>
                        <td className="py-6 pr-4">Mejora de la calidad de vida y posible aumento del valor de reventa. En algunos casos, puede crear la opción de acceder al capital para un futuro movimiento.</td>
                        <td className="py-6 pr-4">Altos costos iniciales. Las mejoras de lujo rara vez recuperan el 100% de la inversión.</td>
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
                        <td className="py-6 pr-4">El capital permanece inmovilizado. Impuestos, seguros y mantenimiento continúan.</td>
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

      {/* PREPARACIÓN */}
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
              Muchos vendedores gastan dinero en reparaciones y mejoras que no aumentan de manera significativa el valor o la demanda del comprador. Antes de empezar a gastar, ayuda entender qué mueve la aguja y qué no.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealDiv delay={100} className="p-8 bg-[#F8F5F0] border border-[#E8E0D5]">
              <h3 className="font-display text-xl font-light mb-4 text-[#B8974A]">Lo que Importa</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                La limpieza básica, los sistemas funcionales y una presentación neutral ayudan a los compradores a imaginarse en el espacio sin distracciones.
              </p>
            </RevealDiv>
            <RevealDiv delay={200} className="p-8 bg-[#F8F5F0] border border-[#E8E0D5]">
              <h3 className="font-display text-xl font-light mb-4 text-[#B8974A]">Lo que No Importa</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                Las renovaciones grandes, las mejoras de lujo y los proyectos de gusto personal rara vez ofrecen un retorno completo de la inversión antes de una venta.
              </p>
            </RevealDiv>
            <RevealDiv delay={300} className="p-8 bg-[#F8F5F0] border border-[#E8E0D5]">
              <h3 className="font-display text-xl font-light mb-4 text-[#B8974A]">La Pregunta Correcta</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                ¿Esta mejora aumentará de manera significativa el interés del comprador o tus ingresos netos? Si la respuesta no es clara, probablemente no vale la pena hacerla.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ESTRATEGIA DE PRECIOS */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">03. Precios</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                Tu decisión<br />
                <em className="italic">más importante.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-6">
                El precio que eliges para tu casa define todo lo que sigue. Afecta cómo la perciben los compradores, con qué rapidez recibes ofertas y lo que finalmente te llevas.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                El precio correcto no es el número más alto que puedas justificar. Es el número que te pone frente a los compradores correctos en el momento correcto.
              </p>
            </RevealDiv>

            <div className="space-y-8">
              <RevealDiv delay={150} className="border-l-2 border-[#B8974A] pl-8">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-2">Riesgo de Subvaloración</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                  Poner un precio demasiado bajo deja dinero sobre la mesa. También puede hacer que los compradores se pregunten si hay algo malo con la propiedad, lo que invita a ofertas más bajas y negociaciones más difíciles.
                </p>
              </RevealDiv>
              <RevealDiv delay={250} className="border-l-2 border-[#B8974A] pl-8">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-2">Riesgo de Sobrevaloración</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                  Empezar demasiado alto aleja a la mayoría de los compradores calificados antes de que agenden una visita. Las reducciones de precio que siguen transmiten desesperación y rara vez recuperan el impulso original.
                </p>
              </RevealDiv>
            </div>
          </div>
        </div>
      </section>

      {/* VENDER VS ALQUILAR */}
      <section className="py-20 md:py-32 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">04. Estrategia</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-12 max-w-2xl">
              Comprendiendo tus compensaciones.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <RevealDiv delay={100}>
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-6">La Realidad de Alquilar</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                Conservar tu casa como alquiler significa asumir una responsabilidad continua. La selección de inquilinos, el mantenimiento, la administración de la propiedad y los periodos de vacancia forman parte de la ecuación.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                En el mercado de Cedar Park y Leander, alquilar tiende a ser más una estrategia de capital y apreciación a largo plazo que una fuente de flujo de caja inmediato. Tiene más sentido cuando tu pago hipotecario es bajo en relación con lo que podría rentar la propiedad.
              </p>
            </RevealDiv>
            <RevealDiv delay={200}>
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-6">La Realidad de Vender</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                Vender te da liquidez y te libera de la responsabilidad continua de ser propietario. Sin más reparaciones, inquilinos ni costos de tenencia relacionados con esa propiedad.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                La compensación es renunciar a la apreciación futura. Una vez vendida la casa, ya no participas en ninguna ganancia del mercado relacionada con esa propiedad.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* REMODELAR */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Remodelar</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Cuando remodelar<br />
              <em className="italic">realmente tiene sentido.</em>
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Remodelar puede ayudar a que tu casa funcione mejor para tu vida actual o posicionarla de manera más competitiva para la venta. La clave es saber qué mejoras realmente mueven la aguja y cuáles simplemente cuestan dinero.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                En la mayoría de los casos, las actualizaciones funcionales y una presentación neutral superan a las renovaciones de lujo en términos de retorno de inversión. Los compradores pagan por condición y ubicación, no por el gusto personal del vendedor.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Para algunos propietarios, una remodelación estratégica combinada con un refinanciamiento puede abrir opciones que antes no estaban disponibles, incluyendo acceder al capital para el próximo movimiento o reposicionar la propiedad para un uso diferente.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Como cualquier camino, esto solo tiene sentido cuando los números lo respaldan. Vale la pena analizarlo antes de comprometerse con cualquier cosa.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* MANTENER */}
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
              Mantener tu propiedad no es procrastinación si hay una razón detrás de esa decisión. Esperar mayor claridad o mejores condiciones del mercado es una opción legítima. Lo importante es entender lo que realmente te está costando mientras esperas.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealDiv delay={100}>
              <h3 className="font-display text-xl font-light text-[#1A1A18] mb-4">Esperar Tiene Sentido Cuando</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                Necesitas tiempo para definir tu próximo paso. No estás bajo presión financiera para actuar. Las condiciones del mercado no se alinean con tus objetivos actuales. Quieres más certeza antes de comprometerte con cualquier dirección.
              </p>
            </RevealDiv>
            <RevealDiv delay={200}>
              <h3 className="font-display text-xl font-light text-[#1A1A18] mb-4">El Costo de Esperar</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                Tu capital permanece bloqueado en la propiedad mientras pagas impuestos, seguros y mantenimiento. El momento del mercado en el futuro no es predecible, y mantener indefinidamente no es una estrategia, es un aplazamiento. Asegúrate de saber la diferencia.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* INTEGRANDO TODO */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">07. Resumen</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              La mejor elección depende de cuatro cosas.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Tus Objetivos", desc: "¿Qué estás tratando de lograr realmente? ¿Más espacio, flexibilidad financiera, planificación para la jubilación o algo completamente diferente?" },
              { title: "Tu Plazo", desc: "¿Tienes tiempo para ser paciente o necesitas moverte dentro de una ventana específica? Eso cambia el análisis de cada opción." },
              { title: "Tu Propiedad", desc: "¿En qué condición está? Una casa que necesita trabajo importante tiene un conjunto de opciones diferente a una que está lista para mudarse." },
              { title: "Tu Capacidad", desc: "¿Cuánto tiempo, dinero e incertidumbre estás dispuesto a asumir? Cada camino tiene un costo más allá del financiero." }
            ].map((item, i) => (
              <RevealDiv key={item.title} delay={i * 100} className="border-t border-[#E8E0D5] pt-6">
                <h3 className="font-display text-lg font-light text-[#B8974A] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container max-w-3xl">
          <RevealDiv>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-12 text-center">
              Preguntas Comunes
            </h2>
            <div className="space-y-2">
              <FAQItem
                question="¿Cuándo debería vender mi casa tal cual (as-is) en Austin?"
                answer="Vender tal cual tiene sentido cuando deseas evitar el tiempo, el estrés y el costo inicial de las reparaciones. En el mercado de Austin, esto implica una compensación: aceptas una oferta potencialmente más baja a cambio de una salida más rápida y segura. Es la mejor opción cuando la propiedad necesita trabajos importantes que no estás preparado para gestionar."
              />
              <FAQItem
                question="¿Es mejor alquilar que vender en Leander o Cedar Park?"
                answer="En el mercado de Cedar Park y Leander, alquilar suele ser una estrategia de apreciación a largo plazo. Si tu tasa hipotecaria es significativamente más baja que los alquileres del mercado, puede ser una herramienta sólida para construir riqueza. Sin embargo, si necesitas ese capital para tu próxima casa o quieres evitar ser arrendador, vender suele ser el movimiento financiero más limpio."
              />
              <FAQItem
                question="¿Cómo sé si una remodelación realmente aumentará el valor de mi casa?"
                answer="Enfócate en la limpieza básica, sistemas funcionales y una presentación neutral. Las renovaciones de lujo rara vez recuperan su costo total. Si la mejora no aumenta de manera significativa la demanda de los compradores, probablemente no sea el movimiento correcto antes de vender."
              />
              <FAQItem
                question="¿Cuál es el mayor riesgo de mantener y no hacer nada?"
                answer="El riesgo principal es el costo de oportunidad. Tu capital permanece ilíquido y sigues pagando impuestos, seguros y mantenimiento. Mantener es válido cuando necesitas claridad, pero no debe usarse para aplazar una decisión que ya tienes en mente."
              />
              <FAQItem
                question="¿Por qué el precio es la decisión más importante en el proceso de venta?"
                answer="El precio define cómo el mercado percibe tu casa desde el primer día. Un precio bajo deja dinero sobre la mesa. Uno demasiado alto aleja a los compradores calificados antes de que agenden una visita. Un precio bien posicionado genera el interés correcto de inmediato, antes de que el impulso se pierda."
              />
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-2xl mx-auto">
              ¿No estás seguro de qué camino se adapta a tu situación?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 max-w-lg mx-auto">
              Puedo ayudarte a analizar los números de cada opción y determinar cuál tiene sentido para donde estás ahora. Sin presión, solo una conversación real.
            </p>
            <a href={getCTALink("get-plan", "es")}>
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                Iniciar una Conversación
                <ArrowRight size={14} />
              </span>
            </a>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
