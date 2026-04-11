/*
 * DESIGN: Quiet Luxury Editorial - Homepage
 * Sections: Hero (full-bleed), Trust Strip, Advisor Intro, Services Grid,
 *           Market Insight, Testimonial, CTA Band, Footer
 * Images: Generated AI hero images (CDN URLs)
 * Typography: Cormorant Garamond headlines, DM Sans body
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
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

export default function Home() {
  const language = window.location.pathname.startsWith("/es") ? "es" : "en";
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative md:h-screen flex items-start overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG}
            alt="Luxury Cedar Park home at dusk"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay: dark at bottom for text legibility */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-50 container py-16 md:py-0 md:pt-32 lg:pt-40 md:pb-16 lg:pb-24">
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
              Before you decide to sell, remodel, rent, or hold, you deserve clarity from someone who puts your interests first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={getCTALink("get-guide", language)}
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.fbq) {
                    window.fbq("trackCustom", "GuideDownload");
                  }
                }}
              >
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  View the Homeowner Guide
                  <ArrowRight size={14} />
                </span>
              </a>
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
            {/* Image */}
            <RevealDiv className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={INTERIOR_IMG}
                  alt="Luxury Texas Hill Country interior"
                  className="w-full h-full object-cover"
                />

              </div>
            </RevealDiv>

            {/* Text */}
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
                I'm Mario Manzano, a licensed REALTOR® and Seller Strategist based in Leander, Texas, serving the greater Austin area. Before you decide anything about your home, you deserve to understand all your options.
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
        style={{
          backgroundImage: `url(${TEXTURE_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
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
              {
                num: "01",
                title: "Sell",
                desc: "Understand the market, timing, and costs involved in selling your home.",
              },
              {
                num: "02",
                title: "Remodel",
                desc: "Explore which improvements make sense for your home and financial situation.",
              },
              {
                num: "03",
                title: "Rent",
                desc: "Consider whether holding as a rental may serve your long-term financial goals better.",
              },
              {
                num: "04",
                title: "Hold",
                desc: "Evaluate whether waiting could strengthen your position before selling."
              },
            ].map((service, i) => (
              <RevealDiv
                key={service.num}
                delay={i * 80}
                className="bg-[#F8F5F0] p-8 md:p-10 group hover:bg-[#1A1A18] transition-colors duration-500"
              >
                <a href={getCTALink("get-guide", "en")} className="block h-full cursor-pointer">
                  <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                    {service.num}
                  </div>
                  <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[#1A1A18]/60 group-hover:text-white/60 leading-relaxed transition-colors duration-500 mb-4">
                    {service.desc}
                  </p>
                  <span className="font-body text-base font-medium text-[#b8974a] group-hover:text-[#D4B878] transition-colors duration-500 inline-block mt-2">
  {language === "es"
    ? "Ver la Guía del Propietario"
    : "View the Homeowner Guide"}
</span>
                </a>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARKET INSIGHT ────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">03. Market</span>
              </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
              Understanding the<br />
              <em className="italic">Austin area market.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-6">
              The market isn't one number.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-6">
              What a home can sell for depends on the property, the neighborhood, and what buyers are doing right now.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
              Whether now is the right time to sell depends on your specific property, your neighborhood, and your personal situation. I can walk you through the current data so you understand what's realistic for your home.
            </p>

            </RevealDiv>

            {/* Aerial Image */}
            <RevealDiv delay={150}>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={AERIAL_IMG}
                    alt="Cedar Park Texas neighborhood aerial view"
                    className="w-full h-full object-cover"
                  />
                </div>

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
                  "Mario went above and beyond to help us sell our home. He set a great impression that led to a positive experience. Well organized and willing to go above and beyond, getting us more money than what our original realtor said we'd get."
                </blockquote>
                <div className="font-body text-sm font-medium text-[#D4B878]">
                  Alma S.
                </div>
              </div>
              <div className="text-center">
                <blockquote className="font-display text-lg md:text-xl lg:text-2xl font-light text-white leading-relaxed italic mb-6">
                  "Mario is someone you can actually trust in real estate. He listens, he's honest, and he looks out for you. Not a lot of agents operate that way. Grateful to have him as my go-to in Austin."
                </blockquote>
                <div className="font-body text-sm font-medium text-[#D4B878]">
                  ImVaryn
                </div>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── PROCESS STRIP ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">04. Process</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-lg">
              Three conversations.<br />
              <em className="italic">Total clarity.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {[
              {
                step: "01",
                title: "Discovery Call",
                desc: "We talk about your property, your timeline, and what matters most to you. No pressure, no pitch.",
              },
              {
                step: "02",
                title: "Your Options Report",
                desc: "I prepare a custom analysis showing what your home is worth today, your net proceeds if you sell, and alternative paths.",
              },
              {
                step: "03",
                title: "Your Decision",
                desc: "Armed with real data, you decide. I execute whatever path you choose. with full commitment and no judgment.",
              },
            ].map((item, i) => (
              <RevealDiv
                key={item.step}
                delay={i * 100}
                className="relative md:pr-12 md:border-r md:border-[#E8E0D5] last:border-0 last:pr-0 md:pl-12 first:pl-0"
              >
                <div className="font-display text-6xl font-light text-[#E8E0D5] mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">
                  {item.desc}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ──────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt=""
            className="w-full h-full object-cover"
          />
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
              <a
                href={getCTALink("get-guide", "en")}
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.fbq) {
                    window.fbq("trackCustom", "GuideDownload");
                  }
                }}
              >
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  View the Homeowner Guide
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
