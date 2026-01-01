import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, RefreshCw, Truck, CreditCard, ArrowRightLeft } from 'lucide-react';

const ReturnsExchangesPage = () => {
  const returnSections = [
    {
      title: 'Return Policy',
      description: 'Learn about return eligibility and conditions for your purchases.',
      icon: RefreshCw,
      color: 'bg-blue-500',
      href: '/returns-exchanges/return-policy',
      preview: 'Items can be returned within 14 days of delivery. Products must be unused and in original packaging.'
    },
    {
      title: 'How to Return',
      description: 'Step-by-step guide to initiate and complete your return process.',
      icon: Truck,
      color: 'bg-green-500',
      href: '/returns-exchanges/how-to-return',
      preview: 'Follow our simple 5-step process to return items quickly and easily.'
    },
    {
      title: 'Refund Process',
      description: 'Understand refund timelines and how refunds are processed.',
      icon: CreditCard,
      color: 'bg-purple-500',
      href: '/returns-exchanges/refund-process',
      preview: 'Refunds are processed within 3-5 business days after we receive your returned item.'
    },
    {
      title: 'Exchange Policy',
      description: 'Information about exchanging items for different sizes, colors, or products.',
      icon: ArrowRightLeft,
      color: 'bg-orange-500',
      href: '/returns-exchanges/exchange-policy',
      preview: 'Exchange for different sizes, colors, or products with our simple policy.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Returns & Exchanges - ShopHub</title>
        <meta name="description" content="Easy returns, fast refunds, and simple exchanges. Return items within 14 days for a full refund or exchange." />
      </Helmet>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Returns & Exchanges
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Easy returns, fast refunds, and simple exchanges.
            </p>
          </motion.div>

          {/* Return Sections Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {returnSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-8 group hover:bg-[#febd69] dark:hover:bg-[#febd69] cursor-pointer"
                >
                  <Link to={section.href} className="block">
                    <div className={`w-16 h-16 ${section.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-900 dark:group-hover:text-gray-900 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {section.preview}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-900 transition-colors">
                      Learn more
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ReturnsExchangesPage;
