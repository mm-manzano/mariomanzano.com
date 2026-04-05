/*
 * DESIGN: Quiet Luxury Editorial
 * Routes: Home, HomeValue, HomeownerGuide, About, Contact (English & Spanish)
 * Layout: Navigation (fixed, transparent on hero) + page content + Footer
 */

// Build version: v2.1 - Force cache bust
const BUILD_VERSION = "2.1.0";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HomeValue from "./pages/HomeValue";
import HomeownerGuide from "./pages/HomeownerGuide";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HomeES from "./pages/HomeES";
import GuiaParaPropietarios from "./pages/GuiaParaPropietarios";
import AboutES from "./pages/AboutES";
import ContactES from "./pages/ContactES";
import ConsultaES from "./pages/ConsultaES";
import SellingProcess from "./pages/SellingProcess";
import SellingProcessES from "./pages/SellingProcessES";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PrivacyPolicyES from "./pages/PrivacyPolicyES";
import TermsOfService from "./pages/TermsOfService";
import TermsOfServiceES from "./pages/TermsOfServiceES";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
function usePageTracking() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location]);
}

function Router() {
  return (
    <Switch>
            {/* Spanish Routes */}
      <Route exact path="/es" component={HomeES} />
      <Route path="/es/guia-para-propietarios" component={GuiaParaPropietarios} />
      <Route path="/es/acerca" component={AboutES} />
      <Route path="/es/contacto" component={ContactES} />
      <Route path="/es/consulta" component={ConsultaES} />
      <Route path="/es/proceso-de-venta" component={SellingProcessES} />
      {/* English Routes */}
      <Route exact path="/" component={Home} />
      <Route path="/home-value" component={HomeValue} />
      <Route path="/homeowner-guide" component={HomeownerGuide} />
      <Route path="/homeownerguide">{() => { window.location.href = "/homeowner-guide"; return null; }}</Route>
      <Route path="/selling-process" component={SellingProcess} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/es/privacy-policy" component={PrivacyPolicyES} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/es/terms-of-service" component={TermsOfServiceES} />
      
      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  usePageTracking();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
