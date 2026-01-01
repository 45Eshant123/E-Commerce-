import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building, Target, Heart, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>About Us - ShopHub</title>
        <meta name="description" content="Learn about ShopHub's mission, values, and commitment to providing exceptional online shopping experiences." />
      </Helmet>

      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/company"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Company
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-4">
              <Building className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Founded in 2025, ShopHub has been revolutionizing online shopping experiences worldwide.
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Our Story */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                What started as a small team with a big vision has grown into a trusted e-commerce platform serving customers worldwide. We believe in making quality products accessible to everyone while maintaining the highest standards of customer service and sustainability.
              </p>
            </div>

            {/* Mission & Values */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  To provide exceptional products at competitive prices while delivering unparalleled customer service and fostering sustainable shopping practices.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Values</h3>
                </div>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• Customer-first approach in everything we do</li>
                  <li>• Integrity and transparency in our operations</li>
                  <li>• Innovation and continuous improvement</li>
                  <li>• Sustainability and social responsibility</li>
                </ul>
              </motion.div>
            </div>

            {/* Commitment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Commitment</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We are committed to quality, innovation, and customer satisfaction. Every product in our catalog is carefully selected to meet our high standards of excellence. We continuously work to improve our platform, expand our product offerings, and enhance the shopping experience for our valued customers.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2020</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">1M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
