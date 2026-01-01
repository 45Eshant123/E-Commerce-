
# how_to_add_new_product.md

## Admin Product Operations Guide

### 1. Where products come from
All products are created/updated/deleted from the backend API using Thunder Client or Postman.
Frontend only displays what backend returns.

---

### 2. Image rule (VERY IMPORTANT)
Images are NOT uploaded.
They must already exist in:

public/img/

Example valid image path:
/img/shoes.png

If the image file does not exist in public/img → product image will not show.

---

### 3. Add a NEW product (Admin)

Step 1: Put image in folder
public/img/shoes.png

Step 2: Thunder Client
POST http://localhost:5000/api/products

Headers:
Authorization: Bearer <ADMIN_JWT_TOKEN> example token --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDNhZmQ0OWZjNmUzMDk1Y2I0ZWVmNSIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjYzODUzNzEsImV4cCI6MTc2Njk5MDE3MX0.G65ANuVBgZcDSSx2gWP27qybaAstekwDLX-Uf6QgOQA

Content-Type: application/json

eg. body:-

inside the Body tag of the thunder client:
{
  "name": "Running Shoes",
  "price": 2499,
  "category": "Fashion",
  "description": "Lightweight running shoes",
  "image": "/img/shoes.png",
  "inStock": true
}

---

### 4. Product added but NOT visible? (MOST COMMON ISSUE)

Reason: PRICE FILTER
Homepage default filter:
0 – 1000

Shoes price:
2499

Solution:
Increase price filter to 3000+
OR update default price range in HomePage.jsx

---

### 5. Edit existing product

PUT http://localhost:5000/api/products/:id

---

### 6. Delete product

DELETE http://localhost:5000/api/products/:id

---

### 7. Golden rules
✔ Category must match exactly
✔ Image must exist in public/img
✔ Price must match frontend filter
✔ Admin token required

---

### 8. Why shoes looked missing
They were hidden due to frontend price filter, not backend.

Admin CRUD is working correctly.
