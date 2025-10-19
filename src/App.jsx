import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProductList from "./pages/ProductList.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import ViewProduct from "./pages/ViewProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/:id" element={<ViewProduct />} />
              <Route path="/products/:id/edit" element={<EditProduct />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
