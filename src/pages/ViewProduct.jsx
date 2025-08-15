import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProduct } from '../services/api'

export default function ViewProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProduct(id)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="container">Loading...</div>
  if (error) return <div className="container">{error}</div>
  if (!product) return <div className="container">Not found</div>

  return (
    <div className="container">
      <h2 className="page-title">{product.name}</h2>
      <div className="grid">
        <div className="col-6">
          <div className="container">
            <p><strong>Price:</strong> ${Number(product.price).toFixed(2)}</p>
            <p><strong>Category:</strong> {product.category} / {product.subcategory}</p>
            <p><strong>Description:</strong></p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <div className="spacer" />
      <div className="actions">
        <Link className="btn" to={`/products/${product.id}/edit`}>Edit</Link>
        <Link className="btn muted" to="/products">Back</Link>
      </div>
    </div>
  )
}


