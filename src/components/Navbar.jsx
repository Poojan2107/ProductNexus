import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="brand">PRODUCT_APP.exe</Link>
        <nav className="navlinks">
          {user && (
            <>
              <NavLink to="/products" className={({isActive}) => isActive ? 'active' : ''}>PRODUCTS</NavLink>
              <NavLink to="/products/add" className={({isActive}) => isActive ? 'active' : ''}>ADD_PRODUCT</NavLink>
            </>
          )}
        </nav>
        <div className="authbox">
          {user ? (
            <>
              <span className="welcome">USER: {user.displayName || user.email}</span>
              <button className="btn muted" onClick={handleLogout}>LOGOUT</button>
            </>
          ) : (
            <>
              <Link className="btn" to="/login">LOGIN</Link>
              <Link className="btn accent" to="/register">REGISTER</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

