import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingState } from "@/components/common/LoadingState";

const HomePage = lazy(() => import("@/pages/HomePage"));
const FactoryPage = lazy(() => import("@/pages/FactoryPage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const ReviewsPage = lazy(() => import("@/pages/ReviewsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<LoadingState />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/factory" element={<FactoryPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
