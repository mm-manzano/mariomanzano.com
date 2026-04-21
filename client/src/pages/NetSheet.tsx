import { Link } from "wouter";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function NetSheet() {
  const [price, setPrice] = useState(500000);
  const [mortgage, setMortgage] = useState(300000);
  const [commission, setCommission] = useState(6);
  const [closingCosts, setClosingCosts] = useState(2);
  const [repairs, setRepairs] = useState(0);

  const commissionCost = price * (commission / 100);
  const closingCostAmount = price * (closingCosts / 100);
  const totalCosts = commissionCost + closingCostAmount + repairs;
  const net = price - mortgage - totalCosts;

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
            Find out what you'd <br />
            <em className="italic">actually walk away with.</em>
          </h1>
          <p className="font-body text-base md:text-lg text-[#1A1A18]/60 max-w-2xl leading-relaxed">
            Your sale price is not what you take home. Calculate your net proceeds after agent compensation, closing costs, and repairs.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs Column */}
          <div className="bg-white p-6 md:p-10 shadow-sm border border-[#E8E0D5]">
            <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-8 text-center">Your Sale Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-[#1A1A18]/50 uppercase tracking-wider mb-2">Estimated Sale Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/40">$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full border border-[#E8E0D5] p-4 pl-8 font-body text-lg focus:outline-none focus:border-[#B8974A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1A18]/50 uppercase tracking-wider mb-2">Mortgage Balance</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/40">$</span>
                  <input
                    type="number"
                    value={mortgage}
                    onChange={(e) => setMortgage(Number(e.target.value))}
                    className="w-full border border-[#E8E0D5] p-4 pl-8 font-body text-lg focus:outline-none focus:border-[#B8974A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1A1A18]/50 uppercase tracking-wider mb-2">Commission (%)</label>
                  <input
                    type="number"
                    value={commission}
                    onChange={(e) => setCommission(Number(e.target.value))}
                    className="w-full border border-[#E8E0D5] p-4 font-body text-lg focus:outline-none focus:border-[#B8974A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1A1A18]/50 uppercase tracking-wider mb-2">Closing Costs (%)</label>
                  <input
                    type="number"
                    value={closingCosts}
                    onChange={(e) => setClosingCosts(Number(e.target.value))}
                    className="w-full border border-[#E8E0D5] p-4 font-body text-lg focus:outline-none focus:border-[#B8974A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1A18]/50 uppercase tracking-wider mb-2">Repairs / Prep Costs</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]/40">$</span>
                  <input
                    type="number"
                    value={repairs}
                    onChange={(e) => setRepairs(Number(e.target.value))}
                    className="w-full border border-[#E8E0D5] p-4 pl-8 font-body text-lg focus:outline-none focus:border-[#B8974A]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="bg-[#1A1A18] p-6 md:p-10 shadow-sm text-white flex flex-col justify-between">
            <div>
              <h2 className="font-display text-2xl font-light mb-8 text-center text-white/90">Estimated Net Proceeds</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-white/50 font-body text-sm uppercase tracking-widest">Commission Cost</span>
                  <span className="text-white/90 font-display text-xl">${commissionCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-white/50 font-body text-sm uppercase tracking-widest">Closing Costs</span>
                  <span className="text-white/90 font-display text-xl">${closingCostAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-white/50 font-body text-sm uppercase tracking-widest">Total Costs</span>
                  <span className="text-white/90 font-display text-xl">${totalCosts.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center py-8 bg-white/5 rounded-sm border border-white/10">
                <p className="text-white/40 font-body text-xs uppercase tracking-[0.2em] mb-3">Estimated Net Proceeds</p>
                <p className="text-[#B8974A] font-display text-5xl md:text-6xl font-light">
                  ${net.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-white/30 text-[10px] uppercase tracking-widest text-center mt-8 leading-relaxed">
              Estimate only. Final numbers depend on taxes, condition, and negotiated terms.
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
            <h4 className="font-display text-2xl font-light mb-3">Ready to move forward?</h4>
            <p className="font-body text-base text-white/60 leading-relaxed">
              Let's walk through your real numbers and build a plan around your situation.
            </p>
          </div>
          <Link href="/contact">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
              Start a Conversation
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
