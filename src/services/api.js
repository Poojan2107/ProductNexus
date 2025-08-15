import { database } from '../firebase.js'
import { ref, get, set, push, remove, update } from 'firebase/database'

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9)

export async function fetchProducts() {
  try {
    const productsRef = ref(database, 'products')
    const snapshot = await get(productsRef)
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      // Convert object to array format expected by the frontend
      return Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }))
    } else {
      return []
    }
  } catch (error) {
    throw new Error('FAILED TO LOAD PRODUCTS - CHECK INTERNET CONNECTION')
  }
}

export async function fetchProduct(id) {
  try {
    const productRef = ref(database, `products/${id}`)
    const snapshot = await get(productRef)
    
    if (snapshot.exists()) {
      return { id, ...snapshot.val() }
    } else {
      throw new Error('Product not found')
    }
  } catch (error) {
    throw new Error('Failed to fetch product')
  }
}

export async function createProduct(product) {
  try {
    const id = generateId()
    const productRef = ref(database, `products/${id}`)
    await set(productRef, product)
    return { id, ...product }
  } catch (error) {
    throw new Error('Failed to create product')
  }
}

export async function updateProduct(id, product) {
  try {
    const productRef = ref(database, `products/${id}`)
    await update(productRef, product)
    return { id, ...product }
  } catch (error) {
    throw new Error('Failed to update product')
  }
}

export async function deleteProduct(id) {
  try {
    const productRef = ref(database, `products/${id}`)
    await remove(productRef)
    return true
  } catch (error) {
    throw new Error('Failed to delete product')
  }
}


