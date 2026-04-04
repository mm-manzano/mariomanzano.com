import { getCTALink } from "@/lib/ctaLinks";

const trackCTA = (type: string) => {
  if (window.fbq) {
    if (type === "get-guide") {
      window.fbq('trackCustom', 'GuideDownload');
    } else {
      window.fbq('trackCustom', 'StartConversation');
    }
  }
};

export default function HomeownerGuide({ language = "en" }: { language?: "en" | "es" }) {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        
        {/* Background overlay only */}
        <div className="absolute inset-0 bg-[#1A1A18]/65" />

        <div className="relative z-10 container">

          {/* Top right CTA */}
          <div className="flex justify-end mb-4">
            <a
              href="/homeowner-guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTA("get-guide")}
              className="text-white text-sm md:text-base opacity-90 hover:opacity-100 font-light tracking-wide"
            >
              Download PDF
            </a>
          </div>

          {/* Content */}
          <div className="max-w-2xl">

            <div className="flex items-center gap-3 mb-6">
              <span className="section-rule bg-[#D4B878]" />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#D4B878]">
                Homeowner Guide
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Sell, Remodel,<br />
              <em className="italic">Rent, or Hold.</em>
            </h1>

            <p className="font-body text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Guidance for your next move. Clarity before you decide.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex gap-4">

              {/* Get a Plan */}
              <a
                href={getCTALink("get-plan", language)}
                onClick={() => trackCTA("get-plan")}
                className="px-6 py-3 bg-[#D4B878] text-black text-sm tracking-wide"
              >
                Get a Plan
              </a>

              {/* Start Conversation */}
              <a
                href={getCTALink("start-conversation", language)}
                onClick={() => trackCTA("start-conversation")}
                className="px-6 py-3 border border-white text-white text-sm tracking-wide"
              >
                Start a Conversation
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* NEXT SECTION */}
      <section className="py-20 md:py-32">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-light mb-6">
            A clear look at your options.
          </h2>
          <p className="text-base md:text-lg max-w-2xl text-black/70">
            Most homeowners considering a sale want clarity before committing.
          </p>
        </div>
      </section>

    </div>
  );
}
