/*
 * DESIGN: Quiet Luxury Editorial - Homepage
 * Sections: Hero (full-bleed), Trust Strip, Motivated Seller Direct Path (NEW),
 *           Advisor Intro (with credibility pull), Services Grid,
 *           Numbers Section, Strategic Tools, Market Insight, Testimonial,
 *           How This Works (NEW), Process Strip, Guide Section, Final CTA Band
 * TRACK 2 UPDATE: Added motivated seller direct path after trust strip,
 *                 pulled investing credibility into advisor intro,
 *                 added How This Works three-step section before process accordion.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Plus, Minus } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-cedar-park-home-4NeoK6eSrnasPK9gSeTzGq.webp";
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-interior-luxury-8ttBRGUkDcTUkKucmQzirD.webp";
const AERIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/cedar-park-aerial-SPVZiqyQFqbArbkNwV7GJu.webp";
const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-hero-bg-Zzemi4ArQkuF2Ww9f72uuW.webp";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`fade-in-up ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function AccordionItem({ title, children, isOpen, onClick }: { title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-[#E8E0D5] last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="font-display text-xl md:text-2xl font-light text-[#1A1A18] group-hover:text-[#B8974A] transition-colors">
          {title}
        </span>
        {isOpen ? <Minus size={20} className="text-[#B8974A]" /> : <Plus size={20} className="text-[#1A1A18]/40" />}
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] pb-8" : "max-h-0"}`}>
        <div className="font-body text-sm md:text-base text-[#1A1A18]/60 leading-relaxed">
          {children}
        </div>
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

export default function Home() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  useEffect(() => {
    setPageMeta(
      "Cedar Park & Leander TX Realtor | Sell, Remodel, Rent or Hold | Mario Manzano",
      "Mario Manzano helps homeowners in Cedar Park and Leander TX understand all their options before deciding anything. Sell, remodel, rent, or hold. Calm guidance. No pressure.",
      "https://mariomanzano.com"
    );
  }, []);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Mario Manzano, Realtor",
    "alternateName": ["Mario Manzano", "Mario Manzano Austin Realtor"],
    "@id": "https://mariomanzano.com",
    "url": "https://mariomanzano.com",
    "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg",
    "telephone": "+1-512-695-9255",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "areaServed": ["Austin TX", "Cedar Park TX", "Leander TX"],
    "sameAs": [
      "https://www.instagram.com/mariomanzanoatx",
      "https://www.tiktok.com/@mariomanzanoatx"
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* HERO */}
      <section className="relative h-auto md:min-h-screen flex items-start">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Luxury Cedar Park home" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 container py-16 md:py-0 md:pt-32 lg:pt-40 md:pb-16 lg:pb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-10 md:mb-12 pt-4 md:pt-0">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                CEDAR PARK AND LEANDER REAL ESTATE
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.0] mb-6">
              Your Home.<br />
              Your Decision.<br />
              <em className="italic">Your Advisor.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/75 max-w-xl leading-relaxed mb-10">
              Most homeowners only hear one option. I help you understand all of them, so you can decide what actually makes sense for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/strategy-hub">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                  See Your Options
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/home-value">
                <span className="btn-luxury-outline border-white text-white hover:bg-white hover:text-black inline-flex items-center gap-3 cursor-pointer">
                  See What Your Home Might Be Worth
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[#1A1A18] py-12">
        <div className="container">
          <div className="max-w-2xl">
            <p className="font-body text-base text-white/70 leading-relaxed">
              I help homeowners in Cedar Park, Leander, and the greater Austin area develop a clear strategy around selling, remodeling, renting, or holding. My job is to give you the full picture so you can make the decision that is right for your family.
            </p>
          </div>
        </div>
      </section>

      {/* TRACK 2: MOTIVATED SELLER DIRECT PATH */}
      <section className="py-16 border-b border-[#E8E0D5]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-w-4xl">
            <div>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-[#B8974A] mb-3">Already know you want to sell?</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-3">
                Start with your numbers.
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 max-w-lg leading-relaxed">
                Find out what you would actually walk away with after commission, closing costs, and your mortgage payoff. Takes two minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link href="/net-sheet">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
                  Calculate Net Proceeds
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/contact">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
                  Talk to Mario
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ADVISOR INTRO with credibility pull */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={INTERIOR_IMG} alt="Luxury interior" className="w-full h-full object-cover" />
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01. About</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                Clarity before<br />
                <em className="italic">any decision.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                I am Mario Manzano, a licensed REALTOR® and Seller Strategist based in Leander, Texas. I have bought and sold properties, run an Airbnb, done live-in flips, owned rentals, and made the sell vs hold decision with my own money on the line. That experience is what I bring to every conversation.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                Before you decide anything about your home, you deserve to understand all your options. That might mean selling. It might mean something else. My job is to walk you through the numbers so you can make the call that actually fits your situation.
              </p>
              <Link href="/about">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  My Story
                  <ArrowRight size={14} />
                </span>
              </Link>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section
        className="py-20 md:py-32 relative"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#F8F5F0]/90" />
        <div className="relative z-10 container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">02. How I Help</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-3 max-w-xl">
              Four paths homeowners often consider.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-12 max-w-lg">
              Most homeowners only think about selling. I help you look at every option with real numbers so you can decide what actually makes sense.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D5]">
            {[
              { num: "01", title: "Sell", desc: "Understand the market, timing, and what you will actually walk away with after costs." },
              { num: "02", title: "Remodel", desc: "Find out which improvements are worth it and which ones rarely return what they cost." },
              { num: "03", title: "Rent", desc: "See whether holding as a rental makes more financial sense than selling right now." },
              { num: "04", title: "Hold", desc: "Evaluate whether waiting could put you in a stronger position before you make a move." }
            ].map((service, i) => (
              <RevealDiv
                key={service.num}
                delay={i * 80}
                className="bg-[#F8F5F0] p-8 md:p-10 group hover:bg-[#1A1A18] transition-colors duration-500"
              >
                <Link href="/homeowner-guide" className="block h-full cursor-pointer">
                  <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                    {service.num}
                  </div>
                  <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="font-body text-base text-[#1A1A18]/60 group-hover:text-white/60 mb-6 transition-colors duration-500">
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#B8974A] group-hover:text-white font-body text-sm uppercase tracking-widest">
                    Explore Options
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* START WITH THE NUMBERS */}
      <section className="py-20 md:py-32">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-2xl mx-auto">
              Start with what you would actually walk away with.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 max-w-lg mx-auto">
              Before any conversation, it helps to know your numbers. Run a quick estimate and see where you stand.
            </p>
            <Link href="/net-sheet">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Calculate Your Net Proceeds
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* STRATEGIC TOOLS */}
      <section className="py-20 md:py-32 bg-[#1A1A18] text-white">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6 max-w-2xl mx-auto">
              Run the numbers on every option.
            </h2>
            <p className="font-body text-base text-white/70 mb-10 max-w-lg mx-auto">
              Selling is not always the right answer. These tools help you compare your real options before you decide anything.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sell-vs-rent">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                  Sell vs. Rent Calculator
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/remodel-vs-sell">
                <span className="btn-luxury-outline border-white text-white hover:bg-white hover:text-black inline-flex items-center gap-3 cursor-pointer">
                  Remodel vs. Sell Calculator
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* MARKET INSIGHT */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">03. Insight</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                Local market<br />
                <em className="italic">intelligence.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                The Cedar Park and Leander markets move differently than the broader Austin area. Pricing, absorption rates, and buyer demand shift at the neighborhood level, not the city level.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                I focus on Cedar Park, Leander, and the surrounding Austin area so I can give you an honest read on where things stand and what that means for your decision, whether you are thinking about selling now, waiting, or something else entirely.
              </p>
              <Link href="/homeowner-guide">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  Read the Guide
                  <ArrowRight size={14} />
                </span>
              </Link>
            </RevealDiv>

            <RevealDiv delay={150} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={AERIAL_IMG} alt="Cedar Park aerial view" className="w-full h-full object-cover" />
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 md:py-32 bg-[#1A1A18] text-white">
        <div className="container max-w-3xl text-center">
          <RevealDiv>
            <p className="font-display text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
              "Most agents would have just pushed me to list. Mario did the opposite. He walked me through every option, from renting to subdividing, until the right decision became clear. The process was smooth from there."
            </p>
            <p className="font-body text-sm uppercase tracking-widest text-[#B8974A]">
              — Chris Stevens, Leander TX
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* TRACK 2: HOW THIS WORKS */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">How This Works</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12">
              What working with me<br />
              <em className="italic">actually looks like.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "You reach out",
                desc: "No forms, no pressure. A text, a call, or a quick message. You tell me where you are and what you are thinking about."
              },
              {
                step: "02",
                title: "We look at your numbers",
                desc: "I walk you through what your home is worth, what you would walk away with, and what your options actually look like in your specific situation."
              },
              {
                step: "03",
                title: "You decide",
                desc: "Sell, wait, rent, or remodel. My job is to give you clarity, not push you toward any outcome. The decision is always yours."
              }
            ].map((item, i) => (
              <RevealDiv key={item.step} delay={i * 100}>
                <div className="border-t-2 border-[#B8974A] pt-6">
                  <p className="font-display text-4xl font-light text-[#E8E0D5] mb-4">{item.step}</p>
                  <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                  <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
                </div>
              </RevealDiv>
            ))}
          </div>

          <RevealDiv delay={300} className="mt-12">
            <Link href="/contact">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Start a Conversation
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* PROCESS STRIP */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container max-w-3xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">04. Process</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8">
              Your journey, clearly defined.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12">
              Whether you decide to sell, remodel, rent, or hold, knowing what happens at each stage makes the whole thing less stressful. Here is how I work with sellers.
            </p>
          </RevealDiv>

          <div className="space-y-4">
            <AccordionItem
              title="Before You List: Preparation and Strategy"
              isOpen={openStep === 1}
              onClick={() => setOpenStep(openStep === 1 ? null : 1)}
            >
              This is where most sellers make or lose money. Before anything goes live, we look at your timing, your equity position, what the market is doing in your specific neighborhood, and what improvements are actually worth doing versus what you can skip. The goal is to go to market in the strongest position possible, not just the fastest.
            </AccordionItem>
            <AccordionItem
              title="Going Live: Launch and Exposure"
              isOpen={openStep === 2}
              onClick={() => setOpenStep(openStep === 2 ? null : 2)}
            >
              How your home is presented in the first few days matters more than most sellers realize. Professional photography, accurate pricing, and clean marketing materials are the baseline. What sets a listing apart is the positioning, the story it tells buyers about why this home is worth what you are asking for it.
            </AccordionItem>
            <AccordionItem
              title="Offers and Negotiation: Getting the Right Terms"
              isOpen={openStep === 3}
              onClick={() => setOpenStep(openStep === 3 ? null : 3)}
            >
              Price is one part of an offer. Terms, contingencies, and closing timelines matter just as much. I walk you through what each offer actually means, not just the number on top, and help you negotiate from a clear position rather than reacting under pressure.
            </AccordionItem>
            <AccordionItem
              title="Under Contract to Closing: Keeping It on Track"
              isOpen={openStep === 4}
              onClick={() => setOpenStep(openStep === 4 ? null : 4)}
            >
              Most deals that fall apart do so between contract and closing. Inspections, appraisals, and title issues can all create friction. I stay on top of every moving piece so you are not chasing down updates or wondering what happens next. The goal is a clean close with no surprises.
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* GUIDE SECTION */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container max-w-3xl text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6 max-w-2xl mx-auto">
              Not sure where to start?
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 max-w-lg mx-auto">
              The homeowner guide walks you through the sell, remodel, rent, and hold decision with plain language and real numbers. No pressure, just clarity.
            </p>
            <Link href="/homeowner-guide">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                Read the Homeowner Guide
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="bg-[#1A1A18] py-20 md:py-32 text-center">
        <div className="container">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
              Ready to talk through your options?
            </h2>
            <p className="font-body text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              No sales pitch. Just a straightforward conversation about your home, your situation, and what actually makes sense for you.
            </p>
            <Link href="/contact">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Start a Conversation
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
