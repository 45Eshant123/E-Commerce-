import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import PaymentForm from '@/components/PaymentForm';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Lock, ArrowLeft } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState('details');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Checkout - ShopHub</title>
      </Helmet>

      <main className="flex-1 py-12 bg-gray-50 dark:bg-[var(--bg-dark)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2">
              {currentStep === 'details' ? (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-[#0B1220] rounded-lg p-8 shadow-sm space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
                      <Input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
                      <Input name="address" value={formData.address} onChange={handleInputChange} className="md:col-span-2" placeholder="Address" />
                      <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                      <Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="ZIP Code" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4" />
                    <span>Your information is secure</span>
                  </div>

                  <Button className="w-full" onClick={() => setCurrentStep('payment')}>
                    Proceed to Payment
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-[#0B1220] rounded-lg p-8 shadow-sm"
                >
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('details')}
                    className="mb-4 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Details
                  </Button>

                  <PaymentForm
                    amount={getCartTotal()}
                    cartItems={cart}
                    onSuccess={() => {
                      clearCart();
                      navigate('/order-success');
                    }}
                    onError={() => {
                      toast({
                        title: 'Payment Failed',
                        variant: 'destructive',
                      });
                      // Navigate to failure page after a short delay
                      setTimeout(() => {
                        navigate('/order-failure');
                      }, 1500);
                    }}
                  />
                </motion.div>
              )}
            </div>

            {/* RIGHT SIDE – ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="checkout-summary bg-white dark:bg-[#0B1220] rounded-lg p-6 shadow-sm sticky top-4"
              >
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
