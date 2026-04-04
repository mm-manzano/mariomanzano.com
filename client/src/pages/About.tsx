/*
 * DESIGN: Quiet Luxury Editorial - About Page
 * Goal: Personal, real, based on lived experience
 * Sections: Intro, How It Started, Real Experience, Approach, Family, How I Work, Close
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const ADVISOR_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-advisor-bg-FFo7WwjyuZSVioVNUzZH62.webp";
const MARIO_HEADSHOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg";
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

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* SECTION 1: INTRO */}
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
                About Mario
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

      {/* SECTION 2: HOW IT STARTED */}
      <section className="py-16 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <RevealDiv>
              <div className="relative">
                <div className="overflow-hidden bg-[#E8E0D5]">
                  <img
                    src={MARIO_HEADSHOT}
                    alt="Mario Manzano"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01. How It Started</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6">
                From debt to<br />
                <em className="italic">real estate.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                I found Dave Ramsey while I was thousands in debt. That changed everything. I committed to getting out of debt, saved aggressively, and changed how I thought about money.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                Once I got out of debt, I wanted financial independence. As I started researching what to do next, everything kept pointing back to real estate.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                I spent time on BiggerPockets, read books, and started understanding how people actually build wealth through investing.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                That research led me to get licensed as a REALTOR®. But more importantly, it changed how I approached investing, pushed me to keep building my portfolio, and allowed me to help others navigate their own real estate decisions.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Real estate has always been around me. My parents and siblings are all landlords.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 3: REAL EXPERIENCE */}
      <section className="py-16 md:py-28 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="section-number text-[#D4B878]">02. Real Experience</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-12 max-w-2xl">
              I've lived through<br />
              <em className="italic">the decisions.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 max-w-4xl items-start">
            <RevealDiv delay={100}>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                I didn't learn real estate from courses alone. I've had to make the decisions myself.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                I've wholesaled properties, bought deals off-market, flipped land, and taken on projects like demoing a property and selling the land. I've also done live-in flips, owned rentals, and been a landlord for about a decade. I've used DSCR loans in my own investing, so I understand how deals are evaluated based on the property's performance, not just personal income.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                My wife and I built and ran an Airbnb. We renovated and furnished it ourselves and became a 5-star host. When it stopped performing, we shut it down and moved to long-term renting, which worked better.
              </p>
            </RevealDiv>

            <RevealDiv delay={200}>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                A big part of how we approach homes comes from our eye for design. She's especially strong in this area. From our Airbnb to our own home, properties we've sold, and the clients we've helped, we've been hands-on with design, layout, and presentation. That shows up in how we help clients prepare and present their homes in a way that connects with buyers.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                That includes everything from full remodel decisions to simple changes like furniture placement, organization, and finishing touches that make a home feel right to buyers.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                These were real decisions with real consequences. The kind you don't forget, and the kind that change how you guide others.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 4: APPROACH */}
      <section className="py-16 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03. My Approach</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              Selling isn't always<br />
              <em className="italic">the best move.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl">
            <RevealDiv delay={100}>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-6">
                Most people feel pressured to make a quick decision about their home. They're not sure what their options are. They don't have clear numbers. So they rush.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                I help people think through their decisions instead of pushing them. Holding can create more value than selling. Renting can make more sense than selling. Improving the property first can change everything.
              </p>
            </RevealDiv>

            <RevealDiv delay={200}>
              <div className="border-l-2 border-[#B8974A] pl-6">
                <p className="font-display text-xl italic font-light text-[#1A1A18] leading-relaxed mb-4">
                  "The best advice I can give is sometimes to wait. Or to hold. Or to improve the property first. Whatever makes sense for your situation."
                </p>
                <p className="font-body text-sm text-[#1A1A18]/50">Mario Manzano</p>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAMILY */}
      <section
        className="py-20 md:py-28 relative"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-[#F8F5F0]/90" />
        <div className="relative z-10 container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">04. Family</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              Married with<br />
              <em className="italic">two kids.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-4xl">
            <RevealDiv delay={100}>
                 <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed md:mb-6 mb-3">
                I'm married to my high school sweetheart. We have two kids and are now empty nesters. Our son house hacked his first home after college, which was a great experience for both of us.
              </p>
            </RevealDiv>

            <RevealDiv delay={200} className="-mt-3 md:mt-0">
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                Our daughter is studying Design Management with minors in Marketing and Home Furnishings, and plans to get her real estate license so we can work together and help clients at a deeper level. Real estate is part of our family's life, not just my work.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW I WORK */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. How I Work</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              Three principles<br />
              <em className="italic">that guide everything.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {[
              {
                title: "Clarity Over Pressure",
                desc: "Before we talk about anything else, you understand your situation. Your equity, your market, your timeline. Clarity first, always.",
              },
              {
                title: "Tradeoffs Explained",
                desc: "Every option has tradeoffs. I help you see them clearly, the financial side, the practical side, the timing. Then you decide.",
              },
              {
                title: "Decisions Based on Real Numbers",
                desc: "Your decision should be based on solid information. Comparable sales, market absorption rates, buyer demand. This gives you a realistic foundation.",
              },
            ].map((item, i) => (
              <RevealDiv key={item.title} delay={i * 100} className="bg-[#F8F5F0] p-8 border-t-2 border-[#B8974A]">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CREDENTIALS */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="section-number text-[#D4B878]">06. CREDENTIALS</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-10 max-w-2xl">
              Expertise<br />
              <em className="italic">you can verify.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {[
              {
                title: "Licensed REALTOR®",
                body: "Active member in good standing with the National Association of REALTORS®.",
              },
              {
                title: "Pricing Strategy Advisor (PSA)",
                body: "Focused training in pricing strategy, market analysis, and helping sellers make data-driven decisions.",
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
              <RevealDiv key={cred.title} delay={i * 100} className="border-t border-white/10 pt-6">
                <h3 className="font-display text-lg font-light text-white mb-2">{cred.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">{cred.body}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CLOSE */}
      <section className="py-20 md:py-28">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-xl mx-auto">
              Based in Leander and working across the Austin area.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-10 max-w-lg mx-auto">
              I help homeowners make decisions with clarity and confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a href={getCTALink("start-conversation", "en")} className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0">
  Start a conversation
  <ArrowRight size={16} />
</a>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
