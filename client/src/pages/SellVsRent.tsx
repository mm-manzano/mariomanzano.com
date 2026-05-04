import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Calculator, Home, TrendingUp, DollarSign } from "lucide-react";

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

export default function SellVsRent() {
  // State for inputs - using string to allow empty state
  const [homeValue, setHomeValue] = useState<string>("0");
  const [monthlyRent, setMonthlyRent] = useState<string>("0");
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("0");
  const [appreciation, setAppreciation] = useState<string>("0");
  const [yearsHolding, setYearsHolding] = useState<string>("0");

  // Calculations
  const val = parseFloat(homeValue) || 0;
  const rent = parseFloat(monthlyRent) || 0;
  const exp = parseFloat(monthlyExpenses) || 0;
  const appr = parseFloat(appreciation) || 0;
  const years = parseFloat(yearsHolding) || 0;

  const annualCashFlow = (rent - exp) * 12;
  const futureValue = val * Math.pow(1 + appr / 100, years);
  const totalGain = (futureValue - val) + (annualCashFlow * years);

  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  // Helper to handle input changes and prevent leading zeros
  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (value === "") {
      setter("");
    } else {
      // Remove leading zero if it's followed by another digit
      const cleanValue = value.startsWith('0') && value.length > 1 && value[1] !== '.' ? value.substring(1) : value;
      setter(cleanValue);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-32 pb-20">
      <div className="container">
        <RevealDiv>
          <div className="flex items-center gap-3 mb-4">
            <span className="section-rule" />
            <span className="section-number">Strategy Tool</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            Should you <br /><em className="italic">sell or rent?</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-12 leading-relaxed">
            This is not just about numbers, it's about clarity. Compare the financial implications of selling now versus holding your property as a rental.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inputs - Left Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E8E0D5] shadow-sm">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-8 text-center">Your Home Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Estimated Home Value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input 
                      type="text" 
                      value={homeValue}
                      onChange={handleInputChange(setHomeValue)}
                      onFocus={(e) => e.target.value === "0" && setHomeValue("")}
                      onBlur={(e) => e.target.value === "" && setHomeValue("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Monthly Rent</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                      <input 
                        type="text" 
                        value={monthlyRent}
                        onChange={handleInputChange(setMonthlyRent)}
                        onFocus={(e) => e.target.value === "0" && setMonthlyRent("")}
                        onBlur={(e) => e.target.value === "" && setMonthlyRent("0")}
                        className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Monthly Expenses</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                      <input 
                        type="text" 
                        value={monthlyExpenses}
                        onChange={handleInputChange(setMonthlyExpenses)}
                        onFocus={(e) => e.target.value === "0" && setMonthlyExpenses("")}
                        onBlur={(e) => e.target.value === "" && setMonthlyExpenses("0")}
                        className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Appreciation (%)</label>
                    <input 
                      type="text" 
                      value={appreciation}
                      onChange={handleInputChange(setAppreciation)}
                      onFocus={(e) => e.target.value === "0" && setAppreciation("")}
                      onBlur={(e) => e.target.value === "" && setAppreciation("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Years Holding</label>
                    <input 
                      type="text" 
                      value={yearsHolding}
                      onChange={handleInputChange(setYearsHolding)}
                      onFocus={(e) => e.target.value === "0" && setYearsHolding("")}
                      onBlur={(e) => e.target.value === "" && setYearsHolding("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results - Right Side */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-8 md:p-12 text-white sticky top-32">
              <h2 className="font-display text-3xl font-light mb-12 border-b border-white/10 pb-6">Strategic Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Annual Cash Flow</p>
                    <p className={`font-display text-4xl font-light ${annualCashFlow >= 0 ? 'text-[#B8974A]' : 'text-red-400'}`}>
                      {formatCurrency(annualCashFlow)}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Future Home Value</p>
                    <p className="font-display text-4xl font-light text-white">
                      {formatCurrency(futureValue)}
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-4">Total Projected Gain</p>
                  <p className="font-display text-5xl md:text-6xl font-light text-white mb-4">
                    {formatCurrency(totalGain)}
                  </p>
                  <p className="font-body text-xs text-white/40 leading-relaxed">
                    Includes both equity growth from appreciation and cumulative rental cash flow over {years} years.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                <Link href="/contact">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] w-full justify-center cursor-pointer">
                    Discuss Your Strategy
                    <ArrowRight size={14} className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Valuation Section */}
        <div className="mt-32 pt-20 border-t border-[#E8E0D5]">
          <RevealDiv className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">Before you decide, you may want a baseline estimate.</h2>
            <p className="font-body text-base text-[#1A1A18]/65 mb-10 leading-relaxed">
              These estimates don't account for your home's condition, upgrades, or positioning. I'll walk you through how I'd actually price it in today's market.
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
