import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, ArrowLeft, Clock, CheckCircle } from 'lucide-react';

const RefundProcessPage = () => {
  const refundMethods = [
    { method: 'Credit/Debit Card', time: '3–5 business days', refund: 'Original payment method' },
    { method: 'PayPal', time: '1–2 business days', refund: 'PayPal balance' },
    { method: 'Bank Transfer', time: '5–7 business days', refund: 'Direct bank deposit' }
  ];

  const timeline = [
    { step: 'Return Received', time: 'Day 1', description: 'Your return package arrives at our warehouse' },
    { step: 'Inspection', time: 'Day 1-2', description: 'Quality check to ensure item meets return policy' },
    { step: 'Approval', time: 'Day 2', description: 'Return approved and refund process initiated' },
    { step: 'Processing', time: 'Day 2-5', description: 'Refund processed through your payment method' },
    { step: 'Completed', time: 'Day 3-7', description: 'Refund appears in your account' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Refund Process - ShopHub</title>
        <meta name="description" content="Learn about our refund processing timeline and methods. Refunds are processed within 3-5 business days." />
      </Helmet>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/returns-exchanges" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Returns & Exchanges</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Refund Process</span>
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
            <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Refund Process
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understand refund timelines and how refunds are processed.
            </p>
          </motion.div>

          {/* Processing Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Processing Timeline</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              Refunds are processed within 3–5 business days after we receive your returned item.
            </p>

            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index < 4 ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                    }`}>
                      {index < 4 ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.step}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Refund Methods Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Refund Methods</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">
                      Payment Method
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">
                      Processing Time
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">
                      Refund Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {refundMethods.map((method, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                      <td className="border border-gray-300 dark:border-gray-600 px-6 py-4 text-gray-900 dark:text-white font-medium">
                        {method.method}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-6 py-4 text-gray-600 dark:text-gray-300">
                        {method.time}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-6 py-4 text-gray-600 dark:text-gray-300">
                        {method.refund}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Refund Notifications</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  You'll receive email notifications at each step of the refund process, including when the refund is issued.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Bank Processing</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Additional 1-2 business days may be required for your bank to process and display the refund in your account.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Partial Refunds</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  For partial refunds or store credit, the amount will be applied to your account immediately after approval.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Refund Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Track your refund status in your account under "My Orders" or contact customer service for updates.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default RefundProcessPage;
