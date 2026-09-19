/*
 * DESIGN: Quiet Luxury Editorial - FSBO Page
 * Route: /sell-your-home
 * Audience: Homeowners selling on their own who have spoken with Mario by phone
 * Goal: Personal follow-up after the call. Useful tips, then what Mario would take off their plate.
 * Sections: Header, Tips, Callout, How I Help, CTA, Strategy Hub line
 * Note: No fee or compensation content on this page by design. The call covers it.
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
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
}

const tips = [
  {
    title: "Price it from what sold, not from what Zillow says",
    body: "Zillow's estimate is a model, not an appraisal. Look at homes that closed nearby in the last few months and compare size, condition, and updates. Price it from there.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Decide how you'll handle the calls before they start",
    body: "Agents and investors will reach out, some about your listing and some with a quick cash offer. Decide ahead of time what you'll say, so you aren't making decisions on the spot.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Prequalify buyers before you schedule a showing",
    body: "Ask for a preapproval letter or proof of funds first. It protects your time, and it keeps your home from being shown to people who can't buy it.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Know your net before you respond to an offer",
    body: "An offer is more than a price. Closing costs, repairs, and the closing date all change what you take home. Run your number first, then decide.",
    link: { href: "/net-sheet", label: "Run your net sheet" },
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Get the paperwork ready before the first showing",
    body: "Texas requires a seller's disclosure for most home sales, and the contract runs on firm deadlines. Have your disclosure done early, and read every date in the contract before you sign.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

const helpSteps = [
  {
    title: "Walk the home and set the price",
    body: "We walk through together and flag what is worth touching up before photos. I pull the recent sales and give you a range with the reasoning behind it, so the final number is your call.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "List it on the MLS with professional photos",
    body: "Your home reaches buyers' agents and shows up on AustinHomeSearch.com, HAR.com, Realtor.com, Zillow, and social media. Professional photos help it stand out before anyone visits.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Showings with buyers who are ready",
    body: "I prequalify buyers before a showing is scheduled, and every visitor leaves with a professional flyer. The calls and scheduling come to me, not you.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Offers, negotiation, and a signed contract",
    body: "I go through every offer with you, including the terms behind the price. Then I negotiate on your behalf and work it to a signed contract.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Inspection, appraisal, and closing",
    body: "I guide you through each deadline until closing day. You get a weekly update the whole way, so you're never left wondering where things stand.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

export default function FSBO() {
  useEffect(() => {
    setPageMeta(
      "Selling Your Home Yourself in Greater Austin | Mario Manzano",
      "Selling your home on your own? Here are a few things worth knowing, and what working with Mario would look like if you want a backup plan. Serving Greater Austin.",
      "https://mariomanzano.com/sell-your-home"
    );
    // Hidden utility page: prevent indexing
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex, nofollow");
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F5F0]">

      {/* HEADER */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#B8974A]">
                For Sale By Owner · Greater Austin
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
              You're selling your<br />
              home yourself.<br />
              <em className="italic">That makes complete sense.</em><br />
              But let me be your Backup Plan.
            </h1>
            <p className="font-body text-base md:text-lg text-white/65 leading-relaxed mb-3 max-w-xl">
              Thanks for taking my call. I'm not here to talk you out of it. Plenty of homeowners sell on their own, and you may be one of them.
            </p>
            <p className="font-body text-base text-white/65 leading-relaxed max-w-xl">
              Here are a few things worth knowing while your home is on the market.
            </p>
            <p className="font-body text-sm text-white/65 leading-relaxed max-w-xl mt-6 pt-6 border-t border-white/15">
              If the calls pile up, an offer gets confusing, or you'd just rather have someone else handle it, I'm here as your backup plan.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* TIPS */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">Five things worth doing</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-4">
              What tends to make a sale<br />
              <em className="italic">go smoothly on your own.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12">
              These are the same things I'd look at on any sale. Take what's useful.
            </p>
          </RevealDiv>

          <div className="flex flex-col gap-8">
            {tips.map((tip, i) => (
              <RevealDiv key={i} delay={i * 60}>
                <div className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "#F5EDD8", color: "#B8974A" }}
                  >
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-[#1A1A18] mb-1 leading-snug">
                      {tip.title}
                    </h3>
                    <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">
                      {tip.body}
                    </p>
                    {tip.link && (
                      <Link href={tip.link.href}>
                        <span className="font-body text-sm text-[#B8974A] underline underline-offset-4 cursor-pointer inline-block mt-2">
                          {tip.link.label}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CALLOUT */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div
              className="rounded-md px-5 py-4 flex flex-col gap-3"
              style={{ background: "#F5EDE0" }}
            >
              <p className="font-body text-sm leading-relaxed" style={{ color: "#7D4A1A" }}>
                <strong style={{ color: "#7D4A1A" }}>On price:</strong> A home priced off an estimate can sit and go stale, or sell for less than it could have. Both are easy to miss without recent sales in front of you.
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#7D4A1A" }}>
                <strong style={{ color: "#7D4A1A" }}>On the contract:</strong> Buyers' agents negotiate for a living, and most sellers do this once. The terms and deadlines are where deals tend to get tangled.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* HOW I HELP */}
      <section className="py-20 md:py-28 bg-white border-y border-[#E8E0D5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">How I help</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-4">
              If you'd rather hand it off,<br />
              <em className="italic">here's what I'd take on.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12">
              You've already done the hard part of deciding to sell. This is what it looks like when someone else handles the rest.
            </p>
          </RevealDiv>

          <div className="flex flex-col gap-8">
            {helpSteps.map((step, i) => (
              <RevealDiv key={i} delay={i * 80}>
                <div className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "#F5EDD8", color: "#B8974A" }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-[#1A1A18] mb-1 leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#B8974A]">
                Let's talk
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-4">
              See if working together<br />
              <em className="italic">makes sense.</em>
            </h2>
            <p className="font-body text-base text-white/65 leading-relaxed mb-8 max-w-lg">
              A quick call is all it takes. I'll walk you through how it works, answer your questions, and be upfront about whether I think I can help. No pressure either way.
            </p>
            <Link href="/contact">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Schedule a Call with Mario
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* STRATEGY HUB LINE */}
      <section className="py-16 md:py-20 border-t border-[#E8E0D5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-3">
              Still weighing your options? The strategy hub has the net sheet, the sell vs rent calculator, and the remodel vs sell calculator in one place.
            </p>
            <Link href="/strategy-hub">
              <span className="font-body text-sm text-[#B8974A] underline underline-offset-4 cursor-pointer">
                Open the strategy hub
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

    </div>
  );
}
