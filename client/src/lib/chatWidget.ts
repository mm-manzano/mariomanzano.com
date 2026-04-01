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
  } else {
    // Fallback: try to trigger via the widget's chat button
    // The LeadConnector widget creates a chat button element
    const chatButton = document.querySelector('[data-widget-id="69cc1af2f10632131670f57c"]') as HTMLElement;
    if (chatButton) {
      chatButton.click();
    }
  }
}
