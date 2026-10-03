import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service | Mario Manzano";
    let description = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", "The terms for using mariomanzano.com, including consent to calls and texts and how to opt out. Mario Manzano, Cedar Park and Leander TX.");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://mariomanzano.com/terms-of-service/");
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <h1 className="font-display text-5xl font-medium text-[#1A1A18] mb-8">
            Terms of Service
          </h1>

          <div className="space-y-6 font-body text-base text-[#2B2B2B] leading-relaxed">
            <p>
              By using this website, you agree to provide accurate information when submitting forms or contacting us.
            </p>

            <p>
              You consent to receive communication via phone, email, or text message regarding your inquiry. Message and data rates may apply. Message frequency may vary.
            </p>

            <p>
              You can opt out of SMS communications at any time by replying STOP.
            </p>

            <p>
              Mario Manzano is not responsible for any decisions made based on information provided on this website.
            </p>

            <div className="mt-8 pt-8 border-t border-[#E5E5E5]">
              <p className="font-semibold text-[#1A1A18] mb-4">Contact:</p>
              <p>Mario Manzano</p>
              <p>(512) 695-9255</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
