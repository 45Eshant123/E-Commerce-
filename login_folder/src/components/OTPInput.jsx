import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const OTPInput = ({ length = 6, value, onChange, error }) => {
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(Array(length).fill(''));

    useEffect(() => {
        if (value) {
            setOtp(value.split('').slice(0, length).concat(Array(length).fill('')).slice(0, length));
        }
    }, [value, length]);

    const handleChange = (index, digit) => {
        if (!/^\d*$/.test(digit)) return;

        const newOtp = [...otp];
        newOtp[index] = digit.slice(-1);
        setOtp(newOtp);
        onChange(newOtp.join(''));

        // Auto-focus next input
        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('').concat(Array(length).fill('')).slice(0, length);
        setOtp(newOtp);
        onChange(newOtp.join(''));

        const nextIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
    };

    return (
        <div className="w-full">
            <div className="flex gap-2 justify-center mb-2">
                {otp.map((digit, index) => (
                    <motion.input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className={`w-12 h-14 text-center text-2xl font-bold bg-white border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-900 ${error
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-purple-500 focus:border-transparent'
                            }`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                    />
                ))}
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 text-center"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default OTPInput;