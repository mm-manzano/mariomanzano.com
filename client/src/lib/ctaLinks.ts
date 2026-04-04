/**
 * CTA Link Utility
 * Handles routing for CTA buttons:
 * - "get-guide": Routes to GoHighLevel funnel (both mobile & desktop)
 * - "start-conversation": SMS on mobile, Contact page on desktop
 */

const FUNNEL_URL = "https://go.mariomanzano.com/homeowner-guide";
const PLAN_URL = "https://go.mariomanzano.com/get-a-plan";

export type ButtonType = "start-conversation" | "get-plan" | "get-guide";
export type Language = "en" | "es";

/**
  );
}

/**
 */
export function getCTALink(buttonType: ButtonType, language: Language): string {
  switch (buttonType) {
    case "get-guide":
      return FUNNEL_URL;

    case "get-plan":
    case "start-conversation":
      return PLAN_URL;

    default:
      return "#";
  }
}
