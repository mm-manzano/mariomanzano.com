/*
 * DESIGN: Quiet Luxury Editorial - Acerca Page
 * Goal: Build trust and personal connection with Mario's brand positioning
 * Sections: Hero, Story, Philosophy, Credentials, Values, CTA
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const ADVISOR_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-advisor-bg-FFo7WwjyuZSVioVNUzZH62.webp";
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-interior-luxury-8ttBRGUkDcTUkKucmQzirD.webp";
const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-hero-bg-Zzemi4ArQkuF2Ww9f72uuW.webp";

// Mario's headshot from the live site (circular crop)
const MARIO_HEADSHOT = "https://mariomanzano.com/images/avatar.jpg";

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

export default function AcercaES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ADVISOR_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/65" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Acerca de Mario
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              El Asesor<br />
              <em className="italic">Detrás de la Estrategia.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Un REALTOR® licenciado que cree que el mejor consejo inmobiliario a veces significa decirte que no vendas.
            </p>
          </div>
        </div>
      </section>

      {/* ─── STORY ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <RevealDiv>
              <div className="relative">
                {/* Try to load Mario's actual headshot, fallback to interior */}
                <div className="aspect-[3/4] overflow-hidden bg-[#E8E0D5]">
                  <img
                    src={INTERIOR_IMG}
                    alt="Oficina de Mario Manzano"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = INTERIOR_IMG;
                    }}
                  />
                </div>

              </div>
            </RevealDiv>

            {/* Text */}
            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01 — Mi Historia</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6">
                Ayudo a propietarios a<br />
                desarrollar <em className="italic">estrategia de venta.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Con frecuencia, los propietarios se sienten presionados a tomar una decisión rápida sin entender completamente sus opciones. Quería crear un tipo diferente de conversación enfocada en la claridad y tus intereses, no en cerrar una transacción.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Como REALTOR® licenciado y Estratega de Ventas, trabajo con propietarios en Cedar Park y Leander para explorar todas sus opciones: vender, remodelar, alquilar o mantener. Mi rol es proporcionar análisis honesto y orientación para que puedas tomar la decisión correcta para tu situación.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                Conozco bien estos vecindarios y entiendo cómo las condiciones del mercado local, los distritos escolares y las tendencias estacionales afectan los valores de las propiedades y la demanda de compradores.
              </p>
              <div className="border-l-2 border-[#B8974A] pl-6 mb-8">
                <p className="font-display text-xl italic font-light text-[#1A1A18] leading-relaxed">
                  "Mi objetivo es que salgas de cada conversación sintiéndote más confiado, no más presionado."
                </p>
                <p className="font-body text-sm text-[#1A1A18]/50 mt-2">— Mario Manzano</p>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28 relative"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-[#F8F5F0]/90" />
        <div className="relative z-10 container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">02 — Mi Filosofía</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-xl">
              Cuatro principios que guían<br />
              <em className="italic">cada relación con clientes.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D5]">
            {[
              {
                num: "01",
                title: "Claridad Antes de Actuar",
                desc: "Antes de hablar sobre listar, preparar o fijar precios, quiero que entiendas exactamente con qué estás trabajando. Tu equidad, tu mercado, tus opciones. Claridad primero.",
              },
              {
                num: "02",
                title: "Tu Cronograma Importa",
                desc: "Tu cronograma de decisión es lo que más importa. Ya sea que estés listo para mudarte en tres meses o quieras explorar opciones durante el próximo año, trabajaremos a tu ritmo.",
              },
              {
                num: "03",
                title: "Decisiones Basadas en Datos",
                desc: "Tu decisión debe basarse en información sólida. Traigo los datos: ventas comparables, tasas de absorción del mercado, patrones de demanda de compradores. Esto te da una base realista para tu decisión.",
              },
              {
                num: "04",
                title: "Orientación Directa",
                desc: "Si tu casa necesita actualizaciones antes de vender, te lo haré saber. Si el momento del mercado sugiere esperar, compartiré esa perspectiva. Recibes orientación honesta sin presión.",
              },
            ].map((item, i) => (
              <RevealDiv key={item.num} delay={i * 80} className="bg-[#F8F5F0] p-8 md:p-10">
                <div className="font-display text-5xl font-light text-[#E8E0D5] mb-4">{item.num}</div>
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CREDENTIALS ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">03 — Credenciales</span>
            </div>
            <h2 className="font-display text-4xl font-light text-[#1A1A18] mb-10 max-w-xl">
              Experiencia que puedes verificar.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "REALTOR® Licenciado",
                body: "Miembro activo en buena posición con la Asociación Nacional de REALTORS®.",
              },
              {
                title: "Asesor de Estrategia de Precios (PSA)",
                body: "Capacitación especializada en análisis de mercado, estrategia de precios y consultoría de vendedores.",
              },
              {
                title: "Miembro, Junta de REALTORS® de Austin (ABOR)",
                body: "Sirviendo al área metropolitana de Austin con experiencia local del mercado.",
              },
              {
                title: "Miembro, Asociación Nacional de REALTORS® (NAR)",
                body: "Parte de la organización profesional de bienes raíces más grande de los Estados Unidos.",
              },
            ].map((cred, i) => (
              <RevealDiv key={cred.title} delay={i * 100} className="border-t border-[#E8E0D5] pt-6">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{cred.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">{cred.body}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-10">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">Lo Que Dicen los Clientes</span>
            </div>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "La parte más útil fue entender todas mis opciones antes de tomar cualquier decisión. No me sentí presionado.",
                name: "Cliente",
                location: "Cedar Park, TX",
              },
              {
                quote: "Aprecié el análisis claro y honesto. Sin discurso de ventas, solo datos y orientación.",
                name: "Cliente",
                location: "Leander, TX",
              },
            ].map((t) => (
              <RevealDiv key={t.name} className="border border-white/10 p-8">
                <div className="font-display text-4xl text-[#B8974A]/30 mb-3 leading-none">"</div>
                <p className="font-display text-xl font-light text-white italic leading-relaxed mb-6">
                  {t.quote}
                </p>
                <div>
                  <div className="font-body text-sm font-medium text-white">{t.name}</div>
                  <div className="font-body text-xs tracking-wide text-white/40 mt-0.5">{t.location}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-xl mx-auto">
              ¿Listo para una conversación real sobre tu casa?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-10 max-w-lg mx-auto">
              Sin presión. Sin discurso de ventas. Solo una conversación honesta sobre tus opciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/es/contacto">
                <span className="btn-luxury inline-flex items-center gap-3">
                  Agenda una Consulta Gratuita
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/es/valor-de-casa">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  Obtén Mi Valor de Casa
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
