import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Shopping Cart - ShopHub</title>
        </Helmet>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Shopping Cart - ShopHub</title>
      </Helmet>

      <main className="flex-1 py-12 bg-gray-50 dark:bg-[var(--bg-dark)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white dark:bg-[var(--card-dark)] rounded-lg p-6 shadow-sm"
                >
                  <div className="flex gap-6">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        alt={item.name}
                        className="w-full h-full object-cover"
                        src={item.image}
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.category}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="text-2xl font-bold text-blue-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div>
              <div className="bg-white text-gray-900 dark:bg-[#0B1220] dark:text-white rounded-xl p-6 shadow-lg border border-gray-200 dark:border-white/10 lg:sticky lg:top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-green-500">FREE</span>
                </div>

                <div className="border-t border-gray-200 dark:border-white/20 pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>

                <Button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-3 border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
