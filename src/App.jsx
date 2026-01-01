import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingCartButton from '@/components/FloatingCartButton';

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

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <ScrollToTop />
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
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
                <Route path="/how-to-return" element={<HowToReturnPage />} />
                <Route path="/exchange-policy" element={<ExchangePolicyPage />} />
                <Route path="/refund-process" element={<RefundProcessPage />} />
                <Route path="/report-issue" element={<ReportIssuePage />} />
                <Route path="/account-settings" element={<AccountSettingsPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              </Routes>
            </main>
            <Footer />
            <FloatingCartButton />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
