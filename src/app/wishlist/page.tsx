"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Product } from "@/types";
import { WEEKLY_DEALS, POPULAR_PRODUCTS, BEST_SELLERS } from "@/data/mock-data";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = [...WEEKLY_DEALS, ...POPULAR_PRODUCTS, ...BEST_SELLERS];
    const uniqueMap = new Map<string, Product>();
    allProducts.forEach((p) => uniqueMap.set(p.id, p));

    const matched = wishlist
      .map((id) => uniqueMap.get(id))
      .filter((p): p is Product => Boolean(p));

    setFavoriteProducts(matched);
  }, [wishlist]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] selection:bg-[#FFA000] selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/" className="text-xs text-gray-500 hover:text-[#0B3B3C] flex items-center gap-1 font-medium">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1 flex items-center gap-2">
              <Heart className="w-7 h-7 text-red-500 fill-current" /> My Wishlist
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved in your wishlist
            </p>
          </div>

          {wishlist.length > 0 && (
            <Button
              onClick={() => {
                favoriteProducts.forEach((p) => addToCart(p, 1));
              }}
              className="bg-[#0B3B3C] hover:bg-[#072828] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FFA000]" /> Add All to Cart
            </Button>
          )}
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your wishlist is empty</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explore our best seller collections and save items you love by tapping the heart icon.
            </p>
            <Link href="/">
              <Button className="bg-[#0B3B3C] hover:bg-[#072828] text-white text-xs px-6 py-2.5 rounded-xl font-bold cursor-pointer">
                Start Exploring
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 relative group"
              >
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition cursor-pointer z-10"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <Link href={`/products/${product.id}`} className="block relative aspect-square bg-gray-50 rounded-xl overflow-hidden p-3 flex items-center justify-center mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    {product.brand || product.category}
                  </span>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-xs font-bold text-gray-900 line-clamp-2 hover:text-[#FFA000] transition"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-extrabold text-[#0B3B3C]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => addToCart(product, 1)}
                    className="w-full bg-[#0B3B3C] hover:bg-[#072828] text-white text-xs font-bold py-2 rounded-xl mt-2 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#FFA000]" /> Move to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

