import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingCartButton from '@/components/FloatingCartButton';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';

import GuestHeader from '../login_folder-1/src/components/Header';
import GuestHomePage from '../login_folder-1/src/pages/HomePage';

// Context Providers
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';

// Pages
import HomePage from '@/pages/HomePage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import SignupPage from '@/pages/SignupPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import PasswordlessOTPLoginPage from '@/pages/PasswordlessOTPLoginPage';
import ProfilePage from '@/pages/ProfilePage';
import WishlistPage from '@/pages/WishlistPage';
import ComparePage from '@/pages/ComparePage';
import OrderTrackingPage from '@/pages/OrderTrackingPage';
import CheckoutConfirmationPage from '@/pages/CheckoutConfirmationPage';
import OrderSuccessPage from '@/pages/OrderSuccessPage';
import OrderFailurePage from '@/pages/OrderFailurePage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import PaymentFailedPage from '@/pages/PaymentFailedPage';
import AboutUsPage from '@/pages/AboutUsPage';
import ContactUsPage from '@/pages/ContactUsPage';
import FAQPage from '@/pages/FAQPage';
import CompanyPage from '@/pages/CompanyPage';
import CareersPage from '@/pages/CareersPage';
import PressMediaPage from '@/pages/PressMediaPage';
import SustainabilityPage from '@/pages/SustainabilityPage';
import CustomerServicePage from '@/pages/CustomerServicePage';
import HelpCenterPage from '@/pages/HelpCenterPage';
import ShippingDeliveryPage from '@/pages/ShippingDeliveryPage';
import ReturnPolicyPage from '@/pages/ReturnPolicyPage';
import ReturnsExchangesPage from '@/pages/ReturnsExchangesPage';
import HowToReturnPage from '@/pages/HowToReturnPage';
import ExchangePolicyPage from '@/pages/ExchangePolicyPage';
import RefundProcessPage from '@/pages/RefundProcessPage';
import ReportIssuePage from '@/pages/ReportIssuePage';
import AccountSettingsPage from '@/pages/AccountSettingsPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsConditionsPage from '@/pages/TermsConditionsPage';
import CookiePolicyPage from '@/pages/CookiePolicyPage';

const AppShell = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const ActiveHeader = isAuthenticated ? Header : GuestHeader;
  const HomeInterface = isAuthenticated ? HomePage : GuestHomePage;
  const hideFooterOnRoutes = ['/exchange-policy'];
  const shouldShowFooter = !hideFooterOnRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <ScrollToTop />
      <ActiveHeader />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeInterface />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/passwordless-login" element={<PasswordlessOTPLoginPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderTrackingPage />
              </ProtectedRoute>
            }
          />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          <Route path="/checkout-confirmation" element={<CheckoutConfirmationPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/order-failure" element={<OrderFailurePage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-failed" element={<PaymentFailedPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/press" element={<PressMediaPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/customer-service" element={<CustomerServicePage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/shipping" element={<ShippingDeliveryPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/returns" element={<ReturnsExchangesPage />} />
          <Route path="/returns-exchanges" element={<ReturnsExchangesPage />} />
          <Route path="/how-to-return" element={<HowToReturnPage />} />
          <Route path="/exchange-policy" element={<ExchangePolicyPage />} />
          <Route path="/refund-process" element={<RefundProcessPage />} />
          <Route path="/returns-exchanges/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/returns-exchanges/how-to-return" element={<HowToReturnPage />} />
          <Route path="/returns-exchanges/refund-process" element={<RefundProcessPage />} />
          <Route path="/returns-exchanges/exchange-policy" element={<ExchangePolicyPage />} />
          <Route path="/report-issue" element={<ReportIssuePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/account-settings" element={<AccountSettingsPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
      <FloatingCartButton />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppShell />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
