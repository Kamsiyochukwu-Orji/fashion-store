import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { CATEGORY_LABELS } from '@/utils/api'
import './ProductCard.css'

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const stars = '★'.repeat(Math.round(product.rating.rate)) + '☆'.repeat(5 - Math.round(product.rating.rate))

  return (
    <Link to={`/product/${product.id}`} className="pcard">
      <div className="pcard-img-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
        <div className="pcard-overlay">
          <span className="pcard-quick">Quick View</span>
        </div>
      </div>
      <div className="pcard-body">
        <span className="pcard-cat">{CATEGORY_LABELS[product.category] ?? product.category}</span>
        <p className="pcard-title">{product.title}</p>
        <div className="pcard-footer">
          <span className="pcard-price">${product.price.toFixed(2)}</span>
          <span className="pcard-stars" title={`${product.rating.rate}/5`}>{stars}</span>
        </div>
      </div>
    </Link>
  )
}
