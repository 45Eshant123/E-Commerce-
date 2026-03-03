import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import { CheckCircle, AlertCircle } from 'lucide-react';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [tokenValid, setTokenValid] = useState(true);
    const [resetSuccess, setResetSuccess] = useState(false);

    const { resetPassword, loading } = useAuth();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setTokenValid(false);
        }
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
            newErrors.password = 'Password must be 8+ characters with 1 uppercase, 1 number, 1 special character';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await resetPassword(token, formData.password);
            setResetSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            console.error('Reset password error:', error);
            if (error.message.includes('Invalid') || error.message.includes('expired')) {
                setTokenValid(false);
            }
        }
    };

    if (!tokenValid) {
        return (
            <>
                <Helmet>
                    <title>Invalid Reset Link - ShopHub</title>
                </Helmet>
                <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center"
                    >
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle size={32} className="text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
                        <p className="text-gray-600 mb-6">
                            This password reset link is invalid or has expired.
                        </p>
                        <button
                            onClick={() => navigate('/forgot-password')}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                            Request New Link
                        </button>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Reset Password - ShopHub</title>
                <meta name="description" content="Create a new password for your ShopHub account." />
            </Helmet>

            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
                >
                    {!resetSuccess ? (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Reset Password</h1>
                            <p className="text-gray-600 mb-6 text-center">
                                Enter your new password below
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormInput
                                    label="New Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    required
                                    placeholder="••••••••"
                                />

                                <FormInput
                                    label="Confirm New Password"
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={errors.confirmPassword}
                                    required
                                    placeholder="••••••••"
                                />

                                <FormButton type="submit" loading={loading}>
                                    Reset Password
                                </FormButton>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} className="text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
                            <p className="text-gray-600 mb-6">
                                Your password has been updated. All previous sessions have been terminated.
                            </p>
                            <p className="text-sm text-gray-500">
                                Redirecting to login page...
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default ResetPasswordPage;