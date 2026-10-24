import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudyBackstageIDP from "./pages/CaseStudyBackstageIDP";
import CaseStudyLocalGuideBooking from "./pages/CaseStudyLocalGuideBooking";
import Links from "./pages/Links";

// Start every page navigation at the top (SPA navigation keeps the old scroll
// position otherwise). In-page hash anchors (#about, #skills, ...) still jump
// to their section.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* CHANGE HERE: We added the basename prop */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/backstage-idp" element={<CaseStudyBackstageIDP />} />
          <Route path="/projects/local-guide-booking" element={<CaseStudyLocalGuideBooking />} />
          <Route path="/links" element={<Links />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
