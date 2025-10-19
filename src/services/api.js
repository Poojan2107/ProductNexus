// Local product storage implementation using localStorage

// Local product storage implementation using localStorage
const LS_KEY = "product_app_products";

function loadStore() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveStore(obj) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(obj));
  } catch (e) {
    console.error("api: failed to save store", e);
  }
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export async function fetchProducts() {
  try {
    const store = loadStore();
    return Object.keys(store).map((k) => ({ id: k, ...store[k] }));
  } catch (e) {
    console.error("fetchProducts error:", e);
    throw new Error(
      "FAILED TO LOAD PRODUCTS: " + (e && e.message ? e.message : e),
    );
  }
}

export async function fetchProduct(id) {
  try {
    const store = loadStore();
    if (store[id]) return { id, ...store[id] };
    throw new Error("Product not found");
  } catch (e) {
    console.error("fetchProduct error:", e);
    throw new Error(
      "Failed to fetch product: " + (e && e.message ? e.message : e),
    );
  }
}

export async function createProduct(product) {
  try {
    const store = loadStore();
    const id = generateId();
    store[id] = product;
    saveStore(store);
    return { id, ...product };
  } catch (e) {
    console.error("createProduct error:", e);
    throw new Error(
      "Failed to create product: " + (e && e.message ? e.message : e),
    );
  }
}

export async function updateProduct(id, product) {
  try {
    const store = loadStore();
    if (!store[id]) throw new Error("Product not found");
    store[id] = { ...store[id], ...product };
    saveStore(store);
    return { id, ...store[id] };
  } catch (e) {
    console.error("updateProduct error:", e);
    throw new Error(
      "Failed to update product: " + (e && e.message ? e.message : e),
    );
  }
}

export async function deleteProduct(id) {
  try {
    const store = loadStore();
    if (!store[id]) throw new Error("Product not found");
    delete store[id];
    saveStore(store);
    return true;
  } catch (e) {
    console.error("deleteProduct error:", e);
    throw new Error(
      "Failed to delete product: " + (e && e.message ? e.message : e),
    );
  }
}
