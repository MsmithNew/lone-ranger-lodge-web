
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider } from "@/context/AdminContext";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Accommodations from "@/pages/Accommodations";
import Amenities from "@/pages/Amenities";
import Activities from "@/pages/Activities";
import RulesFAQs from "@/pages/RulesFAQs";
import Reservations from "@/pages/Reservations";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminContent from "@/pages/AdminContent";
import AdminAbout from "@/pages/AdminAbout";
import AdminRulesFAQs from "@/pages/AdminRulesFAQs";
import AdminAttractions from "@/pages/AdminAttractions";
import AdminSettings from "@/pages/AdminSettings";
import AdminAccommodations from "@/pages/AdminAccommodations";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <Toaster />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/rules-faqs" element={<RulesFAQs />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/rules-faqs" element={<AdminRulesFAQs />} />
            <Route path="/admin/accommodations" element={<AdminAccommodations />} />
            <Route path="/admin/attractions" element={<AdminAttractions />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
