# 🛒 E-Commerce Website - Full Stack MERN Application

> **Note**: This is a portfolio/resume project created to demonstrate full-stack development skills for MNC company applications. It uses simulated payment processing and does not contain real Stripe API integration.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Detailed Documentation](#detailed-documentation)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

A modern, feature-rich e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates enterprise-level architecture, best practices, and comprehensive e-commerce functionality suitable for professional portfolio presentation.

**Key Highlights:**
- Full-featured admin dashboard with RBAC (Role-Based Access Control)
- Multi-language support (English, Spanish, Hindi)
- Responsive design with Tailwind CSS
- Shopping cart and wishlist functionality
- Product filtering, search, and recommendations
- Order management and tracking
- Simulated payment processing (Demo mode)
- Dark/Light theme support

## ✨ Features

### Customer Features
- 🔐 User authentication and authorization (JWT-based)
- 🛍️ Product browsing with advanced filters
- 🔍 Real-time search with fuzzy matching
- 🛒 Shopping cart management
- ❤️ Wishlist functionality
- 📦 Order tracking
- 💳 Checkout process with simulated payment
- 🌐 Multi-language support (i18n)
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design
- ⭐ Product reviews and ratings
- 🎨 Product comparison feature

### Admin Features
- 📊 Comprehensive admin dashboard
- 👥 User management
- 📦 Product CRUD operations
- 📈 Order management
- 📉 Sales analytics and charts
- 🔒 Role-based access control (RBAC)
- 🛡️ Secure admin authentication

### Technical Features
- ⚡ Vite for fast development and building
- 🎨 Tailwind CSS for styling
- 🔄 React Router for navigation
- 🌍 i18next for internationalization
- 🎭 Framer Motion for animations
- 📊 Recharts for data visualization
- 🔒 Helmet.js for security headers
- 🚦 Rate limiting for API protection
- 🎯 SEO optimized with React Helmet

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Custom components
- **State Management**: React Context API
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Internationalization**: i18next, react-i18next
- **Payment UI**: @stripe/react-stripe-js (Demo mode)
- **Search**: Fuse.js
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Security**: Helmet.js, CORS
- **Rate Limiting**: express-rate-limit
- **Environment**: dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/ecommerce-website.git

# Or using SSH
git clone git@github.com:yourusername/ecommerce-website.git

# Navigate to project directory
cd ecommerce-website
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Or using yarn
yarn install
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Or using yarn
yarn install

# Return to root directory
cd ..
```

### 4. Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Stripe (Demo Mode - Not Real API)
STRIPE_SECRET_KEY=sk_test_demo_key_for_portfolio_project
STRIPE_PUBLISHABLE_KEY=pk_test_demo_key_for_portfolio_project

# CORS
FRONTEND_URL=http://localhost:3000
```

#### Frontend Environment Variables (Optional)
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_demo_key_for_portfolio_project
```

### 5. Database Setup

```bash
# Make sure MongoDB is running
# For Windows: Start MongoDB service
# For Mac/Linux: mongod

# Seed the database with sample data (optional)
cd backend
node seed.js

# Create admin user
node create-admin.js
```

## ▶️ Running the Application

### Development Mode

#### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend will run on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Frontend will run on http://localhost:3000
```

#### Option 2: Production Build

```bash
# Build frontend
npm run build

# Preview production build
npm run preview

# Run backend in production mode
cd backend
npm start
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:3000/admin/login

### Default Credentials

**Admin Account:**
- Email: `admin@test.com`
- Password: `admin123`

**Test User Account:**
- Email: `user@test.com`
- Password: `user123`

## 📁 Project Structure

```
ecommerce-website/
├── backend/                    # Backend API server
│   ├── middleware/            # Authentication & Authorization
│   │   ├── auth.js           # JWT authentication middleware
│   │   └── authz.js          # RBAC authorization middleware
│   ├── models/               # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/               # API routes
│   │   ├── auth.js           # Authentication routes
│   │   ├── products.js       # Product CRUD
│   │   ├── orders.js         # Order management
│   │   ├── users.js          # User management
│   │   ├── payments.js       # Payment processing (demo)
│   │   └── recommendations.js
│   ├── create-admin.js       # Admin user creation script
│   ├── seed.js               # Database seeding script
│   ├── server.js             # Express server entry point
│   └── package.json
│
├── src/                       # Frontend source code
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── SearchBar.jsx
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   ├── ProductPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── AdminDashboardPage.jsx
│   │   └── ...
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── LocalizationContext.jsx
│   │   └── WishlistContext.jsx
│   ├── lib/                 # Utility libraries
│   │   ├── currency.js
│   │   ├── i18n.js
│   │   └── utils.js
│   ├── locales/            # Translation files
│   │   ├── en.json
│   │   ├── es.json
│   │   └── hi.json
│   ├── data/               # Static data
│   │   └── products.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── detail step for all things/  # Detailed documentation
│   ├── README.md               # Admin operations guide
│   ├── admin_operations.md     # Admin features documentation
│   ├── how_to_add_new_product.md  # Product management guide
│   └── how_to_create_token.md    # JWT token guide
│
├── public/                  # Static assets
│   └── img/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 📚 Detailed Documentation

For more detailed information about specific features and operations, please refer to the documentation in the `detail step for all things/` folder:

1. **[Admin Operations Guide](detail%20step%20for%20all%20things/README.md)** - Complete guide for admin dashboard operations
2. **[Admin Operations Documentation](detail%20step%20for%20all%20things/admin_operations.md)** - Detailed admin features and RBAC
3. **[How to Add New Products](detail%20step%20for%20all%20things/how_to_add_new_product.md)** - Step-by-step product management
4. **[How to Create JWT Tokens](detail%20step%20for%20all%20things/how_to_create_token.md)** - Authentication token guide

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (Admin only)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent (Demo)
- `POST /api/payments/confirm` - Confirm payment (Demo)

### Recommendations
- `GET /api/recommendations` - Get product recommendations

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/ecommerce |
| JWT_SECRET | Secret key for JWT | your_secret_key |
| STRIPE_SECRET_KEY | Stripe secret key (Demo) | sk_test_demo |
| STRIPE_PUBLISHABLE_KEY | Stripe publishable key (Demo) | pk_test_demo |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

### Frontend (.env - Optional)
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |
| VITE_STRIPE_PUBLISHABLE_KEY | Stripe key (Demo) | pk_test_demo |

## ⚠️ Important Notes

### Payment Processing (Demo Mode)
This project **DOES NOT** use real Stripe API keys or process actual payments. The payment functionality is simulated for demonstration purposes only. This is a portfolio project designed to showcase full-stack development capabilities for MNC company interviews and resume presentation.

**What this means:**
- No real credit card information is processed
- No actual charges are made
- Payment success/failure is simulated
- Safe to use for demonstrations and testing
- Suitable for portfolio and resume projects

### Security Considerations
- Change all default credentials in production
- Use strong JWT secrets
- Enable HTTPS in production
- Configure proper CORS origins
- Implement rate limiting appropriately

## 🧪 Testing

```bash
# Test admin operations
cd backend
node test-admin-operations.js

# Test RBAC functionality
node test-rbac.js
```

## 📸 Screenshots

_Add screenshots of your application here to showcase the UI/UX_

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created for educational and portfolio purposes. Feel free to use it as inspiration for your own projects.

## 👨‍💻 Author

Created as a portfolio project to demonstrate full-stack development skills for MNC company applications.

## 🙏 Acknowledgments

- React.js community
- Express.js community
- MongoDB team
- Tailwind CSS
- All open-source contributors

---

**Built with ❤️ for Portfolio/Resume Purposes**

For detailed operational guides, please check the `detail step for all things/` folder.
