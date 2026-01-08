import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MessageCircle,
  Search,
  Phone,
  Mail,
  Truck,
  RefreshCw,
  CreditCard,
  Shield,
  HelpCircle,
  AlertTriangle,
  User,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

const CustomerServicePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showChat, setShowChat] = useState(false);

  const serviceSections = [
    {
      id: 'contact',
      title: 'Contact Us',
      description: 'Get in touch with our support team via email, chat, or phone.',
      icon: MessageCircle,
      color: 'bg-blue-500',
      href: '/customer-service/contact-us'
    },
    {
      id: 'tracking',
      title: 'Order Tracking',
      description: 'Track your order status in real-time using your order ID and email.',
      icon: Truck,
      color: 'bg-green-500',
      href: '/customer-service/order-tracking'
    },
    {
      id: 'help',
      title: 'Help Center',
      description: 'Browse frequently asked questions and self-help guides.',
      icon: HelpCircle,
      color: 'bg-purple-500',
      href: '/customer-service/help-center'
    },
    {
      id: 'report',
      title: 'Report an Issue',
      description: 'Submit a support ticket for damaged, missing, or incorrect products.',
      icon: AlertTriangle,
      color: 'bg-red-500',
      href: '/customer-service/report-issue'
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      description: 'View delivery options, shipping charges, and estimated delivery time.',
      icon: Truck,
      color: 'bg-orange-500',
      href: '/shipping-delivery'
    },
    {
      id: 'returns',
      title: 'Returns & Exchanges',
      description: 'Learn how to return or exchange your items easily.',
      icon: RefreshCw,
      color: 'bg-teal-500',
      href: '/returns-exchanges'
    },
    {
      id: 'account',
      title: 'Account & Payment Support',
      description: 'Assistance with login, payment methods, and cancellations.',
      icon: User,
      color: 'bg-indigo-500',
      href: '#account'
    },
    {
      id: 'warranty',
      title: 'Product Warranty',
      description: 'Information about product warranties and claims.',
      icon: Shield,
      color: 'bg-yellow-500',
      href: '#warranty'
    }
  ];

  const filteredSections = serviceSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Customer Service - ShopHub</title>
        <meta name="description" content="Get help with orders, returns, shipping, and more. We're here to help you 24/7." />
      </Helmet>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Customer Service</span>
          </nav>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Customer Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're here to help you 24/7 with orders, returns, and support.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search help topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
          </motion.div>

          {/* Service Sections Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          >
            {filteredSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 group cursor-pointer"
                  onClick={() => window.location.href = section.href}
                >
                  <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    Learn more
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                <Phone className="w-4 h-4 mr-2" />
                Call Us: 1-800-SHOP-HUB
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3">
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
        aria-label="Chat with us"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Modal (Simple implementation) */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-24 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80 z-50 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Chat with Us</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Hi! How can we help you today?
          </p>
          <div className="space-y-2">
            <Input
              placeholder="Type your message..."
              className="w-full"
            />
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Send Message
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomerServicePage;
