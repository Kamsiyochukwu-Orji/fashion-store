import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import { fetchAllProducts, fetchCategories, CATEGORY_LABELS } from '@/utils/api'
import type { Product, SortOption } from '@/types'
import './Shop.css'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const search = searchParams.get('search') ?? ''
  const cat = searchParams.get('cat') ?? ''
  const sort = (searchParams.get('sort') ?? 'default') as SortOption
  const minPrice = Number(searchParams.get('min') ?? 0)
  const maxPrice = Number(searchParams.get('max') ?? 1000)

  useEffect(() => {
    Promise.all([fetchAllProducts(), fetchCategories()]).then(([p, c]) => {
      setProducts(p)
      setCategories(c)
      setLoading(false)
    })
  }, [])

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value); else next.delete(key)
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (cat) list = list.filter(p => p.category === cat)
    if (search) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    if (maxPrice < 1000) list = list.filter(p => p.price >= minPrice && p.price <= maxPrice)
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => b.rating.rate - a.rating.rate); break
    }
    return list
  }, [products, cat, search, sort, minPrice, maxPrice])

  return (
    <div className="shop-layout page">
      {/* Sidebar */}
      <aside className="shop-sidebar">
        <h3>Filter</h3>

        <div className="filter-group">
          <label>Category</label>
          <button className={`filter-chip ${!cat ? 'active' : ''}`} onClick={() => setParam('cat', '')}>All</button>
          {categories.map(c => (
            <button key={c} className={`filter-chip ${cat === c ? 'active' : ''}`} onClick={() => setParam('cat', c)}>
              {CATEGORY_LABELS[c] ?? c}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <label>Sort by</label>
          {([['default', 'Featured'], ['price-asc', 'Price: Low → High'], ['price-desc', 'Price: High → Low'], ['rating', 'Top Rated']] as [SortOption, string][]).map(([val, label]) => (
            <button key={val} className={`filter-chip ${sort === val ? 'active' : ''}`} onClick={() => setParam('sort', val)}>
              {label}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <label>Max Price: ${maxPrice === 1000 ? 'Any' : maxPrice}</label>
          <input type="range" min={0} max={1000} step={10}
            value={maxPrice}
            onChange={e => setParam('max', e.target.value)}
            className="price-range"
          />
          <div className="price-labels"><span>$0</span><span>$1000+</span></div>
        </div>

        {(cat || search || sort !== 'default' || maxPrice < 1000) && (
          <button className="clear-filters" onClick={() => setSearchParams({})}>✕ Clear filters</button>
        )}
      </aside>

      {/* Main */}
      <div className="shop-main">
        <div className="shop-header">
          <div>
            {search && <p className="search-label">Results for "<strong>{search}</strong>"</p>}
            <p className="results-count">{filtered.length} products</p>
          </div>
        </div>

        {loading ? (
          <div className="products-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ aspectRatio: '3/4' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <p>😕 No products found.</p>
            <button className="btn-outline" onClick={() => setSearchParams({})}>Clear filters</button>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
