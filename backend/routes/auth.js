const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOTPEmail, sendWelcomeEmail } = require('../utils/emailService');

const router = express.Router();

// Store OTP temporarily (in production, use Redis or database)
const otpStore = {};

// Generate random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Validation middleware
const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 50) {
    errors.push('Name must be a string between 1 and 50 characters');
  }

  if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// POST /api/auth/register - Send OTP
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    console.log('Register request received:', { name, email, phone });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store OTP temporarily
    otpStore[email] = {
      otp,
      expiryTime,
      userData: { name, email, password, phone, address },
      attempts: 0,
    };

    // Send OTP via email
    const emailResult = await sendOTPEmail(email, otp);
    
    if (!emailResult.success) {
      delete otpStore[email];
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email',
        error: emailResult.error,
      });
    }

    console.log('OTP sent to:', email);

    res.status(200).json({
      success: true,
      message: 'OTP sent to your email. Please verify within 5 minutes.',
      requiresOTP: true,
    });

  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to register user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/auth/verify-otp - Verify OTP and create user
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Check if OTP exists
    const otpData = otpStore[email];
    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found. Please register again.'
      });
    }

    // Check if OTP is expired
    if (Date.now() > otpData.expiryTime) {
      delete otpStore[email];
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please register again.'
      });
    }

    // Check attempts
    if (otpData.attempts >= 3) {
      delete otpStore[email];
      return res.status(400).json({
        success: false,
        message: 'Maximum OTP attempts exceeded. Please register again.'
      });
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      otpData.attempts += 1;
      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${3 - otpData.attempts} attempts remaining.`
      });
    }

    // OTP verified, create user
    const { name, password, phone, address } = otpData.userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: address || {},
      role: 'user',
      isEmailVerified: true
    });

    await newUser.save();
    console.log('New user created and verified:', email);

    // Send welcome email
    await sendWelcomeEmail(email, name);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Clear OTP
    delete otpStore[email];

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
      role: newUser.role
    };

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/auth/resend-otp - Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const otpData = otpStore[email];
    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: 'No registration found for this email. Please register again.'
      });
    }

    // Generate new OTP
    const newOtp = generateOTP();
    otpData.otp = newOtp;
    otpData.expiryTime = Date.now() + 5 * 60 * 1000;
    otpData.attempts = 0;

    // Send new OTP
    const emailResult = await sendOTPEmail(email, newOtp);
    
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to resend OTP email'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP resent to your email'
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/auth/login - Direct login (without OTP)
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (without password) and token
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role
    };

    res.json({
      success: true,
      message: 'Login successful',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/auth/request-login-otp - Request OTP for login
router.post('/request-login-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No account found with this email'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiryTime = Date.now() + 5 * 60 * 1000;

    // Store OTP temporarily for login
    otpStore[`login_${email}`] = {
      otp,
      expiryTime,
      attempts: 0,
    };

    // Send OTP via email
    const emailResult = await sendOTPEmail(email, otp);
    
    if (!emailResult.success) {
      delete otpStore[`login_${email}`];
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email',
        error: emailResult.error,
      });
    }

    console.log('Login OTP sent to:', email);

    res.status(200).json({
      success: true,
      message: 'OTP sent to your email. Please verify within 5 minutes.',
      requiresOTP: true,
    });

  } catch (error) {
    console.error('Request login OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to request OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/auth/verify-login-otp - Verify OTP and login
router.post('/verify-login-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Check if OTP exists
    const otpData = otpStore[`login_${email}`];
    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: 'No OTP request found. Please request a new OTP.'
      });
    }

    // Check if OTP is expired
    if (Date.now() > otpData.expiryTime) {
      delete otpStore[`login_${email}`];
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Check attempts
    if (otpData.attempts >= 3) {
      delete otpStore[`login_${email}`];
      return res.status(400).json({
        success: false,
        message: 'Maximum OTP attempts exceeded. Please request a new OTP.'
      });
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      otpData.attempts += 1;
      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${3 - otpData.attempts} attempts remaining.`
      });
    }

    // OTP verified, find user and log in
    const user = await User.findOne({ email });
    if (!user) {
      delete otpStore[`login_${email}`];
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Clear OTP
    delete otpStore[`login_${email}`];

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role
    };

    console.log('User logged in with OTP:', email);

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Verify login OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/auth/resend-login-otp - Resend OTP for login
router.post('/resend-login-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const otpData = otpStore[`login_${email}`];
    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: 'No OTP request found. Please request a new OTP.'
      });
    }

    // Generate new OTP
    const newOtp = generateOTP();
    otpData.otp = newOtp;
    otpData.expiryTime = Date.now() + 5 * 60 * 1000;
    otpData.attempts = 0;

    // Send new OTP
    const emailResult = await sendOTPEmail(email, newOtp);
    
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to resend OTP email'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP resent to your email'
    });

  } catch (error) {
    console.error('Resend login OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Helpful route docs for manual API testing
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Auth API is running',
    routes: [
      { method: 'POST', path: '/api/auth/register' },
      { method: 'POST', path: '/api/auth/verify-otp' },
      { method: 'POST', path: '/api/auth/resend-otp' },
      { method: 'POST', path: '/api/auth/login' },
      { method: 'POST', path: '/api/auth/request-login-otp' },
      { method: 'POST', path: '/api/auth/verify-login-otp' },
      { method: 'POST', path: '/api/auth/resend-login-otp' }
    ]
  });
});

// Return 405 for known auth paths when called with wrong method.
router.all([
  '/register',
  '/verify-otp',
  '/resend-otp',
  '/login',
  '/request-login-otp',
  '/verify-login-otp',
  '/resend-login-otp'
], (req, res) => {
  res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed. Use POST ${req.baseUrl}${req.path}`
  });
});

module.exports = router;
