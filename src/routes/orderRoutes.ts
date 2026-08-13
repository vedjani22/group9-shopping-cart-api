import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT o.order_id, o.user_id, u.full_name, o.product_id, p.product_name,
             o.total_amount, o.order_date
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      JOIN products p ON o.product_id = p.product_id
      ORDER BY o.order_id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, product_id, total_amount, order_date } = req.body;
    const [result] = await pool.query(
      "INSERT INTO orders (user_id, product_id, total_amount, order_date) VALUES (?, ?, ?, ?)",
      [user_id, product_id, total_amount, order_date],
    );
    res.status(201).json({ message: "Order created", result });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { total_amount, order_date } = req.body;
    const [result]: any = await pool.query(
      "UPDATE orders SET total_amount = ?, order_date = ? WHERE order_id = ?",
      [total_amount, order_date, req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order updated", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [result]: any = await pool.query(
      "DELETE FROM orders WHERE order_id = ?",
      [req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

export default router;
