# 👗 DRIP — Fashion & Clothing Store

A bold, full-featured e-commerce product page built with **React 18**, **TypeScript**, and **React Router 6**. Browse, filter, and shop fashion products powered by the free FakeStoreAPI — no backend or API key required.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗂 Project Structure

```
fashion-store/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Sticky navbar with search & cart badge
│   │   ├── Navbar.css
│   │   ├── ProductCard.tsx    # Reusable product card with hover overlay
│   │   └── ProductCard.css
│   ├── context/
│   │   └── CartContext.tsx    # Global cart state (Context + useReducer)
│   ├── pages/
│   │   ├── Home.tsx           # Hero, category tiles, featured products
│   │   ├── Home.css
│   │   ├── Shop.tsx           # Product listing with search & filters
│   │   ├── Shop.css
│   │   ├── ProductDetail.tsx  # Full product page with size/color/qty picker
│   │   ├── ProductDetail.css
│   │   ├── Cart.tsx           # Cart page with order summary
│   │   └── Cart.css
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── utils/
│   │   └── api.ts             # API functions & constants
│   ├── App.tsx                # Root component with Router & CartProvider
│   ├── index.css              # Global styles & design tokens
│   └── main.tsx               # App entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📄 Pages & Routing

| Route           | Component           | Description                                                 |
| --------------- | ------------------- | ----------------------------------------------------------- |
| `/`             | `Home.tsx`          | Hero banner, category tiles, featured products, promo strip |
| `/shop`         | `Shop.tsx`          | Full product listing with sidebar filters                   |
| `/shop?search=` | `Shop.tsx`          | Search results (URL-based query)                            |
| `/shop?cat=`    | `Shop.tsx`          | Products filtered by category                               |
| `/product/:id`  | `ProductDetail.tsx` | Full product page with add-to-cart                          |
| `/cart`         | `Cart.tsx`          | Cart contents and order summary                             |

---

## 🔌 API

Uses the **[FakeStoreAPI](https://fakestoreapi.com)** — completely free with no API key required.

| Function                | Endpoint                       | Description                |
| ----------------------- | ------------------------------ | -------------------------- |
| `fetchAllProducts()`    | `GET /products`                | Fetch all products         |
| `fetchProductById(id)`  | `GET /products/:id`            | Fetch a single product     |
| `fetchCategories()`     | `GET /products/categories`     | Fetch all category names   |
| `fetchByCategory(name)` | `GET /products/category/:name` | Fetch products by category |

All API logic lives in `src/utils/api.ts`.

---

## 🧩 Key Features

- **Home page** — bold hero with animated color blobs, category quick-tiles, featured product grid, free shipping banner
- **Shop page** — filter by category, sort by price or rating, max price range slider, URL-persisted filters, clear all
- **Product detail** — size selector, color picker (6 options), quantity control, add to cart with confirmation state, related products
- **Cart** — add/remove/update quantity, persistent across navigation, free shipping threshold tracker, order summary
- **Search** — navbar search bar navigates to `/shop?search=` and filters products in real time
- **Skeleton loaders** — shown while API data is loading on every page
- **Responsive** — two-column layouts collapse to single column on mobile

---

## 🛒 Cart State

Cart is managed globally using **React Context** and **`useReducer`** — no external library needed.

Supported actions:

| Action       | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| `ADD`        | Add item or increment quantity if same size + color combo exists |
| `REMOVE`     | Remove a specific item by id + size + color                      |
| `UPDATE_QTY` | Set exact quantity for an item                                   |
| `CLEAR`      | Empty the entire cart                                            |

Cart state is accessible anywhere in the app via the `useCart()` hook.

---

## 🛠 Tech Stack

| Tool                       | Purpose                                 |
| -------------------------- | --------------------------------------- |
| React 18                   | UI framework                            |
| TypeScript                 | Type safety                             |
| React Router 6             | Client-side routing                     |
| Vite                       | Build tool & dev server                 |
| React Context + useReducer | Global cart state management            |
| Google Fonts               | Typography (Bebas Neue + Space Grotesk) |

---

## 🌍 Deployment

No environment variables required. Deploy to **Vercel** in two steps:

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com) — Vercel auto-detects Vite

For SPA routing to work on Vercel, add a `vercel.json` at the root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 📸 Pages Overview

- **Home** — Dark hero with animated blobs, Men / Women / Jewellery category tiles, featured grid, promo banner
- **Shop** — Sticky sidebar with category, sort, and price filters; live-filtered product grid
- **Product Detail** — Full-size image, size buttons, color swatches, quantity stepper, related products
- **Cart** — Item list with qty controls, color/size summary, free shipping nudge, checkout button

---

## 📝 License

MIT — free to use and modify.
