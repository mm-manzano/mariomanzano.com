/*
 * DESIGN: Quiet Luxury Editorial - About Page (Spanish)
 * Goal: Personal, real, based on lived experience
 * Sections: Intro, How It Started, Real Experience, Approach, Family, How I Work, Close
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const ADVISOR_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-advisor-bg-FFo7WwjyuZSVioVNUzZH62.webp";
const MARIO_HEADSHOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg";
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

export default function AboutES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* SECTION 1: INTRO */}
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

      {/* SECTION 2: HOW IT STARTED */}
      <section className="py-16 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <RevealDiv>
              <div className="relative">
                <div className="overflow-hidden bg-[#E8E0D5]">
                  <img
                    src={MARIO_HEADSHOT}
                    alt="Mario Manzano"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01. Cómo Empezó</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6">
                De la deuda a<br />
                <em className="italic">bienes raíces.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Encontré a Dave Ramsey mientras estaba miles de dólares en deuda. Eso lo cambió todo. Me comprometí a salir de la deuda, ahorré agresivamente y cambié cómo pensaba sobre el dinero.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Una vez que salí de la deuda, quería independencia financiera. Mientras comenzaba a investigar qué hacer a continuación, todo seguía apuntando hacia bienes raíces.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Pasé tiempo en BiggerPockets, leí libros y comencé a entender cómo la gente realmente construye riqueza a través de invertir.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Esa investigación me llevó a obtener mi licencia como REALTOR®. Pero lo más importante fue que cambió cómo abordé la inversión, me impulsó a seguir construyendo mi cartera, y me permitió ayudar a otros a navegar sus propias decisiones de bienes raíces.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Los bienes raíces siempre han estado alrededor de mí. Mis padres y hermanos son todos propietarios de inmuebles.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 3: REAL EXPERIENCE */}
      <section className="py-16 md:py-28 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="section-number text-[#D4B878]">02. Experiencia Real</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-12 max-w-2xl">
              He vivido a través de<br />
              <em className="italic">las decisiones.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 max-w-4xl items-start">
            <RevealDiv delay={100}>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                No aprendí bienes raíces solo de cursos. He tenido que tomar las decisiones yo mismo.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                He comprado y vendido propiedades, comprado deals fuera del mercado, volteado terrenos y tomado proyectos como demoler una propiedad y vender el terreno. También he hecho renovaciones de vivienda, poseído alquileres y he sido propietario durante aproximadamente una década. He usado préstamos DSCR en mis propias inversiones, así que entiendo cómo se evalúan los deals basados en el desempeño de la propiedad, no solo en los ingresos personales.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                Mi esposa y yo construimos y operamos un Airbnb. Lo renovamos y amueblamos nosotros mismos y nos convertimos en anfitriones de 5 estrellas. Cuando dejó de funcionar, lo cerramos y pasamos al alquiler a largo plazo, que funcionó mejor.
              </p>
            </RevealDiv>

            <RevealDiv delay={200}>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                Una gran parte de cómo abordamos los hogares proviene de nuestro ojo para el diseño. Ella es especialmente fuerte en esta área. Desde nuestro Airbnb hasta nuestra propia casa, propiedades que hemos vendido y los clientes que hemos ayudado, hemos estado muy involucrados en el diseño, la distribución y la presentación. Eso se refleja en cómo ayudamos a los clientes a preparar y presentar sus hogares de una manera que conecta con los compradores.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                Eso incluye todo, desde decisiones de renovación completa hasta cambios simples como la colocación de muebles, la organización y los toques finales que hacen que un hogar se sienta bien para los compradores.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Estas fueron decisiones reales con consecuencias reales. El tipo que no olvidas, y el tipo que cambia cómo guías a otros.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 4: APPROACH */}
      <section className="py-16 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03. Mi Enfoque</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              Vender no siempre es<br />
              <em className="italic">la mejor opción.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl">
            <RevealDiv delay={100}>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-6">
                La mayoría de las personas se sienten presionadas a tomar una decisión rápida sobre su hogar. No están seguros de cuáles son sus opciones. No tienen números claros. Así que se apresuran.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Ayudo a las personas a pensar en sus decisiones en lugar de presionarlas. Mantener puede crear más valor que vender. Alquilar puede tener más sentido que vender. Mejorar la propiedad primero puede cambiarlo todo.
              </p>
            </RevealDiv>

            <RevealDiv delay={200}>
              <div className="border-l-2 border-[#B8974A] pl-6">
                <p className="font-display text-xl italic font-light text-[#1A1A18] leading-relaxed mb-4">
                  "El mejor consejo que puedo dar a veces es esperar. O mantener. O mejorar la propiedad primero. Lo que tenga sentido para tu situación."
                </p>
                <p className="font-body text-sm text-[#1A1A18]/50">Mario Manzano</p>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAMILY */}
      <section
        className="py-20 md:py-28 relative"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-[#F8F5F0]/90" />
        <div className="relative z-10 container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">04. Familia</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              Casado con<br />
              <em className="italic">dos hijos.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-4xl">
            <RevealDiv delay={100}>
                <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed md:mb-6 mb-3">
                Estoy casado con mi amor de la secundaria. Tenemos dos hijos y ahora somos nidos vacíos. Nuestro hijo hizo un house hack en su primer hogar después de la universidad, lo cual fue una gran experiencia para ambos.
              </p>
            </RevealDiv>

            <RevealDiv delay={200} className="-mt-3 md:mt-0">
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Nuestra hija está estudiando Gestión del Diseño con especialidades en Marketing y Decoración del Hogar, y planea obtener su licencia de bienes raíces para que podamos trabajar juntos y ayudar a los clientes a un nivel más profundo. Los bienes raíces son parte de la vida de nuestra familia, no solo mi trabajo.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW I WORK */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Cómo Trabajo</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              Tres principios que<br />
              <em className="italic">guían todo lo que hago.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <RevealDiv delay={100}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#B8974A] text-white font-display text-lg font-light">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-light text-[#1A1A18] mb-2">Claridad Sobre Presión</h3>
                  <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">
                    Quiero que entiendas exactamente qué tienes, cuál es tu mercado y cuáles son tus opciones. Claridad primero.
                  </p>
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#B8974A] text-white font-display text-lg font-light">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-light text-[#1A1A18] mb-2">Compensaciones Sobre Opiniones</h3>
                  <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">
                    Cada opción tiene compensaciones. Vender, alquilar, mejorar o esperar. Quiero que las entiendas todas.
                  </p>
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={200}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#B8974A] text-white font-display text-lg font-light">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-light text-[#1A1A18] mb-2">El Tiempo Importa</h3>
                  <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">
                    Tu cronograma es lo que importa. Trabajaremos al tuyo, no al mío.
                  </p>
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 7: CREDENTIALS */}
      <section className="py-20 md:py-32 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="section-number text-[#D4B878]">06. Credenciales</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-10 max-w-2xl">
              Experiencia<br />
              <em className="italic">comprobable.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {[
              {
                title: "REALTOR® Licenciado",
                body: "Miembro activo en buen estado con la Asociación Nacional de REALTORS®.",
              },
              {
                title: "Asesor en Estrategia de Precios (PSA)",
                body: "Formación especializada en estrategia de precios, análisis de mercado y toma de decisiones basada en datos.",
              },
              {
                title: "Miembro, Asociación de REALTORS® de Austin (ABOR)",
                body: "Sirviendo el área metropolitana de Austin con experiencia local.",
              },
              {
                title: "Miembro, Asociación Nacional de REALTORS® (NAR)",
                body: "Parte de la organización profesional inmobiliaria más grande de Estados Unidos.",
              },
            ].map((cred, i) => (
              <RevealDiv key={cred.title} delay={i * 100} className="border-t border-white/10 pt-6">
                <h3 className="font-display text-lg font-light text-white mb-2">{cred.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">{cred.body}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CLOSE */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ADVISOR_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/85" />
        </div>
        <div className="relative z-10 container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-6 max-w-2xl mx-auto">
              Entendiendo tu situación.
            </h2>
            <p className="font-body text-base text-white/60 mb-10 max-w-lg mx-auto">
              Una consulta donde revisamos tu hogar, tus opciones y qué tiene sentido para tu situación específica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={getCTALink("start-conversation", "es")}>
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Iniciar una Conversación
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
