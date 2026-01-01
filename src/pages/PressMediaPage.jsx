import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Newspaper, Download, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PressMediaPage = () => {
  const pressReleases = [
    {
      title: 'ShopHub Launches Revolutionary AI-Powered Shopping Assistant',
      date: 'December 15, 2024',
      excerpt: 'New feature uses machine learning to provide personalized product recommendations...'
    },
    {
      title: 'ShopHub Achieves Carbon Neutral Status Across All Operations',
      date: 'November 28, 2024',
      excerpt: 'Company commits to sustainable practices with zero-waste fulfillment centers...'
    },
    {
      title: 'ShopHub Expands to 50 Countries Worldwide',
      date: 'October 10, 2024',
      excerpt: 'International growth milestone reached with enhanced shipping capabilities...'
    }
  ];

  const assets = [
    {
      name: 'Company Logo (PNG)',
      size: '2.3 MB',
      format: 'PNG'
    },
    {
      name: 'Brand Guidelines (PDF)',
      size: '5.1 MB',
      format: 'PDF'
    },
    {
      name: 'Product Photos (ZIP)',
      size: '45.8 MB',
      format: 'ZIP'
    },
    {
      name: 'Press Kit (PDF)',
      size: '8.7 MB',
      format: 'PDF'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Press & Media - ShopHub</title>
        <meta name="description" content="ShopHub press releases, media resources, and brand assets for journalists and media professionals." />
      </Helmet>

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
              <Newspaper className="w-16 h-16 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Press & Media
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to maintaining open and transparent communication with the media.
            </p>
          </motion.div>

          {/* Media Inquiries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Media Inquiries</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              For press releases, interviews, or media requests, please reach out to our communications team. We respond to all inquiries within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:press@shophub.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Press Team
              </a>
              <a
                href="tel:+1-555-PRESS"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
              >
                Call: +1 (555) PRESS
              </a>
            </div>
          </motion.div>

          {/* Press Releases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{release.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{release.date}</p>
                      <p className="text-gray-700 dark:text-gray-300">{release.excerpt}</p>
                    </div>
                    <button className="mt-4 md:mt-0 md:ml-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap">
                      Read More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Brand Assets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Brand Assets</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Download our official logos, brand guidelines, and high-resolution images for editorial use. All assets are available in various formats.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {assets.map((asset, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{asset.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{asset.size} • {asset.format}</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need More Information?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our press team is here to help journalists, bloggers, and industry analysts tell our story accurately and effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:press@shophub.com"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                Email Press Team
              </a>
              <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors">
                View All Releases
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PressMediaPage;
