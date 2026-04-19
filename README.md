# E-Commerce Website (Resume Project)

Portfolio-grade full-stack e-commerce project built with React + Vite on the frontend and Express + MongoDB on the backend.

This repository includes authentication, role-based admin operations, product browsing, cart and checkout flows, recommendations, and payment integration patterns.

## Tech Stack

Frontend:
- React 18
- Vite
- Tailwind CSS
- React Router
- Context API
- i18next (en/es/hi)
- Stripe React SDK

Backend:
- Node.js
- Express 5
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Stripe Node SDK
- Helmet, CORS, dotenv, express-rate-limit

## Repository Layout

```text
.
|-- .gitignore
|-- index.html
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- README.md
|-- requirement.txt
|-- requirements.txt
|-- tailwind.config.js
|-- vite.config.js
|-- backend/
|   |-- .env
|   |-- .gitignore
|   |-- package-lock.json
|   |-- package.json
|   |-- server.js
|   |-- middleware/
|   |   |-- auth.js
|   |   `-- authz.js
|   |-- models/
|   |   |-- Order.js
|   |   |-- Product.js
|   |   `-- User.js
|   |-- routes/
|   |   |-- auth.js
|   |   |-- orders.js
|   |   |-- payments.js
|   |   |-- products.js
|   |   |-- recommendations.js
|   |   `-- users.js
|   `-- utils/
|       `-- emailService.js
|-- detail step for all things/
|   |-- admin_operations.md
|   |-- how_to_add_new_product.md
|   |-- how_to_create_token.md
|   `-- README.md
|-- dist/
|   |-- index.html
|   |-- assets/
|   |   |-- index-BBrx2IUm.js
|   |   `-- index-CEBF89bO.css
|   `-- img/
|       |-- bag.png
|       |-- bottle.png
|       |-- dining.png
|       |-- headphone.png
|       |-- image.png
|       |-- lamp.png
|       |-- shoes.png
|       |-- speaker.png
|       |-- tshirt.png
|       |-- tv.png
|       |-- watch.png
|       `-- wireless.png
|-- login_folder-1/
|   |-- index.html
|   |-- package-lock.json
|   |-- package.json
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   `-- src/
|       |-- App.jsx
|       |-- index.css
|       |-- main.jsx
|       |-- components/
|       |   |-- CallToAction.jsx
|       |   |-- FormButton.jsx
|       |   |-- FormCheckbox.jsx
|       |   |-- FormInput.jsx
|       |   |-- Header.jsx
|       |   |-- HeroImage.jsx
|       |   |-- OTPInput.jsx
|       |   |-- ProtectedRoute.jsx
|       |   |-- ReCaptchaWrapper.jsx
|       |   |-- ScrollToTop.jsx
|       |   |-- WelcomeMessage.jsx
|       |   `-- ui/
|       |       |-- button.jsx
|       |       |-- toast.jsx
|       |       |-- toaster.jsx
|       |       `-- use-toast.js
|       |-- contexts/
|       |   `-- AuthContext.jsx
|       |-- lib/
|       |   `-- utils.js
|       `-- pages/
|           |-- CartPage.jsx
|           |-- CheckoutPage.jsx
|           |-- ForgotPasswordPage.jsx
|           |-- HomePage.jsx
|           |-- LoginPage.jsx
|           |-- OrderHistoryPage.jsx
|           |-- PasswordlessOTPLoginPage.jsx
|           |-- ResetPasswordPage.jsx
|           |-- SignupPage.jsx
|           `-- WishlistPage.jsx
|-- public/
|   `-- img/
|       |-- bag.png
|       |-- bottle.png
|       |-- clothing.mp4
|       |-- dining.png
|       |-- headphone.png
|       |-- image.png
|       |-- lamp.png
|       |-- shoes.png
|       |-- speaker.png
|       |-- suit.png
|       |-- tshirt.png
|       |-- tv.png
|       |-- watch.png
|       `-- wireless.png
`-- src/
	|-- App.jsx
	|-- index.css
	|-- main.jsx
	|-- components/
	|   |-- CallToAction.jsx
	|   |-- CategoryProductGrid.jsx
	|   |-- FilterPanel.jsx
	|   |-- FloatingCartButton.jsx
	|   |-- Footer.jsx
	|   |-- FormButton.jsx
	|   |-- FormCheckbox.jsx
	|   |-- FormInput.jsx
	|   |-- GlobalSelector.jsx
	|   |-- Header.jsx
	|   |-- HeroImage.jsx
	|   |-- HeroSection.jsx
	|   |-- OTPInput.jsx
	|   |-- PaymentForm.jsx
	|   |-- ProductCard.jsx
	|   |-- ProductFilters.jsx
	|   |-- ProtectedRoute.jsx
	|   |-- ReCaptchaWrapper.jsx
	|   |-- Recommendations.jsx
	|   |-- ScrollToTop.jsx
	|   |-- SearchBar.jsx
	|   |-- SkeletonLoader.jsx
	|   |-- Testimonials.jsx
	|   |-- WelcomeMessage.jsx
	|   `-- ui/
	|       |-- button.jsx
	|       |-- card.jsx
	|       |-- input.jsx
	|       |-- label.jsx
	|       |-- price-filter.jsx
	|       |-- select.jsx
	|       |-- textarea.jsx
	|       |-- toast.jsx
	|       |-- toaster.jsx
	|       `-- use-toast.jsx
	|-- context/
	|   |-- AuthContext.jsx
	|   |-- CartContext.jsx
	|   |-- LocalizationContext.jsx
	|   |-- ThemeContext.jsx
	|   `-- WishlistContext.jsx
	|-- contexts/
	|   `-- AuthContext.jsx
	|-- data/
	|   `-- products.js
	|-- lib/
	|   |-- currency.js
	|   |-- i18n.js
	|   |-- localization-reference.js
	|   `-- utils.js
	|-- locales/
	|   |-- en.json
	|   |-- es.json
	|   `-- hi.json
	`-- pages/
		|-- AboutUsPage.jsx
		|-- AccountSettingsPage.jsx
		|-- AdminDashboardPage.jsx
		|-- AdminLoginPage.jsx
		|-- CareersPage.jsx
		|-- CartPage.jsx
		|-- CheckoutConfirmationPage.jsx
		|-- CheckoutPage.jsx
		|-- CompanyPage.jsx
		|-- ComparePage.jsx
		|-- ContactUsPage.jsx
		|-- CookiePolicyPage.jsx
		|-- CustomerServicePage.jsx
		|-- ExchangePolicyPage.jsx
		|-- FAQPage.jsx
		|-- ForgotPasswordPage.jsx
		|-- HelpCenterPage.jsx
		|-- HomePage.jsx
		|-- HowToReturnPage.jsx
		|-- LoginPage.jsx
		|-- OrderFailurePage.jsx
		|-- OrderSuccessPage.jsx
		|-- OrderTrackingPage.jsx
		|-- PasswordlessOTPLoginPage.jsx
		|-- PaymentFailedPage.jsx
		|-- PaymentSuccessPage.jsx
		|-- PressMediaPage.jsx
		|-- PrivacyPolicyPage.jsx
		|-- ProductPage.jsx
		|-- ProfilePage.jsx
		|-- RefundProcessPage.jsx
		|-- RegisterPage.jsx
		|-- ReportIssuePage.jsx
		|-- ResetPasswordPage.jsx
		|-- ReturnPolicyPage.jsx
		|-- ReturnsExchangesPage.jsx
		|-- ShippingDeliveryPage.jsx
		|-- SignupPage.jsx
		|-- SustainabilityPage.jsx
		|-- TermsConditionsPage.jsx
		`-- WishlistPage.jsx
```

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+
- MongoDB instance (local or cloud)
- Stripe test keys (optional, for payment endpoints)

