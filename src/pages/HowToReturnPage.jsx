import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Truck, ArrowLeft, CheckCircle } from 'lucide-react';

const HowToReturnPage = () => {
  const steps = [
    {
      number: 1,
      title: 'Log in to your account and go to "My Orders"',
      description: 'Access your account dashboard and navigate to the orders section to view your purchase history.'
    },
    {
      number: 2,
      title: 'Select the item you want to return',
      description: 'Find the order containing the item and click on the "Return Item" or "Return" button next to it.'
    },
    {
      number: 3,
      title: 'Choose return reason and provide details',
      description: 'Select the most appropriate reason for return and add any additional comments or details about the issue.'
    },
    {
      number: 4,
      title: 'Print the return label and package the item',
      description: 'Download and print the prepaid return shipping label, then securely package the item in its original packaging.'
    },
    {
      number: 5,
      title: 'Schedule pickup or drop off at a collection point',
      description: 'Choose a convenient pickup time slot for our courier partner, or drop off the package at a designated collection point.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>How to Return - ShopHub</title>
        <meta name="description" content="Step-by-step guide to return items. Learn how to initiate returns, package items, and schedule pickup." />
      </Helmet>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/returns-exchanges" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Returns & Exchanges</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">How to Return</span>
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
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How to Return
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Step-by-step guide to initiate and complete your return process.
            </p>
          </motion.div>

          {/* Step-by-Step Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Return Shipping</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Prepaid return shipping labels are provided for most returns. Keep the tracking number for your records.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Processing Time</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Return requests are typically processed within 1-2 business days. You'll receive a confirmation email once approved.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Return Window</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  You have 14 days from delivery to initiate a return. Some items may have different return windows.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  If you encounter any issues during the return process, contact our customer service team for assistance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HowToReturnPage;
