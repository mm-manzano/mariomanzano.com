/*
 * DESIGN: Quiet Luxury Editorial - Home Value Page
 * Purpose: Primary conversion page for seller leads.
 * UPDATED: Removed repetitive estimate disclaimer, tightened copy flow,
 *          added Austin as broader metro context in one clean placement.
 *          Refined estimate positioning, broadened messaging for all homeowner
 *          intent types, restructured CTA hierarchy (CMA primary, Net Sheet secondary).
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft } from "lucide-react";

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

export default function HomeValue() {
  useEffect(() => {
    setPageMeta(
      "What Is My Home Worth in Cedar Park or Leander TX? | Mario Manzano",
      "Get a free home value estimate for Cedar Park and Leander TX. Find out what your home is actually worth today with a personalized Comparative Market Analysis from a local Austin Realtor.",
      "https://mariomanzano.com/home-value"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "What Is My Home Worth?",
    "url": "https://mariomanzano.com/home-value",
    "description": "Get a home value estimate for Cedar Park and Leander TX. Mario Manzano helps homeowners understand what their home is actually worth in today's market before making any decisions.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "telephone": "+1-512-695-9255",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-24 pb-16 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container max-w-4xl">
        {/* Back Link */}
        <Link href="/">
          <span className="inline-flex items-center gap-2 text-[#1A1A18]/40 hover:text-[#B8974A] transition-colors mb-8 cursor-pointer font-body text-sm uppercase tracking-widest">
            <ChevronLeft size={16} />
            Back to Strategy
          </span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            What is your home<br />
            <em className="italic">actually worth?</em>
          </h1>
          <p className="font-body text-base md:text-lg text-[#1A1A18]/60 max-w-2xl leading-relaxed">
            The estimate below gives you a useful starting point based on available property and market data. Because automated estimates draw from a broader geographic area and generalized data, they may not reflect the precise value of your specific home. They also cannot account for your home's condition, upgrades, layout, or other property-specific characteristics. Use it to get your bearings, then read on.
          </p>
        </div>

        {/* Tool Container */}
        <div className="bg-white p-4 md:p-8 shadow-sm border border-[#E8E0D5] min-h-[200px] flex flex-col items-center justify-center mb-12">
          <div className="w-full">
            <iframe
              style={{ width: "100%", height: "160px" }}
              src="https://mariomanzano.exprealty.com/sellembed.php"
              allowTransparency={true}
              frameBorder="0"
              title="Home Valuation Tool"
            ></iframe>
          </div>
        </div>

        {/* What affects home value section */}
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">What actually determines what your home is worth?</h2>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
            Automated estimates are a useful starting point, but they work with generalized data. They may not account for your home's specific condition, the improvements you have made, how the layout compares to similar homes, or what is actively competing in your immediate neighborhood.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
            A personalized Comparative Market Analysis takes a closer look. It focuses on your specific property, the most relevant comparable sales, current market conditions in your area, and property-specific factors that affect value. Whether you are tracking equity, thinking through a future move, or weighing an improvement, that is the clearest picture available without a formal appraisal.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
            If you want a more accurate number for your home specifically, that is what a personalized CMA is for.
          </p>
        </div>

        {/* Primary CMA CTA */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-4">Want a more accurate number for your specific home?</h2>
          <p className="font-body text-base text-[#1A1A18]/65 mb-8 leading-relaxed">
            I can prepare a personalized Comparative Market Analysis based on your property and the current market. No obligation. Just a clearer picture of where your home stands.
          </p>
          <Link href="/contact">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
              Request My Personalized CMA
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* Net Sheet - Secondary Resource */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-[#1A1A18] text-white mb-12">
          <div>
            <h4 className="font-display text-xl font-light mb-2">Also useful: Calculate your net proceeds</h4>
            <p className="font-body text-sm text-white/60">If you are thinking about selling, find out what you would walk away with after costs.</p>
          </div>
          <Link href="/net-sheet">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
              Go to Net Sheet
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
