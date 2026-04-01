/**
 * CTA Link Utility
 * Handles routing for CTA buttons:
 * - "get-guide": Routes to GoHighLevel funnel (both mobile & desktop)
 * - "start-conversation": SMS on mobile, Contact page on desktop
 */

const FUNNEL_URL = "https://go.mariomanzano.com/homeowner-guide";

export type ButtonType = "start-conversation" | "get-plan" | "get-guide";
export type Language = "en" | "es";

/**
  );
}

/**
 */
export function getCTALink(buttonType: ButtonType, language: Language): string {
  // "get-guide" always routes to funnel, regardless of device
  if (buttonType === "get-guide") {
    return FUNNEL_URL;
  }
  return "#";
}
