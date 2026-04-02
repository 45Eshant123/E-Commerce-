# How To Get JWT Token (Quick Steps)

Use this when you only want the token from your backend.

## 1. Start backend server

From backend folder:

```bash
npm install
npm start
```

Make sure backend is running (example: `http://localhost:5000`).

## 2. Ensure JWT secret exists

Create `backend/.env`:

```env
JWT_SECRET=your_secret_key_here
```

Restart backend after adding `.env`.

## 3. Make sure admin/user account exists

You need valid login credentials.

Example:
- email: `admin@gmail.com`
- password: `admin123`

## 4. Send login request

Use Postman or Thunder Client:

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

If your backend URL is local, full URL may be:

```http
http://localhost:5000/api/auth/login
```

## 5. Copy token from response

Successful response returns:

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "email": "admin@gmail.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Copy the value of `token`. This is your JWT token.

## 6. Use token in protected API

Add this header in requests:

```http
Authorization: Bearer <your_token_here>
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 7. Common problems

- 401 Invalid email or password:
Use correct credentials.

- 401 No authentication token provided:
Add `Authorization` header.

- 401 Invalid authentication token:
Token expired or secret mismatch. Login again.

- 403 Admin access required:
Your user role is not admin.
