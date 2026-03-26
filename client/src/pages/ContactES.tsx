/*
 * DESIGN: Quiet Luxury Editorial - Contact / Consultation Page (Spanish)
 * Goal: Conversion-focused with primary CTA button above the fold
 * Structure: Hero with primary CTA → Secondary options → Reassurance
 * NO FORMS - Direct contact channels only
 */

import { useRef, useEffect } from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { ArrowRight } from "lucide-react";

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
      {/* ─── HERO SECTION WITH PRIMARY CTA ──────────────────────────── */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ADVISOR_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/70" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <RevealDiv>
              <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
                Inicia la<br />
                <em className="italic">conversación.</em>
              </h1>
              <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed mb-10">
                Comunícate conmigo y te ayudaré a pensar tus opciones y lo que realmente tiene sentido para tu situación. Sin presión. Solo claridad.
              </p>
              
              {/* PRIMARY CTA BUTTON */}
              <a href="#book-call">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 text-lg">
                  Iniciar una Conversación
                  <ArrowRight size={18} />
                </span>
              </a>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── SECONDARY CONTACT OPTIONS ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">O comunícate directamente</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-10 max-w-2xl">
              Elige lo que funcione<br />
              <em className="italic">mejor para ti.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-3xl">
            {/* Call or Text */}
            <RevealDiv delay={100}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a href="tel:(512)695-9255" className="font-body text-lg font-semibold text-[#1A1A18] mb-2 hover:text-[#B8974A] transition-colors no-underline block">
                    (512) 695-9255
                  </a>
                  <p className="font-body text-sm text-[#1A1A18]/65">
                    Llama o envía un mensaje
                  </p>
                </div>
              </div>
            </RevealDiv>

            {/* Send a Message */}
            <RevealDiv delay={150}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MessageSquare size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a href="#contact-message" className="font-body text-lg font-semibold text-[#1A1A18] mb-2 hover:text-[#B8974A] transition-colors no-underline block">
                    Enviar un Mensaje
                  </a>
                  <p className="font-body text-sm text-[#1A1A18]/65">
                    Respondo dentro de 24 horas
                  </p>
                </div>
              </div>
            </RevealDiv>

            {/* Email */}
            <RevealDiv delay={200}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a href="mailto:realtor@mariomanzano.com" className="font-body text-lg font-semibold text-[#1A1A18] mb-2 hover:text-[#B8974A] transition-colors no-underline block">
                    realtor@mariomanzano.com
                  </a>
                  <p className="font-body text-sm text-[#1A1A18]/65">
                    Envía un correo en cualquier momento
                  </p>
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── EXPECTATION SETTING ───────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Qué esperar</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-6 max-w-2xl">
              Una conversación,<br />
              <em className="italic">no una venta.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Nuestra primera conversación es simple. Haré algunas preguntas, entenderé tu situación y te daré una dirección clara basada en tus objetivos. Sin discurso de ventas. Sin presión.
            </p>
          </RevealDiv>
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
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" style={{ background: "#D4B878" }} />
                <span className="section-number">Por Qué Elegir a Mario</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-6">
                Un asesor que escucha,<br />
                <em className="italic">no solo vende.</em>
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-lg">
                Primero entiendo tu situación, luego te guío hacia la opción que realmente tiene sentido.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
