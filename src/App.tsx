
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AdminProvider } from "./context/AdminContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Accommodations from "./pages/Accommodations";
import Amenities from "./pages/Amenities";
import Activities from "./pages/Activities";
import Reservations from "./pages/Reservations";
import RulesFAQs from "./pages/RulesFAQs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAttractions from "./pages/AdminAttractions";
import AdminSettings from "./pages/AdminSettings";
import AdminContent from "./pages/AdminContent";
import AdminAbout from "./pages/AdminAbout";
import AdminRulesFAQs from "./pages/AdminRulesFAQs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/rules-faqs" element={<RulesFAQs />} />
            <Route path="/contact" element={<Contact />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/attractions" element={<AdminAttractions />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/rules-faqs" element={<AdminRulesFAQs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AdminProvider>
  </QueryClientProvider>
);

export default App;
