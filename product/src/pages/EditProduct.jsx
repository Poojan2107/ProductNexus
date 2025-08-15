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
      setError('All fields are required.')
      return
    }
    const price = Number(form.price)
    if (Number.isNaN(price) || price < 0) {
      setError('Price must be a valid non-negative number.')
      return
    }
    try {
      await updateProduct(id, { ...form, price })
      navigate(`/products/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="loading">Loading product...</div>

  return (
    <div className="form-card">
      <h2 className="form-title">Edit Product</h2>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>Name</span>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label>
        <div className="form-row">
          <label>
            <span>Price</span>
            <input type="number" name="price" value={form.price} onChange={handleChange} step="0.01" min="0" />
          </label>
          <label>
            <span>Category</span>
            <input type="text" name="category" value={form.category} onChange={handleChange} />
          </label>
        </div>
        <label>
          <span>Subcategory</span>
          <input type="text" name="subcategory" value={form.subcategory} onChange={handleChange} />
        </label>
        <label>
          <span>Description</span>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
        <button className="btn" type="submit">Update Product</button>
      </form>
    </div>
  )
}
