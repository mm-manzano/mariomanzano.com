/*
 * DESIGN: Quiet Luxury Editorial
 * Routes: Home, HomeValue, NetSheet, SellVsRent, RemodelVsSell, HomeownerGuide, About, Contact (English & Spanish)
 * Layout: Navigation (fixed, transparent on hero) + page content + Footer
 */

// Build version: v2.5.4 - Listing Presentation page added
const BUILD_VERSION = "2.5.4";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import StrategyHub from "./pages/StrategyHub";
import HomeValue from "./pages/HomeValue";
import NetSheet from "./pages/NetSheet";
import SellVsRent from "./pages/SellVsRent";
import RemodelVsSell from "./pages/RemodelVsSell";
import HomeownerGuide from "./pages/HomeownerGuide";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Links from "./pages/Links";
import ListingPresentation from "./pages/ListingPresentation";

// Spanish Pages - Matching user's exact file names
import HomeES from "./pages/HomeES";
import StrategyHubES from "./pages/StrategyHubES";
import HomeValueES from "./pages/HomeValueES";
import NetSheetES from "./pages/NetSheetES";
import SellVsRentES from "./pages/SellVsRentES";
import RemodelVsSellES from "./pages/RemodelVsSellES";
import GuiaParaPropietarios from "./pages/GuiaParaPropietarios";
import AboutES from "./pages/AboutES";
import ContactES from "./pages/ContactES";
import ConsultaES from "./pages/ConsultaES";

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
      <Route path="/es/strategy-hub" component={StrategyHubES} />
      <Route path="/es/home-value" component={HomeValueES} />
      <Route path="/es/net-sheet" component={NetSheetES} />
      <Route path="/es/sell-vs-rent" component={SellVsRentES} />
      <Route path="/es/remodel-vs-sell" component={RemodelVsSellES} />
      <Route path="/es/guia-para-propietarios" component={GuiaParaPropietarios} />
      <Route path="/es/acerca" component={AboutES} />
      <Route path="/es/contacto" component={ContactES} />
      <Route path="/es/consulta" component={ConsultaES} />
      <Route path="/es/privacy-policy" component={PrivacyPolicyES} />
      <Route path="/es/terms-of-service" component={TermsOfServiceES} />

      {/* English Routes */}
      <Route exact path="/" component={Home} />
      <Route path="/strategy-hub" component={StrategyHub} />
      <Route path="/home-value" component={HomeValue} />
      <Route path="/net-sheet" component={NetSheet} />
      <Route path="/sell-vs-rent" component={SellVsRent} />
      <Route path="/remodel-vs-sell" component={RemodelVsSell} />
      <Route path="/homeowner-guide" component={HomeownerGuide} />
      <Route path="/homeownerguide">{() => { window.location.href = "/homeowner-guide"; return null; }}</Route>
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/listing-presentation" component={ListingPresentation} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/links" component={Links} />

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  usePageTracking();
  const [location] = useLocation();

  // Links page renders standalone — no nav, no footer
  if (location === "/links") {
    return (
      <ErrorBoundary>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <ScrollToTop />
            <Links />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

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
