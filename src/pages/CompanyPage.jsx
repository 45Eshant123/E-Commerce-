import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building, Users, Newspaper, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CompanyPage = () => {
  const sections = [
    {
      id: 'about',
      title: 'About Us',
      icon: Building,
      color: 'text-blue-600 dark:text-blue-400',
      path: '/company/about-us',
      description: 'Learn about our story, mission, and values that drive everything we do.'
    },
    {
      id: 'careers',
      title: 'Careers',
      icon: Users,
      color: 'text-green-600 dark:text-green-400',
      path: '/company/careers',
      description: 'Join our dynamic team and be part of shaping the future of e-commerce.'
    },
    {
      id: 'press',
      title: 'Press & Media',
      icon: Newspaper,
      color: 'text-purple-600 dark:text-purple-400',
      path: '/company/press-media',
      description: 'Press releases, media resources, and brand assets for journalists.'
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      icon: Leaf,
      color: 'text-orange-600 dark:text-orange-400',
      path: '/company/sustainability',
      description: 'Our commitment to environmental responsibility and sustainable practices.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Company - ShopHub</title>
        <meta name="description" content="Learn about ShopHub's mission, values, careers, and commitment to sustainability. Join our team and discover our story." />
      </Helmet>

      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Company
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn more about who we are and what we stand for.
            </p>
          </motion.div>

          {/* Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <Link
                    to={section.path}
                    className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <IconComponent className={`w-10 h-10 ${section.color}`} />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {section.description}
                    </p>
                    <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      Learn More →
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Have questions about our company, careers, or sustainability initiatives? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/customer-service"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="mailto:hello@shophub.com"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyPage;
