/*
* DESIGN: Quiet Luxury Editorial
* Nav: Minimal, transparent on hero, white on scroll. Logo = wordmark in Cormorant Garamond.
* Links: DM Sans, small caps, gold underline on hover.
* CTA: Single "Request Consultation" button in charcoal.
* Language: Basic EN | ES toggle in top-right
* FIX: Ensured Spanish menu items have the exact same font size and styling as English.
* FIX: Language toggle is now a real <a href> (crawlable) instead of a button-only
*       click handler, and the EN/ES route map covers every real route on the site
*       instead of just five of them.
* BUYERS UPDATE: "Start a conversation" CTA (desktop + mobile) now detects Buyers
*       pages and routes to the buyer funnel with Lead_Buyer tracking instead of
*       always sending everyone to the seller funnel with generic Contact tracking.
* SEO FIX: All internal hrefs and route map values now use trailing slashes to
*       match the canonical prerendered URLs (e.g. /buyers/ not /buyers). Google
*       Search Console was flagging these as "Page with redirect" because the nav
*       kept linking to the non-slash version, which 301s to the slash version.
*       Route map keys stay without trailing slash since getLanguageTargetPath
*       strips the slash before doing the lookup, only the values changed.
*/

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Guide", href: "/homeowner-guide/" },
  { label: "Buyers", href: "/buyers/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];
const navLinksES = [
  { label: "Inicio", href: "/es/" },
  { label: "Guía", href: "/es/guia-para-propietarios/" },
  { label: "Compradores", href: "/es/buyers/" },
  { label: "Acerca", href: "/es/acerca/" },
  { label: "Contacto", href: "/es/contacto/" },
];

// Full EN -> ES route map. Every real route in scripts/prerender.js should
// have an entry here so the language toggle always lands on the matching
// page instead of falling back to the homepage.
// Keys stay WITHOUT trailing slash (getLanguageTargetPath normalizes the
// current path before lookup). Values now carry the trailing slash since
// those become the actual href the visitor is sent to.
const esRoutes: { [key: string]: string } = {
  "/": "/es/",
  "/strategy-hub": "/es/strategy-hub/",
  "/home-value": "/es/home-value/",
  "/sell-vs-rent": "/es/sell-vs-rent/",
  "/remodel-vs-sell": "/es/remodel-vs-sell/",
  "/net-sheet": "/es/net-sheet/",
  "/homeowner-guide": "/es/guia-para-propietarios/",
  "/about": "/es/acerca/",
  "/contact": "/es/contacto/",
  "/buyers": "/es/buyers/",
  "/seller-strategy": "/es/presentacion-vendedores/",
  "/privacy-policy": "/es/privacy-policy/",
  "/terms-of-service": "/es/terms-of-service/",
  // Already-Spanish paths map to themselves so the toggle is idempotent
  // if it's ever called while already on the ES side.
  "/es": "/es/",
  "/es/strategy-hub": "/es/strategy-hub/",
  "/es/home-value": "/es/home-value/",
  "/es/sell-vs-rent": "/es/sell-vs-rent/",
  "/es/remodel-vs-sell": "/es/remodel-vs-sell/",
  "/es/net-sheet": "/es/net-sheet/",
  "/es/guia-para-propietarios": "/es/guia-para-propietarios/",
  "/es/acerca": "/es/acerca/",
  "/es/contacto": "/es/contacto/",
  "/es/buyers": "/es/buyers/",
  "/es/presentacion-vendedores": "/es/presentacion-vendedores/",
  "/es/privacy-policy": "/es/privacy-policy/",
  "/es/terms-of-service": "/es/terms-of-service/",
};

// Full ES -> EN route map, the inverse of esRoutes. Same rule: keys without
// trailing slash, values with it.
const enRoutes: { [key: string]: string } = {
  "/es": "/",
  "/es/strategy-hub": "/strategy-hub/",
  "/es/home-value": "/home-value/",
  "/es/sell-vs-rent": "/sell-vs-rent/",
  "/es/remodel-vs-sell": "/remodel-vs-sell/",
  "/es/net-sheet": "/net-sheet/",
  "/es/guia-para-propietarios": "/homeowner-guide/",
  "/es/acerca": "/about/",
  "/es/contacto": "/contact/",
  "/es/buyers": "/buyers/",
  "/es/presentacion-vendedores": "/seller-strategy/",
  "/es/privacy-policy": "/privacy-policy/",
  "/es/terms-of-service": "/terms-of-service/",
};

const BUYER_FUNNEL_URL = "https://go.mariomanzano.com/buyer-plan";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const isSpanish =
    location === "/es" ||
    location === "/es/" ||
    location.startsWith("/es/");
  const [language, setLanguage] = useState<"en" | "es">("en");

  // Detect whether the visitor is currently on a Buyers page (EN or ES),
  // so the nav CTA can route buyer traffic to the buyer funnel instead of
  // defaulting everyone to the seller funnel.
  // Checked against the trailing-slash form since that is what the live
  // prerendered pages actually resolve to.
  const currentPath = location.split("?")[0];
  const isBuyerPage = currentPath === "/buyers/" || currentPath === "/es/buyers/";

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = isBuyerPage ? BUYER_FUNNEL_URL : getCTALink("start-conversation", language);
    if (window.fbq) {
      if (isBuyerPage) {
        window.fbq("trackCustom", "Lead_Buyer");
      } else {
        window.fbq("track", "Contact");
      }
    }
    setTimeout(() => {
      window.open(url, "_blank");
    }, 500);
  };

  const handleNavClick = (href: string) => {
    // Close mobile menu
    setMobileOpen(false);

    // If clicking Contact while on a Buyers page, carry buyer intent forward
    // so the Contact page's CTA routes to the buyer funnel instead of
    // defaulting to the seller funnel.
    const targetHref = (isBuyerPage && (href === "/contact/" || href === "/es/contacto/"))
      ? `${href}?intent=buyer`
      : href;

    // If clicking the same page, scroll to top
    if (location === targetHref) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to different page
      setLocation(targetHref);
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

  // Resolve the target path for the language toggle link, given the
  // current location. Used for both the real href (so it's crawlable)
  // and the click handler (so the existing smooth client-side nav and
  // localStorage language preference still work for real visitors).
  const getLanguageTargetPath = (lang: "en" | "es") => {
    // Normalize away a trailing slash (other than the root "/") before
    // lookup, since prerendered routes resolve as e.g. "/net-sheet/" on
    // the live site but the route map keys above are stored without it.
    let normalizedPath = location.split("?")[0];
    if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
      normalizedPath = normalizedPath.slice(0, -1);
    }
    if (lang === "es") {
      return esRoutes[normalizedPath] || "/es/";
    }
    return enRoutes[normalizedPath] || "/";
  };

  const handleLanguageChange = (lang: "en" | "es") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setLocation(getLanguageTargetPath(lang));
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
                    className="font-body text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-0.5 text-[#B8974A] whitespace-nowrap"
                  >
                    {isSpanish ? "Realtor En Austin | Estrategia de Venta" : "Austin Realtor | Seller Strategist"}
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center justify-center gap-4">
              {(isSpanish ? navLinksES : navLinks).map((link) => {
                const isContactLink = link.href === "/contact/" || link.href === "/es/contacto/";
                const resolvedHref = isContactLink && isBuyerPage ? `${link.href}?intent=buyer` : link.href;
                return (
                  <a key={link.href} href={resolvedHref} onClick={(e) => { e.preventDefault(); handleNavClick(resolvedHref); }}>
                    <span
                      className="nav-link text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 whitespace-nowrap text-[#1A1A18]"
                    >
                      {link.label}
                    </span>
                  </a>
                );
              })}

              {/* Language Toggle */}
              <div className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-medium border-l border-[#1A1A18] text-[#1A1A18] pl-4 ml-2">
                <a href={getLanguageTargetPath("en")}
                  onClick={(e) => { e.preventDefault(); handleLanguageChange("en"); }}
                  className={language === "en" ? "transition-colors duration-300 text-[#B8974A]" : "transition-colors duration-300 opacity-50 hover:opacity-100"}>
                  English
                </a>
                <span className="opacity-50">|</span>
                <a href={getLanguageTargetPath("es")}
                  onClick={(e) => { e.preventDefault(); handleLanguageChange("es"); }}
                  className={language === "es" ? "transition-colors duration-300 text-[#B8974A]" : "transition-colors duration-300 opacity-50 hover:opacity-100"}>
                  Español
                </a>
              </div>

              <a onClick={handleCTAClick} className="btn-luxury text-[10px] py-2 cursor-pointer">
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
                <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}>
                  <span
                    className="font-display text-4xl font-light text-[#1A1A18] hover:text-[#B8974A] transition-colors duration-300 block"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Mobile Language Toggle */}
            <div className="flex items-center gap-3 mb-8 text-sm tracking-[0.15em] uppercase font-medium text-[#1A1A18]">
              <a href={getLanguageTargetPath("en")}
                onClick={(e) => { e.preventDefault(); handleLanguageChange("en"); }}
                className={language === "en" ? "transition-colors duration-300 text-[#B8974A]" : "transition-colors duration-300 opacity-50 hover:opacity-100"}>
                English
              </a>
              <span className="opacity-50">|</span>
              <a href={getLanguageTargetPath("es")}
                onClick={(e) => { e.preventDefault(); handleLanguageChange("es"); }}
                className={language === "es" ? "transition-colors duration-300 text-[#B8974A]" : "transition-colors duration-300 opacity-50 hover:opacity-100"}>
                Español
              </a>
            </div>

            <a onClick={handleCTAClick} className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0">
              {language === "es"
                ? "Iniciar una Conversación"
                : "Start a conversation"}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
