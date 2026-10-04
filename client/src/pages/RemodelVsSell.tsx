/*
 * DESIGN: Quiet Luxury Editorial - Remodel vs. Sell Calculator
 * Purpose: Helps homeowners analyze the financial impact of renovations before selling.
 * FINAL: Meta tags, Open Graph, schema, educational copy added.
 * UPDATE: Meta description and schema description broadened to Greater Austin.
 *         Geography removed from intro body paragraph.
 *         Educational section retains Cedar Park & Leander (local SEO content).
 * UPDATE (lead capture pass):
 *         H1 changed to match search wording (sell or remodel).
 *         Quick time line added under the intro ("about 30 seconds, no signup").
 *         Bottom button now goes to the net sheet (the sell side of the comparison).
 *         Walk Through This With Me button still goes to Contact, which ends in the GHL form.
 *         Calculator opens with example numbers so results are not $0.
 *         Inputs select all text on focus so visitors can type over the example.
 *         Results call to action now has a short lead in line above the button.
 * UPDATE (mobile pass):
 *         Results panel only sticks on large screens (it was covering content on phones).
 *         Smaller padding and net gain size on phones so large dollar amounts do not overflow.
 */

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, AlertCircle } from "lucide-react";

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

export default function RemodelVsSell() {
  // Example numbers so the results are never blank. Visitors type over them.
  const [currentValue, setCurrentValue] = useState<string>("450000");
  const [remodelCost, setRemodelCost] = useState<string>("30000");
  const [expectedIncrease, setExpectedIncrease] = useState<string>("5");

  useEffect(() => {
    setPageMeta(
      "Remodel or Sell? Free Calculator | Cedar Park & Leander TX",
      "Enter your home value, remodel cost, and expected price bump to see if renovating before selling is worth it. Free tool for Greater Austin homeowners.",
      "https://mariomanzano.com/remodel-vs-sell/"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Remodel vs. Sell Calculator",
    "url": "https://mariomanzano.com/remodel-vs-sell/",
    "description": "Free remodel vs sell calculator for Greater Austin homeowners. Find out if your renovation will increase your net proceeds enough to justify the cost before selling.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  const current = parseFloat(currentValue) || 0;
  const cost = parseFloat(remodelCost) || 0;
  const increase = parseFloat(expectedIncrease) || 0;

  const newValue = current * (1 + increase / 100);
  const netGain = newValue - current - cost;
  const valueAdded = newValue - current;
  const roi = cost === 0 ? 0 : (netGain / cost) * 100;

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);

  const formatPercentage = (num: number) =>
    new Intl.NumberFormat("en-US", { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num / 100);

  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "") { setter(""); }
    else {
      const cleanValue = value.startsWith("0") && value.length > 1 && value[1] !== "." ? value.substring(1) : value;
      setter(cleanValue);
    }
  };

  const getRoiClassification = (roiValue: number) => {
    if (roiValue >= 20) return "Strong return";
    if (roiValue >= 10) return "Moderate return";
    if (roiValue >= 0) return "Marginal return";
    return "Negative return";
  };

  const getStrategicTakeaway = (roiValue: number) => {
    if (roiValue >= 20) return "This remodel shows a strong return based on these inputs. Depending on your timeline and the specific work involved, it may be worth considering. A conversation with a contractor and a market analysis of recent comparable sales would help confirm the estimate.";
    if (roiValue >= 10) return "This remodel shows a moderate return. It may make sense if it meaningfully improves how the home shows to buyers. The risk is that the value increase estimates are often optimistic. Focus on functional updates and neutral presentation rather than high-end finishes.";
    if (roiValue >= 0) return "This remodel produces a limited return. In most cases, the time, cost, and disruption may not be worth it. Selling as-is and pricing accordingly often puts more money in your pocket faster.";
    return "Based on these inputs, the remodel is likely to cost more than it returns in value. Selling as-is is probably the stronger financial move here.";
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
            Should you sell or<br /><span className="font-semibold">remodel your home?</span>
          </h1>
          <p className="font-body text-lg text-[#2B2B2B] max-w-2xl mb-6 leading-relaxed">
            Most homeowners over estimate what a remodel will return. Luxury renovations rarely recover 100 percent of their cost at resale. Functional updates and neutral presentation tend to outperform high-end finishes when it comes to actual buyer behavior.
          </p>
          <p className="font-body text-lg text-[#2B2B2B] max-w-2xl mb-6 leading-relaxed">
            This tool helps you run the numbers before committing to any work. Enter your home's current value, the projected remodel cost, and the expected value increase to see whether the investment is likely to pay off.
          </p>

          {/* Top quick note */}
          <p className="font-body text-sm text-[#2B2B2B] leading-relaxed mb-12">
            Takes about 30 seconds, no signup needed.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E5E5E5] shadow-sm">
              <h2 className="font-display text-2xl font-medium text-[#1A1A18] mb-2 text-center">Project Details</h2>
              <p className="font-body text-sm text-[#2B2B2B] text-center mb-8 leading-relaxed">
                Example numbers are shown. Type over them with yours.
              </p>
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Current Home Value (As-Is)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-[#1A1A1A]">$</span>
                    <input type="text" inputMode="decimal" value={currentValue} onChange={handleInputChange(setCurrentValue)}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => e.target.value === "" && setCurrentValue("0")}
                      className="w-full bg-white border border-[#767676] p-4 pl-8 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Estimated Remodel Cost</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-[#1A1A1A]">$</span>
                    <input type="text" inputMode="decimal" value={remodelCost} onChange={handleInputChange(setRemodelCost)}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => e.target.value === "" && setRemodelCost("0")}
                      className="w-full bg-white border border-[#767676] p-4 pl-8 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Expected Value Increase (%)</label>
                  <div className="relative">
                    <input type="text" inputMode="decimal" value={expectedIncrease} onChange={handleInputChange(setExpectedIncrease)}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => e.target.value === "" && setExpectedIncrease("0")}
                      className="w-full bg-white border border-[#767676] p-4 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-[#1A1A1A]">%</span>
                  </div>
                  <p className="font-body text-sm text-[#2B2B2B] mt-2 leading-relaxed">
                    Typical ranges: Cosmetic updates 3 to 7% | Kitchen/bath upgrades 5 to 12% | Full renovation 10 to 20%+
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border border-[#E5E5E5] flex gap-4">
              <AlertCircle className="text-[#B8974A] shrink-0" size={20} />
              <p className="font-body text-sm text-[#2B2B2B] leading-relaxed">
                Advisor note: Most luxury remodels rarely return 100 percent of their cost at resale. Focus on functional updates and neutral presentation for the highest return. When in doubt, price the home well as-is rather than spending money to chase a higher number.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-6 md:p-12 text-white lg:sticky lg:top-32">
              <h2 className="font-display text-3xl font-medium mb-12 border-b border-white/10 pb-6">ROI Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-sm tracking-[0.2em] uppercase text-white/90 mb-2">Projected New Value</p>
                    <p className="font-body text-4xl font-semibold text-white">{formatCurrency(newValue)}</p>
                  </div>
                  <div>
                    <p className="font-body text-sm tracking-[0.2em] uppercase text-white/90 mb-2">Remodel Investment</p>
                    <p className="font-body text-4xl font-semibold text-white">{formatCurrency(cost)}</p>
                  </div>
                </div>
                <div className="bg-white/5 p-6 md:p-8 border border-white/10">
                  <p className="section-number mb-4 text-[#C9A85C]">Estimated Net Gain After Remodel</p>
                  <p className={`font-body text-4xl md:text-6xl font-semibold mb-2 break-words ${netGain >= 0 ? "text-white" : "text-red-400"}`}>
                    {formatCurrency(netGain)}
                  </p>
                  <p className="font-body text-sm text-white/90 leading-relaxed mb-4">
                    Value added: {formatCurrency(valueAdded)}<br />
                    Return on remodel: {formatPercentage(roi)}
                  </p>
                  <p className="font-body text-lg text-white/90">{getRoiClassification(roi)}</p>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/10">
                <h3 className="font-display text-xl font-medium text-white mb-4">What This Means</h3>
                <p className="font-body text-lg text-white/90 leading-relaxed mb-8">{getStrategicTakeaway(roi)}</p>
                <p className="font-body text-base text-white/90 leading-relaxed mb-4">
                  Want me to check your numbers against recent sales near you?
                </p>
                <Link href="/contact/">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] w-full justify-center cursor-pointer">
                    Walk Through This With Me
                    <ArrowRight size={14} className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Educational section */}
        <div className="mt-20 max-w-3xl">
          <RevealDiv>
            <h2 className="font-display text-3xl font-medium text-[#1A1A18] mb-6">What remodels actually return in the Cedar Park and Leander market?</h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              In the Cedar Park and Leander area, buyer behavior tends to favor clean, move-in ready homes over heavily renovated ones. Buyers here are often weighing multiple options and they are sensitive to price. A home that is priced correctly as-is will frequently outperform one that has been renovated and priced up to recover the cost.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              The updates that tend to move the needle are functional and cosmetic: fresh paint, clean landscaping, updated fixtures, and a decluttered presentation. Full kitchen or bathroom renovations before a sale are rarely worth the investment unless the home is severely dated relative to its direct competition.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
              Before spending anything, it is worth having a conversation about where your home sits relative to current comparable sales. That context changes the remodel math significantly.
            </p>
          </RevealDiv>
        </div>

        <div className="mt-20 pt-20 border-t border-[#E5E5E5]">
          <RevealDiv className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-medium text-[#1A1A18] mb-6">Curious what you would walk away with if you sold?</h2>
            <p className="font-body text-lg text-[#2B2B2B] mb-10 leading-relaxed">
              See what you would keep after your mortgage, commission, and closing costs, so you can compare it to the remodel math above.
            </p>
            <Link href="/net-sheet/">
              <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                See What You Would Net If You Sold
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </div>
    </div>
  );
}
