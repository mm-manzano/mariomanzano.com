/*
 * DESIGN: Quiet Luxury Editorial - Página de Contacto (Español)
 * FINAL: Meta tags, Open Graph, ContactPage schema, copy en español.
 * BUYERS UPDATE: Franja de Confianza ahora incluye comprar junto a vender/alquilar/remodelar/mantener.
 * SEO FIX: setPageMeta now also writes a <link rel="canonical"> tag, and the
 *       page URL / schema URL both use the trailing-slash form (/es/contacto/) to
 *       match where prerender.js actually writes the file (dist/es/contacto/index.html).
 */

import { useEffect, useRef } from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

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

  // Canonical tag. Without this, Google has to guess which version of the
  // URL (with or without trailing slash) is the real one. Setting it
  // explicitly stops the redirect confusion from recurring on this page.
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

export default function ContactES() {
  useEffect(() => {
    setPageMeta(
      "Contactar a Mario Manzano | Agente de Bienes Raíces en Cedar Park y Leander TX",
      "Contacta a Mario Manzano, REALTOR® en Cedar Park y Leander TX. Sin presión, sin discurso de ventas. Solo una conversación real sobre tu casa y tus opciones.",
      "https://mariomanzano.com/es/contacto/"
    );
  }, []);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contactar a Mario Manzano",
    "url": "https://mariomanzano.com/es/contacto/",
    "description": "Contacta a Mario Manzano, REALTOR® licenciado y estratega de ventas en Cedar Park y Leander, Texas.",
    "mainEntity": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "telephone": "+1-512-695-9255",
      "email": "realtor@mariomanzano.com",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* HERO */}
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
                Contáctame y te ayudaré a pensar en tus opciones y en lo que realmente tiene sentido para tu situación. Sin presión. Solo claridad.
              </p>
              <a
                href={getCTALink("start-conversation", "es")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.fbq) { window.fbq("track", "Contact"); }
                }}
                className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0"
              >
                Iniciar una conversación
                <ArrowRight size={14} />
              </a>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* OPCIONES DE CONTACTO */}
      <section className="py-16 md:py-20 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">O contáctame directamente</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-10 max-w-2xl">
              Elige lo que<br />
              <em className="italic">funcione para ti.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-3xl">
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
                    Llama o manda un mensaje cuando quieras
                  </p>
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MessageSquare size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a
                    href="sms:+15126959255?body=Hola%20Mario,%20tengo%20una%20pregunta%20sobre%20mi%20casa."
                    className="font-body text-lg font-semibold text-[#1A1A18] mb-2 hover:text-[#B8974A]"
                  >
                    Enviar un mensaje
                  </a>
                  <p className="font-body text-sm text-[#1A1A18]/65">
                    Respondo en menos de 24 horas
                  </p>
                </div>
              </div>
            </RevealDiv>

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
                    Escríbeme cuando quieras
                  </p>
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* QUÉ ESPERAR */}
      <section className="py-16 md:py-20">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Qué esperar</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-6 max-w-2xl">
              Una conversación,<br />
              <em className="italic">no una llamada de ventas.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Nuestra primera conversación es simple. Te haré algunas preguntas, entenderé tu situación y te daré una dirección clara basada en tus objetivos. Sin discurso de ventas. Sin presión. Si vender o comprar tiene sentido, te lo digo. Si no lo tiene, también te lo digo.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* FRANJA DE CONFIANZA */}
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
                <span className="section-number" style={{ color: "#D4B878" }}>Sirviendo Cedar Park y Leander TX</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-6">
                Un agente que escucha,<br />
                <em className="italic">no solo vende.</em>
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-lg">
                Trabajo con propietarios en Cedar Park, Leander y el área de Austin que quieren claridad antes de comprometerse con cualquier decisión. Ya sea que estés pensando en vender, alquilar, remodelar, mantener, o comprar tu próxima casa, la conversación siempre empieza de la misma manera: con tu situación, no con un discurso de ventas.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
