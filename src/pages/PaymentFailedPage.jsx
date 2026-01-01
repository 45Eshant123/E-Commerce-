import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, RefreshCw, Phone, Mail, MessageCircle } from 'lucide-react';

const PaymentFailedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const errorMessage = searchParams.get('error') || 'Payment was cancelled or failed';
  const paymentIntentId = searchParams.get('payment_intent');

  const handleRetryPayment = () => {
    navigate('/checkout');
  };

  const handleContactSupport = (method) => {
    switch (method) {
      case 'email':
        window.location.href = 'mailto:support@shophub.com?subject=Payment Failed - Order Support';
        break;
      case 'phone':
        window.location.href = 'tel:+1-800-SHOP-HUB';
        break;
      case 'chat':
        // In a real app, this would open a chat widget
        alert('Chat support would open here. For now, please use email or phone.');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
      <Helmet>
        <title>Payment Failed - ShopHub</title>
        <meta name="description" content="Payment processing failed. Please try again or contact support." />
      </Helmet>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full mb-6"
            >
              <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </motion.div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Failed
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              We couldn't process your payment. Don't worry - your card wasn't charged.
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-red-800 dark:text-red-200">
                <strong>Error:</strong> {errorMessage}
              </p>
              {paymentIntentId && (
                <p className="text-xs text-red-700 dark:text-red-300 mt-2">
                  Payment ID: {paymentIntentId}
                </p>
              )}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Retry Payment */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    Try Again
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Payment failures can happen for various reasons. The most common causes are:
                  </p>

                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Insufficient funds in your account</li>
                    <li>• Incorrect card details</li>
                    <li>• Card expired or blocked</li>
                    <li>• Network connectivity issues</li>
                    <li>• Bank security restrictions</li>
                  </ul>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                      💡 Quick Tips:
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Check your card details and try again</li>
                      <li>• Ensure sufficient balance</li>
                      <li>• Try a different payment method</li>
                      <li>• Contact your bank if issues persist</li>
                    </ul>
                  </div>

                  <Button
                    onClick={handleRetryPayment}
                    className="w-full"
                    size="lg"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry Payment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Our support team is here to help you complete your purchase.
                    Contact us through any of the methods below.
                  </p>

                  <div className="space-y-3">
                    <Button
                      onClick={() => handleContactSupport('email')}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Mail className="w-4 h-4 mr-3" />
                      Email Support
                      <span className="ml-auto text-sm text-gray-500">
                        support@shophub.com
                      </span>
                    </Button>

                    <Button
                      onClick={() => handleContactSupport('phone')}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Phone className="w-4 h-4 mr-3" />
                      Call Support
                      <span className="ml-auto text-sm text-gray-500">
                        1-800-SHOP-HUB
                      </span>
                    </Button>

                    <Button
                      onClick={() => handleContactSupport('chat')}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <MessageCircle className="w-4 h-4 mr-3" />
                      Live Chat
                      <span className="ml-auto text-sm text-gray-500">
                        Available 24/7
                      </span>
                    </Button>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                      🚀 Alternative Actions:
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Save your cart and try later</li>
                      <li>• Use a different payment method</li>
                      <li>• Contact your bank for assistance</li>
                      <li>• Try again in a few minutes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
              >
                Continue Shopping
              </Button>

              <Button
                onClick={() => navigate('/cart')}
                variant="outline"
              >
                Review Cart
              </Button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              Having trouble? Our support team typically responds within 2 hours.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PaymentFailedPage;
