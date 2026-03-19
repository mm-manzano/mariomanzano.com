/*
 * DESIGN: Quiet Luxury Editorial - Contacto / Consultation Page
 * Goal: Convert visitors into consultation bookings
 * Sections: Hero, Contacto Form, What to Expect, Direct Contacto
 */

import { useState, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Phone, Mail, Clock, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ADVISOR_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-advisor-bg-FFo7WwjyuZSVioVNUzZH62.webp";
const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-hero-bg-Zzemi4ArQkuF2Ww9f72uuW.webp";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  
  return { ref, visible };
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return <div ref={ref} className={`fade-in-up ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export default function ContactoES() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", topic: "", message: "", timeline: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("topic", form.topic);
      formData.append("timeline", form.timeline);
      formData.append("message", form.message);

      const response = await fetch("https://formspree.io/f/xyzqwpkj", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Gracias. Nos pondremos en contacto pronto.");
        setForm({ name: "", email: "", phone: "", address: "", topic: "", message: "", timeline: "" });
      } else {
        toast.error("Ocurrió un error. Por favor, intenta de nuevo o llámame directamente.");
      }
    } catch (error) {
      console.error("Form error:", error);
      toast.error("Ocurrió un error. Por favor, intenta de nuevo o llama al (512) 695-9255.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ADVISOR_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/70" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Hablemos
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Desarrolla Tu<br />
              <em className="italic">Estrategia de Venta.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Una consulta gratuita y sin obligación para discutir tu casa, tus objetivos y tu estrategia de venta. Sin presión. Solo claridad.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left: Info (2 cols) */}
            <div className="lg:col-span-2">
              <RevealDiv>
                <div className="flex items-center gap-3 mb-6">
                  <span className="section-rule" />
                  <span className="section-number">Qué Esperar</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-6">
                  Una conversación,<br />
                  <em className="italic">no una llamada de ventas.</em>
                </h2>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed mb-8">
                  Nuestra primera conversación es sobre entender tu situación: tu casa, tu cronograma, tus objetivos. Haré preguntas y escucharé. No hay discurso de ventas, sin presión, y sin compromiso requerido.
                </p>

                <div className="flex flex-col gap-6 mb-10">
                  {[
                    {
                      icon: <Clock size={16} className="text-[#B8974A]" />,
                      title: "30-45 minutos",
                      desc: "Tiempo suficiente para cubrir tu situación completamente sin desperdiciar tu tarde.",
                    },
                    {
                      icon: <MapPin size={16} className="text-[#B8974A]" />,
                      title: "Teléfono, Zoom o En Persona",
                      desc: "Lo que funcione para ti. Sirvo Cedar Park, Leander y áreas circundantes.",
                    },
                    {
                      icon: <ArrowRight size={16} className="text-[#B8974A]" />,
                      title: "Te vas con un plan",
                      desc: "Incluso si no estás listo para vender, te irás con claridad sobre tus opciones y próximos pasos.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                      <div>
                        <div className="font-body text-sm font-medium text-[#1A1A18] mb-1">{item.title}</div>
                        <div className="font-body text-sm text-[#1A1A18]/55 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct contact */}
                <div className="border-t border-[#E8E0D5] pt-8">
                  <div className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-4">
                    ¿Prefieres Comunicarte Directamente?
                  </div>
                  <div className="flex flex-col gap-3">
                    <a href="tel:+15126959255" className="flex items-center gap-3 font-body text-sm text-[#1A1A18]/70 hover:text-[#B8974A] transition-colors">
                      <Phone size={14} />
                      (512) 695-9255
                    </a>
                    <a href="mailto:realtor@mariomanzano.com" className="flex items-center gap-3 font-body text-sm text-[#1A1A18]/70 hover:text-[#B8974A] transition-colors">
                      <Mail size={14} />
                      realtor@mariomanzano.com
                    </a>
                  </div>
                </div>
              </RevealDiv>
            </div>

            {/* Right: Form (3 cols) */}
            <div className="lg:col-span-3">
              <RevealDiv delay={150}>
                {submitted ? (
                  <div className="bg-[#1A1A18] p-10 md:p-12 text-center">
                    <div className="font-display text-5xl text-[#B8974A] mb-4">✓</div>
                    <h3 className="font-display text-3xl font-light text-white mb-4">
                      Mensaje Recibido
                    </h3>
                    <p className="font-body text-base text-white/60 leading-relaxed mb-8">
                      Gracias por comunicarte. Me pondré en contacto dentro de 24 horas para programar nuestra conversación.
                    </p>
                    <Link href="/es">
                      <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                        Volver al Inicio
                        <ArrowRight size={14} />
                      </span>
                    </Link>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-8 md:p-10 border border-[#E8E0D5]">
                    <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-8">
                      Programar una Consulta
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Tu nombre"
                          className="input-luxury"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                          Número de Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="(512) 555-0000"
                          className="input-luxury"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="tu@correo.com"
                        className="input-luxury"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>

                    <div className="mb-5">
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        Dirección de la Propiedad (si aplica)
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="123 Oak Creek Drive, Cedar Park"
                        className="input-luxury"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                      />
                    </div>

                    <div className="mb-5">
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        ¿Qué te Gustaría Discutir?
                      </label>
                      <select
                        name="topic"
                        className="input-luxury bg-transparent"
                        value={form.topic}
                        onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      >
                        <option value="">Selecciona un tema</option>
                        <option value="sell">Estoy pensando en vender</option>
                        <option value="value">Quiero saber el valor de mi casa</option>
                        <option value="options">Quiero entender todas mis opciones</option>
                        <option value="timing">Estoy tratando de determinar el momento adecuado</option>
                        <option value="other">Otra cosa</option>
                      </select>
                    </div>

                    <div className="mb-5">
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        Tu Cronograma
                      </label>
                      <select
                        name="timeline"
                        className="input-luxury bg-transparent"
                        value={form.timeline}
                        onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      >
                        <option value="">Selecciona un cronograma</option>
                        <option value="asap">Lo antes posible</option>
                        <option value="3months">Dentro de 3 meses</option>
                        <option value="6months">3–6 meses</option>
                        <option value="year">Dentro de un año</option>
                        <option value="exploring">Solo explorando</option>
                      </select>
                    </div>

                    <div className="mb-8">
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        ¿Algo Más que Deba Saber?
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Cuéntame sobre tu situación, objetivos o cualquier pregunta que tengas..."
                        className="input-luxury resize-none"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" disabled={loading} className="btn-luxury w-full justify-center text-center disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mi Solicitud
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>

                    <p className="font-body text-[11px] text-[#1A1A18]/40 text-center mt-4 leading-relaxed">
                      Respondo a todas las consultas dentro de 24 horas. Tu información es privada y nunca se comparte.
                    </p>
                  </form>
                )}
              </RevealDiv>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REASSURANCE STRIP ─────────────────────────────────────── */}
      <section
        className="py-16 relative"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-[#1A1A18]/90" />
        <div className="relative z-10 container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: "Sin Obligación", desc: "Nuestra conversación no te compromete a nada. Eres libre de tomar la información y decidir en tu propio cronograma." },
              { title: "Sin Presión", desc: "No creo en tácticas de ventas de alta presión. Si vender no es lo correcto para ti ahora, te lo diré." },
              { title: "Sin Spam", desc: "Tu información de contacto solo se utilizará para hacer seguimiento a tu consulta específica. Nada más." },
            ].map((item) => (
              <div key={item.title}>
                <div className="font-display text-xl font-light text-[#B8974A] mb-2">{item.title}</div>
                <p className="font-body text-sm text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
