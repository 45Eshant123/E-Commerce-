
# Admin Operations Guide (RBAC Enabled)

This document explains **step-by-step** how an Admin can manage products in the ShopHub e-commerce project.

---

## 1. Prerequisites

### Required Applications
- Node.js (v18+)
- MongoDB Compass
- Thunder Client (VS Code Extension)
- VS Code

### Required Services Running
- Backend server (`npm run dev` in `/backend`)
- Frontend server (`npm run dev` in root project)

---

## 2. Admin Account Setup (Very Important)

### Where:
MongoDB Compass → Database: `shophub` → Collection: `users`

### What to Check:
At least **one user must have**
```json
"role": "admin"
```

If not:
- Edit user document
- Change role from `user` → `admin`
- Save

---

## 3. Admin Login & JWT Token

### API:
```
POST /api/auth/login
```

### Body:
```json
{
  "email": "admin@test.com",
  "password": "your_password"
}
```

### Response:
You will get a **JWT token**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

⚠️ Copy this token — it is required for all admin operations.

---

## 4. Where to Use the Token

### Tool:
Thunder Client

### Headers:
```
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

---

## 5. Add New Product (ADMIN ONLY)

### API:
```
POST /api/products
```

### Body:
```json
{
  "name": "Nike Shoes",
  "price": 4999,
  "category": "Fashion",
  "description": "Comfortable running shoes",
  "image": "/img/shoes.png",
  "features": ["Lightweight", "Breathable"],
  "inStock": true
}
```

### Image Rule:
- Image **must exist** inside:
```
public/img/
```

Example:
```
public/img/shoes.png
```

---

## 6. Update Product (ADMIN ONLY)

### API:
```
PUT /api/products/:id
```

### Example:
```
PUT /api/products/9
```

### Body:
(Same as create)

---

## 7. Delete Product (ADMIN ONLY)

### API:
```
DELETE /api/products/:id
```

Example:
```
DELETE /api/products/9
```

Product will:
- Be removed from DB
- Disappear from public website instantly

---

## 8. Where Frontend Gets Products

### API Used:
```
GET /api/products
```

### File:
```
src/pages/HomePage.jsx
```

Frontend reads **only DB products** (not hardcoded ones).

---

## 9. Image Rendering Logic

### Component:
```
src/components/ProductCard.jsx
```

### Important Line:
```jsx
<img src={product.image} />
```

So DB value must be:
```
/img/filename.png
```

---

## 10. Common Errors & Fixes

### ❌ No authentication token provided
✔️ Fix:
- Add `Authorization: Bearer TOKEN` in headers

---

### ❌ Image not showing
✔️ Fix:
- Check image exists in `public/img`
- Restart frontend server

---

### ❌ 403 Forbidden
✔️ Fix:
- User role must be `admin`
- Token must belong to admin

---

## 11. Files Involved (Summary)

### Backend:
- `models/User.js`
- `middleware/auth.js`
- `middleware/authz.js`
- `routes/products.js`

### Frontend:
- `ProductCard.jsx`
- `HomePage.jsx`

---

## 12. Admin Flow (Simple)

```
Admin Login
↓
Get JWT Token
↓
Use Thunder Client
↓
Create / Update / Delete Product
↓
Public Site Auto Updates
```

---

## DONE ✅

Your admin system is production-ready.
