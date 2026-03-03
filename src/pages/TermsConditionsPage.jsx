import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, ArrowLeft } from 'lucide-react';

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Terms & Conditions - ShopHub</title>
        <meta name="description" content="Read ShopHub terms and conditions for using our website and services." />
      </Helmet>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Terms & Conditions</span>
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
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Terms & Conditions</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Rules and terms for using ShopHub services.</p>
          </div>

          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Use of Service</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">By using ShopHub, you agree to provide accurate information, maintain account security, and use the platform lawfully.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Orders and Payments</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">All orders are subject to availability, verification, and acceptance. Prices and offers may change without prior notice.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">ShopHub is not liable for indirect or consequential damages to the extent permitted by applicable law.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsConditionsPage;
