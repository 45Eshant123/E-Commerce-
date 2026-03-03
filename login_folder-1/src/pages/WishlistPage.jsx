import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WishlistPage = () => {
    const { toast } = useToast();

    const handleNotImplemented = (action) => {
        toast({
            title: "Feature Coming Soon",
            description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
        });
    };

    const mockWishlistItems = [
        {
            id: 1,
            title: 'Laptop Backpack',
            description: 'Durable and stylish everyday carry',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
        },
        {
            id: 2,
            title: 'Wireless Mouse',
            description: 'Ergonomic design for all-day comfort',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'
        },
        {
            id: 3,
            title: 'Mechanical Keyboard',
            description: 'Premium typing experience',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Wishlist - ShopHub</title>
                <meta name="description" content="View and manage your saved items in your ShopHub wishlist." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Heart size={32} className="text-pink-600 fill-pink-600" />
                            <h1 className="text-4xl font-bold text-gray-900">Wishlist</h1>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockWishlistItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4">{item.description}</p>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-bold text-purple-600">
                                                ${item.price}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleNotImplemented('add-to-cart')}
                                                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                                            >
                                                <ShoppingCart size={18} />
                                                Add to Cart
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleNotImplemented('remove')}
                                                className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default WishlistPage;