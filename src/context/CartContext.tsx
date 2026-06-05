import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { CartItem, Product } from '@/types'

interface CartState { items: CartItem[] }

type Action =
  | { type: 'ADD'; payload: CartItem }
  | { type: 'REMOVE'; payload: { id: number; selectedSize: string; selectedColor: string } }
  | { type: 'UPDATE_QTY'; payload: { id: number; selectedSize: string; selectedColor: string; qty: number } }
  | { type: 'CLEAR' }

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const key = (i: CartItem) => `${i.id}-${i.selectedSize}-${i.selectedColor}`
      const exists = state.items.find(i => key(i) === key(action.payload))
      if (exists) {
        return { items: state.items.map(i => key(i) === key(action.payload) ? { ...i, quantity: i.quantity + action.payload.quantity } : i) }
      }
      return { items: [...state.items, action.payload] }
    }
    case 'REMOVE':
      return { items: state.items.filter(i => !(i.id === action.payload.id && i.selectedSize === action.payload.selectedSize && i.selectedColor === action.payload.selectedColor)) }
    case 'UPDATE_QTY':
      return { items: state.items.map(i => i.id === action.payload.id && i.selectedSize === action.payload.selectedSize && i.selectedColor === action.payload.selectedColor ? { ...i, quantity: action.payload.qty } : i) }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size: string, color: string, qty?: number) => void
  removeItem: (id: number, size: string, color: string) => void
  updateQty: (id: number, size: string, color: string, qty: number) => void
  clearCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })

  const addItem = (product: Product, size: string, color: string, qty = 1) =>
    dispatch({ type: 'ADD', payload: { ...product, selectedSize: size, selectedColor: color, quantity: qty } })

  const removeItem = (id: number, size: string, color: string) =>
    dispatch({ type: 'REMOVE', payload: { id, selectedSize: size, selectedColor: color } })

  const updateQty = (id: number, size: string, color: string, qty: number) =>
    dispatch({ type: 'UPDATE_QTY', payload: { id, selectedSize: size, selectedColor: color, qty } })

  const clearCart = () => dispatch({ type: 'CLEAR' })

  const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
