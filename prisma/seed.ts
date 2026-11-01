import { PrismaClient } from "@prisma/client";
import { CATEGORIES, WEEKLY_DEALS, POPULAR_PRODUCTS, BEST_SELLERS, COUPONS } from "../src/data/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting NexaMart Database Seeding...");

  // 1. Seed Categories
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.id },
      update: {
        name: cat.name,
        icon: cat.icon,
      },
      create: {
        slug: cat.id,
        name: cat.name,
        icon: cat.icon,
        description: `${cat.name} Collection`,
      },
    });
  }
  console.log(`✅ Seeded ${CATEGORIES.length} Categories.`);

  // 2. Seed Products
  const allProducts = [
    ...WEEKLY_DEALS.map((p) => ({ ...p, isWeeklyDeal: true })),
    ...POPULAR_PRODUCTS.map((p) => ({ ...p, isPopular: true })),
    ...BEST_SELLERS.map((p) => ({ ...p, isBestSeller: true })),
  ];

  let seededCount = 0;
  for (const p of allProducts) {
    const slug = p.id;
    const catSlug = p.category ? p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "home-appliance";

    await prisma.category.upsert({
      where: { slug: catSlug },
      update: {},
      create: {
        slug: catSlug,
        name: p.category || "General",
        icon: "📦",
      },
    });

    await prisma.product.upsert({
      where: { slug },
      update: {
        title: p.name,
        price: p.price,
        originalPrice: p.originalPrice || null,
        imageUrl: p.image,
        rating: p.rating || 5.0,
        reviewsCount: p.reviewCount || 0,
        discount: p.discountPercentage ? `${p.discountPercentage}% OFF` : null,
        badge: p.badge || null,
        isWeeklyDeal: (p as any).isWeeklyDeal ?? false,
        isPopular: (p as any).isPopular ?? false,
        isBestSeller: (p as any).isBestSeller ?? false,
      },
      create: {
        slug,
        title: p.name,
        price: p.price,
        originalPrice: p.originalPrice || null,
        imageUrl: p.image,
        rating: p.rating || 5.0,
        reviewsCount: p.reviewCount || 0,
        discount: p.discountPercentage ? `${p.discountPercentage}% OFF` : null,
        badge: p.badge || null,
        categorySlug: catSlug,
        stock: p.totalStock || 50,
        isWeeklyDeal: (p as any).isWeeklyDeal ?? false,
        isPopular: (p as any).isPopular ?? false,
        isBestSeller: (p as any).isBestSeller ?? false,
      },
    });
    seededCount++;
  }
  console.log(`✅ Seeded ${seededCount} Products.`);

  // 3. Seed Coupons
  for (const c of COUPONS) {
    const discountVal = parseFloat(c.discount.replace(/[^0-9.]/g, "")) || 10;
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: {
        discount: discountVal,
        isPercent: c.discount.includes("%"),
      },
      create: {
        code: c.code,
        discount: discountVal,
        isPercent: c.discount.includes("%"),
        minSpend: 50,
        isActive: true,
      },
    });
  }
  console.log(`✅ Seeded ${COUPONS.length} Coupons.`);

  console.log("🎉 Database seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
