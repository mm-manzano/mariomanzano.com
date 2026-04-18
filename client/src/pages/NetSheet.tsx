/*
 * DESIGN: Quiet Luxury Editorial - Net Sheet Page
 * Purpose: Secondary conversion page for high-intent seller leads.
 * Layout: Minimal, mobile-first, focused on the proceeds calculator.
 */

import { Link } from "wouter";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function NetSheet() {
  const [price, setPrice] = useState(500000);
  const [mortgage, setMortgage] = useState(300000);
  const [commission, setCommission] = useState(0.06);
  const [closingCosts, setClosingCosts] = useState(0.02);
  const [repairs, setRepairs] = useState(0);

  const commissionCost = price * commission;
  const closingCostAmount = price * closingCosts;

  const net =
    price - mortgage - commissionCost - closingCostAmount - repairs;

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-24 pb-16 md:pt-32">
      <div className="container max-w-4xl">
        
        {/* Back Link */}
        <Link href="/home-value">
          <span className="inline-flex items-center gap-2 text-[#1A1A18]/40 hover:text-[#B8974A] transition-colors mb-8 cursor-pointer font-body text-sm uppercase tracking-widest">
            <ChevronLeft size={16} />
            Back to Home Value
          </span>
        </Link>

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            Find out what you'd <br />
            <em className="italic">actually walk away with.</em>
          </h1>
          <p className="font-body text-base md:text-lg text-[#1A1A18]/60 max-w-2xl leading-relaxed">
            Your sale price is not what you take home. This gives you a quick estimate after typical costs.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white p-6 md:p-12 shadow-sm border border-[#E8E0D5]">
          
          <div className="grid gap-6 max-w-xl mx-auto">

            <div>
              <label className="block text-sm mb-1">Estimated Sale Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border p-3"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Mortgage Balance</label>
              <input
                type="number"
                value={mortgage}
                onChange={(e) => setMortgage(Number(e.target.value))}
                className="w-full border p-3"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Commission (%)</label>
              <input
                type="number"
                value={commission * 100}
                onChange={(e) =>
                  setCommission(Number(e.target.value) / 100)
                }
                className="w-full border p-3"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Closing Costs (%)</label>
              <input
                type="number"
                value={closingCosts * 100}
                onChange={(e) =>
                  setClosingCosts(Number(e.target.value) / 100)
                }
                className="w-full border p-3"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Repairs / Prep Costs</label>
              <input
                type="number"
                value={repairs}
                onChange={(e) => setRepairs(Number(e.target.value))}
                className="w-full border p-3"
              />
            </div>

            {/* Result */}
            <div className="mt-6 p-6 bg-[#F8F5F0] border text-center">
              <p className="text-sm text-[#1A1A18]/60 mb-2">
                Estimated Net Proceeds
              </p>
              <p className="text-3xl font-semibold text-[#1A1A18]">
                ${net.toLocaleString()}
              </p>
              <p className="text-xs text-[#1A1A18]/40 mt-2">
                Estimate only. Final numbers depend on taxes, condition, and negotiated terms.
              </p>
            </div>

          </div>

        </div>

        {/* Final Step Flow */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-[#1A1A18] text-white">
          <div>
            <h4 className="font-display text-xl font-light mb-2">
              Ready to move forward?
            </h4>
            <p className="font-body text-sm text-white/60">
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
