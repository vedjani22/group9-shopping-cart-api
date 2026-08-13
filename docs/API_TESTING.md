# Milestone 4 API Testing Guide

Use Bruno, Postman, Thunder Client, or another REST client.

## Product live-demo sequence

### 1. Create product
POST `http://localhost:3001/products`

```json
{
  "user_id": 1,
  "category_id": 2,
  "product_name": "USB Keyboard",
  "description": "Compact keyboard for students",
  "price": 35.50,
  "status": "Available"
}
```
Expected: `201 Created` and a new `product_id`.

### 2. Verify product
GET `http://localhost:3001/products`
Expected: `200 OK`; the new product appears.

### 3. Update product
PUT `http://localhost:3001/products/5`

```json
{
  "user_id": 1,
  "category_id": 2,
  "product_name": "Wireless Keyboard",
  "description": "Updated wireless keyboard",
  "price": 45.00,
  "status": "Available"
}
```
Expected: `200 OK`.

### 4. Delete product
DELETE `http://localhost:3001/products/5`
Expected: `200 OK`.

### 5. Verify deletion
GET `http://localhost:3001/products/5`
Expected: `404 Not Found`.

## Additional endpoints

- Users: GET/POST/PUT/DELETE `/users`
- Categories: GET/POST/PUT/DELETE `/categories`
- Cart: GET/POST/PUT/DELETE `/cart`
- Orders: GET/POST/PUT/DELETE `/orders`
