/*
 * DESIGN: Quiet Luxury Editorial - Homeowner Guide
 * Content extracted from Gamma guide
 * Sections: Hero, Clear Look at Options, Preparing vs Selling, Pricing Strategy, Selling vs Renting, Holding, As-Is, Putting It Together, CTA
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const GUIDE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-KJyHvXlKKhLSVPNiGNFDEe.webp";

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

export default function HomeownerGuide() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={GUIDE_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/65" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Homeowner Guide
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Sell, Remodel,<br />
              <em className="italic">Rent, or Hold.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Guidance for your next move. Clarity before you decide.
            </p>
          </div>
        </div>
      </section>

      {/* ─── A CLEAR LOOK AT YOUR OPTIONS ─────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">01. Your Options</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              A clear look at your options.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Most homeowners considering a sale want clarity before committing, especially when they're unsure what their home might realistically sell for in today's market.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              While every property is different, understanding a reasonable price range is often the first step in deciding whether selling, remodeling, renting, or holding makes the most sense.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Whether you're still weighing your options or already leaning toward selling, it helps to step back and compare the paths side by side.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Selling, remodeling, renting, or holding can all make sense depending on your goals, timeline, and stress level. The key is understanding which direction truly fits your situation.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              This guide slows the decision down, lays out the tradeoffs clearly, and helps you avoid unnecessary or costly moves before you commit.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── PREPARING VS SELLING ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">02. Preparing vs Selling</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              Know the difference before listing.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Before listing your home, it's important to understand when preparation makes financial sense and when it doesn't. Many sellers spend money on repairs and upgrades that don't meaningfully increase value or buyer demand.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">What Matters</h3>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Basic cleanliness, functional systems, and neutral presentation help buyers see themselves in the space.
              </p>
            </RevealDiv>
            <RevealDiv delay={150} className="border border-white/10 p-8">
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">What Doesn't</h3>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Major renovations, luxury upgrades, and personal taste projects rarely deliver full return on investment.
              </p>
            </RevealDiv>
          </div>

          <RevealDiv delay={200} className="mt-8 border border-white/10 p-8">
            <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">Ask Yourself</h3>
            <p className="font-body text-base text-white/70 leading-relaxed">
              Will this improvement meaningfully increase buyer interest or net proceeds? If the answer isn't clear, reconsider it.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── PRICING STRATEGY ─────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03. Pricing Strategy</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Your most important decision.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-8">
              Pricing your home correctly is one of the most important decisions you'll make. It affects both how your home is perceived and the outcome you ultimately achieve. The right price isn't about chasing the market or maximizing every dollar. It's about positioning your home where it belongs.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Underpricing Risk</h3>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Selling too low means leaving money on the table. Buyers may question if there's something wrong with the property.
              </p>
            </RevealDiv>
            <RevealDiv delay={150} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Thoughtful Pricing</h3>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Starting too high can make your home invisible to most buyers and lead to reductions that signal distress.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── SELLING VS RENTING ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">04. Selling vs Renting</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              Understanding your tradeoffs.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100}>
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">The Reality of Renting</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                Keeping your home as a rental brings ongoing responsibility. You'll need to handle tenant screening, maintenance, property management, and vacancy periods. There are real monthly costs beyond the mortgage, including insurance, repairs, property taxes, and management fees, and you need cash reserves for unexpected expenses and vacancies.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                In our local market, renting is often more of a long-term equity and appreciation play than a strong cash-flow strategy. It tends to make the most sense when your payment is low relative to rents or when your goal is long-term wealth building rather than immediate income.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Renting can provide future appreciation and possibly some monthly income, but it keeps your equity tied up and limits flexibility. You're still affected by changes in home values and rental demand while responsible for the property.
              </p>
            </RevealDiv>

            <RevealDiv delay={150}>
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">The Reality of Selling</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                Selling provides liquidity and releases you from ongoing property responsibility. You're no longer tied to the home, responsible for repairs, or managing tenants. The equity becomes available for your next move, investment, or other financial goals.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mb-4">
                The tradeoff is giving up future appreciation and potential rental income. Once sold, you no longer participate in future market gains tied to the property.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                Renting and selling can both be smart decisions depending on timing, finances, and goals. The right choice depends on your financial position, risk tolerance, and long-term plans.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── HOLDING THE PROPERTY ─────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Holding</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Doing nothing can be strategic.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealDiv delay={100} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Waiting Makes Sense When</h3>
              <ul className="font-body text-base text-[#1A1A18]/65 leading-relaxed space-y-2">
                <li>You need time to decide your next move</li>
                <li>You prefer to wait until conditions feel more favorable</li>
                <li>You're not ready to commit to selling or renting</li>
              </ul>
            </RevealDiv>

            <RevealDiv delay={150} className="border-t border-[#E8E0D5] pt-6">
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Consider the Costs</h3>
              <ul className="font-body text-base text-[#1A1A18]/65 leading-relaxed space-y-2">
                <li>Your equity remains tied up in the home</li>
                <li>Ongoing maintenance and holding costs</li>
                <li>Future market timing is impossible to predict</li>
                <li>You're still responsible for property taxes and insurance</li>
              </ul>
            </RevealDiv>
          </div>

          <RevealDiv delay={200} className="mt-12 border-t border-[#E8E0D5] pt-8">
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Holding your property isn't procrastination. It can be a valid strategy when you need clarity or when market conditions don't favor your goals.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── SELLING AS-IS ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">06. Selling As-Is</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              Understanding the tradeoffs.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-8">
              Selling your home as-is means offering it in its current condition without making repairs or updates. This isn't a marketing gimmick or a way to get a fast sale. It's simply acknowledging the property's state.
            </p>
          </RevealDiv>

          <RevealDiv delay={100} className="mt-8 border border-white/10 p-8">
            <h3 className="font-display text-2xl font-light text-[#B8974A] mb-4">What to Consider</h3>
            <ul className="font-body text-base text-white/70 leading-relaxed space-y-2">
              <li>Buyers will inspect and negotiate based on condition</li>
              <li>You may receive lower offers if the price doesn't reflect the home's condition</li>
              <li>It can take longer to find the right buyer</li>
              <li>You're not obligated to make any improvements</li>
            </ul>
            <p className="font-body text-base text-white/70 leading-relaxed mt-6">
              This option works when you don't want to invest time or money preparing the home, or when the property needs repairs or updates you don't want to take on. It's a tradeoff between price, preparation, and effort.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── PUTTING IT TOGETHER ─────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">07. Putting It Together</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              The best choice depends on four key factors.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-8">
              There's no single right answer. Only the right answer for your situation.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              {
                title: "Your Goals",
                desc: "What are you trying to achieve? More space, financial flexibility, retirement planning, or something else?"
              },
              {
                title: "Your Timeline",
                desc: "When do you need to make a decision? Are you under pressure, or do you have time to wait?"
              },
              {
                title: "Your Home's Condition",
                desc: "What shape is your property in? Are there major issues, minor updates, or is it move-in ready?"
              },
              {
                title: "Your Capacity",
                desc: "How much effort and uncertainty are you willing to handle? Some paths require more involvement than others."
              },
            ].map((item, i) => (
              <RevealDiv key={item.title} delay={i * 100} className="border-t border-[#E8E0D5] pt-6">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6 max-w-2xl mx-auto">
              Ready to explore your options?
            </h2>
            <p className="font-body text-base text-white/70 mb-10 max-w-lg mx-auto">
              If you'd like to talk through your situation or understand what your home could realistically sell or rent for, I'm available.
            </p>
            <button onClick={() => { if (typeof window !== 'undefined' && window.LC_API) { window.LC_API.open_chat_window(); } }} className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0">
              Get a plan
              <ArrowRight size={14} />
            </button>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
