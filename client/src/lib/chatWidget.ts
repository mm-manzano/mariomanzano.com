/**
 * Chat Widget Trigger Utility
 * Opens the LeadConnector chat widget on demand
 * Works on desktop and mobile
 */

export function openChatWidget(): void {
  if (typeof window === "undefined") return;

  // LeadConnector widget is loaded globally via the script tag in index.html
  // It exposes a global object that we can interact with
  const widget = (window as any).__lc || (window as any).LC_Loader;

  if (widget && typeof widget.openChat === "function") {
    // If the widget has an openChat method, use it
    widget.openChat();
  } else if (widget && typeof widget.open === "function") {
    // Alternative method name
    widget.open();
  }
}
