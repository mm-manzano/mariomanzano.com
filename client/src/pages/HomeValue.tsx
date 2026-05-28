/*
 * DESIGN: Quiet Luxury Editorial - Home Value Page
 * Purpose: Primary conversion page for seller leads.
 * UPDATED: Removed repetitive estimate disclaimer, tightened copy flow,
 *          added Austin as broader metro context in one clean placement.
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
      "Get an instant home value estimate for Cedar Park and Leander TX. Then find out what your home would actually sell for in today's market with a real pricing conversation.",
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
            Home values in Cedar Park and Leander have shifted significantly over the past few years. The estimate below pulls from public data and recent comparable sales in your area. It is a reasonable starting point, but it does not account for your home's condition, upgrades, or how it compares to what is actively selling in your neighborhood right now. Use it to get your bearings, then read on.
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
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">What actually determines what your home sells for?</h2>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
            In Cedar Park and Leander, the gap between a good sale and a great sale usually comes down to three things: preparation, pricing, and timing. Buyers in this market are comparing your home against other options in real time. A home that shows well and is priced correctly from the start attracts competitive offers. One that is overpriced or needs visible work sits.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
            Automated tools cannot tell you whether your home should go to market in thirty days or ninety days, or whether a specific upgrade would add more to your sale price than it costs. That is where a real conversation makes the difference.
          </p>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
            If you want a clear picture of what your home would realistically sell for today and what you would walk away with after costs, that is what I help with. No pressure. Just clarity.
          </p>
        </div>

        {/* Next Step Flow */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-[#1A1A18] text-white mb-12">
          <div>
            <h4 className="font-display text-xl font-light mb-2">Next step: Calculate your net proceeds</h4>
            <p className="font-body text-sm text-white/60">Find out exactly what you will walk away with after costs.</p>
          </div>
          <Link href="/net-sheet">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
              Go to Net Sheet
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* Contact CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-4">Want a real number for your specific home?</h2>
          <p className="font-body text-base text-[#1A1A18]/65 mb-8 leading-relaxed">
            I work with homeowners in Cedar Park, Leander, and the greater Austin area who want to understand what their home is actually worth before deciding anything. A short conversation is all it takes to get a clearer picture.
          </p>
          <Link href="/contact">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
              Start a Conversation
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
