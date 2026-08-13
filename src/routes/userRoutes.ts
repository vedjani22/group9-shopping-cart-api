import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT user_id, full_name, email, phone, created_at FROM users",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT user_id, full_name, email, phone, created_at FROM users WHERE user_id = ?",
      [req.params.id],
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { full_name, email, password, phone } = req.body;
    const [result] = await pool.query(
      "INSERT INTO users (full_name, email, password, phone) VALUES (?, ?, ?, ?)",
      [full_name, email, password, phone],
    );
    res.status(201).json({ message: "User created", result });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { full_name, email, phone } = req.body;
    const [result]: any = await pool.query(
      "UPDATE users SET full_name = ?, email = ?, phone = ? WHERE user_id = ?",
      [full_name, email, phone, req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [result]: any = await pool.query(
      "DELETE FROM users WHERE user_id = ?",
      [req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

export default router;
