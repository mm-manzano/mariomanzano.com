/*
 * DESIGN: Quiet Luxury Editorial - Homepage
 * Sections: Hero (full-bleed), Trust Strip, Advisor Intro, Services Grid,
 *           Numbers Section, Market Insight, Testimonial, Process Strip (Updated), 
 *           Guide Section, Final CTA Band
 * Images: Generated AI hero images (CDN URLs)
 * Typography: Cormorant Garamond headlines, DM Sans body
 * Optimization: Added RealEstateAgent JSON-LD Schema for Local SEO and AI Visibility.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Plus, Minus } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

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

export default function Home() {
  const language = window.location.pathname.startsWith("/es") ? "es" : "en";
  const [openStep, setOpenStep] = useState<number | null>(null);

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

      {/* ─── HERO ──────────────────────────────────────────────────── */}
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
                AUSTIN AREA REAL ESTATE
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.0] mb-6">
              Your Home.<br />
              Your Decision.<br />
              <em className="italic">Your Advisor.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/75 max-w-xl leading-relaxed mb-10">
              Before you decide to sell, remodel, rent, or hold, start with the numbers. Get clarity from someone who puts your interests first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/home-value">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                  See what your home is worth
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/net-sheet">
                <span className="btn-luxury-outline border-white text-white hover:bg-white hover:text-black inline-flex items-center gap-3 cursor-pointer">
                  See what you'd walk away with
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTRO STRIP ─────────────────────────────────────────────── */}
      <section className="bg-[#1A1A18] py-12">
        <div className="container">
          <div className="max-w-2xl">
            <p className="font-body text-base text-white/70 leading-relaxed">
              I help homeowners across the Austin area develop a clear strategy around selling, remodeling, renting, or holding. My role is to provide clarity so you can make the decision that's right for your family.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ADVISOR INTRO ─────────────────────────────────────────── */}
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
                I'm Mario Manzano, a licensed REALTOR® and Seller Strategist based in Leander, Texas. Before you decide anything about your home, you deserve to understand all your options.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                That might mean selling, or it might mean something else. My job is to walk you through the data, the costs, and the timing so you can make the decision that makes sense for your situation.
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

      {/* ─── SERVICES GRID ─────────────────────────────────────────── */}
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
              Most homeowners don't fully understand all their options. I help you explore each one with real data and honest analysis.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D5]">
            {[
              { num: "01", title: "Sell", desc: "Understand the market, timing, and costs involved in selling your home." },
              { num: "02", title: "Remodel", desc: "Explore which improvements make sense for your home and financial situation." },
              { num: "03", title: "Rent", desc: "Consider whether holding as a rental may serve your long-term financial goals better." },
              { num: "04", title: "Hold", desc: "Evaluate whether waiting could strengthen your position before selling." }
            ].map((service, i) => (
              <RevealDiv
                key={service.num}
                delay={i * 80}
                className="bg-[#F8F5F0] p-8 md:p-10 group hover:bg-[#1A1A18] transition-colors duration-500"
              >
                <Link href="/home-value" className="block h-full cursor-pointer">
                  <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                    {service.num}
                  </div>
                  <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[#1A1A18]/60 group-hover:text-white/60 leading-relaxed transition-colors duration-500 mb-4">
                    {service.desc}
                  </p>
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] group-hover:text-white inline-flex items-center gap-2 transition-colors duration-500">
                    Explore Options <ArrowRight size={12} />
                  </span>
                </Link>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NUMBERS SECTION ───────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4">
              Start with the numbers
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-12 max-w-lg mx-auto">
              Before making a decision, understand your home value and net proceeds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/home-value">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                  Home Value
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/net-sheet">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Net Sheet
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── SELLING PROCESS (INTEGRATED) ──────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">03. Process</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                What happens<br />
                <em className="italic">after you decide.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                A clear walkthrough of the selling process. From listing to closing, here's what to expect when we move forward.
              </p>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="max-w-xl">
                <AccordionItem
                  title="01. Before You List"
                  isOpen={openStep === 1}
                  onClick={() => setOpenStep(openStep === 1 ? null : 1)}
                >
                  We'll align on your property, timeline, and goals. I'll prepare a market analysis so we start from data, not guesswork. We'll also cover any preparation that helps buyers see your home clearly.
                </AccordionItem>
                <AccordionItem
                  title="02. Going Live"
                  isOpen={openStep === 2}
                  onClick={() => setOpenStep(openStep === 2 ? null : 2)}
                >
                  Your home hits the MLS, Zillow, and Realtor.com with professional photos. The first two weeks are crucial—we'll monitor buyer response and activity closely.
                </AccordionItem>
                <AccordionItem
                  title="03. Offers & Negotiation"
                  isOpen={openStep === 3}
                  onClick={() => setOpenStep(openStep === 3 ? null : 3)}
                >
                  We evaluate offers strategically, looking at price, terms, and risk. I'll help you understand the full picture before you sign anything.
                </AccordionItem>
                <AccordionItem
                  title="04. Under Contract to Closing"
                  isOpen={openStep === 4}
                  onClick={() => setOpenStep(openStep === 4 ? null : 4)}
                >
                  The process continues with inspections (7-10 days), appraisal (10-14 days), and final walkthrough. Typical timeline is 30-45 days from contract to closing.
                </AccordionItem>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ───────────────────────────────────────────── */}
      <section className="bg-[#1A1A18] py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center">
                <blockquote className="font-display text-lg md:text-xl lg:text-2xl font-light text-white leading-relaxed italic mb-6">
                  "Mario went above and beyond to help us sell our home... getting us more money than what our original realtor said we'd get."
                </blockquote>
                <div className="font-body text-sm font-medium text-[#D4B878]">Alma S.</div>
              </div>
              <div className="text-center">
                <blockquote className="font-display text-lg md:text-xl lg:text-2xl font-light text-white leading-relaxed italic mb-6">
                  "Mario is someone you can actually trust in real estate. He listens, he's honest, and he looks out for you."
                </blockquote>
                <div className="font-body text-sm font-medium text-[#D4B878]">ImVaryn</div>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── GUIDE SECTION ─────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-6">Deeper Learning</h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-10 max-w-lg mx-auto">
              Not ready to talk yet? Explore our comprehensive guide for Austin homeowners.
            </p>
            <a href={getCTALink("get-guide", language)} rel="noopener noreferrer">
              <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                View the Homeowner Guide <ArrowRight size={14} />
              </span>
            </a>
          </RevealDiv>
        </div>
      </section>

      {/* ─── FINAL CTA BAND ────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/85" />
        </div>
        <div className="relative z-10 container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-6 max-w-2xl mx-auto">
              Understanding your situation.
            </h2>
            <p className="font-body text-base text-white/60 mb-10 max-w-lg mx-auto">
              A consultation where we review your home, your options, and what makes sense for your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/home-value">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                  Home Value <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/net-sheet">
                <span className="btn-luxury-outline border-white text-white hover:bg-white hover:text-black inline-flex items-center gap-3 cursor-pointer">
                  Net Sheet <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
