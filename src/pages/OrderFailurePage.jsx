import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { XCircle, RefreshCw, Home, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderFailurePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Order Failed - ShopHub</title>
        <meta name="description" content="There was an issue processing your order" />
      </Helmet>

      <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <XCircle className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Order Failed
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We couldn't process your order. Please try again or contact support.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                What happened?
              </h2>
              <div className="text-left space-y-3">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Payment declined</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your payment method was declined. Please check your card details or try a different payment method.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Insufficient funds</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your account doesn't have enough funds to complete this transaction.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Technical issue</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">There was a temporary technical issue. Your payment hasn't been charged.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Don't worry!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your cart items are still saved. You can try checking out again with the same or different payment method.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/checkout">
                <Button size="lg" className="gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </Button>
              </Link>
              <Link to="/cart">
                <Button size="lg" variant="outline" className="gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Review Cart
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline" className="gap-2">
                  <Home className="w-5 h-5" />
                  Go Home
                </Button>
              </Link>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our support team is here to help you complete your order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
                <Button variant="outline" size="sm">
                  Payment Help
                </Button>
                <Button variant="outline" size="sm">
                  Order FAQ
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default OrderFailurePage;
