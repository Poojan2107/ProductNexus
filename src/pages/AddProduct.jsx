import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../services/api'
import './Form.css'

export default function AddProduct() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', price: '', category: '', subcategory: '', description: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
      await createProduct({ ...form, price })
      navigate('/products')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-card matrix">
      <h2 className="form-title">ADD_PRODUCT.exe</h2>
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
        <button className="btn accent" disabled={loading} type="submit">
          {loading ? 'SAVING_PRODUCT...' : 'SAVE_PRODUCT'}
        </button>
      </form>
    </div>
  )
}
