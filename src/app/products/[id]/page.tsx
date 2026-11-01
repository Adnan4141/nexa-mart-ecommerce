import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, ArrowLeft, Check } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductBySlugOrId, getWeeklyDeals } from "@/services/product-service";
import { ProductCard } from "@/components/ui/product-card";
import { ProductDetailsClient } from "./product-client";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductBySlugOrId(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getWeeklyDeals()).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#FFA000] selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#0B3B3C] flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <span>/</span>
          <span className="capitalize">{product.category || "Products"}</span>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Product Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center p-6 shadow-sm">
              {product.badge && (
                <div className="absolute top-5 left-5 z-10">
                  <Badge variant="destructive" className="uppercase font-bold px-3 py-1 text-xs">
                    {product.badge}
                  </Badge>
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Thumbnail previews */}
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((img, idx) => (
                <div
                  key={idx}
                  className={`aspect-square rounded-xl bg-gray-50 border p-2 flex items-center justify-center cursor-pointer transition ${
                    idx === 0 ? "border-[#0B3B3C] ring-2 ring-[#0B3B3C]/10" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="thumb" className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Client Interactions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {product.brand && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {product.brand}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2.5">
                {product.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-500 font-medium">
                  {product.reviewCount} customer reviews
                </span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({product.totalStock || 50} available)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#0B3B3C]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through font-medium">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discountPercentage && (
                <span className="text-xs font-bold bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full">
                  Save {product.discountPercentage}%
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {product.description ||
                "Engineered with premium materials designed for long-lasting durability, peak performance, and timeless everyday elegance. Verified authentic by NexaMart Quality Assurance."}
            </p>

            {/* Client Interactivity (Quantity, Add to Cart, Wishlist) */}
            <ProductDetailsClient product={product} />

            {/* Trust Badges in Product Details */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <Truck className="w-4 h-4 text-[#FFA000]" />
                <div>
                  <span className="font-bold text-gray-900 block text-[11px]">VIP Express Delivery</span>
                  <span className="text-[10px] text-gray-500">Same-day available</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-bold text-gray-900 block text-[11px]">100% Genuine</span>
                  <span className="text-[10px] text-gray-500">Verified warranty</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <RotateCcw className="w-4 h-4 text-sky-600" />
                <div>
                  <span className="font-bold text-gray-900 block text-[11px]">30-Day Returns</span>
                  <span className="text-[10px] text-gray-500">Hassle-free guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="pt-12 border-t border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Similar Related Items</h2>
            <Link href="/" className="text-xs font-bold text-[#FFA000] hover:underline">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
