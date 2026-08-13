 Group 9 — Smart Student Marketplace

A REST API and web app that lets students buy and sell items with each other, such as textbooks, calculators, and lecture notes.

1 Prerequisites

- Node.js (v18 or higher)
- MySQL Workbench (or another MySQL client)
- A free Google Gemini API key (for the AI feature) — get one at https://aistudio.google.com/apikey

2 Technology

- Node.js
- TypeScript
- Express
- MySQL (mysql2)
- dotenv
- CORS
- bcrypt (password hashing)
- jsonwebtoken (login tokens)

3 Project Structure

group9-shopping-cart-api/
├── package.json
├── tsconfig.json
├── .gitignore
├── .env.example
├── schema.sql
├── README.md
├── docs/
│ ├── API_TESTING.md
│ └── TEAM_CONTRIBUTIONS.md
├── src/
│ ├── index.ts
│ ├── db.ts
│ ├── authMiddleware.ts
│ └── routes/
│ ├── userRoutes.ts
│ ├── categoryRoutes.ts
│ ├── productRoutes.ts
│ ├── cartRoutes.ts
│ ├── orderRoutes.ts
│ └── aiRoutes.ts
└── marketplace-frontend/
└── src/ (React app)


4 Database Setup

1. Open MySQL Workbench.
2. Run the included `schema.sql` file. This creates the `group9_shopping_cart` database and its 5 tables (users, categories, products, cart, orders).

5 Environment Setup

Copy `.env.example` to a new file named `.env` in the project root, and fill in your own local values:

PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=group9_shopping_cart
JWT_SECRET=your_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here


Do not commit `.env`.

6 Run Locally

Backend:

npm install
npm run dev

Backend runs at `http://localhost:3001`

Frontend (in a separate terminal):

cd marketplace-frontend
npm install
npm start

Frontend runs at `http://localhost:3000`

7 Test Credentials

Use this account to log in and test all protected features:

Email: test@example.com
Password: test123


8 API Endpoints

### Users & Login
- GET `/users`
- GET `/users/:id`
- POST `/users`
- PUT `/users/:id`
- DELETE `/users/:id`
- POST `/users/login`

# Categories
- GET `/categories`
- POST `/categories`
- PUT `/categories/:id`
- DELETE `/categories/:id`

# Products
- GET `/products`
- GET `/products/:id`
- POST `/products`
- PUT `/products/:id`
- DELETE `/products/:id`

# Cart
- GET `/cart`
- POST `/cart`
- PUT `/cart/:id`
- DELETE `/cart/:id`

# Orders
- GET `/orders`
- POST `/orders`
- PUT `/orders/:id`
- DELETE `/orders/:id`

# AI Feature
- POST `/ai/description` — generates a product description using Google Gemini. Requires a valid login token. Body: `{ "product_name": "..." }`

# HTTP Status Codes

- 200: successful GET, PUT, or DELETE
- 201: successful POST
- 400: invalid request data
- 401/403: missing or invalid login token
- 404: resource not found
- 500: unexpected server/database error

# Team

- Ved Jani — Users, Categories, Login/Authentication
- Swet Patel — Products
- Jaspreet Singh — Cart, Orders, AI feature