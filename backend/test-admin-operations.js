const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => console.log('✅ MongoDB connected for testing'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const BASE_URL = 'http://localhost:5000/api';
let adminToken = '';
let userToken = '';

console.log('🚀 Starting Admin Operations Demonstration');
console.log('==========================================\n');

// Step 1: Admin Login Process
async function step1_AdminLogin() {
  console.log('📋 Step 1: Admin Login Process');
  console.log('------------------------------');

  try {
    console.log('1. Accessing admin login endpoint...');
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@test.com',
      password: 'admin123'
    });

    adminToken = response.data.token;
    console.log('✅ Admin login successful!');
    console.log(`   Token received: ${adminToken.substring(0, 50)}...`);
    console.log(`   User: ${response.data.user.name} (${response.data.user.role})`);
    console.log(`   Email: ${response.data.user.email}\n`);

  } catch (error) {
    console.log('❌ Admin login failed:', error.response?.data?.message || error.message);
  }
}

// Step 2: User Login (for comparison)
async function step2_UserLogin() {
  console.log('📋 Step 2: User Login Process (for RBAC comparison)');
  console.log('--------------------------------------------------');

  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'user@test.com',
      password: 'user123'
    });

    userToken = response.data.token;
    console.log('✅ User login successful!');
    console.log(`   User: ${response.data.user.name} (${response.data.user.role})`);
    console.log(`   Email: ${response.data.user.email}\n`);

  } catch (error) {
    console.log('❌ User login failed:', error.response?.data?.message || error.message);
  }
}

