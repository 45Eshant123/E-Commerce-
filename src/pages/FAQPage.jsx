import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle, Truck, CreditCard, RefreshCw, Shield, Phone } from 'lucide-react';

const FAQPage = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = [
    {
      icon: Truck,
      title: 'Shipping & Delivery',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) and overnight shipping are also available at checkout. International shipping may take 7-14 business days depending on the destination.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Customs fees and import duties may apply and are the responsibility of the recipient.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order status in your account dashboard under "Order History".'
        },
        {
          question: 'What if my package is damaged or lost?',
          answer: 'If your package arrives damaged, please contact us within 48 hours with photos of the damage. For lost packages, we\'ll work with the carrier to locate it or provide a replacement/refund.'
        }
      ]
    },
    {
      icon: CreditCard,
      title: 'Payment & Pricing',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely through encrypted connections.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard SSL encryption and PCI DSS compliant payment processors. We never store your full credit card information on our servers.'
        },
        {
          question: 'Do you offer price matching?',
          answer: 'We offer price matching within 30 days of purchase if you find the same item for less at a competitor. The item must be identical and in stock at the competitor.'
        },
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Items must be unused, in original packaging, and include all accessories. Return shipping is free for defective items.'
        }
      ]
    },
    {
      icon: RefreshCw,
      title: 'Returns & Exchanges',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      questions: [
        {
          question: 'How do I return an item?',
          answer: 'To initiate a return, log into your account and go to "Order History". Click "Return Item" next to the item you want to return. Print the return label and pack the item securely.'
        },
        {
          question: 'When will I get my refund?',
          answer: 'Refunds are processed within 3-5 business days after we receive your return. The refund will appear on your original payment method, though processing times vary by bank.'
        },
        {
          question: 'Can I exchange an item for a different size/color?',
          answer: 'Yes, exchanges are welcome within 30 days. The exchange item must be of equal or lesser value. If the exchange item is more expensive, you\'ll be charged the difference.'
        },
        {
          question: 'What items cannot be returned?',
          answer: 'Items that cannot be returned include: personalized/custom items, intimate apparel that has been worn, perishable goods, and items marked as final sale.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Account & Security',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" in the top right corner and fill out the registration form. You can also sign up during checkout. Accounts help you track orders, save addresses, and access exclusive deals.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page. Enter your email address and we\'ll send you a secure link to reset your password. The link expires in 24 hours.'
        },
        {
          question: 'Can I change my account information?',
          answer: 'Yes, go to "Account Settings" in your profile. You can update your name, email, phone number, addresses, and notification preferences.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'Account deletion requests can be submitted through "Account Settings" > "Privacy". We\'ll process your request within 30 days and delete all personal data.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FAQ - ShopHub</title>
        <meta name="description" content="Frequently asked questions about shipping, returns, payments, and more" />
      </Helmet>

      <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find answers to common questions about our products and services
            </p>
          </motion.div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
              >
                <div className={`${category.bgColor} px-6 py-4 border-b border-gray-200 dark:border-gray-700`}>
                  <div className="flex items-center gap-3">
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.title}
                    </h2>
                  </div>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 10 + faqIndex;
                    const isOpen = openItems.has(globalIndex);

                    return (
                      <div key={faqIndex} className="px-6 py-4">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-3 -m-3 transition-colors"
                        >
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center"
          >
            <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Still need help?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our customer service team is here to help.
              Contact us and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="font-medium text-gray-900 dark:text-white">Phone Support</p>
                <p className="text-gray-600 dark:text-gray-400">1-800-SHOP-HUB</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Mon-Fri 9AM-6PM EST</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="font-medium text-gray-900 dark:text-white">Email Support</p>
                <p className="text-gray-600 dark:text-gray-400">help@shophub.com</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">24/7 response within 24 hours</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="font-medium text-gray-900 dark:text-white">Live Chat</p>
                <p className="text-gray-600 dark:text-gray-400">Available on website</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Mon-Sun 8AM-10PM EST</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default FAQPage;
