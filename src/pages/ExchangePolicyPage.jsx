import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, ArrowRightLeft, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const ExchangePolicyPage = () => {
  const exchangeOptions = [
    'Different size of same item',
    'Different color/variant',
    'Different product (price difference may apply)'
  ];

  const exchangeConditions = [
    { condition: 'Item must be unused', allowed: true },
    { condition: 'Within 14 days of delivery', allowed: true },
    { condition: 'Exchange item available in stock', allowed: true },
    { condition: 'Same or lower value preferred', allowed: true },
    { condition: 'Custom/personalized items', allowed: false },
    { condition: 'Items damaged by misuse', allowed: false }
  ];

  const process = [
    {
      step: 1,
      title: 'Initiate Exchange Request',
      description: 'Go to your orders and select "Exchange" instead of "Return" for the item.'
    },
    {
      step: 2,
      title: 'Choose Exchange Item',
      description: 'Browse and select the item you want to exchange for from our catalog.'
    },
    {
      step: 3,
      title: 'Review Price Difference',
      description: 'If the exchange item costs more, pay the difference. If less, receive a credit.'
    },
    {
      step: 4,
      title: 'Schedule Pickup',
      description: 'Arrange for pickup of the original item and delivery of the exchange item.'
    },
    {
      step: 5,
      title: 'Receive Exchange',
      description: 'Get your new item delivered once the original item is received and inspected.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Exchange Policy - ShopHub</title>
        <meta name="description" content="Learn about our exchange policy for sizes, colors, and products. Exchange items within 14 days of delivery." />
      </Helmet>

      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/returns-exchanges" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Returns & Exchanges</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Exchange Policy</span>
          </nav>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Link
              to="/returns-exchanges"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Returns & Exchanges
            </Link>
          </motion.div>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowRightLeft className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Exchange Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Information about exchanging items for different sizes, colors, or products.
            </p>
          </motion.div>

          {/* Exchange Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Exchange Options</h2>
            <div className="space-y-3">
              {exchangeOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{option}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Exchange Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Exchange Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exchangeConditions.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  {item.allowed ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <span className={`${
                    item.allowed ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400 line-through'
                  }`}>
                    {item.condition}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Exchange Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How to Exchange</h2>
            <div className="space-y-6">
              {process.map((step) => (
                <div key={step.step} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Price Differences</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  If the exchange item costs more, you'll be charged the difference. If it costs less, you'll receive a credit.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Exchange Timeline</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Exchanges typically take 5-7 business days from when we receive your original item.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multiple Exchanges</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  You can exchange an item only once. After that, only returns for refund are available.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Out of Stock Items</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  If your desired exchange item is out of stock, we'll offer alternatives or process a return.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExchangePolicyPage;
