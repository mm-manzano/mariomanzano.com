/*
 * DESIGN: Quiet Luxury Editorial - Strategy Hub
 * Purpose: Central hub linking to all three strategy tools
 * FINAL: Meta tags, Open Graph, WebPage schema, educational copy added.
 *        CTA copy corrected. Tool card descriptions improved.
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

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
  setMeta("og:image", "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg", true);
}

export default function StrategyHub() {
  useEffect(() => {
    setPageMeta(
      "Home Selling Strategy Hub | Cedar Park & Leander TX | Mario Manzano",
      "Compare your real options before deciding anything. Calculate your net proceeds, compare selling vs renting, and analyze whether remodeling makes financial sense. Free tools for Cedar Park and Leander homeowners.",
      "https://mariomanzano.com/strategy-hub"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Home Selling Strategy Hub",
    "url": "https://mariomanzano.com/strategy-hub",
    "description": "Free strategy tools for Cedar Park and Leander homeowners. Compare selling vs renting, calculate net proceeds, and analyze remodel ROI before making any decisions.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] py-20 md:py-32">
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
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
            Start with the numbers.<br />
            <em className="italic">Decide with clarity.</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-6 max-w-2xl">
            Most homeowners in Cedar Park and Leander make their biggest financial decision without running the actual numbers first. These tools are built to change that.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12 max-w-2xl">
            Whether you are leaning toward selling, considering a rental, or wondering if a remodel makes sense, start here. Each tool takes about two minutes and gives you a clear financial picture before any conversation with an agent.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Net Sheet */}
          <RevealDiv delay={100}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                See what you would <em className="italic">actually</em> walk away with.
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                The sale price is not what you keep. After commission, closing costs, and your remaining mortgage balance, your net proceeds can look very different. This calculator shows you the real number before you commit to anything.
              </p>
              <Link href="/net-sheet">
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
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                Should you <em className="italic">sell or rent</em> your home?
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                Selling gives you liquidity now. Renting keeps your equity working over time. This tool compares both paths side by side so you can see which one actually comes out ahead based on your specific numbers and timeline.
              </p>
              <Link href="/sell-vs-rent">
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
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                Is <em className="italic">remodeling worth it</em> before selling?
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                Most renovations do not return 100 percent of their cost. This tool analyzes your remodel investment against the expected value increase so you can decide whether it is worth it or whether selling as-is puts more money in your pocket.
              </p>
              <Link href="/remodel-vs-sell">
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
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-4">
            Want someone to walk through the numbers with you?
          </h2>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-xl mx-auto leading-relaxed mb-8">
            The tools give you a starting point. A real conversation gives you a strategy. If you are a homeowner in Cedar Park or Leander and want to talk through what your numbers actually mean, reach out.
          </p>
          <Link href="/contact">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
              Start a Conversation
              <ArrowRight size={14} />
            </span>
          </Link>
        </RevealDiv>
      </div>
    </div>
  );
}
