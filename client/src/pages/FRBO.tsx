/*
 * DESIGN: Quiet Luxury Editorial - Leasing Page
 * Route: /lease-your-home
 * Audience: Homeowners who have listed their property for rent on their own.
 *           Works whether Mario reached them by phone or not.
 * Goal: Educate, build trust, and offer leasing-only service
 * Sections: Header, What Separates Rentals, MLS Exposure Table + Vacancy
 *           Calculator, How I Handle It (timeline), Fee Block,
 *           What If Renting Isn't Right, CTA
 * Page ends on the CTA by design, no exits after the ask.
 */

import { useEffect, useRef, useState, useMemo, useLayoutEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Above the fold: show right away with no fade, so the top of the page is never blank
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible", "no-fade");
      return;
    }
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
  setMeta("og:image", "https://mariomanzano.com/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);
}

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function VacancyCalculator() {
  const [rent, setRent] = useState(1800);
  const [months, setMonths] = useState(1);

  const { expected, actual, effective, lost } = useMemo(() => {
    const expectedAnnual = rent * 12;
    const actualAnnual = rent * (12 - months);
    const effectiveMonthly = actualAnnual / 12;
    return {
      expected: expectedAnnual,
      actual: actualAnnual,
      effective: effectiveMonthly,
      lost: expectedAnnual - actualAnnual,
    };
  }, [rent, months]);

  return (
    <div className="rounded-md border border-[#E5E5E5] bg-white p-6 md:p-8">
      <p className="font-body text-sm font-semibold tracking-[0.1em] uppercase text-[#7A5F24] mb-5">
        See what vacancy actually costs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="font-body text-sm text-[#2B2B2B] block mb-2">
            Monthly rent
          </label>
          <div className="flex items-center gap-2">
            <span className="font-body text-lg font-semibold text-[#1A1A1A]">$</span>
            <input
              type="number"
              min={0}
              step={50}
              value={rent}
              onChange={(e) => setRent(Math.max(0, Number(e.target.value) || 0))}
              className="font-body text-lg font-semibold w-full border border-[#767676] rounded px-3 py-2 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] focus:shadow-[0_0_0_1px_#1A1A1A]"
            />
          </div>
        </div>

        <div>
          <label className="font-body text-sm text-[#2B2B2B] block mb-2">
            Months vacant: <span className="font-semibold text-[#1A1A18]">{months}</span>
          </label>
          <input
            type="range"
            min={0}
            max={6}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full range-visible mt-3"
          />
          <div className="flex justify-between font-body text-lg text-[#2B2B2B] mt-1">
            <span>0</span>
            <span>6 months</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E5E5] pt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <p className="font-body text-lg text-[#2B2B2B] mb-1">A full year at this rent</p>
          <p className="font-body text-2xl font-semibold text-[#1A1A18]">{formatMoney(expected)}</p>
        </div>
        <div>
          <p className="font-body text-lg text-[#2B2B2B] mb-1">What you'd actually collect</p>
          <p className="font-body text-2xl font-semibold text-[#1A1A18]">{formatMoney(actual)}</p>
        </div>
        <div>
          <p className="font-body text-lg text-[#2B2B2B] mb-1">Your real monthly rent for the year</p>
          <p className="font-body text-2xl font-semibold text-[#A05030]">{formatMoney(effective)}</p>
        </div>
      </div>

      {months > 0 && (
        <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mt-5 pt-5 border-t border-[#E5E5E5]">
          {months} {months === 1 ? "month" : "months"} vacant on a {formatMoney(rent)} rent means {formatMoney(lost)} in rent you don't get back. Spread across the year, your {formatMoney(rent)} rent is really acting like {formatMoney(effective)} a month.
        </p>
      )}
    </div>
  );
}

