import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, fetchProducts } from "../services/api";
import "../components/Card.css";
import { useAuth } from "../hooks/useAuth";

export default function ProductList() {
  const { user, initializing } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
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

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(search.toLowerCase());
      const price = Number(p.price);
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      const matchesPrice = price >= min && price <= max;
      return matchesSearch && matchesPrice;
    });

    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
      return 0;
    });

    setFilteredProducts(filtered);
  }, [products, search, minPrice, maxPrice, sortBy]);

  const handleDelete = async (id) => {
    const ok = confirm("DELETE THIS PRODUCT? [Y/N]");
    if (!ok) return;
    try {
      await deleteProduct(id);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="loading">LOADING PRODUCTS...</div>;
  if (error) return <div className="container terminal">{error}</div>;

  return (
    <div className="slide-in">
      <div className="filters" style={{ marginBottom: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            placeholder="SEARCH_PRODUCTS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="btn"
            style={{ padding: "0.75rem 1.5rem", border: "2px solid var(--border-secondary)", background: "var(--bg-tertiary)", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", borderRadius: "8px", width: "200px" }}
          />
          <input
            type="number"
            placeholder="MIN_PRICE"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="btn"
            style={{ padding: "0.75rem 1.5rem", border: "2px solid var(--border-secondary)", background: "var(--bg-tertiary)", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", borderRadius: "8px", width: "120px" }}
          />
          <input
            type="number"
            placeholder="MAX_PRICE"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="btn"
            style={{ padding: "0.75rem 1.5rem", border: "2px solid var(--border-secondary)", background: "var(--bg-tertiary)", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", borderRadius: "8px", width: "120px" }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="btn"
            style={{ padding: "0.75rem 1.5rem", border: "2px solid var(--border-secondary)", background: "var(--bg-tertiary)", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", borderRadius: "8px", cursor: "pointer" }}
          >
            <option value="name">SORT_BY_NAME</option>
            <option value="price-asc">SORT_BY_PRICE_ASC</option>
            <option value="price-desc">SORT_BY_PRICE_DESC</option>
          </select>
        </div>
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
          {filteredProducts.map((p) => (
            <div key={p._id} className="card-item">
              <div className="card">
                <div style={{ marginBottom: "0.5rem", height: "150px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-tertiary)", borderRadius: "8px", overflow: "hidden" }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>NO_IMAGE</div>
                  )}
                </div>
                <div className="row">
                  <h3>{p.name}</h3>
                  <span className="price">₹{Number(p.price).toFixed(2)}</span>
                </div>
                <div className="row muted">
                  <span>
                    {p.category} / {p.subcategory}
                  </span>
                </div>
                <p className="desc">{p.description}</p>
                <div className="actions">
                  <Link className="btn muted" to={`/products/${p._id}/view`}>
                    VIEW
                  </Link>
                  <Link className="btn accent" to={`/products/${p._id}/edit`}>
                    EDIT
                  </Link>
                  <button
                    className="btn danger"
                    onClick={() => handleDelete(p._id)}
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
