import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle,
  Truck,
  Package,
  Clock,
  MapPin,
  CreditCard,
  Download,
  Home,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';

const CheckoutConfirmationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllItems, setShowAllItems] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const orderId = searchParams.get('order_id');
  const paymentIntentId = searchParams.get('payment_intent');

  useEffect(() => {
    // Trigger confetti animation on page load
    const triggerConfetti = () => {
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

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
    };

    triggerConfetti();

    // Fetch order data
    if (orderId) {
      fetchOrderData();
    } else {
      // If no order ID, redirect to home
      navigate('/');
    }
  }, [orderId, navigate]);

  // Auto-update delivery status progression
  useEffect(() => {
    // Start progression after initial load
    const progressionInterval = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < 5) {
          return prevStep + 1;
        }
        // Stop at final step
        return prevStep;
      });
    }, 5000); // Progress every 5 seconds (adjust timing as needed)

    // Cleanup interval on component unmount
    return () => clearInterval(progressionInterval);
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderData(data.order);
      } else {
        throw new Error('Failed to fetch order data');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      // For demo purposes, create mock data
      setOrderData({
        orderId: orderId || 'ORD-123456789',
        customerInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          address: '123 Main Street',
          city: 'Anytown',
          zipCode: '12345'
        },
        items: [
          {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: 299.99,
            quantity: 1,
            image: 'Modern wireless headphones with sleek black design'
          },
          {
            id: 2,
            name: 'Smart Fitness Watch',
            price: 199.99,
            quantity: 1,
            image: 'Sleek fitness smartwatch with digital display'
          }
        ],
        paymentInfo: {
          paymentIntentId: paymentIntentId || 'pi_mock_123456789',
          paymentMethod: 'card',
          amount: 499.98,
          status: 'succeeded'
        },
        totalAmount: 499.98,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'confirmed',
        createdAt: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getDeliveryStatus = () => {
    const steps = [
      { label: 'Order Placed', completed: currentStep >= 1 },
      { label: 'Processing', completed: currentStep >= 2 },
      { label: 'Shipped', completed: currentStep >= 3 },
      { label: 'Out for Delivery', completed: currentStep >= 4 },
      { label: 'Delivered', completed: currentStep >= 5 }
    ];
    return steps;
  };

  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download a PDF
    alert('Invoice download feature would be implemented here. For now, you can print this page.');
    window.print();
  };

  const handleTrackOrder = () => {
    navigate('/customer-service/order-tracking');
  };

  const handleContactSupport = () => {
    navigate('/customer-service/contact-us');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your order confirmation...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Unable to load order details.</p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const deliverySteps = getDeliveryStatus();
  const displayedItems = showAllItems ? orderData.items : orderData.items.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <Helmet>
        <title>Order Confirmed - ShopHub</title>
        <meta name="description" content="Your order has been successfully placed. Track your delivery and manage your purchase." />
      </Helmet>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Success Header */}
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
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </motion.div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Order Confirmed!
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Thank you for your purchase. Your order has been successfully placed.
            </p>

            <p className="text-lg text-green-600 dark:text-green-400 font-medium">
              Order #{orderData.orderId}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                        <p className="font-medium">{orderData.orderId}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Order Date:</span>
                        <p className="font-medium">{formatDate(orderData.createdAt)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Payment ID:</span>
                        <p className="font-medium text-xs">{orderData.paymentInfo.paymentIntentId}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                        <p className="font-medium flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          {orderData.paymentInfo.paymentMethod === 'card' ? 'Credit/Debit Card' : orderData.paymentInfo.paymentMethod}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Paid:</span>
                        <span className="text-green-600 dark:text-green-400">
                          {formatCurrency(orderData.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Delivery Status */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Delivery Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Estimated delivery: {formatDate(orderData.estimatedDelivery)}</span>
                      </div>

                      <div className="space-y-3">
                        {deliverySteps.map((step, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.completed
                                ? index + 1 === currentStep
                                  ? 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400'
                                  : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                            }`}>
                              {step.completed ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </div>
                            <span className={`text-sm ${
                              step.completed
                                ? index + 1 === currentStep
                                  ? 'text-pink-600 dark:text-pink-400 font-medium'
                                  : 'text-gray-900 dark:text-white font-medium'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Products */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Items Ordered ({orderData.items.length})
                      </span>
                      {orderData.items.length > 3 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAllItems(!showAllItems)}
                          className="flex items-center gap-1"
                        >
                          {showAllItems ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Show All ({orderData.items.length - 3} more)
                            </>
                          )}
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {displayedItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Quantity: {item.quantity} × {formatCurrency(item.price)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {orderData.customerInfo.address}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {orderData.customerInfo.city}, {orderData.customerInfo.zipCode}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      {orderData.customerInfo.email}
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      Edit Address
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>What's Next?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={() => navigate('/')}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>

                    <Button
                      onClick={handleTrackOrder}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Track Order
                    </Button>

                    <Button
                      onClick={handleDownloadInvoice}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Invoice
                    </Button>

                    <Button
                      onClick={handleContactSupport}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Promo Code */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        🎉 Get 10% off your next order!
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Use code: WELCOME10
                      </p>
                      <Button size="sm" className="w-full">
                        Copy Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutConfirmationPage;
