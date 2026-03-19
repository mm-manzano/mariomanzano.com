/*
 * DESIGN: Quiet Luxury Editorial - Contact / Consultation Page (Spanish)
 * Goal: Convert visitors into consultation bookings
 * Form: Pure HTML submission to Formspree - NO JAVASCRIPT HANDLERS
 */

import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Phone, Mail, Clock, MapPin } from "lucide-react";

const ADVISOR_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-advisor-bg-FFo7WwjyuZSVioVNUzZH62.webp";
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

export default function ContactES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ADVISOR_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/70" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Inicia la Conversación
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Desarrolla Tu<br />
              <em className="italic">Estrategia de Venta.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Una consulta gratuita y sin compromiso para discutir tu hogar, tus objetivos y tu estrategia de venta. Sin presión. Solo claridad.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left: Info (2 cols) */}
            <div className="lg:col-span-2">
              <RevealDiv>
                <div className="flex items-center gap-3 mb-6">
                  <span className="section-rule" />
                  <span className="section-number">Qué Esperar</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-6">
                  Una conversación,<br />
                  <em className="italic">no una llamada de ventas.</em>
                </h2>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed mb-8">
                  Nuestra primera conversación se trata de entender tu situación: tu hogar, tu cronograma, tus objetivos. Haré preguntas y escucharé. Sin discurso de ventas, sin presión y sin compromiso requerido.
                </p>

                <div className="flex flex-col gap-6 mb-10">
                  {[
                    {
                      icon: <Clock size={16} className="text-[#B8974A]" />,
                      title: "30–45 minutos",
                      desc: "Tiempo suficiente para cubrir tu situación a fondo sin desperdiciar tu tarde.",
                    },
                    {
                      icon: <MapPin size={16} className="text-[#B8974A]" />,
                      title: "Teléfono, Zoom o En Persona",
                      desc: "Lo que funcione para ti. Sirvo Cedar Park, Leander y áreas circundantes.",
                    },
                    {
                      icon: <ArrowRight size={16} className="text-[#B8974A]" />,
                      title: "Te vas con un plan",
                      desc: "Incluso si no estás listo para vender, te irás con claridad sobre tus opciones y próximos pasos.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <h4 className="font-body font-semibold text-sm text-[#1A1A18] mb-1">{item.title}</h4>
                        <p className="font-body text-xs text-[#1A1A18]/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealDiv>
            </div>

            {/* Right: Form (3 cols) - PURE HTML FORM */}
            <div className="lg:col-span-3">
              <RevealDiv delay={150}>
                <form 
                  action="https://formspree.io/f/xdawbgyw" 
                  method="POST"
                  className="bg-white p-8 md:p-10 border border-[#E8E0D5]"
                >
                  <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-8">
                    Agendar una Consulta
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Tu nombre"
                        className="input-luxury"
                      />
                    </div>
                    <div>
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        Número de Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(512) 555-0000"
                        className="input-luxury"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="tu@correo.com"
                      className="input-luxury"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      Dirección de la Propiedad (si aplica)
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Oak Creek Drive, Cedar Park"
                      className="input-luxury"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      ¿Qué Te Gustaría Discutir?
                    </label>
                    <select
                      name="topic"
                      className="input-luxury bg-transparent"
                    >
                      <option value="">Selecciona un tema</option>
                      <option value="sell">Estoy pensando en vender</option>
                      <option value="value">Quiero saber el valor de mi hogar</option>
                      <option value="options">Quiero entender todas mis opciones</option>
                      <option value="timing">Estoy tratando de determinar el momento adecuado</option>
                      <option value="other">Algo más</option>
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      Tu Cronograma
                    </label>
                    <select
                      name="timeline"
                      className="input-luxury bg-transparent"
                    >
                      <option value="">Selecciona un cronograma</option>
                      <option value="asap">Lo antes posible</option>
                      <option value="3months">Dentro de 3 meses</option>
                      <option value="6months">3–6 meses</option>
                      <option value="year">Dentro de un año</option>
                      <option value="exploring">Solo explorando</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      ¿Algo Más Que Deba Saber?
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Cuéntame sobre tu situación, objetivos o cualquier pregunta que tengas..."
                      className="input-luxury resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-luxury w-full justify-center text-center">
                    Enviar Mi Solicitud
                    <ArrowRight size={14} />
                  </button>

                  <p className="font-body text-[11px] text-[#1A1A18]/40 text-center mt-4 leading-relaxed">
                    Respondo a todas las consultas dentro de 24 horas. Tu información es privada y nunca se comparte.
                  </p>
                </form>
              </RevealDiv>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REASSURANCE STRIP ─────────────────────────────────────── */}
      <section
        className="py-16 relative"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-[#1A1A18]/90" />
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="section-number">Por Qué Elegir a Mario</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-6">
              Un agente que escucha,<br />
              <em className="italic">no solo vende.</em>
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-lg">
              Con más de una década de experiencia en bienes raíces de Austin, he ayudado a cientos de familias a navegar el proceso de venta con confianza y claridad. Mi enfoque es simple: entender tus objetivos, proporcionar orientación honesta y entregar resultados.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DIRECT CONTACT ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F5F0]">
        <div className="container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">¿Prefieres Comunicarte Directamente?</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-8">
              Ponte en contacto cuando<br />
              <em className="italic">te funcione.</em>
            </h2>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-[#B8974A] flex-shrink-0" />
                <div>
                  <p className="font-body text-sm font-semibold text-[#1A1A18]">(512) 695-9255</p>
                  <p className="font-body text-xs text-[#1A1A18]/60">Llama o envía un mensaje en cualquier momento</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-[#B8974A] flex-shrink-0" />
                <div>
                  <p className="font-body text-sm font-semibold text-[#1A1A18]">realtor@mariomanzano.com</p>
                  <p className="font-body text-xs text-[#1A1A18]/60">Respondo dentro de 24 horas</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[#E8E0D5]">
              <p className="font-body text-xs text-[#1A1A18]/50">
                Con sede en Cedar Park, sirviendo a Leander, Round Rock y el área metropolitana de Austin.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
