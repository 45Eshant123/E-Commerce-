import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import ReCaptchaWrapper from '@/components/ReCaptchaWrapper';
import { CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const { forgotPassword, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!recaptchaToken) {
            newErrors.recaptcha = 'Please verify you are not a robot';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            await forgotPassword(email);
            setSubmitted(true);
        } catch (error) {
            console.error('Forgot password error:', error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Forgot Password - ShopHub</title>
                <meta name="description" content="Reset your ShopHub password. We'll send you a secure reset link." />
            </Helmet>

            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
                >
                    {!submitted ? (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Forgot Password?</h1>
                            <p className="text-gray-600 mb-6 text-center">
                                Enter your email and we'll send you a reset link
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormInput
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors({ ...errors, email: '' });
                                    }}
                                    error={errors.email}
                                    required
                                    placeholder="john@example.com"
                                />

                                <ReCaptchaWrapper onChange={setRecaptchaToken} />
                                {errors.recaptcha && (
                                    <p className="text-sm text-red-500">{errors.recaptcha}</p>
                                )}

                                <FormButton type="submit" loading={loading}>
                                    Send Reset Link
                                </FormButton>
                            </form>

                            <p className="mt-6 text-center text-gray-600">
                                Remember your password?{' '}
                                <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700">
                                    Login
                                </Link>
                            </p>
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                            <p className="text-gray-600 mb-6">
                                If an account exists for {email}, you will receive a password reset link shortly.
                            </p>
                            <Link
                                to="/login"
                                className="text-purple-600 font-semibold hover:text-purple-700"
                            >
                                Back to Login
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default ForgotPasswordPage;