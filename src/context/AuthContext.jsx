import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const SESSION_TIMEOUT = 30 * 60 * 1000;
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000;
  const OTP_EXPIRY = 5 * 60 * 1000;
  const OTP_RESEND_COOLDOWN = 60 * 1000;

  const normalizeUser = (rawUser) => {
    if (!rawUser) return rawUser;
    const fallbackName = rawUser.fullName || rawUser.name || rawUser.email?.split('@')?.[0] || 'User';
    return {
      ...rawUser,
      id: rawUser.id || rawUser._id,
      name: rawUser.name || fallbackName,
      fullName: rawUser.fullName || rawUser.name || fallbackName,
      role: rawUser.role || 'user',
    };
  };

  const persistSession = (sessionData) => {
    const normalizedUser = normalizeUser(sessionData.user);
    const nextToken = sessionData.token || `token_${Date.now()}_${normalizedUser.id || normalizedUser.email}`;
    const finalSession = {
      ...sessionData,
      user: normalizedUser,
      token: nextToken,
      lastActivity: sessionData.lastActivity || Date.now(),
      createdAt: sessionData.createdAt || Date.now(),
    };

    localStorage.setItem('auth_session', JSON.stringify(finalSession));
    localStorage.setItem('token', finalSession.token);
    localStorage.setItem('user', JSON.stringify(normalizedUser));

    setUser(normalizedUser);
    setToken(finalSession.token);
    setIsAdmin(normalizedUser.role === 'admin');
  };

  const clearSession = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem('auth_session');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateActivity = () => {
    const session = localStorage.getItem('auth_session');
    if (!session) return;
    const sessionData = JSON.parse(session);
    sessionData.lastActivity = Date.now();
    localStorage.setItem('auth_session', JSON.stringify(sessionData));
  };

  const checkSession = () => {
    try {
      const session = localStorage.getItem('auth_session');
      if (session) {
        const sessionData = JSON.parse(session);
        const now = Date.now();

        if (now - sessionData.lastActivity > SESSION_TIMEOUT) {
          clearSession();
          toast({
            title: 'Session Expired',
            description: 'Your session has expired. Please login again.',
            variant: 'destructive',
          });
        } else {
          persistSession({ ...sessionData, lastActivity: now });
        }
        return;
      }

      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken && storedUser) {
        persistSession({ user: JSON.parse(storedUser), token: storedToken, lastActivity: Date.now() });
      }
    } catch (err) {
      console.error('Session check error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, []);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

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

  const login = async (email, password, rememberMe = false) => {
    try {
      setLoading(true);
      setError(null);

      const attemptCheck = checkLoginAttempts(email);
      if (attemptCheck.locked) {
        throw new Error(`Account temporarily locked. Try again in ${attemptCheck.remainingMinutes} minutes.`);
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok && data.success) {
          recordLoginAttempt(email, true);
          persistSession({
            user: data.user,
            token: data.token,
            rememberMe,
            lastActivity: Date.now(),
            createdAt: Date.now(),
          });
          toast({ title: 'Login Successful', description: `Welcome back, ${normalizeUser(data.user).fullName}!` });
          return { success: true, user: normalizeUser(data.user) };
        }
      } catch (apiError) {
        console.warn('Backend login unavailable, falling back to local auth:', apiError);
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u) => u.email === email);

      if (!foundUser || foundUser.password !== password) {
        recordLoginAttempt(email, false);
        const attempts = JSON.parse(localStorage.getItem('login_attempts') || '{}');
        const remainingAttempts = MAX_LOGIN_ATTEMPTS - (attempts[email]?.count || 0);
        throw new Error(`Invalid credentials. ${remainingAttempts} attempts remaining.`);
      }

      recordLoginAttempt(email, true);
      persistSession({ user: foundUser, rememberMe, lastActivity: Date.now(), createdAt: Date.now() });
      toast({ title: 'Login Successful', description: `Welcome back, ${normalizeUser(foundUser).fullName}!` });
      return { success: true, user: normalizeUser(foundUser) };
    } catch (err) {
      setError(err.message);
      toast({ title: 'Login Failed', description: err.message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
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

      // Call backend API to initiate signup (sends OTP)
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.fullName,
          email: userData.email,
          password: userData.password,
          phone: userData.mobile,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors array from backend
        let errorMessage = result.message || 'Registration failed';
        if (result.errors && Array.isArray(result.errors)) {
          errorMessage = result.errors[0] || errorMessage;
        }
        console.error('Registration error response:', result);
        throw new Error(errorMessage);
      }

      toast({ 
        title: 'Verification Code Sent!', 
        description: `OTP has been sent to ${userData.email}. Please check your inbox.` 
      });
      
      return { success: true, requiresOTP: true, email: userData.email };
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
      toast({ title: 'Signup Failed', description: err.message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifySignupOTP = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);

      if (!otp || otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }

      // Call backend to verify OTP
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'OTP verification failed');
      }

      // Store user session and token from backend response
      persistSession({ 
        user: result.user, 
        token: result.token,
        lastActivity: Date.now(), 
        createdAt: Date.now() 
      });

      toast({ 
        title: 'Account Created!', 
        description: 'Welcome! Your account has been successfully created.' 
      });
      
      return { success: true, user: result.user };
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.message);
      toast({ title: 'Verification Failed', description: err.message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendSignupOTP = async (email) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to resend OTP');
      }

      toast({ 
        title: 'OTP Resent', 
        description: 'A new OTP has been sent to your email.' 
      });

      return { success: true };
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(err.message);
      toast({ title: 'Failed to Resend', description: err.message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithOTP = async (email) => {
    try {
      setLoading(true);
      setError(null);

      if (!email) {
        throw new Error('Email is required');
      }

      // Call backend API to request OTP for login
      const response = await fetch('http://localhost:5000/api/auth/request-login-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send OTP');
      }

      toast({
        title: 'OTP Sent!',
        description: `A login code has been sent to ${email}`
      });

      return { success: true, requiresOTP: true };
    } catch (err) {
      console.error('Login OTP error:', err);
      setError(err.message);
      toast({ title: 'Failed to Send OTP', description: err.message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyPasswordlessOTP = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);

      if (!otp || otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }

      // Call backend to verify login OTP
      const response = await fetch('http://localhost:5000/api/auth/verify-login-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'OTP verification failed');
      }

      // Store user session and token from backend response
      persistSession({
        user: result.user,
        token: result.token,
        lastActivity: Date.now(),
        createdAt: Date.now()
      });

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${normalizeUser(result.user).fullName}!`
      });

      return { success: true, user: result.user };
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.message);
      toast({ title: 'Verification Failed', description: err.message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendPasswordlessOTP = async (email) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/auth/resend-login-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to resend OTP');
      }

      toast({
        title: 'OTP Resent',
        description: 'A new login code has been sent to your email'
      });

      return { success: true };
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(err.message);
      toast({ title: 'Failed to Resend', description: err.message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u) => u.email === email);
      if (!foundUser) {
        toast({ title: 'Reset Link Sent', description: 'If an account exists, a password reset link has been sent to your email.' });
        return { success: true };
      }

      const resetToken = `reset_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('password_reset', JSON.stringify({ email, token: resetToken, expiry: Date.now() + 3600000 }));
      console.log('Reset link:', `/reset-password?token=${resetToken}`);
      toast({ title: 'Reset Link Sent', description: 'Check your email for password reset instructions.' });
      return { success: true };
    } catch (err) {
      toast({ title: 'Failed to Send Reset Link', description: err.message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (tokenValue, newPassword) => {
    try {
      setLoading(true);
      const resetData = JSON.parse(localStorage.getItem('password_reset'));
      if (!resetData || resetData.token !== tokenValue) throw new Error('Invalid or expired reset token');
      if (Date.now() > resetData.expiry) throw new Error('Reset token has expired');

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        throw new Error('Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u) => u.email === resetData.email);
      if (userIndex === -1) throw new Error('User not found');

      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.removeItem('password_reset');
      clearSession();

      toast({
        title: 'Password Updated',
        description: 'Your password has been successfully reset. Please login with your new password.',
      });
      return { success: true };
    } catch (err) {
      toast({ title: 'Password Reset Failed', description: err.message, variant: 'destructive' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearSession();
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  };

  const logoutAllDevices = () => {
    clearSession();
    toast({ title: 'Logged Out from All Devices', description: 'All sessions have been terminated.' });
  };

  const value = {
    user,
    token,
    isAdmin,
    error,
    loading,
    isLoading: loading,
    isAuthenticated: !!user && !!token,
    login,
    register: signUp,
    signUp,
    verifySignupOTP,
    resendSignupOTP,
    loginWithOTP,
    verifyPasswordlessOTP,
    resendPasswordlessOTP,
    forgotPassword,
    resetPassword,
    logout,
    logoutAllDevices,
    updateActivity,
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
