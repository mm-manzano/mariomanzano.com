/*
 * DESIGN: Quiet Luxury Editorial - Sell vs. Rent Calculator
 * Purpose: Helps homeowners compare selling now vs holding as a rental.
 * FINAL: Meta tags, Open Graph, schema, educational copy added.
 * UPDATE: Meta description and schema description broadened to Greater Austin.
 *         Geography removed from intro body paragraph.
 *         Educational section retains Cedar Park & Leander (local SEO content).
 */

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

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

export default function SellVsRent() {
  const [homeValue, setHomeValue] = useState<string>("");
  const [mortgageBalance, setMortgageBalance] = useState<string>("");
  const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [otherMonthlyExpenses, setOtherMonthlyExpenses] = useState<string>("");
  const [appreciation, setAppreciation] = useState<string>("");
  const [yearsHolding, setYearsHolding] = useState<string>("");
  const [vacancyMaintenance, setVacancyMaintenance] = useState<string>("8");

  useEffect(() => {
    setPageMeta(
      "Sell or Rent? Free Calculator | Cedar Park & Leander TX",
      "Compare selling now versus renting based on your equity, rent potential, and timeline. Free tool for Greater Austin homeowners.",
      "https://mariomanzano.com/sell-vs-rent/"
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sell vs. Rent Calculator",
    "url": "https://mariomanzano.com/sell-vs-rent/",
    "description": "Free sell vs rent calculator for Greater Austin homeowners. Compare long-term financial outcomes of selling now versus holding your home as a rental property.",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  const val = parseFloat(homeValue) || 0;
  let mortBal = parseFloat(mortgageBalance) || 0;
  const mPayment = parseFloat(monthlyMortgagePayment) || 0;
  const intRate = parseFloat(interestRate) || 0;
  const rent = parseFloat(monthlyRent) || 0;
  const otherExp = parseFloat(otherMonthlyExpenses) || 0;
  const appr = parseFloat(appreciation) || 0;
  const years = parseFloat(yearsHolding) || 0;
  const vacancyBuffer = parseFloat(vacancyMaintenance) || 0;

  let totalPrincipalPaidDown = 0;
  if (mortBal > 0 && mPayment > 0 && intRate > 0 && years > 0) {
    let currentBalance = mortBal;
    const monthlyInterestRate = (intRate / 100) / 12;
    const totalMonths = years * 12;
    for (let i = 0; i < totalMonths; i++) {
      if (currentBalance <= 0) break;
      const interestPayment = currentBalance * monthlyInterestRate;
      let principalPayment = mPayment - interestPayment;
      if (principalPayment < 0) principalPayment = 0;
      if (currentBalance - principalPayment < 0) principalPayment = currentBalance;
      totalPrincipalPaidDown += principalPayment;
      currentBalance -= principalPayment;
    }
  }

  const adjustedRent = rent * (1 - vacancyBuffer / 100);
  const sellingCostPercentage = 0.07;
  const estimatedNetIfSoldToday = val - (val * sellingCostPercentage) - mortBal;
  const totalMonthlyExpensesIfRenting = otherExp + mPayment;
  const annualCashFlowIfRenting = (adjustedRent - totalMonthlyExpensesIfRenting) * 12;
  const futureValue = val * Math.pow(1 + appr / 100, years);
  const futureMortgageBalance = Math.max(0, mortBal - totalPrincipalPaidDown);
  const estimatedNetIfRented = futureValue - futureMortgageBalance - (futureValue * sellingCostPercentage);

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

  const getStrategicTakeaway = () => {
    if (val === 0 || years === 0) return "Enter your home details to see a strategic comparison.";
    if (estimatedNetIfRented > estimatedNetIfSoldToday * 1.2) {
      return "Based on these numbers, holding as a rental appears to produce a significantly better long-term outcome than selling now. That said, the numbers only tell part of the story. Your capacity to manage a rental, your need for liquidity, and your timeline all matter.";
    } else if (estimatedNetIfRented > estimatedNetIfSoldToday * 0.8) {
      return "The financial difference between selling now and holding as a rental is relatively close in this scenario. The right answer depends on factors beyond the numbers, including your timeline, your appetite for being a landlord, and what you plan to do with the proceeds.";
    } else {
      return "Based on these inputs, selling now appears to put more money in your pocket than holding as a rental over this period. That can change significantly with different appreciation assumptions or rent levels. Worth running a few scenarios before deciding.";
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
            Should you<br /><span className="font-semibold">sell or rent?</span>
          </h1>
          <p className="font-body text-lg text-[#2B2B2B] max-w-2xl mb-6 leading-relaxed">
            This is one of the most common questions homeowners face. Selling gives you liquidity and removes ongoing responsibility. Renting keeps your equity working over time and can be a strong wealth-building tool if the numbers support it.
          </p>
          <p className="font-body text-lg text-[#2B2B2B] max-w-2xl mb-12 leading-relaxed">
            This tool compares both paths side by side based on your specific numbers. Enter your home details and a holding period to see which option comes out ahead financially.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E5E5E5] shadow-sm">
              <h2 className="font-display text-2xl font-medium text-[#1A1A18] mb-8 text-center">Your Home Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Estimated Home Value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-[#1A1A1A]">$</span>
                    <input type="text" value={homeValue} onChange={handleInputChange(setHomeValue)}
                      onFocus={(e) => e.target.value === "0" && setHomeValue("")}
                      onBlur={(e) => e.target.value === "" && setHomeValue("0")}
                      className="w-full bg-white border border-[#767676] p-4 pl-8 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Outstanding Mortgage Balance</label>
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
                    <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Monthly Mortgage Payment (P&I)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-[#1A1A1A]">$</span>
                      <input type="text" value={monthlyMortgagePayment} onChange={handleInputChange(setMonthlyMortgagePayment)}
                        onFocus={(e) => e.target.value === "0" && setMonthlyMortgagePayment("")}
                        onBlur={(e) => e.target.value === "" && setMonthlyMortgagePayment("0")}
                        className="w-full bg-white border border-[#767676] p-4 pl-8 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Annual Interest Rate (%)</label>
                    <input type="text" value={interestRate} onChange={handleInputChange(setInterestRate)}
                      onFocus={(e) => e.target.value === "0" && setInterestRate("")}
                      onBlur={(e) => e.target.value === "" && setInterestRate("0")}
                      className="w-full bg-white border border-[#767676] p-4 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                    <p className="font-body text-sm text-[#2B2B2B] mt-2 leading-relaxed">Your current annual interest rate.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Monthly Rent</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-[#1A1A1A]">$</span>
                      <input type="text" value={monthlyRent} onChange={handleInputChange(setMonthlyRent)}
                        onFocus={(e) => e.target.value === "0" && setMonthlyRent("")}
                        onBlur={(e) => e.target.value === "" && setMonthlyRent("0")}
                        className="w-full bg-white border border-[#767676] p-4 pl-8 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Other Monthly Expenses (HOA, Taxes, Insurance)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg font-semibold text-[#1A1A1A]">$</span>
                      <input type="text" value={otherMonthlyExpenses} onChange={handleInputChange(setOtherMonthlyExpenses)}
                        onFocus={(e) => e.target.value === "0" && setOtherMonthlyExpenses("")}
                        onBlur={(e) => e.target.value === "" && setOtherMonthlyExpenses("0")}
                        className="w-full bg-white border border-[#767676] p-4 pl-8 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Yearly Appreciation (%)</label>
                    <input type="text" value={appreciation} onChange={handleInputChange(setAppreciation)}
                      onFocus={(e) => e.target.value === "0" && setAppreciation("")}
                      onBlur={(e) => e.target.value === "" && setAppreciation("0")}
                      className="w-full bg-white border border-[#767676] p-4 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                    <p className="font-body text-sm text-[#2B2B2B] mt-2 leading-relaxed">Average annual home value growth. e.g., enter 3 for 3%.</p>
                  </div>
                  <div>
                    <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Years Holding</label>
                    <input type="text" value={yearsHolding} onChange={handleInputChange(setYearsHolding)}
                      onFocus={(e) => e.target.value === "0" && setYearsHolding("")}
                      onBlur={(e) => e.target.value === "" && setYearsHolding("0")}
                      className="w-full bg-white border border-[#767676] p-4 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm tracking-[0.2em] uppercase text-[#2B2B2B] mb-2 font-medium">Vacancy / Maintenance Buffer (%)</label>
                  <input type="text" value={vacancyMaintenance} onChange={handleInputChange(setVacancyMaintenance)}
                    onFocus={(e) => e.target.value === "0" && setVacancyMaintenance("")}
                    onBlur={(e) => e.target.value === "" && setVacancyMaintenance("0")}
                    className="w-full bg-white border border-[#767676] p-4 font-body text-lg font-semibold text-[#1A1A1A] focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A] outline-none transition-all" />
                  <p className="font-body text-sm text-[#2B2B2B] mt-2 leading-relaxed">Accounts for vacancies, repairs, and holding costs. Typical: 5 to 10%.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-8 md:p-12 text-white sticky top-32">
              <h2 className="font-display text-3xl font-medium mb-12 border-b border-white/10 pb-6">Strategic Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-sm tracking-[0.2em] uppercase text-white/90 mb-2">Estimated Net if Sold Today</p>
                    <p className="font-body text-4xl font-semibold text-white">{formatCurrency(estimatedNetIfSoldToday)}</p>
                  </div>
                  <div>
                    <p className="font-body text-sm tracking-[0.2em] uppercase text-white/90 mb-2">Annual Cash Flow (Adjusted)</p>
                    <p className={`font-body text-4xl font-semibold ${annualCashFlowIfRenting >= 0 ? "text-white" : "text-red-400"}`}>
                      {formatCurrency(annualCashFlowIfRenting)}
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="section-number mb-4 text-[#C9A85C]">Estimated Net if Rented and Sold Later</p>
                  <p className="font-body text-5xl md:text-6xl font-semibold text-white mb-2">{formatCurrency(estimatedNetIfRented)}</p>
                  <p className="font-body text-sm text-white/90 leading-relaxed">
                    Includes appreciation, rental cash flow, and mortgage paydown over {years} years, then selling.
                  </p>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/10">
                <h3 className="font-display text-xl font-medium text-white mb-4">What This Means</h3>
                <p className="font-body text-lg text-white/90 leading-relaxed mb-8">{getStrategicTakeaway()}</p>
                <Link href="/contact/">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] w-full justify-center cursor-pointer">
                    Talk Through Your Numbers
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
            <h2 className="font-display text-3xl font-medium text-[#1A1A18] mb-6">Is renting better than selling in Cedar Park or Leander?</h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              In the Cedar Park and Leander market, renting tends to be a long-term appreciation play more than a strong cash flow strategy. Homes in this area have held their value well over time, which makes the rental path compelling if your mortgage payment is low relative to what the home could rent for.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              That said, the numbers are only part of the decision. Being a landlord means dealing with tenants, maintenance, vacancies, and property management. If you are not prepared for that ongoing responsibility, the financial advantage of renting may not be worth the stress.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
              If you are unsure which path makes more sense for your situation, that is exactly the kind of conversation I can help with. No pressure. Just a clear look at the numbers and what they actually mean.
            </p>
          </RevealDiv>
        </div>

        <div className="mt-20 pt-20 border-t border-[#E5E5E5]">
          <RevealDiv className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-medium text-[#1A1A18] mb-6">Not sure what your home is worth?</h2>
            <p className="font-body text-lg text-[#2B2B2B] mb-10 leading-relaxed">
              Get a baseline estimate before running the comparison.
            </p>
            <Link href="/home-value/">
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
