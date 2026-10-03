import { useEffect } from "react";

export default function TermsOfServiceES() {
  useEffect(() => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://mariomanzano.com/es/terms-of-service/");
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <h1 className="font-display text-5xl font-medium text-[#1A1A18] mb-8">
            Términos de Servicio
          </h1>

          <div className="space-y-6 font-body text-base text-[#2B2B2B] leading-relaxed">
            <p>
              Al utilizar este sitio web, usted acepta proporcionar información precisa al enviar formularios o comunicarse con nosotros.
            </p>

            <p>
              Usted da su consentimiento para recibir comunicaciones por teléfono, correo electrónico o mensajes de texto relacionadas con su consulta. Pueden aplicarse tarifas de mensajes y datos. La frecuencia de los mensajes puede variar.
            </p>

            <p>
              Puede cancelar la suscripción a los mensajes de texto en cualquier momento respondiendo STOP.
            </p>

            <p>
              Mario Manzano no se hace responsable de decisiones tomadas basadas en la información proporcionada en este sitio web.
            </p>

            <div className="mt-8 pt-8 border-t border-[#E5E5E5]">
              <p className="font-semibold text-[#1A1A18] mb-4">Contacto:</p>
              <p>Mario Manzano</p>
              <p>(512) 695-9255</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
