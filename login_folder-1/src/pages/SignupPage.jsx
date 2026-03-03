import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import OTPInput from '@/components/OTPInput';
import ReCaptchaWrapper from '@/components/ReCaptchaWrapper';
import { X } from 'lucide-react';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        honeypot: ''
    });
    const [errors, setErrors] = useState({});
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);

    const { signUp, verifySignupOTP, resendSignupOTP, loading } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.mobile)) {
            newErrors.mobile = 'Invalid mobile number';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
            newErrors.password = 'Password must be 8+ characters with 1 uppercase, 1 number, 1 special character';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!recaptchaToken) {
            newErrors.recaptcha = 'Please verify you are not a robot';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.honeypot) {
            return;
        }

        if (!validateForm()) {
            return;
        }

        try {
            const result = await signUp({
                fullName: formData.fullName,
                email: formData.email,
                mobile: formData.mobile,
                password: formData.password
            });

            if (result.requiresOTP) {
                setShowOTPModal(true);
                startResendCooldown();
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    const startResendCooldown = () => {
        setResendCooldown(60);
        const interval = setInterval(() => {
            setResendCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleVerifyOTP = async () => {
        setOtpError('');

        if (otp.length !== 6) {
            setOtpError('Please enter all 6 digits');
            return;
        }

        try {
            await verifySignupOTP(otp);
            setShowOTPModal(false);
            navigate('/');
        } catch (error) {
            setOtpError(error.message);
        }
    };

    const handleResendOTP = async () => {
        try {
            await resendSignupOTP();
            setOtp('');
            setOtpError('');
            startResendCooldown();
        } catch (error) {
            setOtpError(error.message);
        }
    };

    return (
        <>
            <Helmet>
                <title>Sign Up - ShopHub</title>
                <meta name="description" content="Create your ShopHub account and start shopping today. Quick and secure registration." />
            </Helmet>

            <div
                className="min-h-screen flex items-center justify-center p-4"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1693045181224-9fc2f954f054)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-pink-900/70"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Create Account</h1>
                    <p className="text-gray-600 mb-6 text-center">Join ShopHub today</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormInput
                            label="Full Name"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                            required
                            placeholder="John Doe"
                        />

                        <FormInput
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                            placeholder="john@example.com"
                        />

                        <FormInput
                            label="Mobile Number"
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            error={errors.mobile}
                            required
                            placeholder="+1234567890"
                        />

                        <FormInput
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                            placeholder="••••••••"
                        />

                        <FormInput
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            required
                            placeholder="••••••••"
                        />

                        {/* Honeypot field */}
                        <input
                            type="text"
                            name="honeypot"
                            value={formData.honeypot}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            tabIndex="-1"
                            autoComplete="off"
                        />

                        <ReCaptchaWrapper onChange={setRecaptchaToken} />
                        {errors.recaptcha && (
                            <p className="text-sm text-red-500">{errors.recaptcha}</p>
                        )}

                        <FormButton type="submit" loading={loading}>
                            Sign Up
                        </FormButton>
                    </form>

                    <p className="mt-6 text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700">
                            Login
                        </Link>
                    </p>
                </motion.div>

                {/* OTP Verification Modal */}
                <AnimatePresence>
                    {showOTPModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                            onClick={() => setShowOTPModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Verify Email</h2>
                                    <button
                                        onClick={() => setShowOTPModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <p className="text-gray-600 mb-6 text-center">
                                    Enter the 6-digit code sent to {formData.email}
                                </p>

                                <OTPInput
                                    length={6}
                                    value={otp}
                                    onChange={setOtp}
                                    error={otpError}
                                />

                                <FormButton
                                    onClick={handleVerifyOTP}
                                    loading={loading}
                                    className="mt-6"
                                >
                                    Verify Code
                                </FormButton>

                                <div className="mt-4 text-center">
                                    {resendCooldown > 0 ? (
                                        <p className="text-gray-500">
                                            Resend code in {resendCooldown}s
                                        </p>
                                    ) : (
                                        <button
                                            onClick={handleResendOTP}
                                            className="text-purple-600 font-semibold hover:text-purple-700"
                                        >
                                            Resend Code
                                        </button>
                                    )}
                                </div>

                                <p className="mt-4 text-sm text-gray-500 text-center">
                                    Code expires in 5 minutes
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default SignupPage;