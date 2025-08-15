const API_BASE = 'http://localhost:5000'

// Helper function to handle fetch errors
const handleFetchError = async (response, defaultMessage) => {
  if (!response.ok) {
    let errorMessage = defaultMessage
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch {
      // If we can't parse the error response, use the default message
    }
    throw new Error(errorMessage)
  }
}

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`)
    await handleFetchError(res, 'FAILED TO LOAD PRODUCTS - CHECK SERVER CONNECTION')
    return res.json()
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('SERVER_UNAVAILABLE - START JSON-SERVER ON PORT 5000')
    }
    throw error
  }
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export async function createProduct(product) {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!res.ok) throw new Error('Failed to create product')
  return res.json()
}

export async function updateProduct(id, product) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!res.ok) throw new Error('Failed to update product')
  return res.json()
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete product')
  return true
}


