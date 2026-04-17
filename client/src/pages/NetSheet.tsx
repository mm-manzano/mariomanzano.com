/*
 * DESIGN: Quiet Luxury Editorial - Net Sheet Page
 * Purpose: Secondary conversion page for high-intent seller leads.
 * Layout: Minimal, mobile-first, focused on the proceeds calculator.
 */

import { Link } from "wouter";
import { ArrowRight, ChevronLeft } from "lucide-react";

export default function NetSheet() {
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
            Your sale price is not what you take home. Calculate your net proceeds after agent compensation, closing costs, taxes, and repairs.
          </p>
        </div>

        {/* Tool Container */}
        <div className="bg-white p-6 md:p-12 shadow-sm border border-[#E8E0D5] min-h-[500px] flex flex-col items-center justify-center text-center">
          {/* 
              REPLACE THIS DIV WITH YOUR EMBEDDED CALCULATOR TOOL 
              Example: <iframe src="your-net-sheet-tool-url" className="w-full h-full border-0" />
          */}
          <div className="max-w-md">
            <div className="w-16 h-16 bg-[#F8F5F0] rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="text-[#B8974A]" size={24} />
            </div>
            <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
              Net Sheet Calculator Coming Soon
            </h3>
            <p className="font-body text-sm text-[#1A1A18]/40 mb-8">
              Coming Soon
            </p>
          </div>
        </div>

        {/* Final Step Flow */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-[#1A1A18] text-white">
          <div>
            <h4 className="font-display text-xl font-light mb-2">Ready to move forward?</h4>
            <p className="font-body text-sm text-white/60">Let's talk through your situation and create a clear plan for your sale.</p>
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
