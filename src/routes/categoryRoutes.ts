import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { category_name } = req.body;
    const [result] = await pool.query(
      "INSERT INTO categories (category_name) VALUES (?)",
      [category_name],
    );
    res.status(201).json({ message: "Category created", result });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { category_name } = req.body;
    const [result]: any = await pool.query(
      "UPDATE categories SET category_name = ? WHERE category_id = ?",
      [category_name, req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category updated", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [result]: any = await pool.query(
      "DELETE FROM categories WHERE category_id = ?",
      [req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message:
          "Cannot delete category because it contains products. Delete or move the products first.",
      });
    }

    res.status(500).json({
      message: "Error deleting category",
      error: error.message,
    });
  }
});

export default router;
