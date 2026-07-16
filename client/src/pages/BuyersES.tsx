/*
 * DESIGN: Quiet Luxury Editorial - Buyers Page (Spanish)
 * Matches homepage theme: same fonts, colors, RevealDiv scroll animation,
 * same button styles, same section rhythm (label + headline + copy).
 * Sections: Hero, Trust Strip, Search Homes Direct Path, About, How I Help Buyers (grid),
 *           How This Works, Final CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-4NeoK6eSrnasPK9gSeTzGq.webp";
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-interior-luxury-8ttBRGUkDcTUkKucmQzirD.webp";

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

export default function BuyersEs() {
  useEffect(() => {
    setPageMeta(
      "Comprador en Cedar Park y Leander TX | Mario Manzano",
      "Mario Manzano ayuda a compradores en Cedar Park, Leander y el área de Austin a comprar sin pagar de más y con confianza. Números claros, sin presión.",
      "https://mariomanzano.com/es/buyers"
    );
  }, []);

  const buyerServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Representación para Compradores",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "telephone": "+1-512-695-9255",
      "url": "https://mariomanzano.com"
    },
    "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"],
    "url": "https://mariomanzano.com/es/buyers",
    "description": "Mario Manzano ayuda a compradores en Cedar Park, Leander y el área de Austin a entender el valor real de una casa antes de hacer una oferta, para que no paguen de más."
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buyerServiceSchema) }}
      />

      {/* HERO */}
      <section className="relative h-auto md:min-h-[70vh] flex items-start">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Casa en Cedar Park para compradores" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 container py-16 md:py-0 md:pt-32 lg:pt-40 md:pb-16 lg:pb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-10 md:mb-12 pt-4 md:pt-0">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                BIENES RAÍCES EN CEDAR PARK Y LEANDER
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.0] mb-6">
              Compra Inteligente.<br />
              No Rápida.<br />
              <em className="italic">Con Confianza.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/75 max-w-xl leading-relaxed mb-10">
              La mayoría de los compradores solo quieren saber que están pagando un precio justo. Te ayudo a entender los números antes de hacer una oferta, para que puedas avanzar con confianza en lugar de adivinar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/es/contacto">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                  Iniciar una Conversación
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[#1A1A18] py-12">
        <div className="container">
          <div className="max-w-2xl">
            <p className="font-body text-base text-white/70 leading-relaxed">
              Ayudo a compradores en Cedar Park, Leander y el área de Austin a entender cuánto vale realmente una casa antes de hacer una oferta. Mi trabajo es darte los hechos, explicarte tus opciones, y ayudarte a comprar con confianza en lugar de presión.
            </p>
          </div>
        </div>
      </section>

      {/* BUSCAR CASAS - RUTA DIRECTA */}
      <section className="py-16 border-b border-[#E8E0D5]">
        <div className="container">
          <div className="max-w-4xl">
            <p className="font-body text-[10px] tracking-[0.25em] uppercase text-[#B8974A] mb-3">¿Listo para empezar a buscar?</p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-3">
              Busca casas en Cedar Park y Leander.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 max-w-lg leading-relaxed mb-8">
              Explora las propiedades activas y mira lo que hay disponible ahora mismo, luego hablamos sobre lo que realmente se ajusta a tu situación.
            </p>
            <div className="bg-white p-4 md:p-6 shadow-sm border border-[#E8E0D5]">
              <iframe
                style={{ width: "100%", height: "300px" }}
                src="https://mariomanzano.exprealty.com/wide.php"
                allowTransparency={true}
                frameBorder="0"
                title="Herramienta de Búsqueda de Casas"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / CREDIBILITY */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={INTERIOR_IMG} alt="Interior de una casa" className="w-full h-full object-cover" />
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01. Sobre Mí</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                Un estratega,<br />
                <em className="italic">no un vendedor.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Soy Mario Manzano, REALTOR® con licencia y con base en Leander, Texas. He comprado y vendido propiedades, manejado un Airbnb, hecho remodelaciones viviendo en la casa, y tenido propiedades de renta. Analizo cada casa como lo haría un inversionista, cuánto vale en realidad, cuánto te costará después, y si el precio tiene sentido.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                Cuando estés listo para hacer una oferta, sabrás exactamente en dónde estás parado y por qué.
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

      {/* HOW I HELP BUYERS GRID */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">02. Cómo Ayudo</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-3 max-w-xl">
              Cómo se ve comprar conmigo.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-12 max-w-lg">
              Sin presión para apurarte. Solo una lectura clara de los números antes de comprometerte a algo.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D5]">
            {[
              { num: "01", title: "El Valor", desc: "Descubre cuánto vale realmente una casa basado en ventas comparables, no solo en el precio de lista." },
              { num: "02", title: "La Oferta", desc: "Construimos una oferta que te protege en precio y en términos, no solo el número más alto que puedes pagar." },
              { num: "03", title: "La Condición", desc: "Entiende cuánto costarán las reparaciones o actualizaciones antes de que se conviertan en tu problema." },
              { num: "04", title: "El Cierre", desc: "Nos mantenemos al tanto de inspecciones, avalúos y papeleo para que nada te tome por sorpresa." }
            ].map((item, i) => (
              <RevealDiv
                key={item.num}
                delay={i * 80}
                className="bg-[#F8F5F0] p-8 md:p-10 group hover:bg-[#1A1A18] transition-colors duration-500"
              >
                <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                  {item.num}
                </div>
                <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="font-body text-base text-[#1A1A18]/60 group-hover:text-white/60 transition-colors duration-500">
                  {item.desc}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* HOW THIS WORKS */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Cómo Funciona</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12">
              Tres pasos,<br />
              <em className="italic">sin presión.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Me contactas",
                desc: "Sin formularios, sin presión. Cuéntame qué estás buscando y en qué parte del proceso estás."
              },
              {
                step: "02",
                title: "Revisamos los números",
                desc: "Consigo comparables reales y te explico cuánto vale realmente la casa antes de tomar cualquier decisión."
              },
              {
                step: "03",
                title: "Haces tu movimiento",
                desc: "Cuando estés listo para hacer una oferta, sabrás exactamente en dónde estás parado. El ritmo siempre es tuyo."
              }
            ].map((item, i) => (
              <RevealDiv key={item.step} delay={i * 100}>
                <div className="border-t-2 border-[#B8974A] pt-6">
                  <p className="font-display text-4xl font-light text-[#E8E0D5] mb-4">{item.step}</p>
                  <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                  <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
                </div>
              </RevealDiv>
            ))}
          </div>

          <RevealDiv delay={300} className="mt-12">
            <Link href="/es/contacto">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Iniciar una Conversación
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="bg-[#1A1A18] py-20 md:py-32 text-center">
        <div className="container">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
              ¿Listo para comprar con confianza?
            </h2>
            <p className="font-body text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Sin presión de venta. Solo una conversación honesta sobre lo que buscas y cuánto vale realmente.
            </p>
            <Link href="/es/contacto">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Iniciar una Conversación
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
