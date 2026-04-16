const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Configure Nodemailer with Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // Your Google App Password (16 characters)
    },
});

// Send OTP Email
const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'ShopHub - Your OTP Verification Code',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <h2 style="color: #333; text-align: center;">Verify Your Email</h2>
            <p style="color: #666; text-align: center; font-size: 16px;">
                Your ShopHub verification code is:
            </p>
            <div style="background-color: #fff; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
                <h1 style="color: #9333ea; letter-spacing: 5px; margin: 0;">${otp}</h1>
            </div>
            <p style="color: #999; text-align: center; font-size: 14px;">
                This code will expire in 5 minutes.
            </p>
            <p style="color: #999; text-align: center; font-size: 14px;">
            If you didn't request this, please ignore this email.
            </p>
        </div>
        </div>
        `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent:', info.response);
        return { success: true, message: 'OTP sent to email' };
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return { success: false, message: 'Failed to send OTP email', error: error.message };
    }
};

// Send Welcome Email
const sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to ShopHub!',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <h2 style="color: #333;">Welcome to ShopHub, ${name}!</h2>
            <p style="color: #666; font-size: 16px;">
                Your account has been successfully created. You can now start shopping with us.
            </p>
            <a href="http://localhost:3000" style="background-color: #9333ea; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 20px 0;">
                Start Shopping
            </a>
            <p style="color: #999; font-size: 14px;">
                If you have any questions, please contact our support team.
            </p>
        </div>
        </div>
    `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent:', info.response);
        return { success: true, message: 'Welcome email sent' };
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return { success: false, message: 'Failed to send welcome email', error: error.message };
    }
};

module.exports = {
    sendOTPEmail,
    sendWelcomeEmail,
    transporter,
};
