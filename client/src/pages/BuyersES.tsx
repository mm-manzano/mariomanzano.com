/*
 * DESIGN: Quiet Luxury Editorial - Buyers Page (Spanish) — Move-Up Buyer Primary, All Buyers Welcome
 * Mirrors the English Buyers.tsx structure exactly.
 * Core message: No solo busques una casa. Entiende el paso.
 * SEO FIX: setPageMeta also writes a <link rel="canonical"> tag.
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const HERO_IMG = "/images/austin-texas-real-estate-home.jpg";
const INTERIOR_IMG = "/images/cedar-park-tx-sold-home-clover-ridge-mario-manzano-interior.jpg";

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
  setMeta("og:image", "/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

export default function BuyersEs() {
  useEffect(() => {
    setPageMeta(
      "Compradores en Cedar Park y Leander TX | Mario Manzano",
      "¿Comprando una casa en Cedar Park o Leander? Mario Manzano te ayuda a entender los números y el momento correcto antes de decidir, ya sea que tengas una casa o estés comprando por primera vez.",
      "https://mariomanzano.com/es/buyers/"
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
    "url": "https://mariomanzano.com/es/buyers/",
    "description": "Mario Manzano ayuda a compradores en Cedar Park y Leander a entender cuánto vale realmente una casa y cómo organizar el proceso antes de comprometerse a algo."
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
          <img src={HERO_IMG} alt="Casa en Cedar Park" className="w-full h-full object-cover" />
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
              No solo busques<br />
              una casa.<br />
              <em className="italic">Entiende el paso.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/75 max-w-xl leading-relaxed mb-10">
              Ya sea que tengas una casa o estés comprando por primera vez, la pregunta más importante es la misma: ¿los números tienen sentido antes de comprometerte? Ayudo a compradores en Cedar Park y Leander a tener esa claridad antes de hacer una oferta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/es/contacto/">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                  Hablemos de tu Situación
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
              Trabajo principalmente como agente de listado en Cedar Park y Leander. Eso significa que veo lo que ven los vendedores, cuánto valen realmente las casas y dónde suelen pagar de más los compradores. Cuando trabajo contigo como comprador, esa experiencia viene incluida.
            </p>
          </div>
        </div>
      </section>

      {/* LA PREGUNTA REAL */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={INTERIOR_IMG} alt="Interior de una casa en Cedar Park" className="w-full h-full object-cover" />
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01. La Pregunta Real</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                ¿Vender primero,<br />
                <em className="italic">o comprar primero?</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Si ya tienes una casa, esta pregunta lo define todo. La respuesta depende de tu capital, tu tiempo y cómo está el mercado ahora mismo. Equivocarse puede significar pagar dos hipotecas a la vez o buscar una renta de emergencia en medio del proceso.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                Esa es la conversación que hay que tener antes de ponerse a buscar casas. Una vez que sepas cuánto vale tu casa y cuánto puedes recibir, todo lo demás se aclara.
              </p>
              <Link href="/es/presentacion-vendedores/">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  Así Manejo las Ventas
                  <ArrowRight size={14} />
                </span>
              </Link>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* HOW I HELP */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">02. Cómo Ayudo</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-3 max-w-xl">
              Los dos lados del proceso.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-12 max-w-lg">
              Comprar es más que encontrar una casa. Te ayudo a ver todo el panorama.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E0D5]">
            {[
              {
                num: "01",
                title: "El Valor",
                desc: "¿Cuánto vale realmente esta casa y cuánto te costará después? Ese es el número que necesitas antes de hacer cualquier oferta, sin importar lo que diga el precio de lista."
              },
              {
                num: "02",
                title: "El Momento",
                desc: "Si ya tienes una casa, vender primero o comprar primero no tiene una sola respuesta. Revisamos tu situación, el mercado y tu tiempo para encontrar el orden correcto."
              },
              {
                num: "03",
                title: "La Próxima Casa",
                desc: "Una vez que los números tienen sentido, encontrar la casa correcta se vuelve mucho menos complicado. Sabrás tu presupuesto, tu tiempo y con qué cuentas."
              }
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
              Empieza con una<br />
              <em className="italic">conversación real.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Me contactas",
                desc: "Sin formularios, sin presión. Cuéntame en qué parte del proceso estás y qué estás buscando."
              },
              {
                step: "02",
                title: "Revisamos los números",
                desc: "Te explico cuánto vale realmente la casa, qué muestran las ventas comparables y cómo eso define tus opciones."
              },
              {
                step: "03",
                title: "Decides qué hacer",
                desc: "Algunos están listos para moverse. Otros necesitan más tiempo. De cualquier forma, tendrás todo claro para decidir con confianza."
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
            <Link href="/es/contacto/">
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
              ¿Listo para entender<br />
              <em className="italic">el paso?</em>
            </h2>
            <p className="font-body text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Sin presión. Solo una conversación honesta sobre cómo se ven los números y qué tiene sentido para tu situación.
            </p>
            <Link href="/es/contacto/">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Hablemos de tu Situación
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
