import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

// TODO: Replace with Supabase client once integration is complete
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    const MAX_LOGIN_ATTEMPTS = 5;
    const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
    const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes
    const OTP_RESEND_COOLDOWN = 60 * 1000; // 60 seconds

    // Initialize auth state from localStorage
    useEffect(() => {
        checkSession();
        const interval = setInterval(checkSession, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const checkSession = () => {
        try {
            const session = localStorage.getItem('auth_session');
            if (session) {
                const sessionData = JSON.parse(session);
                const now = Date.now();

                // Check if session is expired
                if (now - sessionData.lastActivity > SESSION_TIMEOUT) {
                    logout();
                    toast({
                        title: "Session Expired",
                        description: "Your session has expired. Please login again.",
                        variant: "destructive"
                    });
                } else {
                    setUser(sessionData.user);
                    // Update last activity
                    sessionData.lastActivity = now;
                    localStorage.setItem('auth_session', JSON.stringify(sessionData));
                }
            }
        } catch (err) {
            console.error('Session check error:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateActivity = () => {
        const session = localStorage.getItem('auth_session');
        if (session) {
            const sessionData = JSON.parse(session);
            sessionData.lastActivity = Date.now();
            localStorage.setItem('auth_session', JSON.stringify(sessionData));
        }
    };

    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const checkLoginAttempts = (email) => {
        const attempts = JSON.parse(localStorage.getItem('login_attempts') || '{}');
        const userAttempts = attempts[email] || { count: 0, lockedUntil: null };

        if (userAttempts.lockedUntil && Date.now() < userAttempts.lockedUntil) {
            const remainingTime = Math.ceil((userAttempts.lockedUntil - Date.now()) / 1000 / 60);
            return { locked: true, remainingMinutes: remainingTime };
        }

        return { locked: false };
    };

    const recordLoginAttempt = (email, success) => {
        const attempts = JSON.parse(localStorage.getItem('login_attempts') || '{}');

        if (success) {
            delete attempts[email];
        } else {
            const userAttempts = attempts[email] || { count: 0, lockedUntil: null };
            userAttempts.count += 1;
            userAttempts.lastAttempt = Date.now();

            if (userAttempts.count >= MAX_LOGIN_ATTEMPTS) {
                userAttempts.lockedUntil = Date.now() + LOCKOUT_DURATION;
                userAttempts.count = 0;
            }

            attempts[email] = userAttempts;
        }

        localStorage.setItem('login_attempts', JSON.stringify(attempts));
    };

    const signUp = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            // Validate password strength
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(userData.password)) {
                throw new Error('Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character');
            }

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const existingUser = users.find(u => u.email === userData.email || u.mobile === userData.mobile);

            if (existingUser) {
                if (existingUser.email === userData.email) {
                    throw new Error('Email already registered');
                }
                if (existingUser.mobile === userData.mobile) {
                    throw new Error('Mobile number already registered');
                }
            }

            // Generate OTP for verification
            const otp = generateOTP();
            const otpExpiry = Date.now() + OTP_EXPIRY;

            // Store pending registration
            const pendingUser = {
                ...userData,
                id: Date.now().toString(),
                verified: false,
                otp,
                otpExpiry,
                otpAttempts: 0,
                createdAt: new Date().toISOString()
            };

            localStorage.setItem('pending_registration', JSON.stringify(pendingUser));

            // TODO: Send OTP via email/SMS using Supabase Edge Functions
            console.log('OTP for verification:', otp); // For development

            toast({
                title: "Verification Code Sent",
                description: `A 6-digit code has been sent to ${userData.email}. (Dev: ${otp})`
            });

            return { success: true, requiresOTP: true };
        } catch (err) {
            setError(err.message);
            toast({
                title: "Signup Failed",
                description: err.message,
                variant: "destructive"
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const verifySignupOTP = async (otp) => {
        try {
            const pendingUser = JSON.parse(localStorage.getItem('pending_registration'));

            if (!pendingUser) {
                throw new Error('No pending registration found');
            }

            if (Date.now() > pendingUser.otpExpiry) {
                throw new Error('OTP has expired. Please request a new one.');
            }

            if (pendingUser.otpAttempts >= 3) {
                throw new Error('Maximum OTP attempts exceeded. Please signup again.');
            }

            if (pendingUser.otp !== otp) {
                pendingUser.otpAttempts += 1;
                localStorage.setItem('pending_registration', JSON.stringify(pendingUser));
                throw new Error(`Invalid OTP. ${3 - pendingUser.otpAttempts} attempts remaining.`);
            }

            // Create verified user
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const newUser = {
                id: pendingUser.id,
                fullName: pendingUser.fullName,
                email: pendingUser.email,
                mobile: pendingUser.mobile,
                password: pendingUser.password, // TODO: Hash password in production
                verified: true,
                createdAt: pendingUser.createdAt
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.removeItem('pending_registration');

            // Create session
            const sessionData = {
                user: { id: newUser.id, fullName: newUser.fullName, email: newUser.email, mobile: newUser.mobile },
                token: `token_${Date.now()}_${newUser.id}`,
                lastActivity: Date.now(),
                createdAt: Date.now()
            };

            localStorage.setItem('auth_session', JSON.stringify(sessionData));
            setUser(sessionData.user);

            toast({
                title: "Account Created!",
                description: "Welcome! Your account has been successfully created."
            });

            return { success: true };
        } catch (err) {
            toast({
                title: "Verification Failed",
                description: err.message,
                variant: "destructive"
            });
            throw err;
        }
    };

    const resendSignupOTP = async () => {
        try {
            const pendingUser = JSON.parse(localStorage.getItem('pending_registration'));

            if (!pendingUser) {
                throw new Error('No pending registration found');
            }

            // Check resend cooldown
            const lastResend = pendingUser.lastOTPResend || 0;
            if (Date.now() - lastResend < OTP_RESEND_COOLDOWN) {
                const remainingSeconds = Math.ceil((OTP_RESEND_COOLDOWN - (Date.now() - lastResend)) / 1000);
                throw new Error(`Please wait ${remainingSeconds} seconds before requesting a new code`);
            }

            // Generate new OTP
            const otp = generateOTP();
            pendingUser.otp = otp;
            pendingUser.otpExpiry = Date.now() + OTP_EXPIRY;
            pendingUser.otpAttempts = 0;
            pendingUser.lastOTPResend = Date.now();

            localStorage.setItem('pending_registration', JSON.stringify(pendingUser));

            // TODO: Send OTP via email/SMS
            console.log('New OTP:', otp); // For development

            toast({
                title: "New Code Sent",
                description: `A new verification code has been sent. (Dev: ${otp})`
            });

            return { success: true };
        } catch (err) {
            toast({
                title: "Failed to Resend",
                description: err.message,
                variant: "destructive"
            });
            throw err;
        }
    };

    const login = async (email, password, rememberMe = false) => {
        try {
            setLoading(true);
            setError(null);

            // Check login attempts
            const attemptCheck = checkLoginAttempts(email);
            if (attemptCheck.locked) {
                throw new Error(`Account temporarily locked. Try again in ${attemptCheck.remainingMinutes} minutes.`);
            }

            // Find user
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email);

            if (!user || user.password !== password) {
                recordLoginAttempt(email, false);
                const attempts = JSON.parse(localStorage.getItem('login_attempts') || '{}');
                const remainingAttempts = MAX_LOGIN_ATTEMPTS - (attempts[email]?.count || 0);
                throw new Error(`Invalid credentials. ${remainingAttempts} attempts remaining.`);
            }

            recordLoginAttempt(email, true);

            // Create session
            const sessionData = {
                user: { id: user.id, fullName: user.fullName, email: user.email, mobile: user.mobile },
                token: `token_${Date.now()}_${user.id}`,
                lastActivity: Date.now(),
                createdAt: Date.now(),
                rememberMe
            };

            localStorage.setItem('auth_session', JSON.stringify(sessionData));
            setUser(sessionData.user);

            toast({
                title: "Login Successful",
                description: `Welcome back, ${user.fullName}!`
            });

            return { success: true };
        } catch (err) {
            setError(err.message);
            toast({
                title: "Login Failed",
                description: err.message,
                variant: "destructive"
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const loginWithOTP = async (email) => {
        try {
            setLoading(true);

            // Check rate limiting
            const otpRequests = JSON.parse(localStorage.getItem('otp_requests') || '{}');
            const userRequests = otpRequests[email] || [];
            const recentRequests = userRequests.filter(timestamp => Date.now() - timestamp < 3600000); // Last hour

            if (recentRequests.length >= 5) {
                throw new Error('Too many OTP requests. Please try again later.');
            }

            // Find user
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email);

            if (!user) {
                throw new Error('No account found with this email');
            }

            // Generate OTP
            const otp = generateOTP();
            const otpData = {
                email,
                otp,
                expiry: Date.now() + OTP_EXPIRY,
                attempts: 0
            };

            localStorage.setItem('passwordless_otp', JSON.stringify(otpData));

            // Update rate limiting
            recentRequests.push(Date.now());
            otpRequests[email] = recentRequests;
            localStorage.setItem('otp_requests', JSON.stringify(otpRequests));

            // TODO: Send OTP via email
            console.log('Passwordless OTP:', otp); // For development

            toast({
                title: "OTP Sent",
                description: `A login code has been sent to ${email}. (Dev: ${otp})`
            });

            return { success: true };
        } catch (err) {
            toast({
                title: "Failed to Send OTP",
                description: err.message,
                variant: "destructive"
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const verifyPasswordlessOTP = async (email, otp) => {
        try {
            const otpData = JSON.parse(localStorage.getItem('passwordless_otp'));

            if (!otpData || otpData.email !== email) {
                throw new Error('No OTP request found');
            }

            if (Date.now() > otpData.expiry) {
                throw new Error('OTP has expired');
            }

            if (otpData.attempts >= 3) {
                throw new Error('Maximum attempts exceeded');
            }

            if (otpData.otp !== otp) {
                otpData.attempts += 1;
                localStorage.setItem('passwordless_otp', JSON.stringify(otpData));
                throw new Error(`Invalid OTP. ${3 - otpData.attempts} attempts remaining.`);
            }

            // Find user and create session
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email);

            const sessionData = {
                user: { id: user.id, fullName: user.fullName, email: user.email, mobile: user.mobile },
                token: `token_${Date.now()}_${user.id}`,
                lastActivity: Date.now(),
                createdAt: Date.now()
            };

            localStorage.setItem('auth_session', JSON.stringify(sessionData));
            localStorage.removeItem('passwordless_otp');
            setUser(sessionData.user);

            toast({
                title: "Login Successful",
                description: `Welcome back, ${user.fullName}!`
            });

            return { success: true };
        } catch (err) {
            toast({
                title: "Verification Failed",
                description: err.message,
                variant: "destructive"
            });
            throw err;
        }
    };

    const forgotPassword = async (email) => {
        try {
            setLoading(true);

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email);

            if (!user) {
                // Don't reveal if email exists
                toast({
                    title: "Reset Link Sent",
                    description: "If an account exists, a password reset link has been sent to your email."
                });
                return { success: true };
            }

            // Generate reset token
            const resetToken = `reset_${Date.now()}_${Math.random().toString(36).substring(7)}`;
            const resetData = {
                email,
                token: resetToken,
                expiry: Date.now() + 3600000 // 1 hour
            };

            localStorage.setItem('password_reset', JSON.stringify(resetData));

            // TODO: Send reset link via email
            console.log('Reset link:', `/reset-password?token=${resetToken}`); // For development

            toast({
                title: "Reset Link Sent",
                description: "Check your email for password reset instructions."
            });

            return { success: true };
        } catch (err) {
            toast({
                title: "Failed to Send Reset Link",
                description: err.message,
                variant: "destructive"
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token, newPassword) => {
        try {
            setLoading(true);

            const resetData = JSON.parse(localStorage.getItem('password_reset'));

            if (!resetData || resetData.token !== token) {
                throw new Error('Invalid or expired reset token');
            }

            if (Date.now() > resetData.expiry) {
                throw new Error('Reset token has expired');
            }

            // Validate password
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(newPassword)) {
                throw new Error('Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character');
            }

            // Update password
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.email === resetData.email);

            if (userIndex === -1) {
                throw new Error('User not found');
            }

            users[userIndex].password = newPassword; // TODO: Hash in production
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.removeItem('password_reset');

            // Invalidate all sessions for this user
            const userId = users[userIndex].id;
            const currentSession = localStorage.getItem('auth_session');
            if (currentSession) {
                const session = JSON.parse(currentSession);
                if (session.user.id === userId) {
                    localStorage.removeItem('auth_session');
                    setUser(null);
                }
            }

            toast({
                title: "Password Updated",
                description: "Your password has been successfully reset. Please login with your new password."
            });

            return { success: true };
        } catch (err) {
            toast({
                title: "Password Reset Failed",
                description: err.message,
                variant: "destructive"
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_session');
        setUser(null);
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out."
        });
    };

    const logoutAllDevices = () => {
        // In production with Supabase, this would invalidate all refresh tokens
        localStorage.removeItem('auth_session');
        setUser(null);
        toast({
            title: "Logged Out from All Devices",
            description: "All sessions have been terminated."
        });
    };

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        signUp,
        verifySignupOTP,
        resendSignupOTP,
        login,
        loginWithOTP,
        verifyPasswordlessOTP,
        forgotPassword,
        resetPassword,
        logout,
        logoutAllDevices,
        updateActivity
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};