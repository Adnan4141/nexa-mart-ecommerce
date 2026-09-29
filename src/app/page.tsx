import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { HeroSection } from "@/components/home/hero-section";
import { WeeklyDeals } from "@/components/home/weekly-deals";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { PopularProducts } from "@/components/home/popular-products";
import { BestSellerSection } from "@/components/home/best-seller-section";
import { DeliveryBookingWidget } from "@/components/home/delivery-booking-widget";
import { SellersAndTrust } from "@/components/home/sellers-and-trust";
import {
  getCategories,
  getWeeklyDeals,
  getPopularProducts,
  getBestSellers,
  getTopSellers,
  getActiveCoupons,
} from "@/services/product-service";

export default async function HomePage() {
  const [categories, weeklyDeals, popularProducts, bestSellers, topSellers, coupons] =
    await Promise.all([
      getCategories(),
      getWeeklyDeals(),
      getPopularProducts(),
      getBestSellers(),
      getTopSellers(),
      getActiveCoupons(),
    ]);

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#FF9900] selection:text-white">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <WeeklyDeals products={weeklyDeals} />

        <CategoryShowcase categories={categories} coupons={coupons} />

        <PopularProducts products={popularProducts} />

        <BestSellerSection products={bestSellers} />

        <DeliveryBookingWidget />

        <SellersAndTrust sellers={topSellers} />
      </main>

      <Footer />

      <CartDrawer />
    </div>
  );
}
