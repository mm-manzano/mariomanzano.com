/*
 * DESIGN: Quiet Luxury Editorial
 * Nav: Minimal, transparent on hero, white on scroll. Logo = wordmark in Cormorant Garamond.
 * Links: DM Sans, small caps, gold underline on hover.
 * CTA: Single "Request Consultation" button in charcoal.
 * Language: Basic EN | ES toggle in top-right
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Selling Process", href: "/selling-process" },
  { label: "Search Homes", href: "https://mariomanzano.exprealty.com", external: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const navLinksES = [
  { label: "Inicio", href: "/es" },
  { label: "Proceso de Venta", href: "/es/proceso-de-venta" },
  { label: "Buscar Casas", href: "https://mariomanzano.exprealty.com", external: true },
  { label: "Acerca", href: "/es/acerca" },
  { label: "Contacto", href: "/es/contacto" },
];

export default function Navigation(  ) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const isSpanish =
    location === "/es" ||
    location.startsWith("/es/");
  const [language, setLanguage] = useState<"en" | "es">("en");

  const handleNavClick = (href: string) => {
    // Close mobile menu
    setMobileOpen(false);
    
    // If clicking the same page, scroll to top
    if (location === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to different page
      setLocation(href);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Sync language state with current location
  useEffect(() => {
    if (isSpanish && language === "en") {
      setLanguage("es");
    } else if (!isSpanish && language === "es") {
      setLanguage("en");
    }
  }, [isSpanish, language]);

const isHome = typeof window !== "undefined" 
  ? window.location.pathname === "/" 
  : false;

const handleLanguageChange = (lang: "en" | "es") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    if (lang === "es") {
      const esRoutes = {
        "/": "/es",
        "/home-value": "/es",
        "/homeowner-guide": "/es/guia-para-propietarios",
        "/selling-process": "/es/proceso-de-venta",
        "/about": "/es/acerca",
        "/contact": "/es/contacto",
        "/es": "/es",
        "/es/guia-para-propietarios": "/es/guia-para-propietarios",
        "/es/proceso-de-venta": "/es/proceso-de-venta",
        "/es/acerca": "/es/acerca",
        "/es/contacto": "/es/contacto",
      };
      setLocation(esRoutes[location.split("?")[0]] || "/es");
    } else {
      const enRoutes: { [key: string]: string } = {
        "/es": "/",
        "/es/guia-para-propietarios": "/homeowner-guide",
        "/es/proceso-de-venta": "/selling-process",
        "/es/acerca": "/about",
        "/es/contacto": "/contact",
      };
      setLocation(enRoutes[location.split("?")[0]] || "/");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F5F0]/95 backdrop-blur-sm border-b border-[#E8E0D5] shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Wordmark */}
            <Link to="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-logo_f81eb6dd.png"
                  alt="Mario Manzano"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <div className="flex flex-col leading-none">
                  <span
                    className="font-display text-xl md:text-2xl font-light tracking-[0.04em] text-[#1A1A18]"
                  >
                    Mario Manzano
                  </span>
                  <span
                    className={`font-body ${isSpanish ? "text-[8px] md:text-[9px]" : "text-[9px] md:text-[10px]"} tracking-[0.2em] uppercase mt-0.5 text-[#B8974A] whitespace-nowrap`}
                  >
                    {isSpanish ? "Agente Inmobiliario | Estrategia de Venta" : "Austin Realtor | Seller Strategist"}
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className={`hidden md:flex items-center justify-center ${
              isSpanish ? "gap-3" : "gap-4"
            }`}>
              {(isSpanish ? navLinksES : navLinks  ).map((link) => (
                link.external ? (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    <span
                      className={`nav-link ${
                        isSpanish ? "text-[9.5px]" : "text-[11px]"
                      } tracking-[0.15em] uppercase font-medium transition-colors duration-300 whitespace-nowrap text-[#1A1A18]`}
                    >
                      {link.label}
                    </span>
                  </a>
                ) : (
                  <a key={link.href} href="#" onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}>
                    <span
                      className={`nav-link ${
                        isSpanish ? "text-[9.5px]" : "text-[11px]"
                      } tracking-[0.15em] uppercase font-medium transition-colors duration-300 whitespace-nowrap text-[#1A1A18]`}
                    >
                      {link.label}
                    </span>
                  </a>
                )
              ))}
              
              {/* Language Toggle */}
              <div className={`flex items-center gap-2 ${
                isSpanish ? "text-[9px]" : "text-[11px]"
              } tracking-[0.15em] uppercase font-medium border-l border-[#1A1A18] text-[#1A1A18] ${
                isSpanish ? "pl-2 ml-1" : "pl-4 ml-2"
              }`}>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`transition-colors duration-300 ${
                    language === "en"
                      ? "text-[#B8974A]"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  English
                </button>
                <span className="opacity-50">|</span>
                <button
                  onClick={() => handleLanguageChange("es")}
                  className={`transition-colors duration-300 ${
                    language === "es"
                      ? "text-[#B8974A]"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  Español
                </button>
              </div>

              <a
                href={getCTALink("start-conversation", language)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  console.log("DESKTOP CTA CLICK");
                  if (window.fbq) {
                    window.fbq("track", "Contact");
                  }
                }}
                className={`btn-luxury text-[10px] py-2 ${
                  isSpanish ? "px-3" : "px-4"
                } cursor-pointer border-0 bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A]`}
              >
                {language === "es"
                  ? "Iniciar una Conversación"
                  : "Start a conversation"}
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-[#1A1A18]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
  <div className="fixed inset-0 z-40 bg-[#F8F5F0] flex flex-col transition-all duration-500">
        <div className="container flex flex-col h-full pt-24 pb-12">
          <nav className="flex flex-col gap-8 flex-1">
            {(isSpanish ? navLinksES : navLinks).map((link, i) => (
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  <span
                    className="font-display text-4xl font-light text-[#1A1A18] hover:text-[#B8974A] transition-colors duration-300 block"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    {link.label}
                  </span>
                </a>
              ) : (
                <a key={link.href} href="#" onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}>
                  <span
                    className="font-display text-4xl font-light text-[#1A1A18] hover:text-[#B8974A] transition-colors duration-300 block"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    {link.label}
                  </span>
                </a>
              )
            ))
          </nav>
          )}
          {/* Mobile Language Toggle */}
          <div className="flex items-center gap-3 mb-8 text-sm tracking-[0.15em] uppercase font-medium text-[#1A1A18]">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`transition-colors duration-300 ${
                language === "en" ? "text-[#B8974A]" : "opacity-50 hover:opacity-100"
              }`}
            >
              English
            </button>
            <span className="opacity-50">|</span>
            <button
              onClick={() => handleLanguageChange("es")}
              className={`transition-colors duration-300 ${
                language === "es" ? "text-[#B8974A]" : "opacity-50 hover:opacity-100"
              }`}
            >
              Español
            </button>
          </div>

        <a
          href={getCTALink("start-conversation", language)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (window.fbq) {
              window.fbq("track", "Contact");
            }
          }}
          className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0"
        >
          {language === "es"
          ? "Iniciar una Conversación"
          : "Start a conversation"}
        </a>
        </div>
      </div>
    </>
  );
}
