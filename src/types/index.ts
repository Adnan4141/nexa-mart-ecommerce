export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: "Sale" | "Hot" | "New" | "Featured";
  brand?: string;
  inStock: boolean;
  soldCount?: number;
  totalStock?: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
  icon: string;
  color?: string;
  link: string;
}

export interface Seller {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  logo: string;
  verified: boolean;
  productsCount: number;
}

export interface Coupon {
  id: string;
  code: string;
  discount: string;
  title: string;
  description: string;
  expiresAt: string;
}

export interface DeliveryBooking {
  id?: string;
  fullName: string;
  phone: string;
  deliveryDate: Date | null;
  deliveryTimeSlot: string;
  deliveryAddress: string;
  specialInstructions?: string;
}
