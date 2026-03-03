import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Heart, User, LogOut, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { isAuthenticated, user, logout, logoutAllDevices } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    const handleLogout = () => {
        logout();
        setProfileDropdownOpen(false);
        navigate('/');
    };

    const handleLogoutAllDevices = () => {
        logoutAllDevices();
        setProfileDropdownOpen(false);
        navigate('/');
    };

    const navLinks = [
        { to: '/', label: 'Home', auth: false },
        { to: '/cart', label: 'Cart', auth: true, icon: ShoppingCart },
        { to: '/wishlist', label: 'Wishlist', auth: true, icon: Heart },
        { to: '/checkout', label: 'Checkout', auth: true },
        { to: '/orders', label: 'Orders', auth: true, icon: Package }
    ];

    const visibleLinks = navLinks.filter(link => !link.auth || isAuthenticated);

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold text-white"
                        >
                            ShopHub
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {visibleLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${location.pathname === link.to
                                        ? 'bg-white text-purple-600'
                                        : 'text-white hover:bg-white/20'
                                    }`}
                            >
                                {link.icon && <link.icon size={18} />}
                                {link.label}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg font-medium"
                                >
                                    <User size={18} />
                                    {user?.fullName?.split(' ')[0] || 'Account'}
                                </motion.button>

                                <AnimatePresence>
                                    {profileDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden"
                                        >
                                            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                                                <p className="font-semibold text-gray-900">{user?.fullName}</p>
                                                <p className="text-sm text-gray-600">{user?.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </button>
                                            <button
                                                onClick={handleLogoutAllDevices}
                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600 border-t"
                                            >
                                                <LogOut size={18} />
                                                Logout All Devices
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-white hover:bg-white/20 rounded-lg font-medium transition-all"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-all"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white p-2"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4"
                        >
                            <div className="flex flex-col gap-2">
                                {visibleLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${location.pathname === link.to
                                                ? 'bg-white text-purple-600'
                                                : 'text-white hover:bg-white/20'
                                            }`}
                                    >
                                        {link.icon && <link.icon size={18} />}
                                        {link.label}
                                    </Link>
                                ))}

                                {isAuthenticated ? (
                                    <>
                                        <div className="px-4 py-3 bg-white/20 rounded-lg text-white">
                                            <p className="font-semibold">{user?.fullName}</p>
                                            <p className="text-sm opacity-90">{user?.email}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/20 rounded-lg font-medium transition-all"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-3 text-white hover:bg-white/20 rounded-lg font-medium transition-all"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-all"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Header;