import { useEffect } from "react";

const links = [
  {
    label: "What Is My Home Worth?",
    description: "Get a local estimate based on real Cedar Park & Leander data",
    href: "/home-value",
  },
  {
    label: "Calculate My Net Proceeds",
    description: "See what you actually walk away with after all costs",
    href: "/net-sheet",
  },
  {
    label: "Sell vs Rent Calculator",
    description: "Run the real numbers before you decide",
    href: "/sell-vs-rent",
  },
  {
    label: "Remodel vs Sell Calculator",
    description: "Find out if the upgrade is worth it",
    href: "/remodel-vs-sell",
  },
  {
    label: "Free Homeowner Guide",
    description: "Sell, Remodel, Rent, or Hold — understand all four paths",
    href: "/homeowner-guide",
  },
  {
    label: "Talk to Mario",
    description: "No pitch. Just a clear conversation about your options",
    href: "/contact",
  },
];

export default function Links() {
  useEffect(() => {
    document.title = "Mario Manzano | Links";
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-start px-5 pt-28 pb-16">
      <div className="flex flex-col items-center mb-10">
        <img
          src="/images/logo.png"
          alt="Mario Manzano"
          style={{ width: 72, height: 72, objectFit: "contain" }}
          className="mb-5"
        />
        <p
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-white text-3xl font-light tracking-wide"
        >
          Mario Manzano
        </p>
        <p className="text-[#c9a84c] text-xs font-medium tracking-[0.18em] uppercase mt-1">
          Austin Realtor · Seller Strategist
        </p>
        <p
          className="text-white/40 text-xs mt-1 uppercase"
          style={{ letterSpacing: "0.12em" }}
        >
          Cedar Park & Leander, TX
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block w-full border border-white/10 bg-white/[0.03] px-5 py-4 hover:bg-white/[0.07] hover:border-[#c9a84c]/40 transition-all duration-200"
          >
            <p className="text-white text-sm font-medium tracking-wide">
              {link.label}
            </p>
            <p className="text-white/40 text-xs mt-0.5 font-light">
              {link.description}
            </p>
          </a>
        ))}
      </div>

      <p
        className="text-white/20 text-xs mt-10 uppercase"
        style={{ letterSpacing: "0.2em" }}
      >
        mariomanzano.com
      </p>
    </div>
  );
}
