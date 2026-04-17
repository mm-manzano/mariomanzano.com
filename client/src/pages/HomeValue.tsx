/*
 * DESIGN: Quiet Luxury Editorial - Home Value Page
 * Purpose: Primary conversion page for seller leads.
 * Layout: Minimal, mobile-first, focused on the valuation tool.
 */

import { Link } from "wouter";
import { ArrowRight, ChevronLeft } from "lucide-react";

export default function HomeValue() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-24 pb-16 md:pt-32">
      <div className="container max-w-4xl">
        
        {/* Back Link */}
        <Link href="/">
          <span className="inline-flex items-center gap-2 text-[#1A1A18]/40 hover:text-[#B8974A] transition-colors mb-8 cursor-pointer font-body text-sm uppercase tracking-widest">
            <ChevronLeft size={16} />
            Back to Strategy
          </span>
        </Link>

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-6">
            What is your home <br />
            <em className="italic">actually worth?</em>
          </h1>
          <p className="font-body text-base md:text-lg text-[#1A1A18]/60 max-w-2xl leading-relaxed">
            Get a professional valuation based on real-time Austin market data, neighborhood demand, and recent comparable sales.
          </p>
        </div>

        {/* Tool Container */}
        <div className="bg-white p-6 md:p-12 shadow-sm border border-[#E8E0D5]">
          
          <div className="w-full">
            <iframe
              src="https://mariomanzano.exprealty.com/sellembed.php"
              style={{ width: "100%", height: "160px", border: "none" }}
            />
          </div>

        </div>

        {/* Next Step Flow */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-[#1A1A18] text-white">
          <div>
            <h4 className="font-display text-xl font-light mb-2">
              Next Step: Calculate your net proceeds
            </h4>
            <p className="font-body text-sm text-white/60">
              Find out exactly what you'll walk away with after costs.
            </p>
          </div>
          <Link href="/net-sheet">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer whitespace-nowrap">
              Go to Net Sheet
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
