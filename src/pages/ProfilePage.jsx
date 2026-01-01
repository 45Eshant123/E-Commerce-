import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { User, Package, CreditCard, Settings, LogOut, Save, Loader2, Edit3 } from 'lucide-react';

const ProfilePage = () => {
  const { toast } = useToast();
  const { user: authUser, token, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  // Check authentication and load user data on component mount
  useEffect(() => {
    if (authLoading) return; // Wait for auth context to load

    if (!authUser || !token) {
      // User not authenticated, redirect to login
      navigate('/login');
      return;
    }

    const loadUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load user data');
        }

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        } else {
          throw new Error(data.message || 'Failed to load user data');
        }
      } catch (error) {
        console.error('Load user error:', error);
        toast({
          title: "Error",
          description: "Failed to load user data. Please try logging in again.",
          variant: "destructive",
        });
        // Redirect to login on error
        logout();
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [authUser, token, authLoading, navigate, toast, logout]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setUser(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setUser(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    if (!user._id) {
      toast({
        title: "Error",
        description: "User ID not found. Please try logging in again.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const updateData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      };

      const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update local state with the server response
        setUser(data.user);

        // Update localStorage for persistence
        localStorage.setItem('userProfile', JSON.stringify(data.user));

        setIsEditing(false);
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Save profile error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reload user data to discard changes
    const loadUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error('Cancel reload error:', error);
      }
    };

    loadUserData();
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock orders for display
  const orders = [
    { id: "ORD123", date: "Nov 1, 2025", total: 2599, status: "Delivered", items: 3 },
    { id: "ORD124", date: "Nov 5, 2025", total: 1499, status: "In Transit", items: 2 },
    { id: "ORD125", date: "Nov 10, 2025", total: 899, status: "Processing", items: 1 }
  ];

  // Show loading while auth context is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>My Profile - ShopHub</title>
        <meta name="description" content="Manage your account, view orders, and update your profile" />
      </Helmet>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* User Info Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={user.avatar || 'https://via.placeholder.com/80x80?text=User'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                  <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Contact Information</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.state} {user.address.zipCode}, {user.address.country}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Account Status</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <p><strong>Member Since:</strong> January 2024</p>
                    <p><strong>Orders Placed:</strong> {orders.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order History</h2>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Order #{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{order.date} • {order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">${order.total}</p>
                        <p className={`text-sm font-medium ${
                          order.status === 'Delivered' ? 'text-green-600' :
                          order.status === 'In Transit' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h2>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">•••• •••• •••• 4589</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Expires 09/28</p>
                  </div>
                  <div className="text-green-600 font-medium">Primary</div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
              </div>

              <div className="space-y-4">
                <Link to="/account-settings" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    Edit Profile Information
                  </Button>
                </Link>
                <Link to="/account-settings" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                </Link>
                <Link to="/account-settings" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    Privacy Settings
                  </Button>
                </Link>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
