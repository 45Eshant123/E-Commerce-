import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, ChevronDown, HelpCircle, ShoppingBag, Truck, RefreshCw, CreditCard, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HelpCenterPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqCategories = [
    {
      id: 'orders',
      title: 'Orders & Purchases',
      icon: ShoppingBag,
      color: 'bg-blue-500',
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'Browse our products, add items to your cart, and proceed to checkout. You can pay with credit card, PayPal, or other available payment methods.'
        },
        {
          question: 'Can I modify my order after placing it?',
          answer: 'Orders can be modified within 30 minutes of placement. Contact our support team immediately if you need changes.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers for select regions.'
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: Truck,
      color: 'bg-green-500',
      faqs: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery. International shipping varies by location.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination.'
        },
        {
          question: 'How much does shipping cost?',
          answer: 'Shipping costs depend on your location, order weight, and shipping method. Free shipping is available on orders over $50.'
        }
      ]
    },
    {
      id: 'returns',
      title: 'Returns & Exchanges',
      icon: RefreshCw,
      color: 'bg-orange-500',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Items must be unused and in original packaging with tags attached.'
        },
        {
          question: 'How do I return an item?',
          answer: 'Contact our support team to initiate a return. We\'ll provide a return label and instructions for packaging your item.'
        },
        {
          question: 'When will I get my refund?',
          answer: 'Refunds are processed within 3-5 business days after we receive your returned item. The refund will appear on your original payment method.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Login',
      icon: User,
      color: 'bg-purple-500',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" in the top right corner and fill out the registration form with your email and password.'
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Click "Forgot Password" on the login page and enter your email address. We\'ll send you a reset link.'
        },
        {
          question: 'Can I change my account information?',
          answer: 'Yes, go to your account settings to update your personal information, shipping addresses, and payment methods.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: HelpCircle,
      color: 'bg-red-500',
      faqs: [
        {
          question: 'The website is not loading properly',
          answer: 'Try clearing your browser cache and cookies, or try using a different browser. If the issue persists, contact our technical support.'
        },
        {
          question: 'I\'m having trouble with checkout',
          answer: 'Ensure your payment information is entered correctly. Try a different payment method or browser. Contact support if issues continue.'
        },
        {
          question: 'How do I contact customer service?',
          answer: 'You can reach us via phone at 1-800-SHOP-HUB, email at support@shophub.com, or through our live chat feature.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      color: 'bg-teal-500',
      faqs: [
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard SSL encryption and PCI compliance to protect your payment information.'
        },
        {
          question: 'How do you protect my personal data?',
          answer: 'We follow strict privacy policies and only collect necessary information. Your data is encrypted and never sold to third parties.'
        },
        {
          question: 'What information do you collect?',
          answer: 'We collect information you provide (name, email, shipping address) and automatically collected data (IP address, browsing behavior) to improve our services.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFAQ = (categoryId, faqIndex) => {
    const key = `${categoryId}-${faqIndex}`;
    setExpandedFAQ(expandedFAQ === key ? null : key);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Help Center - ShopHub</title>
        <meta name="description" content="Find answers to frequently asked questions about orders, shipping, returns, and more. Get help with your ShopHub experience." />
      </Helmet>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/customer-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Customer Service</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Help Center</span>
          </nav>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions and get the help you need.
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

          {/* FAQ Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {filteredCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category.title}</h2>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {category.faqs.map((faq, faqIndex) => {
                      const isExpanded = expandedFAQ === `${category.id}-${faqIndex}`;
                      return (
                        <div key={faqIndex} className="p-6">
                          <button
                            onClick={() => toggleFAQ(category.id, faqIndex)}
                            className="w-full flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-4 -m-4 transition-colors"
                          >
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                              {faq.question}
                            </h3>
                            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                              isExpanded ? 'rotate-180' : ''
                            }`} />
                          </button>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Still Need Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our customer service team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/customer-service/contact-us"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/customer-service/order-tracking"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
              >
                Track Order
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenterPage;
