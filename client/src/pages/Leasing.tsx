/*
 * DESIGN: Quiet Luxury Editorial - Leasing Page
 * Route: /lease-your-home
 * Audience: Homeowners who have listed their property for rent on their own
 * Goal: Educate, build trust, and offer leasing-only service
 * Sections: Header, What Separates Rentals, MLS Exposure Table,
 *           How I Handle It, Fee Block, CTA, What If Renting Isn't Right
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

const points = [
  {
    title: "Pricing it against what actually closed nearby",
    body: "Zillow's rent estimate is a model, not a market read. I compare recent leased comps with current competition to help price your property correctly.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Presentation matters more than most owners think",
    body: "A deep clean and minor touch-ups can make a big difference in how your property shows and how quickly it rents. If you need help getting it ready, I can connect you with trusted local contractors.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Photography most owners skip",
    body: "Many owners use phone photos. Professional photography helps your rental stand out and can generate more interest and showings.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Showings and phone calls add up fast",
    body: "The calls and messages are probably already coming in. Inquiries, no-shows, scheduling, questions, I handle all of it so you don't have to.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Screening before you fall in love with an applicant",
    body: "A good phone conversation isn't enough. Income, credit, and rental history give you a better picture of who you're handing your keys to.",
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
    title: "A lease that actually protects you",
    body: "Free online templates can miss important provisions, disclosures, or terms specific to your rental. A lease that protects you is more than one that simply sounds official.",
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

const processSteps = [
  {
    title: "Walk through the property and prep it",
    body: "We walk through together and flag what to clean, move, or touch up before your next showing or before professional photos go up.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Price it against what actually closed",
    body: "I compare recent leased comps with current competition so your property hits the market at the right number.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "List it on the MLS with professional photos",
    body: "Your property gets in front of tenant agents and is syndicated across AustinHomeSearch.com, HAR.com, Realtor.com, Apartments.com Network, ListHub and social media platforms. Professional photography included.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "A property flyer for every showing",
    body: "I put together a professional flyer with photos, key details, and any upgrades you want to highlight. Visitors leave with something in hand that helps your property stay top of mind after they've seen a few others.",
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
    title: "Screen applicants and get to a signed lease",
    body: "I handle inquiries, showings, applicant screening, and help you through the final decision. Once the lease is signed, my job is done.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function Leasing() {
  useEffect(() => {
    setPageMeta(
      "Lease Your Home in Cedar Park & Leander | Mario Manzano",
      "Already listing your property for rent? Mario handles the leasing piece. MLS listing, professional photos, screening, and a signed lease. One flat fee. No property management.",
      "https://mariomanzano.com/lease-your-home"
    );
    // Hidden utility page — prevent indexing
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
      <section className="py-20 md:py-28 border-b border-[#E8E0D5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#B8974A]">
                For Rent By Owner · Cedar Park & Leander
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] leading-[1.1] mb-6">
              You listed your property<br />
              for rent.<br />
              <em className="italic">That makes complete sense.</em><br />
              But let me be your Backup Plan.
            </h1>
            <p className="font-body text-base md:text-lg text-[#1A1A18]/65 leading-relaxed mb-3 max-w-xl">
              You may be testing the market, trying to avoid a management company, or simply want to handle it yourself. You can. And you probably have no problem doing that.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-xl">
              Either way, here are a few things worth knowing while your listing is active.
            </p>
            <p className="font-body text-sm text-[#1A1A18]/50 leading-relaxed max-w-xl mt-6 pt-6 border-t border-[#E8E0D5]">
              If at some point the calls start piling up, an applicant doesn't check out, or you'd just rather have someone else handle it, I'm available as your backup plan. No property management, just the leasing piece from start to finish.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* WHAT SEPARATES RENTALS */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">What actually makes or breaks a rental listing</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-4">
              What separates rentals that move<br />
              <em className="italic">from ones that sit.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-2">
              I put these together for owners handling their own rental. These are the same things I look at on every rental I take on. Take what's useful.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12">
              Getting a tenant in isn't the hard part. Getting the right tenant in quickly, without it taking over your life, is where things get complicated.
            </p>
          </RevealDiv>

          <div className="flex flex-col gap-8">
            {points.map((point, i) => (
              <RevealDiv key={i} delay={i * 60}>
                <div className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "#F5EDD8", color: "#B8974A" }}
                  >
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-[#1A1A18] mb-1 leading-snug">
                      {point.title}
                    </h3>
                    <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">
                      {point.body}
                    </p>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* MLS EXPOSURE */}
      <section className="py-20 md:py-28 bg-white border-y border-[#E8E0D5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">Exposure</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-4">
              Where your listing lives matters<br />
              <em className="italic">more than most people realize.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
              When you list on your own, you're reaching whoever happens to find your post. When I list your property, I put it on all of these platforms at once and make it searchable by every tenant's agent actively working the area. That's a different level of reach.
            </p>
          </RevealDiv>

          <RevealDiv delay={100}>
            {/* Comparison table */}
            <div className="border border-[#E8E0D5] rounded-md overflow-hidden mb-6">
              <div className="bg-[#F8F5F0] px-5 py-3 border-b border-[#E8E0D5]">
                <span className="font-body text-[10px] font-semibold tracking-[0.09em] uppercase text-[#1A1A18]/50">
                  Reach comparison
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[#E8E0D5]">
                  <p className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase text-[#A05030] mb-4">
                    Listed on your own
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "Limited to whichever platform you post on",
                      "Only renters who happen to find your listing",
                      "No agent-to-agent exposure",
                      "You handle every inquiry yourself",
                    ].map((item, i) => (
                      <li key={i} className="font-body text-sm text-[#1A1A18]/60 leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#1A1A18]/30">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 md:p-6">
                  <p className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase text-[#B8974A] mb-4">
                    Listed through the MLS
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "AustinHomeSearch.com, HAR.com, Realtor.com, Apartments.com Network, ListHub, Zillow, and social media platforms.",
                      "Searchable by every tenant's agent actively working the area",
                      "More platforms and more opportunities for renters to see the property",
                      "Inquiries come through your agent, not directly to you",
                      "More exposure and less time sitting vacant",
                    ].map((item, i) => (
                      <li key={i} className="font-body text-sm text-[#1A1A18]/60 leading-relaxed pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-[#B8974A] before:text-xs">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Vacancy + wrong tenant caution */}
            <div
              className="rounded-md px-5 py-4 flex flex-col gap-3"
              style={{ background: "#F5EDE0" }}
            >
              <p className="font-body text-sm leading-relaxed" style={{ color: "#7D4A1A" }}>
                <strong style={{ color: "#7D4A1A" }}>On vacancy:</strong> With rents where they are in Leander and Cedar Park, every month a property sits empty can cost a landlord between $1,600 and $3,000 in lost rent. Better marketing and wider reach can help reduce the time your property sits vacant.
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#7D4A1A" }}>
                <strong style={{ color: "#7D4A1A" }}>On the wrong tenant:</strong> Evictions in Texas average several months and thousands in lost rent and legal fees. Screening properly from the start is how you're more likely to avoid that.
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* HOW I HANDLE IT */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">How I handle it</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-4">
              Not a property manager.<br />
              <em className="italic">Just the leasing piece, done right.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12">
              You keep managing the property. I handle the front end: preparing, marketing, finding the tenant, coordinating showings, screening applicants, and getting the lease signed.
            </p>
          </RevealDiv>

          <div className="flex flex-col gap-8">
            {processSteps.map((step, i) => (
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

          {/* FEE BLOCK */}
          <RevealDiv delay={200} className="mt-12">
            <div className="border border-[#E8E0D5] rounded-md overflow-hidden">
              <div className="bg-[#1A1A18] px-5 py-3">
                <span className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase text-white/70">
                  One-Time Leasing Fee
                </span>
              </div>
              <div className="p-6" style={{ background: "#F5EDD8" }}>
                <div className="flex gap-10 mb-5 flex-wrap">
                  <div>
                    <p className="font-display text-4xl font-light text-[#B8974A] leading-none mb-1">80%</p>
                    <p className="font-body text-xs text-[#1A1A18]/50 tracking-wide">of one month's rent</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-light text-[#B8974A] leading-none mb-1">$0</p>
                    <p className="font-body text-xs text-[#1A1A18]/50 tracking-wide">upfront</p>
                  </div>
                </div>
                <div className="border-t border-[#E8D8B8] mb-4" />
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed mb-4">
                  Some leasing services charge 100% of one month's rent, while others bundle leasing with ongoing management. I keep it simple: 80% of one month's rent, one time. You keep managing the property after the lease is signed.
                </p>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed mb-2">
                  Professional photography, a property flyer with your upgrade list, MLS listing, marketing, showings, applicant screening, and leasing signing are all included.
                </p>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">
                  The first month's rent can be used to cover the leasing fee. No monthly management fee.
                </p>
              </div>
            </div>
          </RevealDiv>
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
              A quick call is all it takes. I'll listen to where you are, answer any questions you have, and be upfront about whether I think I can actually help. No pressure either way.
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

      {/* WHAT IF RENTING ISN'T RIGHT */}
      <section className="py-20 md:py-28 border-t border-[#E8E0D5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">Before you decide</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-4">
              What if renting isn't<br />
              <em className="italic">the best option?</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
              Before committing to another tenant, it may be worth comparing the numbers. I can help you look at what the property could rent for, what it could sell for, your estimated net proceeds, and what your options look like if you keep it as an investment.
            </p>
            <p className="font-display text-2xl font-light text-[#B8974A] mb-4">
              Rent. Sell. Remodel. Hold.
            </p>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
              You don't have to decide today. You just need to know the numbers.
            </p>
            <Link href="/homeowner-guide">
              <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                See All Your Options
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

    </div>
  );
}
