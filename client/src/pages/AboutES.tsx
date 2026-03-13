/*
 * DESIGN: Quiet Luxury Editorial - Acerca Page
 * Goal: Build trust and personal connection with Mario's brand positioning
 * Sections: Hero, Story, Philosophy, Credentials, Values, CTA
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const ADVISOR_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-advisor-bg-FFo7WwjyuZSVioVNUzZH62.webp";
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-interior-luxury-8ttBRGUkDcTUkKucmQzirD.webp";
const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-hero-bg-Zzemi4ArQkuF2Ww9f72uuW.webp";

// Mario's headshot from the live site (circular crop)
const MARIO_HEADSHOT = "https://mariomanzano.com/images/avatar.jpg";

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

export default function AcercaES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
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
                Acerca Mario
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              The Advisor<br />
              <em className="italic">Behind the Strategy.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              A licensed REALTOR® who believes the best real estate advice sometimes means telling you not to sell.
            </p>
          </div>
        </div>
      </section>

      {/* ─── STORY ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <RevealDiv>
              <div className="relative">
                {/* Try to load Mario's actual headshot, fallback to interior */}
                <div className="aspect-[3/4] overflow-hidden bg-[#E8E0D5]">
                  <img
                    src={INTERIOR_IMG}
                    alt="Mario Manzano's office"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = INTERIOR_IMG;
                    }}
                  />
                </div>

              </div>
            </RevealDiv>

            {/* Text */}
            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01 — My Story</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6">
                I help homeowners<br />
                develop <em className="italic">seller strategy.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Too often, homeowners feel pressured to make a quick decision without fully understanding their options. I wanted to create a different kind of conversation focused on clarity and your best interests, not on closing a transaction.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                As a licensed REALTOR® and Seller Strategist, I work with homeowners in Cedar Park and Leander to explore all their options: selling, remodeling, renting, or holding. My role is to provide honest analysis and guidance so you can make the decision that makes sense for your situation.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                I know these neighborhoods well and understand how local market conditions, school districts, and seasonal trends affect property values and buyer demand.
              </p>
              <div className="border-l-2 border-[#B8974A] pl-6 mb-8">
                <p className="font-display text-xl italic font-light text-[#1A1A18] leading-relaxed">
                  "My goal is for you to leave every conversation feeling more confident, not more pressured."
                </p>
                <p className="font-body text-sm text-[#1A1A18]/50 mt-2">— Mario Manzano</p>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28 relative"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-[#F8F5F0]/90" />
        <div className="relative z-10 container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">02 — My Philosophy</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-xl">
              Four principles that guide<br />
              <em className="italic">every client relationship.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D5]">
            {[
              {
                num: "01",
                title: "Clarity Before Action",
                desc: "Before we talk about listing, staging, or pricing, I want you to understand exactly what you're working with. Your equity, your market, your options. Clarity first.",
              },
              {
                num: "02",
                title: "Your Timeline Matters",
                desc: "Your decision timeline is what matters most. Whether you're ready to move in three months or want to explore options over the next year, we'll work at your pace.",
              },
              {
                num: "03",
                title: "Decisions Grounded in Data",
                desc: "Your decision should be based on solid information. I bring the data: comparable sales, market absorption rates, buyer demand patterns. This gives you a realistic foundation for your choice.",
              },
              {
                num: "04",
                title: "Straightforward Guidance",
                desc: "If your home needs updates before selling, I'll let you know. If market timing suggests waiting, I'll share that perspective. You get honest guidance without pressure.",
              },
            ].map((item, i) => (
              <RevealDiv key={item.num} delay={i * 80} className="bg-[#F8F5F0] p-8 md:p-10">
                <div className="font-display text-5xl font-light text-[#E8E0D5] mb-4">{item.num}</div>
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CREDENTIALS ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">03 — Credentials</span>
            </div>
            <h2 className="font-display text-4xl font-light text-[#1A1A18] mb-10 max-w-xl">
              Expertise you can verify.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Licensed REALTOR®",
                body: "Active member in good standing with the National Association of REALTORS®.",
              },
              {
                title: "Pricing Strategy Advisor (PSA)",
                body: "Specialized training in market analysis, pricing strategy, and seller consultation.",
              },
              {
                title: "Member, Austin Board of REALTORS® (ABOR)",
                body: "Serving the greater Austin metropolitan area with local market expertise.",
              },
              {
                title: "Member, National Association of REALTORS® (NAR)",
                body: "Part of the largest professional real estate organization in the United States.",
              },
            ].map((cred, i) => (
              <RevealDiv key={cred.title} delay={i * 100} className="border-t border-[#E8E0D5] pt-6">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{cred.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">{cred.body}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-10">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">What Clients Say</span>
            </div>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "The most helpful part was understanding all my options before making any decision. I didn't feel pressured.",
                name: "Client",
                location: "Cedar Park, TX",
              },
              {
                quote: "I appreciated the clear, honest analysis. No sales pitch, just data and guidance.",
                name: "Client",
                location: "Leander, TX",
              },
            ].map((t) => (
              <RevealDiv key={t.name} className="border border-white/10 p-8">
                <div className="font-display text-4xl text-[#B8974A]/30 mb-3 leading-none">"</div>
                <p className="font-display text-xl font-light text-white italic leading-relaxed mb-6">
                  {t.quote}
                </p>
                <div>
                  <div className="font-body text-sm font-medium text-white">{t.name}</div>
                  <div className="font-body text-xs tracking-wide text-white/40 mt-0.5">{t.location}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-xl mx-auto">
              Ready to have a real conversation about your home?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-10 max-w-lg mx-auto">
              No pressure. No pitch. Just an honest conversation about your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span className="btn-luxury inline-flex items-center gap-3">
                  Book a Free Consultation
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/home-value">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  Get My Valor de Casa
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
