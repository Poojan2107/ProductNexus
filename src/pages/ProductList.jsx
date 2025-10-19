import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, fetchProducts } from "../services/api";
import { initializeDatabase } from "../utils/initializeFirebase";
import "../components/Card.css";
import { useAuth } from "../hooks/useAuth";

export default function ProductList() {
  const { user, initializing } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      let data = await fetchProducts();

      if (data.length === 0) {
        try {
          await initializeDatabase();
          data = await fetchProducts();
        } catch (initError) {
          console.error("Failed to initialize database:", initError);
        }
      }

      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Only load when auth initialization is done and a user is present
  useEffect(() => {
    if (!initializing) {
      if (user) {
        load();
      } else {
        setLoading(false);
        setError("AUTH_REQUIRED: Please sign in to load products");
      }
    }
  }, [user, initializing]);

  const handleDelete = async (id) => {
    const ok = confirm("DELETE THIS PRODUCT? [Y/N]");
    if (!ok) return;
    try {
      await deleteProduct(id);
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="loading">LOADING PRODUCTS...</div>;
  if (error) return <div className="container terminal">{error}</div>;

  return (
    <div className="slide-in">
      <div className="actions">
        <Link className="btn accent" to="/products/add">
          + ADD_PRODUCT
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="empty-state terminal">
          <div>NO_PRODUCTS_FOUND.exe</div>
          <div style={{ marginTop: "1rem", fontSize: "0.9rem", opacity: 0.7 }}>
            CLICK "ADD_PRODUCT" TO BEGIN
          </div>
        </div>
      ) : (
        <div className="card-grid">
          {products.map((p) => (
            <div key={p.id} className="card-item">
              <div className="card">
                <div className="row">
                  <h3>{p.name}</h3>
                  <span className="price">${Number(p.price).toFixed(2)}</span>
                </div>
                <div className="row muted">
                  <span>
                    {p.category} / {p.subcategory}
                  </span>
                </div>
                <p className="desc">{p.description}</p>
                <div className="actions">
                  <Link className="btn muted" to={`/products/${p.id}`}>
                    VIEW
                  </Link>
                  <Link className="btn accent" to={`/products/${p.id}/edit`}>
                    EDIT
                  </Link>
                  <button
                    className="btn danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
