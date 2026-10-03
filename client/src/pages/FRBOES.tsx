/*
 * DESIGN: Quiet Luxury Editorial - Leasing Page (Spanish)
 * Route: /es/renta-tu-casa
 * Audience: Homeowners who have listed their property for rent on their own.
 *           Works whether Mario reached them by phone or not.
 * Goal: Educate, build trust, and offer leasing-only service
 * Sections: Header, What Separates Rentals, MLS Exposure Table + Vacancy
 *           Calculator, How I Handle It (timeline), Fee Block,
 *           What If Renting Isn't Right, CTA
 * Page ends on the CTA by design, no exits after the ask.
 */

import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

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
}

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function VacancyCalculator() {
  const [rent, setRent] = useState(1800);
  const [months, setMonths] = useState(1);

  const { expected, actual, effective, lost } = useMemo(() => {
    const expectedAnnual = rent * 12;
    const actualAnnual = rent * (12 - months);
    const effectiveMonthly = actualAnnual / 12;
    return {
      expected: expectedAnnual,
      actual: actualAnnual,
      effective: effectiveMonthly,
      lost: expectedAnnual - actualAnnual,
    };
  }, [rent, months]);

  return (
    <div className="rounded-md border border-[#E5E5E5] bg-white p-6 md:p-8">
      <p className="font-body text-sm font-semibold tracking-[0.1em] uppercase text-[#7A5F24] mb-5">
        Mira cuánto cuesta realmente tener la propiedad vacía
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="font-body text-sm text-[#2B2B2B] block mb-2">
            Renta mensual
          </label>
          <div className="flex items-center gap-2">
            <span className="font-body text-lg font-semibold text-[#1A1A1A]">$</span>
            <input
              type="number"
              min={0}
              step={50}
              value={rent}
              onChange={(e) => setRent(Math.max(0, Number(e.target.value) || 0))}
              className="font-body text-lg font-semibold w-full border border-[#767676] rounded px-3 py-2 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A]"
            />
          </div>
        </div>

        <div>
          <label className="font-body text-sm text-[#2B2B2B] block mb-2">
            Meses sin rentar: <span className="font-semibold text-[#1A1A18]">{months}</span>
          </label>
          <input
            type="range"
            min={0}
            max={6}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full range-visible mt-3"
          />
          <div className="flex justify-between font-body text-lg text-[#2B2B2B] mt-1">
            <span>0</span>
            <span>6 meses</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E5E5] pt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <p className="font-body text-lg text-[#2B2B2B] mb-1">Un año completo con esta renta</p>
          <p className="font-body text-2xl font-semibold text-[#1A1A18]">{formatMoney(expected)}</p>
        </div>
        <div>
          <p className="font-body text-lg text-[#2B2B2B] mb-1">Lo que realmente cobrarías</p>
          <p className="font-body text-2xl font-semibold text-[#1A1A18]">{formatMoney(actual)}</p>
        </div>
        <div>
          <p className="font-body text-lg text-[#2B2B2B] mb-1">Tu renta mensual real durante el año</p>
          <p className="font-body text-2xl font-semibold text-[#A05030]">{formatMoney(effective)}</p>
        </div>
      </div>

      {months > 0 && (
        <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mt-5 pt-5 border-t border-[#E5E5E5]">
          {months} {months === 1 ? "mes sin rentar" : "meses sin rentar"} con una renta de {formatMoney(rent)} significa {formatMoney(lost)} de renta que no recuperas. Repartido en todo el año, tu renta de {formatMoney(rent)} en realidad equivale a {formatMoney(effective)} al mes.
        </p>
      )}
    </div>
  );
}

