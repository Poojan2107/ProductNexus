// Seed localStorage for local-only mode (no Firebase)
const LS_KEY = "product_app_products";

const initialProducts = {
  1: {
    name: "Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    subcategory: "Audio",
    description:
      "Comfortable over-ear wireless headphones with noise isolation and 30-hour battery life.",
  },
  2: {
    name: "Coffee Maker",
    price: 49.5,
    category: "Home",
    subcategory: "Kitchen",
    description:
      "12-cup programmable coffee maker with reusable filter and automatic shut-off.",
  },
  3: {
    name: "Yoga Mat",
    price: 25,
    category: "Fitness",
    subcategory: "Accessories",
    description:
      "Non-slip, eco-friendly yoga mat with carrying strap, perfect for home and studio.",
  },
  4: {
    name: "MacBook",
    price: 50000,
    category: "Tech",
    subcategory: "Laptops",
    description: "This is a MacBook.",
  },
};

export async function initializeDatabase() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(initialProducts));
    console.log("Local database initialized successfully!");
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
