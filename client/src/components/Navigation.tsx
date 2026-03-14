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

const navLinks = [
  { label: "Home Value", href: "/home-value" },
  { label: "Homeowner Guide", href: "/homeowner-guide" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const navLinksES = [
  { label: "Valor de Casa", href: "/es/valor-de-casa" },
  { label: "Guía para Propietarios", href: "/es/guia-para-propietarios" },
  { label: "Acerca", href: "/es/acerca" },
  { label: "Contacto", href: "/es/contacto" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const isSpanish =
  location === "/es" ||
  location.startsWith("/es/");
  const [language, setLanguage] = useState<"en" | "es">("en");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location === "/";

  const handleLanguageChange = (lang: "en" | "es") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    if (lang === "es") {
  const esRoutes = {
  "/": "/es",
  "/home-value": "/es/valor-de-casa",
  "/homeowner-guide": "/es/guia-para-propietarios",
  "/about": "/es/acerca",
  "/contact": "/es/contacto",

  "/es": "/es",
  "/es/valor-de-casa": "/es/valor-de-casa",
  "/es/guia-para-propietarios": "/es/guia-para-propietarios",
  "/es/acerca": "/es/acerca",
  "/es/contacto": "/es/contacto",
  };
      setLocation(esRoutes[location.split("?")[0]] || "/es");
    } else {
      const enRoutes: { [key: string]: string } = {
        "/es": "/",
        "/es/valor-de-casa": "/home-value",
        "/es/guia-para-propietarios": "/homeowner-guide",
        "/es/acerca": "/about",
        "/es/contacto": "/contact",
      };
      setLocation(enRoutes[location.split("?")[0]] || "/");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-[#F8F5F0]/95 backdrop-blur-sm border-b border-[#E8E0D5] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Wordmark */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-logo_f81eb6dd.png"
                  alt="Mario Manzano"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <div className="flex flex-col leading-none">
                  <span
                    className={`font-display text-lg md:text-xl font-light tracking-[0.04em] transition-colors duration-300 ${
                      scrolled || !isHome ? "text-[#1A1A18]" : "text-white"
                    }`}
                  >
                    Mario Manzano
                  </span>
                  <span
                    className={`font-body text-[8px] tracking-[0.2em] uppercase mt-0.5 transition-colors duration-300 ${
                      scrolled || !isHome ? "text-[#B8974A]" : "text-[#D4B878]"
                    }`}
                  >
                    Austin Realtor | Seller Strategy
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {(isSpanish ? navLinksES : navLinks).map((link) => (
  <Link key={link.href} to={link.href}>
  <span
    className={`nav-link text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${
      scrolled || isHome
        ? "text-[#1A1A18]"
        : "text-[#1A1A18]"
    }`}
  >
    {link.label}
  </span>
</Link>
              ))}
              
              {/* Language Toggle */}
              <div className={`flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-medium border-l border-current pl-8 ml-4 ${
                scrolled || !isHome ? "text-[#1A1A18]" : "text-white/90"
              }`}>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`transition-colors duration-300 ${
                    language === "en"
                      ? scrolled || !isHome
                        ? "text-[#B8974A]"
                        : "text-[#D4B878]"
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
                      ? scrolled || !isHome
                        ? "text-[#B8974A]"
                        : "text-[#D4B878]"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  Español
                </button>
              </div>

              <Link href={language === "es" ? "/es/contacto" : "/contact"}>
                <span
                  className={`btn-luxury text-[10px] py-2.5 px-5 transition-all duration-300 ${
                    scrolled || !isHome
                      ? ""
                      : "bg-white/10 border-white/60 text-white hover:bg-white hover:text-[#1A1A18]"
                  }`}
                >
                  {language === "es" ? "Agendar Consulta" : "Book Consultation"}
                </span>
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden p-2 transition-colors duration-300 ${
                scrolled || !isHome ? "text-[#1A1A18]" : "text-white"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F8F5F0] flex flex-col transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="container flex flex-col h-full pt-24 pb-12">
          <nav className="flex flex-col gap-8 flex-1">
            {(isSpanish ? navLinksES : navLinks).map((link, i) => (
              <Link key={link.href} to={link.href}>
                <span
                  className="font-display text-4xl font-light text-[#1A1A18] hover:text-[#B8974A] transition-colors duration-300 block"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Language Toggle */}
          <div className="flex items-center gap-3 mb-8 text-sm tracking-[0.15em] uppercase font-medium text-[#1A1A18]">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`transition-colors duration-300 ${
                language === "en" ? "text-[#B8974A]" : "opacity-50 hover:opacity-100"
              }`}
            >
              EN
            </button>
            <span className="opacity-50">|</span>
            <button
              onClick={() => handleLanguageChange("es")}
              className={`transition-colors duration-300 ${
                language === "es" ? "text-[#B8974A]" : "opacity-50 hover:opacity-100"
              }`}
            >
              ES
            </button>
          </div>

          <Link href={language === "es" ? "/es/contacto" : "/contact"}>
            <span className="btn-luxury w-full justify-center text-center">
              {language === "es" ? "Agendar Consulta" : "Book Consultation"}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
