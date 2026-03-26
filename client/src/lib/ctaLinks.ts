/**
 * CTA Link Utility
 * Handles mobile (SMS) vs desktop (Contact page) routing for CTA buttons
 * Pre-fills messages based on button type and language
 */

const PHONE_NUMBER_ENCODED = "5126959255";

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

export type ButtonType = "start-conversation" | "get-plan";
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
 * Mobile: SMS link with pre-filled message
 * Desktop: Contact page link
 */
export function getCTALink(buttonType: ButtonType, language: Language): string {
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
