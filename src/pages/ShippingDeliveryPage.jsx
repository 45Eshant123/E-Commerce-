import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Truck, Package, DollarSign, Clock, Globe } from 'lucide-react';

const ShippingDeliveryPage = () => {
  const shippingSections = [
    {
      title: 'Shipping Info',
      description: 'Learn about our shipping policies and procedures',
      icon: Truck,
      href: '/shipping-info',
      color: 'bg-blue-500'
    },
    {
      title: 'Delivery Options',
      description: 'Choose from multiple delivery methods available',
      icon: Package,
      href: '/delivery-options',
      color: 'bg-green-500'
    },
    {
      title: 'Shipping Charges',
      description: 'View shipping costs and rates for your location',
      icon: DollarSign,
      href: '/shipping-charges',
      color: 'bg-orange-500'
    },
    {
      title: 'Estimated Delivery Time',
      description: 'Check expected delivery timelines for your orders',
      icon: Clock,
      href: '/estimated-delivery-time',
      color: 'bg-purple-500'
    },
    {
      title: 'International Shipping',
      description: 'Ship worldwide with our international delivery options',
      icon: Globe,
      href: '/international-shipping',
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Shipping & Delivery - ShopHub</title>
        <meta name="description" content="Learn about our shipping policies, delivery options, and international shipping services." />
      </Helmet>

      <main className="flex-1 py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Shipping & Delivery</span>
          </nav>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Shipping & Delivery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about how we deliver your orders safely and on time.
            </p>
          </motion.div>

          {/* Shipping Sections Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {shippingSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={section.href}
                    className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-8 group"
                  >
                    <div className={`w-16 h-16 ${section.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {section.description}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      Learn more
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Help with Shipping?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our customer service team is here to help with any shipping-related questions.
            </p>
            <Link
              to="/customer-service"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Contact Customer Service
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ShippingDeliveryPage;
