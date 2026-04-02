
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

HTTP Headers
Accept: */*
User-Agent: Thunder Client (https://www.thunderclient.com)
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTcyNzhmYWI0YWQ1YzYyOTM4YTEyZCIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzUxMjMyNDEsImV4cCI6MTc3NTcyODA0MX0.3RSjBYilfxFrpypeDoI9GQfwt-aAXJRO-i3wvNtXsfY


eg. body:-

inside the Body tag of the thunder client:
{
  "name": "suit",
  "price": 300000,
  "category": "Men party wear",
  "description": "great for all kind of the party",
  "image": "/img/suit.png",
  "rating": 4.5,
  "reviews": 200,
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

Step 1: Get product id

GET http://localhost:5000/api/products

Find the product and copy its numeric `id`.

Step 2: Send update request

PUT http://localhost:5000/api/products/:id

Example:

PUT http://localhost:5000/api/products/9

Headers:
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

Body example (change only fields you want):

{
  "name": "suit",
  "price": 300000006500000,
  "category": "Men party wear",
  "description": "great for all kind of the party",
  "image": "/img/suit.png",
  "rating": 4.5,
  "reviews": 200,
  "inStock": true
}

Expected success response:

{
  "success": true,
  "product": { "id": 9, "name": "Running Shoes Pro" }
}

Important:
- In your backend route, product lookup is by numeric `id` (not Mongo `_id`).
- If `id` is wrong, you get `Product not found`.

---

### 6. Delete product

Step 1: Get product id

GET http://localhost:5000/api/products

Step 2: Delete by id

DELETE http://localhost:5000/api/products/:id

Example:

DELETE http://localhost:5000/api/products/9

Headers:
Authorization: Bearer <ADMIN_JWT_TOKEN>

Expected success response:

{
  "success": true,
  "message": "Product deleted"
}

After delete:
- Product is removed from DB
- It disappears from frontend product list

Safety tip:
- First call GET `/api/products/:id` to verify correct product before delete.

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

---

### 9. Quick API summary (Create / Modify / Remove)

- Create: POST http://localhost:5000/api/products
- Modify: PUT http://localhost:5000/api/products/:id
- Remove: DELETE http://localhost:5000/api/products/:id
- List all: GET http://localhost:5000/api/products
