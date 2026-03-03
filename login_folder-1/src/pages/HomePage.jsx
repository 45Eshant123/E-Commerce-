import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Shield, Truck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    const features = [
        {
            icon: ShoppingBag,
            title: 'Quality Products',
            description: 'Curated selection of premium items'
        },
        {
            icon: Truck,
            title: 'Fast Shipping',
            description: 'Free delivery on orders over ₹5000'
        },
        {
            icon: Shield,
            title: 'Secure Payment',
            description: 'Your transactions are always safe'
        },
        {
            icon: Heart,
            title: 'Wishlist',
            description: 'Save your favorite items for later'
        }
    ];

    const featuredProducts = [
        {
            id: 1,
            title: 'Premium Headphones',
            description: 'High-quality wireless audio experience',
            price: 1900,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
        },
        {
            id: 2,
            title: 'Apple Smart Watch',
            description: 'Track your fitness and stay connected',
            price: 25000,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
        },
        {
            id: 3,
            title: 'Laptop Backpack',
            description: 'Durable and stylish everyday carry',
            price: 2500,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
        },
        {
            id: 4,
            title: 'Wireless Mouse',
            description: 'Ergonomic design for all-day comfort',
            price: 8000,
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'
        }
    ];

    return (
        <>
            <Helmet>
                <title>ShopHub - Your Premium Shopping Destination</title>
                <meta name="description" content="Discover premium products at ShopHub. Quality items, fast shipping, and secure checkout. Shop the latest trends today!" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
                {/* Hero Section */}
                <section
                    className="relative h-screen flex items-center justify-center overflow-hidden"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1674027392842-29f8354e236c)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80"></div>
                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Welcome to ShopHub
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
                                Discover premium products curated just for you. Quality, style, and convenience in one place.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {isAuthenticated ? (
                                    <Link to="/cart">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                                        >
                                            Start Shopping
                                            <ArrowRight size={20} />
                                        </motion.button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/signup">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                                            >
                                                Get Started
                                            </motion.button>
                                        </Link>
                                        <Link to="/login">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-8 py-4 bg-transparent border-2 border-black-600 text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out"
                                            >
                                                Sign In
                                            </motion.button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose ShopHub?
                        </h2>
                        <p className="text-xl text-gray-600">
                            We're committed to providing the best shopping experience
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <feature.icon size={32} className="text-gray-900" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-center">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Featured Products
                            </h2>
                            <p className="text-xl text-gray-600">
                                Handpicked items just for you
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-purple-600">
                                                ₹{product.price}
                                            </span>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                                            >
                                                Add to Cart
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                {!isAuthenticated && (
                    <section className="pt-20 pb-36 bg-gradient-to-r from-purple-600 to-pink-600">
                        <div className="container mx-auto px-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    Ready to Start Shopping?
                                </h2>
                                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                    Join thousands of satisfied customers and discover amazing deals today!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link to="/signup">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                                        >
                                            Create Account
                                        </motion.button>
                                    </Link>
                                    <Link to="/login">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all"
                                        >
                                            Already have an account?
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default HomePage;