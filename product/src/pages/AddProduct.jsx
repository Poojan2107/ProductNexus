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
      setError('All fields are required.')
      return
    }
    const price = Number(form.price)
    if (Number.isNaN(price) || price < 0) {
      setError('Price must be a valid non-negative number.')
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
    <div className="form-card">
      <h2 className="form-title">Add New Product</h2>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>Product Name</span>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" />
        </label>
        <div className="form-row">
          <label>
            <span>Price ($)</span>
            <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01" min="0" placeholder="0.00" />
          </label>
          <label>
            <span>Category</span>
            <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="e.g., Electronics" />
          </label>
        </div>
        <label>
          <span>Subcategory</span>
          <input type="text" name="subcategory" value={form.subcategory} onChange={handleChange} placeholder="e.g., Audio" />
        </label>
        <label>
          <span>Description</span>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your product..." />
        </label>
        <button className="btn" disabled={loading} type="submit">
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}
