import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import FormInput from '@/components/FormInput';
import FormCheckbox from '@/components/FormCheckbox';
import FormButton from '@/components/FormButton';
import ReCaptchaWrapper from '@/components/ReCaptchaWrapper';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
        honeypot: ''
    });
    const [errors, setErrors] = useState({});
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (!recaptchaToken) {
            newErrors.recaptcha = 'Please verify you are not a robot';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
            await login(formData.email, formData.password, formData.rememberMe);
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login - ShopHub</title>
                <meta name="description" content="Login to your ShopHub account to access your cart, wishlist, and orders." />
            </Helmet>

            <div
                className="min-h-screen flex items-center justify-center p-4"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1699736059098-ffea3debef5a)',
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h1>
                    <p className="text-gray-600 mb-6 text-center">Login to your account</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                            placeholder="••••••••"
                        />

                        <div className="flex items-center justify-between">
                            <FormCheckbox
                                label="Remember me"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <Link
                                to="/forgot-password"
                                className="text-sm text-purple-600 font-semibold hover:text-purple-700"
                            >
                                Forgot Password?
                            </Link>
                        </div>

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
                            Login
                        </FormButton>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/passwordless-login"
                            className="text-purple-600 font-semibold hover:text-purple-700"
                        >
                            Login with OTP instead
                        </Link>
                    </div>

                    <p className="mt-6 text-center text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-purple-600 font-semibold hover:text-purple-700">
                            Sign Up
                        </Link>
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default LoginPage;