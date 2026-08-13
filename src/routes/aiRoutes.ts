import { Router } from "express";
import verifyToken from "../authMiddleware";

const router = Router();

router.post("/description", verifyToken, async (req, res) => {
  try {
    const { product_name } = req.body;

    if (!product_name) {
      return res.status(400).json({ message: "product_name is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

    const prompt =
      "Write a short, friendly 1-2 sentence product description for a student marketplace listing called " +
      product_name +
      ". Keep it under 30 words.";

    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey as string,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data: any = await geminiResponse.json();

    const description =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Could not generate a description.";

    res.json({ description });
  } catch (error) {
    res.status(500).json({ message: "Error generating description", error });
  }
});

export default router;
