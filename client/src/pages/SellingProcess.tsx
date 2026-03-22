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
      {/* PAGE HERO */}
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

      {/* BEFORE YOU LIST */}
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
              Before your home hits the market, we'll align on your property, your timeline, and your goals.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              I'll prepare a market analysis with comparable homes, current demand, and a recommended price range so we're starting from data, not guesswork.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              We'll also cover any preparation that makes sense. Not major renovations, just what helps buyers see your home clearly.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              If you're still deciding how much to do before selling, the Homeowner Guide breaks this down further.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* GOING LIVE */}
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
              Once listed, your home appears on major platforms like MLS, Zillow, and Realtor.com. Professional photos, clear presentation, and pricing work together to attract the right buyers.
            </p>
            
            <div className="mb-12">
              <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
                First Two Weeks
              </h3>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl">
                The first couple of weeks are when your home gets the most attention. This is where we see how buyers respond and whether adjustments are needed.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
                Ongoing Activity
              </h3>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl">
                As showings continue, I'll keep you updated on buyer activity, feedback, and how the market is responding so you always know where things stand.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* OFFERS AND NEGOTIATION */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03. Offers and Negotiation</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              When offers come in.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              An offer is more than a number. It includes terms, timeline, financing, and inspection conditions. I'll walk you through each part so you understand what you're agreeing to.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              We'll evaluate offers strategically. Sometimes the highest price is not the best deal if it comes with risk or a long timeline. I'll help you see the full picture before making a decision.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              If negotiation is needed, we'll handle it professionally. The goal is reaching an agreement that works for you.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* UNDER CONTRACT TO CLOSING */}
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
              Once an offer is accepted, the process continues with inspections, appraisal, and lender approval. You may receive requests for repairs or credits, and we'll decide how to handle them.
            </p>

            <div className="mb-12">
              <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
                Inspection Period
              </h3>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-4">
                The buyer will inspect your home. Issues may come up. We'll review everything and decide what to address and what to negotiate.
              </p>
              <p className="font-body text-sm text-white/60">
                Typical timeline: 7 to 10 days
              </p>
            </div>

            <div className="mb-12">
              <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
                Appraisal and Underwriting
              </h3>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-4">
                The lender verifies the home's value and the buyer's financial position. This usually happens alongside the inspection period.
              </p>
              <p className="font-body text-sm text-white/60">
                Typical timeline: 10 to 14 days
              </p>
            </div>

            <div>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-4">
                A few days before closing, the buyer completes a final walkthrough. Then you'll sign documents and transfer ownership.
              </p>
              <p className="font-body text-sm text-white/60">
                Typical timeline: 30 to 45 days from contract to closing
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* SELLER PROCEEDS */}
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
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Your sale price is not what you take home. There are costs involved, including agent compensation, closing costs, taxes, and any negotiated repairs or credits.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              What you walk away with depends on your specific situation. The goal is understanding your net before making any decisions.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8F5F0] to-[#1A1A18]">
        <div className="container">
          <RevealDiv className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6">
              Ready to move<br />
              <em className="italic">forward?</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8 max-w-lg">
              Let's talk through your situation and create a clear plan for your sale.
            </p>
            <Link href="/contact">
              <a className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A18] text-white font-body text-sm tracking-widest uppercase hover:bg-[#2A2A28] transition-colors">
                Start the Conversation
                <ArrowRight size={16} />
              </a>
            </Link>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
