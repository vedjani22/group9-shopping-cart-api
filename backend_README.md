# Group 9 - Smart Student Marketplace Backend API

## Milestone 3: Backend Implementation

## Project Name
Smart Student Marketplace / Group 9 Shopping Cart API

## Project Description
Smart Student Marketplace is a backend API project created for students to buy and sell used college items such as textbooks, calculators, laptops, backpacks, electronics, and study materials.

This Milestone 3 project focuses only on backend implementation. The backend is built using TypeScript, Express, Node.js, and MySQL. It follows an organized route structure where each database resource has its own route file.

The API connects to a MySQL database and returns JSON data from different endpoints such as users, categories, products, cart, orders, and reports.

---

## Technologies Used

- Node.js
- TypeScript
- Express.js
- MySQL
- MySQL Workbench
- dotenv
- mysql2
- ts-node-dev

---

## Project Structure

```text
group9-shopping-cart-milestone3-backend/
│
├── package.json
├── tsconfig.json
├── .env.example
├── README.md
│
├── sql/
│   └── schema.sql
│
└── src/
    ├── index.ts
    ├── db.ts
    └── routes/
        ├── userRoutes.ts
        ├── categoryRoutes.ts
        ├── productRoutes.ts
        ├── cartRoutes.ts
        ├── orderRoutes.ts
        └── reportRoutes.ts
