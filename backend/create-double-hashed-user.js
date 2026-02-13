const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createDoubleHashedUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub');
        console.log('Connected to MongoDB');

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
            console.log('Deleting existing user...');
            await User.deleteOne({ email: userData.email });
        }

        // First hash (manual)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Create user with already hashed password (will be hashed again by pre-save hook)
        const user = new User({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            phone: userData.phone,
            address: userData.address
        });

        await user.save();

        console.log('User created successfully with double hashing:', {
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

createDoubleHashedUser();
