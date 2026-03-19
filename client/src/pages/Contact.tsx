/*
 * DESIGN: Quiet Luxury Editorial - Contact / Consultation Page
 * Goal: Direct call-to-action layout with contact information
 * NO FORMS - Direct contact channels only
 */

import { useRef, useEffect } from "react";
import { Phone, Mail } from "lucide-react";

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
      {/* ─── HERO SECTION ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ADVISOR_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/70" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <RevealDiv>
              <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
                Start the<br />
                <em className="italic">conversation.</em>
              </h1>
              <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
                Reach out directly and I'll help you think through your next move. No pressure. Just clarity.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── CONTACT OPTIONS ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Get in touch whenever it works for you.</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              Multiple ways to<br />
              <em className="italic">reach me.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-3xl">
            {/* Phone */}
            <RevealDiv delay={100}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Phone size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-2">
                    (512) 695-9255
                  </h3>
                  <p className="font-body text-base text-[#1A1A18]/65">
                    Call or text anytime
                  </p>
                </div>
              </div>
            </RevealDiv>

            {/* Email */}
            <RevealDiv delay={150}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Mail size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-2">
                    mariomanzanorealtor@gmail.com
                  </h3>
                  <p className="font-body text-base text-[#1A1A18]/65">
                    I respond within 24 hours
                  </p>
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── EXPECTATION SETTING ───────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">What to expect</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              A conversation,<br />
              <em className="italic">not a sales call.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Our first conversation is simple. I'll ask a few questions, understand your situation, and give you a clear direction based on your goals. No sales pitch. No pressure.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── REASSURANCE STRIP ─────────────────────────────────────── */}
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
                <span className="section-number">Why Choose Mario</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-6">
                A realtor who listens,<br />
                <em className="italic">not just sells.</em>
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-lg">
                With over a decade of experience in Austin real estate, I've helped hundreds of families navigate the selling process with confidence and clarity. My approach is simple: understand your goals, provide honest guidance, and deliver results.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
