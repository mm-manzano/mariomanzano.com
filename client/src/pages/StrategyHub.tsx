/*
 * DESIGN: Quiet Luxury Editorial - Strategy Hub
 * Purpose: Central hub linking to all three strategy tools
 * FINAL: Meta tags, Open Graph, WebPage schema, educational copy added.
 *        CTA copy corrected. Tool card descriptions improved.
 * UPDATE: Meta description, schema description, and bottom CTA broadened
 *         to serve Austin area homeowners (not Cedar Park & Leander only).
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useLayoutEffect } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Above the fold: show right away with no fade, so the top of the page is never blank
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible", "no-fade");
      return;
    }
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
  return (
    <div ref={ref} className={`fade-in-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
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
  setMeta("og:image", "https://mariomanzano.com/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

export default function StrategyHub() {
  useEffect(() => {
    setPageMeta(
      "Home Selling Strategy Hub | Cedar Park & Leander TX",
      "Compare your options before deciding. Calculate net proceeds, compare selling vs renting, and test a remodel. Free tools for Greater Austin homeowners.",
      "https://mariomanzano.com/strategy-hub/"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Home Selling Strategy Hub",
    "url": "https://mariomanzano.com/strategy-hub/",
    "description": "Free strategy tools for Greater Austin homeowners. Compare selling vs renting, calculate net proceeds, and analyze remodel ROI before making any decisions.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container">
        <RevealDiv>
          <div className="flex items-center gap-3 mb-4">
            <span className="section-rule" />
            <span className="section-number">01. Your Strategy</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-[#1A1A18] mb-6">
            Start with the numbers.<br />
            <span className="font-semibold">Decide with clarity.</span>
          </h1>
          <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6 max-w-2xl">
            Most homeowners make their biggest financial decision without running the actual numbers first. These tools are built to change that.
          </p>
          <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12 max-w-2xl">
            Whether you are leaning toward selling, considering a rental, or wondering if a remodel makes sense, start here. Each tool takes about two minutes and gives you a clear financial picture before any conversation with an agent.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Net Sheet */}
          <RevealDiv delay={100}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-medium text-[#1A1A18] mb-4">
                See what you would <span className="font-semibold">actually</span> walk away with.
              </h2>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6 flex-grow">
                The sale price is not what you keep. After commission, closing costs, and your remaining mortgage balance, your net proceeds can look very different. This calculator shows you the real number before you commit to anything.
              </p>
              <Link href="/net-sheet/">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Calculate Net Proceeds
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>

          {/* Sell vs Rent */}
          <RevealDiv delay={200}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-medium text-[#1A1A18] mb-4">
                Should you <span className="font-semibold">sell or rent</span> your home?
              </h2>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6 flex-grow">
                Selling gives you liquidity now. Renting keeps your equity working over time. This tool compares both paths side by side so you can see which one actually comes out ahead based on your specific numbers and timeline.
              </p>
              <Link href="/sell-vs-rent/">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Compare Sell vs. Rent
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>

          {/* Remodel vs Sell */}
          <RevealDiv delay={300}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-medium text-[#1A1A18] mb-4">
                Is <span className="font-semibold">remodeling worth it</span> before selling?
              </h2>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-6 flex-grow">
                Most renovations do not return 100 percent of their cost. This tool analyzes your remodel investment against the expected value increase so you can decide whether it is worth it or whether selling as-is puts more money in your pocket.
              </p>
              <Link href="/remodel-vs-sell/">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Analyze Remodel vs. Sell
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>

        {/* Bottom CTA */}
        <RevealDiv delay={400} className="mt-20 text-center">
          <h2 className="font-display text-3xl font-medium text-[#1A1A18] mb-4">
            Want someone to walk through the numbers with you?
          </h2>
          <p className="font-body text-lg text-[#2B2B2B] max-w-xl mx-auto leading-relaxed mb-8">
            The tools give you a starting point. A real conversation gives you a strategy. If you want to talk through what your numbers actually mean, reach out.
          </p>
          <Link href="/contact/">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] inline-flex items-center gap-3 cursor-pointer">
              Start a Conversation
              <ArrowRight size={14} />
            </span>
          </Link>
        </RevealDiv>
      </div>
    </div>
  );
}
