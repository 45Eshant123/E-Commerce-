const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function clearUsers() {
    try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub');
    console.log('Connected to MongoDB');

    // Delete all users to clear double-hashed passwords
    await User.deleteMany({});
    console.log('All users cleared successfully');

    await mongoose.connection.close();
    console.log('Connection closed');
    } catch (error) {
    console.error('Error:', error);
    process.exit(1);
    }
}

clearUsers();
