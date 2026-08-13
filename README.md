Group 9 — Smart Student Marketplace

A REST API and web app that lets students buy and sell items with each other, such as textbooks, calculators, and lecture notes.

1. Technology

- Node.js
- TypeScript
- Express
- MySQL (mysql2)
- dotenv
- CORS
- bcrypt (password hashing)
- jsonwebtoken (login tokens)

2. Project Structure

group9-shopping-cart-api/
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
├── docs/
│ ├── API_TESTING.md
│ └── TEAM_CONTRIBUTIONS.md
└── src/
├── index.ts
├── db.ts
└── routes/
├── userRoutes.ts
├── categoryRoutes.ts
├── productRoutes.ts
├── cartRoutes.ts
└── orderRoutes.ts


3. Database Setup

1. Open MySQL Workbench.
2. Run the schema script to create the `group9_shopping_cart` database and its 5 tables (users, categories, products, cart, orders).

4. Environment Setup

Create a file named `.env` in the project root do NOT commit this file:

PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ved123
DB_NAME=group9_shopping_cart


5. Run Locally

npm install
npm run dev


Open `http://localhost:3001`

## API Endpoints

### Users & Login
- GET `/users`
- GET `/users/:id`
- POST `/users`
- PUT `/users/:id`
- DELETE `/users/:id`
- POST `/login`

### Categories
- GET `/categories`
- POST `/categories`
- PUT `/categories/:id`
- DELETE `/categories/:id`

### Products
- GET `/products`
- GET `/products/:id`
- POST `/products`
- PUT `/products/:id`
- DELETE `/products/:id`

### Cart
- GET `/cart`
- POST `/cart`
- PUT `/cart/:id`
- DELETE `/cart/:id`

### Orders
- GET `/orders`
- POST `/orders`
- PUT `/orders/:id`
- DELETE `/orders/:id`

## HTTP Status Codes

- 200: successful GET, PUT, or DELETE
- 201: successful POST
- 400: invalid request data
- 401/403: missing or invalid login token
- 404: resource not found
- 500: unexpected server/database error

## Team

- Ved Jani — Users, Categories, Login/Authentication
- Swet Patel — Products
- Jaspreet Singh — Cart, Orders, AI feature