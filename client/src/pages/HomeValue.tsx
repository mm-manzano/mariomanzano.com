/*
 * DESIGN: Quiet Luxury Editorial - Home Value Page
 * Goal: Capture seller leads via home value request form
 * Sections: Hero, Value Factors, Form, Process, CTA
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, MapPin, TrendingUp, Clock, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-4NeoK6eSrnasPK9gSeTzGq.webp";
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-interior-luxury-8ttBRGUkDcTUkKucmQzirD.webp";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.15 }
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

export default function HomeValue() {
  const [formState, setFormState] = useState({
    address: "", city: "Cedar Park", bedrooms: "", bathrooms: "", sqft: "", name: "", email: "", phone: "", timeline: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/submit-home-value", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          propertyAddress: `${formState.address}, ${formState.city}`,
          email: formState.email,
          phone: formState.phone,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Home value request submitted successfully!");
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/75" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Home Value
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Understand Your<br />
              <em className="italic">Home's Value</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Get a clear picture of what your Cedar Park or Leander home is worth based on current market data. No obligation, no pressure to decide.
            </p>
          </div>
        </div>
      </section>

      {/* ─── VALUE FACTORS ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">What Drives Your Value</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-10 max-w-lg">
              Three factors that matter most right now.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin size={20} className="text-[#B8974A]" />,
                title: "Hyperlocal Comparables",
                desc: "Your home's value is determined by what similar homes in your specific neighborhood have sold for in the last 90 days — not county-wide averages.",
              },
              {
                icon: <TrendingUp size={20} className="text-[#B8974A]" />,
                title: "Current Demand",
                desc: "Cedar Park and Leander have distinct buyer pools. I track active buyer demand, days on market, and absorption rate weekly.",
              },
              {
                icon: <Clock size={20} className="text-[#B8974A]" />,
                title: "Your Timeline",
                desc: "A home priced to sell in 30 days is priced differently than one with 90-day flexibility. Your timeline directly affects your strategy.",
              },
            ].map((item, i) => (
              <RevealDiv key={item.title} delay={i * 100} className="border-t border-[#E8E0D5] pt-6">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM SECTION ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Context */}
            <RevealDiv>
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-3 mb-6">
                  <span className="section-rule" />
                  <span className="section-number">Request Your Report</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6">
                  Understand your<br />
                  <em className="italic">selling strategy.</em>
                </h2>
                <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-6">
                  I'll prepare a market analysis for your home based on recent comparable sales, current market conditions, and your property's specific features. This gives you a realistic picture of what your home is worth today and helps inform your strategy.
                </p>
                <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                  You'll receive a detailed report and can schedule a brief call to discuss the findings and your options.
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    "Based on actual MLS sold data",
                    "Specific to your neighborhood",
                    "Includes net proceeds estimate",
                    "No obligation to list",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-sm text-[#1A1A18]/70">
                      <CheckCircle size={14} className="text-[#B8974A] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 aspect-[4/3] overflow-hidden">
                  <img src={INTERIOR_IMG} alt="Luxury Texas home interior" className="w-full h-full object-cover" />
                </div>
              </div>
            </RevealDiv>

            {/* Right: Form */}
            <RevealDiv delay={150}>
              {submitted ? (
                <div className="bg-[#1A1A18] p-10 md:p-12 text-center">
                  <div className="font-display text-5xl text-[#B8974A] mb-4">✓</div>
                  <h3 className="font-display text-3xl font-light text-white mb-4">
                    Request Received
                  </h3>
                  <p className="font-body text-base text-white/60 leading-relaxed mb-8">
                    Thank you. I'll prepare your personalized home value report and reach out within 24 hours to walk through the findings.
                  </p>
                  <Link href="/">
                    <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                      Back to Home
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 border border-[#E8E0D5]">
                  <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-8">
                    Your Property Details
                  </h3>

                  {/* Address */}
                  <div className="mb-6">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="123 Oak Creek Drive"
                      className="input-luxury"
                      value={formState.address}
                      onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                    />
                  </div>

                  {/* City */}
                  <div className="mb-6">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      City *
                    </label>
                    <select
                      required
                      className="input-luxury bg-transparent"
                      value={formState.city}
                      onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                    >
                      <option value="Cedar Park">Cedar Park</option>
                      <option value="Leander">Leander</option>
                      <option value="Austin">Austin</option>
                      <option value="Round Rock">Round Rock</option>
                      <option value="Georgetown">Georgetown</option>
                    </select>
                  </div>

                  {/* Bed / Bath / SqFt */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        Beds
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="4"
                        className="input-luxury"
                        value={formState.bedrooms}
                        onChange={(e) => setFormState({ ...formState, bedrooms: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        Baths
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        step="0.5"
                        placeholder="3"
                        className="input-luxury"
                        value={formState.bathrooms}
                        onChange={(e) => setFormState({ ...formState, bathrooms: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        Sq. Ft.
                      </label>
                      <input
                        type="number"
                        placeholder="2,400"
                        className="input-luxury"
                        value={formState.sqft}
                        onChange={(e) => setFormState({ ...formState, sqft: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#E8E0D5] pt-6 mb-6">
                    <h4 className="font-display text-lg font-light text-[#1A1A18] mb-6">
                      Your Contact Information
                    </h4>
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jennifer Rodriguez"
                          className="input-luxury"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jennifer@email.com"
                          className="input-luxury"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="(512) 555-0000"
                          className="input-luxury"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                          Selling Timeline
                        </label>
                        <select
                          className="input-luxury bg-transparent"
                          value={formState.timeline}
                          onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                        >
                          <option value="">Select a timeline</option>
                          <option value="asap">As soon as possible</option>
                          <option value="3months">Within 3 months</option>
                          <option value="6months">3–6 months</option>
                          <option value="year">Within a year</option>
                          <option value="exploring">Just exploring options</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="btn-luxury w-full justify-center text-center disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request My Home Value Report
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <p className="font-body text-[11px] text-[#1A1A18]/40 text-center mt-4 leading-relaxed">
                    Your information is private and will never be shared. No spam, ever.
                  </p>
                </form>
              )}
            </RevealDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
