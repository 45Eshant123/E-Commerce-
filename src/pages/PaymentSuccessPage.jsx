import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Truck, Download, Mail } from 'lucide-react';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const paymentIntentId = searchParams.get('payment_intent');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // Trigger confetti animation on page load
    const triggerConfetti = () => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    };

    triggerConfetti();

    // Fetch order details from localStorage for mock payments
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      try {
        const orderData = JSON.parse(lastOrder);
        console.log('Order data from localStorage:', orderData);
        setOrderDetails(orderData);
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
      setLoading(false);
    } else if (orderId) {
      fetchOrderDetails();
    } else {
      // Create a default order details if none exists
      setOrderDetails({
        orderId: `ORD-${Date.now()}`,
        total: 0,
        date: new Date().toISOString(),
        items: [],
        status: 'confirmed'
      });
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      const data = await response.json();

      if (data.success) {
        setOrderDetails(data.order);
      }
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = () => {
    // Mock invoice download - in real app, this would generate a PDF
    const invoiceData = {
      orderId: orderDetails?.orderId || orderId,
      date: new Date().toLocaleDateString(),
      items: orderDetails?.items || [],
      total: orderDetails?.totalAmount || 0
    };

    const dataStr = JSON.stringify(invoiceData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `invoice-${orderDetails?.orderId || orderId}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <Helmet>
        <title>Payment Successful - ShopHub</title>
        <meta name="description" content="Your payment has been processed successfully" />
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
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </motion.div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Successful! 🎉
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
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
                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      ))}
                    </div>
                  ) : orderDetails ? (
                    <>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="font-medium">Order ID:</span>
                        <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {orderDetails.orderId}
                        </span>
                      </div>

                      {paymentIntentId && (
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="font-medium">Payment ID:</span>
                          <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {paymentIntentId}
                          </span>
                        </div>
                      )}

                      {orderDetails.items && orderDetails.items.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Items Ordered:</h4>
                          {orderDetails.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} x {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="border-t pt-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>${(orderDetails.total || orderDetails.totalAmount || 0).toFixed(2)}</span>
                        </div>
                      </div>

                      {orderDetails.date && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Order Date: {formatDate(orderDetails.date)}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Order details will be sent to your email.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Delivery & Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-6"
            >
              {/* Delivery Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Order Confirmed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm">Processing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm">Shipped</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm">Delivered</span>
                    </div>
                  </div>

                  {orderDetails?.shipping?.estimatedDelivery && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Estimated Delivery:</strong><br />
                        {formatDate(orderDetails.shipping.estimatedDelivery)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => navigate('/')}
                    className="w-full"
                    size="lg"
                  >
                    Continue Shopping
                  </Button>

                  <Button
                    onClick={() => navigate('/profile')}
                    variant="outline"
                    className="w-full"
                  >
                    View Order History
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleDownloadInvoice}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Invoice
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccessPage;
