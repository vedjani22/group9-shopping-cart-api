import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.product_id, p.product_name, p.description, p.price, p.status, p.created_at,
             u.full_name AS seller_name, c.category_name
      FROM products p
      JOIN users u ON p.user_id = u.user_id
      JOIN categories c ON p.category_id = c.category_id
      ORDER BY p.product_id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE product_id = ?",
      [req.params.id],
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, category_id, product_name, description, price, status } =
      req.body;
    const [result] = await pool.query(
      "INSERT INTO products (user_id, category_id, product_name, description, price, status) VALUES (?, ?, ?, ?, ?, ?)",
      [
        user_id,
        category_id,
        product_name,
        description,
        price,
        status || "Available",
      ],
    );
    res.status(201).json({ message: "Product created", result });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { category_id, product_name, description, price, status } = req.body;
    const [result]: any = await pool.query(
      "UPDATE products SET category_id = ?, product_name = ?, description = ?, price = ?, status = ? WHERE product_id = ?",
      [category_id, product_name, description, price, status, req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [result]: any = await pool.query(
      "DELETE FROM products WHERE product_id = ?",
      [req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

export default router;
