import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

// TODO: Replace with actual react-google-recaptcha once reCAPTCHA site key is configured
// import ReCAPTCHA from 'react-google-recaptcha';

const ReCaptchaWrapper = ({ onChange }) => {
    const [verified, setVerified] = useState(false);

    const handleVerify = () => {
        // Simulate reCAPTCHA verification
        setVerified(true);
        onChange('simulated-recaptcha-token');
    };

    // TODO: Use actual reCAPTCHA component when configured
    // return (
    //   <ReCAPTCHA
    //     sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
    //     onChange={onChange}
    //   />
    // );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center p-4 bg-gray-50 border-2 border-gray-200 rounded-lg"
        >
            <button
                type="button"
                onClick={handleVerify}
                disabled={verified}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${verified
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
            >
                <Shield size={20} className={verified ? 'text-green-600' : 'text-gray-600'} />
                {verified ? "I'm not a robot ✓" : "I'm not a robot"}
            </button>
            <span className="ml-3 text-xs text-gray-500">
                (Demo Mode - Auto-verify)
            </span>
        </motion.div>
    );
};

export default ReCaptchaWrapper;