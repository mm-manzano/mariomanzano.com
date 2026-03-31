export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <h1 className="font-display text-5xl font-light text-[#1A1A18] mb-8">
            Terms of Service
          </h1>

          <div className="space-y-6 font-body text-base text-[#1A1A18]/70 leading-relaxed">
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

            <div className="mt-8 pt-8 border-t border-[#E8E0D5]">
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
