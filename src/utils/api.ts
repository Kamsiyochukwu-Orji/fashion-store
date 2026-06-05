import type { Product } from '@/types'

const BASE = 'https://fakestoreapi.com'

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`)
  if (!res.ok) throw new Error('Product not found')
  return res.json()
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE}/products/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function fetchByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE}/products/category/${encodeURIComponent(category)}`)
  if (!res.ok) throw new Error('Failed to fetch category')
  return res.json()
}

// Map FakeStore categories to fashion labels
export const CATEGORY_LABELS: Record<string, string> = {
  "men's clothing": "Men",
  "women's clothing": "Women",
  "jewelery": "Jewellery",
  "electronics": "Accessories",
}

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
export const COLORS = ['#1a1a1a', '#c0392b', '#2980b9', '#27ae60', '#f39c12', '#8e44ad']
export const COLOR_NAMES: Record<string, string> = {
  '#1a1a1a': 'Black', '#c0392b': 'Red', '#2980b9': 'Blue',
  '#27ae60': 'Green', '#f39c12': 'Amber', '#8e44ad': 'Purple'
}
