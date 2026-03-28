import { useEffect } from 'react';
import { useLocation } from 'wouter';

const PIXEL_ID = '373372940530688';

/**
 * Initialize Meta Pixel (Facebook Pixel) tracking
 * Loads the fbq script and initializes the pixel on component mount
 */
function initializeMetaPixel() {
  // Prevent duplicate initialization
  if (window.fbq) {
    return;
  }

  // Create the fbq function stub
  const fbq = function (this: any, ...args: any[]) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
    } else {
      fbq.queue.push(args);
    }
  };

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  // Attach to window
  (window as any).fbq = fbq;

  // Create and inject the script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  // Initialize pixel
  fbq('init', PIXEL_ID);

  // Fire initial PageView
  fbq('track', 'PageView');
}

/**
 * Hook to track page views on route changes (SPA behavior)
 */
export function useMetaPixel() {
  const [location] = useLocation();

  // Initialize pixel on first mount
  useEffect(() => {
    initializeMetaPixel();
  }, []);

  // Track page view on route changes
  useEffect(() => {
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [location]);
}
