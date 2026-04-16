# E-Commerce Admin Dashboard - Operations Guide

## Overview
This guide provides step-by-step instructions for administrators to manage the e-commerce platform using the Role-Based Access Control (RBAC) system.

## Prerequisites
- Admin account with role: `admin`
- Access to admin dashboard at `/admin/dashboard`
- Backend API running on port 5000
- Frontend running on port 3000

## Admin Login Process

### Step 1: Access Admin Login
1. Navigate to `http://localhost:3000/admin/login`
2. Enter admin credentials:
   - **Email**: `admin@test.com`
   - **Password**: `admin123`

### Step 2: Authentication
- Click "Sign In" button
- System validates credentials and user role
- Redirects to admin dashboard if successful
- Displays error if credentials are invalid or user lacks admin role

## Dashboard Navigation

### Main Tabs
- **Overview**: Dashboard statistics and charts
- **Products**: Product management (CRUD operations)
- **Orders**: Order management and status updates
- **Customers**: Customer management (placeholder)
- **Analytics**: Advanced analytics (placeholder)

## Product Management Operations

### Adding a New Product

1. **Navigate to Products Tab**
   - Click "Products" tab in the navigation

2. **Open Add Product Form**
   - Click the "Add Product" button (green + icon)

3. **Fill Product Details**
   - **Product Name**: Enter descriptive name (required)
   - **Price**: Enter numeric price (required, e.g., 99.99)
   - **Category**: Enter category (required, e.g., Electronics, Fashion)
   - **Image URL**: Enter full image URL (required)
   - **Description**: Enter detailed product description (required)

4. **Save Product**
   - Click "Add Product" button
   - Form validates all required fields
   - Success: Product appears in list, toast notification shows
   - Error: Validation messages display, product not saved

### Editing an Existing Product

1. **Locate Product**
   - Scroll through products table or use search if implemented

2. **Open Edit Form**
   - Click the edit icon (pencil) in the Actions column

3. **Modify Details**
   - Update any fields as needed
   - All fields are editable

4. **Save Changes**
   - Click "Update Product" button
   - Success: Product list refreshes with changes
   - Error: Error message displays, changes not saved

### Deleting a Product

1. **Locate Product**
   - Find product in the products table

2. **Initiate Deletion**
   - Click the delete icon (trash) in the Actions column

3. **Confirm Deletion**
   - System shows confirmation dialog (if implemented)
   - Click "Delete" to confirm

4. **Deletion Result**
   - Success: Product removed from list
   - Error: Error message displays, product remains

## Order Management Operations

### Viewing All Orders

1. **Navigate to Orders Tab**
   - Click "Orders" tab in the navigation

2. **View Order List**
   - Orders display in table format with columns:
     - Order ID
     - Customer Name
     - Total Amount
     - Status (color-coded badges)
     - Date Created
     - Status Update Dropdown

### Searching Orders

1. **Use Search Bar**
   - Enter order ID in the search input field
   - Click search icon or press Enter

2. **View Filtered Results**
   - Only matching orders display
   - Clear search to show all orders

### Updating Order Status

1. **Locate Order**
   - Find order in the orders table

2. **Open Status Dropdown**
   - Click the status dropdown in the Actions column

3. **Select New Status**
   - Choose from available statuses:
     - `pending`: Initial order state
     - `processing`: Order being prepared
     - `shipped`: Order dispatched
     - `delivered`: Order completed
     - `cancelled`: Order cancelled

4. **Confirm Status Change**
   - Dropdown automatically saves selection
   - Success: Status badge updates with new color
   - Error: Error message displays, status unchanged

### Order Status Color Coding

- **Pending**: Yellow badge (awaiting processing)
- **Processing**: Blue badge (being prepared)
- **Shipped**: Purple badge (in transit)
- **Delivered**: Green badge (completed)
- **Cancelled**: Gray badge (terminated)

## Security and Access Control

### RBAC Protection

**Frontend Protection:**
- Admin dashboard checks `user.role === 'admin'`
- Non-admin users redirected to login page
- Admin-only features hidden from regular users

**Backend Protection:**
- All admin routes require authentication + authorization
- JWT tokens validated for user role
- Unauthorized requests return `403 Forbidden`

### Session Management

**Automatic Logout:**
- Invalid tokens redirect to login
- Expired sessions require re-authentication

**Manual Logout:**
- Click "Logout" button in dashboard header
- Clears authentication state
- Redirects to home page

## Error Handling

### Common Error Scenarios

**Authentication Errors:**
- Invalid credentials: "Login Failed" message
- Expired token: Redirect to login page
- Insufficient permissions: "403 Forbidden" response

