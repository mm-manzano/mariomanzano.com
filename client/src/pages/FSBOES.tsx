/*
 * DESIGN: Quiet Luxury Editorial - FSBO Page (Spanish)
 * Route: /es/vende-tu-casa
 * Audience: Homeowners selling on their own. Works whether Mario reached them by phone or not.
 * Goal: Useful tips, then what Mario takes over.
 * Sections: Header, Tips, Callout (with strategy hub line), How I Help, No Lock-In, CTA
 * Page ends on the CTA by design, no exits after the ask.
 * Note: No fee or compensation content on this page by design. The call covers it.
 */

import { useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Above the fold: show right away with no fade, so the top of the page is never blank
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible", "no-fade");
      return;
    }
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
  setMeta("og:image", "https://mariomanzano.com/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);
}

const tips = [
  {
    title: "Ponle precio según el mercado, no según un estimado",
    body: "Venga de donde venga tu número, conviene compararlo con lo que realmente está pasando cerca de ti. Las ventas recientes te acercan, pero contra qué estás compitiendo ahora mismo, el estado de la casa y el momento también mueven el precio final, y esa parte requiere criterio.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "La presentación importa más de lo que muchos dueños piensan",
    body: "Aunque tu casa ya esté en el mercado, vuelve a revisar cómo se ve cuando la enseñan. Una limpieza profunda, menos cosas a la vista, quitar las fotos personales y familiares, y arreglar los detalles pequeños pueden hacer una diferencia. Y no olvides las fotos. Las fotos profesionales pueden hacer que tu casa destaque en internet antes de que un comprador cruce la puerta. Atender lo que se nota a simple vista también puede evitar algunos problemas innecesarios en la inspección más adelante.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Filtra a quienes llaman antes de agendar una visita",
    body: "No todas las llamadas son de compradores reales. Antes de fijar una hora, pregunta si trabajan con un agente, si ya están preaprobados y para cuándo necesitan mudarse. La mayoría de los compradores serios espera estas preguntas. Enseña la casa solo con cita, y si recibes varias llamadas a la vez, trata de juntar las visitas en el mismo horario cuando se pueda. Así ahorras tiempo y evitas que gente que solo anda curioseando pase por tu casa.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Mira más allá del precio cuando llegue una oferta",
    body: "La oferta más alta no siempre es la más fuerte. Las reparaciones, las contingencias, los plazos y la forma de pago pueden importar tanto como el número. Algunos inversionistas ponen una casa bajo contrato y luego venden sus derechos a otro comprador para ganarse la diferencia. Si el comprador usa préstamo, confirma que la preaprobación coincida con el precio de la oferta, el tipo de préstamo y el enganche.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Entérate de cuánto te llevas antes de responder a una oferta",
    body: "Una oferta es más que un precio. Los costos de cierre, las reparaciones y la fecha del closing cambian lo que realmente te llevas a casa. Haz tu cálculo primero y luego decide.",
    link: { href: "/es/net-sheet/", label: "Calcula tu ganancia neta" },
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Entiende qué pasa después de aceptar una oferta",
    body: "Aceptar una oferta es solo el comienzo. Asegúrate de entender la inspección, el avalúo, el financiamiento, el calendario hasta el closing y qué pasa si el comprador pide reparaciones. Ten listo con anticipación tu aviso de divulgación del vendedor (seller's disclosure), y asegúrate de entender las fechas límite y a qué te estás comprometiendo antes de firmar.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

const helpSteps = [
  {
    title: "Preparar la casa y ponerle precio",
    body: "Recorremos la casa juntos y señalamos lo que vale la pena retocar antes de las fotos. Luego reviso dónde queda tu casa en el mercado de hoy y te doy un rango con las razones detrás, para que el número final lo decidas tú. Cómo llego a ese rango va mucho más allá de buscar comparables, y prefiero mostrártelo en persona que explicarlo aquí.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Publicarla en el MLS",
    body: "Tu casa llega a los agentes de los compradores y aparece en AustinHomeSearch.com, HAR.com, Realtor.com, Zillow y muchos otros sitios de búsqueda de casas, además de las redes sociales, con fotos profesionales. Eso es solo una parte. Hay mucho más en cómo se posiciona y se presenta un listado, y lo vemos cuando nos reunamos.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Visitas, comentarios y mantener el rumbo",
    body: "Las consultas y las citas me llegan a mí, no a ti. Yo atiendo las llamadas y coordino cada visita, y un lockbox electrónico significa menos visitas sin aviso y un mejor registro de quién entró y cuándo. Recibes una actualización semanal sobre la actividad y los comentarios de las visitas, y si la respuesta no es la que esperábamos, ahí es cuando revisamos el precio o la estrategia, no meses después.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Oferta y negociación",
    body: "Una oferta es más que un número. La reviso completa contigo: reparaciones, contingencias, plazos y financiamiento. Luego negocio los términos con el mismo cuidado que el precio y lo llevo hasta un contrato firmado.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Del contrato al closing",
    body: "Te guío por la inspección, el avalúo y cada fecha límite hasta el día del closing.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

export default function FSBOES() {
  useEffect(() => {
    setPageMeta(
      "Vende Tu Casa por Tu Cuenta en el Área de Austin | Mario Manzano",
      "¿Vendes tu casa por tu cuenta? Aquí tienes algunas cosas que vale la pena saber, y cómo sería trabajar con Mario si quieres un plan de respaldo. Atendemos el área de Austin.",
      "https://mariomanzano.com/es/vende-tu-casa/"
    );
    // Hidden utility page: prevent indexing
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex, nofollow");
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A85C]">
                Venta por el Dueño · Área de Austin
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-6">
              Estás vendiendo tu<br />
              casa por tu cuenta.<br />
              <span className="font-semibold">Eso tiene todo el sentido.</span><br />
              Pero déjame ser tu Plan de Respaldo.
            </h1>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-3 max-w-xl">
              Me imagino que tu teléfono no ha parado desde que pusiste tu casa en el mercado, con agentes, inversionistas y compradores llamándote. Te entiendo. El mío tampoco para. Los mismos inversionistas que te llaman a ti me llaman a mí, buscando una casa que puedan comprar por debajo del mercado, junto con otros agentes y empresas de mercadeo que quieren venderme algo. Por eso quiero que esto te sea útil.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-3 max-w-xl">
              No vengo a convencerte de que no vendas por tu cuenta. Mucha gente lo hace.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed max-w-xl">
              Aquí tienes algunas cosas que vale la pena saber mientras tu casa está en el mercado.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed max-w-xl mt-6 pt-6 border-t border-white/15">
              Si las llamadas se acumulan, una oferta se complica, o prefieres que alguien más se encargue, aquí estoy como tu plan de respaldo.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* TIPS */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">Lo que debes saber mientras tu casa está en el mercado</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] mb-4">
              Lo que suele ayudar a que una venta<br />
              <span className="font-semibold">salga bien por tu cuenta.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
              Aquí hay algunas cosas que vale la pena saber si estás vendiendo por tu cuenta. Toma lo que te sirva. Esto es un punto de partida, no el panorama completo, porque cada casa y cada situación es diferente.
            </p>
          </RevealDiv>

          <div className="flex flex-col gap-8">
            {tips.map((tip, i) => (
              <RevealDiv key={i} delay={i * 60}>
                <div className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "#F0F0F0", color: "#B8974A" }}
                  >
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-lg font-semibold text-[#1A1A18] mb-1 leading-snug">
                      {tip.title}
                    </h3>
                    <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                      {tip.body}
                    </p>
                    {tip.link && (
                      <Link href={tip.link.href} className="tap-area">
                        <span className="font-body text-lg font-medium text-[#7A5F24] underline underline-offset-4 cursor-pointer inline-block mt-2">
                          {tip.link.label}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CALLOUT */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div
              className="rounded-md px-5 py-4 flex flex-col gap-3"
              style={{ background: "#F2F2F2" }}
            >
              <p className="font-body text-lg leading-relaxed" style={{ color: "#1A1A18" }}>
                <strong style={{ color: "#1A1A18" }}>Sobre el precio:</strong> Una casa con precio basado en un estimado puede quedar fuera del mercado, para arriba o para abajo, y acertar requiere más que buscar comparables.
              </p>
              <p className="font-body text-lg leading-relaxed" style={{ color: "#1A1A18" }}>
                <strong style={{ color: "#1A1A18" }}>Sobre el contrato:</strong> Los agentes de los compradores negocian para ganarse la vida, y la mayoría de los vendedores hace esto una sola vez. Los términos y las fechas límite son donde los tratos suelen enredarse.
              </p>
            </div>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mt-10 mb-3">
              ¿Todavía estás pensando si vender o no? El centro de estrategia tiene la calculadora de ingresos netos, la calculadora de vender o rentar y la de remodelar o vender, todo en un solo lugar.
            </p>
            <Link href="/es/strategy-hub/" className="tap-area">
              <span className="font-body text-lg font-medium text-[#7A5F24] underline underline-offset-4 cursor-pointer">
                Abre el centro de estrategia
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* HOW I HELP */}
      <section className="py-20 md:py-28 bg-white border-y border-[#E5E5E5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">Cómo te ayudo</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] mb-4">
              Si prefieres no encargarte de todo eso,<br />
              <span className="font-semibold">esto es de lo que yo me encargo.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
              Lo más difícil, que era decidir vender, ya lo hiciste. Esto es lo que cambia cuando yo me encargo del resto, desde la preparación hasta el closing.
            </p>
          </RevealDiv>

          <div className="flex flex-col gap-8">
            {helpSteps.map((step, i) => (
              <RevealDiv key={i} delay={i * 80}>
                <div className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "#F0F0F0", color: "#B8974A" }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-lg font-semibold text-[#1A1A18] mb-1 leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* NO LOCK-IN */}
      <section className="py-16 md:py-20">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="rounded-md border border-[#B8974A] px-6 py-8 md:px-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="section-rule" style={{ background: "#B8974A" }} />
                <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">Sin ataduras</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-medium text-[#1A1A18] mb-4">
                Si no está funcionando,<br />
                <span className="font-semibold">no tienes que quedarte.</span>
              </h2>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                Un contrato de listado no debería sentirse como una trampa. Si listas conmigo y no estás conforme con cómo van las cosas, puedes irte. Vemos exactamente cómo funciona eso cuando nos reunamos.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A85C]">
                Hablemos
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-4">
              Veamos si tiene sentido<br />
              <span className="font-semibold">trabajar juntos.</span>
            </h2>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-8 max-w-lg">
              Esta página es lo básico. El verdadero valor está en sentarnos a platicar, incluyendo cómo le pondría precio a tu casa en específico. Si ya tenemos una hora apartada, trae lo que hayas reunido hasta ahora, como ofertas, comentarios de las visitas o preguntas que hayan surgido. Te diré con franqueza si creo que puedo ayudarte. Sin presión, sea cual sea tu decisión.
            </p>
            <Link href="/es/contacto/">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] inline-flex items-center gap-3 cursor-pointer">
                Agendar una Cita
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

    </div>
  );
}
