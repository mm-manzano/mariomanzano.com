/*
 * DESIGN: Quiet Luxury Editorial
 * Footer: Deep charcoal background, warm off-white text, gold accents.
 * Minimal: wordmark, navigation, contact, legal.
 */

import { Link } from "wouter";
import { Instagram, Phone, Mail, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A18] text-[#F8F5F0]">
      <div className="container py-16 md:py-20">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl font-light tracking-wide mb-2">
              Mario Manzano
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#B8974A] mb-4">
              Seller Strategist
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              Helping Cedar Park & Leander homeowners develop clear strategy around selling, remodeling, renting, or holding.
            </p>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-5 font-body">
              Contact
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+15126959255"
                className="flex items-center gap-3 font-body text-sm text-white/70 hover:text-[#B8974A] transition-colors duration-300"
              >
                <Phone size={14} />
                (512) 695-9255
              </a>
              <a
                href="mailto:realtor@mariomanzano.com"
                className="flex items-center gap-3 font-body text-sm text-white/70 hover:text-[#B8974A] transition-colors duration-300"
              >
                <Mail size={14} />
                realtor@mariomanzano.com
              </a>
              <a
                href="https://www.instagram.com/mariomanzanoatx/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-white/70 hover:text-[#B8974A] transition-colors duration-300"
              >
                <Instagram size={14} />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/mariomanzanorealtor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-white/70 hover:text-[#B8974A] transition-colors duration-300"
              >
                <Facebook size={14} />
                Facebook
              </a>
            </div>
            <div className="mt-6">
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1 font-body">
                Serving
              </div>
              <div className="font-body text-sm text-white/60">
                Cedar Park · Leander · Austin, TX
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-body text-xs text-white/40">
              © {new Date().getFullYear()} Mario Manzano. All rights reserved. Licensed REALTOR® in Texas.
            </p>
            <p className="font-body text-xs text-white/50">
              Brokered by eXp Realty
            </p>
          </div>
          <p className="font-body text-xs text-white/30">
            Seller Strategy for Cedar Park & Leander
          </p>
        </div>
      </div>
    </footer>
  );
}
