/*
 * DESIGN: Quiet Luxury Editorial - Net Sheet Calculator
 * Purpose: Helps homeowners understand their actual take-home after a sale.
 * FINAL: Meta tags, Open Graph, schema, educational copy above and below calculator.
 * UPDATE: Meta description and schema description broadened to Greater Austin.
 *         Geography removed from intro body paragraph.
 *         Educational section retains Cedar Park & Leander (local SEO content).
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

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

export default function NetSheet() {
  const [salePrice, setSalePrice] = useState<string>("0");
  const [mortgageBalance, setMortgageBalance] = useState<string>("0");
  const [commission, setCommission] = useState<string>("6");
  const [closingCosts, setClosingCosts] = useState<string>("2");
  const [repairs, setRepairs] = useState<string>("0");

  useEffect(() => {
    setPageMeta(
      "Home Sale Net Sheet Calculator | Cedar Park & Leander TX | Mario Manzano",
      "Find out what you will actually walk away with after selling your home. Calculate net proceeds after commission, closing costs, and mortgage payoff. Free tool for Greater Austin homeowners.",
      "https://mariomanzano.com/net-sheet/"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Home Sale Net Sheet Calculator",
    "url": "https://mariomanzano.com/net-sheet/",
    "description": "Free net sheet calculator for Greater Austin homeowners. See exactly what you will keep after commission, closing costs, and mortgage payoff before deciding to sell.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  const price = parseFloat(salePrice) || 0;
  const mortgage = parseFloat(mortgageBalance) || 0;
  const commRate = parseFloat(commission) || 0;
  const closeRate = parseFloat(closingCosts) || 0;
  const repairCost = parseFloat(repairs) || 0;

  const commissionCost = price * (commRate / 100);
  const closingCostAmount = price * (closeRate / 100);
  const totalCosts = commissionCost + closingCostAmount + repairCost;
  const netProceeds = price - mortgage - totalCosts;

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);

  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "") { setter(""); }
    else {
      const cleanValue = value.startsWith("0") && value.length > 1 && value[1] !== "." ? value.substring(1) : value;
      setter(cleanValue);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container">
        <RevealDiv>
          <div className="flex items-center gap-3 mb-4">
            <span className="section-rule" />
            <span className="section-number">Strategy Tool</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-medium text-[#1A1A18] mb-6">
            Calculate your<br /><span className="font-semibold">net proceeds.</span>
          </h1>
          <p className="font-body text-lg text-[#2B2B2B] max-w-2xl mb-6 leading-relaxed">
            The sale price is not what you keep. By the time you account for agent commission, closing costs, repairs, and your remaining mortgage balance, the number that lands in your account can look very different from the headline number.
          </p>
          <p className="font-body text-lg text-[#2B2B2B] max-w-2xl mb-12 leading-relaxed">
            This tool gives you a realistic starting estimate before you talk to anyone. It is not a substitute for a real conversation, but it gives you a solid foundation before you make any decisions.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E5E5E5] shadow-sm">
              <h2 className="font-display text-2xl font-medium text-[#1A1A18] mb-8 text-center">Sale Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Estimated Sale Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-[#1A1A1A]">$</span>
                    <input type="text" value={salePrice} onChange={handleInputChange(setSalePrice)}
                      onFocus={(e) => e.target.value === "0" && setSalePrice("")}
                      onBlur={(e) => e.target.value === "" && setSalePrice("0")}
                      className="w-full bg-white border border-[#767676] p-4 pl-8 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Mortgage Balance</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-[#1A1A1A]">$</span>
                    <input type="text" value={mortgageBalance} onChange={handleInputChange(setMortgageBalance)}
                      onFocus={(e) => e.target.value === "0" && setMortgageBalance("")}
                      onBlur={(e) => e.target.value === "" && setMortgageBalance("0")}
                      className="w-full bg-white border border-[#767676] p-4 pl-8 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Commission (avg %)</label>
                    <input type="text" value={commission} onChange={handleInputChange(setCommission)}
                      onFocus={(e) => e.target.value === "0" && setCommission("")}
                      onBlur={(e) => e.target.value === "" && setCommission("0")}
                      className="w-full bg-white border border-[#767676] p-4 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Closing Costs (avg %)</label>
                    <input type="text" value={closingCosts} onChange={handleInputChange(setClosingCosts)}
                      onFocus={(e) => e.target.value === "0" && setClosingCosts("")}
                      onBlur={(e) => e.target.value === "" && setClosingCosts("0")}
                      className="w-full bg-white border border-[#767676] p-4 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Repairs / Prep Costs</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-[#1A1A1A]">$</span>
                    <input type="text" value={repairs} onChange={handleInputChange(setRepairs)}
                      onFocus={(e) => e.target.value === "0" && setRepairs("")}
                      onBlur={(e) => e.target.value === "" && setRepairs("0")}
                      className="w-full bg-white border border-[#767676] p-4 pl-8 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-8 md:p-12 text-white sticky top-32">
              <h2 className="font-display text-3xl font-medium mb-12 border-b border-white/10 pb-6">Estimated Net</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-sm tracking-[0.2em] uppercase text-white/90 mb-2">Commission Cost (avg)</p>
                    <p className="font-body text-3xl font-semibold text-white">{formatCurrency(commissionCost)}</p>
                  </div>
                  <div>
                    <p className="font-body text-sm tracking-[0.2em] uppercase text-white/90 mb-2">Closing Costs (avg)</p>
                    <p className="font-body text-3xl font-semibold text-white">{formatCurrency(closingCostAmount)}</p>
                  </div>
                  <div>
                    <p className="font-body text-sm tracking-[0.2em] uppercase text-white/90 mb-2">Total Selling Costs</p>
                    <p className="font-body text-3xl font-semibold text-white">{formatCurrency(totalCosts)}</p>
                  </div>
                </div>
                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="section-number mb-4 text-[#C9A85C]">Estimated Net Proceeds</p>
                  <p className={`font-body text-5xl md:text-6xl font-semibold mb-4 ${netProceeds >= 0 ? "text-white" : "text-red-400"}`}>
                    {formatCurrency(netProceeds)}
                  </p>
                  <p className="font-body text-sm text-white/90 leading-relaxed">
                    This is the estimated amount you will receive after paying off your mortgage and all transaction costs.
                  </p>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/10">
                <Link href="/contact">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] w-full justify-center cursor-pointer">
                    Get a Precise Net Sheet
                    <ArrowRight size={14} className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Educational section below calculator */}
        <div className="mt-20 max-w-3xl">
          <RevealDiv>
            <h2 className="font-display text-3xl font-medium text-[#1A1A18] mb-6">What does a net sheet actually tell you?</h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              A net sheet is the document that shows you what you keep after a sale, not what your home sells for. In Cedar Park and Leander, sellers are often surprised by how much the transaction costs reduce their take-home number. Commission, title fees, taxes, and any repairs or prep costs all come off the top.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              This estimate is a starting point based on a mid-year closing with typical closing costs at 2%, which includes title work, escrow, lender costs, prorated taxes, HOA fees, and a standard home warranty.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              Your actual number shifts based on your closing month. Closing in January versus December significantly changes how much in prorated taxes gets credited back to you. HOA fees vary by property and community, and some homes have none at all. Any additional seller concessions you negotiate will affect this further. A real net sheet from a title company will be more precise.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
              If you want to walk through a real net sheet based on your specific home and situation, that is something I can help with. It takes about fifteen minutes and gives you a much clearer picture before you make any decisions.
            </p>
          </RevealDiv>
        </div>

        {/* Home value link */}
        <div className="mt-20 pt-20 border-t border-[#E5E5E5]">
          <RevealDiv className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-medium text-[#1A1A18] mb-6">Not sure what your home is worth?</h2>
            <p className="font-body text-lg text-[#2B2B2B] mb-10 leading-relaxed">
              These estimates assume a sale price you enter. If you want a ballpark before you run the numbers, get a baseline home value estimate first.
            </p>
            <Link href="/home-value">
              <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                Get Baseline Estimate
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </div>
    </div>
  );
}
