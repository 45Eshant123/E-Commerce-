import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const FormButton = ({
    children,
    type = 'submit',
    loading = false,
    disabled = false,
    onClick,
    variant = 'primary',
    className = ''
}) => {
    const baseClasses = "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl",
        secondary: "bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50",
        outline: "bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            className={`${baseClasses} ${variants[variant]} ${className}`}
        >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {children}
        </motion.button>
    );
};

export default FormButton;