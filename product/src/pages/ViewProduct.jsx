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

  if (loading) return <div className="loading">LOADING_PRODUCT...</div>
  if (error) return <div className="container terminal">{error}</div>
  if (!product) return <div className="container terminal">PRODUCT_NOT_FOUND</div>

  return (
    <div className="container slide-in">
      <h2 className="page-title">{product.name}</h2>
      <div className="grid">
        <div className="col-6">
          <div className="container terminal">
            <div style={{marginBottom: '1rem'}}>
              <p style={{marginBottom: '0.75rem'}}>
                <strong style={{color: '#00ff00'}}>PRICE:</strong> 
                <span style={{marginLeft: '0.5rem', fontSize: '1.1rem', fontWeight: '600'}}>
                  ${Number(product.price).toFixed(2)}
                </span>
              </p>
              <p style={{marginBottom: '0.75rem'}}>
                <strong style={{color: '#00ff00'}}>CATEGORY:</strong> 
                <span style={{marginLeft: '0.5rem'}}>
                  {product.category} / {product.subcategory}
                </span>
              </p>
              <p style={{marginBottom: '0.5rem'}}>
                <strong style={{color: '#00ff00'}}>DESCRIPTION:</strong>
              </p>
              <p style={{lineHeight: '1.7', color: '#888888'}}>
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer" />
      <div className="actions">
        <Link className="btn accent" to={`/products/${product.id}/edit`}>EDIT_PRODUCT</Link>
        <Link className="btn muted" to="/products">BACK_TO_PRODUCTS</Link>
      </div>
    </div>
  )
}
