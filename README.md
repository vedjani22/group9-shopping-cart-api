# Group 9 Smart Student Marketplace — Milestone 4

## Overview
This is the Milestone 4 backend REST API for the Smart Student Marketplace. It extends the Milestone 3 GET-only backend with full CRUD operations.

This project intentionally does **not** include Juice Shop/juicereport and does **not** include authentication. Authentication belongs to Milestone 5.

## Technology
- Node.js
- TypeScript
- Express
- MySQL
- mysql2
- dotenv
- CORS

## Main requirements completed
- GET, POST, PUT/PATCH, and DELETE endpoints
- Separate route files per resource
- Parameterized SQL queries
- Appropriate status codes: 200, 201, 400, 404, 500
- MySQL SQL setup file
- Clean `index.ts`
- Shared `db.ts`

## Project structure
```text
group9-shopping-cart-milestone4-backend/
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── README.md
├── sql/
│   └── schema.sql
├── docs/
│   ├── API_TESTING.md
│   └── TEAM_CONTRIBUTIONS.md
└── src/
    ├── index.ts
    ├── db.ts
    └── routes/
        ├── userRoutes.ts
        ├── categoryRoutes.ts
        ├── productRoutes.ts
        ├── cartRoutes.ts
        └── orderRoutes.ts
```

## Database setup
1. Open MySQL Workbench.
2. Open `sql/schema.sql`.
3. Run the full script.
4. Confirm the database `smart_student_marketplace` contains five tables.

## Environment setup
Copy `.env.example` to a new file named `.env`.

```env
PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD="your_mysql_password"
DB_NAME=smart_student_marketplace
```

Do not commit `.env`.

## Run locally
```bash
npm install
npm run dev
```

Open `http://localhost:3001`.

## API endpoints

### Users
- GET `/users`
- GET `/users/:id`
- POST `/users`
- PUT `/users/:id`
- DELETE `/users/:id`

### Categories
- GET `/categories`
- GET `/categories/:id`
- POST `/categories`
- PUT `/categories/:id`
- DELETE `/categories/:id`

### Products
- GET `/products`
- GET `/products/:id`
- POST `/products`
- PUT `/products/:id`
- PATCH `/products/:id`
- DELETE `/products/:id`

### Cart
- GET `/cart`
- GET `/cart/:id`
- POST `/cart`
- PUT `/cart/:id`
- DELETE `/cart/:id`

### Orders
- GET `/orders`
- GET `/orders/:id`
- POST `/orders`
- PUT `/orders/:id`
- DELETE `/orders/:id`

## HTTP status codes
- 200: successful GET, PUT, PATCH, or DELETE
- 201: successful POST
- 400: invalid request data or relationship conflict
- 404: resource not found
- 500: unexpected server/database error

## Testing
See `docs/API_TESTING.md` for a complete POST → GET → PUT → DELETE live-demonstration sequence.

## GitHub requirements
- Do not commit `node_modules` or `.env`.
- Use at least three meaningful commits.
- Every member should commit their own endpoint work.
