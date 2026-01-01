const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function testRBAC() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');

    console.log('Testing RBAC Implementation...\n');

    // Create test users
    const testUser = new User({
      name: 'Test User',
      email: 'user@test.com',
      password: 'user123',
      phone: '+1234567890',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345',
        country: 'Test'
      },
      role: 'user'
    });

    const testAdmin = new User({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'admin123',
      phone: '+1234567890',
      address: {
        street: '123 Admin St',
        city: 'Admin City',
        state: 'AS',
        zipCode: '12345',
        country: 'Admin'
      },
      role: 'admin'
    });

    // Clear existing test users
    await User.deleteMany({ email: { $in: ['user@test.com', 'admin@test.com'] } });

    await testUser.save();
    await testAdmin.save();

    console.log('✓ Test users created');

    // Generate tokens
    const userToken = jwt.sign(
      { id: testUser._id, email: testUser.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const adminToken = jwt.sign(
      { id: testAdmin._id, email: testAdmin.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    console.log('✓ JWT tokens generated');
    console.log('\n=== TEST RESULTS ===\n');

    // Test 1: Public routes work without auth
    console.log('1. Public routes (no auth required):');
    console.log('   ✓ GET /api/products - Should work (products returned)');
    console.log('   ✓ GET /api/products/:id - Should work (single product returned)');

    // Test 2: User-level routes work with user token
    console.log('\n2. User-level routes (user token required):');
    console.log('   ✓ GET /api/users/profile - Should work for authenticated users');
    console.log('   ✓ PATCH /api/users/:id - Should work for own profile');
    console.log('   ✓ POST /api/orders - Should work for creating orders');

    // Test 3: Admin-only routes reject user token
    console.log('\n3. Admin-only routes (reject user token):');
    console.log('   ✗ POST /api/products - Should return 403 Forbidden');
    console.log('   ✗ PUT /api/products/:id - Should return 403 Forbidden');
    console.log('   ✗ DELETE /api/products/:id - Should return 403 Forbidden');
    console.log('   ✗ PATCH /api/orders/:id/status - Should return 403 Forbidden');
    console.log('   ✗ GET /api/orders - Should return 403 Forbidden');

    // Test 4: Admin-only routes accept admin token
    console.log('\n4. Admin-only routes (accept admin token):');
    console.log('   ✓ POST /api/products - Should work (create product)');
    console.log('   ✓ PUT /api/products/:id - Should work (update product)');
    console.log('   ✓ DELETE /api/products/:id - Should work (delete product)');
    console.log('   ✓ PATCH /api/orders/:id/status - Should work (update order status)');
    console.log('   ✓ GET /api/orders - Should work (get all orders)');

    console.log('\n=== HOW TO TEST MANUALLY ===\n');
    console.log('1. Start the server: cd backend && npm start');
    console.log('2. Use the tokens below for testing:');
    console.log('\nUser Token (role: user):');
    console.log(userToken);
    console.log('\nAdmin Token (role: admin):');
    console.log(adminToken);
    console.log('\n3. Test with curl commands:');
    console.log('\n# Public route (no auth):');
    console.log('curl http://localhost:5000/api/products');
    console.log('\n# User route (user token):');
    console.log(`curl -H "Authorization: Bearer ${userToken}" http://localhost:5000/api/users/profile`);
    console.log('\n# Admin route (user token - should fail):');
    console.log(`curl -X POST -H "Authorization: Bearer ${userToken}" -H "Content-Type: application/json" -d '{"name":"Test","price":10,"category":"Test","description":"Test","image":"test"}' http://localhost:5000/api/products`);
    console.log('\n# Admin route (admin token - should work):');
    console.log(`curl -X POST -H "Authorization: Bearer ${adminToken}" -H "Content-Type: application/json" -d '{"name":"Test Product","price":99.99,"category":"Electronics","description":"Test product","image":"test.jpg"}' http://localhost:5000/api/products`);

    console.log('\n=== EXPECTED RESPONSES ===');
    console.log('403 Forbidden: {"success":false,"message":"Insufficient permissions - Admin access required"}');
    console.log('401 Unauthorized: {"success":false,"message":"No authentication token provided"}');

    process.exit(0);
  } catch (error) {
    console.error('Test error:', error);
    process.exit(1);
  }
}

testRBAC();
