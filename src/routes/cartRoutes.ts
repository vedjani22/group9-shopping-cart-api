import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT cart.cart_id, cart.user_id, cart.product_id, cart.quantity,
             products.product_name, products.price
      FROM cart
      JOIN products ON cart.product_id = products.product_id
      ORDER BY cart.cart_id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const [result] = await pool.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [user_id, product_id, quantity || 1],
    );
    res.status(201).json({ message: "Item added to cart", result });
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    const [result]: any = await pool.query(
      "UPDATE cart SET quantity = ? WHERE cart_id = ?",
      [quantity, req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item updated", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [result]: any = await pool.query(
      "DELETE FROM cart WHERE cart_id = ?",
      [req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item removed", result });
  } catch (error) {
    res.status(500).json({ message: "Error removing cart item", error });
  }
});

export default router;
