import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customerInfo = location.state?.formData || {};

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: randomInRange(50, 100),
        spread: randomInRange(50, 70),
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        }
      });

      confetti({
        particleCount,
        startVelocity: randomInRange(50, 100),
        spread: randomInRange(50, 70),
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const orderSteps = [
    {
      icon: CheckCircle,
      title: 'Order Confirmed',
      description: 'Your order has been successfully placed',
      completed: true,
    },
    {
      icon: Package,
      title: 'Order Processing',
      description: 'We\'re preparing your items',
      completed: true,
    },
    {
      icon: Truck,
      title: 'Shipping',
      description: 'Your order is on the way',
      completed: false,
    },
    {
      icon: Home,
      title: 'Delivered',
      description: 'Package delivered to your door',
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Order Successful - ShopHub</title>
        <meta name="description" content="Your order has been placed successfully" />
      </Helmet>

      <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Thank you for shopping with ShopHub. Your order is being processed.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Order Details</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Order Information</h3>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Order ID:</strong> #ORD-{Date.now()}</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Status:</strong> <span className="text-green-600 font-medium">Confirmed</span></p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Shipping Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">John Doe<br />123 Main St<br />New York, NY 10001</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900 dark:text-white">
              Order Progress
            </h2>

            <div className="relative">
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
              <div className="absolute top-8 left-8 h-0.5 bg-green-500" style={{ width: '50%' }}></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {orderSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}
                    >
                      <step.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className={`font-semibold mb-2 ${
                      step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/profile">
                <Button size="lg" variant="outline" className="gap-2">
                  <Package className="w-5 h-5" />
                  Track Order
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" className="gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our customer service team is here to help. Check your email for order confirmation and updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="sm">
                  Contact Support
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

export default OrderSuccessPage;
