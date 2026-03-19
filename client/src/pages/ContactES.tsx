/*
 * DESIGN: Quiet Luxury Editorial - Contact / Consultation Page (Spanish)
 * Goal: Direct call-to-action layout with contact information
 * NO FORMS - Direct contact channels only
 */

import { useRef, useEffect } from "react";
import { Phone, Mail } from "lucide-react";

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
      {/* ─── HERO SECTION ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
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
              <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
                Comunícate directamente y te ayudo a entender tu mejor opción. Sin presión. Solo claridad.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── CONTACT OPTIONS ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Contáctame cuando te sea conveniente.</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              Contáctame<br />
              <em className="italic">directamente.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-3xl">
            {/* Phone */}
            <RevealDiv delay={100}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Phone size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a href="tel:(512)695-9255" className="font-display text-2xl font-light text-[#1A1A18] mb-2 hover:text-[#B8974A] transition-colors no-underline">
                    (512) 695-9255
                  </a>
                  <p className="font-body text-base text-[#1A1A18]/65">
                    Llama o envía mensaje cuando quieras
                  </p>
                </div>
              </div>
            </RevealDiv>

            {/* Email */}
            <RevealDiv delay={150}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Mail size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a href="mailto:realtor@mariomanzano.com" className="font-display text-2xl font-light text-[#1A1A18] mb-2 hover:text-[#B8974A] transition-colors no-underline">
                    realtor@mariomanzano.com
                  </a>
                  <p className="font-body text-base text-[#1A1A18]/65">
                    Respondo dentro de 24 horas
                  </p>
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── EXPECTATION SETTING ───────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Qué puedes esperar</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Una conversación,<br />
              <em className="italic">no una llamada de ventas.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Nuestra primera conversación es sencilla. Haré algunas preguntas para entender tu situación y te daré una dirección clara basada en tus objetivos. Sin presión y sin compromiso.
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
                Un agente que escucha,<br />
                <em className="italic">no solo vende.</em>
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-lg">
                Con más de una década de experiencia en bienes raíces de Austin, he ayudado a cientos de familias a navegar el proceso de venta con confianza y claridad. Mi enfoque es simple: entender tus objetivos, proporcionar orientación honesta y entregar resultados.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
