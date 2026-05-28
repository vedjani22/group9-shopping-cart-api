import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Shopping Cart API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});