## Setup

1. Install frontend dependencies:

```bash
npm install
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Create backend environment file at `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=replace_with_a_strong_secret
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

4. Start backend server:

```bash
cd backend
npm run dev
```

5. Start frontend dev server (new terminal, project root):

```bash
npm run dev
```

Default URLs:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health endpoint: GET /api/health

## Available Scripts

Root (`package.json`):
- `npm run dev` - Start Vite dev server on port 3000
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

Backend (`backend/package.json`):
- `npm run dev` - Start API with nodemon
- `npm start` - Start API with node

## API Groups

Routes are mounted under `/api` in `backend/server.js`:
- `/api/auth`
- `/api/users`
- `/api/products`
- `/api/orders`
- `/api/payments`
- `/api/recommendations`

Auth and RBAC behavior:
- JWT-based authentication via `Authorization: Bearer <token>`
- Protected routes use `backend/middleware/auth.js`
- Admin-only routes use authorization middleware in `backend/middleware/authz.js`

## Utility Scripts (Backend)

The backend includes helper scripts for local testing and demo data:
- `create-admin.js`
- `create-user.js`
- `create-double-hashed-user.js`
- `clear-users.js`
- `seed.js`
- `test-rbac.js`
- `test-admin-operations.js`

Run any script from `backend/`, for example:

```bash
cd backend
node seed.js
```

Warning: some scripts create, modify, or delete database data. Use only in development.

## Additional Documentation

See the step-by-step notes in:
- `detail step for all things/README.md`
- `detail step for all things/admin_operations.md`
- `detail step for all things/how_to_add_new_product.md`
- `detail step for all things/how_to_create_token.md`

## Notes

- Keep backend on port 5000 unless frontend API base URLs are updated.
- This project is intended for learning, demos, and resume/portfolio presentation.
