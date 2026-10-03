/*
 * DESIGN: Quiet Luxury Editorial, Expired Listing Page (A1 readability style)
 * Route: /relaunch-your-home
 * Audience: Homeowners whose listing expired without selling. Works whether
 *           Mario reached them by phone or not.
 * Goal: Diagnose what commonly stalls a listing, give useful questions to ask
 *       before relisting with anyone, then show how Mario approaches it.
 * Sections: Header, What Stalls a Listing, Before You Relist, Callout + Rent
 *           or Hold, How I Help, No Lock-In, CTA
 * Page ends on the CTA by design, no exits after the ask.
 * Note: No fee or compensation content on this page by design.
 * Style: Black hero and CTA, pure white body, neutral grey callout and icon
 *        circles, no cream or warm tones. Body text 18px, no thin or italic
 *        headlines. Gold limited to rules, labels, icons, links, and button.
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
  setMeta("og:image", "https://mariomanzano.com/images/mario-manzano-austin-realtor-professional-headshot.JPG", true);
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
    title: "Preparation",
    body: "A home shows better when it's ready before it's seen. Cleaning, decluttering, repairs, and staging all shape that first impression, and a rough start is hard to undo once buyers have already walked through.",
    icon: icons.home,
  },
  {
    title: "First impression",
    body: "Buyers make quick decisions while scrolling, then again the moment they walk in. The photos, the description, and what greeted them at the door either earned a second look or didn't.",
    icon: icons.image,
  },
  {
    title: "Price",
    body: "Buyers never judge a home on its own. They compare it to everything else they could buy at that price, so a number that looks fine on paper can still lose to the house next door.",
    icon: icons.pulse,
  },
  {
    title: "Market response",
    body: "A price or a plan that made sense at launch doesn't always stay right. Showings, feedback, and what else came on the market all shift over time, and the response has to shift with them.",
    icon: icons.eye,
  },
  {
    title: "Negotiation",
    body: "Getting an offer isn't the finish line. Repairs, timelines, and contingencies can undo a deal as easily as price, and how those get handled often decides whether it reaches closing.",
    icon: icons.compass,
  },
  {
    title: "Execution and behind the scenes",
    body: "Some of what affects a listing happens where sellers never see it. A missed showing, a slow reply to a buyer's agent, or feedback that went nowhere can cost a buyer without anyone ever knowing why.",
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
    title: "Ask how they'd handle an offer, not just the price",
    body: "A good offer can still fall apart over repairs, timelines, or other terms. Ask how they'd approach negotiating the whole offer, not just getting to a number you like.",
    icon: icons.document,
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
    link: { href: "/net-sheet/", label: "Run your net sheet" },
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
    body: "Your home goes back on the market, but nothing about the plan should look the same as last time. The price, the presentation, the launch, and how offers get handled all get built around what actually happened the first time, not repeated from it.",
    icon: icons.image,
  },
  {
    title: "Weekly updates and honest feedback",
    body: "You get a weekly update on activity and showing feedback. If something isn't working, I'll tell you, along with what I'd change.",
    icon: icons.mail,
  },
  {
    title: "Offers through closing",
    body: "I look at the whole offer with you, not just the price. Repairs, timelines, and contingencies can sink a deal as fast as a low number, so I negotiate the terms as carefully as I negotiate the price, then guide you through inspection, appraisal, and every deadline through closing.",
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
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: "#F0F0F0", color: "#B8974A" }}
            >
              {item.icon}
            </div>
            <div>
              <h3 className="font-body text-lg md:text-xl font-semibold text-[#1A1A18] mb-1 leading-snug">
                {item.title}
              </h3>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
                {item.body}
              </p>
              {item.link && (
                <Link href={item.link.href} className="tap-area">
                  <span className="font-body text-lg font-semibold text-[#7A5F24] underline underline-offset-4 cursor-pointer inline-block mt-2">
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
      "https://mariomanzano.com/relaunch-your-home/"
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
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A85C]">
                Relisting Your Home · Greater Austin
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.15] mb-8">
              Your listing expired.<br />
              Stepping back before relisting<br />
              <span className="font-semibold">makes complete sense.</span><br />
              Let me give you a second opinion.
            </h1>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-4 max-w-xl">
              If your listing just came off the market, your phone has probably been busy with agents reaching out. I may have been one of them, so I'll keep this useful.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-4 max-w-xl">
              I'm not going to tell you your last agent did a bad job. I don't know that, and it isn't really the point. Homes don't sell for a handful of reasons, and there's usually something we can learn from what happened the first time.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed max-w-xl">
              Here's what I'd look at first, and a few things worth knowing whether you relist with me or anyone else.
            </p>
            <p className="font-body text-lg md:text-xl font-semibold text-white leading-relaxed max-w-xl mt-6 pt-6 border-t border-white/20">
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
              <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">What usually stalls a listing</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] leading-tight mb-5">
              A lot of stalled listings<br />
              <span className="font-semibold">come down to a few things.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
              Usually it isn't one big mistake. It's a few small things that stack up. See which of these sounds familiar.
            </p>
          </RevealDiv>
          <ItemList items={stallReasons} />
        </div>
      </section>

      {/* BEFORE YOU RELIST */}
      <section className="py-20 md:py-28 bg-white border-y border-[#E5E5E5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">Before you relist</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] leading-tight mb-5">
              Questions to ask before you relist,<br />
              <span className="font-semibold">with anyone, including me.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
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
            <div className="rounded-md px-6 py-5 flex flex-col gap-4 bg-[#F2F2F2]">
              <p className="font-body text-lg leading-relaxed text-[#1A1A18]">
                <strong className="font-semibold">On listing history:</strong> Agents, and often buyers on sites like Zillow, can still see a home's past listings and price history. What changed in September 2026 is the day count, now reset to zero after 30 days off market instead of 90. The count resets. The history doesn't. That's why the relaunch has to actually look different, not just reappear.
              </p>
              <p className="font-body text-lg leading-relaxed text-[#1A1A18]">
                <strong className="font-semibold">On price reductions:</strong> Repeatedly lowering the price in small steps can end up costing more than getting the price right from the start.
              </p>
            </div>
          </RevealDiv>

          <RevealDiv className="mt-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">Before you decide</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] leading-tight mb-5">
              What if selling isn't<br />
              <span className="font-semibold">the best move right now?</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-4">
              I've owned rentals myself, so I ask this question when it makes sense. Depending on your mortgage, what the home could rent for, and your plans, keeping it might make more sense than selling. Or it might not. Either way, it's worth running the numbers before you decide.
            </p>
            <Link href="/sell-vs-rent/" className="tap-area">
              <span className="font-body text-lg font-semibold text-[#7A5F24] underline underline-offset-4 cursor-pointer">
                Compare selling vs renting
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* HOW I HELP */}
      <section className="py-20 md:py-28 bg-white border-y border-[#E5E5E5]">
        <div className="container max-w-2xl">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-rule" />
              <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">How I help</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1A1A18] leading-tight mb-5">
              Before I suggest anything,<br />
              <span className="font-semibold">I want to know what happened.</span>
            </h2>
            <p className="font-body text-lg text-[#2B2B2B] leading-relaxed mb-12">
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
                <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-[#7A5F24]">No lock-in</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-medium text-[#1A1A18] leading-tight mb-5">
                If it isn't working,<br />
                <span className="font-semibold">you're not stuck.</span>
              </h2>
              <p className="font-body text-lg text-[#2B2B2B] leading-relaxed">
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
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A85C]">
                Let's talk
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-5">
              Bring your questions.<br />
              <span className="font-semibold">I'll bring the plan.</span>
            </h2>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-4 max-w-lg">
              If you'd like a second opinion, I'm happy to come by and walk you through what I'd do differently. If we already have a time set, bring any showing feedback, offers you received, and anything your last agent told you about why the home didn't sell. The more I know going in, the more useful our meeting will be.
            </p>
            <p className="font-body text-lg text-white/90 leading-relaxed mb-8 max-w-lg">
              Whether you hire me or not, you should leave with a clearer picture of what happened, what I'd change, including how I'd approach your price and next launch, and what your options are. And if it's not for you, feel free to kick me out.
            </p>
            <Link href="/contact/">
              <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-[#1A1A18] font-semibold hover:bg-[#C9A85C] hover:border-[#C9A85C] inline-flex items-center gap-3 cursor-pointer">
                Set Up a Time to Meet
                <ArrowRight size={16} />
              </span>
            </Link>
          </RevealDiv>
        </div>
      </section>

    </div>
  );
}
