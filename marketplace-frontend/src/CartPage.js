import { useState, useEffect } from "react";
import api from "./api";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const response = await api.get("/cart");
      setCartItems(response.data);
    } catch (err) {
      setMessage("Could not load cart items.");
    }
  }

  async function handleRemove(id) {
    try {
      await api.delete(`/cart/${id}`);
      setMessage("Item removed from cart.");
      loadCart();
    } catch (err) {
      setMessage("Could not remove item. You may need to log in again.");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Cart</h2>

      {message && <p>{message}</p>}

      {cartItems.length === 0 && !message && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div
          key={item.cart_id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <strong>{item.product_name}</strong> — ${item.price} — Quantity:{" "}
          {item.quantity}
          <br />
          <button
            onClick={() => handleRemove(item.cart_id)}
            style={{ marginTop: "6px" }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default CartPage;
