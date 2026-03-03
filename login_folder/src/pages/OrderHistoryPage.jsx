import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Package, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const OrderHistoryPage = () => {
    const { toast } = useToast();

    const handleNotImplemented = () => {
        toast({
            title: "Feature Coming Soon",
            description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
        });
    };

    const mockOrders = [
        {
            id: '#ORD-001',
            date: '2026-02-10',
            status: 'Delivered',
            total: 299.99,
            items: 2,
            statusColor: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            id: '#ORD-002',
            date: '2026-02-08',
            status: 'In Transit',
            total: 149.99,
            items: 1,
            statusColor: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            id: '#ORD-003',
            date: '2026-02-05',
            status: 'Processing',
            total: 499.98,
            items: 3,
            statusColor: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            id: '#ORD-004',
            date: '2026-01-28',
            status: 'Delivered',
            total: 79.99,
            items: 1,
            statusColor: 'text-green-600',
            bgColor: 'bg-green-50'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Order History - ShopHub</title>
                <meta name="description" content="View your order history and track your purchases on ShopHub." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Package size={32} className="text-purple-600" />
                            <h1 className="text-4xl font-bold text-gray-900">Order History</h1>
                        </div>

                        <div className="space-y-4">
                            {mockOrders.map((order, index) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.bgColor} ${order.statusColor}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 space-y-1">
                                                <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                                                <p>{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600 mb-1">Total</p>
                                                <p className="text-2xl font-bold text-purple-600">${order.total}</p>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleNotImplemented}
                                                className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                                            >
                                                <Eye size={20} />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default OrderHistoryPage;