**API Errors:**
- Network issues: "Failed to connect" messages
- Server errors: "Internal server error" notifications
- Validation errors: Field-specific error messages

### Troubleshooting

**Dashboard Not Loading:**
1. Verify admin login status
2. Check network connectivity
3. Confirm backend server is running (port 5000)

**Operations Failing:**
1. Verify admin permissions
2. Check form validation errors
3. Confirm backend API responses
4. Check browser console for errors

## API Endpoints Reference

### Product Management
- `GET /api/products` - List all products
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Order Management
- `GET /api/orders` - List all orders (admin only)
- `PATCH /api/orders/:orderId/status` - Update order status (admin only)

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get user profile (includes role)

## Best Practices

### Product Management
- Use descriptive, SEO-friendly product names
- Include high-quality product images
- Categorize products consistently
- Keep descriptions clear and detailed
- Regularly update pricing and availability

### Order Management
- Process orders in logical sequence (pending → processing → shipped → delivered)
- Update statuses promptly to keep customers informed
- Use search functionality for large order volumes
- Monitor cancelled orders for patterns

### Security
- Never share admin credentials
- Log out when session complete
- Report suspicious activity
- Keep software updated

## Support

For technical issues or questions:
1. Check this documentation first
2. Review browser console for errors
3. Verify backend server logs
4. Contact development team with specific error details

---

**Last Updated**: Current Implementation
**Version**: RBAC v1.0
**Admin Email**: admin@test.com
**Admin Password**: admin123 (for testing only)



import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Shield, Truck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    const features = [
        {
            icon: ShoppingBag,
            title: 'Quality Products',
            description: 'Curated selection of premium items'
        },
        {
            icon: Truck,
            title: 'Fast Shipping',
            description: 'Free delivery on orders over ₹5000'
        },
        {
            icon: Shield,
            title: 'Secure Payment',
            description: 'Your transactions are always safe'
        },
        {
            icon: Heart,
            title: 'Wishlist',
            description: 'Save your favorite items for later'
        }
    ];

    const featuredProducts = [
        {
            id: 1,
            title: 'Premium Headphones',
            description: 'High-quality wireless audio experience',
            price: 1900,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
        },
        {
            id: 2,
            title: 'Apple Smart Watch',
            description: 'Track your fitness and stay connected',
            price: 25000,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
        },
        {
            id: 3,
            title: 'Laptop Backpack',
            description: 'Durable and stylish everyday carry',
            price: 2500,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
        },
        {
            id: 4,
            title: 'Wireless Mouse',
            description: 'Ergonomic design for all-day comfort',
            price: 8000,
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'
        }
    ];

    return (
        <>
            <Helmet>
                <title>ShopHub - Your Premium Shopping Destination</title>
                <meta name="description" content="Discover premium products at ShopHub. Quality items, fast shipping, and secure checkout. Shop the latest trends today!" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
                {/* Hero Section */}
                <section
                    className="relative h-screen flex items-center justify-center overflow-hidden"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1674027392842-29f8354e236c)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80"></div>
                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Welcome to ShopHub
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
                                Discover premium products curated just for you. Quality, style, and convenience in one place.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {isAuthenticated ? (
                                    <Link to="/cart">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                                        >
                                            Start Shopping
                                            <ArrowRight size={20} />
                                        </motion.button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/signup">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                                            >
                                                Get Started
                                            </motion.button>
                                        </Link>
                                        <Link to="/login">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-8 py-4 bg-transparent border-2 border-black-600 text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out"
                                            >
                                                Sign In
                                            </motion.button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose ShopHub?
                        </h2>
                        <p className="text-xl text-gray-600 mb-4">
                            We're committed to providing the best shopping experience
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <feature.icon size={32} className="text-gray-900" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-center">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-4">
                                Featured Products
                            </h2>
                            <p className="text-xl text-gray-600 mb-4 ">
                                Handpicked items just for you
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-purple-600">
                                                ₹{product.price}
                                            </span>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                                            >
                                                Add to Cart
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                {!isAuthenticated && (
                    <section className="pt-20 pb-36 bg-gradient-to-r from-purple-600 to-pink-600">
                        <div className="container mx-auto px-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 pt-4">
                                    Ready to Start Shopping?
                                </h2>
                                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                    Join thousands of satisfied customers and discover amazing deals today!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pb-6">
                                    <Link to="/signup">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                                        >
                                            Create Account
                                        </motion.button>
                                    </Link>
                                    <Link to="/login">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all"
                                        >
                                            Already have an account?
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default HomePage;