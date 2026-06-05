import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import { fetchAllProducts } from '@/utils/api'
import type { Product } from '@/types'
import './Home.css'

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllProducts().then(products => {
      const clothing = products.filter(p =>
        p.category === "men's clothing" || p.category === "women's clothing"
      )
      setFeatured(clothing.slice(0, 8))
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">New Season Drop</span>
          <h1 className="hero-title">DRESS<br /><span>DIFFERENT.</span></h1>
          <p className="hero-sub">Bold cuts. Loud colors. Zero compromise.</p>
          <div className="hero-btns">
            <Link to="/shop" className="btn-primary">Shop Now</Link>
            <Link to="/shop?cat=women's clothing" className="btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>Women's Collection</Link>
          </div>
        </div>
        <div className="hero-grid">
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-blob hero-blob-3" />
        </div>
      </section>

      {/* Categories */}
      <section className="categories-strip">
        <Link to="/shop?cat=men's clothing" className="cat-tile cat-men">
          <span>MEN</span>
        </Link>
        <Link to="/shop?cat=women's clothing" className="cat-tile cat-women">
          <span>WOMEN</span>
        </Link>
        <Link to="/shop?cat=jewelery" className="cat-tile cat-jewel">
          <span>JEWELLERY</span>
        </Link>
      </section>

      {/* Featured */}
      <section className="page featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Pieces</h2>
          <Link to="/shop" className="see-all">See all →</Link>
        </div>
        <div className="products-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ aspectRatio: '3/4' }} />
              ))
            : featured.map(p => <ProductCard key={p.id} product={p} />)
          }
        </div>
      </section>

      {/* Banner */}
      <section className="banner">
        <h2>FREE SHIPPING ON ORDERS OVER <span>$50</span></h2>
        <Link to="/shop" className="btn-primary">Start Shopping</Link>
      </section>
    </div>
  )
}
