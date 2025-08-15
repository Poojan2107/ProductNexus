import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteProduct, fetchProducts } from '../services/api'
import '../components/Card.css'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    const ok = confirm('Delete this product?')
    if (!ok) return
    try {
      await deleteProduct(id)
      setProducts((p) => p.filter((x) => x.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div className="loading">Loading products...</div>
  if (error) return <div className="container">{error}</div>

  return (
    <div>
      <div className="actions" style={{marginBottom: '1rem'}}>
        <Link className="btn" to="/products/add">Add Product</Link>
      </div>
      {products.length === 0 ? (
        <div className="empty-state">No products yet. Create your first product to get started!</div>
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
                  <span>{p.category} • {p.subcategory}</span>
                </div>
                <p className="desc">{p.description}</p>
                <div className="actions">
                  <Link className="btn muted" to={`/products/${p.id}`}>View</Link>
                  <Link className="btn accent" to={`/products/${p.id}/edit`}>Edit</Link>
                  <button className="btn danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
