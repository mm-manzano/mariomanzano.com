/*
 * DESIGN: Quiet Luxury Editorial, Expired Listing Page (Spanish, A1 readability style)
 * Route: /es/relanza-tu-casa
 * Audience: Homeowners whose listing expired without selling. Works whether
 *           Mario reached them by phone or not.
 * Goal: Diagnose what commonly stalls a listing, give useful questions to ask
 *       before relisting with anyone, then show how Mario approaches it.
 * Sections: Header, What Stalls a Listing, Before You Relist, Callout + Rent
 *           or Hold, How I Help, No Lock-In, CTA
 * Page ends on the CTA by design, no exits after the ask.
 * Note: No fee or compensation content on this page by design.
 * Style: Black hero and CTA, pure white body, neutral grey callout and icon
 *        circles, no cream or warm tones. Body text 18px, no thin or italic
 *        headlines. Gold limited to rules, labels, icons, links, and button.
 */

import { useEffect, useRef } from "react";
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
  setMeta("og:image", "https://mariomanzano.com/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);
}

type Item = {
  title: string;
  body: string;
  link?: { href: string; label: string };
  icon: React.ReactNode;
};

const svgProps = {
  viewBox: "0 0 24 24",
  className: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons = {
  pulse: (
    <svg {...svgProps}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
  ),
  eye: (
    <svg {...svgProps}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  image: (
    <svg {...svgProps}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
  ),
  home: (
    <svg {...svgProps}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  ),
  compass: (
    <svg {...svgProps}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
  ),
  key: (
    <svg {...svgProps}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>
  ),
  clipboard: (
    <svg {...svgProps}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
  ),
  refresh: (
    <svg {...svgProps}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
  ),
  calendar: (
    <svg {...svgProps}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
  ),
  user: (
    <svg {...svgProps}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  dollar: (
    <svg {...svgProps}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
  ),
  search: (
    <svg {...svgProps}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  ),
  mail: (
    <svg {...svgProps}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
  ),
  document: (
    <svg {...svgProps}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
  ),
};

const stallReasons: Item[] = [
  {
    title: "Preparación",
    body: "Una casa se ve mejor cuando está lista antes de que la vean. Limpiar, despejar, hacer reparaciones y arreglarla para enseñarla (staging) forman esa primera impresión, y un mal comienzo es difícil de arreglar una vez que los compradores ya pasaron por la casa.",
    icon: icons.home,
  },
  {
    title: "Primera impresión",
    body: "Los compradores deciden rápido mientras navegan, y otra vez en el momento en que entran. Las fotos, la descripción y lo que los recibió en la puerta, o se ganaron una segunda mirada, o no.",
    icon: icons.image,
  },
  {
    title: "Precio",
    body: "Los compradores nunca juzgan una casa sola. La comparan con todo lo demás que podrían comprar a ese precio, así que un número que se ve bien en papel igual puede perder contra la casa de al lado.",
    icon: icons.pulse,
  },
  {
    title: "Respuesta del mercado",
    body: "Un precio o un plan que tenía sentido al salir al mercado no siempre sigue siendo el correcto. Las visitas, los comentarios y lo que sale nuevo al mercado cambian con el tiempo, y la respuesta tiene que cambiar con ellos.",
    icon: icons.eye,
  },
  {
    title: "Negociación",
    body: "Recibir una oferta no es la meta final. Las reparaciones, los plazos y las contingencias pueden tumbar un trato tan fácil como el precio, y cómo se manejan esas cosas muchas veces decide si llega al closing.",
    icon: icons.compass,
  },
  {
    title: "Ejecución y lo que pasa tras bambalinas",
    body: "Parte de lo que afecta a un listado pasa donde los vendedores nunca lo ven. Una visita que se perdió, una respuesta lenta al agente de un comprador, o comentarios que no llegaron a ningún lado pueden hacerte perder a un comprador sin que nadie sepa por qué.",
    icon: icons.key,
  },
];

const tips: Item[] = [
  {
    title: "Pide el número de visitas y los comentarios de tu último listado",
    body: "Si no los tienes, tu agente anterior normalmente los puede sacar. Te da una idea mucho mejor de cómo respondían los compradores a la casa.",
    icon: icons.clipboard,
  },
  {
    title: "Pregunta qué cambia específicamente esta vez",
    body: "¿Fotos nuevas, precio nuevo, preparación nueva, un lanzamiento distinto? Si la respuesta es básicamente el mismo plan con otro letrero en el jardín, espera un resultado parecido.",
    icon: icons.refresh,
  },
  {
    title: "Pregunta cómo se va a fijar el precio y cuándo se va a revisar",
    body: "Un buen plan tiene un precio de salida con razones detrás, más un punto claro para evaluarlo otra vez. Acuerden eso antes de listar, no después de semanas de silencio.",
    icon: icons.pulse,
  },
  {
    title: "Pregunta cómo manejarían una oferta, no solo el precio",
    body: "Una buena oferta puede caerse por reparaciones, plazos u otros términos. Pregunta cómo manejarían la negociación de la oferta completa, no solo llegar a un número que te guste.",
    icon: icons.document,
  },
  {
    title: "Pregunta qué pasa antes de que la casa salga al mercado",
    body: "Mucha de la atención que recibe un listado ocurre al principio. ¿Cuándo se toman las fotos? ¿Quién revisa el listado antes de que sea público? ¿Cómo se van a agendar las visitas y cada cuánto vas a recibir actualizaciones? Respuestas claras normalmente significan que hay un plan real detrás.",
    icon: icons.calendar,
  },
  {
    title: "Escoge al agente, no a la compañía",
    body: "El nombre de una compañía no te dice mucho sobre el agente. La misma compañía puede tener agentes excelentes y otros no tan buenos. Si el nombre de una compañía te trae un mal recuerdo, juzga al agente que tienes enfrente por su plan, no por la compañía para la que trabaja.",
    icon: icons.user,
  },
  {
    title: "Entérate de cuánto te queda antes de escoger un precio",
    body: "Tu precio es solo una parte. Los costos de cierre, las reparaciones y lo que todavía debes de tu préstamo cambian lo que te llevas al final.",
    link: { href: "/es/net-sheet", label: "Calcula tu ganancia neta" },
    icon: icons.dollar,
  },
];

const helpSteps: Item[] = [
  {
    title: "Revisar qué pasó la primera vez",
    body: "Repasamos juntos el listado anterior: las fotos, la descripción, el historial de precios, la actividad de visitas y cualquier comentario. Eso nos dice qué conservar y qué cambiar.",
    icon: icons.search,
  },
  {
    title: "Volver a fijar el precio con razones detrás",
    body: "Reviso qué ha cambiado desde que listaste por primera vez y dónde queda tu casa en el mercado de hoy. Recibes un rango con las razones detrás, y el número final lo decides tú. Cómo llego a ese rango va mucho más allá de buscar comparables, y prefiero mostrártelo en persona que explicarlo aquí.",
    icon: icons.pulse,
  },
  {
    title: "Preparar la casa para empezar de nuevo",
    body: "Recorremos la casa y señalamos qué vale la pena arreglar y qué no. Si algo necesita trabajo, te puedo conectar con contratistas locales de confianza. Cuando la casa esté lista, traemos fotografía profesional.",
    icon: icons.home,
  },
  {
    title: "Un relanzamiento, no una republicación",
    body: "Tu casa vuelve al mercado, pero nada del plan debería verse igual que la vez pasada. El precio, la presentación, el lanzamiento y cómo se manejan las ofertas se construyen en base a lo que realmente pasó la primera vez, no se repiten.",
    icon: icons.image,
  },
  {
    title: "Actualizaciones semanales y comentarios honestos",
    body: "Recibes una actualización semanal sobre la actividad y los comentarios de las visitas. Si algo no está funcionando, te lo digo, junto con lo que yo cambiaría.",
    icon: icons.mail,
  },
  {
    title: "Ofertas hasta el closing",
    body: "Reviso la oferta completa contigo, no solo el precio. Las reparaciones, los plazos y las contingencias pueden hundir un trato tan rápido como un número bajo, así que negocio los términos con el mismo cuidado que el precio, y luego te guío por la inspección, el avalúo y cada fecha límite hasta el closing.",
    icon: icons.document,
  },
];

function ItemList({ items, step = 60 }: { items: Item[]; step?: number }) {
  return (
    <div className="flex flex-col gap-8">
      {items.map((item, i) => (
        <RevealDiv key={i} delay={i * step}>
          <div className="flex gap-4 items-start">
            <div
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: "#F0F0F0", color: "#B8974A" }}
            >
              {item.icon}
            </div>
            <div>
              <h3 className="font-body text-lg md:text-xl font-semibold text-[#1A1A18] mb-1 leading-snug">
                {item.title}
              </h3>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                {item.body}
              </p>
              {item.link && (
                <Link href={item.link.href}>
                  <span className="font-body text-lg font-semibold text-[#7A5F24] underline underline-offset-4 cursor-pointer inline-block mt-2">
                    {item.link.label}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </RevealDiv>
      ))}
    </div>
  );
}

export default function ExpiredES() {
  useEffect(() => {
    setPageMeta(
      "Vuelve a Listar Tu Casa en el Área de Austin | Mario Manzano",
      "Tu listado venció. Antes de volver a listar, esto es lo que suele detener a una casa, qué preguntarle a cualquier agente y cómo enfoca Mario un relanzamiento. Atendemos el área de Austin.",
      "https://mariomanzano.com/es/relanza-tu-casa/"
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
                Volver a Listar Tu Casa · Área de Austin
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.15] mb-8">
              Tu listado venció.<br />
              Hacer una pausa antes de volver a listar<br />
              <span className="font-semibold">tiene todo el sentido.</span><br />
              Déjame darte una segunda opinión.
            </h1>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-4 max-w-xl">
              Si tu listado acaba de salir del mercado, es probable que tu teléfono haya estado ocupado con agentes que te buscan. Puede que yo haya sido uno de ellos, así que voy a procurar que esto te sirva.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-4 max-w-xl">
              No voy a decirte que tu agente anterior hizo mal su trabajo. No lo sé, y tampoco es el punto. Una casa puede no venderse por varias razones, y casi siempre hay algo que podemos aprender de lo que pasó la primera vez.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed max-w-xl">
              Esto es lo que yo vería primero, y algunas cosas que conviene saber, sea que vuelvas a listar conmigo o con cualquier otro agente.
            </p>
            <p className="font-body text-lg md:text-xl font-semibold text-white leading-relaxed max-w-xl mt-6 pt-6 border-t border-white/20">
              Y si vender no es lo mejor en este momento, también te lo voy a decir.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* WHAT STALLS A LISTING */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">Lo que normalmente detiene a un listado</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] leading-tight mb-5">
              Muchos listados detenidos<br />
              <span className="font-semibold">se reducen a unas cuantas cosas.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
              Casi nunca es un solo error grande. Son varias cosas pequeñas que se van acumulando. Fíjate cuáles te suenan familiares.
            </p>
          </RevealDiv>
          <ItemList items={stallReasons} />
        </div>
      </section>

      {/* BEFORE YOU RELIST */}
      <section className="py-20 md:py-28 bg-white border-y border-[#E5E5E5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">Antes de volver a listar</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] leading-tight mb-5">
              Preguntas que debes hacer antes de volver a listar,<br />
              <span className="font-semibold">con quien sea, incluyéndome a mí.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
              Volver a listar con un agente nuevo no cambia mucho por sí solo. Lo que importa es qué es diferente esta vez. Vale la pena hacerle estas preguntas a cualquier agente con quien hables.
            </p>
          </RevealDiv>
          <ItemList items={tips} />
        </div>
      </section>

      {/* CALLOUT + RENT OR HOLD */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="rounded-md px-6 py-5 flex flex-col gap-4 bg-[#F2F2F2]">
              <p className="font-body text-lg leading-relaxed text-[#1A1A18]">
                <strong className="font-semibold">Sobre el historial del listado:</strong> Los agentes, y muchas veces los compradores en sitios como Zillow, todavía pueden ver los listados anteriores de una casa y su historial de precios. Lo que cambió en septiembre de 2026 es el conteo de días, que ahora se reinicia en cero después de 30 días fuera del mercado en lugar de 90. El conteo se reinicia. El historial no. Por eso el relanzamiento tiene que verse realmente diferente, no solo volver a aparecer.
              </p>
              <p className="font-body text-lg leading-relaxed text-[#1A1A18]">
                <strong className="font-semibold">Sobre bajar el precio:</strong> Bajar el precio una y otra vez en pasos pequeños puede terminar costando más que ponerle el precio correcto desde el principio.
              </p>
            </div>
          </RevealDiv>

          <RevealDiv className="mt-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">Antes de decidir</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] leading-tight mb-5">
              ¿Y si vender no es<br />
              <span className="font-semibold">lo mejor en este momento?</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              Yo mismo he tenido propiedades en renta, así que hago esta pregunta cuando tiene sentido. Dependiendo de tu hipoteca, de cuánto podría rentar la casa y de tus planes, conservarla puede tener más sentido que venderla. O puede que no. De cualquier forma, vale la pena hacer los números antes de decidir.
            </p>
            <Link href="/es/sell-vs-rent">
              <span className="font-body text-lg font-semibold text-[#7A5F24] underline underline-offset-4 cursor-pointer">
                Compara vender o rentar
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
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] leading-tight mb-5">
              Antes de sugerirte algo,<br />
              <span className="font-semibold">quiero saber qué pasó.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
              Un relanzamiento empieza entendiendo el primer listado. Después construimos desde ahí.
            </p>
          </RevealDiv>
          <ItemList items={helpSteps} step={80} />
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
              <h2 className="font-display text-2xl md:text-3xl font-medium text-[#1A1A18] leading-tight mb-5">
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
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-5">
              Trae tus preguntas.<br />
              <span className="font-semibold">Yo traigo el plan.</span>
            </h2>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-4 max-w-lg">
              Si te gustaría una segunda opinión, con gusto paso por tu casa y te explico qué haría yo diferente. Si ya tenemos una hora apartada, trae los comentarios de las visitas, las ofertas que recibiste y cualquier cosa que tu último agente te haya dicho sobre por qué la casa no se vendió. Mientras más sepa al llegar, más útil va a ser nuestra reunión.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-8 max-w-lg">
              Me contrates o no, deberías salir con una idea más clara de lo que pasó, de lo que yo cambiaría, incluyendo cómo manejaría tu precio y el próximo lanzamiento, y de cuáles son tus opciones. Y si no es para ti, no dudes en decirme que me vaya.
            </p>
            <Link href="/es/contacto">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] inline-flex items-center gap-3 cursor-pointer">
                Agendar una Cita
                <ArrowRight size={16} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

    </div>
  );
}
