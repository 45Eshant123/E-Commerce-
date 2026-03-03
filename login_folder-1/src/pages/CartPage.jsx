import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
    const { toast } = useToast();

    const handleNotImplemented = (action) => {
        toast({
            title: "Feature Coming Soon",
            description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
        });
    };

    const mockCartItems = [
        {
            id: 1,
            title: 'Premium Headphones',
            price: 199.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop'
        },
        {
            id: 2,
            title: 'Smart Watch',
            price: 299.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
        }
    ];

    const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 15.00;
    const total = subtotal + shipping;

    return (
        <>
            <Helmet>
                <title>Shopping Cart - ShopHub</title>
                <meta name="description" content="Review items in your shopping cart and proceed to checkout." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <ShoppingCart size={32} className="text-purple-600" />
                            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="p-6 space-y-6">
                                {mockCartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                            <p className="text-purple-600 font-semibold text-xl mt-1">
                                                ${item.price.toFixed(2)}
                                            </p>
                                            <div className="flex items-center gap-3 mt-3">
                                                <button
                                                    onClick={() => handleNotImplemented('decrease')}
                                                    className="p-1 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="font-semibold text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleNotImplemented('increase')}
                                                    className="p-1 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleNotImplemented('remove')}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 p-6 bg-gray-50">
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleNotImplemented('checkout')}
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                                >
                                    Proceed to Checkout
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default CartPage;