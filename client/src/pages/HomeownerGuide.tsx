/*
 * DESIGN: Quiet Luxury Editorial - Homeowner Guide
 * Sections: Hero, Clear Look at Options, Preparing vs Selling, Pricing Strategy, Selling vs Renting, Holding, As-Is, Remodel, Putting It Together, CTA
 * Optimization: Added Comparison Table, FAQ Section, and JSON-LD Schema for AI Visibility.
 * Fix: Responsive-first layout for Desktop and Mobile visibility.
 * COPY UPDATE: Fixed hero image, tightened section 01, fixed pricing labels, sharper remodel
 *              headline and copy, removed broken PDF link, stronger final CTA.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Plus, Minus } from "lucide-react";
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E0D5] py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left group focus:outline-none"
      >
        <span className="font-display text-xl md:text-2xl font-light text-[#1A1A18] group-hover:text-[#B8974A] transition-colors">
          {question}
        </span>
        <span className="text-[#B8974A] ml-4 flex-shrink-0">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

function setPageMeta(title: string, description: string, url: string) {
  document.title = title;
  const setMeta = (name: string, content: string, property = false) => {
    const attr = property ? "property" : "name";
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  };
  setMeta("description", description);
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("og:url", url, true);
  setMeta("og:type", "website", true);
  setMeta("og:image", "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg", true);
}

export default function HomeownerGuide() {
  useEffect(() => {
    setPageMeta(
      "Homeowner Guide: Sell, Remodel, Rent or Hold | Cedar Park & Leander TX",
      "Not sure what to do with your home? This guide walks Cedar Park and Leander TX homeowners through all four options with plain language and real tradeoffs. No pressure.",
      "https://mariomanzano.com/homeowner-guide"
    );
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When should I sell my home as-is in Austin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selling as-is makes sense when you want to avoid the time, stress, and upfront cost of repairs. In the Austin market, this is a tradeoff: you accept a potentially lower offer in exchange for a faster, more certain exit. It is ideal if the property needs significant work you are not prepared to manage."
        }
      },
      {
        "@type": "Question",
        "name": "Is renting better than selling in Leander or Cedar Park?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In the Cedar Park and Leander market, renting is typically a long-term appreciation play. If your current mortgage rate is significantly lower than market rents, it may be a strong wealth-building tool. However, if you need that equity for your next down payment or want to avoid the responsibilities of being a landlord, selling is often the cleaner financial move."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know if a remodel will actually increase my home's value?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus on functional systems, cleanliness, and neutral presentation. Major luxury renovations rarely return their full cost. If the improvement does not meaningfully increase buyer demand or your daily quality of life, it is likely not a strategic move before selling."
        }
      },
      {
        "@type": "Question",
        "name": "What is the biggest risk of holding and doing nothing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The primary risk is opportunity cost. While holding avoids immediate stress, your equity remains illiquid and you continue to incur costs for taxes, insurance, and maintenance. Holding is a valid strategy for clarity, but it should not be used to avoid an inevitable decision."
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
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
              Sell, Remodel,<br />
              <em className="italic">Rent, or Hold.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              A plain-language guide to the four decisions Cedar Park and Leander homeowners face. No pressure, just clarity.
            </p>
          </div>
        </div>
      </section>

      {/* A CLEAR LOOK AT YOUR OPTIONS */}
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
              Most homeowners only consider selling. But depending on your goals, timeline, and financial situation, one of the other three paths might actually serve you better.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              This guide lays out all four options side by side so you can see the tradeoffs clearly before committing to anything. The right path depends on your situation, not a general rule.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-6">
              Take your time with this. A decision this size deserves more than a few hours of research.
            </p>

            {/* COMPARISON TABLE */}
            <div className="mt-16 w-full">
              <div className="bg-white border border-[#E8E0D5] p-6 md:p-12 shadow-sm">
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-8">The Four Paths at a Glance</h3>
                <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#E8E0D5]">
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Strategy</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/4">When It Makes Sense</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Financial Upside</th>
                        <th className="pb-4 font-display text-sm uppercase tracking-widest text-[#B8974A] font-medium w-1/5">Risks and Tradeoffs</th>
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
                        <td className="py-6 pr-4">Your home has good bones but needs updates to work better for your needs.</td>
                        <td className="py-6 pr-4">Improved quality of life and potential increase in resale value. May also create the option to access equity for a future move.</td>
                        <td className="py-6 pr-4">High upfront costs. Luxury upgrades rarely deliver a 100% return on investment.</td>
                        <td className="py-6">Homeowners who love their location but want their home to work better.</td>
                      </tr>
                      <tr className="border-b border-[#F8F5F0]">
                        <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Rent</td>
                        <td className="py-6 pr-4">Your mortgage payment is low and you want to build long-term wealth.</td>
                        <td className="py-6 pr-4">Long-term equity growth and potential for future appreciation.</td>
                        <td className="py-6 pr-4">Ongoing maintenance, tenant management, and vacancy risks.</td>
                        <td className="py-6">Investors focused on long-term wealth rather than immediate cash flow.</td>
                      </tr>
                      <tr className="border-b border-[#F8F5F0]">
                        <td className="py-6 font-display text-lg text-[#1A1A18] font-light">Hold</td>
                        <td className="py-6 pr-4">You need more time to decide or market conditions do not favor your goals.</td>
                        <td className="py-6 pr-4">Avoids transaction costs and allows for more clarity before acting.</td>
                        <td className="py-6 pr-4">Equity remains tied up. Ongoing taxes, insurance, and maintenance continue.</td>
                        <td className="py-6">Homeowners who are not under pressure and value certainty over speed.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* PREPARATION */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">02. Preparation</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Know the difference before listing.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-12">
              Many sellers spend money on repairs and upgrades that do not meaningfully increase value or buyer demand. Before you start spending, it helps to understand what actually moves the needle and what does not.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealDiv delay={100} className="p-8 bg-[#F8F5F0] border border-[#E8E0D5]">
              <h3 className="font-display text-xl font-light mb-4 text-[#B8974A]">What Matters</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                Basic cleanliness, functional systems, and neutral presentation help buyers see themselves in the space without distraction.
              </p>
            </RevealDiv>
            <RevealDiv delay={200} className="p-8 bg-[#F8F5F0] border border-[#E8E0D5]">
              <h3 className="font-display text-xl font-light mb-4 text-[#B8974A]">What Does Not</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                Major renovations, luxury upgrades, and personal taste projects rarely deliver full return on investment before a sale.
              </p>
            </RevealDiv>
            <RevealDiv delay={300} className="p-8 bg-[#F8F5F0] border border-[#E8E0D5]">
              <h3 className="font-display text-xl font-light mb-4 text-[#B8974A]">The Right Question</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                Will this improvement meaningfully increase buyer interest or your net proceeds? If the answer is not clear, it is probably not worth doing.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* PRICING STRATEGY */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">03. Pricing</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                Your most important<br />
                <em className="italic">decision.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-6">
                How you price your home shapes everything that follows. It affects how buyers perceive the property, how quickly you receive offers, and what you ultimately walk away with.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                The right price is not the highest number you can defend. It is the number that puts you in front of the right buyers at the right time.
              </p>
            </RevealDiv>

            <div className="space-y-8">
              <RevealDiv delay={150} className="border-l-2 border-[#B8974A] pl-8">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-2">Underpricing Risk</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                  Pricing too low leaves money on the table. It can also signal to buyers that something is wrong with the property, which invites lower offers and tougher negotiations.
                </p>
              </RevealDiv>
              <RevealDiv delay={250} className="border-l-2 border-[#B8974A] pl-8">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-2">Overpricing Risk</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                  Starting too high pushes most qualified buyers out before they even schedule a showing. Price reductions that follow signal desperation and rarely recover the original momentum.
                </p>
              </RevealDiv>
            </div>
          </div>
        </div>
      </section>

      {/* SELLING VS RENTING */}
      <section className="py-20 md:py-32 bg-[#1A1A18] text-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="section-number text-[#B8974A]">04. Strategy</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-12 max-w-2xl">
              Understanding your tradeoffs.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <RevealDiv delay={100}>
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-6">The Reality of Renting</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                Keeping your home as a rental means taking on ongoing responsibility. Tenant screening, maintenance, property management, and vacancy periods are all part of the equation.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                In the Cedar Park and Leander market, renting tends to be a long-term equity play more than a cash flow strategy. It makes the most sense when your mortgage payment is low relative to what the home could rent for.
              </p>
            </RevealDiv>
            <RevealDiv delay={200}>
              <h3 className="font-display text-2xl font-light text-[#B8974A] mb-6">The Reality of Selling</h3>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                Selling gives you liquidity and removes the ongoing responsibility of owning the property. No more repairs, tenants, or carrying costs tied to that home.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                The tradeoff is giving up future appreciation. Once the home is sold, you no longer participate in any market gains tied to that property.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* REMODEL */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Remodel</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              When remodeling<br />
              <em className="italic">actually makes sense.</em>
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Remodeling can help your home work better for your current life or position it more competitively for sale. The key is knowing which improvements actually move the needle and which ones just cost money.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                In most cases, functional updates and neutral presentation outperform luxury renovations when it comes to return on investment. Buyers pay for condition and location, not personal taste.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                For some homeowners, a strategic remodel paired with a refinance can open up options that were not on the table before, including accessing equity for the next move or repositioning the property for a different use.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Like any path, this only makes sense when the numbers support it. That is worth running before you commit to anything.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* HOLDING */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">06. Holding</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Doing nothing can be strategic.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-12">
              Holding your property is not procrastination if there is a reason behind it. Waiting for more clarity or better market conditions is a legitimate choice. The important thing is making sure you understand what it is actually costing you while you wait.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealDiv delay={100}>
              <h3 className="font-display text-xl font-light text-[#1A1A18] mb-4">Waiting Makes Sense When</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                You need time to figure out your next move. You are not under financial pressure to act. Market conditions do not currently align with your goals. You want more certainty before committing to any direction.
              </p>
            </RevealDiv>
            <RevealDiv delay={200}>
              <h3 className="font-display text-xl font-light text-[#1A1A18] mb-4">The Cost of Waiting</h3>
              <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                Your equity stays locked in the property while you pay taxes, insurance, and maintenance. Future market timing is not predictable, and holding indefinitely is not a strategy, it is a delay. Make sure you know the difference.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* PUTTING IT TOGETHER */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">07. Summary</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              The best choice depends on four things.
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Your Goals", desc: "What are you actually trying to accomplish? More space, financial flexibility, retirement planning, or something else entirely?" },
              { title: "Your Timeline", desc: "Do you have time to be patient, or do you need to move within a specific window? That changes the math on every option." },
              { title: "Your Property", desc: "What condition is it in? A home that needs significant work has a different set of options than one that is move-in ready." },
              { title: "Your Capacity", desc: "How much time, money, and uncertainty are you willing to take on? Every path has a cost beyond the financial one." }
            ].map((item, i) => (
              <RevealDiv key={item.title} delay={i * 100} className="border-t border-[#E8E0D5] pt-6">
                <h3 className="font-display text-lg font-light text-[#B8974A] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container max-w-3xl">
          <RevealDiv>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-12 text-center">
              Common Questions
            </h2>
            <div className="space-y-2">
              <FAQItem
                question="When should I sell my home as-is in Austin?"
                answer="Selling as-is makes sense when you want to avoid the time, stress, and upfront cost of repairs. In the Austin market, this is a tradeoff: you accept a potentially lower offer in exchange for a faster, more certain exit. It makes the most sense when the property needs significant work you are not prepared to manage."
              />
              <FAQItem
                question="Is renting better than selling in Leander or Cedar Park?"
                answer="In the Cedar Park and Leander market, renting is typically a long-term appreciation play. If your current mortgage rate is significantly lower than market rents, it may be a strong wealth-building tool. However, if you need that equity for your next down payment or want to avoid being a landlord, selling is often the cleaner financial move."
              />
              <FAQItem
                question="How do I know if a remodel will actually increase my home's value?"
                answer="Focus on functional systems, cleanliness, and neutral presentation. Major luxury renovations rarely return their full cost. If the improvement does not meaningfully increase buyer demand, it is likely not the right move before selling."
              />
              <FAQItem
                question="What is the biggest risk of holding and doing nothing?"
                answer="The primary risk is opportunity cost. While holding avoids immediate stress, your equity stays illiquid and you continue paying taxes, insurance, and maintenance. Holding is a valid strategy when you need clarity, but it should not be used to avoid a decision you have already made mentally."
              />
              <FAQItem
                question="Why is pricing the most important decision in the selling process?"
                answer="Pricing shapes how the market responds to your home from day one. Underpricing leaves money on the table. Overpricing makes your home invisible to the buyers who can actually afford it. A well-positioned price brings the right interest immediately, before momentum fades."
              />
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-2xl mx-auto">
              Not sure which path fits your situation?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 max-w-lg mx-auto">
              I can walk you through the numbers on each option and help you figure out which one actually makes sense for where you are right now. No pressure, just a real conversation.
            </p>
            <a href={getCTALink("get-plan", "en")}>
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                Start a Conversation
                <ArrowRight size={14} />
              </span>
            </a>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
