/*
 * DESIGN: Quiet Luxury Editorial - Contact / Consultation Page
 * Goal: Conversion-focused with primary CTA button above the fold
 * Structure: Hero with primary CTA → Secondary options → Reassurance
 * NO FORMS - Direct contact channels only
 * FINAL: Meta tags, Open Graph, ContactPage schema added.
 * BUYERS UPDATE: Reassurance Strip now includes buying alongside sell/rent/remodel/hold.
 * SEO FIX: setPageMeta now also writes a <link rel="canonical"> tag, and the
 *       page URL / schema URL both use the trailing-slash form (/contact/) to
 *       match where prerender.js actually writes the file (dist/contact/index.html).
 */

import { useEffect, useRef } from "react";
import { useSearch } from "wouter";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { getCTALink } from "@/lib/ctaLinks";

const ADVISOR_BG = "/images/cedar-park-tx-sold-home-clover-ridge-mario-manzano-exterior.jpg";
const TEXTURE_BG = "/images/Cedar-Park-Leander-Suburban-Neighborhood-Ariel.jpg";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`fade-in-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function setPageMeta(title: string, description: string, url: string) {
  document.title = title;
  const setMeta = (name: string, content: string, property = false) => {
    const attr = property ? "property" : "name";
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  };
  setMeta("description", description);
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("og:url", url, true);
  setMeta("og:type", "website", true);
  setMeta("og:image", "/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);

  // Canonical tag. Without this, Google has to guess which version of the
  // URL (with or without trailing slash) is the real one. Setting it
  // explicitly stops the redirect confusion from recurring on this page.
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

export default function Contact() {
  const search = useSearch();
  const isBuyerIntent = new URLSearchParams(search).get("intent") === "buyer";
  const ctaHref = isBuyerIntent ? "https://go.mariomanzano.com/buyer-plan" : getCTALink("start-conversation", "en");

  useEffect(() => {
    setPageMeta(
      "Contact Mario Manzano | Cedar Park & Leander Realtor",
      "Reach out to Mario Manzano, a licensed REALTOR® serving Cedar Park and Leander TX. No pressure, no sales pitch. Just a real conversation about your home and your options.",
      "https://mariomanzano.com/contact/"
    );
  }, []);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Mario Manzano",
    "url": "https://mariomanzano.com/contact/",
    "description": "Contact Mario Manzano, a licensed REALTOR® and Seller Strategist serving Cedar Park and Leander, Texas.",
    "mainEntity": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "telephone": "+1-512-695-9255",
      "email": "realtor@mariomanzano.com",
      "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"]
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* HERO SECTION WITH PRIMARY CTA */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ADVISOR_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/70" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <RevealDiv>
              <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
                Start the<br />
                <em className="italic">conversation.</em>
              </h1>
              <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed mb-10">
                Reach out and I will help you think through your options and what actually makes sense for your situation. No pressure. Just clarity.
              </p>
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.fbq) {
                    window.fbq(isBuyerIntent ? "trackCustom" : "track", isBuyerIntent ? "Lead_Buyer" : "Contact");
                  }
                }}
                className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0"
              >
                Start a conversation
                <ArrowRight size={14} />
              </a>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SECONDARY CONTACT OPTIONS */}
      <section className="py-16 md:py-20 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">Or reach me directly</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-10 max-w-2xl">
              Choose what works<br />
              <em className="italic">for you.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-3xl">
            <RevealDiv delay={100}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a href="tel:(512)695-9255" className="font-body text-lg font-semibold text-[#1A1A18] mb-2 hover:text-[#B8974A] transition-colors no-underline block">
                    (512) 695-9255
                  </a>
                  <p className="font-body text-sm text-[#1A1A18]/65">
                    Call or text anytime
                  </p>
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MessageSquare size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a
                    href={isBuyerIntent
                      ? "sms:+15126959255?body=Hi%20Mario,%20I%20have%20a%20quick%20question%20about%20buying%20a%20home."
                      : "sms:+15126959255?body=Hi%20Mario,%20I%20have%20a%20quick%20question%20about%20my%20home."}
                    className="font-body text-lg font-semibold text-[#1A1A18] mb-2 hover:text-[#B8974A]"
                  >
                    Send a Message
                  </a>
                  <p className="font-body text-sm text-[#1A1A18]/65">
                    I respond within 24 hours
                  </p>
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={200}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail size={24} className="text-[#B8974A]" />
                </div>
                <div>
                  <a href="mailto:realtor@mariomanzano.com" className="font-body text-lg font-semibold text-[#1A1A18] mb-2 hover:text-[#B8974A] transition-colors no-underline block">
                    realtor@mariomanzano.com
                  </a>
                  <p className="font-body text-sm text-[#1A1A18]/65">
                    Email anytime
                  </p>
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* EXPECTATION SETTING */}
      <section className="py-16 md:py-20">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">What to expect</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-6 max-w-2xl">
              A conversation,<br />
              <em className="italic">not a sales call.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl">
              Our first conversation is simple. I will ask a few questions, understand your situation, and give you a clear direction based on your goals. No sales pitch. No pressure. If selling or buying makes sense, I will tell you. If it does not, I will tell you that too.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* REASSURANCE STRIP */}
      <section
        className="py-16 relative"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-[#1A1A18]/90" />
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" style={{ background: "#D4B878" }} />
                <span className="section-number" style={{ color: "#D4B878" }}>Serving Cedar Park and Leander TX</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-6">
                A realtor who listens,<br />
                <em className="italic">not just sells.</em>
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-lg">
                I work with homeowners in Cedar Park, Leander, and the greater Austin area who want clarity before they commit to anything. Whether you are thinking about selling, renting, remodeling, holding, or buying your next home, the conversation starts the same way: with your situation, not a sales pitch.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
