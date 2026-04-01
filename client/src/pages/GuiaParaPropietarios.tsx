/*
 * DESIGN: Quiet Luxury Editorial - Guía para Propietarios
 * Content extracted from Gamma guide (Spanish)
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
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

export default function GuiaParaPropietarios() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={GUIDE_BG} alt="" className="w-full h-full object-cover" />
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
              Vender, Renovar,<br />
              <em className="italic">Rentar o Mantener.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Orientación para tu próximo paso. Claridad antes de decidir.
            </p>
          </div>
        </div>
      </section>

      {/* ─── UNA VISTA CLARA ─────────────────────────────────────── */}
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
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Esta guía te ayuda a bajar el proceso de la decisión, ver claramente los pros y contras y evitar movimientos innecesarios o costosos antes de decidir.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── PREPARAR VS VENDER ──────────────────────────────────── */}
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

      {/* ─── ESTRATEGIA DE PRECIO ────────────────────────────────── */}
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

      {/* ─── VENDER O RENTAR ─────────────────────────────────────── */}
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

      {/* ─── MANTENER LA PROPIEDAD ──────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Mantener</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              No hacer nada también puede ser estratégico.
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

      {/* ─── VENDER TAL COMO ESTÁ ──────────────────────────────── */}
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
              Vender tu casa tal como está significa ofrecerla en su condición actual, sin hacer reparaciones ni mejoras. No es una estrategia de marketing ni una forma de vender rápido.
            </p>
          </RevealDiv>

          <RevealDiv delay={100} className="mt-8 border border-white/10 p-8">
            <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Qué Considerar</h3>
            <ul className="font-body text-base text-white/70 leading-relaxed space-y-2">
              <li>Los compradores van a inspeccionar y negociar según la condición de la casa</li>
              <li>Puedes recibir ofertas más bajas si el precio no refleja la condición</li>
              <li>Puede tomar más tiempo encontrar al comprador adecuado</li>
              <li>No estás obligado a hacer arreglos</li>
            </ul>
            <p className="font-body text-base text-white/70 leading-relaxed mt-6">
              Esta opción funciona cuando no quieres invertir tiempo ni dinero en preparar la casa, o cuando la propiedad necesita reparaciones que no quieres hacer.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── INTEGRANDO TODO ────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">07. Integrando Todo</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              La mejor decisión depende de cuatro factores clave.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-8">
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
              <RevealDiv key={item.title} delay={i * 100} className="border-t border-[#E8E0D5] pt-6">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6 max-w-2xl mx-auto">
              ¿Listo para explorar tus opciones?
            </h2>
            <p className="font-body text-base text-white/70 mb-10 max-w-lg mx-auto">
              Si quieres hablar sobre tu situación o entender en cuánto podría venderse o rentarse tu casa de forma realista, estoy disponible.
            </p>
            <button onClick={() => { if (typeof window !== 'undefined' && window.LC_API) { window.LC_API.open_chat_window(); } }} className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0">
              Obtener un plan
              <ArrowRight size={14} />
            </button>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
