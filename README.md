# 🛒 NexaMart — Modern Full-Stack E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-nexamart--alpha.vercel.app-00DC82?style=for-the-badge&logo=vercel)](https://nexamart-alpha.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub_Repo-Adnan4141%2Fnexa--mart--ecommerce-181717?style=for-the-badge&logo=github)](https://github.com/Adnan4141/nexa-mart-ecommerce)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

---

## 🔗 Quick Links
- **🌐 Live Production URL**: [https://nexamart-alpha.vercel.app](https://nexamart-alpha.vercel.app)
- **📦 Alternative Production URL**: [https://nexamart-five.vercel.app](https://nexamart-five.vercel.app)
- **📂 GitHub Repository**: [https://github.com/Adnan4141/nexa-mart-ecommerce](https://github.com/Adnan4141/nexa-mart-ecommerce)

---

## 📖 Project Overview
**NexaMart** is a production-grade, high-performance, full-stack e-commerce application engineered with **Next.js (App Router, Turbopack)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. 

Designed with a clean, extensible architecture, the backend is architected around **Prisma ORM + PostgreSQL** for rock-solid relational data modeling, order management, interactive wishlist handling, real-time order tracking, and a comprehensive **Admin Control Center**.

---

## 🚀 Key Features Breakdown

### 🛍️ 1. Storefront & Customer Experience
- **Hero Bento Grid**: High-conversion visual showcases for Furniture, Men's Fashion, and Kids' collections with hover-lift micro-interactions.
- **Weekly Best Deals**: Dark teal (`#082928`) section with a real-time countdown timer (`HH:MM:SS`), discount badges, customer star ratings, and slide-up cart triggers.
- **Shop Deals by Category**: Interactive circular categories, spotlight cards (Nikon, Samsung, ANC Audio), and coupon banner.
- **Popular Products Grid**: 10-product curated grid with smooth "Load More" pagination.
- **Sneaker Fest & Best Sellers**: Countdown spotlight paired with a multi-tab best-seller showcase.
- **Most Popular Sellers & Trust Badges**: Verified merchant badges, Money-Back Guarantee, 24/7 Customer Service, and Free Shipping propositions.

### 💖 2. Wishlist & Smart Cart Drawer
- **Persistent Wishlist**: One-click heart toggle to save favorite products, with badge counter in the navbar and quick-add to cart.
- **Interactive Cart Drawer**: Slide-over drawer with item increment/decrement, tax calculation, free-shipping threshold tracker, and empty-state guidance.

### 🚚 3. Dedicated VIP Express Delivery Booking (`/delivery`)
- **Shadcn-Style Components**:
  - Interactive **DatePicker** with popover calendar.
  - Custom **TimePicker** for delivery windows (Morning, Afternoon, Evening, Express).
  - Clean validation with dynamic confirmation screen and tracking ID generation.

### 📍 4. Real-Time Order Tracking
- **Order Tracking Portal**: Check real-time shipment status using order ID or phone number.
- **Multi-Stage Stepper**: Visual delivery timeline (Order Placed ➔ Processing ➔ Out for Delivery ➔ Delivered).
- **Courier & Time-Window Information**: Displays assigned courier and scheduled VIP delivery slot.

### 🔐 5. Split-Screen Animated Authentication (`/login`)
- **Dual Column Layout**: Left brand VIP hero banner + Right compact auth card.
- **Animated Tab Switcher**: Smooth sliding pill switcher between **Sign In** and **Register**.
- **Directional Animations**: Smooth cubic-bezier transitions (`anim-auth-slide-left` and `anim-auth-slide-right`) with staggered delays.

### 🛡️ 6. Comprehensive Admin Panel (Control Center)
The Admin Dashboard empowers store owners to manage every aspect of the platform:
- **📊 Analytics & Overview**: Total revenue, total orders, active customers, sales trends, and inventory health.
- **📦 Product & Category Management**: Full CRUD operations (Add, Edit, Delete, Stock Update, Category Assignment, Image Uploads).
- **📋 Order & Delivery Dispatch Control**: View all incoming orders, update statuses (Pending, Packed, Shipped, Delivered), and manage VIP Delivery time slots.
- **🎟️ Discount & Coupon Manager**: Create promotional coupon codes, percentage discounts, and expiry dates.
- **👥 User & Vendor Management**: Manage customer accounts, seller profiles, and store approvals.

---

## 🏗️ System Architecture & Workflow

```mermaid
flowchart TD
    subgraph Client ["Frontend Layer (Next.js App Router)"]
        UI_Home["/ (Storefront)"]
        UI_Login["/login (Animated Auth Tabs)"]
        UI_Delivery["/delivery (VIP Delivery Booking)"]
        UI_Track["/track-order (Live Order Tracking)"]
        UI_Admin["/admin (Comprehensive Admin Dashboard)"]
        UI_Cart["Cart & Wishlist (Global Context)"]
    end

    subgraph State ["Client State & Caching"]
        CartContext["Cart & Wishlist Context (Local Storage)"]
        ReactQuery["Server Actions / Cache"]
    end

    subgraph Backend ["Backend & API Layer"]
        AppRoutes["Route Handlers (src/app/api/*)"]
        ProductService["src/services/product-service.ts"]
        AuthModule["NextAuth.js (Session & Role RBAC)"]
    end

    subgraph Database ["Prisma ORM & PostgreSQL Database"]
        Prisma["Prisma Client ORM"]
        subgraph PostgresDB ["PostgreSQL Relational Schema"]
            tbl_users[("User (Customers & Admins)")]
            tbl_products[("Product & Inventory")]
            tbl_categories[("Category & Deals")]
            tbl_orders[("Order & Tracking")]
            tbl_wishlists[("Wishlist Items")]
            tbl_delivery[("VIP Delivery Bookings")]
            tbl_coupons[("Coupons & Discounts")]
        end
    end

    UI_Home --> ProductService
    UI_Delivery --> ProductService
    UI_Track --> AppRoutes
    UI_Admin --> AppRoutes
    UI_Cart <--> CartContext

    AppRoutes --> AuthModule
    ProductService --> Prisma
    AppRoutes --> Prisma

    Prisma --> tbl_users
    Prisma --> tbl_products
    Prisma --> tbl_categories
    Prisma --> tbl_orders
    Prisma --> tbl_wishlists
    Prisma --> tbl_delivery
    Prisma --> tbl_coupons
```

---

## 🗄️ Database Architecture (Prisma + PostgreSQL)

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER ||--o{ WISHLIST : owns
    USER ||--o{ DELIVERY_BOOKING : schedules
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER ||--|| ORDER_TRACKING : tracks
    PRODUCT ||--o{ ORDER_ITEM : ordered_in
    PRODUCT ||--o{ WISHLIST : saved_in
    CATEGORY ||--o{ PRODUCT : categorizes
    COUPON ||--o{ ORDER : applies_to

    USER {
        string id PK
        string name
        string email UK
        string password
        string role "ADMIN | CUSTOMER"
        datetime createdAt
    }

    PRODUCT {
        string id PK
        string title
        float price
        float originalPrice
        int stock
        string categoryId FK
        string imageUrl
        float rating
    }

    ORDER {
        string id PK
        string userId FK
        float totalAmount
        string status "PENDING | PROCESSING | SHIPPED | DELIVERED"
        string couponId FK
        datetime createdAt
    }

    ORDER_TRACKING {
        string id PK
        string orderId FK
        string currentStatus
        string location
        datetime estimatedDelivery
    }

    DELIVERY_BOOKING {
        string id PK
        string fullName
        string phone
        datetime deliveryDate
        string timeSlot
        string address
        string status
    }
```

---

## 🗂️ Project Directory Structure

```text
nexamart/
├── public/                     # Static brand assets, badges & icons
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # Comprehensive Admin Dashboard (Products, Orders, Users)
│   │   ├── api/                # API Route Handlers
│   │   ├── delivery/           # /delivery (VIP Express delivery booking)
│   │   ├── login/              # /login (Dual-column animated auth)
│   │   ├── register/           # /register (Redirect to login?tab=register)
│   │   ├── track-order/        # /track-order (Live order tracking portal)
│   │   ├── globals.css         # Tailwind v4 theme, keyframes & custom easing
│   │   ├── layout.tsx          # Root layout with CartProvider & font config
│   │   └── page.tsx            # Homepage assembling all store sections
│   ├── components/
│   │   ├── admin/              # Admin dashboard widgets, tables & forms
│   │   ├── home/               # Homepage components
│   │   │   ├── hero-section.tsx
│   │   │   ├── weekly-deals.tsx
│   │   │   ├── category-showcase.tsx
│   │   │   ├── popular-products.tsx
│   │   │   ├── best-seller-section.tsx
│   │   │   ├── delivery-booking-widget.tsx (App download banner)
│   │   │   └── sellers-and-trust.tsx
│   │   ├── layout/             # Header, Footer & Cart Drawer
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── cart-drawer.tsx
│   │   └── ui/                 # Reusable UI primitives
│   │       ├── button.tsx, input.tsx, badge.tsx, popover.tsx
│   │       ├── date-picker.tsx, time-picker.tsx, product-card.tsx
│   ├── context/
│   │   └── cart-context.tsx     # Shopping cart & wishlist state with LocalStorage
│   ├── data/
│   │   └── mock-data.ts         # Initial structured catalog data
│   ├── prisma/                  # Prisma Schema & Database Migrations
│   │   └── schema.prisma        # PostgreSQL Schema Models
│   ├── services/
│   │   └── product-service.ts   # Clean abstraction layer ready for Prisma queries
│   └── types/
│       └── index.ts             # TypeScript definitions
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Local Development & Setup

### Prerequisites
- Node.js `v18.18.0` or higher (Node 20+ recommended)
- PostgreSQL database instance (Local, Neon, Supabase, or Railway)

### Installation

```bash
# 1. Clone the repository
git clone git@github.com:Adnan4141/nexa-mart-ecommerce.git
cd nexa-mart-ecommerce

# 2. Install dependencies
npm install

# 3. Configure Environment Variables
cp .env.example .env
# Set your DATABASE_URL in .env:
# DATABASE_URL="postgresql://user:password@localhost:5432/nexamart"

# 4. Generate Prisma Client & Run Migrations (When connecting DB)
npx prisma generate
npx prisma migrate dev --name init

# 5. Start development server
npm run dev

# 6. Open in browser
http://localhost:3000
```

---

## 🔮 Implementation Roadmap

- [x] **Storefront UI**: Bento Hero, Weekly Flash Deals countdown, Popular Products, Best Sellers.
- [x] **Animated Auth**: Dual-column layout with sliding pill tab-switcher.
- [x] **VIP Express Delivery**: Dedicated `/delivery` page with DatePicker & TimePicker.
- [x] **Vercel Production Deployment**: Live and accessible globally.
- [ ] **Prisma + PostgreSQL Database Integration**: Full relational persistence replacing mock data.
- [ ] **Interactive Wishlist Page**: Dedicated wishlist management page with stock notifications.
- [ ] **Live Order Tracking**: Visual order timeline with courier status.
- [ ] **Admin Control Center**: Complete inventory CRUD, sales metrics, and delivery scheduling.
- [ ] **Payment Processing**: Stripe, SSLCommerz, and bKash integration.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
