import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Truck, Battery, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SustainabilityPage = () => {
  const initiatives = [
    {
      icon: Truck,
      title: 'Carbon-Neutral Shipping',
      description: 'All orders are shipped with carbon-neutral carriers, offsetting emissions through verified reforestation projects.',
      impact: 'Reduced CO2 by 50,000 tons annually'
    },
    {
      icon: Recycle,
      title: 'Recycled Packaging',
      description: '100% of our packaging materials are made from recycled content and are fully recyclable.',
      impact: 'Saved 2.3 million plastic bottles from landfills'
    },
    {
      icon: Battery,
      title: 'Renewable Energy',
      description: 'Our fulfillment centers are powered by 100% renewable energy sources including solar and wind.',
      impact: 'Zero carbon footprint for operations'
    },
    {
      icon: Leaf,
      title: 'Sustainable Sourcing',
      description: 'We partner with suppliers committed to ethical manufacturing and responsible material sourcing.',
      impact: '90% of products from certified sustainable suppliers'
    }
  ];

  const goals = [
    {
      year: '2025',
      goal: 'Achieve 100% renewable energy usage across all operations',
      progress: 85
    },
    {
      year: '2026',
      goal: 'Zero waste to landfill in all fulfillment centers',
      progress: 70
    },
    {
      year: '2027',
      goal: 'Carbon neutral across entire supply chain',
      progress: 60
    },
    {
      year: '2030',
      goal: 'Net-zero emissions company-wide',
      progress: 45
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Sustainability - ShopHub</title>
        <meta name="description" content="ShopHub's commitment to sustainability, environmental initiatives, and responsible business practices." />
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
              <Leaf className="w-16 h-16 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Sustainability
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              At ShopHub, sustainability is not just a buzzword—it's a core part of our mission.
            </p>
          </motion.div>

          {/* Our Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Commitment</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We believe in responsible business practices that protect our planet and support our communities. Every decision we make considers our environmental impact and our responsibility to future generations.
            </p>
          </motion.div>

          {/* Eco-Friendly Initiatives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Eco-Friendly Initiatives</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {initiatives.map((initiative, index) => {
                const IconComponent = initiative.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{initiative.title}</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{initiative.description}</p>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">{initiative.impact}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Sustainability Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Our Goals</h2>
            <div className="space-y-6">
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.year}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{goal.goal}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{goal.progress}%</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Complete</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-orange-600 dark:bg-orange-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">50K</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tons CO2 Reduced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2.3M</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Plastic Bottles Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Renewable Energy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">90%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sustainable Suppliers</div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Every purchase you make helps support our sustainability initiatives. Together, we can make a positive impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
              >
                Shop Sustainably
              </Link>
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

export default SustainabilityPage;
