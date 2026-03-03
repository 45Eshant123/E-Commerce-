import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Privacy Policy - ShopHub</title>
        <meta name="description" content="Read the ShopHub privacy policy and understand how we collect, use, and protect your information." />
      </Helmet>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Privacy Policy</span>
          </nav>

          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">How we handle your personal data at ShopHub.</p>
          </div>

          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">We may collect account details, order history, device information, and support conversations to provide our services and improve your shopping experience.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How We Use Information</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Data is used for order fulfillment, fraud prevention, customer support, personalization, and legal compliance.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your Choices</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">You can update account details, request data deletion where applicable, and manage communication preferences from your profile settings.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
