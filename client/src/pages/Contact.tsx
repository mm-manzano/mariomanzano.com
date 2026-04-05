/*
 * DESIGN: Quiet Luxury Editorial - Contact / Consultation Page
 * Goal: Conversion-focused with primary CTA button above the fold
 * Structure: Hero with primary CTA → Secondary options → Reassurance
 * NO FORMS - Direct contact channels only
 */

import { useEffect, useRef } from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

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
      {/* ─── HERO SECTION WITH PRIMARY CTA ──────────────────────────── */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 overflow-hidden">
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
              <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed mb-10">
                Reach out and I'll help you think through your options and what actually makes sense for your situation. No pressure. Just clarity.
              </p>
              
              {/* PRIMARY CTA BUTTON */}
              <a
                href={getCTALink("start-conversation", "en")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.fbq) {
                    window.fbq("track", "Contact");
                  }
              }}
                className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0"
              >
                Start a conversation
                <ArrowRight size={14} />
              </a>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── SECONDARY CONTACT OPTIONS ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Or reach me directly</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-10 max-w-2xl">
              Choose what works<br />
              <em className="italic">for you.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-3xl">
            {/* Call or Text */}
            <RevealDiv delay={100}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a href="tel:(512)695-9255" className="font-body text-lg font-semibold text-[#1A1A18] mb-2 hover:text-[#B8974A] transition-colors no-underline block">
                    (512) 695-9255
                  </a>
                  <p className="font-body text-sm text-[#1A1A18]/65">
                    Call or text anytime
                  </p>
                </div>
              </div>
            </RevealDiv>

            {/* Send a Message */}
            <RevealDiv delay={150}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MessageSquare size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a 
                    href="sms:+15126959255?body=Hi%20Mario,%20I%20have%20a%20quick%20question%20about%20my%20home."
                    className="font-body text-lg font-semibold text-[#1A1A18] mb-2 hover:text-[#B8974A]"
                  >
                    Send a Message
                  </a>
                  <p className="font-body text-sm text-[#1A1A18]/65">
                    I respond within 24 hours
                  </p>
                </div>
              </div>
            </RevealDiv>

            {/* Email */}
            <RevealDiv delay={200}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a href="mailto:realtor@mariomanzano.com" className="font-body text-lg font-semibold text-[#1A1A18] mb-2 hover:text-[#B8974A] transition-colors no-underline block">
                    realtor@mariomanzano.com
                  </a>
                  <p className="font-body text-sm text-[#1A1A18]/65">
                    Email anytime
                  </p>
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── EXPECTATION SETTING ───────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">What to expect</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-6 max-w-2xl">
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
                I start by understanding your situation, then guide you toward the option that actually makes sense.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
