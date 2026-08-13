import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // if this exists, we are editing, not creating

  useEffect(() => {
    loadCategories();
    if (id) {
      loadExistingProduct();
    }
  }, [id]);

  async function loadCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (err) {
      setMessage("Could not load categories.");
    }
  }

  async function loadExistingProduct() {
    try {
      const response = await api.get(`/products/${id}`);
      const product = response.data[0];
      setProductName(product.product_name);
      setCategoryId(product.category_id);
      setDescription(product.description);
      setPrice(product.price);
    } catch (err) {
      setMessage("Could not load this product.");
    }
  }

  async function handleAskAI() {
    if (!productName) {
      setMessage("Type a product name first, then ask AI for a description.");
      return;
    }
    setAiLoading(true);
    try {
      const response = await api.post("/ai/description", {
        product_name: productName,
      });
      setDescription(response.data.description);
    } catch (err) {
      setMessage("AI could not generate a description right now.");
    }
    setAiLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const productData = {
      user_id: 7, // in a full version this would come from the logged-in user
      category_id: categoryId,
      product_name: productName,
      description,
      price,
      status: "Available",
    };

    try {
      if (id) {
        await api.put(`/products/${id}`, productData);
        setMessage("Product updated successfully.");
      } else {
        await api.post("/products", productData);
        setMessage("Product created successfully.");
      }
      navigate("/products");
    } catch (err) {
      setMessage(
        "Could not save product. Please check your inputs and try again.",
      );
    }
  }

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", padding: "20px" }}>
      <h2>{id ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Product Name</label>
          <br />
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Category</label>
          <br />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Price</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{ width: "100%", padding: "8px" }}
          />
          <br />
          <button
            type="button"
            onClick={handleAskAI}
            disabled={aiLoading}
            style={{ marginTop: "6px" }}
          >
            {aiLoading ? "Asking AI..." : "Ask AI to write description"}
          </button>
        </div>

        {message && <p>{message}</p>}

        <button type="submit" style={{ padding: "8px 16px" }}>
          {id ? "Save Changes" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
