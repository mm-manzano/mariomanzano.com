/**
 * CTA Link Utility
 * Handles routing for CTA buttons:
 * - "get-guide": Routes to homeowner guide pages
 * - "start-conversation": Routes to language-specific planning forms
 * - "get-plan": Routes to language-specific planning forms
 */

const FUNNEL_URL = "/homeowner-guide";
const FUNNEL_URL_ES = "/es/guia-para-propietarios";

const PLAN_URL_EN = "https://go.mariomanzano.com/get-a-plan";
const PLAN_URL_ES = "https://go.mariomanzano.com/obtener-un-plan";

export type ButtonType = "start-conversation" | "get-plan" | "get-guide";
export type Language = "en" | "es";

export function getCTALink(
  buttonType: ButtonType,
  language: Language
): string {
  switch (buttonType) {
    case "get-guide":
      return language === "es" ? FUNNEL_URL_ES : FUNNEL_URL;

    case "get-plan":
    case "start-conversation":
      return language === "es" ? PLAN_URL_ES : PLAN_URL_EN;

    default:
      return "#";
  }
}
