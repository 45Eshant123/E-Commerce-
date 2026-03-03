import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ChevronRight, Cookie, ArrowLeft } from 'lucide-react';

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Cookie Policy - ShopHub</title>
        <meta name="description" content="Learn how ShopHub uses cookies and tracking technologies." />
      </Helmet>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Cookie Policy</span>
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
            <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <Cookie className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Cookie Policy</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">How cookies are used to improve your ShopHub experience.</p>
          </div>

          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">What Are Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Cookies are small text files stored on your device to remember preferences, improve functionality, and analyze usage.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Types We Use</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">We use essential cookies for core features, analytics cookies for performance insights, and preference cookies for personalization.</p>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Managing Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">You can control cookie settings in your browser. Disabling some cookies may affect site functionality.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CookiePolicyPage;