const points = [
  {
    title: "Pricing it against the market, not an estimate",
    body: "Wherever your rent number came from, it's worth checking against what's actually happening nearby. Pricing is part numbers and part feel, and a few hundred dollars either way changes how fast it rents. Recent leases get you close, but what you're competing against right now, the condition of the home, and timing all move the final number, and that part takes judgment.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Presentation and photos matter more than most owners think",
    body: "A deep clean, minor touch-ups, and real photography change how your property shows and how quickly it rents. Many owners use phone photos, but professional photography helps a listing stand out before anyone ever sets foot inside. If you need help getting it ready, I can connect you with trusted local contractors.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Showings and phone calls add up fast",
    body: "A lot of inquiries won't turn into real applicants. Ask a few quick questions before scheduling, like their move in date, whether they meet your income requirements, and if they have pets. Then group showings into set time blocks so one listing doesn't take over your week.",
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
    title: "Document the move-in condition before they get the keys",
    body: "Photos or a simple checklist at move-in protect you if there's a dispute over the deposit later. It takes a few minutes, and it's one of the first things self-managing landlords skip.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
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
    title: "Prepare and price the property",
    body: "We walk through together and flag what to clean, move, or touch up before photos go up. Then I look at what you're actually competing against right now, how your home compares on condition and finishes, and how fast similar homes are moving at different prices. You get a rent range with the reasoning behind it, and the final number is your call.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Launch on the MLS",
    body: "Your property goes out through the MLS and shows up on AustinHomeSearch.com, HAR.com, Realtor.com, Apartments.com, Zillow, and many other rental sites, plus social media, with professional photos and a flyer covering the details and any upgrades.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Showings and screening",
    body: "I coordinate every showing and pre-screen applicants before anyone walks through, so you're not opening the door to people who aren't a good fit. For anyone who meets your requirements, I help coordinate income, credit, and rental history checks.",
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
    title: "You decide, I handle the rest",
    body: "You get the full picture on each applicant, and the final call is yours. Once you've chosen, I help work through any requests on terms, like move in timing or lease length, before anything's signed.",
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
    title: "Lease signed",
    body: "Once the lease is signed, my job is done.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

const labelLight = "font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]";
const labelDark = "font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A85C]";

export default function Leasing() {
  useEffect(() => {
    setPageMeta(
      "Lease Your Home in Greater Austin | Mario Manzano",
      "Listing your rental yourself? Mario handles the leasing: MLS listing, photos, screening, and a signed lease. One flat fee. No property management.",
      "https://mariomanzano.com/lease-your-home/"
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
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className={labelDark}>
                For Rent By Owner · Greater Austin
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-6">
              You listed your property<br />
              for rent.<br />
              <span className="font-semibold">That makes complete sense.</span><br />
              But let me be your Backup Plan.
            </h1>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-3 max-w-xl">
              You may be testing the market, trying to avoid a management company, or simply want to handle it yourself. You can. And you probably have no problem doing that.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed max-w-xl">
              Either way, here are a few things worth knowing while your listing is active.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed max-w-xl mt-6 pt-6 border-t border-white/15">
              I've been a landlord myself for years. I know what it takes to find a good tenant, and I know why you'd want to handle it yourself. If at some point you'd rather hand that part off, I'm available as your backup plan. No property management, just the leasing side from start to finish.
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
              <span className={labelLight}>What actually makes or breaks a rental listing</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] mb-4">
              What separates rentals that move<br />
              <span className="font-semibold">from ones that sit.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-2">
              I put these together for owners handling their own rental. These are the same things I look at on my own rentals. Take what's useful.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
              Getting a tenant in isn't the hard part. Getting the right tenant in quickly, without it taking over your life, is where things get complicated.
            </p>
          </RevealDiv>

          <div className="flex flex-col gap-8">
            {points.map((point, i) => (
              <RevealDiv key={i} delay={i * 60}>
                <div className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "#F0F0F0", color: "#B8974A" }}
                  >
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-lg font-semibold text-[#1A1A18] mb-1 leading-snug">
                      {point.title}
                    </h3>
                    <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
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
      <section className="py-20 md:py-28 bg-white border-y border-[#E5E5E5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className={labelLight}>What changes when I list it</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] mb-4">
              Where your listing lives matters<br />
              <span className="font-semibold">more than most people realize.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-8">
              When you list on your own, you're reaching whoever happens to find your post. When I list your property, it goes out through the MLS where tenant agents can find it, backed by professional photos and a flyer, and I handle the calls and the screening so you're not doing all of that on top of everything else.
            </p>
          </RevealDiv>

          <RevealDiv delay={100}>
            {/* Comparison table */}
            <div className="border border-[#E5E5E5] rounded-md overflow-hidden mb-6">
              <div className="bg-white px-5 py-3 border-b border-[#E5E5E5]">
                <span className="font-body text-sm font-semibold tracking-[0.09em] uppercase text-[#2B2B2B]">
                  Reach comparison
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[#E5E5E5]">
                  <p className="font-body text-sm font-semibold tracking-[0.1em] uppercase text-[#A05030] mb-4">
                    Listed on your own
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "Limited to whichever platform you post on",
                      "Only renters who happen to find your listing",
                      "No agent-to-agent exposure",
                      "You handle every inquiry yourself",
                    ].map((item, i) => (
                      <li key={i} className="font-body text-lg text-[#2B2B2B] leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#2B2B2B]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 md:p-6">
                  <p className="font-body text-sm font-semibold tracking-[0.1em] uppercase text-[#7A5F24] mb-4">
                    Listed through the MLS
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "AustinHomeSearch.com, HAR.com, Realtor.com, Apartments.com, Zillow, and many other rental sites",
                      "Searchable by tenant agents working the area",
                      "Professional photos and a flyer included",
                      "Inquiries and showings come through me, not directly to you",
                      "You step back while someone else handles the calls and showings",
                    ].map((item, i) => (
                      <li key={i} className="font-body text-lg text-[#2B2B2B] leading-relaxed pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-[#B8974A] before:text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealDiv>

          <RevealDiv delay={150} className="mt-10">
            <VacancyCalculator />
          </RevealDiv>

          <RevealDiv delay={200} className="mt-6">
            <div
              className="rounded-md px-5 py-4"
              style={{ background: "#F2F2F2" }}
            >
              <p className="font-body text-lg leading-relaxed" style={{ color: "#1A1A18" }}>
                <strong style={{ color: "#1A1A18" }}>On the wrong tenant:</strong> Late payments, damage, and early move outs can cost far more than a few extra weeks of searching. Screening properly from the start is the best way to avoid them.
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
              <span className={labelLight}>How I handle it</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] mb-4">
              Not a property manager.<br />
              <span className="font-semibold">Just the leasing piece, done right.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
              You keep managing the property day to day. I handle getting it rented, priced right, marketed, and screened, and I keep you in the loop the whole way, while you stay in control of who you choose.
            </p>
          </RevealDiv>

          <div className="flex flex-col gap-8">
            {processSteps.map((step, i) => (
              <RevealDiv key={i} delay={i * 80}>
                <div className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "#F0F0F0", color: "#B8974A" }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-lg font-semibold text-[#1A1A18] mb-1 leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>

          {/* FEE BLOCK */}
          <RevealDiv delay={200} className="mt-12">
            <div className="border border-[#E5E5E5] rounded-md overflow-hidden">
              <div className="bg-[#1A1A18] px-5 py-3">
                <span className="font-body text-sm font-semibold tracking-[0.12em] uppercase text-white/90">
                  One-Time Leasing Fee
                </span>
              </div>
              <div className="p-6" style={{ background: "#F2F2F2" }}>
                <div className="flex gap-10 mb-5 flex-wrap">
                  <div>
                    <p className="font-display text-4xl font-medium text-[#7A5F24] leading-none mb-1">100%</p>
                    <p className="font-body text-lg text-[#2B2B2B] tracking-wide">of one month's rent</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-medium text-[#7A5F24] leading-none mb-1">$0</p>
                    <p className="font-body text-lg text-[#2B2B2B] tracking-wide">upfront</p>
                  </div>
                </div>
                <div className="border-t border-[#E5E5E5] mb-4" />
                <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
                  Some leasing services bundle leasing with ongoing management. I keep it simple: 100% of one month's rent, one time. You keep managing the property after the lease is signed.
                </p>
                <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-2">
                  Professional photography, a property flyer with your upgrade list, MLS listing, marketing, showings, applicant screening, and lease signing are all included.
                </p>
                <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                  The first month's rent can be used to cover the leasing fee. No monthly management fee.
                </p>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* WHAT IF RENTING ISN'T RIGHT */}
      <section className="py-20 md:py-28 border-t border-[#E5E5E5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className={labelLight}>Before you decide</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] mb-4">
              What if renting isn't<br />
              <span className="font-semibold">the best option?</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              Before committing to another tenant, it may be worth comparing the numbers. I can help you look at what the property could rent for, what it could sell for, your estimated net proceeds, and what your options look like if you keep it as an investment.
            </p>
            <p className="font-display text-2xl font-medium text-[#7A5F24] mb-4">
              Rent. Sell. Remodel. Hold.
            </p>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-8">
              You don't have to decide today. You just need to know the numbers.
            </p>
            <Link href="/homeowner-guide/">
              <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                See All Your Options
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#1A1A18] text-white">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#B8974A" }} />
              <span className={labelDark}>
                Let's talk
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-4">
              See if working together<br />
              <span className="font-semibold">makes sense.</span>
            </h2>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-8 max-w-lg">
              A quick call is all it takes. I'll listen to where you are, walk you through how I'd approach pricing your property, and be upfront about whether I think I can actually help. If we already have a time set, bring anything you have so far, like your current listing, offers, or questions from applicants. No pressure either way.
            </p>
            <Link href="/contact/">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] inline-flex items-center gap-3 cursor-pointer">
                Schedule a Call with Mario
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

    </div>
  );
}
