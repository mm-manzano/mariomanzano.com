/*
 * DESIGN: Quiet Luxury Editorial - Homeowner Guide
 * Content extracted from Gamma guide
 * Sections: Hero, Clear Look at Options, Preparing vs Selling, Pricing Strategy, Selling vs Renting, Holding, Selling As-Is, Remodel, Putting It Together, CTA
 * Optimization: Added Comparison Table, FAQ Section, and JSON-LD Schema for AI Visibility.
 * REFINEMENT: Remodel section moved after Selling As-Is. Long dashes removed. Remodel table row simplified for clarity and brevity.
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { getCTALink } from "@/lib/ctaLinks";

const GUIDE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-KJyHvXlKKhLSVPNiGNFDEe.webp";

function useScrollReveal( ) {
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E0D5] py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left group"
      >
        <span className="font-display text-xl md:text-2xl font-light text-[#1A1A18] group-hover:text-[#B8974A] transition-colors">
          {question}
        </span>
        <span className="text-[#B8974A] ml-4">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function HomeownerGuide() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When should I sell my home as-is in Austin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selling as-is makes sense when you want to avoid the time, stress, and upfront cost of repairs. In the Austin market, this is a tradeoff: you accept a potentially lower offer in exchange for a faster, more certain exit. It's ideal if the property needs significant work you aren't prepared to manage."
        }
      },
      {
        "@type": "Question",
        "name": "Is renting better than selling in Leander or Cedar Park?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In our local market, renting is typically a long-term appreciation play. If your current mortgage rate is significantly lower than market rents, it may be a strong wealth-building tool. However, if you need that equity for your next down payment or want to avoid the responsibilities of being a landlord, selling is often the cleaner financial move."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know if a remodel will actually increase my home's value?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus on functional systems, cleanliness, and neutral presentation. Major luxury renovations rarely return their full cost. If the improvement doesn't meaningfully increase buyer demand or your daily quality of life, it's likely not a strategic move before selling."
        }
      },
      {
        "@type": "Question",
        "name": "What is the biggest risk of holding and doing nothing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The primary risk is the opportunity cost. While holding avoids immediate stress, your equity remains illiquid and you continue to incur costs for taxes, insurance, and maintenance. Holding is a valid strategy for clarity, but it shouldn't be used to avoid an inevitable decision."
        }
      },
      {
        "@type": "Question",
        "name": "Why is pricing the most important decision in the selling process?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pricing dictates how the market perceives your home. Underpricing leaves money on the table, while overpricing makes your home invisible to qualified buyers. A strategic price positions your home to attract the right interest immediately."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema ) }}
      />

      {/* PAGE HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#1A1A18]/65" />
        </div>
        <div className="relative z-10 container">
          <div className="flex justify-end mb-4">
            <a
              href="/homeowner-guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm md:text-base opacity-90 hover:opacity-100 font-light tracking-wide border-b border-white/40 pb-1"
            >
              Download PDF
            </a>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Homeowner Guide
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Sell, Remodel,  

              <em className="italic">Rent, or Hold.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Guidance for your next move. Clarity before you decide.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 01: YOUR OPTIONS */}
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
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-12">
              This guide slows the decision down, lays out the tradeoffs clearly, and helps you avoid unnecessary or costly moves before you commit.
            </p>

            {/* COMPARISON TABLE */}
            <div className="mt-16 overflow-x-auto">
              <div className="min-w-[800px] bg-white border border-[#E8E0D5] p-8 md:p-12">
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-8">The Four Paths Strategy</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E8E0D5]">
                      <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Strategy</th>
                      <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/4">When It Makes Sense</th>
                      <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Financial Upside</th>
                      <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Risks & Tradeoffs</th>
                      <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="font-body text-sm text-[#1A1A18]/75 leading-relaxed">
                    <tr className="border-b border-[#F8F5F0]">
                      <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Sell</td>
                      <td className="py-6 pr-4">You need liquidity, a different space, or want to capture current equity.</td>
                      <td className="py-6 pr-4">Immediate access to net proceeds for your next move or investment.</td>
                      <td className="py-6 pr-4">Giving up future appreciation and potential rental income.</td>
                      <td className="py-6">Homeowners ready for a clean break and financial flexibility.</td>
                    </tr>
                    <tr className="border-b border-[#F8F5F0]">
                      <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Remodel</td>
                      <td className="py-6 pr-4">Your home has good bones but needs updates or improvements.</td>
                      <td className="py-6 pr-4">Improved quality of life and potential increase in resale value. In some cases, it may also create the option to access equity for a future move.</td>
                      <td className="py-6 pr-4">High upfront costs; luxury upgrades rarely deliver a 100% ROI.</td>
                      <td className="py-6">Homeowners who love their location but want their home to work better.</td>
                    </tr>
                    <tr className="border-b border-[#F8F5F0]">
                      <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Rent</td>
                      <td className="py-6 pr-4">Your mortgage payment is low and you want to build long-term wealth.</td>
                      <td className="py-6 pr-4">Long-term equity growth and potential for future appreciation.</td>
                      <td className="py-6 pr-4">Ongoing maintenance, tenant management, and vacancy risks.</td>
                      <td className="py-6">Investors focused on long-term wealth rather than immediate cash flow.</td>
                    </tr>
                    <tr>
                      <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Hold</td>
                      <td className="py-6 pr-4">You need more time to decide or market conditions don't favor your goals.</td>
                      <td className="py-6 pr-4">Avoids transaction costs and allows for more clarity before acting.</td>
                      <td className="py-6 pr-4">Equity remains tied up in the home; ongoing taxes, insurance, and maintenance costs.</td>
                      <td className="py-6">Homeowners who aren't under pressure and value certainty over speed.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* SECTION 02: PREPARING VS SELLING */}
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

      {/* SECTION 03: PRICING STRATEGY */}
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

      {/* SECTION 04: SELLING VS RENTING */}
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
                Renting and selling can both be smart decisions depending on timing, finances, and goals. The right choice depends on your financial position, risk tolerance, and long-term plans. For some homeowners, the equity sitting in this property is the capital that funds the next one.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 05: HOLDING */}
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
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-4">
              Holding your property isn't procrastination. It can be a valid strategy when you need clarity or when market conditions don't favor your goals.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              In some cases, holding can also be a strategic pause, creating space to explore what this property could support next.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* SECTION 06: SELLING AS-IS */}
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
            <ul className="font-body text-base text-white/70 leading-relaxed space-y-2 mb-6">
              <li>Buyers will inspect and negotiate based on condition</li>
              <li>You may receive lower offers if the price doesn't reflect the home's condition</li>
              <li>It can take longer to find the right buyer</li>
              <li>You're not obligated to make any improvements</li>
            </ul>
            <p className="font-body text-base text-white/70 leading-relaxed">
              This option works when you don't want to invest time or money preparing the home, or when the property needs repairs or updates you don't want to take on. It's a tradeoff between price, preparation, and effort.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* REMODEL SECTION */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Remodel</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Remodel
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Remodeling can be a way to make your current home work better for your needs or to better position it for resale.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                For many homeowners, this means improving layout, updating key areas, or addressing functional issues that impact daily living or buyer perception.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Some homeowners approach this moment differently.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                A strategic remodel paired with a refinance can, in certain situations, reposition the property for a different use or outcome, or free up capital for the next move.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Like any path, the value of remodeling depends on your goals, timeline, and how the numbers actually play out.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* SECTION 07: PUTTING IT TOGETHER */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">07. Putting It Together</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              The best choice depends on four key factors.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-2xl mb-8">
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
              <RevealDiv key={item.title} delay={i * 100} className="border-t border-white/10 pt-6">
                <h3 className="font-display text-xl font-light text-[#B8974A] mb-3">{item.title}</h3>
                <p className="font-body text-base text-white/70 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>

          <RevealDiv delay={400} className="mt-16 border-t border-white/10 pt-8 max-w-2xl">
            <p className="font-body text-base text-white/70 leading-relaxed mb-4">
              Some homeowners are deciding what to do next.
            </p>
            <p className="font-body text-base text-white/70 leading-relaxed">
              Others are considering how to use this property to create their next opportunity.
            </p>
          </RevealDiv>

          {/* FAQ SECTION */}
          <div className="mt-24 max-w-3xl mx-auto">
            <RevealDiv>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-12 text-center">
                Common Questions & Clarity
              </h2>
              <div className="bg-[#F8F5F0] border border-[#E8E0D5] p-8 md:p-12">
                <FAQItem 
                  question="When should I sell my home as-is in Austin?" 
                  answer="Selling as-is makes sense when you want to avoid the time, stress, and upfront cost of repairs. In the Austin market, this is a tradeoff: you accept a potentially lower offer in exchange for a faster, more certain exit. It's ideal if the property needs significant work you aren't prepared to manage."
                />
                <FAQItem 
                  question="Is renting better than selling in Leander or Cedar Park?" 
                  answer="In our local market, renting is typically a long-term appreciation play. If your current mortgage rate is significantly lower than market rents, it may be a strong wealth-building tool. However, if you need that equity for your next down payment or want to avoid the responsibilities of being a landlord, selling is often the cleaner financial move."
                />
                <FAQItem 
                  question="How do I know if a remodel will actually increase my home's value?" 
                  answer="Focus on functional systems, cleanliness, and neutral presentation. Major luxury renovations rarely return their full cost. If the improvement doesn't meaningfully increase buyer demand or your daily quality of life, it's likely not a strategic move before selling."
                />
                <FAQItem 
                  question="What is the biggest risk of holding and doing nothing?" 
                  answer="The primary risk is the opportunity cost. While holding avoids immediate stress, your equity remains illiquid and you continue to incur costs for taxes, insurance, and maintenance. Holding is a valid strategy for clarity, but it shouldn't be used to avoid an inevitable decision."
                />
                <FAQItem 
                  question="Why is pricing the most important decision in the selling process?" 
                  answer="Pricing dictates how the market perceives your home. Underpricing leaves money on the table, while overpricing makes your home invisible to qualified buyers. A strategic price positions your home to attract the right interest immediately."
                />
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#F8F5F0]">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-2xl mx-auto">
              Ready to explore your options?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 max-w-lg mx-auto">
              If you'd like to talk through your situation or understand what your home could realistically sell or rent for, I'm available.
            </p>
            <a href={getCTALink("get-plan", "en")}>
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                Get a plan
                <ArrowRight size={14} />
              </span>
            </a>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
