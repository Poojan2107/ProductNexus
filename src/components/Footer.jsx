import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer matrix">
      <div className="footer__inner">
        <div className="footer__brand">
          <h3 className="footer__title">PRODUCT NEXUS</h3>
          <p className="footer__tagline">WHERE PRODUCTS MEET PERFECTION</p>
        </div>
        <div className="footer__meta">
          <p>© {new Date().getFullYear()} • BUILT WITH REACT & FIREBASE</p>
          <p>VERSION 3.0.0 • QUANTUM READY</p>
        </div>
      </div>
    </footer>
  )
}


