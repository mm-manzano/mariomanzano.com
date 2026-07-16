/*
 * DESIGN: Quiet Luxury Editorial
 * Footer: Deep charcoal background, warm off-white text, gold accents.
 * Minimal: wordmark, navigation, contact, legal.
 * Language-aware: English and Spanish translations
 */

import { useLocation } from "wouter";
import { Instagram, Phone, Mail, Facebook } from "lucide-react";

export default function Footer() {
  const [location] = useLocation();
  const isSpanish = location.startsWith("/es");

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
              {isSpanish ? "Estratega de Venta" : "Seller Strategist"}
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              {isSpanish
                ? "Ayudando a propietarios en el área de Austin a desarrollar una estrategia clara sobre vender, remodelar, rentar o mantener."
                : "Helping homeowners across the Austin area develop a clear strategy around selling, remodeling, renting, or holding."}
            </p>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#B8974A] mb-5 font-body">
              {isSpanish ? "Contacto" : "Contact"}
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
                {isSpanish ? "Sirviendo" : "Serving"}
              </div>
              <div className="font-body text-sm text-white/60">
                {isSpanish ? "Área de Austin · Cedar Park · Leander" : "Austin Area · Cedar Park · Leander"}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-body text-xs text-white/40">
              © {new Date().getFullYear()} Mario Manzano. {isSpanish ? "Todos los derechos reservados. Agente REALTOR® con licencia en Texas." : "All rights reserved. Licensed REALTOR® in Texas."}
            </p>
            <p className="font-body text-xs text-white/50">
              {isSpanish ? "Representado por eXp Realty · Leander, TX" : "Brokered by eXp Realty · Leander, TX"}
            </p>
            <div className="flex gap-4 mt-2">
              <a href={isSpanish ? "/es/privacy-policy" : "/privacy-policy"} className="font-body text-xs text-white/40 hover:text-[#B8974A] transition-colors duration-300">
                {isSpanish ? "Política de Privacidad" : "Privacy Policy"}
              </a>
              <a href={isSpanish ? "/es/terms-of-service" : "/terms-of-service"} className="font-body text-xs text-white/40 hover:text-[#B8974A] transition-colors duration-300">
                {isSpanish ? "Términos de Servicio" : "Terms of Service"}
              </a>
              <a href={isSpanish ? "/es/guia-para-propietarios" : "/homeowner-guide"} className="font-body text-xs text-white/40 hover:text-[#B8974A] transition-colors duration-300">
                {isSpanish ? "Guía del Propietario" : "Homeowner Guide"}
              </a>
              <a href={isSpanish ? "/es/buyers" : "/buyers"} className="font-body text-xs text-white/40 hover:text-[#B8974A] transition-colors duration-300">
                {isSpanish ? "Compradores" : "Buyers"}
              </a>
            </div>
          </div>
          <p className="font-body text-xs text-white/40 hover:text-[#B8974A] transition-colors duration-300">
            {isSpanish ? "Estrategia de Venta para el Área de Austin" : "Seller Strategy for the Austin Area"}
          </p>
        </div>
      </div>
    </footer>
  );
}