const points = [
  {
    title: "Ponle precio según el mercado, no según un estimado",
    body: "Venga de donde venga tu número de renta, conviene compararlo con lo que realmente está pasando cerca. Las rentas recientes te acercan, pero contra qué estás compitiendo ahora mismo, el estado de la propiedad y el momento también mueven el número final, y esa parte requiere criterio.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "La presentación y las fotos importan más de lo que muchos dueños piensan",
    body: "Una limpieza profunda, retoques pequeños y fotos de verdad cambian cómo se ve tu propiedad y qué tan rápido se renta. Muchos dueños usan fotos del celular, pero la fotografía profesional ayuda a que tu anuncio destaque antes de que alguien pise la propiedad. Si necesitas ayuda para dejarla lista, te puedo conectar con contratistas locales de confianza.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Las visitas y las llamadas se acumulan rápido",
    body: "Muchas consultas no se van a convertir en solicitantes reales. Haz unas preguntas rápidas antes de agendar, como la fecha en que quieren mudarse, si cumplen con tus requisitos de ingresos y si tienen mascotas. Luego junta las visitas en bloques de horario para que un solo anuncio no se coma toda tu semana.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Revisa bien a los solicitantes antes de encariñarte con uno",
    body: "Una buena plática por teléfono no es suficiente. Los ingresos, el crédito y el historial de renta te dan una mejor idea de a quién le estás entregando tus llaves.",
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
    title: "Documenta cómo está la propiedad antes de entregar las llaves",
    body: "Unas fotos o una lista sencilla al momento de la mudanza te protegen si después hay una disputa por el depósito. Toma unos minutos, y es de lo primero que se saltan los dueños que manejan su propia renta.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Un contrato de renta que de verdad te proteja",
    body: "Las plantillas gratis de internet pueden dejar fuera cláusulas importantes, avisos obligatorios o términos específicos de tu propiedad. Un contrato que te protege es más que uno que simplemente suena oficial.",
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

const processSteps = [
  {
    title: "Preparar la propiedad y ponerle precio",
    body: "Recorremos la propiedad juntos y señalamos qué limpiar, mover o retocar antes de subir las fotos. Luego reviso lo que está pasando en el mercado ahorita y dónde queda tu propiedad. Recibes un rango de renta con las razones detrás, y el número final lo decides tú. Cómo llego a ese rango va mucho más allá de buscar comparables, y prefiero mostrártelo en persona que explicarlo aquí.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Publicarla en el MLS",
    body: "Tu propiedad sale por el MLS y aparece en AustinHomeSearch.com, HAR.com, Realtor.com, Apartments.com, Zillow y muchos otros sitios de renta, además de las redes sociales, con fotos profesionales y un volante con los detalles y las mejoras.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Visitas y revisión de solicitantes",
    body: "Yo coordino cada visita y reviso primero a los solicitantes antes de que alguien entre, para que no le abras la puerta a gente que no encaja. Con quienes cumplen tus requisitos, ayudo a coordinar la revisión de ingresos, crédito e historial de renta.",
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
    title: "Tú decides, yo me encargo del resto",
    body: "Recibes el panorama completo de cada solicitante, y la decisión final es tuya. Una vez que escoges, ayudo a resolver cualquier petición sobre los términos, como la fecha de mudanza o la duración del contrato, antes de que se firme nada.",
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
    title: "Contrato firmado",
    body: "Cuando el contrato de renta se firma, mi trabajo termina.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

const labelLight = "font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]";
const labelDark = "font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A85C]";

export default function LeasingES() {
  useEffect(() => {
    setPageMeta(
      "Renta Tu Propiedad en el Área de Austin | Mario Manzano",
      "¿Ya publicaste tu propiedad en renta? Mario se encarga de la parte de rentarla. Listado en el MLS, fotos profesionales, revisión de solicitantes y un contrato firmado. Una sola tarifa. Sin administración de la propiedad. Atendemos el área de Austin.",
      "https://mariomanzano.com/es/renta-tu-casa"
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
              <span className={labelDark}>
                Renta por el Dueño · Área de Austin
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-6">
              Pusiste tu propiedad<br />
              en renta.<br />
              <span className="font-semibold">Eso tiene todo el sentido.</span><br />
              Pero déjame ser tu Plan de Respaldo.
            </h1>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-3 max-w-xl">
              Puede que estés probando el mercado, que quieras evitar a una compañía de administración, o que simplemente quieras encargarte tú. Puedes hacerlo. Y probablemente no tengas ningún problema para hacerlo.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed max-w-xl">
              De cualquier forma, aquí hay algunas cosas que vale la pena saber mientras tu anuncio está activo.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed max-w-xl mt-6 pt-6 border-t border-white/15">
              Yo mismo llevo años siendo dueño de propiedades en renta. Sé lo que cuesta encontrar un buen inquilino, y sé por qué querrías encargarte tú. Si en algún momento prefieres dejar esa parte en otras manos, estoy disponible como tu plan de respaldo. No es administración de la propiedad, solo la parte de rentarla de principio a fin.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* WHAT SEPARATES RENTALS */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className={labelLight}>Lo que de verdad hace o deshace un anuncio de renta</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] mb-4">
              Lo que separa a las propiedades que se rentan rápido<br />
              <span className="font-semibold">de las que se quedan sin rentar.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-2">
              Armé esto para dueños que manejan su propia renta. Son las mismas cosas que reviso en mis propias rentas. Toma lo que te sirva.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
              Conseguir un inquilino no es lo difícil. Lo complicado es conseguir al inquilino correcto, rápido, y sin que esto se apodere de tu vida.
            </p>
          </RevealDiv>

          <div className="flex flex-col gap-8">
            {points.map((point, i) => (
              <RevealDiv key={i} delay={i * 60}>
                <div className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "#F0F0F0", color: "#B8974A" }}
                  >
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-lg font-semibold text-[#1A1A18] mb-1 leading-snug">
                      {point.title}
                    </h3>
                    <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                      {point.body}
                    </p>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* MLS EXPOSURE */}
      <section className="py-20 md:py-28 bg-white border-y border-[#E5E5E5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className={labelLight}>Lo que cambia cuando yo la publico</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] mb-4">
              Dónde aparece tu anuncio importa<br />
              <span className="font-semibold">más de lo que mucha gente cree.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-8">
              Cuando publicas por tu cuenta, llegas a quien casualmente encuentre tu anuncio. Cuando yo publico tu propiedad, sale por el MLS, donde los agentes de inquilinos pueden encontrarla, con fotos profesionales y un volante, y yo me encargo de las llamadas y de la revisión de solicitantes para que no tengas que hacer todo eso además de todo lo demás.
            </p>
          </RevealDiv>

          <RevealDiv delay={100}>
            {/* Comparison table */}
            <div className="border border-[#E5E5E5] rounded-md overflow-hidden mb-6">
              <div className="bg-white px-5 py-3 border-b border-[#E5E5E5]">
                <span className="font-body text-sm font-semibold tracking-[0.09em] uppercase text-[#2B2B2B]">
                  Comparación de alcance
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[#E5E5E5]">
                  <p className="font-body text-sm font-semibold tracking-[0.1em] uppercase text-[#A05030] mb-4">
                    Publicada por tu cuenta
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "Limitada a la plataforma donde publicas",
                      "Solo los inquilinos que casualmente encuentren tu anuncio",
                      "Sin exposición entre agentes",
                      "Tú atiendes cada consulta",
                    ].map((item, i) => (
                      <li key={i} className="font-body text-lg text-[#2B2B2B] leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#2B2B2B]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 md:p-6">
                  <p className="font-body text-sm font-semibold tracking-[0.1em] uppercase text-[#7A5F24] mb-4">
                    Publicada en el MLS
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "AustinHomeSearch.com, HAR.com, Realtor.com, Apartments.com, Zillow y muchos otros sitios de renta",
                      "Los agentes de inquilinos que trabajan la zona pueden buscarla",
                      "Fotos profesionales y volante incluidos",
                      "Las consultas y las visitas pasan por mí, no directo a ti",
                      "Te haces a un lado mientras alguien más atiende las llamadas y las visitas",
                    ].map((item, i) => (
                      <li key={i} className="font-body text-lg text-[#2B2B2B] leading-relaxed pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-[#B8974A] before:text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealDiv>

          <RevealDiv delay={150} className="mt-10">
            <VacancyCalculator />
          </RevealDiv>

          <RevealDiv delay={200} className="mt-6">
            <div
              className="rounded-md px-5 py-4"
              style={{ background: "#F2F2F2" }}
            >
              <p className="font-body text-lg leading-relaxed" style={{ color: "#1A1A18" }}>
                <strong style={{ color: "#1A1A18" }}>Sobre el inquilino equivocado:</strong> Los pagos atrasados, los daños y los inquilinos que se van antes de terminar el contrato pueden costar mucho más que unas semanas extra de búsqueda. Revisar bien a los solicitantes desde el principio es la mejor forma de evitarlos.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* HOW I HANDLE IT */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className={labelLight}>Cómo me encargo</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] mb-4">
              No soy administrador de propiedades.<br />
              <span className="font-semibold">Solo la parte de rentar, bien hecha.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
              Tú sigues administrando la propiedad día a día. Yo me encargo de que se rente con el precio correcto, bien promocionada y con los solicitantes revisados, y te mantengo informado todo el camino. Tú sigues decidiendo a quién escoger.
            </p>
          </RevealDiv>

          <div className="flex flex-col gap-8">
            {processSteps.map((step, i) => (
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

          {/* FEE BLOCK */}
          <RevealDiv delay={200} className="mt-12">
            <div className="border border-[#E5E5E5] rounded-md overflow-hidden">
              <div className="bg-[#1A1A18] px-5 py-3">
                <span className="font-body text-sm font-semibold tracking-[0.12em] uppercase text-white/90">
                  Tarifa Única por Rentar Tu Propiedad
                </span>
              </div>
              <div className="p-6" style={{ background: "#F2F2F2" }}>
                <div className="flex gap-10 mb-5 flex-wrap">
                  <div>
                    <p className="font-display text-4xl font-medium text-[#7A5F24] leading-none mb-1">100%</p>
                    <p className="font-body text-lg text-[#2B2B2B] tracking-wide">de un mes de renta</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-medium text-[#7A5F24] leading-none mb-1">$0</p>
                    <p className="font-body text-lg text-[#2B2B2B] tracking-wide">por adelantado</p>
                  </div>
                </div>
                <div className="border-t border-[#E5E5E5] mb-4" />
                <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
                  Algunos servicios combinan conseguir al inquilino con la administración continua de la propiedad. Yo lo mantengo simple: 100% de un mes de renta, una sola vez. Tú sigues administrando la propiedad después de que se firma el contrato.
                </p>
                <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-2">
                  La fotografía profesional, un volante de la propiedad con tu lista de mejoras, el listado en el MLS, la promoción, las visitas, la revisión de solicitantes y la firma del contrato de renta están todos incluidos.
                </p>
                <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                  La renta del primer mes se puede usar para pagar esta tarifa. No hay cargo mensual por administración.
                </p>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* WHAT IF RENTING ISN'T RIGHT */}
      <section className="py-20 md:py-28 border-t border-[#E5E5E5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className={labelLight}>Antes de decidir</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] mb-4">
              ¿Y si rentar no es<br />
              <span className="font-semibold">la mejor opción?</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              Antes de comprometerte con otro inquilino, puede valer la pena comparar los números. Te puedo ayudar a ver cuánto podría rentar la propiedad, en cuánto se podría vender, cuánto te quedaría neto, y cómo se ven tus opciones si la conservas como inversión.
            </p>
            <p className="font-display text-2xl font-medium text-[#7A5F24] mb-4">
              Rentar. Vender. Remodelar. Mantener.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-8">
              No tienes que decidir hoy. Solo necesitas saber los números.
            </p>
            <Link href="/es/guia-para-propietarios">
              <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                Ver Todas Tus Opciones
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className={labelDark}>
                Hablemos
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-4">
              Veamos si tiene sentido<br />
              <span className="font-semibold">trabajar juntos.</span>
            </h2>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-8 max-w-lg">
              Basta con una llamada corta. Escucho dónde estás, te explico cómo le pondría precio a tu propiedad y te digo con franqueza si creo que realmente puedo ayudarte. Si ya tenemos una hora apartada, trae lo que tengas hasta ahora, como tu anuncio actual, ofertas o preguntas de los solicitantes. Sin presión, sea cual sea tu decisión.
            </p>
            <Link href="/es/contacto">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] inline-flex items-center gap-3 cursor-pointer">
                Agenda una Llamada con Mario
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

    </div>
  );
}
