import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div
      style={{
        padding: "12px 20px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <strong>Smart Student Marketplace</strong>
      {token && (
        <Link to="/cart" style={{ marginLeft: "20px" }}>
          Cart
        </Link>
      )}
      {token && (
        <button onClick={handleLogout} style={{ padding: "6px 12px" }}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
