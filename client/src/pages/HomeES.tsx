/*
 * DESIGN: Quiet Luxury Editorial - Página de Inicio (Spanish)
 * Sections: Hero, Intro Strip, Advisor Intro, Services Grid, Testimonial, Process, CTA Band
 * Images: Generated AI hero images (CDN URLs)
 * Typography: Cormorant Garamond headlines, DM Sans body
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-4NeoK6eSrnasPK9gSeTzGq.webp";
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-interior-luxury-8ttBRGUkDcTUkKucmQzirD.webp";
const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-hero-bg-Zzemi4ArQkuF2Ww9f72uuW.webp";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`fade-in-up ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function HomeES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative md:h-screen flex items-start overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Luxury Cedar Park home at dusk"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay: dark at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container py-16 md:py-0 md:pt-32 lg:pt-40 md:pb-16 lg:pb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-10 md:mb-12 pt-4 md:pt-0">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                BIENES RAÍCES EN CEDAR PARK Y LEANDER
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.0] mb-6">
              Tu Hogar.<br />
              Tu Decisión.<br />
              <em className="italic">Tu Asesor.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/75 max-w-xl leading-relaxed mb-10">
              Antes de decidir vender, renovar, rentar o mantener, mereces claridad de alguien que pone tus intereses primero.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/es/valor-de-casa">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Obtén el Valor de Mi Hogar
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/es/contacto">
                <span className="btn-luxury-outline border-white/60 text-white hover:bg-white hover:text-[#1A1A18] inline-flex items-center gap-3">
                  Programar una Consulta
                </span>
              </Link>
            </div>
          </div>
        </div>


      </section>

      {/* ─── INTRO STRIP ─────────────────────────────────────────────── */}
      <section className="bg-[#1A1A18] py-12">
        <div className="container">
          <div className="max-w-2xl">
            <p className="font-body text-base text-white/70 leading-relaxed">
              Ayudo a los propietarios de Cedar Park y Leander a desarrollar una estrategia clara para vender, renovar, rentar o mantener. Mi papel es proporcionar claridad para que puedas tomar la decisión correcta para tu familia.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ADVISOR INTRO ─────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <RevealDiv className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={INTERIOR_IMG}
                  alt="Luxury Texas Hill Country interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealDiv>

            {/* Text */}
            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01. Acerca de</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                Claridad antes de<br />
                <em className="italic">cualquier decisión.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Soy Mario Manzano, REALTOR® autorizado y Asesor de Estrategia de Venta basado en Cedar Park, Texas. Antes de que decidas algo sobre tu hogar, mereces entender todas tus opciones.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                Eso podría significar vender, o podría significar algo más. Mi trabajo es guiarte a través de los datos, los costos y el tiempo para que tomes la decisión que tenga sentido para tu situación.
              </p>
              <Link href="/es/acerca">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  Mi Historia
                  <ArrowRight size={14} />
                </span>
              </Link>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─────────────────────────────────────────── */}
      <section
        className="py-20 md:py-32 relative"
        style={{
          backgroundImage: `url(${TEXTURE_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#F8F5F0]/90" />
        <div className="relative z-10 container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">02. Cómo Ayudo</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-3 max-w-xl">
              Cuatro caminos para explorar.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-12 max-w-lg">
              La mayoría de los propietarios no entienden completamente todas sus opciones. Te ayudo a explorar cada una con datos reales y análisis honesto.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D5]">
            {[
              {
                num: "01",
                title: "Vender",
                desc: "Entiende el mercado, el tiempo y los costos involucrados en vender tu hogar.",
                link: "/es/guia-para-propietarios",
                cta: "Más en la Guía para Propietarios",
              },
              {
                num: "02",
                title: "Renovar",
                desc: "Explora qué mejoras tienen sentido para tu hogar y situación financiera.",
                link: "/es/guia-para-propietarios",
                cta: "Más en la Guía para Propietarios",
              },
              {
                num: "03",
                title: "Rentar",
                desc: "Considera si mantener como alquiler puede servir mejor tus objetivos financieros a largo plazo.",
                link: "/es/guia-para-propietarios",
                cta: "Más en la Guía para Propietarios",
              },
              {
                num: "04",
                title: "Mantener",
                desc: "Evalúa si esperar podría fortalecer tu posición antes de vender.",
                link: "/es/guia-para-propietarios",
                cta: "Más en la Guía para Propietarios",
              },
            ].map((service, i) => (
              <RevealDiv
                key={service.num}
                delay={i * 80}
                className="bg-[#F8F5F0] p-8 md:p-10 group hover:bg-[#1A1A18] transition-colors duration-500"
              >
                <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                  {service.num}
                </div>
                <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-[#1A1A18]/60 group-hover:text-white/60 leading-relaxed mb-6 transition-colors duration-500">
                  {service.desc}
                </p>
                <Link href={service.link}>
                  <span className="font-body text-xs text-[#B8974A] group-hover:text-[#D4B878] transition-colors duration-500 inline-block">
                    {service.cta}
                  </span>
                </Link>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ───────────────────────────────────────────── */}
      <section className="bg-[#1A1A18] py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="max-w-3xl mx-auto text-center">
              <div className="font-display text-6xl text-[#B8974A]/30 mb-4 leading-none">"</div>
              <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed italic mb-8">
                "Lo más valioso fue entender todas mis opciones antes de tomar una decisión. No me sentí presionado a vender."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <span className="section-rule" style={{ background: "#B8974A" }} />
                <div className="text-center">
                  <div className="font-body text-sm font-medium text-white">
                    Testimonio de cliente
                  </div>
                </div>
                <span className="section-rule" style={{ background: "#B8974A" }} />
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── PROCESS STRIP ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">04. Proceso</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-lg">
              Tres conversaciones.<br />
              <em className="italic">Claridad total.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {[
              {
                step: "01",
                title: "Llamada de Descubrimiento",
                desc: "Hablamos sobre tu propiedad, tu cronograma y qué es lo más importante para ti. Sin presión, sin discurso de ventas.",
              },
              {
                step: "02",
                title: "Tu Reporte de Opciones",
                desc: "Preparo un análisis personalizado mostrando cuál es el valor de tu hogar hoy, tus ganancias netas si vendes, y caminos alternativos.",
              },
              {
                step: "03",
                title: "Tu Decisión",
                desc: "Armado con datos reales, tú decides. Ejecuto cualquier camino que elijas con compromiso total y sin juicio.",
              },
            ].map((item, i) => (
              <RevealDiv
                key={item.step}
                delay={i * 100}
                className="relative md:pr-12 md:border-r md:border-[#E8E0D5] last:border-0 last:pr-0 md:pl-12 first:pl-0"
              >
                <div className="font-display text-6xl font-light text-[#E8E0D5] mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">
                  {item.desc}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ──────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A18]/85" />
        </div>
        <div className="relative z-10 container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-6 max-w-2xl mx-auto">
              Obtén claridad sobre tu hogar.
            </h2>
            <p className="font-body text-base text-white/60 mb-10 max-w-lg mx-auto">
              Un análisis gratuito del valor de tu hogar basado en datos de mercado actuales. Sin obligación, sin presión para decidir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/es/valor-de-casa">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Obtén Mi Avalúo Gratuito
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/es/contacto">
                <span className="btn-luxury-outline border-white/50 text-white hover:bg-white hover:text-[#1A1A18] inline-flex items-center gap-3">
                  Programar una Consulta
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
