/*
 * DESIGN: Quiet Luxury Editorial - Seller Education Page
 * Goal: Build trust and educate homeowners on the selling process
 * Sections: Hero, Sell vs. Hold, Timeline, Pricing Strategy, Costs, CTA
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, BarChart3, Home, AlertCircle } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const AERIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/cedar-park-aerial-SPVZiqyQFqbArbkNwV7GJu.webp";
const ADVISOR_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-advisor-bg-FFo7WwjyuZSVioVNUzZH62.webp";
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-interior-luxury-8ttBRGUkDcTUkKucmQzirD.webp";

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

export default function SellerGuideES() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={AERIAL_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/70" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Seller Education
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Your Seller<br />
              Strategy Guide<br />
              <em className="italic">for Cedar Park & Leander.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              An honest, jargon-free guide to developing your selling strategy. Written for homeowners who want to make smart decisions, not just fast ones.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SHOULD YOU SELL? ──────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">01. The First Question</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-xl">
              Should you actually sell?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Most agents will tell you "now is a great time to sell" regardless of your situation. I won't. The right answer depends on four things: your equity position, your next move, the current market, and your financial goals.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-10">
              Before we talk about listing your home, I want to make sure selling is actually the best path for you. Sometimes it is. Sometimes renting, remodeling, or waiting 12 months makes more financial sense.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D5]">
            {[
              {
                title: "Reasons to Sell Now",
                items: [
                  "You have significant equity and want to capture it",
                  "You're relocating or downsizing with a clear timeline",
                  "The home no longer fits your family's needs",
                  "Maintenance costs are outpacing appreciation",
                  "You want to simplify your financial picture",
                ],
                positive: true,
              },
              {
                title: "Reasons to Wait or Explore Other Options",
                items: [
                  "You'd be buying into a higher-rate market",
                  "Your equity hasn't fully recovered from a recent purchase",
                  "The rental income could exceed your mortgage",
                  "A strategic renovation could add $40K-$80K to your value",
                  "You're not sure where you'd go next",
                ],
                positive: false,
              },
            ].map((col) => (
              <RevealDiv key={col.title} className="bg-[#F8F5F0] p-8 md:p-10">
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-6">{col.title}</h3>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${col.positive ? "bg-[#B8974A]" : "bg-[#1A1A18]/30"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ──────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28 relative"
        style={{ backgroundImage: `url(${ADVISOR_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#F8F5F0]/92" />
        <div className="relative z-10 container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">02. The Timeline</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-xl">
              What happens between<br />
              <em className="italic">"I want to sell" and closing day.</em>
            </h2>
          </RevealDiv>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#E8E0D5] hidden md:block" />

            <div className="flex flex-col gap-10">
              {[
                { week: "Week 1–2", title: "Strategy & Preparation", desc: "We meet, review your home, discuss pricing strategy, and identify any repairs or staging that will maximize your return. I prepare your CMA." },
                { week: "Week 2–3", title: "Listing Preparation", desc: "Professional photography, floor plans, and marketing materials. Your listing is crafted to attract serious, qualified buyers." },
                { week: "Week 3", title: "Active on Market", desc: "Your home goes live on MLS, Zillow, Realtor.com, and my targeted marketing channels. Showings begin." },
                { week: "Week 3–6", title: "Offers & Negotiation", desc: "I present all offers with full analysis. We negotiate not just price, but terms, contingencies, and timing that protect your interests." },
                { week: "Week 6–10", title: "Under Contract", desc: "Buyer inspections, appraisal, and title work. I manage every step so nothing falls through the cracks." },
                { week: "Week 10–12", title: "Closing Day", desc: "You sign, you receive your proceeds, and you move forward with confidence. Average Cedar Park closing: 30–45 days after contract." },
              ].map((item, i) => (
                <RevealDiv key={item.week} delay={i * 80} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className={`${i % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}>
                    <div className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-1">{item.week}</div>
                    <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-2">{item.title}</h3>
                    <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">{item.desc}</p>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING STRATEGY ──────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <RevealDiv>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-rule" />
                <span className="section-number">03. Pricing</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6">
                The pricing decision<br />
                <em className="italic">is everything.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Overpriced homes sit. Sitting homes get stigmatized. Stigmatized homes sell for less than they would have if priced correctly from day one.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                I use a data-driven pricing model that accounts for recent sold comparables, active competition, buyer demand signals, and your specific home's condition and features. The goal is to price at the intersection of maximum value and minimum time on market.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Priced right from day 1", value: "97–103%", sub: "of list price achieved" },
                  { label: "Avg. days on market", value: "14–21", sub: "for well-priced Cedar Park homes" },
                ].map((stat) => (
                  <div key={stat.label} className="border border-[#E8E0D5] p-5">
                    <div className="font-display text-3xl font-light text-[#B8974A] mb-1">{stat.value}</div>
                    <div className="font-body text-xs text-[#1A1A18]/50 leading-snug">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="aspect-[4/3] overflow-hidden mb-8">
                <img src={INTERIOR_IMG} alt="Luxury home interior" className="w-full h-full object-cover" />
              </div>
              <div className="bg-[#1A1A18] p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="text-[#B8974A] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-body text-xs font-medium text-white mb-1">The Overpricing Trap</div>
                    <p className="font-body text-xs text-white/60 leading-relaxed">
                      Homes priced 5% above market take 3–4x longer to sell and often close below what a correctly-priced listing would have achieved. The first two weeks on market are your most powerful window.
                    </p>
                  </div>
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── SELLER COSTS ──────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">04. What It Costs to Sell</span>
            </div>
            <h2 className="font-display text-4xl font-light text-[#1A1A18] mb-4 max-w-xl">
              Know your net proceeds before you decide.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 leading-relaxed max-w-2xl mb-10">
              Selling a home involves several costs. Here's a realistic breakdown so you can calculate your actual take-home. not just the sale price.
            </p>
          </RevealDiv>

          <div className="max-w-2xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8E0D5]">
                  <th className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/40 text-left pb-3">Cost Item</th>
                  <th className="font-body text-[10px] tracking-[0.15em] uppercase text-[#1A1A18]/40 text-right pb-3">Typical Range</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "Agent Commission (total)", range: "5–6% of sale price" },
                  { item: "Title & Escrow Fees", range: "$1,500–$3,000" },
                  { item: "Seller Concessions", range: "0–3% (negotiated)" },
                  { item: "Pre-Sale Repairs / Staging", range: "$2,000–$10,000" },
                  { item: "Property Taxes (prorated)", range: "Varies" },
                  { item: "Moving Costs", range: "$1,500–$5,000" },
                ].map((row, i) => (
                  <tr key={row.item} className={`border-b border-[#E8E0D5] ${i % 2 === 0 ? "" : "bg-[#F8F5F0]"}`}>
                    <td className="font-body text-sm text-[#1A1A18]/70 py-3 pr-4">{row.item}</td>
                    <td className="font-body text-sm text-[#1A1A18] text-right py-3 font-medium">{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="font-body text-xs text-[#1A1A18]/40 mt-4 leading-relaxed">
              I prepare a detailed net sheet for your specific property so you know exactly what you'll walk away with before you commit to anything.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container text-center">
          <RevealDiv>
            <div className="section-number text-[#B8974A] mb-4">Ready to Take the Next Step?</div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6 max-w-xl mx-auto">
              Let's look at your numbers together.
            </h2>
            <p className="font-body text-base text-white/60 mb-10 max-w-lg mx-auto">
              A free, no-pressure consultation where we review your home's value, your options, and what makes sense for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/es/home-value">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Get My Valor de Casa
                  <ArrowRight size={14} />
                </span>
              </a>
              <a href={getCTALink("get-plan", "es")}>
                <span className="btn-luxury-outline border-white/50 text-white hover:bg-white hover:text-[#1A1A18] inline-flex items-center gap-3">
                  Obtener un plan
                </span>
              </a>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
