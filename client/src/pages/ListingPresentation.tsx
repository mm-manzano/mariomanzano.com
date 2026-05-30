/*
 * DESIGN: Quiet Luxury Editorial - Listing Presentation
 * Private route: /listing-presentation
 * Sections: Hero, Process & Timeline, Communication, About, Next Steps
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

const HEADSHOT =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg";

export default function ListingPresentation() {
  useEffect(() => {
    document.title = "Seller Strategy | Mario Manzano";
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${name}"]`
      ) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("robots", "noindex, nofollow");
  }, []);

  const processSteps = [
    {
      number: "01",
      title: "Preparation",
      desc: "Walkthrough, prep list, repairs, and staging guidance.",
    },
    {
      number: "02",
      title: "Photography & Marketing",
      desc: "Professional photography with drone and listing copy.",
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

  const communicationItems = [
    "Communication based on your preference",
    "Feedback after showings when provided",
    "Immediate updates on official offers",
    "Clear guidance before decisions",
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F0]">

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

      {/* COMMUNICATION */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">02. Communication</span>
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
              <p className="font-body text-base text-white/70 leading-relaxed mb-8">
                I am not just an agent who talks about real estate decisions. I
                have made them with my own money on the line. I have bought and
                sold properties, ran an Airbnb, done live-in flips, own rentals
                growing my portfolio. That experience is what I bring to this
                conversation.
              </p>
              <div className="border-l-2 border-[#B8974A] pl-6 space-y-2">
                <p className="font-body text-sm text-white/50">
                  512-695-9255
                </p>
                <p className="font-body text-sm text-white/50">
                  realtor@mariomanzano.com
                </p>
              </div>
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
              <span className="section-number">03. Next Steps</span>
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
