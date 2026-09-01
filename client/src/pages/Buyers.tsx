/*
 * DESIGN: Quiet Luxury Editorial - Buyers Page
 * Matches homepage theme: same fonts, colors, RevealDiv scroll animation,
 * same button styles, same section rhythm (label + headline + copy).
 * Sections: Hero, Trust Strip, How I Help Buyers (grid), How This Works, Final CTA
 * SEO FIX: setPageMeta now also writes a <link rel="canonical"> tag, and the
 *       page URL / schema URL both use the trailing-slash form (/buyers/) to
 *       match where prerender.js actually writes the file (dist/buyers/index.html).
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const HERO_IMG = "/images/cedar-park-tx-sold-home-clover-ridge-mario-manzano-exterior.jpg";
const INTERIOR_IMG = "/images/cedar-park-tx-sold-home-clover-ridge-mario-manzano-interior.jpg";

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
  setMeta("og:image", "/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);

  // Canonical tag. Without this, Google has to guess which version of the
  // URL (with or without trailing slash) is the real one. Setting it
  // explicitly stops the redirect confusion from recurring on this page.
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

export default function Buyers() {
  useEffect(() => {
    setPageMeta(
      "Cedar Park & Leander TX Buyer Strategist | Mario Manzano",
      "Mario Manzano helps buyers in Cedar Park, Leander, and the greater Austin area avoid overpaying and buy with confidence. Clear numbers, no pressure.",
      "https://mariomanzano.com/buyers/"
    );
  }, []);

  const buyerServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Home Buyer Representation",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "telephone": "+1-512-695-9255",
      "url": "https://mariomanzano.com"
    },
    "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"],
    "url": "https://mariomanzano.com/buyers/",
    "description": "Mario Manzano helps buyers in Cedar Park, Leander, and the greater Austin area understand true market value before making an offer, so they don't overpay."
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buyerServiceSchema) }}
      />

      {/* HERO */}
      <section className="relative h-auto md:min-h-[70vh] flex items-start">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Cedar Park home for buyers" className="w-full h-full object-cover" />
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
              Buy Smart.<br />
              Not Fast.<br />
              <em className="italic">With Confidence.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/75 max-w-xl leading-relaxed mb-10">
              Most buyers just want to know they're paying a fair price. I help you understand the numbers before you make an offer, so you can move with confidence instead of guessing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://go.mariomanzano.com/buyer-plan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.fbq) { window.fbq("trackCustom", "Lead_Buyer"); }
                }}
                className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0"
              >
                Start a Conversation
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[#1A1A18] py-12">
        <div className="container">
          <div className="max-w-2xl">
            <p className="font-body text-base text-white/70 leading-relaxed">
              I help buyers in Cedar Park, Leander, and the greater Austin area understand what a home is really worth before they make an offer. My job is to give you the facts, explain your options, and help you buy with confidence instead of pressure.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH HOMES DIRECT PATH */}
      <section className="py-16 border-b border-[#E8E0D5]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-[#B8974A] mb-3">Ready to start looking?</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-3">
                Search homes in Cedar Park and Leander.
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 max-w-lg leading-relaxed">
                Browse active listings and see what is on the market right now, then let's talk through what actually fits your situation.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white p-3 shadow-sm border border-[#E8E0D5] inline-block">
                <iframe
                  style={{ width: "280px", height: "680px" }}
                  src="https://mariomanzano.exprealty.com/embedsmall.php"
                  allowTransparency={true}
                  frameBorder="0"
                  title="Home Search Tool"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / CREDIBILITY */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={INTERIOR_IMG} alt="Home interior" className="w-full h-full object-cover" />
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01. About</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                A strategist,<br />
                <em className="italic">not a salesperson.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                I am Mario Manzano, a licensed REALTOR® based in Leander, Texas. I have bought and sold properties, run an Airbnb, done live-in flips, and owned rentals. I look at every home the way an investor would, what it is really worth, what it will cost you later, and whether the price makes sense.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                When you are ready to make an offer, you will know exactly where you stand and why.
              </p>
              <Link href="/about/">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  My Story
                  <ArrowRight size={14} />
                </span>
              </Link>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* HOW I HELP BUYERS GRID */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">02. How I Help</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-3 max-w-xl">
              What buying with me actually looks like.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-12 max-w-lg">
              No pressure to move fast. Just a clear read on the numbers before you commit to anything.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D5]">
            {[
              { num: "01", title: "The Value", desc: "See what a home is actually worth based on comparable sales, not just the list price." },
              { num: "02", title: "The Offer", desc: "Build an offer that protects you on price and terms, not just the highest number you can afford." },
              { num: "03", title: "The Condition", desc: "Understand what repairs or updates will actually cost before they become your problem." },
              { num: "04", title: "The Close", desc: "Stay ahead of inspections, appraisals, and paperwork so nothing catches you off guard." }
            ].map((item, i) => (
              <RevealDiv
                key={item.num}
                delay={i * 80}
                className="bg-[#F8F5F0] p-8 md:p-10 group hover:bg-[#1A1A18] transition-colors duration-500"
              >
                <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                  {item.num}
                </div>
                <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="font-body text-base text-[#1A1A18]/60 group-hover:text-white/60 transition-colors duration-500">
                  {item.desc}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* HOW THIS WORKS */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">How This Works</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12">
              Three steps,<br />
              <em className="italic">no pressure.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "You reach out",
                desc: "No forms, no pressure. Tell me what you are looking for and where you are in the process."
              },
              {
                step: "02",
                title: "We look at the numbers",
                desc: "I pull real comps and walk you through what a home is actually worth before you make any decisions."
              },
              {
                step: "03",
                title: "You make your move",
                desc: "When you are ready to offer, you will know exactly where you stand. The pace is always yours."
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
            <a
              href="https://go.mariomanzano.com/buyer-plan"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (window.fbq) { window.fbq("trackCustom", "Lead_Buyer"); }
              }}
              className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0"
            >
              Start a Conversation
              <ArrowRight size={14} />
            </a>
          </RevealDiv>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="bg-[#1A1A18] py-20 md:py-32 text-center">
        <div className="container">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
              Ready to buy with confidence?
            </h2>
            <p className="font-body text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              No sales pitch. Just a straightforward conversation about what you are looking for and what it is actually worth.
            </p>
            <a
              href="https://go.mariomanzano.com/buyer-plan"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (window.fbq) { window.fbq("trackCustom", "Lead_Buyer"); }
              }}
              className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0"
            >
              Start a Conversation
              <ArrowRight size={14} />
            </a>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
