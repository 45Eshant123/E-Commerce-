# 🔐 JWT Token Creation & Usage Guide (Admin Authentication)

This guide explains **how JWT token is created**, **where it is generated**, and **how to use it** for admin-protected APIs in your MERN / Node.js backend.

---

## 📌 What is a Token?
A **JWT (JSON Web Token)** is a secure string used to:
- Verify user identity
- Protect admin routes
- Allow CRUD operations securely

---

## 🧱 Tech Stack Used
- Node.js
- Express.js
- MongoDB
- bcryptjs
- jsonwebtoken (JWT)

---

## 1️⃣ Install Required Packages
Run this in backend folder:

```bash
npm install jsonwebtoken bcryptjs dotenv
```

---

## 2️⃣ Setup Environment Variable

Create `.env` file in backend root:

```env
JWT_SECRET=supersecretkey123
```

⚠️ Restart server after this.

---

## 3️⃣ User Model (Important)
Ensure your **User schema** has `role` field.

```js
role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user'
}
```

---

## 4️⃣ Login API – Token Creation

📁 `routes/auth.js`

```js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({
    success: true,
    token,
    user: {
      email: user.email,
      role: user.role
    }
  });
});
```

---

## 5️⃣ Token Verification Middleware

📁 `middleware/auth.js`

```js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

---

## 6️⃣ Admin Authorization Middleware

📁 `middleware/authz.js`

```js
module.exports = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
```

---

## 7️⃣ Protect Product Routes

```js
router.post('/products', auth, authorize('admin'), controller);
```

---

## 8️⃣ Thunder Client / Postman Usage

### Login
```
POST /api/auth/login
```

Body:
```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

### Copy Token → Use in Headers
```
Authorization: Bearer <TOKEN>
```

---

## 9️⃣ Common Errors & Fix

| Error | Cause | Fix |
|-----|------|-----|
401 Unauthorized | Token missing | Add Authorization header |
403 Forbidden | Not admin | Set role=admin |
Token not returned | Backend bug | Check login route |

---

## ✅ Final Flow
1. Admin logs in
2. JWT token created
3. Token sent to frontend
4. Token attached in headers
5. Admin can add/update/delete products

---

## 🎯 You are now fully secure 🚀
