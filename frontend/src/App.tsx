import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "./components/Layout";
import HomePage from "@/components/HomePage";
import SolarPlansPage from "@/components/SolarPlansPage";
import SelectYourPlanPage from "@/components/SelectYourPlanPage";
import PlantCategoryPage from "@/components/PlantCategoryPage";
import PersonalizedSolarQuotesPage from "@/components/PersonalizedSolarQuotesPage";
import SolarCalculatorPage from "@/components/SolarCalculatorPage";
import EnhancedSolarBooking from "@/components/EnhancedSolarBooking";
import AboutUsSection from "@/components/AboutUsSection";
import ContactUsSection from "@/components/ContactUsSection";
import SolarGenerationPage from "@/components/SolarGenerationPage";
import AuditDashboard from "@/components/AuditDashboard";
import EnhancedProfileSection from "@/components/EnhancedProfileSection";
import BlogSection from "@/components/BlogSection";
import SolarCleaningAMCPage from "@/components/SolarCleaningAMCPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="solar-plans" element={<SolarPlansPage />} />
            <Route path="select-plan" element={<SelectYourPlanPage />} />
            <Route path="select-plan-category" element={<PlantCategoryPage />} />
            <Route path="personalized-quotes" element={<PersonalizedSolarQuotesPage />} />
            <Route path="calculator" element={<SolarCalculatorPage />} />
            <Route path="booking" element={<EnhancedSolarBooking />} />
            <Route path="about" element={<AboutUsSection />} />
            <Route path="contact" element={<ContactUsSection />} />
            <Route path="generation" element={<SolarGenerationPage />} />
            <Route path="audit" element={<AuditDashboard />} />
            <Route path="profile" element={<EnhancedProfileSection />} />
            <Route path="blog" element={<BlogSection />} />
            <Route path="solar-cleaning" element={<SolarCleaningAMCPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
