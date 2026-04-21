import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft } from "lucide-react";

export default function RemodelVsSell() {
  const [currentValue, setCurrentValue] = useState(500000);
  const [remodelCost, setRemodelCost] = useState(50000);
  const [expectedIncrease, setExpectedIncrease] = useState(15);

  // Calculations
  const newValue = currentValue * (1 + expectedIncrease / 100);
  const profit = newValue - currentValue - remodelCost;

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-24 pb-16 md:pt-32">
      <div className="container max-w-6xl">
        {/* Back Link */}
        <Link href="/strategy-hub">
          <span className="inline-flex items-center gap-2 text-[#1A1A18]/40 hover:text-[#B8974A] transition-colors mb-8 cursor-pointer font-body text-sm uppercase tracking-widest">
            <ChevronLeft size={16} />
            Back to Strategy Hub
          </span>
        </Link>

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            Is remodeling <br />
            <em className="italic">worth it?</em>
          </h1>
          <p className="font-body text-base md:text-lg text-[#1A1A18]/60 max-w-2xl leading-relaxed">
            Analyze the financial impact of renovating your home before selling versus selling it as-is. Discover if a remodel will truly increase your net profit.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs Column */}
          <div className="bg-white p-6 md:p-10 shadow-sm border border-[#E8E0D5]">
            <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-8 text-center">Your Remodel Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-[#1A1A18]/50 uppercase tracking-wider mb-2">Current Home Value (As-Is)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/40">$</span>
                  <input
                    type="number"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(Number(e.target.value))}
                    className="w-full border border-[#E8E0D5] p-4 pl-8 font-body text-lg focus:outline-none focus:border-[#B8974A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1A18]/50 uppercase tracking-wider mb-2">Remodel Cost</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/40">$</span>
                  <input
                    type="number"
                    value={remodelCost}
                    onChange={(e) => setRemodelCost(Number(e.target.value))}
                    className="w-full border border-[#E8E0D5] p-4 pl-8 font-body text-lg focus:outline-none focus:border-[#B8974A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1A18]/50 uppercase tracking-wider mb-2">Expected Value Increase (%)</label>
                <input
                  type="number"
                  value={expectedIncrease}
                  onChange={(e) => setExpectedIncrease(Number(e.target.value))}
                  className="w-full border border-[#E8E0D5] p-4 font-body text-lg focus:outline-none focus:border-[#B8974A]"
                />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="bg-[#1A1A18] p-6 md:p-10 shadow-sm text-white flex flex-col justify-between">
            <div>
              <h2 className="font-display text-2xl font-light mb-8 text-center text-white/90">Your Strategic Outlook</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-white/50 font-body text-sm uppercase tracking-widest">Projected New Value</span>
                  <span className="text-white/90 font-display text-xl">${Math.round(newValue).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-white/50 font-body text-sm uppercase tracking-widest">Remodel Cost</span>
                  <span className="text-white/90 font-display text-xl">${remodelCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center py-8 bg-white/5 rounded-sm border border-white/10">
                <p className="text-white/40 font-body text-xs uppercase tracking-[0.2em] mb-3">Net Gain / Loss from Remodeling</p>
                <p className={`font-display text-5xl md:text-6xl font-light ${profit >= 0 ? 'text-[#B8974A]' : 'text-red-400'}`}>
                  {profit >= 0 ? '+' : '-'}${Math.abs(Math.round(profit)).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-white/30 text-[10px] uppercase tracking-widest text-center mt-8 leading-relaxed">
              Estimate only. Final numbers depend on market conditions, remodel quality, and timing.
            </p>
          </div>
        </div>

        {/* Optional Valuation Section */}
        <div className="mt-12 p-8 md:p-16 bg-white shadow-sm border border-[#E8E0D5] text-center">
          <h3 className="font-display text-2xl md:text-3xl font-light text-[#1A1A18] mb-4">
            Before you decide, you may want a baseline estimate.
          </h3>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-2xl mx-auto leading-relaxed mb-10">
            These estimates don’t account for your home’s condition, upgrades, or positioning. I’ll walk you through how I’d actually price it in today’s market.
          </p>
          <Link href="/home-value">
            <span className="btn-luxury-outline inline-flex items-center gap-3">
              Get a Baseline Estimate
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* Final Step Flow */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 bg-[#1A1A18] text-white">
          <div className="max-w-xl">
            <h4 className="font-display text-2xl font-light mb-3">Ready for a personalized strategy?</h4>
            <p className="font-body text-base text-white/60 leading-relaxed">
              Let's discuss your home, your goals, and create a tailored plan.
            </p>
          </div>
          <Link href="/contact">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
              Schedule a Strategy Session
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
