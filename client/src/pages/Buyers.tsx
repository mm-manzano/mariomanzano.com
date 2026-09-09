/*
 * DESIGN: Quiet Luxury Editorial - Buyers Page (Move-Up Buyer Primary, All Buyers Welcome)
 * Audience: Cedar Park / Leander buyers. Move-up buyer is the primary story.
 * Core message: Don't just find a house. Understand the move.
 * Matches homepage theme: same fonts, colors, RevealDiv scroll animation,
 * same button styles, same section rhythm (label + headline + copy).
 * SEO FIX: setPageMeta also writes a <link rel="canonical"> tag.
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const HERO_IMG = "/images/austin-texas-real-estate-home.jpg";
const INTERIOR_IMG = "/images/cedar-park-tx-sold-home-clover-ridge-mario-manzano-interior.jpg";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`fade-in-up ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
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

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

export default function Buyers() {
  useEffect(() => {
    setPageMeta(
      "Buyer Strategy | Cedar Park & Leander TX | Mario Manzano",
      "Buying a home in Cedar Park or Leander? Mario Manzano helps you understand the numbers and the timing before you make a move, whether you own already or you're buying for the first time.",
      "https://mariomanzano.com/buyers/"
    );
  }, []);

  const buyerServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Home Buyer Representation",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "telephone": "+1-512-695-9255",
      "url": "https://mariomanzano.com"
    },
    "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"],
    "url": "https://mariomanzano.com/buyers/",
    "description": "Mario Manzano helps buyers in Cedar Park and Leander understand what a home is really worth and how to sequence the move before they commit to anything."
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buyerServiceSchema) }}
      />

      {/* HERO */}
      <section className="relative h-auto md:min-h-[70vh] flex items-start">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Cedar Park home" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 container py-16 md:py-0 md:pt-32 lg:pt-40 md:pb-16 lg:pb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-10 md:mb-12 pt-4 md:pt-0">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                CEDAR PARK AND LEANDER REAL ESTATE
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.0] mb-6">
              Don't just<br />
              find a house.<br />
              <em className="italic">Understand the move.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/75 max-w-xl leading-relaxed mb-10">
              Whether you own a home already or you're buying for the first time, the most important question is the same: do the numbers actually make sense before you commit? I help buyers in Cedar Park and Leander get a clear picture before they make an offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://go.mariomanzano.com/buyer-plan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.fbq) { window.fbq("trackCustom", "Lead_Buyer"); }
                }}
                className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0"
              >
                Let's Map Out Your Situation
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[#1A1A18] py-12">
        <div className="container">
          <div className="max-w-2xl">
            <p className="font-body text-base text-white/70 leading-relaxed">
              I am primarily a listing agent focused on Cedar Park and Leander. That means I see what sellers see, what homes are actually worth, and where buyers usually overpay. When I work with buyers, that perspective comes with me.
            </p>
          </div>
        </div>
      </section>

      {/* THE REAL QUESTION */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealDiv className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={INTERIOR_IMG} alt="Home interior Cedar Park" className="w-full h-full object-cover" />
              </div>
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01. The Real Question</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
                Sell first,<br />
                <em className="italic">or buy first?</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                If you already own a home, this is the question that shapes everything else. The answer depends on your equity, your timeline, and what the market is doing right now. Getting it wrong means either carrying two mortgages or scrambling for a rental in between.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                That is the conversation we should have before you start looking at listings. Once you know what your home is worth and what you can realistically net, the rest gets a lot clearer.
              </p>
              <Link href="/seller-strategy/">
                <span className="btn-luxury-outline inline-flex items-center gap-3">
                  See How I Approach Selling
                  <ArrowRight size={14} />
                </span>
              </Link>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* HOW I HELP */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">02. How I Help</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-3 max-w-xl">
              Both sides of the move.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/60 mb-12 max-w-lg">
              Buying is about more than finding a house. I help you think through the whole picture.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E0D5]">
            {[
              {
                num: "01",
                title: "The Value",
                desc: "What is this home actually worth, and what will it cost you later? That is the number you need before you make any offer, regardless of what the list price says."
              },
              {
                num: "02",
                title: "The Timing",
                desc: "If you already own a home, sell first or buy first is not a one-size-fits-all answer. We look at your equity, the market, and your situation to find the right sequence."
              },
              {
                num: "03",
                title: "The Next Home",
                desc: "Once the numbers make sense, finding the right home gets a lot less stressful. You will know your budget, your timeline, and exactly what you are working with."
              }
            ].map((item, i) => (
              <RevealDiv
                key={item.num}
                delay={i * 80}
                className="bg-[#F8F5F0] p-8 md:p-10 group hover:bg-[#1A1A18] transition-colors duration-500"
              >
                <div className="font-display text-5xl font-light text-[#E8E0D5] group-hover:text-[#B8974A]/30 mb-4 transition-colors duration-500">
                  {item.num}
                </div>
                <h3 className="font-display text-3xl font-light text-[#1A1A18] group-hover:text-white mb-3 transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="font-body text-base text-[#1A1A18]/60 group-hover:text-white/60 transition-colors duration-500">
                  {item.desc}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* HOW THIS WORKS */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">How This Works</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12">
              Start with a<br />
              <em className="italic">real conversation.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "You reach out",
                desc: "Tell me where you are in the process. No forms, no pressure. Just a conversation about your situation."
              },
              {
                step: "02",
                title: "We look at the numbers",
                desc: "I walk you through what the home is actually worth, what comparable sales show, and how that shapes your options."
              },
              {
                step: "03",
                title: "You decide what to do next",
                desc: "Some people are ready to move. Others need a few months. Either way, you will have the full picture to make a confident decision."
              }
            ].map((item, i) => (
              <RevealDiv key={item.step} delay={i * 100}>
                <div className="border-t-2 border-[#B8974A] pt-6">
                  <p className="font-display text-4xl font-light text-[#E8E0D5] mb-4">{item.step}</p>
                  <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                  <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
                </div>
              </RevealDiv>
            ))}
          </div>

          <RevealDiv delay={300} className="mt-12">
            <a
              href="https://go.mariomanzano.com/buyer-plan"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (window.fbq) { window.fbq("trackCustom", "Lead_Buyer"); }
              }}
              className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0"
            >
              Start a Conversation
              <ArrowRight size={14} />
            </a>
          </RevealDiv>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="bg-[#1A1A18] py-20 md:py-32 text-center">
        <div className="container">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
              Ready to understand<br />
              <em className="italic">the move?</em>
            </h2>
            <p className="font-body text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              No sales pitch. Just a straight conversation about what the numbers look like and what makes sense for your situation.
            </p>
            <a
              href="https://go.mariomanzano.com/buyer-plan"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (window.fbq) { window.fbq("trackCustom", "Lead_Buyer"); }
              }}
              className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer border-0"
            >
              Let's Map Out Your Situation
              <ArrowRight size={14} />
            </a>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
