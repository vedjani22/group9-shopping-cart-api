CREATE DATABASE IF NOT EXISTS group9_shopping_cart;
USE group9_shopping_cart;

CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  category_id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  category_id INT,
  product_name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS cart (
  cart_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  total_amount DECIMAL(10,2),
  order_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Sample data for testing
INSERT INTO categories (category_name) VALUES
('Textbooks'), ('Electronics'), ('Study Materials');