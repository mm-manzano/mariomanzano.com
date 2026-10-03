import { useEffect } from "react";

export default function PrivacyPolicyES() {
  useEffect(() => {
    document.title = "Política de Privacidad | Mario Manzano";
    let description = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", "Cómo este sitio web recopila, usa y protege tu información, incluyendo los términos de mensajes de texto. Mario Manzano, Cedar Park y Leander TX.");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://mariomanzano.com/es/privacy-policy/");
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          <h1 className="font-display text-5xl font-medium text-[#1A1A18] mb-8">
            Política de Privacidad
          </h1>

          <div className="space-y-6 font-body text-base text-[#2B2B2B] leading-relaxed">
            <p>
              Mario Manzano opera este sitio web y puede recopilar información personal como nombre, número de teléfono y correo electrónico cuando los usuarios envían formularios o utilizan el chat del sitio.
            </p>

            <p>
              Esta información se utiliza para responder consultas, brindar servicios y enviar actualizaciones o mensajes relacionados con bienes raíces si el usuario ha dado su consentimiento.
            </p>

            <p>
              No vendemos ni compartimos información personal con terceros para fines de marketing.
            </p>

            <p>
              Pueden aplicarse tarifas de mensajes y datos. La frecuencia de los mensajes puede variar. Puede responder STOP para cancelar la suscripción o HELP para obtener ayuda.
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
