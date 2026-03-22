/*
 * DESIGN: Quiet Luxury Editorial
 * Routes: Home, HomeValue, HomeownerGuide, About, Contact (English & Spanish)
 * Layout: Navigation (fixed, transparent on hero) + page content + Footer
 */

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
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
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
      
      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
