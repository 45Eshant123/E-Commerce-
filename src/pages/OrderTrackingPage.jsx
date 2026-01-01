import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Truck, Package, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const mockTrackingData = {
    orderId: 'SH-123456789',
    status: 'In Transit',
    estimatedDelivery: 'December 15, 2024',
    trackingSteps: [
      {
        status: 'Order Placed',
        date: 'Dec 10, 2024',
        time: '2:30 PM',
        completed: true,
        description: 'Your order has been confirmed and payment processed.'
      },
      {
        status: 'Order Processed',
        date: 'Dec 11, 2024',
        time: '9:15 AM',
        completed: true,
        description: 'Your order is being prepared for shipment.'
      },
      {
        status: 'Shipped',
        date: 'Dec 12, 2024',
        time: '4:45 PM',
        completed: true,
        description: 'Your order has been shipped and is on its way.'
      },
      {
        status: 'In Transit',
        date: 'Dec 13, 2024',
        time: '8:20 AM',
        completed: true,
        description: 'Your package is in transit to the delivery address.'
      },
      {
        status: 'Out for Delivery',
        date: 'Dec 15, 2024',
        time: 'Expected',
        completed: false,
        description: 'Your package will be delivered today.'
      },
      {
        status: 'Delivered',
        date: 'Dec 15, 2024',
        time: 'Expected',
        completed: false,
        description: 'Package delivered successfully.'
      }
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    carrier: 'FedEx',
    trackingNumber: '9405511899223345'
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    // Mock tracking - in real app, this would call an API
    if (orderId && email) {
      setTrackingResult(mockTrackingData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Order Tracking - ShopHub</title>
        <meta name="description" content="Track your ShopHub order in real-time. Enter your order ID and email to see current status and delivery updates." />
      </Helmet>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/customer-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Customer Service</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Order Tracking</span>
          </nav>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Track Your Order
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Enter your order details below to see real-time updates on your shipment.
            </p>
          </motion.div>

          {/* Tracking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8"
          >
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="orderId" className="text-gray-700 dark:text-gray-300 font-medium">
                    Order ID
                  </Label>
                  <Input
                    id="orderId"
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g., SH-123456789"
                    required
                    className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="text-center">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  <Search className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Tracking Results */}
          {trackingResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Order Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order {trackingResult.orderId}</h2>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                    <div className="font-semibold text-green-600 dark:text-green-400">{trackingResult.status}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{trackingResult.estimatedDelivery}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Carrier:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{trackingResult.carrier}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Tracking Number:</span>
                    <div className="font-medium text-gray-900 dark:text-white">{trackingResult.trackingNumber}</div>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Tracking Timeline</h3>
                <div className="space-y-6">
                  {trackingResult.trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${
                            step.completed
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {step.status}
                          </h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {step.date} {step.time !== 'Expected' && step.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Shipping Information</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Delivery Address</div>
                    <div className="text-gray-600 dark:text-gray-300">{trackingResult.shippingAddress}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Help with Your Order?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Can't find your order or having issues? Our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/customer-service/contact-us"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/customer-service"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
              >
                Back to Customer Service
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default OrderTrackingPage;
