const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

async function seedUsers() {
  try {
    const users = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        password: 'password123', // In production, this should be hashed
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        }
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543',
        password: 'password123',
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        }
      }
    ];

    // Clear existing users
    await User.deleteMany({});

    // Insert users
    for (const user of users) {
      await User.create(user);
    }

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('User seeding error:', error);
    throw error;
  }
}

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub');

    const products = [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        category: 'Electronics',
        description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding.',
        image: 'Modern wireless headphones with sleek black design',
        rating: 4.8,
        reviews: 234,
        inStock: true,
        features: ['Active Noise Cancellation', '30-Hour Battery', 'Premium Sound Quality', 'Comfortable Fit']
      },
      {
        id: 2,
        name: 'Smart Fitness Watch',
        price: 199.99,
        category: 'Electronics',
        description: 'Track your fitness goals with style. Heart rate monitoring, GPS tracking, and water resistance up to 50m.',
        image: 'Sleek fitness smartwatch with digital display',
        rating: 4.6,
        reviews: 189,
        inStock: true,
        features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-Day Battery']
      },
      {
        id: 3,
        name: 'Designer Leather Backpack',
        price: 149.99,
        category: 'Fashion',
        description: 'Handcrafted genuine leather backpack perfect for work or travel. Multiple compartments and laptop sleeve included.',
        image: 'Brown leather backpack with modern design',
        rating: 4.9,
        reviews: 156,
        inStock: true,
        features: ['Genuine Leather', 'Laptop Compartment', 'Water Resistant', 'Adjustable Straps']
      },
      {
        id: 4,
        name: 'Portable Bluetooth Speaker',
        price: 79.99,
        category: 'Electronics',
        description: '360-degree sound with deep bass. Waterproof design perfect for outdoor adventures.',
        image: 'Compact waterproof bluetooth speaker',
        rating: 4.7,
        reviews: 312,
        inStock: true,
        features: ['360° Sound', 'Waterproof', '12-Hour Battery', 'Compact Design']
      },
      {
        id: 5,
        name: 'Minimalist Desk Lamp',
        price: 59.99,
        category: 'Home',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature. Perfect for any workspace.',
        image: 'Modern minimalist LED desk lamp',
        rating: 4.5,
        reviews: 98,
        inStock: true,
        features: ['Adjustable Brightness', 'Color Temperature Control', 'Energy Efficient', 'Touch Control']
      },
      {
        id: 6,
        name: 'Organic Cotton T-Shirt',
        price: 29.99,
        category: 'Fashion',
        description: 'Sustainable and comfortable organic cotton t-shirt. Available in multiple colors.',
        image: 'Comfortable organic cotton t-shirt',
        rating: 4.4,
        reviews: 267,
        inStock: true,
        features: ['100% Organic Cotton', 'Eco-Friendly', 'Soft & Breathable', 'Multiple Colors']
      },
      {
        id: 7,
        name: 'Stainless Steel Water Bottle',
        price: 34.99,
        category: 'Home',
        description: 'Keep drinks cold for 24 hours or hot for 12 hours. Durable stainless steel construction.',
        image: 'Insulated stainless steel water bottle',
        rating: 4.8,
        reviews: 445,
        inStock: true,
        features: ['24-Hour Cold', '12-Hour Hot', 'BPA-Free', 'Leak-Proof']
      },
      {
        id: 8,
        name: 'Wireless Charging Pad',
        price: 39.99,
        category: 'Electronics',
        description: 'Fast wireless charging for all Qi-enabled devices. Sleek design with LED indicator.',
        image: 'Modern wireless charging pad',
        rating: 4.6,
        reviews: 178,
        inStock: true,
        features: ['Fast Charging', 'Universal Compatibility', 'LED Indicator', 'Non-Slip Surface']
      }
    ];

    // Clear existing products
    await Product.deleteMany({});

    // Insert products with embeddings
    for (const product of products) {
      const baseEmbedding = {
        'Electronics': [1, 0, 0, 0],
        'Fashion': [0, 1, 0, 0],
        'Home': [0, 0, 1, 0],
        'Sports': [0, 0, 0, 1]
      }[product.category] || [0.25, 0.25, 0.25, 0.25];

      const variation = [
        product.name.length / 100,
        product.price / 1000,
        product.rating / 5,
        product.reviews / 1000
      ];

      const embedding = baseEmbedding.map((val, i) => val + variation[i] * 0.1);

      await Product.create({
        ...product,
        embedding: embedding
      });
    }

    console.log('Products seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

async function main() {
  try {
    await seedUsers();
    await seedProducts();
    console.log('All seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

main();