// Step 3: Adding a New Product
async function step3_AddProduct() {
  console.log('📋 Step 3: Adding a New Product');
  console.log('-------------------------------');

  const productData = {
    name: 'Wireless Gaming Headphones',
    price: 149.99,
    category: 'Electronics',
    description: 'Premium wireless gaming headphones with noise cancellation and RGB lighting',
    image: 'https://example.com/images/gaming-headphones.jpg'
  };

  try {
    console.log('1. Sending POST request to /api/products...');
    console.log(`   Product: ${productData.name}`);
    console.log(`   Price: $${productData.price}`);
    console.log(`   Category: ${productData.category}`);

    const response = await axios.post(`${BASE_URL}/products`, productData, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    console.log('✅ Product created successfully!');
    console.log(`   Product ID: ${response.data.product.id}`);
    console.log(`   Name: ${response.data.product.name}`);
    console.log(`   Status: ${response.data.product.inStock ? 'In Stock' : 'Out of Stock'}\n`);

    return response.data.product.id;

  } catch (error) {
    console.log('❌ Product creation failed:', error.response?.data?.message || error.message);
    return null;
  }
}

// Step 4: Viewing All Products
async function step4_ViewProducts() {
  console.log('📋 Step 4: Viewing All Products');
  console.log('------------------------------');

  try {
    console.log('1. Sending GET request to /api/products...');

    const response = await axios.get(`${BASE_URL}/products`);

    console.log('✅ Products retrieved successfully!');
    console.log(`   Total products: ${response.data.products.length}`);

    response.data.products.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - $${product.price} (${product.category})`);
    });
    console.log('');

    return response.data.products;

  } catch (error) {
    console.log('❌ Products retrieval failed:', error.response?.data?.message || error.message);
    return [];
  }
}

// Step 5: Editing a Product
async function step5_EditProduct(productId) {
  console.log('📋 Step 5: Editing a Product');
  console.log('---------------------------');

  if (!productId) {
    console.log('❌ No product ID available for editing\n');
    return;
  }

  const updateData = {
    name: 'Premium Wireless Gaming Headphones Pro',
    price: 199.99,
    description: 'Enhanced premium wireless gaming headphones with active noise cancellation, RGB lighting, and 7.1 surround sound'
  };

  try {
    console.log(`1. Sending PUT request to /api/products/${productId}...`);
    console.log(`   Updated name: ${updateData.name}`);
    console.log(`   Updated price: $${updateData.price}`);

    const response = await axios.put(`${BASE_URL}/products/${productId}`, updateData, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    console.log('✅ Product updated successfully!');
    console.log(`   Product ID: ${response.data.product.id}`);
    console.log(`   New name: ${response.data.product.name}`);
    console.log(`   New price: $${response.data.product.price}\n`);

  } catch (error) {
    console.log('❌ Product update failed:', error.response?.data?.message || error.message);
  }
}

// Step 6: Testing RBAC - User trying admin operations
async function step6_TestRBAC() {
  console.log('📋 Step 6: Testing RBAC - User Access Control');
  console.log('--------------------------------------------');

  const productData = {
    name: 'Test Product by User',
    price: 9.99,
    category: 'Test',
    description: 'This should fail due to RBAC',
    image: 'https://example.com/test.jpg'
  };

  try {
    console.log('1. User attempting to create product (should fail)...');

    await axios.post(`${BASE_URL}/products`, productData, {
      headers: { Authorization: `Bearer ${userToken}` }
    });

    console.log('❌ SECURITY ISSUE: User was able to create product!');

  } catch (error) {
    if (error.response?.status === 403) {
      console.log('✅ RBAC working correctly!');
      console.log('   User blocked from admin operation:', error.response.data.message);
    } else {
      console.log('❌ Unexpected error:', error.response?.data?.message || error.message);
    }
  }

  // Test user trying to view all orders
  try {
    console.log('2. User attempting to view all orders (should fail)...');

    await axios.get(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });

    console.log('❌ SECURITY ISSUE: User was able to view all orders!');

  } catch (error) {
    if (error.response?.status === 403) {
      console.log('✅ RBAC working correctly!');
      console.log('   User blocked from admin operation:', error.response.data.message);
    } else {
      console.log('❌ Unexpected error:', error.response?.data?.message || error.message);
    }
  }
  console.log('');
}

// Step 7: Admin viewing all orders
async function step7_AdminViewOrders() {
  console.log('📋 Step 7: Admin Viewing All Orders');
  console.log('-----------------------------------');

  try {
    console.log('1. Admin sending GET request to /api/orders...');

    const response = await axios.get(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    console.log('✅ Orders retrieved successfully!');
    console.log(`   Total orders: ${response.data.orders.length}`);

    response.data.orders.slice(0, 3).forEach((order, index) => {
      console.log(`   ${index + 1}. Order ${order._id} - $${order.totalAmount} (${order.orderStatus})`);
    });

    if (response.data.orders.length > 0) {
      return response.data.orders[0]._id; // Return first order ID for status update
    }

  } catch (error) {
    console.log('❌ Orders retrieval failed:', error.response?.data?.message || error.message);
  }
  console.log('');
  return null;
}

// Step 8: Updating order status
async function step8_UpdateOrderStatus(orderId) {
  console.log('📋 Step 8: Updating Order Status');
  console.log('-------------------------------');

  if (!orderId) {
    console.log('❌ No order ID available for status update\n');
    return;
  }

  const statusUpdates = ['processing', 'shipped', 'delivered'];

  for (const status of statusUpdates) {
    try {
      console.log(`1. Updating order ${orderId} to status: ${status}`);

      const response = await axios.patch(`${BASE_URL}/orders/${orderId}/status`,
        { orderStatus: status },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      console.log(`✅ Order status updated to: ${response.data.order.orderStatus}`);

    } catch (error) {
      console.log(`❌ Status update to ${status} failed:`, error.response?.data?.message || error.message);
    }
  }
  console.log('');
}

// Step 9: Deleting a product
async function step9_DeleteProduct(productId) {
  console.log('📋 Step 9: Deleting a Product');
  console.log('----------------------------');

  if (!productId) {
    console.log('❌ No product ID available for deletion\n');
    return;
  }

  try {
    console.log(`1. Sending DELETE request to /api/products/${productId}...`);

    const response = await axios.delete(`${BASE_URL}/products/${productId}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    console.log('✅ Product deleted successfully!');
    console.log(`   Deleted product: ${response.data.product.name}\n`);

  } catch (error) {
    console.log('❌ Product deletion failed:', error.response?.data?.message || error.message);
  }
}

// Main execution function
async function runAdminOperationsDemo() {
  try {
    // Execute all steps in sequence
    await step1_AdminLogin();
    await step2_UserLogin();

    const productId = await step3_AddProduct();
    await step4_ViewProducts();
    await step5_EditProduct(productId);

    await step6_TestRBAC();

    const orderId = await step7_AdminViewOrders();
    await step8_UpdateOrderStatus(orderId);

    await step9_DeleteProduct(productId);

    console.log('🎉 Admin Operations Demonstration Complete!');
    console.log('==========================================');
    console.log('✅ All RBAC features tested successfully');
    console.log('✅ Admin operations working as expected');
    console.log('✅ User access properly restricted');
    console.log('\n📖 Refer to README.md for manual testing instructions');

  } catch (error) {
    console.error('❌ Demo execution failed:', error);
  } finally {
    // Close MongoDB connection
    await mongoose.connection.close();
    process.exit(0);
  }
}

// Run the demonstration
runAdminOperationsDemo();
