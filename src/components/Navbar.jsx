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
              <NavLink 
                to="/products" 
                className={({isActive}) => isActive ? 'active' : ''}
                style={{
                  color: '#ffffff !important',
                  border: '2px solid #ffffff',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  minWidth: '120px',
                  textAlign: 'center'
                }}
              >
                PRODUCTS
              </NavLink>
              <NavLink 
                to="/products/add" 
                className={({isActive}) => isActive ? 'active' : ''}
                style={{
                  color: '#ffffff !important',
                  border: '2px solid #ffffff',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  minWidth: '120px',
                  textAlign: 'center'
                }}
              >
                ADD_PRODUCT
              </NavLink>
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

