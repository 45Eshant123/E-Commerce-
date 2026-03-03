import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const { toast } = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Feature Coming Soon",
            description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
        });
    };

    const orderSummary = {
        subtotal: 499.98,
        shipping: 15.00,
        tax: 51.50,
        total: 566.48
    };

    return (
        <>
            <Helmet>
                <title>Checkout - ShopHub</title>
                <meta name="description" content="Complete your purchase securely with ShopHub's encrypted checkout." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <CreditCard size={32} className="text-purple-600" />
                            <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Information</h2>
                                            <div className="space-y-4">
                                                <FormInput
                                                    label="Full Name"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="John Doe"
                                                />
                                                <FormInput
                                                    label="Email"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="john@example.com"
                                                />
                                                <FormInput
                                                    label="Address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="123 Main St"
                                                />
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <FormInput
                                                        label="City"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="New York"
                                                    />
                                                    <FormInput
                                                        label="ZIP Code"
                                                        name="zipCode"
                                                        value={formData.zipCode}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="10001"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Information</h2>
                                            <div className="space-y-4">
                                                <FormInput
                                                    label="Card Number"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="1234 5678 9012 3456"
                                                />
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <FormInput
                                                        label="Expiry Date"
                                                        name="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="MM/YY"
                                                    />
                                                    <FormInput
                                                        label="CVV"
                                                        name="cvv"
                                                        value={formData.cvv}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="123"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                            <Lock size={16} className="text-green-600" />
                                            <span>Your payment information is encrypted and secure</span>
                                        </div>

                                        <FormButton type="submit">
                                            Complete Purchase
                                        </FormButton>
                                    </form>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-gray-700">
                                            <span>Subtotal</span>
                                            <span>${orderSummary.subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Shipping</span>
                                            <span>${orderSummary.shipping.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Tax</span>
                                            <span>${orderSummary.tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-2xl font-bold text-gray-900 pt-3 border-t">
                                            <span>Total</span>
                                            <span>${orderSummary.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;