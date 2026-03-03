import React from 'react';

const FormCheckbox = ({ label, name, checked, onChange, className = '' }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500 focus:ring-2 transition-all cursor-pointer"
            />
            <label htmlFor={name} className="ml-2 text-sm text-gray-700 cursor-pointer select-none">
                {label}
            </label>
        </div>
    );
};

export default FormCheckbox;
