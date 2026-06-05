import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { count } = useCart()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand">DRIP</NavLink>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>Shop</NavLink>
        <NavLink to="/shop?cat=men's clothing" className={({ isActive }) => isActive ? 'active' : ''}>Men</NavLink>
        <NavLink to="/shop?cat=women's clothing" className={({ isActive }) => isActive ? 'active' : ''}>Women</NavLink>
      </nav>
      <div className="navbar-right">
        <form onSubmit={handleSearch} className="navbar-search">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" />
          <button type="submit">⌕</button>
        </form>
        <NavLink to="/cart" className="cart-btn">
          <span>🛒</span>
          {count > 0 && <span className="cart-count">{count}</span>}
        </NavLink>
      </div>
    </header>
  )
}
