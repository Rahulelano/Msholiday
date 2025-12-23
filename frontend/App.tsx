import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ToursPage from "./pages/ToursPage";
import TourDetails from "./pages/TourDetails";
import NotFound from "./pages/NotFound";
import LegalPage from "./pages/LegalPage";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import { AdminLayout } from "./components/layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageTours from "./pages/admin/ManageTours";
import TourForm from "./pages/admin/TourForm";
import ManageCategories from "./pages/admin/ManageCategories";
import CategoryForm from "./pages/admin/CategoryForm";
import ManageTestimonials from "./pages/admin/ManageTestimonials";
import ManageInquiries from "./pages/admin/ManageInquiries";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/india-tours" element={<ToursPage />} />
            <Route path="/india-tours/:subcategory" element={<ToursPage />} />
            <Route path="/international-tours" element={<ToursPage />} />
            <Route path="/international-tours/:subcategory" element={<ToursPage />} />
            <Route path="/honeymoon" element={<ToursPage />} />
            <Route path="/honeymoon/:subcategory" element={<ToursPage />} />
            <Route path="/group-tours" element={<ToursPage />} />
            <Route path="/wedding" element={<ToursPage />} />
            <Route path="/wedding/:subcategory" element={<ToursPage />} />
            <Route path="/family-tours" element={<ToursPage />} />
            <Route path="/adventure-tours" element={<ToursPage />} />
            <Route path="/luxury-tours" element={<ToursPage />} />
            <Route path="/budget-tours" element={<ToursPage />} />

            <Route path="/faqs" element={<LegalPage type="faqs" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/cancellation" element={<LegalPage type="cancellation" />} />

            <Route path="/tours/:id" element={<TourDetails />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} /> {/* /admin */}
                <Route path="dashboard" element={<AdminDashboard />} />

                {/* Tour Management */}
                <Route path="tours" element={<ManageTours />} />
                <Route path="tours/new" element={<TourForm />} />
                <Route path="tours/edit/:id" element={<TourForm />} />

                {/* Category Management */}
                <Route path="categories" element={<ManageCategories />} />
                <Route path="categories/new" element={<CategoryForm />} />

                {/* Testimonials Management */}
                <Route path="testimonials" element={<ManageTestimonials />} />

                {/* Inquiries Management */}
                <Route path="inquiries" element={<ManageInquiries />} />

                {/* Add other admin routes here later: testimonials, inquiries */}
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTop />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
