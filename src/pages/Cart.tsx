import { Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { COLOR_NAMES } from '@/utils/api'
import './Cart.css'

export default function Cart() {
  const { items, removeItem, updateQty, clearCart, total, count } = useCart()

  if (items.length === 0) return (
    <div className="page cart-empty">
      <div className="empty-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added anything yet.</p>
      <Link to="/shop" className="btn-primary">Start Shopping</Link>
    </div>
  )

  return (
    <div className="page">
      <div className="cart-header">
        <h1 className="cart-title">Your Cart <span>({count})</span></h1>
        <button className="clear-btn" onClick={clearCart}>Clear all</button>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          {items.map(item => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
              <div className="cart-item-img">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-title">{item.title}</Link>
                <div className="cart-item-meta">
                  <span>Size: <strong>{item.selectedSize}</strong></span>
                  <span>Color: <span className="color-dot" style={{ background: item.selectedColor }} /> <strong>{COLOR_NAMES[item.selectedColor]}</strong></span>
                </div>
                <div className="cart-item-footer">
                  <div className="qty-control">
                    <button onClick={() => {
                      if (item.quantity <= 1) removeItem(item.id, item.selectedSize, item.selectedColor)
                      else updateQty(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                    }}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}>+</button>
                  </div>
                  <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="remove-btn" onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-rows">
            {items.map(item => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="summary-row">
                <span>{item.title.slice(0, 28)}… × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-shipping">
            <span>Shipping</span>
            <span>{total >= 50 ? <span className="free">FREE</span> : '$4.99'}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${(total + (total >= 50 ? 0 : 4.99)).toFixed(2)}</span>
          </div>
          {total < 50 && (
            <p className="free-shipping-note">Add <strong>${(50 - total).toFixed(2)}</strong> more for free shipping!</p>
          )}
          <button className="btn-primary checkout-btn">Proceed to Checkout</button>
          <Link to="/shop" className="continue-link">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
