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
 * NAV LABEL FIX: "Guide" renamed to "Seller Guide" (EN) and "Guía del Vendedor" (ES)
 *       so buyers who land on the nav understand the guide is seller-specific content.
 * NAV REVERT: Desktop inline nav restored. Hamburger on mobile only.
 * READABILITY UPDATE (H4): Header and mobile menu are now slate grey #3A3A3A
 *       instead of cream. White text, brighter gold #D4B56A for the tagline and
 *       active language, white CTA button with dark text. Nav links 11px to 13px,
 *       tagline 10px to 12px, CTA 10px to 13px. Inactive language uses white/70
 *       instead of opacity-50 for readable contrast. Desktop inline nav now starts
 *       at lg (1024px) instead of md, since the larger text no longer fits on
 *       tablets. Tablets get the hamburger menu.
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Seller Guide", href: "/homeowner-guide/" },
  { label: "Buyers", href: "/buyers/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];
const navLinksES = [
  { label: "Inicio", href: "/es/" },
  { label: "Guía del Vendedor", href: "/es/guia-para-propietarios/" },
  { label: "Compradores", href: "/es/buyers/" },
  { label: "Acerca", href: "/es/acerca/" },
  { label: "Contacto", href: "/es/contacto/" },
];

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
    setMobileOpen(false);

    const targetHref = (isBuyerPage && (href === "/contact/" || href === "/es/contacto/"))
      ? `${href}?intent=buyer`
      : href;

    if (location === targetHref) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
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

  useEffect(() => {
    if (isSpanish && language === "en") {
      setLanguage("es");
    } else if (!isSpanish && language === "es") {
      setLanguage("en");
    }
  }, [isSpanish, language]);

  const getLanguageTargetPath = (lang: "en" | "es") => {
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

  const langActive = "transition-colors duration-300 text-[#D4B56A]";
  const langInactive = "transition-colors duration-300 text-white/70 hover:text-white";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#3A3A3A] border-b border-[#4A4A4A] shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Wordmark */}
            <Link to="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  src="/images/logo.png"
                  alt="Mario Manzano"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-display text-xl md:text-2xl font-normal tracking-[0.04em] text-white">
                    Mario Manzano
                  </span>
                  <span className="font-body text-[11px] md:text-xs tracking-[0.12em] md:tracking-[0.18em] uppercase mt-1 text-[#D4B56A] whitespace-normal md:whitespace-nowrap">
                    {isSpanish ? "Realtor En Austin | Estrategia de Venta" : "Austin Realtor | Seller Strategist"}
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center justify-end gap-3">
              {(isSpanish ? navLinksES : navLinks).map((link) => {
                const isContactLink = link.href === "/contact/" || link.href === "/es/contacto/";
                const resolvedHref = isContactLink && isBuyerPage ? `${link.href}?intent=buyer` : link.href;
                return (
                  <a key={link.href} href={resolvedHref} onClick={(e) => { e.preventDefault(); handleNavClick(resolvedHref); }}>
                    <span className="nav-link text-[13px] tracking-[0.08em] uppercase font-semibold transition-colors duration-300 whitespace-nowrap text-white">
                      {link.label}
                    </span>
                  </a>
                );
              })}

              {/* Language Toggle */}
              <div className="flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold border-l border-white/40 text-white pl-3 ml-1">
                <a href={getLanguageTargetPath("en")}
                  onClick={(e) => { e.preventDefault(); handleLanguageChange("en"); }}
                  className={language === "en" ? langActive : langInactive}>
                  English
                </a>
                <span className="text-white/50">|</span>
                <a href={getLanguageTargetPath("es")}
                  onClick={(e) => { e.preventDefault(); handleLanguageChange("es"); }}
                  className={language === "es" ? langActive : langInactive}>
                  Español
                </a>
              </div>

              <a
                onClick={handleCTAClick}
                className="btn-luxury text-[13px] font-semibold py-2.5 !px-4 whitespace-nowrap cursor-pointer !bg-white !text-[#1A1A1A] !border-white hover:!bg-[#E6E6E6] hover:!border-[#E6E6E6]"
                style={{ marginLeft: "auto" }}
              >
                {language === "es" ? "Iniciar una Conversación" : "Start a conversation"}
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#3A3A3A] flex flex-col transition-all duration-500">
          <div className="container flex flex-col h-full pt-24 pb-12">
            <nav className="flex flex-col gap-8 flex-1">
              {(isSpanish ? navLinksES : navLinks).map((link, i) => (
                <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}>
                  <span
                    className="font-display text-4xl font-normal text-white hover:text-[#D4B56A] transition-colors duration-300 block"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Language Toggle */}
            <div className="flex items-center gap-3 mb-8 text-base tracking-[0.12em] uppercase font-semibold text-white">
              <a
                href={getLanguageTargetPath("en")}
                onClick={(e) => { e.preventDefault(); handleLanguageChange("en"); }}
                className={language === "en" ? langActive : langInactive}
              >
                English
              </a>
              <span className="text-white/50">|</span>
              <a
                href={getLanguageTargetPath("es")}
                onClick={(e) => { e.preventDefault(); handleLanguageChange("es"); }}
                className={language === "es" ? langActive : langInactive}
              >
                Español
              </a>
            </div>

            <a
              onClick={handleCTAClick}
              className="btn-luxury inline-flex items-center justify-center gap-3 cursor-pointer text-base font-semibold !bg-white !text-[#1A1A1A] !border-white hover:!bg-[#E6E6E6] hover:!border-[#E6E6E6]"
            >
              {language === "es" ? "Iniciar una Conversación" : "Start a conversation"}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
