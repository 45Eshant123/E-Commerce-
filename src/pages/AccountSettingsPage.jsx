import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ChevronDown, User, Lock, Shield, Eye, EyeOff } from 'lucide-react';

const AccountSettingsPage = () => {
  const { toast } = useToast();
  const [openSections, setOpenSections] = useState({});
  const [showPasswords, setShowPasswords] = useState({});
  const [profileData, setProfileData] = useState({
    fullName: 'Oh Oh Daddy',
    email: 'ooh@example.com',
    phone: '+91 9876543210',
    address: 'Delhi, India'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: false,
    emailNotifications: false,
    twoFactorAuth: false
  });

  // Load privacy settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('privacySettings');
    if (saved) {
      setPrivacySettings(JSON.parse(saved));
    }
  }, []);

  // Save privacy settings to localStorage
  useEffect(() => {
    localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
  }, [privacySettings]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyToggle = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const saveProfile = () => {
    // Mock save - in real app, this would call an API
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile information has been saved successfully.",
    });
  };

  const changePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch ❌",
        description: "New password and confirmation password do not match.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password Too Short ❌",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    // Mock password change - in real app, this would call an API
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    toast({
      title: "Password Changed! 🔒",
      description: "Your password has been updated successfully.",
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const Section = ({ title, icon: Icon, sectionKey, children }) => (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden"
      initial={false}
    >
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <motion.div
          animate={{ rotate: openSections[sectionKey] ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {openSections[sectionKey] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-8 pb-6"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Account Settings - ShopHub</title>
        <meta name="description" content="Manage your account settings, profile information, and privacy preferences" />
      </Helmet>

      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your profile, security, and privacy preferences</p>
            </div>

            {/* Edit Profile Section */}
            <Section title="Edit Profile Information" icon={User} sectionKey="profile">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleProfileChange('fullName', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => handleProfileChange('address', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={saveProfile} className="w-full md:w-auto">
                  Save Changes
                </Button>
              </div>
            </Section>

            {/* Change Password Section */}
            <Section title="Change Password" icon={Lock} sectionKey="password">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={changePassword} className="w-full md:w-auto">
                  Change Password
                </Button>
              </div>
            </Section>

            {/* Privacy Settings Section */}
            <Section title="Privacy Settings" icon={Shield} sectionKey="privacy">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Make Profile Public</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Allow other users to view your profile information</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.profilePublic}
                    onChange={() => handlePrivacyToggle('profilePublic')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Allow Email Notifications</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Receive order updates and promotional emails</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.emailNotifications}
                    onChange={() => handlePrivacyToggle('emailNotifications')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Enable Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Add an extra layer of security to your account</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.twoFactorAuth}
                    onChange={() => handlePrivacyToggle('twoFactorAuth')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </Section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountSettingsPage;
