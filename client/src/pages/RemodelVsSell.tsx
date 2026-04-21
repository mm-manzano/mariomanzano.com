import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Hammer, TrendingUp, AlertCircle } from "lucide-react";

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

export default function RemodelVsSell() {
  // State for inputs - using string to allow empty state
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [remodelCost, setRemodelCost] = useState<string>("0");
  const [expectedIncrease, setExpectedIncrease] = useState<string>("0");

  // Calculations
  const current = parseFloat(currentValue) || 0;
  const cost = parseFloat(remodelCost) || 0;
  const increase = parseFloat(expectedIncrease) || 0;

  const newValue = current * (1 + increase / 100);
  const netGain = newValue - current - cost;

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
            Is remodeling <br /><em className="italic">worth it?</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mb-12 leading-relaxed">
            Analyze the potential return on investment for renovations. Discover if a remodel will truly increase your net profit or if selling as-is is the better option.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inputs - Left Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 border border-[#E8E0D5] shadow-sm">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-8 text-center">Project Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Current Home Value (As-Is)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input 
                      type="text" 
                      value={currentValue}
                      onChange={handleInputChange(setCurrentValue)}
                      onFocus={(e) => e.target.value === "0" && setCurrentValue("")}
                      onBlur={(e) => e.target.value === "" && setCurrentValue("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Estimated Remodel Cost</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">$</span>
                    <input 
                      type="text" 
                      value={remodelCost}
                      onChange={handleInputChange(setRemodelCost)}
                      onFocus={(e) => e.target.value === "0" && setRemodelCost("")}
                      onBlur={(e) => e.target.value === "" && setRemodelCost("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 pl-8 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-[#1A1A18]/50 mb-2">Expected Value Increase (%)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={expectedIncrease}
                      onChange={handleInputChange(setExpectedIncrease)}
                      onFocus={(e) => e.target.value === "0" && setExpectedIncrease("")}
                      onBlur={(e) => e.target.value === "" && setExpectedIncrease("0")}
                      className="w-full bg-[#F8F5F0] border-none p-4 font-display text-2xl focus:ring-1 focus:ring-[#B8974A] outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/30">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F5F0] p-6 border border-[#E8E0D5] flex gap-4">
              <AlertCircle className="text-[#B8974A] shrink-0" size={20} />
              <p className="font-body text-xs text-[#1A1A18]/60 leading-relaxed">
                <strong>Advisor Note:</strong> Most luxury remodels rarely return 100% of their cost. Focus on functional updates and neutral presentation for the highest ROI.
              </p>
            </div>
          </div>

          {/* Results - Right Side */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A1A18] p-8 md:p-12 text-white sticky top-32">
              <h2 className="font-display text-3xl font-light mb-12 border-b border-white/10 pb-6">ROI Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Projected New Value</p>
                    <p className="font-display text-4xl font-light text-white">
                      {formatCurrency(newValue)}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Remodel Investment</p>
                    <p className="font-display text-4xl font-light text-white/60">
                      {formatCurrency(cost)}
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-4">Net Profit Difference</p>
                  <p className={`font-display text-5xl md:text-6xl font-light mb-4 ${netGain >= 0 ? 'text-white' : 'text-red-400'}`}>
                    {formatCurrency(netGain)}
                  </p>
                  <p className="font-body text-xs text-white/40 leading-relaxed">
                    This is the additional profit (or loss) you would realize after paying for the remodel compared to selling as-is.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                <Link href="/contact">
                  <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] w-full justify-center cursor-pointer">
                    Get a Custom ROI Report
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
