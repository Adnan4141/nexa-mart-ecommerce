import { Product, Category, Seller, Coupon, DeliveryBooking } from "@/types";
import { CATEGORIES, WEEKLY_DEALS, POPULAR_PRODUCTS, BEST_SELLERS, TOP_SELLERS, COUPONS } from "@/data/mock-data";

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getWeeklyDeals(): Promise<Product[]> {
  return WEEKLY_DEALS;
}

export async function getPopularProducts(): Promise<Product[]> {
  return POPULAR_PRODUCTS;
}

export async function getBestSellers(): Promise<Product[]> {
  return BEST_SELLERS;
}

export async function getTopSellers(): Promise<Seller[]> {
  return TOP_SELLERS;
}

export async function getActiveCoupons(): Promise<Coupon[]> {
  return COUPONS;
}

export async function createDeliveryBooking(booking: DeliveryBooking): Promise<{ success: boolean; bookingId: string }> {
  const bookingId = "BOOK-" + Math.random().toString(36).substring(2, 9).toUpperCase();
  return {
    success: true,
    bookingId,
  };
}
