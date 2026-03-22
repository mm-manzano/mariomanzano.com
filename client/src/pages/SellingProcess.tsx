/*
 * DESIGN: Quiet Luxury Editorial - Selling Process Page
 * Purpose: Post-decision clarity for sellers who have decided to sell
 * Sections: Hero, Before You List, Going Live, Offers & Negotiation, Under Contract to Closing, Seller Proceeds, CTA
 * Note: Does NOT repeat decision-making content from Homeowner Guide
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const PROCESS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-KJyHvXlKKhLSVPNiGNFDEe.webp";
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

export default function SellingProcess() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={PROCESS_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/65" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Selling Process
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              What happens<br />
              <em className="italic">after you decide.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              A clear walkthrough of the selling process. From listing to closing, here's what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* ─── BEFORE YOU LIST ─────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">01. Before You List</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Getting ready to go live.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Before your home hits the market, we'll have a detailed conversation about your property, your timeline, and what you're hoping to achieve. This is where we align on strategy and set realistic expectations.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              I'll prepare a market analysis showing comparable homes, current buyer demand, and a recommended price range. This gives us a clear starting point based on real data, not guesswork.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              We'll also discuss any preparation that makes sense—not major renovations, but the basics that help buyers see your home clearly. The goal is positioning, not perfection.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── GOING LIVE ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">02. Going Live</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              Your home on the market.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Once listed, your home appears on all major platforms—MLS, Zillow, Realtor.com, and more. Professional photography, detailed descriptions, and strategic pricing work together to attract the right buyers.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">First Two Weeks</h3>
              <p className="font-body text-base text-white/70 leading-relaxed">
                The initial showing period is critical. Most buyer interest happens early. We'll monitor showings, gather feedback, and adjust strategy if needed.
              </p>
            </RevealDiv>
            <RevealDiv delay={150} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Ongoing Activity</h3>
              <p className="font-body text-base text-white/70 leading-relaxed">
                I'll keep you updated on showings, buyer interest, and market feedback. You'll know what's working and what might need adjustment.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── OFFERS & NEGOTIATION ─────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03. Offers & Negotiation</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              When offers come in.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              An offer isn't just a number. It includes contingencies, timeline, financing, and inspection terms. I'll walk you through each one so you understand what you're actually agreeing to.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              We'll evaluate offers strategically. Sometimes the highest price isn't the best deal if it comes with risky contingencies or a long closing timeline. I'll help you see the full picture.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              If negotiation is needed, we'll handle it professionally. The goal is reaching an agreement that works for you—not winning a battle.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── UNDER CONTRACT TO CLOSING ─────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">04. Under Contract to Closing</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              From acceptance to keys.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Once an offer is accepted, the real work begins. The buyer's lender will order an appraisal and inspection. You may get requests for repairs or credits. I'll help you navigate each step.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Inspection Period</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                The buyer will inspect your home. Issues may come up. We'll decide together what to address and what to negotiate.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed text-sm">
                Typical timeline: 7-10 days
              </p>
            </RevealDiv>
            <RevealDiv delay={150} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Appraisal & Underwriting</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                The lender will verify your home's value and the buyer's financial situation. This usually happens in parallel with inspection.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed text-sm">
                Typical timeline: 10-14 days
              </p>
            </RevealDiv>
          </div>

          <RevealDiv delay={200} className="mt-8 border border-white/10 p-8">
            <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Final Walk-Through & Closing</h3>
            <p className="font-body text-base text-white/70 leading-relaxed mb-4">
              A few days before closing, the buyer does a final walk-through to confirm the home is in agreed-upon condition. Then you'll sign closing documents and transfer the keys.
            </p>
            <p className="font-body text-base text-white/70 leading-relaxed text-sm">
              Typical timeline: 30-45 days from contract to closing
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── SELLER PROCEEDS ─────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Seller Proceeds</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Understanding your net proceeds.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-8">
              Your sale price isn't what you take home. There are costs involved: realtor commission, title insurance, property taxes, HOA fees, and any repairs negotiated after inspection.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Typical Costs</h3>
              <ul className="font-body text-base text-[#1A1A18]/65 leading-relaxed space-y-2">
                <li>• Realtor commission (typically 5-6%)</li>
                <li>• Title insurance and closing costs</li>
                <li>• Property taxes (prorated)</li>
                <li>• HOA transfer fees (if applicable)</li>
                <li>• Repair credits or concessions</li>
              </ul>
            </RevealDiv>
            <RevealDiv delay={150} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">What You Get</h3>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Your net proceeds = Sale Price − All Costs. I'll provide a detailed estimate before listing so you know exactly what to expect at closing.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
                Ready to move<br />
                <em className="italic">forward?</em>
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed mb-10 max-w-lg">
                Let's talk through your specific situation and create a clear plan for your sale.
              </p>
              <Link href="/contact">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Start the Conversation
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
