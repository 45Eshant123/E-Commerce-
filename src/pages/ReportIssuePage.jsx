import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, AlertTriangle, Package, Truck, CreditCard, MessageSquare, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ReportIssuePage = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    email: '',
    issueType: '',
    subject: '',
    description: '',
    priority: 'normal'
  });
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const issueTypes = [
    { value: 'damaged', label: 'Damaged Product', icon: Package, description: 'Product arrived damaged or defective' },
    { value: 'missing', label: 'Missing Item', icon: Package, description: 'Item missing from order' },
    { value: 'wrong', label: 'Wrong Item', icon: Package, description: 'Received different item than ordered' },
    { value: 'late', label: 'Late Delivery', icon: Truck, description: 'Order not delivered on time' },
    { value: 'payment', label: 'Payment Issue', icon: CreditCard, description: 'Billing or payment problems' },
    { value: 'other', label: 'Other', icon: MessageSquare, description: 'Different issue not listed above' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Issue reported:', formData, files);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="flex-1 flex items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Issue Reported Successfully
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We've received your report and will investigate the issue. You'll receive an email update within 24 hours.
            </p>
            <div className="space-y-4">
              <Link
                to="/customer-service"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Back to Customer Service
              </Link>
              <Link
                to="/customer-service/order-tracking"
                className="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Track Your Order
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Report an Issue - ShopHub</title>
        <meta name="description" content="Report damaged, missing, or incorrect items. Submit a support ticket for order issues and get help from our customer service team." />
      </Helmet>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/customer-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Customer Service</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Report an Issue</span>
          </nav>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Report an Issue
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Let us know about any problems with your order and we'll help resolve them quickly.
            </p>
          </motion.div>

          {/* Issue Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What type of issue are you experiencing?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {issueTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setFormData({ ...formData, issueType: type.value })}
                    className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                      formData.issueType === type.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <IconComponent className={`w-8 h-8 mb-3 ${
                      formData.issueType === type.value ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <h3 className={`font-semibold mb-2 ${
                      formData.issueType === type.value ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                    }`}>
                      {type.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{type.description}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Report Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Issue Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="orderId" className="text-gray-700 dark:text-gray-300 font-medium">
                  Order ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="orderId"
                  name="orderId"
                  type="text"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  placeholder="e.g., SH-123456789"
                  required
                  className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300 font-medium">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Brief description of the issue"
                required
                className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-700 dark:text-gray-300 font-medium">
                Detailed Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Please provide as much detail as possible about the issue..."
                required
                className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="priority" className="text-gray-700 dark:text-gray-300 font-medium">
                Priority Level
              </Label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="mt-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low - General inquiry</option>
                <option value="normal">Normal - Standard issue</option>
                <option value="high">High - Urgent issue</option>
                <option value="critical">Critical - Order cannot be fulfilled</option>
              </select>
            </div>

            <div>
              <Label htmlFor="files" className="text-gray-700 dark:text-gray-300 font-medium">
                Attach Photos (Optional)
              </Label>
              <div className="mt-2">
                <input
                  id="files"
                  name="files"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="files"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click to upload photos of the issue
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      PNG, JPG up to 10MB each
                    </p>
                  </div>
                </label>
                {files.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {files.length} file{files.length > 1 ? 's' : ''} selected
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {files.map((file, index) => (
                        <div key={index} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center pt-6">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Submit Issue Report
              </Button>
            </div>
          </motion.form>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              For urgent issues, contact our support team directly. We're here to help resolve your concerns quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/customer-service/contact-us"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Contact Support
              </Link>
              <a
                href="tel:1-800-SHOP-HUB"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
              >
                Call 1-800-SHOP-HUB
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ReportIssuePage;
