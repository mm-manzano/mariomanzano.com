import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Calculator, DollarSign, PieChart, Info } from "lucide-react";

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

export default function NetSheet() {
  // State for inputs - using string to allow empty state
  const [salePrice, setSalePrice] = useState<string>("0");
  const [mortgageBalance, setMortgageBalance] = useState<string>("0");
  const [commission, setCommission] = useState<string>("6");
  const [closingCosts, setClosingCosts] = useState<string>("1");
  const [repairs, setRepairs] = useState<string>("0");

  // Calculations
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
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  // Helper to handle input changes and prevent leading zeros
  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (value === "") {
      setter("");
    } else {
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
            Calculate your <br /><em className="italic">net proceeds.</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-12 leading-relaxed">
            Beyond the sale price, understand all the costs and fees involved. Get a clear picture of what you'll actually walk away with.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inputs - Left Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E8E0D5] shadow-sm">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-8 text-center">Sale Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Estimated Sale Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input 
                      type="text" 
                      value={salePrice}
                      onChange={handleInputChange(setSalePrice)}
                      onFocus={(e) => e.target.value === "0" && setSalePrice("")}
                      onBlur={(e) => e.target.value === "" && setSalePrice("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Mortgage Balance</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input 
                      type="text" 
                      value={mortgageBalance}
                      onChange={handleInputChange(setMortgageBalance)}
                      onFocus={(e) => e.target.value === "0" && setMortgageBalance("")}
                      onBlur={(e) => e.target.value === "" && setMortgageBalance("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Commission (%)</label>
                    <input 
                      type="text" 
                      value={commission}
                      onChange={handleInputChange(setCommission)}
                      onFocus={(e) => e.target.value === "0" && setCommission("")}
                      onBlur={(e) => e.target.value === "" && setCommission("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Closing Costs (%)</label>
                    <input 
                      type="text" 
                      value={closingCosts}
                      onChange={handleInputChange(setClosingCosts)}
                      onFocus={(e) => e.target.value === "0" && setClosingCosts("")}
                      onBlur={(e) => e.target.value === "" && setClosingCosts("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Repairs / Prep Costs</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input 
                      type="text" 
                      value={repairs}
                      onChange={handleInputChange(setRepairs)}
                      onFocus={(e) => e.target.value === "0" && setRepairs("")}
                      onBlur={(e) => e.target.value === "" && setRepairs("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results - Right Side */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-8 md:p-12 text-white sticky top-32">
              <h2 className="font-display text-3xl font-light mb-12 border-b border-white/10 pb-6">Estimated Net</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Commission Cost</p>
                    <p className="font-display text-3xl font-light text-white/60">
                      {formatCurrency(commissionCost)}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Closing Costs</p>
                    <p className="font-display text-3xl font-light text-white/60">
                      {formatCurrency(closingCostAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Total Selling Costs</p>
                    <p className="font-display text-3xl font-light text-white/60">
                      {formatCurrency(totalCosts)}
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-4">Estimated Net Proceeds</p>
                  <p className={`font-display text-5xl md:text-6xl font-light mb-4 ${netProceeds >= 0 ? 'text-white' : 'text-red-400'}`}>
                    {formatCurrency(netProceeds)}
                  </p>
                  <p className="font-body text-xs text-white/40 leading-relaxed">
                    This is the estimated amount you will receive after paying off your mortgage and all transaction costs.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                <Link href="/contact">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] w-full justify-center cursor-pointer">
                    Get a Precise Net Sheet
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
