import { Product, Category, Seller, Coupon, DeliveryBooking } from "@/types";
import {
  CATEGORIES as MOCK_CATEGORIES,
  WEEKLY_DEALS as MOCK_WEEKLY_DEALS,
  POPULAR_PRODUCTS as MOCK_POPULAR_PRODUCTS,
  BEST_SELLERS as MOCK_BEST_SELLERS,
  TOP_SELLERS as MOCK_TOP_SELLERS,
  COUPONS as MOCK_COUPONS,
} from "@/data/mock-data";
import { prisma } from "@/lib/prisma";

export async function getCategories(): Promise<Category[]> {
  try {
    if (process.env.DATABASE_URL) {
      const dbCategories = await prisma.category.findMany({
        include: { _count: { select: { products: true } } },
      });
      if (dbCategories.length > 0) {
        return dbCategories.map((c) => ({
          id: c.slug,
          name: c.name,
          itemCount: c._count.products,
          icon: c.icon || "📦",
          link: `/category/${c.slug}`,
          color: "#F3F4F6",
        }));
      }
    }
  } catch (error) {
    console.warn("Falling back to static mock categories:", error);
  }
  return MOCK_CATEGORIES;
}

export async function getWeeklyDeals(): Promise<Product[]> {
  try {
    if (process.env.DATABASE_URL) {
      const deals = await prisma.product.findMany({
        where: { isWeeklyDeal: true },
        take: 10,
      });
      if (deals.length > 0) {
        return deals.map(mapDbProductToClient);
      }
    }
  } catch (error) {
    console.warn("Falling back to mock weekly deals:", error);
  }
  return MOCK_WEEKLY_DEALS;
}

export async function getPopularProducts(): Promise<Product[]> {
  try {
    if (process.env.DATABASE_URL) {
      const popular = await prisma.product.findMany({
        where: { isPopular: true },
        take: 12,
      });
      if (popular.length > 0) {
        return popular.map(mapDbProductToClient);
      }
    }
  } catch (error) {
    console.warn("Falling back to mock popular products:", error);
  }
  return MOCK_POPULAR_PRODUCTS;
}

export async function getBestSellers(): Promise<Product[]> {
  try {
    if (process.env.DATABASE_URL) {
      const best = await prisma.product.findMany({
        where: { isBestSeller: true },
        take: 8,
      });
      if (best.length > 0) {
        return best.map(mapDbProductToClient);
      }
    }
  } catch (error) {
    console.warn("Falling back to mock best sellers:", error);
  }
  return MOCK_BEST_SELLERS;
}

export async function getProductBySlugOrId(idOrSlug: string): Promise<Product | null> {
  try {
    if (process.env.DATABASE_URL) {
      const p = await prisma.product.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
      });
      if (p) return mapDbProductToClient(p);
    }
  } catch (error) {
    console.warn("Failed fetching product from DB:", error);
  }

  // Fallback to static mock datasets
  const allMock = [
    ...MOCK_WEEKLY_DEALS,
    ...MOCK_POPULAR_PRODUCTS,
    ...MOCK_BEST_SELLERS,
  ];
  return allMock.find((item) => item.id === idOrSlug) || null;
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    if (process.env.DATABASE_URL) {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (products.length > 0) {
        return products.map(mapDbProductToClient);
      }
    }
  } catch (error) {
    console.warn("Falling back to mock product collection:", error);
  }
  return [...MOCK_WEEKLY_DEALS, ...MOCK_POPULAR_PRODUCTS, ...MOCK_BEST_SELLERS];
}

export async function getTopSellers(): Promise<Seller[]> {
  return MOCK_TOP_SELLERS;
}

export async function getActiveCoupons(): Promise<Coupon[]> {
  try {
    if (process.env.DATABASE_URL) {
      const coupons = await prisma.coupon.findMany({
        where: { isActive: true },
      });
      if (coupons.length > 0) {
        return coupons.map((c) => ({
          id: c.id,
          code: c.code,
          discount: c.isPercent ? `${c.discount}% OFF` : `$${c.discount} OFF`,
          title: `${c.code} Promotional Discount`,
          description: `Enjoy ${c.discount}${c.isPercent ? "%" : "$"} savings across NexaMart.`,
          expiresAt: c.validTill ? c.validTill.toISOString() : "Limited Offer",
        }));
      }
    }
  } catch (error) {
    console.warn("Falling back to mock coupons:", error);
  }
  return MOCK_COUPONS;
}

export async function createDeliveryBooking(
  booking: DeliveryBooking
): Promise<{ success: boolean; bookingId: string }> {
  const bookingId = "BOOK-" + Math.random().toString(36).substring(2, 9).toUpperCase();
  try {
    if (process.env.DATABASE_URL && booking.deliveryDate) {
      await prisma.deliveryBooking.create({
        data: {
          bookingId,
          fullName: booking.fullName,
          phone: booking.phone,
          deliveryDate: new Date(booking.deliveryDate),
          deliveryTimeSlot: booking.deliveryTimeSlot,
          deliveryAddress: booking.deliveryAddress,
        },
      });
    }
  } catch (error) {
    console.warn("Persisting to DB failed, fallback gracefully:", error);
  }

  return {
    success: true,
    bookingId,
  };
}

function mapDbProductToClient(p: any): Product {
  return {
    id: p.slug || p.id,
    name: p.title,
    category: p.categorySlug || "General",
    price: p.price,
    originalPrice: p.originalPrice || undefined,
    discountPercentage: p.discount ? parseInt(p.discount.replace(/[^0-9]/g, "")) || undefined : undefined,
    badge: (p.badge as any) || undefined,
    rating: p.rating,
    reviewCount: p.reviewsCount,
    image: p.imageUrl,
    inStock: p.stock > 0,
    totalStock: p.stock,
  };
}
