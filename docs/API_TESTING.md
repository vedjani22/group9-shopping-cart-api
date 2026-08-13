# &#x20;Milestone 4 API Testing Guide

# 

# Use Bruno, Postman, Thunder Client, or another REST client.

# 

# \# Product live-demo sequence

# 

# 1\. Create product

# POST `http://localhost:3001/products`

# 

# ```json

# {

# &#x20; "user\_id": 1,

# &#x20; "category\_id": 2,

# &#x20; "product\_name": "USB Keyboard",

# &#x20; "description": "Compact keyboard for students",

# &#x20; "price": 35.50,

# &#x20; "status": "Available"

# }

# ```

# Expected: `201 Created` and a new `product\_id`.

# 

# &#x20;2. Verify product

# GET `http://localhost:3001/products`

# Expected: `200 OK`; the new product appears.

# 

# &#x20;3. Update product

# PUT `http://localhost:3001/products/5`

# 

# ```json

# {

# &#x20; "user\_id": 1,

# &#x20; "category\_id": 2,

# &#x20; "product\_name": "Wireless Keyboard",

# &#x20; "description": "Updated wireless keyboard",

# &#x20; "price": 45.00,

# &#x20; "status": "Available"

# }

# ```

# Expected: `200 OK`.

# 

# &#x20;4. Delete product

# DELETE `http://localhost:3001/products/5`

# Expected: `200 OK`.

# 

# &#x20;5. Verify deletion

# GET `http://localhost:3001/products/5`

# Expected: `404 Not Found`.

# 

# \# Additional endpoints

# 

# Users: GET/POST/PUT/DELETE `/users`

# Categories: GET/POST/PUT/DELETE `/categories`

# Cart: GET/POST/PUT/DELETE `/cart`

# Orders: GET/POST/PUT/DELETE `/orders`

# 

# \# Milestone 5: Authentication testing

# 

# &#x20;1. Create a user

# POST `http://localhost:3001/users`

# Expected: `201 Created`. Password is hashed with bcrypt before being saved.

# 

# &#x20;2. Login

# POST `http://localhost:3001/users/login`

# Expected: `200 OK` with a JWT token returned.

# 

# &#x20;3. Access a protected route without a token

# POST `http://localhost:3001/products` (no Authorization header)

# Expected: `401 Unauthorized`, "Token required".

# 

# &#x20;4. Access a protected route with a valid token

# POST `http://localhost:3001/products` with header `Authorization: Bearer <token>`

# Expected: `201 Created`, product saved successfully.

# 

# &#x20;5. AI feature test

# POST `http://localhost:3001/ai/description` with a valid token and `product\_name` in the body

# Expected: `200 OK` with a generated description from Gemini.

