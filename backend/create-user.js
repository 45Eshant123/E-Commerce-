const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub');
    console.log('Connected to MongoDB');

    // Create your specific user
    const userData = {
      name: 'Pratik Sri',
      email: 'pratiksri09@gmail.com',
      password: 'Eshant@123',
      phone: '+1234567890',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    };

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log('User already exists with email:', userData.email);
      await mongoose.connection.close();
      return;
    }

    // Create new user
    const user = await User.create(userData);
    console.log('User created successfully:', {
      name: user.name,
      email: user.email,
      role: user.role
    });

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createUser();
