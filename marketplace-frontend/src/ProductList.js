import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      setMessage("Could not load products. Please try again later.");
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/products/${id}`);
      setMessage("Product deleted successfully.");
      loadProducts();
    } catch (err) {
      setMessage("Could not delete product. You may need to log in again.");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Products</h2>
        <button
          onClick={() => navigate("/products/new")}
          style={{ padding: "8px 16px" }}
        >
          + Add Product
        </button>
      </div>

      {message && <p>{message}</p>}

      {products.length === 0 && !message && <p>No products yet.</p>}

      {products.map((product) => (
        <div
          key={product.product_id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <strong>{product.product_name}</strong> — ${product.price} —{" "}
          {product.status}
          <br />
          <span>{product.description}</span>
          <br />
          <button
            onClick={() => navigate(`/products/edit/${product.product_id}`)}
            style={{ marginRight: "8px" }}
          >
            Edit
          </button>
          <button onClick={() => handleDelete(product.product_id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
