import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchProductById, fetchAllProducts, SIZES, COLORS, COLOR_NAMES, CATEGORY_LABELS } from '@/utils/api'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setAdded(false)
    fetchProductById(Number(id)).then(async p => {
      setProduct(p)
      document.title = `${p.title} — DRIP`
      const all = await fetchAllProducts()
      setRelated(all.filter(r => r.category === p.category && r.id !== p.id).slice(0, 4))
      setLoading(false)
    }).catch(() => navigate('/shop'))
  }, [id, navigate])

  function handleAddToCart() {
    if (!product || !selectedSize) return
    addItem(product, selectedSize, selectedColor, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const stars = product ? '★'.repeat(Math.round(product.rating.rate)) + '☆'.repeat(5 - Math.round(product.rating.rate)) : ''

  if (loading) return (
    <div className="page detail-skeleton">
      <div className="skeleton" style={{ aspectRatio: '1', borderRadius: '16px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="skeleton" style={{ height: 20, width: '40%' }} />
        <div className="skeleton" style={{ height: 40, width: '80%' }} />
        <div className="skeleton" style={{ height: 32, width: '25%' }} />
        <div className="skeleton" style={{ height: 100 }} />
      </div>
    </div>
  )

  if (!product) return null

  return (
    <div className="page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <Link to={`/shop?cat=${product.category}`}>{CATEGORY_LABELS[product.category] ?? product.category}</Link> / <span>{product.title.slice(0, 30)}…</span>
      </div>

      <div className="detail-grid">
        {/* Image */}
        <div className="detail-img-panel">
          <div className="detail-img-wrap">
            <img src={product.image} alt={product.title} />
          </div>
        </div>

        {/* Info */}
        <div className="detail-info">
          <span className="detail-cat">{CATEGORY_LABELS[product.category] ?? product.category}</span>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating">
            <span className="stars">{stars}</span>
            <span className="rating-val">{product.rating.rate}</span>
            <span className="rating-count">({product.rating.count} reviews)</span>
          </div>

          <div className="detail-price">${product.price.toFixed(2)}</div>

          <p className="detail-desc">{product.description}</p>

          {/* Size */}
          <div className="option-group">
            <label>Size {!selectedSize && <span className="required">— please select</span>}</label>
            <div className="size-options">
              {SIZES.map(s => (
                <button key={s} className={`size-btn ${selectedSize === s ? 'active' : ''}`} onClick={() => setSelectedSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="option-group">
            <label>Color — <strong>{COLOR_NAMES[selectedColor]}</strong></label>
            <div className="color-options">
              {COLORS.map(c => (
                <button key={c} className={`color-btn ${selectedColor === c ? 'active' : ''}`}
                  style={{ background: c }}
                  onClick={() => setSelectedColor(c)}
                  title={COLOR_NAMES[c]}
                />
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div className="add-row">
            <div className="qty-control">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button
              className={`btn-primary add-btn ${added ? 'added' : ''}`}
              disabled={!selectedSize}
              onClick={handleAddToCart}
            >
              {added ? '✓ Added to Cart!' : !selectedSize ? 'Select a Size' : 'Add to Cart'}
            </button>
          </div>

          <Link to="/cart" className="view-cart-link">View Cart →</Link>

          {/* Meta */}
          <div className="detail-meta">
            <span>🚚 Free shipping over $50</span>
            <span>↩ 30-day returns</span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ marginTop: '3rem' }}>
          <h2 className="related-title">You might also like</h2>
          <div className="products-grid">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
