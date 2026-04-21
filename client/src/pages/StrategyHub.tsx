import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

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
  return (
    <div ref={ref} className={`fade-in-up ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function StrategyHub() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] py-20 md:py-32">
      <div className="container">
        <RevealDiv>
          <div className="flex items-center gap-3 mb-4">
            <span className="section-rule" />
            <span className="section-number">01. Your Strategy</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] mb-6">
            Start with the numbers.<br />
            <em className="italic">Decide with clarity.</em>
          </h1>
          <p className="font-body text-base text-[#1A1A18]/65 leading-relaxed mb-12 max-w-2xl">
            Every home decision is unique. Get the precise data and strategic insights you need to choose the path that maximizes your financial goals and fits your lifestyle.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Path A: Net Sheet */}
          <RevealDiv delay={100}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                See what you&apos;d <em className="italic">actually</em> walk away with.
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                Beyond the sale price, understand all the costs and fees involved. Get a clear picture of your net proceeds.
              </p>
              <Link href="/net-sheet">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Calculate Net Proceeds
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>

          {/* Path B: Sell vs Rent */}
          <RevealDiv delay={200}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                Should you <em className="italic">sell or rent</em> your home?
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                Compare the financial implications of selling now versus holding your property as a rental. Understand cash flow, appreciation, and long-term returns.
              </p>
              <Link href="/sell-vs-rent">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Compare Sell vs. Rent
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>

          {/* Path C: Remodel vs Sell */}
          <RevealDiv delay={300}>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-4">
                Is <em className="italic">remodeling worth it</em> before selling?
              </h2>
              <p className="font-body text-sm text-[#1A1A18]/60 leading-relaxed mb-6 flex-grow">
                Analyze the potential return on investment for renovations. Discover if a remodel will truly increase your net profit or if selling as-is is the better option.
              </p>
              <Link href="/remodel-vs-sell">
                <span className="btn-luxury-outline inline-flex items-center gap-3 cursor-pointer">
                  Analyze Remodel vs. Sell
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </RevealDiv>
        </div>

        {/* Optional: Add a CTA to contact you for personalized advice */}
        <RevealDiv delay={400} className="mt-20 text-center">
          <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-4">
            Need personalized guidance?
          </h2>
          <p className="font-body text-base text-[#1A1A18]/65 max-w-xl mx-auto leading-relaxed mb-8">
            These tools provide clarity, but for a strategy tailored to your unique situation, let&apos;s connect.
          </p>
          <Link href="/contact">
            <span className="btn-luxury bg-[#B8974A] border-[#B8974A] text-white hover:bg-[#9A7D3A] hover:border-[#9A7D3A] inline-flex items-center gap-3 cursor-pointer">
              Schedule a Strategy Session
              <ArrowRight size={14} />
            </span>
          </Link>
        </RevealDiv>

      </div>
    </div>
  );
}
