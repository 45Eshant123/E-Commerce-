import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Heart, Users2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CareersPage = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Continuous learning and career advancement paths'
    },
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Flexible schedules and remote work options'
    },
    {
      icon: Users2,
      title: 'Collaborative Culture',
      description: 'Inclusive environment with diverse perspectives'
    },
    {
      icon: Users,
      title: 'Team Spirit',
      description: 'Supportive colleagues and mentorship programs'
    }
  ];

  const openPositions = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York',
      type: 'Full-time'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Customer Success Manager',
      department: 'Support',
      location: 'London',
      type: 'Full-time'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Careers - ShopHub</title>
        <meta name="description" content="Join the ShopHub team and be part of shaping the future of e-commerce. Explore career opportunities and our company culture." />
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
              <Users className="w-16 h-16 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Careers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our dynamic team and be part of shaping the future of e-commerce.
            </p>
          </motion.div>

          {/* Why Join Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Why Join ShopHub?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent className="w-8 h-8 text-green-600 dark:text-green-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Open Positions</h2>
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{position.department}</span>
                        <span>{position.location}</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Culture Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Culture</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We foster a collaborative and inclusive work environment where innovation thrives. Our team members are passionate about making a positive impact on millions of customers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                View All Positions
              </button>
              <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CareersPage;
