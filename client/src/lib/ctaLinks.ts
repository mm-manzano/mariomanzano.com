/**
 * CTA Link Utility
 * Handles routing for CTA buttons:
 * - "get-guide": Routes to GoHighLevel funnel (both mobile & desktop)
 * - "start-conversation": SMS on mobile, Contact page on desktop
 */

const PHONE_NUMBER_ENCODED = "5126959255";
const FUNNEL_URL = "https://go.mariomanzano.com/homeowner-guide";

const SMS_MESSAGES = {
  en: {
    "start-conversation": "Hey Mario, I came across your site and had a question about my home.",
    "get-plan": "Hey Mario, I'm trying to figure out what to do with my home and wanted your thoughts.",
  },
  es: {
    "start-conversation": "Hola Mario, vi tu sitio web y tengo una pregunta sobre mi casa.",
    "get-plan": "Hola Mario, estoy tratando de decidir qué hacer con mi casa y me gustaría tu opinión.",
  },
};

export type ButtonType = "start-conversation" | "get-plan" | "get-guide";
export type Language = "en" | "es";

/**
 * Detect if device is mobile
 */
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Get the appropriate link for CTA button
 * "get-guide": Always routes to funnel (mobile & desktop)
 * "start-conversation": SMS on mobile, Contact page on desktop
 * "get-plan": SMS on mobile, Contact page on desktop (legacy)
 */
export function getCTALink(buttonType: ButtonType, language: Language): string {
  // "get-guide" always routes to funnel, regardless of device
  if (buttonType === "get-guide") {
    return FUNNEL_URL;
  }

  // "start-conversation" and "get-plan" use mobile/desktop logic
  const isMobile = isMobileDevice();
  const message = SMS_MESSAGES[language][buttonType];

  if (isMobile) {
    // SMS link for mobile
    // Format: sms:XXXXXXXXXX?body=Message
    const encodedMessage = encodeURIComponent(message);
    return `sms:${PHONE_NUMBER_ENCODED}?body=${encodedMessage}`;
  } else {
    // Contact page link for desktop
    return language === "es" ? "/es/contacto" : "/contact";
  }
}
