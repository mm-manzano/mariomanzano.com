/*
 * DESIGN: Quiet Luxury Editorial, Expired Listing Page
 * Route: /relaunch-your-home
 * Audience: Homeowners whose listing expired without selling. Works whether
 *           Mario reached them by phone or not.
 * Goal: Diagnose what commonly stalls a listing, give useful questions to ask
 *       before relisting with anyone, then show how Mario approaches it.
 * Sections: Header, What Stalls a Listing, Before You Relist, Callout + Rent
 *           or Hold, How I Help, No Lock-In, CTA
 * Page ends on the CTA by design, no exits after the ask.
 * Note: No fee or compensation content on this page by design.
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

type Item = {
  title: string;
  body: string;
  link?: { href: string; label: string };
  icon: React.ReactNode;
};

const svgProps = {
  viewBox: "0 0 24 24",
  className: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons = {
  pulse: (
    <svg {...svgProps}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
  ),
  eye: (
    <svg {...svgProps}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  image: (
    <svg {...svgProps}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
  ),
  home: (
    <svg {...svgProps}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  ),
  compass: (
    <svg {...svgProps}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
  ),
  key: (
    <svg {...svgProps}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>
  ),
  clipboard: (
    <svg {...svgProps}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
  ),
  refresh: (
    <svg {...svgProps}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
  ),
  calendar: (
    <svg {...svgProps}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
  ),
  user: (
    <svg {...svgProps}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  dollar: (
    <svg {...svgProps}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
  ),
  search: (
    <svg {...svgProps}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  ),
  mail: (
    <svg {...svgProps}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
  ),
  document: (
    <svg {...svgProps}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
  ),
};

const stallReasons: Item[] = [
  {
    title: "Price",
    body: "Lots of showings and no offers, or offers well below asking, usually means buyers liked the home but not at that number. Price also determines which buyers see it, so even a small gap can change who you're competing against.",
    icon: icons.pulse,
  },
  {
    title: "Exposure",
    body: "Few showings early on can be a sign that the listing wasn't reaching enough buyers, or wasn't showing up where they were looking. The price range buyers are searching in, the photos, and the first few lines of the description all play a part.",
    icon: icons.eye,
  },
  {
    title: "Marketing and presentation",
    body: "Buyers make quick decisions while scrolling. The photos, the order they're in, and how the home is described set the first impression. Then the showing has to live up to it. Clutter, dark rooms, and small things left undone can undo a great listing in the first few minutes inside.",
    icon: icons.image,
  },
  {
    title: "Condition",
    body: "If feedback kept pointing to updates, repairs, or one specific room, buyers were probably pricing that work into what they were willing to pay. Sometimes the fix is worth doing. Sometimes a price adjustment makes more sense. It comes down to the numbers.",
    icon: icons.home,
  },
  {
    title: "Strategy",
    body: "Sometimes the house wasn't the issue. It was the plan behind the listing. Was there a clear reason behind the price, a strategy for the launch, and a backup plan for what would change if buyers weren't responding?",
    icon: icons.compass,
  },
  {
    title: "Behind the scenes",
    body: "Some of what affects a listing happens where sellers can't see it. When buyers' agents reached out, did they hear back quickly and get clear answers? How easy was it to book a showing and get into the house? A missed showing, a slow response, or a difficult process can cost you a buyer you never hear about.",
    icon: icons.key,
  },
];

const tips: Item[] = [
  {
    title: "Ask for the showing count and feedback from your last listing",
    body: "If you don't have it, your previous agent can usually pull it. It gives you a much better picture of how buyers were responding to the home.",
    icon: icons.clipboard,
  },
  {
    title: "Ask what specifically changes this time",
    body: "New photos, new price, new prep, a different launch? If the answer is mostly the same plan with a different sign in the yard, expect a similar result.",
    icon: icons.refresh,
  },
  {
    title: "Ask how the price will be set, and when it would be revisited",
    body: "A good plan has a starting number with reasoning behind it, plus a clear point where you'll evaluate it again. Agree on that before listing, not after weeks of quiet.",
    icon: icons.pulse,
  },
  {
    title: "Ask what happens before the home goes live",
    body: "A lot of the attention a listing gets happens early. When are photos taken? Who reviews the listing before it goes public? How will showings be scheduled, and how often will you get updates? Clear answers usually mean there's a real plan behind them.",
    icon: icons.calendar,
  },
  {
    title: "Choose the agent, not the brokerage",
    body: "A brokerage name doesn't tell you much about the agent. The same company can have great agents and not so great ones. If a brokerage name brings back a bad experience, judge the agent in front of you by their plan, not the company they work under.",
    icon: icons.user,
  },
  {
    title: "Know your net before you pick a number",
    body: "Your price is only part of it. Closing costs, repairs, and your payoff all change what you walk away with.",
    link: { href: "/net-sheet", label: "Run your net sheet" },
    icon: icons.dollar,
  },
];

const helpSteps: Item[] = [
  {
    title: "Review what happened the first time",
    body: "We go through the old listing together, the photos, the description, the price history, the showing activity, and any feedback. That tells us what to keep and what to change.",
    icon: icons.search,
  },
  {
    title: "Reset the price with reasoning behind it",
    body: "I look at what's changed since you first listed and where your home fits in today's market. You get a range with the reasoning behind it, and the final number is your call. How I get there goes well beyond pulling comps, and that's something I'd rather show you in person than explain here.",
    icon: icons.pulse,
  },
  {
    title: "Prep the home for a fresh start",
    body: "We walk the home and flag what's worth fixing and what isn't. If something needs work, I can connect you with trusted local contractors. Once the home is ready, we bring in professional photography.",
    icon: icons.home,
  },
  {
    title: "A relaunch, not a repost",
    body: "Your home goes back on the MLS and shows up on AustinHomeSearch.com, HAR.com, Realtor.com, Zillow, and many other home search sites, plus social media. How it's positioned and presented this time matters just as much, and that's where the relaunch strategy comes in.",
    icon: icons.image,
  },
  {
    title: "Weekly updates and honest feedback",
    body: "You get a weekly update on activity and showing feedback. If something isn't working, I'll tell you, along with what I'd change.",
    icon: icons.mail,
  },
  {
    title: "Offers through closing",
    body: "I go through every offer with you, negotiate on your behalf, and guide you through inspection, appraisal, and every deadline until closing day.",
    icon: icons.document,
  },
];

function ItemList({ items, step = 60 }: { items: Item[]; step?: number }) {
  return (
    <div className="flex flex-col gap-8">
      {items.map((item, i) => (
        <RevealDiv key={i} delay={i * step}>
          <div className="flex gap-4 items-start">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: "#F5EDD8", color: "#B8974A" }}
            >
              {item.icon}
            </div>
            <div>
              <h3 className="font-body text-sm font-semibold text-[#1A1A18] mb-1 leading-snug">
                {item.title}
              </h3>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed">
                {item.body}
              </p>
              {item.link && (
                <Link href={item.link.href}>
                  <span className="font-body text-sm text-[#B8974A] underline underline-offset-4 cursor-pointer inline-block mt-2">
                    {item.link.label}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </RevealDiv>
      ))}
    </div>
  );
}

export default function Expired() {
  useEffect(() => {
    setPageMeta(
      "Relisting Your Home in Greater Austin | Mario Manzano",
      "Your listing expired. Before relisting, here's what commonly stalls a home, what to ask any agent, and how Mario approaches a relaunch. Serving Greater Austin.",
      "https://mariomanzano.com/relaunch-your-home"
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
                Relisting Your Home · Greater Austin
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
              Your listing expired.<br />
              Stepping back before relisting<br />
              <em className="italic">makes complete sense.</em><br />
              Let me give you a second opinion.
            </h1>
            <p className="font-body text-base md:text-lg text-white/65 leading-relaxed mb-3 max-w-xl">
              If your listing just came off the market, your phone has probably been busy with agents reaching out. I may have been one of them, so I'll keep this useful.
            </p>
            <p className="font-body text-base md:text-lg text-white/65 leading-relaxed mb-3 max-w-xl">
              I'm not going to tell you your last agent did a bad job. I don't know that, and it isn't really the point. Homes don't sell for a handful of reasons, and there's usually something we can learn from what happened the first time.
            </p>
            <p className="font-body text-base text-white/65 leading-relaxed max-w-xl">
              Here's what I'd look at first, and a few things worth knowing whether you relist with me or anyone else.
            </p>
            <p className="font-body text-sm text-white/65 leading-relaxed max-w-xl mt-6 pt-6 border-t border-white/15">
              And if selling isn't the right move right now, I'll tell you that too.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* WHAT STALLS A LISTING */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">What usually stalls a listing</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-4">
              A lot of stalled listings<br />
              <em className="italic">come down to a few things.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12">
              Usually it isn't one big mistake. It's a few small things that stack up. See which of these sounds familiar.
            </p>
          </RevealDiv>
          <ItemList items={stallReasons} />
        </div>
      </section>

      {/* BEFORE YOU RELIST */}
      <section className="py-20 md:py-28 bg-white border-y border-[#E8E0D5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">Before you relist</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-4">
              Questions to ask before you relist,<br />
              <em className="italic">with anyone, including me.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12">
              Relisting with a new agent won't change much by itself. What matters is what's different this time. These are worth asking anyone you talk to.
            </p>
          </RevealDiv>
          <ItemList items={tips} />
        </div>
      </section>

      {/* CALLOUT + RENT OR HOLD */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div
              className="rounded-md px-5 py-4 flex flex-col gap-3"
              style={{ background: "#F5EDE0" }}
            >
              <p className="font-body text-sm leading-relaxed" style={{ color: "#7D4A1A" }}>
                <strong style={{ color: "#7D4A1A" }}>On listing history:</strong> Buyers and their agents can see how long a home was on the market and any past price changes. As of September 2026, the Austin area MLS resets that day count once a home has been off the market for 30 days, down from 90. A short pause before relisting can help, as long as the relaunch looks and feels different, not just reappears.
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#7D4A1A" }}>
                <strong style={{ color: "#7D4A1A" }}>On price reductions:</strong> Repeatedly lowering the price in small steps can end up costing more than getting the price right from the start.
              </p>
            </div>
          </RevealDiv>

          <RevealDiv className="mt-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="section-number">Before you decide</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18] mb-4">
              What if selling isn't<br />
              <em className="italic">the best move right now?</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
              I've owned rentals myself, so I ask this question when it makes sense. Depending on your mortgage, what the home could rent for, and your plans, keeping it might make more sense than selling. Or it might not. Either way, it's worth running the numbers before you decide.
            </p>
            <Link href="/sell-vs-rent">
              <span className="font-body text-sm text-[#B8974A] underline underline-offset-4 cursor-pointer">
                Compare selling vs renting
              </span>
            </Link>
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
              Before I suggest anything,<br />
              <em className="italic">I want to know what happened.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12">
              A relaunch starts with understanding the first listing. Then we build from there.
            </p>
          </RevealDiv>
          <ItemList items={helpSteps} step={80} />
        </div>
      </section>

      {/* NO LOCK-IN */}
      <section className="py-16 md:py-20">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="rounded-md border border-[#B8974A] px-6 py-8 md:px-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="section-rule" style={{ background: "#B8974A" }} />
                <span className="section-number">No lock-in</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-[#1A1A18] mb-4">
                If it isn't working,<br />
                <em className="italic">you're not stuck.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                A listing agreement shouldn't feel like a trap. If you list with me and you're not happy with how things are going, you can walk away. We'll go through exactly how that works when we meet.
              </p>
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
              Bring your questions.<br />
              <em className="italic">I'll bring the plan.</em>
            </h2>
            <p className="font-body text-base text-white/65 leading-relaxed mb-4 max-w-lg">
              If you'd like a second opinion, I'm happy to come by and walk you through what I'd do differently. If we already have a time set, bring any showing feedback, offers you received, and anything your last agent told you about why the home didn't sell. The more I know going in, the more useful our meeting will be.
            </p>
            <p className="font-body text-base text-white/65 leading-relaxed mb-8 max-w-lg">
              Whether you hire me or not, you should leave with a clearer picture of what happened, what I'd change, and what your options are. And if it's not for you, feel free to kick me out.
            </p>
            <Link href="/contact">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
                Set Up a Time to Meet
                <ArrowRight size={14} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

    </div>
  );
}
