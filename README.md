# 🛒 E-Commerce Website (Resume Project)

Full-stack MERN-style e-commerce project for portfolio/resume use.

> ⚠️ This project contains demo/testing payment flows and helper scripts for local development. Do not use as-is in production.

## Overview

This repository includes:
- A React + Vite frontend in `src/`
- An Express + MongoDB backend in `backend/`
- Admin/testing helper scripts in `backend/*.js`
- Additional historical/alternate frontend folders (`login_folder/`, `login_folder-1/`)

The app supports product browsing, authentication, role-based admin operations, recommendations, orders, and Stripe-based/payment-mock flows.

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Context API
- i18next (EN/ES/HI)
- Stripe React SDK (client integration)

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Stripe Node SDK
- dotenv, cors

---

## Quick Start

### 1) Install dependencies

```bash
# root (frontend)
npm install

# backend
cd backend
npm install
```

### 2) Configure environment (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### 3) Run backend

```bash
cd backend
npm run dev
```

### 4) Run frontend

```bash
# from project root
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Health check: `GET /api/health`

---

## Project Structure (Current)

```text
.
├── backend/
│   ├── .env
│   ├── middleware/
│   │   ├── auth.js
│   │   └── authz.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── payments.js
│   │   └── recommendations.js
│   ├── create-admin.js
│   ├── create-user.js
│   ├── create-double-hashed-user.js
│   ├── clear-users.js
│   ├── seed.js
│   ├── test-admin-operations.js
│   ├── test-rbac.js
│   ├── val
│   └── server.js
├── dist/
├── src/
│   ├── components/
│   ├── context/
│   ├── contexts/
│   ├── data/
│   ├── lib/
│   ├── locales/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── detail step for all things/
├── login_folder/
├── login_folder-1/
├── package.json
└── README.md
```

---

## Data Models (Backend)

### 1) User (`backend/models/User.js`)
- `name` (String, required)
- `email` (String, required, unique, lowercase)
- `password` (String, required, min 6)
- `role` (Enum: `user | admin`, default `user`)
- `isActive` (Boolean, default `true`)
- timestamps enabled

Behavior:
- `pre('save')` hashes password with bcrypt (12 rounds)
- `comparePassword()` method for login comparison

### 2) Product (`backend/models/Product.js`)
- Numeric `id` (required, unique)
- `name`, `price`, `category`, `description`, `image`
- `rating`, `reviews`, `inStock`, `features[]`
- `embedding[]` for similarity recommendations
- `createdAt`, `updatedAt`

Behavior:
- text index on `name` and `description`
- `updatedAt` refresh on save

### 3) Order (`backend/models/Order.js`)
- `orderId` (required, unique)
- `userId` (String, required)
- `customerInfo`, `items[]`, `paymentInfo`, `shipping`
- `orderStatus`, `totalAmount`
- `createdAt`, `updatedAt`

Behavior:
- static `generateOrderId()` helper
- `updatedAt` refresh on save

> Note: Some route handlers currently use fields like `user` and `status` when creating/updating orders, while the schema defines `userId` and `orderStatus`. Keep this in mind if extending order APIs.

---

## How APIs Work

The backend mounts routes in `backend/server.js` under `/api/*`:

- `/api/auth`
- `/api/users`
- `/api/products`
- `/api/orders`
- `/api/payments`
- `/api/recommendations`

### Authentication & RBAC flow

1. Client logs in via `POST /api/auth/login`
2. Server returns JWT containing user identity and role
3. Protected routes use `auth` middleware:
   - Reads `Authorization: Bearer <token>`
   - Verifies token
   - Loads current user from DB
4. Admin-only routes add `authorize('admin')`

If role is not allowed, API returns `403`.

### Implemented Endpoints

#### Auth (`backend/routes/auth.js`)
- `POST /api/auth/register`
- `POST /api/auth/login`

#### Users (`backend/routes/users.js`) — admin only
- `GET /api/users`
- `DELETE /api/users/:id`
- `PUT /api/users/:id/role`

#### Products (`backend/routes/products.js`)
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

#### Orders (`backend/routes/orders.js`)
- `POST /api/orders` (authenticated user)
- `GET /api/orders` (admin)
- `PUT /api/orders/:id/status` (admin)

#### Payments (`backend/routes/payments.js`)
- `POST /api/payments/create-payment-intent`
- `POST /api/payments/confirm-payment`
- `POST /api/payments/webhook`
- `POST /api/payments/mock-payment` (development only)
- `POST /api/payments/mock-payment-fail` (development only)

#### Recommendations (`backend/routes/recommendations.js`)
- `GET /api/recommendations/:id`
- `POST /api/recommendations/seed-embeddings`

---

## Why Admin Files Exist (and How to Use Them)

The `backend` folder contains utility scripts to speed up local testing and admin demos.

### `create-admin.js`
Purpose:
- Creates an admin account for dashboard/API testing.

Run:
```bash
cd backend
node create-admin.js
```

### `create-user.js`
Purpose:
- Creates a sample user with predefined credentials.

Run:
```bash
cd backend
node create-user.js
```

### `create-double-hashed-user.js`
Purpose:
- Reproduces a double-hash password scenario for debugging auth issues.

Run:
```bash
cd backend
node create-double-hashed-user.js
```

### `clear-users.js`
Purpose:
- Deletes all user records (useful reset during auth testing).

Run:
```bash
cd backend
node clear-users.js
```

### `seed.js`
Purpose:
- Seeds sample users/products and product embeddings.

Run:
```bash
cd backend
node seed.js
```

### `test-rbac.js` and `test-admin-operations.js`
Purpose:
- Demonstration/testing scripts for token roles and admin workflows.

Run:
```bash
cd backend
node test-rbac.js
node test-admin-operations.js
```

> ⚠️ Important: These scripts may modify or delete data. Use only in local/dev databases.

---

## Detailed Docs

Additional step-by-step docs are in:
- `detail step for all things/README.md`
- `detail step for all things/admin_operations.md`
- `detail step for all things/how_to_add_new_product.md`
- `detail step for all things/how_to_create_token.md`

---

## Notes

- Frontend API calls are currently hardcoded to `http://localhost:5000` in multiple files.
- Keep backend running on port `5000` unless you also update frontend API URLs.
- This README was updated to match current files and route/model implementations.
