/*
 * DESIGN: Quiet Luxury Editorial - Contact / Consultation Page
 * Goal: Convert visitors into consultation bookings
 * Sections: Hero, Contact Form, What to Expect, Direct Contact
 * Form: Pure HTML submission to Formspree - no JS interception
 */

import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Phone, Mail, Clock, MapPin } from "lucide-react";

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

export default function Contact() {
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
                Start the Conversation
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Develop Your<br />
              <em className="italic">Selling Strategy.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              A free, no-obligation consultation to discuss your home, your goals, and your selling strategy. No pressure. Just clarity.
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
                  <span className="section-number">What to Expect</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-6">
                  A conversation,<br />
                  <em className="italic">not a sales call.</em>
                </h2>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed mb-8">
                  Our first conversation is about understanding your situation: your home, your timeline, your goals. I'll ask questions and listen. No sales pitch, no pressure, and no commitment required.
                </p>

                <div className="flex flex-col gap-6 mb-10">
                  {[
                    {
                      icon: <Clock size={16} className="text-[#B8974A]" />,
                      title: "30–45 minutes",
                      desc: "Enough time to cover your situation thoroughly without wasting your afternoon.",
                    },
                    {
                      icon: <MapPin size={16} className="text-[#B8974A]" />,
                      title: "Phone, Zoom, or In Person",
                      desc: "Whatever works for you. I serve Cedar Park, Leander, and surrounding areas.",
                    },
                    {
                      icon: <ArrowRight size={16} className="text-[#B8974A]" />,
                      title: "You leave with a plan",
                      desc: "Even if you're not ready to sell, you'll leave with clarity on your options and next steps.",
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
                    Prefer to Reach Out Directly?
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
                <form 
                  action="https://formspree.io/f/xdawbgyw" 
                  method="POST"
                  className="bg-white p-8 md:p-10 border border-[#E8E0D5]"
                >
                  <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-8">
                    Schedule a Consultation
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        className="input-luxury"
                      />
                    </div>
                    <div>
                      <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(512) 555-0000"
                        className="input-luxury"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="input-luxury"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      Property Address (if applicable)
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Oak Creek Drive, Cedar Park"
                      className="input-luxury"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      What Would You Like to Discuss?
                    </label>
                    <select
                      name="topic"
                      className="input-luxury bg-transparent"
                    >
                      <option value="">Select a topic</option>
                      <option value="sell">I'm thinking about selling</option>
                      <option value="value">I want to know my home's value</option>
                      <option value="options">I want to understand all my options</option>
                      <option value="timing">I'm trying to determine the right timing</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      Your Timeline
                    </label>
                    <select
                      name="timeline"
                      className="input-luxury bg-transparent"
                    >
                      <option value="">Select a timeline</option>
                      <option value="asap">As soon as possible</option>
                      <option value="3months">Within 3 months</option>
                      <option value="6months">3–6 months</option>
                      <option value="year">Within a year</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/50 block mb-2">
                      Anything Else I Should Know?
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell me about your situation, goals, or any questions you have..."
                      className="input-luxury resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-luxury w-full justify-center text-center">
                    Send My Request
                    <ArrowRight size={14} />
                  </button>

                  <p className="font-body text-[11px] text-[#1A1A18]/40 text-center mt-4 leading-relaxed">
                    I respond to all inquiries within 24 hours. Your information is private and never shared.
                  </p>
                </form>
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
              { title: "No Obligation", desc: "Our conversation doesn't commit you to anything. You're free to take the information and decide on your own timeline." },
              { title: "No Pressure", desc: "I don't believe in high-pressure sales tactics. If selling isn't right for you now, I'll tell you that." },
              { title: "No Spam", desc: "Your contact information will only be used to follow up on your specific inquiry. Nothing more." },
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
