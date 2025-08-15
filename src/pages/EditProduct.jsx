import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProduct, updateProduct } from '../services/api'
import './Form.css'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', price: '', category: '', subcategory: '', description: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProduct(id)
        setForm({
          name: data.name || '',
          price: data.price?.toString() || '',
          category: data.category || '',
          subcategory: data.subcategory || '',
          description: data.description || '',
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.price || !form.category || !form.subcategory || !form.description) {
      setError('ALL_FIELDS_REQUIRED')
      return
    }
    const price = Number(form.price)
    if (Number.isNaN(price) || price < 0) {
      setError('PRICE_MUST_BE_VALID_NON_NEGATIVE_NUMBER')
      return
    }
    try {
      await updateProduct(id, { ...form, price })
      navigate(`/products/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="loading">LOADING_PRODUCT...</div>

  return (
    <div className="form-card matrix">
      <h2 className="form-title">EDIT_PRODUCT.exe</h2>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>PRODUCT_NAME</span>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" />
        </label>
        <div className="form-row">
          <label>
            <span>PRICE</span>
            <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01" min="0" placeholder="0.00" />
          </label>
          <label>
            <span>CATEGORY</span>
            <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Electronics" />
          </label>
        </div>
        <label>
          <span>SUBCATEGORY</span>
          <input type="text" name="subcategory" value={form.subcategory} onChange={handleChange} placeholder="Smartphones" />
        </label>
        <label>
          <span>DESCRIPTION</span>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter product description..." />
        </label>
        <button className="btn accent" type="submit">UPDATE_PRODUCT</button>
      </form>
    </div>
  )
}
