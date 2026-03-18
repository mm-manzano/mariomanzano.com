/*
 * DESIGN: Quiet Luxury Editorial - About Page (Rewritten)
 * Goal: Personal, grounded, differentiated - who Mario is and why he thinks this way
 * Sections: Intro, Origin, Philosophy, Experience, Approach, Location Close
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const ADVISOR_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/hero-advisor-bg-FFo7WwjyuZSVioVNUzZH62.webp";
const MARIO_HEADSHOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-headshot_b14ad6c2.jpg";
const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431995309/do52YrznpEuUcnj2ufXuis/mario-hero-bg-Zzemi4ArQkuF2Ww9f72uuW.webp";

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

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ─── SECTION 1: INTRO ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ADVISOR_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A18]/65" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                About Mario
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              The Advisor<br />
              <em className="italic">Behind the Strategy.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              A licensed REALTOR® who believes the best real estate advice sometimes means telling you not to sell.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: ORIGIN ─────────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <RevealDiv>
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-[#E8E0D5]">
                  <img
                    src={MARIO_HEADSHOT}
                    alt="Mario Manzano"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </RevealDiv>

            {/* Text */}
            <RevealDiv delay={150}>
              <div className="flex items-center gap-3 mb-6">
                <span className="section-rule" />
                <span className="section-number">01 — How I Got Here</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-6">
                Learning through<br />
                <em className="italic">real decisions.</em>
              </h2>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                I didn't start in real estate. I started by buying properties, renovating them, and living through the actual decisions that homeowners face.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-4">
                I've done live-in flips. I've held properties through market shifts. I've had to decide whether to sell, rent, or hold based on real financial and personal tradeoffs. These weren't transactions—they were decisions that mattered.
              </p>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                That experience taught me something important: most people don't need a salesperson. They need someone who understands both the financial side and the practical side of real estate decisions.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHY I THINK DIFFERENTLY ────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#1A1A18]">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" style={{ background: "#D4B878" }} />
              <span className="section-number text-[#D4B878]">02 — Why I Don't Push Selling</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-12 max-w-2xl">
              Most people need clarity,<br />
              <em className="italic">not urgency.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl">
            <RevealDiv delay={100}>
              <p className="font-body text-base text-white/70 leading-relaxed mb-6">
                I've seen what happens when people feel pressured to make a quick decision about their home. They rush. They second-guess themselves. They sometimes make moves they regret.
              </p>
              <p className="font-body text-base text-white/70 leading-relaxed">
                That's not how I work. Selling is just one option. For some people, it's the right move. For others, holding, renting, or remodeling makes more sense. My job is to help you see all the options clearly so you can make the decision that's right for your situation.
              </p>
            </RevealDiv>

            <RevealDiv delay={200}>
              <div className="border-l-2 border-[#B8974A] pl-6">
                <p className="font-display text-xl italic font-light text-white leading-relaxed mb-4">
                  "The best advice I can give is sometimes to wait. Or to hold. Or to improve the property first. Whatever makes sense for you."
                </p>
                <p className="font-body text-sm text-white/50">— Mario Manzano</p>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: EXPERIENCE ─────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">03 — What I Bring</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              Real experience,<br />
              <em className="italic">honestly positioned.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            <RevealDiv delay={100}>
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Licensed REALTOR®</h3>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                Active member of the National Association of REALTORS® and the Austin Board of REALTORS®. I follow professional standards and keep current with market regulations and practices.
              </p>

              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Personal Investing Experience</h3>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                I've bought, renovated, held, and sold properties. I understand the financial side—equity, cash flow, timing—and the practical side of living through these decisions.
              </p>
            </RevealDiv>

            <RevealDiv delay={200}>
              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Client Work</h3>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-8">
                I've helped a small number of clients sell, and I've worked with homeowners exploring their options. I'm not claiming to be the busiest or the biggest. I focus on doing good work with people I can genuinely help.
              </p>

              <h3 className="font-display text-2xl font-light text-[#1A1A18] mb-4">Market Knowledge</h3>
              <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed">
                I track the Austin area market closely. I understand pricing patterns, buyer demand, and neighborhood dynamics. This gives you a solid foundation for your decisions.
              </p>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: HOW I APPROACH DECISIONS ────────────────────────── */}
      <section
        className="py-20 md:py-28 relative"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-[#F8F5F0]/90" />
        <div className="relative z-10 container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">04 — My Approach</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-12 max-w-2xl">
              Three principles that<br />
              <em className="italic">guide everything.</em>
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {[
              {
                title: "Clarity Over Pressure",
                desc: "Before we talk about anything else, you understand your situation. Your equity, your market, your timeline. Clarity first, always.",
              },
              {
                title: "Tradeoffs Over Opinions",
                desc: "Every option has tradeoffs. I help you see them clearly—the financial side, the practical side, the timing. Then you decide.",
              },
              {
                title: "Timing Matters",
                desc: "Your timeline is what matters. Whether you're ready to move in three months or want to explore options over the next year, we work at your pace.",
              },
            ].map((item, i) => (
              <RevealDiv key={item.title} delay={i * 100} className="bg-[#F8F5F0] p-8 border-t-2 border-[#B8974A]">
                <h3 className="font-display text-xl font-light text-[#1A1A18] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/65 leading-relaxed">{item.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: LOCATION CLOSE ─────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule" />
              <span className="section-number">05 — Where I Work</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-8 max-w-2xl">
              Based in Leander,<br />
              <em className="italic">serving Greater Austin.</em>
            </h2>
            <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed max-w-2xl mb-12">
              I help homeowners across the Austin area think through decisions clearly before making a move. Whether you're in Leander, Cedar Park, Austin proper, or anywhere in between, I'm here to provide the clarity and honest guidance you deserve.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1A1A18]">
        <div className="container text-center">
          <RevealDiv>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6 max-w-xl mx-auto">
              Ready to have a real conversation?
            </h2>
            <p className="font-body text-base text-white/60 mb-10 max-w-lg mx-auto">
              No pressure. No pitch. Just an honest conversation about your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3">
                  Schedule a Consultation
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
