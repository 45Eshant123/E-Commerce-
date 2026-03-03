import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import OTPInput from '@/components/OTPInput';
import ReCaptchaWrapper from '@/components/ReCaptchaWrapper';

const PasswordlessOTPLoginPage = () => {
    const [step, setStep] = useState('request'); // 'request' or 'verify'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState({});
    const [otpError, setOtpError] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [resendCooldown, setResendCooldown] = useState(0);

    const { loginWithOTP, verifyPasswordlessOTP, loading } = useAuth();
    const navigate = useNavigate();

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

    const handleRequestOTP = async (e) => {
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
            await loginWithOTP(email);
            setStep('verify');
            startResendCooldown();
        } catch (error) {
            console.error('OTP request error:', error);
        }
    };

    const handleVerifyOTP = async () => {
        setOtpError('');

        if (otp.length !== 6) {
            setOtpError('Please enter all 6 digits');
            return;
        }

        try {
            await verifyPasswordlessOTP(email, otp);
            navigate('/');
        } catch (error) {
            setOtpError(error.message);
        }
    };

    const handleResendOTP = async () => {
        try {
            await loginWithOTP(email);
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
                <title>Passwordless Login - ShopHub</title>
                <meta name="description" content="Login to ShopHub using OTP. No password required." />
            </Helmet>

            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
                >
                    {step === 'request' ? (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Passwordless Login</h1>
                            <p className="text-gray-600 mb-6 text-center">We'll send you a one-time code</p>

                            <form onSubmit={handleRequestOTP} className="space-y-4">
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
                                    Send OTP
                                </FormButton>
                            </form>

                            <p className="mt-6 text-center text-gray-600">
                                <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700">
                                    Back to Login
                                </Link>
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Enter Code</h1>
                            <p className="text-gray-600 mb-6 text-center">
                                Code sent to {email}
                            </p>

                            <div className="space-y-6">
                                <OTPInput
                                    length={6}
                                    value={otp}
                                    onChange={setOtp}
                                    error={otpError}
                                />

                                <FormButton onClick={handleVerifyOTP} loading={loading}>
                                    Verify & Login
                                </FormButton>

                                <div className="text-center">
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

                                <button
                                    onClick={() => {
                                        setStep('request');
                                        setOtp('');
                                        setOtpError('');
                                    }}
                                    className="w-full text-gray-600 hover:text-gray-800"
                                >
                                    Change Email
                                </button>

                                <p className="text-sm text-gray-500 text-center">
                                    Code expires in 5 minutes
                                </p>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default PasswordlessOTPLoginPage;