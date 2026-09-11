/*
 * DESIGN: Quiet Luxury Editorial - Listing Presentation
 * Route: /seller-strategy/ (now public)
 * Sections: Hero, Process, Photography, Marketing, Commitments, No Contract, Communication, About, Next Steps
 * SEO: Full meta tags + canonical. noindex removed — page is now public.
 */

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
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

const HEADSHOT =
  "/images/mario-manzano-austin-realtor-professional-headshot.JPG";

export default function ListingPresentation() {
  useEffect(() => {
    setPageMeta(
      "Seller Strategy | Cedar Park & Leander TX | Mario Manzano",
      "How Mario Manzano approaches listing homes in Cedar Park and Leander — an 8-step process built around your situation, clear communication, and no pressure.",
      "https://mariomanzano.com/seller-strategy/"
    );
  }, []);

  const sellerSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Home Seller Representation",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Mario Manzano",
      "telephone": "+1-512-695-9255",
      "url": "https://mariomanzano.com"
    },
    "areaServed": ["Cedar Park TX", "Leander TX", "Austin TX"],
    "url": "https://mariomanzano.com/seller-strategy/",
    "description": "Mario Manzano helps Cedar Park and Leander homeowners sell with a clear plan, professional marketing, and guidance at every step."
  };

  const processSteps = [
    {
      number: "01",
      title: "Preparation",
      desc: "Walkthrough, prep list, repairs, and staging guidance.",
    },
    {
      number: "02",
      title: "Photography & Launch",
      desc: "Professional photography, drone, listing copy, and full marketing activation.",
    },
    {
      number: "03",
      title: "Go Live",
      desc: "MLS launch, agreed on pricing, and targeted exposure.",
    },
    {
      number: "04",
      title: "Showings & Feedback",
      desc: "Coordinated showings with buyer feedback reviewed.",
    },
    {
      number: "05",
      title: "Offer Review",
      desc: "All offers presented with a clear breakdown of terms.",
    },
    {
      number: "06",
      title: "Under Contract",
      desc: "Inspection, appraisal, and title managed step by step.",
    },
    {
      number: "07",
      title: "Closing",
      desc: "Final walkthrough and signing.",
    },
    {
      number: "08",
      title: "Funding & Recording",
      desc: "Funds received, documents recorded, keys released.",
    },
  ];

  // Marketing focuses specifically on buyer-facing exposure tactics
  const marketingItems = [
    "Full MLS listing reviewed with you before going live",
    "Syndicated to Zillow, Realtor.com, and all major platforms",
    "Professional photography with drone",
    "Targeted social media campaign to reach active buyers",
    "Just Listed postcards sent to your neighborhood",
    "Just Listed announcement sent across all my social platforms",
  ];

  const commitments = [
    "I will always give you expert guidance so you can make the best decision for your family.",
    "I will always be honest about your home's price, its condition, and what it takes to get it sold.",
    "I will always give you the truth, even when it is not what you want to hear.",
    "I will always act in your best interest, not mine.",
    "I will always work to ensure you walk away with the most money possible.",
    "I will always use the most effective strategies to market your home.",
    "I will always keep you informed before anything changes.",
    "I will never lock you into a long-term contract.",
  ];

  // Communication focuses on HOW we stay connected — the mechanics, not the promises
  const communicationItems = [
    "Communication on your terms, call, text, or email",
    "Showing feedback within 24 hours when provided by the buyer's agent",
    "Offers reviewed with you before you respond, not after",
    "Regular check-ins throughout the listing, even when there is nothing new to report",
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sellerSchema) }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-[#1A1A18]">
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="section-rule"
                style={{ background: "#B8974A" }}
              />
              <span
                className="font-body text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "#B8974A" }}
              >
                Seller Strategy
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Your Home.<br />
              <em className="italic">Your Decision.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              A clear plan built around your situation, not a sales pitch.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS & TIMELINE */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">01. Process</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              If you decide to sell, here is what that looks like.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              Every step has a purpose. Nothing happens without your input and approval.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <RevealDiv
                key={step.number}
                delay={i * 75}
                className="border-t-2 border-[#B8974A] pt-6"
              >
                <span className="font-display text-sm text-[#B8974A] tracking-widest block mb-3">
                  {step.number}
                </span>
                <h3 className="font-display text-lg font-light text-[#1A1A18] mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                  {step.desc}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTOGRAPHY */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">02. Photography</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              The first showing happens online.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              Before a buyer sets foot in your home, they have already made a judgment from photos. Quality here is not optional.
            </p>
          </RevealDiv>

          <RevealDiv delay={100}>
            <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-3xl">
              {/* Poor example — dark, underlit room */}
              <div className="relative overflow-hidden">
                <div
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
                    alt="Poor quality listing photo — dark and underlit"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.3) saturate(0.4)" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-4">
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/70">
                    Poor Example
                  </span>
                </div>
              </div>

              {/* My example — same room type, bright and well-lit */}
              <div className="relative overflow-hidden">
                <div
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
                    alt="Professional listing photo — bright and well-lit"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(1.15) saturate(1.25) contrast(1.05)" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 py-2 px-4" style={{ background: "rgba(184,151,74,0.85)" }}>
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white">
                    My Example
                  </span>
                </div>
              </div>
            </div>

            <p className="font-body text-sm text-[#1A1A18]/55 mt-6 max-w-md leading-relaxed">
              Homes with professional photography sell 32% faster and attract more competitive offers.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* MARKETING PLAN */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03. Marketing</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              How I get your home in front of buyers.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              Every item below is part of every listing. Nothing is an upgrade.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {marketingItems.map((item, i) => (
              <RevealDiv
                key={i}
                delay={i * 75}
                className="flex items-start gap-4 border-t border-[#1A1A18]/10 pt-5"
              >
                <span className="font-display text-[#B8974A] text-xs tracking-widest mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-sm text-[#1A1A18]/75 leading-relaxed">
                  {item}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">04. Commitments</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              What you can hold me to.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              These are not talking points. They are the standard I hold myself to on every listing.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commitments.map((item, i) => (
              <RevealDiv
                key={i}
                delay={i * 75}
                className="border-l-2 border-[#B8974A] pl-8 py-6 bg-white"
              >
                <p className="font-body text-base text-[#1A1A18]/75 leading-relaxed">
                  {item}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* NO CONTRACT */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="section-rule"
                style={{ background: "#B8974A" }}
              />
              <span
                className="font-body text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "#B8974A" }}
              >
                No Obligation
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 max-w-2xl">
              No lock-in. No long-term contract.
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed max-w-xl">
              I will never lock you into a long-term agreement. If at any point you feel I have not earned your trust, we part ways, no penalties and no hard feelings. You stay in control the entire time.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* COMMUNICATION — how we stay connected during the listing */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05. Communication</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4 max-w-2xl">
              You will always know where things stand.
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-16">
              If something changes, you will hear from me first.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communicationItems.map((item, i) => (
              <RevealDiv
                key={item}
                delay={i * 100}
                className="border-l-2 border-[#B8974A] pl-8 py-6 bg-[#F8F5F0]"
              >
                <p className="font-body text-base text-[#1A1A18]/75 leading-relaxed">
                  {item}
                </p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 md:py-32 bg-[#1A1A18]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealDiv>
              <img
                src={HEADSHOT}
                alt="Mario Manzano"
                className="w-full max-w-sm mx-auto lg:mx-0 object-cover"
                style={{ aspectRatio: "3/4" }}
              />
            </RevealDiv>

            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="section-rule"
                  style={{ background: "#B8974A" }}
                />
                <span
                  className="font-body text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: "#B8974A" }}
                >
                  About
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8">
                Why I do this differently.
              </h2>
              <p className="font-body text-base text-white/70 leading-relaxed">
                I am not just an agent who talks about real estate decisions. I
                have made them with my own money on the line. I have bought and
                sold properties, done live-in flips, and own rentals growing my
                portfolio. That experience is what I bring to this conversation.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">06. Next Steps</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light text-[#1A1A18] mb-10 max-w-2xl">
              If you are ready to move forward, let's go over the next steps.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:5126959255">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Call 512-695-9255
                  <ArrowRight size={14} />
                </span>
              </a>
              <a href="mailto:realtor@mariomanzano.com">
                <span className="btn-luxury inline-flex items-center gap-3">
                  Send an Email
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
          </RevealDiv>
        </div>
      </section>

    </div>
  );
}
